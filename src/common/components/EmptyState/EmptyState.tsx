import type { IconName } from '../Icon/icon'
import s from './EmptyState.module.css'
import { Icon } from '@/common/components/Icon/Icon'

type Props = {
  title: string
  subtitle?: string
  icon?: IconName
}

export const EmptyState = ({
  title,
  subtitle,
  icon = 'music',
}: Props) => (
  <div className={s.empty}>
    <div className={s.icon}>
      <Icon name={icon} size={28} />
    </div>
    <h3 className={s.title}>{title}</h3>
    {subtitle && <p className={s.subtitle}>{subtitle}</p>}
  </div>
)