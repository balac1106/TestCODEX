import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { prefectures } from '../data/prefectures'
import { shuffle, t as localize } from '../utils/localize'
import type { Lang } from '../types'

export default function FlashCards() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as Lang

  const [cards, setCards] = useState(() => shuffle(prefectures))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const card = cards[index]

  function handleFlip() {
    setFlipped(f => !f)
  }

  function handleNext() {
    setFlipped(false)
    setIndex(i => (i + 1) % cards.length)
  }

  function handlePrev() {
    setFlipped(false)
    setIndex(i => (i - 1 + cards.length) % cards.length)
  }

  function handleShuffle() {
    setFlipped(false)
    setCards(shuffle(prefectures))
    setIndex(0)
  }

  const regionName = useMemo(() => t(`regions.${card.regionId}`), [card.regionId, t])

  return (
    <div className="animate-fade-in max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{t('flashcards.title')}</h2>
        <span className="text-sm text-white/50">
          {t('flashcards.progress', { current: index + 1, total: cards.length })}
        </span>
      </div>

      <div className="perspective-1000 mb-6">
        <button
          type="button"
          onClick={handleFlip}
          className="w-full aspect-[3/2] relative cursor-pointer"
          style={{ perspective: '1000px' }}
        >
          <div
            className="w-full h-full transition-transform duration-500 relative"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-sakura-500/30 to-indigo-800/50 rounded-2xl border border-white/20 flex flex-col items-center justify-center p-6"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <p className="text-sm text-white/50 mb-4">{t('flashcards.tapToFlip')}</p>
              <p className="text-3xl font-bold">{localize(card.name, lang)}</p>
              <p className="text-sm text-white/40 mt-2">{regionName}</p>
            </div>
            {/* Back */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-matcha-500/20 to-indigo-800/50 rounded-2xl border border-white/20 flex flex-col items-center justify-center p-6"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="space-y-4 text-center">
                <div>
                  <p className="text-xs text-white/50 uppercase">{t('flashcards.capital')}</p>
                  <p className="text-xl font-bold">{localize(card.capital, lang)}</p>
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase">{t('flashcards.fact')}</p>
                  <p className="text-sm text-white/80 leading-relaxed">{localize(card.fact, lang)}</p>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          type="button"
          onClick={handlePrev}
          className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors"
        >
          ← {t('flashcards.prev')}
        </button>
        <button
          type="button"
          onClick={handleShuffle}
          className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors"
        >
          🔀 {t('flashcards.shuffle')}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-5 py-2.5 bg-sakura-500 hover:bg-sakura-400 rounded-xl text-sm font-medium transition-colors"
        >
          {t('flashcards.next')} →
        </button>
      </div>
    </div>
  )
}
