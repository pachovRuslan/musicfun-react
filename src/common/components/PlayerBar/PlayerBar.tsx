import s from './PlayerBar.module.css'
import { Icon } from '@/common/components/Icon/Icon'

// Mock now-playing data — purely decorative.
// Real audio playback can be wired up later by replacing these props.
const NOW_PLAYING = {
  number: '1',
  title: 'Play It Safe',
  artist: 'Julia Wolf',
  coverGradient: 'linear-gradient(135deg, #ff5722 0%, #d32f2f 100%)',
  currentTime: '2:39',
  totalTime: '4:22',
  progress: 60, // %
}

export const PlayerBar = () => {
  return (
    <footer className={s.player}>
      {/* Left: now playing */}
      <div className={s.nowPlaying}>
        <div
          className={s.cover}
          style={{ background: NOW_PLAYING.coverGradient }}
        >
          <span>{NOW_PLAYING.number}</span>
        </div>
        <div className={s.npInfo}>
          <span className={s.npTitle}>{NOW_PLAYING.title}</span>
          <span className={s.npArtist}>{NOW_PLAYING.artist}</span>
        </div>
        <button className={s.iconBtn} aria-label="Like">
          <Icon name="heart" size={16} />
        </button>
      </div>

      {/* Center: transport */}
      <div className={s.transport}>
        <div className={s.controls}>
          <button className={s.iconBtn} aria-label="Shuffle">
            <Icon name="shuffle" size={16} />
          </button>
          <button className={s.iconBtn} aria-label="Previous">
            <Icon name="prev" size={18} />
          </button>
          <button className={s.playBtn} aria-label="Play">
            <Icon name="play" size={20} />
          </button>
          <button className={s.iconBtn} aria-label="Next">
            <Icon name="next" size={18} />
          </button>
          <button className={s.iconBtn} aria-label="Repeat">
            <Icon name="repeat" size={16} />
          </button>
        </div>
        <div className={s.progress}>
          <span className={s.time}>{NOW_PLAYING.currentTime}</span>
          <div className={s.progressTrack}>
            <div
              className={s.progressFill}
              style={{ width: `${NOW_PLAYING.progress}%` }}
            >
              <span className={s.progressThumb} />
            </div>
          </div>
          <span className={s.time}>{NOW_PLAYING.totalTime}</span>
        </div>
      </div>

      {/* Right: volume */}
      <div className={s.volume}>
        <button className={s.iconBtn} aria-label="Volume">
          <Icon name="volume" size={18} />
        </button>
        <div className={s.volumeTrack}>
          <div className={s.volumeFill} style={{ width: '60%' }}>
            <span className={s.volumeThumb} />
          </div>
        </div>
      </div>
    </footer>
  )
}