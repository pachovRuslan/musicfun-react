import s from './TrackList.module.css'
import type { TrackData } from '../../api/tracksApi.types';
import { Icon } from '@/common/components/Icon/Icon'
import { CurrentUserReaction } from '@/common/enums'

type Props = {
    tracks: TrackData[]
}

const formatDate = (iso?: string) => {
    if (!iso) return ''
    const d = new Date(iso)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays < 1) return 'today'
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 30) return `${diffDays} days ago`
    return d.toLocaleDateString()
}

const formatDuration = (attachments: TrackData['attributes']['attachments']) => {
    // We can't easily compute audio duration without loading it, so we show a placeholder.
    return attachments.length ? '2:12' : '—'
}

export const TrackList = ({ tracks }: Props) => {
    return (
        <div className={s.table}>
            {/* ----- Header row ----- */}
            <div className={s.rowHeader}>
                <span className={s.colIndex}>#</span>
                <span className={s.colTitle}>Title</span>
                <span className={s.colDate}>Date added</span>
                <span className={s.colDuration}>
                    <Icon name="clock" size={16} />
                </span>
            </div>

            {/* ----- Tracks ----- */}
            <div className={s.rows}>
                {tracks.map((track, idx) => {
                    const { title, user, attachments, images, addedAt, currentUserReaction } = track.attributes
                    const cover = images.main?.find(i => i.type === 'medium')?.url
                    const hasLiked = currentUserReaction === CurrentUserReaction.Like

                    return (
                        <div className={s.row} key={track.id}>
                            <span className={s.colIndex}>
                                <span className={s.idxNumber}>{idx + 1}</span>
                                <button className={s.playHover} aria-label={`Play ${title}`}>
                                    <Icon name="play" size={14} />
                                </button>
                            </span>

                            <span className={s.colTitle}>
                                <span className={s.cover}>
                                    {cover ? (
                                        <img src={cover} alt={title} />
                                    ) : (
                                        <span className={s.coverPlaceholder}>
                                            <Icon name="music" size={14} />
                                        </span>
                                    )}
                                </span>
                                <span className={s.titleBlock}>
                                    <span className={s.trackTitle} title={title}>{title}</span>
                                    <span className={s.trackArtist}>{user.name}</span>
                                </span>
                            </span>

                            <span className={s.colDate}>{formatDate(addedAt)}</span>
                            <span className={s.colActions}>
                                <button
                                    className={`${s.actionBtn} ${hasLiked ? s.liked : ''}`}
                                    aria-label={hasLiked ? 'Unlike' : 'Like'}
                                >
                                    <Icon name={hasLiked ? 'heart-filled' : 'heart'} size={16} />
                                </button>
                                <span className={s.duration}>{formatDuration(attachments)}</span>
                                <button className={s.actionBtn} aria-label="More">
                                    <Icon name="more" size={16} />
                                </button>
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};