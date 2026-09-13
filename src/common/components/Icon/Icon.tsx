import type { CSSProperties } from 'react'
import type { IconName } from './icon'


type Props = {
  name: IconName
  size?: number | string
  className?: string
  style?: CSSProperties
}

export const Icon = ({ name, size = 20, className, style }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    style={style}
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <use href={`/icons.svg#icon-${name}`} />
  </svg>
)

