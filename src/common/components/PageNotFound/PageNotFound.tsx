import { Link } from 'react-router'
import s from './PageNotFound.module.css'
import { Path } from '@/common/routing/Path'
import { Icon } from '@/common/components/Icon/Icon'

export const PageNotFound = () => {
  return (
    <div className={s.root}>
      <div className={s.code}>
        <span className={s.glow}>4</span>
        <span className={s.iconWrap}><Icon name="music" size={120} /></span>
        <span className={s.glow}>4</span>
      </div>
      <h2 className={s.subtitle}>Page not found</h2>
      <p className={s.text}>
        The track you're looking for may have been moved or never existed.
      </p>
      <Link to={Path.Main} className={s.homeLink}>
        <Icon name="home" size={16} /> Back to Home
      </Link>
    </div>
  )
}