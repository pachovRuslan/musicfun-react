import { useFetchTracksInfiniteQuery } from '@/features/tracks/api/tracksApi'
import { useInfiniteScroll } from '@/common/hooks/useInfiniteScroll'
import { TrackList } from './TrackList/TrackList'
import { LoadingTrigger } from './LoadingTrigger/LoadingTrigger'
import { Icon } from '@/common/components/Icon/Icon'
import { EmptyState } from '@/common/components'
import s from './TracksPage.module.css'

export const TracksPage = () => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useFetchTracksInfiniteQuery()
  const { observerRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetching })
  const pages = data?.pages.flatMap(page => page.data) || []

  return (
    <div className={s.container}>
      {/* ----- Header ----- */}
      <div className={s.header}>
        <div className={s.headerLeft}>
          <h1 className={s.title}>All Tracks</h1>
          <p className={s.subtitle}>
            {pages.length} tracks loaded
          </p>
        </div>
        <button className={s.uploadBtn} type="button">
          <Icon name="upload" size={16} />
          Upload Track
        </button>
      </div>

      {/* ----- Content ----- */}
      {pages.length === 0 && !isFetching ? (
        <EmptyState
          title="No tracks yet"
          subtitle="Upload your first track to share it with the world."
          icon="upload"
        />
      ) : (
        <TrackList tracks={pages} />
      )}

      {hasNextPage && (
        <LoadingTrigger observerRef={observerRef} isFetchingNextPage={isFetchingNextPage} />
      )}
    </div>
  )
}