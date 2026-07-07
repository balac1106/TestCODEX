import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { regions } from '../data/regions'
import { getPrefecturesByRegion } from '../data/prefectures'
import { learnTopics } from '../data/learnTopics'
import { t as localize } from '../utils/localize'
import type { Lang } from '../types'

export default function Explore() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as Lang
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const categoryOrder = ['location', 'landform', 'climate', 'disaster', 'population'] as const

  return (
    <div className="animate-fade-in space-y-8">
      <h2 className="text-2xl font-bold">{t('explore.title')}</h2>

      <section>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>📍</span> {t('explore.regions')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {regions.map(region => (
            <button
              key={region.id}
              type="button"
              onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
              className={`card-hover rounded-xl p-4 text-left border transition-all ${
                selectedRegion === region.id
                  ? 'border-white/40 bg-white/15 scale-[1.02]'
                  : 'border-white/10 bg-white/5'
              }`}
              style={{ borderLeftColor: region.color, borderLeftWidth: '4px' }}
            >
              <div className="font-bold">{t(`regions.${region.id}`)}</div>
              <div className="text-xs text-white/50 mt-1">
                {getPrefecturesByRegion(region.id).length} {t('home.stats.prefectures')}
              </div>
            </button>
          ))}
        </div>

        {selectedRegion ? (
          <div className="mt-4 bg-white/5 rounded-2xl p-5 border border-white/10 animate-fade-in">
            <h4 className="font-bold text-lg mb-3 text-sakura-300">
              {t(`regions.${selectedRegion}`)} — {t('explore.prefectures')}
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {getPrefecturesByRegion(selectedRegion).map(pref => (
                <div key={pref.id} className="bg-white/5 rounded-lg p-3 border border-white/5">
                  <div className="font-semibold">{localize(pref.name, lang)}</div>
                  <div className="text-xs text-white/50">
                    {t('explore.capital')}: {localize(pref.capital, lang)}
                  </div>
                  <div className="text-xs text-white/40 mt-1 leading-relaxed">{localize(pref.fact, lang)}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-white/40 text-sm mt-3">{t('explore.selectRegion')}</p>
        )}
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>📚</span> {t('explore.topics')}
        </h3>
        {categoryOrder.map(cat => {
          const topics = learnTopics.filter(tp => tp.category === cat)
          if (topics.length === 0) return null
          return (
            <div key={cat} className="mb-6">
              <h4 className="text-sm font-semibold text-sakura-300 mb-3 uppercase tracking-wide">
                {t(`categories.${cat}`)}
              </h4>
              <div className="space-y-3">
                {topics.map(topic => (
                  <div key={topic.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{topic.emoji}</span>
                      <div>
                        <h5 className="font-bold">{localize(topic.title, lang)}</h5>
                        <p className="text-white/70 text-sm mt-1 leading-relaxed">{localize(topic.content, lang)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
