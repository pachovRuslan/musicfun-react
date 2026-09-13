import { useState, useRef, useEffect } from 'react'
import type { PlaylistData } from '../../../api/playlistsApi.types'
import { PlaylistCover } from './PlaylistCover/PlaylistCover'
import { PlaylistDiscription } from './PlaylistDiscription/PlaylistDiscription'
import { Icon } from '@/common/components/Icon/Icon'
import s from './PlaylistItem.module.css'

type Props = {
  playlist: PlaylistData
  deletePlaylistHandler: (playlistId: string) => void
  editPlaylistHandler: (playlist: PlaylistData | null) => void
  variant?: 'grid' | 'row'
}

export const PlaylistItem = ({
  playlist,
  deletePlaylistHandler,
  editPlaylistHandler,
  variant = 'grid',
}: Props) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [menuOpen])

  const likeCount = playlist.attributes.likesCount ?? 0
  const hasLiked = playlist.attributes.currentUserReaction === 1

  if (variant === 'grid') {
    return (
      <article className={s.card}>
        <div className={s.coverWrap}>
          <PlaylistCover images={playlist.attributes.images} playlistId={playlist.id} />
          <button
            className={s.playBtn}
            aria-label={`Play ${playlist.attributes.title}`}
          >
            <Icon name="play" size={20} />
          </button>
          <div className={s.menuWrap} ref={menuRef}>
            <button
              className={s.iconBtn}
              aria-label="More"
              onClick={() => setMenuOpen(o => !o)}
            >
              <Icon name="more" size={20} />
            </button>
            {menuOpen && (
              <div className={s.menu} role="menu">
                <button
                  className={s.menuItem}
                  onClick={() => {
                    setMenuOpen(false)
                    editPlaylistHandler(playlist)
                  }}
                >
                  <Icon name="edit" size={16} />
                  Edit
                </button>
                <button
                  className={s.menuItem}
                  onClick={() => {
                    setMenuOpen(false)
                    deletePlaylistHandler(playlist.id)
                  }}
                >
                  <Icon name="trash" size={16} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={s.body}>
          <PlaylistDiscription playlist={playlist} />
          <div className={s.stats}>
            <span className={s.statItem}>
              <Icon
                name={hasLiked ? 'heart-filled' : 'heart'}
                size={14}
                className={hasLiked ? s.liked : ''}
              />
              {likeCount}
            </span>
            <span className={s.statItem}>
              <Icon name="share" size={14} />
              Share
            </span>
          </div>
        </div>
      </article>
    )
  }

  // row variant (kept for backwards compat with existing usages)
  return (
    <article className={s.row}>
      <PlaylistCover images={playlist.attributes.images} playlistId={playlist.id} />
      <PlaylistDiscription playlist={playlist} />
      <div className={s.rowActions}>
        <button
          className={s.rowBtn}
          onClick={() => editPlaylistHandler(playlist)}
        >
          <Icon name="edit" size={16} /> Update
        </button>
        <button
          className={s.rowBtnDanger}
          onClick={() => deletePlaylistHandler(playlist.id)}
        >
          <Icon name="trash" size={16} /> Delete
        </button>
      </div>
    </article>
  )
}

// Aliased export for clarity when used as a card on dashboard-like pages.
export const PlaylistCard = PlaylistItem