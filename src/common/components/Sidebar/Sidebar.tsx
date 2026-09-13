import s from './Sidebar.module.css'
import { Icon, type IconName } from '@/common/components/Icon/Icon'
import { NavLink } from 'react-router'
import { Path } from '@/common/routing/Path'

type NavItem = {
  to: string
  label: string
  icon: IconName
}

const primaryNav: NavItem[] = [
  { to: Path.Main, label: 'Home', icon: 'home' },
  { to: Path.Profile, label: 'Your Library', icon: 'library' },
]

const actionNav: NavItem[] = [
  { to: Path.Playlists, label: 'Create Playlist', icon: 'plus' },
  { to: Path.Tracks, label: 'Upload Track', icon: 'upload' },
]

const secondaryNav: NavItem[] = [
  { to: Path.Tracks, label: 'All Tracks', icon: 'music' },
  { to: Path.Playlists, label: 'All Playlist', icon: 'list' },
]

export const Sidebar = () => {
  return (
    <aside className={s.sidebar}>
      <div className={s.brand}>
        <span className={s.brandMark}>
          <Icon name="sparkles" size={18} />
        </span>
        <span className={s.brandName}>MusicFun</span>
      </div>

      <nav className={s.nav}>
        <ul className={s.list}>
          {primaryNav.map(item => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end={item.to === Path.Main}
                className={({ isActive }) =>
                  `${s.link} ${isActive ? s.linkActive : ''}`
                }
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={s.divider} />

        <ul className={s.list}>
          {actionNav.map(item => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${s.link} ${s.linkAction} ${isActive ? s.linkActive : ''}`
                }
              >
                <span className={s.actionIcon}>
                  <Icon name={item.icon} size={18} />
                </span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={s.divider} />

        <ul className={s.list}>
          {secondaryNav.map(item => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${s.link} ${isActive ? s.linkActive : ''}`
                }
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={s.footnote}>
        <p>© 2025 MusicFun</p>
        <p className={s.footnoteSub}>Powered by APIHUB</p>
      </div>
    </aside>
  )
}