import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { prefectures } from '../data/prefectures'
import { regions } from '../data/regions'
import { learnTopics } from '../data/learnTopics'
import { quizQuestions } from '../data/quizQuestions'

const modes = [
  { path: '/explore', key: 'explore', icon: '🗾', color: 'from-blue-500/20 to-blue-600/10' },
  { path: '/quiz', key: 'quiz', icon: '❓', color: 'from-pink-500/20 to-pink-600/10' },
  { path: '/map', key: 'map', icon: '🗺️', color: 'from-green-500/20 to-green-600/10' },
  { path: '/flashcards', key: 'flashcards', icon: '🃏', color: 'from-purple-500/20 to-purple-600/10' },
]

export default function Home() {
  const { t } = useTranslation()

  const stats = [
    { value: prefectures.length, label: t('home.stats.prefectures'), icon: '🏛️' },
    { value: regions.length, label: t('home.stats.regions'), icon: '📍' },
    { value: learnTopics.length, label: t('home.stats.topics'), icon: '📚' },
    { value: quizQuestions.length, label: t('home.stats.questions'), icon: '✏️' },
  ]

  return (
    <div className="animate-fade-in space-y-8">
      <section className="text-center py-8">
        <div className="text-6xl mb-4">🗾</div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-sakura-200 to-white bg-clip-text text-transparent">
          {t('home.welcome')}
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
          {t('app.description')}
        </p>
        <Link
          to="/explore"
          className="inline-block mt-6 px-8 py-3 bg-sakura-500 hover:bg-sakura-400 text-white font-semibold rounded-full transition-colors animate-pulse-glow"
        >
          {t('home.startLearning')} →
        </Link>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white/5 backdrop-blur rounded-2xl p-4 text-center border border-white/10">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-3xl font-bold text-sakura-400">{stat.value}</div>
            <div className="text-sm text-white/60">{stat.label}</div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">{t('home.modes')}</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {modes.map(mode => (
            <Link
              key={mode.path}
              to={mode.path}
              className={`card-hover bg-gradient-to-br ${mode.color} backdrop-blur rounded-2xl p-6 border border-white/10 block`}
            >
              <div className="text-4xl mb-3">{mode.icon}</div>
              <h4 className="text-lg font-bold mb-2">{t(`nav.${mode.key}`)}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{t(`home.modeDesc.${mode.key}`)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
