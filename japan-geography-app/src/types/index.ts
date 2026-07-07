export type Lang = 'zh-TW' | 'en' | 'ja'

export interface LocalizedText {
  'zh-TW': string
  en: string
  ja: string
}

export interface Region {
  id: string
  color: string
  position: { top: string; left: string; width: string; height: string }
  prefectures: string[]
}

export interface Prefecture {
  id: string
  regionId: string
  capital: LocalizedText
  name: LocalizedText
  fact: LocalizedText
}

export interface LearnTopic {
  id: string
  category: 'location' | 'landform' | 'climate' | 'disaster' | 'population'
  title: LocalizedText
  content: LocalizedText
  emoji: string
}

export interface QuizQuestion {
  id: string
  category: 'region' | 'prefecture' | 'landform' | 'climate' | 'disaster' | 'population' | 'general'
  question: LocalizedText
  options: LocalizedText[]
  correctIndex: number
  explanation: LocalizedText
}
