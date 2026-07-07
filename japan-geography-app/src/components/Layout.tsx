import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const navItems = [
  { path: '/', key: 'home', icon: '🏠' },
  { path: '/explore', key: 'explore', icon: '🗾' },
  { path: '/quiz', key: 'quiz', icon: '❓' },
  { path: '/map', key: 'map', icon: '🗺️' },
  { path: '/flashcards', key: 'flashcards', icon: '🃏' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-indigo-900/80 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🗾</span>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">{t('app.title')}</h1>
              <p className="text-xs text-sakura-200 hidden sm:block">{t('app.subtitle')}</p>
            </div>
          </Link>
          <LanguageSwitcher />
        </div>
        <nav className="max-w-6xl mx-auto px-4 pb-2 flex gap-1 overflow-x-auto">
          {navItems.map(item => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-sakura-500 text-white font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{item.icon}</span>
                {t(`nav.${item.key}`)}
              </Link>
            )
          })}
        </nav>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="text-center text-white/40 text-xs py-4 border-t border-white/5">
        Japan Geography Quest · 日本地理探險 · 日本地理探検
      </footer>
    </div>
  )
}
