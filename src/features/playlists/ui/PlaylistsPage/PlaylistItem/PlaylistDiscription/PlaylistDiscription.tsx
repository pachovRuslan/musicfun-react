import type { PlaylistData } from "@/features/playlists/api/playlistsApi.types";
import s from "./PlaylistDiscription.module.css";

type Props = {
  playlist: PlaylistData;
};
export const PlaylistDiscription = ({ playlist }: Props) => {
  const attrs = playlist.attributes;
  const tags = attrs.tags ?? [];
  const dateAdded = attrs.addedAt
    ? new Date(attrs.addedAt).toLocaleDateString()
    : '';

  return (
    <div className={s.root}>
      <h3 className={s.title} title={attrs.title}>
        {attrs.title}
      </h3>
      {attrs.description ? (
        <p className={s.description} title={attrs.description}>
          {attrs.description}
        </p>
      ) : (
        <p className={s.description}>
          Made for {attrs.user.name}
        </p>
      )}
      <div className={s.meta}>
        {tags.length > 0 && (
          <span className={s.tags}>
            {tags.slice(0, 3).map(t => (
              <span key={t.id} className={s.tag}>
                #{t.name}
              </span>
            ))}
          </span>
        )}
        <span className={s.metaText}>
          {dateAdded && `Created ${dateAdded}`}
        </span>
      </div>
    </div>
  );
};