import type { Images } from '@/common/types'
import s from './PlaylistCover.module.css'
import { useDeletePlaylistCoverMutation, useUploadPlaylistCoverMutation } from '@/features/playlists/api/playlistApi'
import type { ChangeEvent } from 'react'
import { errorToast } from '@/common/utils/errorToast'
import { Icon } from '@/common/components/Icon/Icon'

type Props = {
  playlistId: string
  images: Images
}

// Stable gradient per playlist id, used as fallback cover.
const gradients = [
  'linear-gradient(135deg, #ff5722 0%, #d32f2f 100%)',
  'linear-gradient(135deg, #c6f935 0%, #7cb342 100%)',
  'linear-gradient(135deg, #3b1e8c 0%, #1e1e4c 100%)',
  'linear-gradient(135deg, #ed55c5 0%, #db2777 100%)',
  'linear-gradient(135deg, #1e3a8a 0%, #0f1d4a 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
]

const pickGradient = (id: string) => {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return gradients[h % gradients.length]
}

export const PlaylistCover = ({ images, playlistId }: Props) => {
  const originalCover = images.main?.find(img => img.type === 'original')
  const src = originalCover ? originalCover.url : null

  const [uploadCover] = useUploadPlaylistCoverMutation()
  const [deleteCover] = useDeletePlaylistCoverMutation()

  const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1024 * 1024 // 1 MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

    const file = event.target.files?.length && event.target.files[0]
    if (!file) return

    if (!allowedTypes.includes(file.type)) {
      errorToast('Only JPEG, PNG or GIF images are allowed', { type: 'error', theme: 'colored' })
      return
    }

    if (file.size > maxSize) {
      errorToast(`The file is too large (max. ${Math.round(maxSize / 1024)} KB)`, {
        type: 'error',
        theme: 'colored',
      })
      return
    }

    uploadCover({ playlistId, file })
  }

  const deleteCoverHandler = () => deleteCover({ playlistId })

  return (
    <div
      className={s.cover}
      style={{ background: src ? '#000' : pickGradient(playlistId) }}
    >
      {src ? (
        <img src={src} alt="cover" className={s.img} />
      ) : (
        <span className={s.placeholder}>
          <Icon name="music" size={32} />
        </span>
      )}

      <div className={s.overlay}>
        <label className={s.uploadBtn} title="Upload cover">
          <Icon name="upload" size={16} />
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={uploadCoverHandler}
            className={s.fileInput}
          />
        </label>
        {originalCover && (
          <button
            className={s.deleteBtn}
            onClick={deleteCoverHandler}
            title="Delete cover"
            type="button"
          >
            <Icon name="trash" size={16} />
          </button>
        )}
      </div>
    </div>
  )
}