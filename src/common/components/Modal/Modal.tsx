import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import s from './Modal.module.css'
import { Icon } from '@/common/components/Icon/Icon'

type Props = {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  showClose?: boolean
}

export const Modal = ({
  open,
  onClose,
  children,
  className,
  showClose = true,
}: Props) => {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className={s.overlay} onClick={onClose}>
      <div
        className={`${s.modal} ${className ?? ''}`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {showClose && (
          <button className={s.closeBtn} onClick={onClose} aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  )
}