import { useEffect } from "react"
import s from './OAuthCallback.module.css'

export const OAuthCallback = () => {
  useEffect(() => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')

    console.log('[OAuthCallback] Code:', code)
    console.log('[OAuthCallback] Opener available:', !!window.opener)

    if (code && window.opener) {
      window.opener.postMessage({ code }, '*')
    } else {
      if (!code) console.error('[OAuthCallback] Параметр "code" не найден в URL')
      if (!window.opener) console.error('[OAuthCallback] window.opener недоступен')
    }

    const timer = setTimeout(() => {
      window.close()
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={s.root}>
      <div className={s.spinner} />
      <p>Logging you in...</p>
    </div>
  )
}