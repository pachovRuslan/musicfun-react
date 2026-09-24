import { useGetMeQuery } from '@/features/auth/api/authApi'
import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistApi'
import { Skeleton, EmptyState } from '@/common/components'
import { PlaylistCard } from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem'
import s from './ProfilePage.module.css'

const heroGradient = 'linear-gradient(135deg, #3b1e8c 0%, #1e1e4c 60%, #121212 100%)'

export const ProfilePage = () => {
  const { data: me } = useGetMeQuery()
  const { data: playlistsData, isLoading } = useFetchPlaylistsQuery({
    pageNumber: 1,
    pageSize: 8,
    userId: me?.userId,
  })

  const avatarLetter = me?.login?.charAt(0).toUpperCase() ?? '?'
  const playlists = playlistsData?.data ?? []
  const playlistsCount = playlistsData?.meta.totalCount ?? 0

  return (
    <div className={s.root}>
      <section className={s.hero} style={{ background: heroGradient }}>
        <div className={s.avatar}>{avatarLetter}</div>
        <div className={s.heroInfo}>
          <span className={s.heroLabel}>Profile</span>
          <h1 className={s.heroTitle}>
            {me?.login ?? 'Guest user'}
          </h1>
          <div className={s.stats}>
            <div className={s.stat}>
              <span className={s.statValue}>{playlistsCount}</span>
              <span className={s.statLabel}>Playlists</span>
            </div>
            <div className={s.stat}>
              <span className={s.statValue}>0</span>
              <span className={s.statLabel}>Followers</span>
            </div>
            <div className={s.stat}>
              <span className={s.statValue}>0</span>
              <span className={s.statLabel}>Following</span>
            </div>
          </div>
        </div>
      </section>

      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>My playlists</h2>
      </div>


      {isLoading ? (
        <div className={s.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div className={s.skeletonCard} key={i}>
              <Skeleton height={160} radius={8} />
              <Skeleton height={16} width="70%" style={{ marginTop: 12 }} />
              <Skeleton height={12} width="50%" style={{ marginTop: 6 }} />
            </div>
          ))}
        </div>
      ) : playlists.length === 0 ? (
        <EmptyState
          title="No playlists yet"
          subtitle="Create your first playlist to see it here."
          icon="plus"
        />
      ) : (
        <div className={s.grid}>
          {playlists.map(pl => (
            <PlaylistCard
              key={pl.id}
              playlist={pl}
              editPlaylistHandler={() => {}}
              deletePlaylistHandler={() => {}}
              variant="grid"
            />
          ))}
        </div>
      )}
    </div>
  )
}