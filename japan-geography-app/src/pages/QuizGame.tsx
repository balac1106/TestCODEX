import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { quizQuestions } from '../data/quizQuestions'
import { shuffle, t as localize } from '../utils/localize'
import type { Lang } from '../types'

export default function QuizGame() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as Lang

  const questions = useMemo(() => shuffle(quizQuestions).slice(0, 10), [])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)

  const q = questions[current]

  function handleSelect(index: number) {
    if (selected !== null) return
    setSelected(index)
    if (index === q.correctIndex) setScore(s => s + 1)
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  function handleRestart() {
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="animate-fade-in text-center py-12">
        <div className="text-6xl mb-4">{pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📖'}</div>
        <h2 className="text-2xl font-bold mb-2">{t('quiz.result')}</h2>
        <p className="text-white/70 mb-6">{t('quiz.resultMsg', { score, total: questions.length })}</p>
        <div className="text-5xl font-bold text-sakura-400 mb-8">{pct}%</div>
        <button
          type="button"
          onClick={handleRestart}
          className="px-6 py-3 bg-sakura-500 hover:bg-sakura-400 rounded-full font-semibold transition-colors"
        >
          {t('quiz.restart')}
        </button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{t('quiz.title')}</h2>
        <div className="text-sm text-white/60">
          {t('quiz.score')}: <span className="text-sakura-400 font-bold">{score}</span>
        </div>
      </div>

      <div className="mb-2 text-sm text-white/50">
        {t('quiz.question', { current: current + 1, total: questions.length })}
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 mb-6">
        <div
          className="bg-sakura-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
        <p className="text-lg font-semibold leading-relaxed">{localize(q.question, lang)}</p>
      </div>

      <div className="space-y-3 mb-6">
        {q.options.map((option, i) => {
          let cls = 'border-white/10 bg-white/5 hover:bg-white/10'
          if (selected !== null) {
            if (i === q.correctIndex) cls = 'border-matcha-500 bg-matcha-500/20'
            else if (i === selected) cls = 'border-red-400 bg-red-400/20'
            else cls = 'border-white/5 bg-white/5 opacity-50'
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`w-full text-left p-4 rounded-xl border transition-all ${cls}`}
            >
              <span className="inline-block w-7 h-7 rounded-full bg-white/10 text-center leading-7 text-sm mr-3">
                {String.fromCharCode(65 + i)}
              </span>
              {localize(option, lang)}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div className="animate-fade-in space-y-4">
          <div className={`p-4 rounded-xl ${selected === q.correctIndex ? 'bg-matcha-500/20 border border-matcha-500/30' : 'bg-red-400/10 border border-red-400/30'}`}>
            <p className="font-bold mb-1">{selected === q.correctIndex ? t('quiz.correct') : t('quiz.wrong')}</p>
            <p className="text-sm text-white/70">
              <span className="text-white/50">{t('quiz.explanation')}: </span>
              {localize(q.explanation, lang)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="w-full py-3 bg-sakura-500 hover:bg-sakura-400 rounded-xl font-semibold transition-colors"
          >
            {current + 1 >= questions.length ? t('quiz.finish') : t('quiz.next')}
          </button>
        </div>
      )}
    </div>
  )
}
