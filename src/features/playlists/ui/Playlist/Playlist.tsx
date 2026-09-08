import { useState } from "react";
import s from "./Playlist.module.css";
import { useForm } from "react-hook-form";
import { useDeletePlaylistsMutation } from "../../api/playlistApi";
import type { PlaylistData, UpdatePlaylistArgs } from "../../api/playlistsApi.types";
import { EditPlaylistForm } from "../PlaylistsPage/EditPlaylistForm/EditPlaylistForm";
import { PlaylistItem } from "../PlaylistsPage/PlaylistItem/PlaylistItem";

type Props = {
    isPlaylistsLoading: boolean
    playlists: PlaylistData[]
}
export const Playlist = ({ isPlaylistsLoading, playlists }: Props) => {
    const [playlistId, setPlaylistId] = useState<string | null>(null);
    const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()
    const [deletePlaylist] = useDeletePlaylistsMutation();
    const deletePlaylistHandler = (playlistId: string) => {
        if (confirm("you sure")) {
            deletePlaylist(playlistId);
        }
    };
    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if (playlist) {
            setPlaylistId(playlist.id);
            reset({
                title: playlist.attributes.title,
                description: playlist.attributes.description,
                tagIds: playlist.attributes.tags.map((t) => t.id),
            });
        } else {
            setPlaylistId(null);
        }
    };
    return (
        <div className={s.items}>
            {!playlists.length && !isPlaylistsLoading && <h2>Playlists not found</h2>}
            {playlists.map((playlist) => {
                const isEditing = playlistId === playlist.id;
                return (
                    <div className={s.item} key={playlist.id}>
                        {isEditing ? (
                            <EditPlaylistForm playlistId={playlistId} setPlaylistId={setPlaylistId} editPlaylist={editPlaylistHandler} register={register} handleSubmit={handleSubmit} />
                        ) : (
                            <PlaylistItem playlist={playlist} editPlaylistHandler={editPlaylistHandler} deletePlaylistHandler={deletePlaylistHandler} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

