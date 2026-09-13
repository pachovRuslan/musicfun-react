import { useGetMeQuery } from '@/features/auth/api/authApi'
import { Login } from '@/features/auth/ui/Login'
import { Icon, Skeleton, EmptyState } from '@/common/components'
import { PlaylistCard } from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem'
import s from './MainPage.module.css'
import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistApi'
import { useFetchTracksInfiniteQuery } from '@/features/tracks/api/tracksApi'
import { Link } from 'react-router'
import { Path } from '@/common/routing/Path'

const heroGradient =
  'linear-gradient(135deg, #3b1e8c 0%, #1e1e4c 60%, #121212 100%)'

const filters = ['#Playlists', '#Artists', '#Albums', '#Podcasts & shows']

export const MainPage = () => {
  const { data: me } = useGetMeQuery()
  const { data: playlistsData, isLoading: playlistsLoading } =
    useFetchPlaylistsQuery({ pageNumber: 1, pageSize: 5 })
  const { data: tracksData, isLoading: tracksLoading } =
    useFetchTracksInfiniteQuery()

  const playlists = playlistsData?.data ?? []
  const tracks = tracksData?.pages.flatMap(p => p.data) ?? []

  return (
    <div className={s.root}>
      {/* ----- Hero ----- */}
      <section
        className={s.hero}
        style={{ background: heroGradient }}
      >
        <div className={s.heroInner}>
          <span className={s.heroTag}>Welcome to MusicFun</span>
          <h1 className={s.heroTitle}>
            {me
              ? `Hello, ${me.login} 👋`
              : 'Millions of Tracks. Free on MusicFun.'}
          </h1>
          <p className={s.heroSubtitle}>
            {me
              ? 'Your personalised music library — pick up where you left off.'
              : 'Sign in to create playlists, upload your own tracks and discover new music.'}
          </p>
          <div className={s.heroActions}>
            {!me && (
              <Login
                asModal
                trigger={
                  <button type="button" className={s.heroCta}>
                    <Icon name="sparkles" size={16} />
                    Sign up with APIHUB
                  </button>
                }
              />
            )}
            <Link to={Path.Tracks} className={s.heroSecondary}>
              <Icon name="play" size={14} />
              Browse all tracks
            </Link>
          </div>
        </div>

        <div className={s.filters}>
          {filters.map(f => (
            <span key={f} className={s.filterChip}>
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* ----- New playlists ----- */}
      <section className={s.section}>
        <div className={s.sectionHead}>
          <h2 className={s.sectionTitle}>New playlists</h2>
          <Link to={Path.Playlists} className={s.seeAll}>
            See all
          </Link>
        </div>

        {playlistsLoading ? (
          <div className={s.grid}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div className={s.skeletonCard} key={i}>
                <Skeleton height={180} radius={8} />
                <Skeleton height={16} width="80%" style={{ marginTop: 12 }} />
                <Skeleton height={12} width="60%" style={{ marginTop: 8 }} />
              </div>
            ))}
          </div>
        ) : playlists.length === 0 ? (
          <EmptyState
            title="No playlists yet"
            subtitle="Be the first to create a playlist on MusicFun."
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
      </section>

      {/* ----- New tracks ----- */}
      <section className={s.section}>
        <div className={s.sectionHead}>
          <h2 className={s.sectionTitle}>New tracks</h2>
          <Link to={Path.Tracks} className={s.seeAll}>
            See all
          </Link>
        </div>

        {tracksLoading ? (
          <div className={s.trackGrid}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div className={s.skeletonTrack} key={i}>
                <Skeleton height={120} radius={8} />
                <Skeleton height={14} width="80%" style={{ marginTop: 10 }} />
                <Skeleton height={10} width="50%" style={{ marginTop: 6 }} />
              </div>
            ))}
          </div>
        ) : tracks.length === 0 ? (
          <EmptyState
            title="No tracks yet"
            subtitle="Upload a track to see it here."
            icon="upload"
          />
        ) : (
          <div className={s.trackGrid}>
            {tracks.slice(0, 8).map(track => (
              <TrackMiniCard key={track.id} track={track} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

/* Local mini card for tracks (on main page) */
import type { TrackData } from '@/features/tracks/api/tracksApi.types'

const TrackMiniCard = ({ track }: { track: TrackData }) => {
  const { title, user, images } = track.attributes
  const cover = images.main?.find(i => i.type === 'medium')?.url

  return (
    <Link to={Path.Tracks} className={s.trackCard}>
      <div className={s.trackCover}>
        {cover ? (
          <img src={cover} alt={title} />
        ) : (
          <span className={s.trackCoverPlaceholder}>
            <Icon name="music" size={28} />
          </span>
        )}
        <span className={s.trackPlay}>
          <Icon name="play" size={20} />
        </span>
      </div>
      <div className={s.trackMeta}>
        <span className={s.trackTitle}>{title}</span>
        <span className={s.trackArtist}>{user.name}</span>
      </div>
    </Link>
  )
}