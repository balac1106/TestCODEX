import { useTranslation } from 'react-i18next'
import type { Lang } from '../types'

const langs: Lang[] = ['zh-TW', 'en', 'ja']

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  return (
    <div className="flex gap-1 bg-white/10 rounded-full p-0.5">
      {langs.map(lang => (
        <button
          key={lang}
          type="button"
          onClick={() => i18n.changeLanguage(lang)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
            i18n.language === lang
              ? 'bg-white text-indigo-900'
              : 'text-white/70 hover:text-white'
          }`}
        >
          {t(`lang.${lang}`)}
        </button>
      ))}
    </div>
  )
}
