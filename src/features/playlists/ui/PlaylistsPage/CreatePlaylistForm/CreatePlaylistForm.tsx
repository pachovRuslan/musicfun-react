import { useCreatePlaylistsMutation } from "@/features/playlists/api/playlistApi"
import type { CreatePlaylistArgs } from "@/features/playlists/api/playlistsApi.types"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Icon } from "@/common/components/Icon/Icon"
import s from "./CreatePlaylistForm.module.css"

type Props = {
  /** When embedded inside a Modal, hide the form header and use modal's title. */
  embedded?: boolean
  onSuccess?: () => void
}

export const CreatePlaylistForm = ({ embedded = false, onSuccess }: Props) => {
  const [createPlaylist, { isLoading }] = useCreatePlaylistsMutation()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreatePlaylistArgs>()

  const onSubmit: SubmitHandler<CreatePlaylistArgs> = data => {
    createPlaylist(data).unwrap().then(() => {
      reset()
      onSuccess?.()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      {!embedded && (
        <h2 className={s.title}>
          <Icon name="plus" size={20} /> Create new playlist
        </h2>
      )}
      {embedded && <h2 className={s.title}>Create new playlist</h2>}

      <div className={s.field}>
        <label className={s.label}>Title</label>
        <input
          {...register('title', { required: 'Title is required' })}
          placeholder="My awesome playlist"
          className={s.input}
        />
        {errors.title && (
          <span className={s.error}>{errors.title.message}</span>
        )}
      </div>
      <div className={s.field}>
        <label className={s.label}>Description</label>
        <textarea
          {...register('description')}
          placeholder="What kind of music will you add?"
          className={`${s.input} ${s.textarea}`}
          rows={3}
        />
      </div>
      <div className={s.actions}>
        <button type="submit" className={s.submitBtn} disabled={isLoading}>
          <Icon name="plus-sm" size={16} />
          {isLoading ? 'Creating...' : 'Create playlist'}
        </button>
      </div>
    </form>
  )
}