import { useState, useRef, useEffect } from 'react'
import s from './Header.module.css'
import { useGetMeQuery, useLogoutMutation } from '@/features/auth/api/authApi'
import { Login } from '@/features/auth/ui/Login'
import { Icon } from '@/common/components/Icon/Icon'

export const Header = () => {
    const { data } = useGetMeQuery()
    const [logout] = useLogoutMutation()
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!menuOpen) return
        const onClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', onClick)
        return () => document.removeEventListener('mousedown', onClick)
    }, [menuOpen])

    const logoutHandler = () => {
        setMenuOpen(false)
        logout()
    }

    const avatarLetter = data?.login?.charAt(0).toUpperCase() ?? '?'

    return (
        <header className={s.header}>
            <div className={s.spacer} />
            {data ? (
                <div className={s.userMenu} ref={menuRef}>
                    <button
                        className={s.userBtn}
                        onClick={() => setMenuOpen(o => !o)}
                        type="button"
                    >
                        <span className={s.avatar}>{avatarLetter}</span>
                        <span className={s.userName}>{data.login}</span>
                        <Icon
                            name="chevron-down"
                            size={14}
                            style={{
                                transition: 'transform 0.2s ease',
                                transform: menuOpen ? 'rotate(180deg)' : 'none',
                            }}
                        />
                    </button>
                    {menuOpen && (
                        <div className={s.dropdown} role="menu">
                            <button className={s.dropdownItem} type="button">
                                <Icon name="user" size={16} />
                                My Profile
                            </button>
                            <div className={s.dropdownDivider} />
                            <button
                                className={s.dropdownItem}
                                onClick={logoutHandler}
                                type="button"
                            >
                                <Icon name="logout" size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <Login />
            )}
        </header>
    )
}