import { useUpdatePlaylistsMutation } from "@/features/playlists/api/playlistApi";
import type { UpdatePlaylistArgs } from "@/features/playlists/api/playlistsApi.types";
import {   type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister } from "react-hook-form";
type Props = {
    playlistId: string
    setPlaylistId: (playlistId: null) => void
    editPlaylist: (playlistId: null) => void
    register: UseFormRegister<UpdatePlaylistArgs>
    handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
}

export const EditPlaylistForm = ({ editPlaylist, playlistId, setPlaylistId,  register, handleSubmit }: Props) => {
    const [updatePlaylist] = useUpdatePlaylistsMutation();
    const onSubmit: SubmitHandler<UpdatePlaylistArgs> = (body) => {
        if (!playlistId) return;
        updatePlaylist({ playlistId, body }).then(() => {
            setPlaylistId(null);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Edit playlist</h2>
            <div>
                <input {...register("title")} placeholder={"title"} />
            </div>
            <div>
                <input
                    {...register("description")}
                    placeholder={"description"}
                />
            </div>
            <button type={"submit"}>save</button>
            <button
                type={"button"}
                onClick={() => editPlaylist(null)}
            >
                cancel
            </button>
        </form>
    );
};
