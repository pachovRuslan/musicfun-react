import { useState } from 'react'
import { Path } from "@/common/routing/Path"
import { useLoginMutation } from "../api/authApi"
import { Icon } from '@/common/components/Icon/Icon'
import { Modal } from '@/common/components/Modal/Modal'
import s from './Login.module.css'

type Props = {
  /** When true, render the full-page "Millions of Tracks" welcome modal
   *  instead of the compact header pill. Useful for the unauthenticated state. */
  asModal?: boolean
  trigger?: React.ReactNode
}

export const Login = ({ asModal = false, trigger }: Props) => {
  const [login] = useLoginMutation()
  const [open, setOpen] = useState(false)

  const loginHandler = () => {
    const redirectUri = import.meta.env.VITE_DOMAIN_ADDRESS + Path.OAuthRedirect
    const url = `${import.meta.env.VITE_BASE_URL}/auth/oauth-redirect?callbackUrl=${redirectUri}`
    window.open(url, 'oauthPopup', 'width=500, height=600')

    const receiveMessage = async (event: MessageEvent) => {
      if (event.origin !== import.meta.env.VITE_DOMAIN_ADDRESS) return
      const { code } = event.data
      if (!code) return
      window.removeEventListener('message', receiveMessage)
      login({ code, redirectUri, rememberMe: false })
      setOpen(false)
    }
    window.addEventListener('message', receiveMessage)
  }

  /* ----- Compact header button ----- */
  if (!asModal) {
    return (
      <button type="button" className={s.loginBtn} onClick={loginHandler}>
        <span>Sign up with APIHUB</span>
        <Icon name="chevron-right" size={14} />
      </button>
    )
  }

  /* ----- Full welcome modal (used by pages for unauthenticated users) ----- */
  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      <Modal open={open} onClose={() => setOpen(false)} className={s.welcomeModal}>
        <div className={s.welcome}>
          <div className={s.badge}>
            <Icon name="sparkles" size={20} />
          </div>
          <h2 className={s.title}>
            Millions of Tracks.
            <br />
            Free on MusicFun.
          </h2>
          <p className={s.subtitle}>
            Sign in to create playlists, upload your own tracks and follow your
            favourite artists.
          </p>
          <div className={s.actions}>
            <button
              type="button"
              className={s.btnSecondary}
              onClick={() => setOpen(false)}
            >
              Continue without Sign In
            </button>
            <button
              type="button"
              className={s.btnPrimary}
              onClick={loginHandler}
            >
              <Icon name="sparkles" size={16} />
              Sign up with APIHUB
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}