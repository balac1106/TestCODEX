import type { Region } from '../types'

export const regions: Region[] = [
  {
    id: 'hokkaido',
    color: '#60a5fa',
    position: { top: '2%', left: '72%', width: '22%', height: '18%' },
    prefectures: ['hokkaido'],
  },
  {
    id: 'tohoku',
    color: '#34d399',
    position: { top: '22%', left: '68%', width: '18%', height: '22%' },
    prefectures: ['aomori', 'iwate', 'miyagi', 'akita', 'yamagata', 'fukushima'],
  },
  {
    id: 'kanto',
    color: '#f472b6',
    position: { top: '44%', left: '62%', width: '20%', height: '14%' },
    prefectures: ['ibaraki', 'tochigi', 'gunma', 'saitama', 'chiba', 'tokyo', 'kanagawa'],
  },
  {
    id: 'chubu',
    color: '#a78bfa',
    position: { top: '38%', left: '42%', width: '24%', height: '22%' },
    prefectures: ['niigata', 'toyama', 'ishikawa', 'fukui', 'yamanashi', 'nagano', 'gifu', 'shizuoka', 'aichi', 'mie'],
  },
  {
    id: 'kansai',
    color: '#fb923c',
    position: { top: '52%', left: '38%', width: '18%', height: '14%' },
    prefectures: ['shiga', 'kyoto', 'osaka', 'hyogo', 'nara', 'wakayama'],
  },
  {
    id: 'chugoku',
    color: '#fbbf24',
    position: { top: '48%', left: '18%', width: '20%', height: '14%' },
    prefectures: ['tottori', 'shimane', 'okayama', 'hiroshima', 'yamaguchi'],
  },
  {
    id: 'shikoku',
    color: '#2dd4bf',
    position: { top: '62%', left: '28%', width: '14%', height: '12%' },
    prefectures: ['tokushima', 'kagawa', 'ehime', 'kochi'],
  },
  {
    id: 'kyushu',
    color: '#f87171',
    position: { top: '58%', left: '4%', width: '18%', height: '22%' },
    prefectures: ['fukuoka', 'saga', 'nagasaki', 'kumamoto', 'oita', 'miyazaki', 'kagoshima', 'okinawa'],
  },
]
