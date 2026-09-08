import type { PlaylistData } from "@/features/playlists/api/playlistsApi.types";

type Props = {
    playlist: PlaylistData
}
export const PlaylistDiscription = ({ playlist }: Props) => {
    return (
        <>
            <div>title: {playlist.attributes.title}</div>
            <div>description: {playlist.attributes.description}</div>
            <div>userName: {playlist.attributes.user.name}</div>
        </>
    );
};
