import { useUpdatePlaylistMutation } from "@/features/playlists/api/playlistApi";
import type { UpdatePlaylistArgs } from "@/features/playlists/api/playlistsApi.types";
import { type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister } from "react-hook-form";
import { Icon } from "@/common/components/Icon/Icon";
import s from "./EditPlaylistForm.module.css";

type Props = {
    playlistId: string
    setPlaylistId: (playlistId: null) => void
    editPlaylist: (playlistId: null) => void
    register: UseFormRegister<UpdatePlaylistArgs>
    handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
}

export const EditPlaylistForm = ({ editPlaylist, playlistId, setPlaylistId, register, handleSubmit }: Props) => {
    const [updatePlaylist, { isLoading }] = useUpdatePlaylistMutation()

    const onSubmit: SubmitHandler<UpdatePlaylistArgs> = data => {
        if (!playlistId) return
        updatePlaylist({ playlistId, body: data })
        setPlaylistId(null)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <h2 className={s.title}>
                <Icon name="edit" size={20} /> Edit playlist
            </h2>
            <div className={s.field}>
                <label className={s.label}>Title</label>
                <input {...register("title")} placeholder="Title" className={s.input} />
            </div>
            <div className={s.field}>
                <label className={s.label}>Description</label>
                <textarea
                    {...register("description")}
                    placeholder="Description"
                    className={`${s.input} ${s.textarea}`}
                    rows={3}
                />
            </div>
            <div className={s.actions}>
                <button type="button" className={s.cancelBtn} onClick={() => editPlaylist(null)}>
                    Cancel
                </button>
                <button type="submit" className={s.submitBtn} disabled={isLoading}>
                    <Icon name="plus-sm" size={16} /> Save
                </button>
            </div>
        </form>
    );
};