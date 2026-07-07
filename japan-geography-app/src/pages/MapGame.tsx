import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { regions } from '../data/regions'
import { prefectures } from '../data/prefectures'
import { shuffle, t as localize } from '../utils/localize'
import type { Lang } from '../types'

function pickQuestion() {
  const pref = prefectures[Math.floor(Math.random() * prefectures.length)]
  return { pref, correctRegionId: pref.regionId }
}

export default function MapGame() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as Lang

  const [question, setQuestion] = useState(pickQuestion)
  const [round, setRound] = useState(1)
  const [streak, setStreak] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [highlight, setHighlight] = useState<string | null>(null)

  const nextQuestion = useCallback(() => {
    setQuestion(pickQuestion())
    setFeedback(null)
    setHighlight(null)
    setRound(r => r + 1)
  }, [])

  function handleRegionClick(regionId: string) {
    if (feedback !== null) return

    if (regionId === question.correctRegionId) {
      setFeedback('correct')
      setHighlight(regionId)
      setStreak(s => s + 1)
      setTimeout(nextQuestion, 1200)
    } else {
      setFeedback('wrong')
      setHighlight(regionId)
      setStreak(0)
      setTimeout(() => {
        setFeedback(null)
        setHighlight(null)
      }, 800)
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{t('map.title')}</h2>
        <div className="flex gap-4 text-sm">
          <span>{t('map.round', { current: round })}</span>
          <span>{t('map.score')}: <span className="text-sakura-400 font-bold">{streak}</span></span>
        </div>
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-6 text-center">
        <p className="text-white/60 text-sm mb-2">{t('map.instruction')}</p>
        <p className="text-xl font-bold">
          {t('map.whichRegion', { name: localize(question.pref.name, lang) })}
        </p>
      </div>

      {feedback && (
        <div className={`text-center mb-4 font-bold animate-fade-in ${feedback === 'correct' ? 'text-matcha-400' : 'text-red-400'}`}>
          {feedback === 'correct' ? t('map.correct') : t('map.wrong')}
        </div>
      )}

      <div className="relative mx-auto max-w-lg aspect-[3/4] bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 100 120" className="w-full h-full" fill="none">
            <path d="M75 5 Q80 15 78 25 L72 45 Q68 55 65 60 L60 70 Q55 80 50 85 L40 90 Q30 95 20 100 L15 105 Q10 110 8 115" stroke="white" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </div>
        {regions.map(region => {
          const isCorrect = highlight === region.id && feedback === 'correct'
          const isWrong = highlight === region.id && feedback === 'wrong'
          return (
            <button
              key={region.id}
              type="button"
              onClick={() => handleRegionClick(region.id)}
              className={`absolute rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-xs font-bold p-1 ${
                isCorrect
                  ? 'border-matcha-400 bg-matcha-500/40 scale-105'
                  : isWrong
                    ? 'border-red-400 bg-red-500/30 animate-pulse'
                    : 'border-white/20 hover:border-white/50 hover:bg-white/10'
              }`}
              style={{
                top: region.position.top,
                left: region.position.left,
                width: region.position.width,
                height: region.position.height,
                backgroundColor: isCorrect || isWrong ? undefined : `${region.color}33`,
                borderColor: isCorrect ? undefined : isWrong ? undefined : `${region.color}88`,
              }}
            >
              <span className="text-center leading-tight drop-shadow-md">
                {t(`regions.${region.id}`)}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 grid grid-cols-4 sm:grid-cols-8 gap-2">
        {shuffle([...regions]).map(region => (
          <button
            key={region.id}
            type="button"
            onClick={() => handleRegionClick(region.id)}
            className="px-2 py-2 rounded-lg text-xs font-medium border border-white/10 hover:bg-white/10 transition-colors"
            style={{ borderLeftColor: region.color, borderLeftWidth: '3px' }}
          >
            {t(`regions.${region.id}`)}
          </button>
        ))}
      </div>
    </div>
  )
}
