import { useEffect } from "react"

export const OAuthCallback = () => {
  useEffect(() => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')

    // 1. Проверяем в консоли всплывающего окна, пришел ли код и доступен ли opener
    console.log('[OAuthCallback] Code:', code)
    console.log('[OAuthCallback] Opener available:', !!window.opener)

    if (code && window.opener) {
      // 2. Отправляем код в основное окно
      window.opener.postMessage({ code }, '*')
    } else {
      if (!code) console.error('[OAuthCallback] Параметр "code" не найден в URL')
      if (!window.opener) console.error('[OAuthCallback] window.opener недоступен')
    }

    // 3. Даем задержку в 300мс, чтобы postMessage успел обработаться до закрытия окна
    const timer = setTimeout(() => {
      window.close()
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <p>Logging you in...</p>
    </div>
  )
}