import type { CSSProperties } from 'react'
import s from './Skeleton.module.css'

type Props = {
  width?: string | number
  height?: string | number
  radius?: string | number
  className?: string
  style?: CSSProperties
}

export const Skeleton = ({
  width = '100%',
  height = 16,
  radius = 4,
  className,
  style,
}: Props) => (
  <div
    className={`${s.root} ${className ?? ''}`}
    style={{ width, height, borderRadius: radius, ...style }}
    aria-hidden="true"
  />
)