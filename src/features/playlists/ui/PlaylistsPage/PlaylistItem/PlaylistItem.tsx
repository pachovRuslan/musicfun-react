
import type { PlaylistData } from '../../../api/playlistsApi.types';
import { PlaylistCover } from './PlaylistCover/PlaylistCover';
import { PlaylistDiscription } from './PlaylistDiscription/PlaylistDiscription';

type Props = {
    playlist: PlaylistData
    deletePlaylistHandler: (plaulistId: string) => void
    editPlaylistHandler: (plaulist: PlaylistData) => void
}
export const PlaylistItem = ({ playlist, deletePlaylistHandler, editPlaylistHandler }: Props) => {
    return (
        <div>
            <PlaylistCover images={playlist.attributes.images} playlistId={playlist.id} />
            <PlaylistDiscription playlist={playlist}/>
            <button onClick={() => deletePlaylistHandler(playlist.id)}>
                delete
            </button>
            <button onClick={() => editPlaylistHandler(playlist)}>
                update
            </button>
        </div>
    );
};

