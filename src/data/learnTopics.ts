import type { LearnTopic } from '../types'

export const learnTopics: LearnTopic[] = [
  {
    id: 'location-1',
    category: 'location',
    emoji: '🗾',
    title: { 'zh-TW': '日本列島的位置', en: 'Location of the Japanese Archipelago', ja: '日本列島の位置' },
    content: {
      'zh-TW': '日本是位於亞洲東部、太平洋西岸的島國。由北海道、本州、四國、九州四大島及約 6,800 個小島組成，呈南北細長的弧形列島。北緯約 24°～46°，東經約 123°～146°。',
      en: 'Japan is an island nation in eastern Asia, facing the Pacific Ocean. It consists of Hokkaido, Honshu, Shikoku, Kyushu, and about 6,800 smaller islands, forming a long north-south arc. Latitude: 24°–46°N, Longitude: 123°–146°E.',
      ja: '日本はアジア東部、太平洋に面した島国。北海道・本州・四国・九州の4大島と約6,800の小島からなる南北に細長い列島。北緯約24°～46°、東経約123°～146°。',
    },
  },
  {
    id: 'location-2',
    category: 'location',
    emoji: '🏝️',
    title: { 'zh-TW': '領海與專屬經濟區', en: 'Territorial Waters & EEZ', ja: '領海と排他的経済水域' },
    content: {
      'zh-TW': '日本是四面環海的海洋國家。領海約 44 萬平方公里，加上專屬經濟區（EEZ）後，海洋管轄面積居世界前列，漁業和海洋資源豐富。',
      en: 'Japan is a maritime nation surrounded by sea on all sides. Its territorial waters cover about 440,000 km², and with its Exclusive Economic Zone (EEZ), Japan ranks among the top countries in ocean jurisdiction.',
      ja: '日本は四方を海に囲まれた海洋国家。領海約44万km²、排他的経済水域（EEZ）を含めると海洋管轄面積は世界有数。漁業資源が豊富。',
    },
  },
  {
    id: 'landform-1',
    category: 'landform',
    emoji: '⛰️',
    title: { 'zh-TW': '山地多、平原少', en: 'Mountains Dominate, Plains Are Scarce', ja: '山地が多く平野が少ない' },
    content: {
      'zh-TW': '日本國土約 70% 為山地，可居住地有限。主要平原有關東平野（日本最大）、濃尾平野、大阪平野等。人口和產業集中於平野部。',
      en: 'About 70% of Japan is mountainous, limiting habitable land. Major plains include the Kanto Plain (largest), Nobi Plain, and Osaka Plain. Population and industry concentrate in these lowlands.',
      ja: '国土の約70%が山地で、住める土地は限られる。主要平野は関東平野（最大）、濃尾平野、大阪平野など。人口と産業は平野部に集中。',
    },
  },
  {
    id: 'landform-2',
    category: 'landform',
    emoji: '🗻',
    title: { 'zh-TW': '富士山與日本阿爾卑斯', en: 'Mount Fuji & the Japanese Alps', ja: '富士山と日本アルプス' },
    content: {
      'zh-TW': '富士山（3,776m）是日本最高峰，為活火山也是世界文化遺產。日本阿爾卑斯（北・中・南阿爾卑斯）橫貫本州中部，是重要分水岭。',
      en: 'Mount Fuji (3,776m) is Japan\'s highest peak, an active volcano and World Cultural Heritage site. The Japanese Alps (Northern, Central, Southern) run through central Honshu as a major watershed.',
      ja: '富士山（3,776m）は日本最高峰の活火山で世界文化遺産。日本アルプス（北・中・南アルプス）は本州中部を横断する重要な分水嶺。',
    },
  },
  {
    id: 'landform-3',
    category: 'landform',
    emoji: '🌊',
    title: { 'zh-TW': '主要河川', en: 'Major Rivers', ja: '主要な河川' },
    content: {
      'zh-TW': '信濃川（367km）是日本最長河流，利根川流域面積最大。日本河川短而急，上游常建水壩用於發電和灌溉。',
      en: 'The Shinano River (367km) is Japan\'s longest. The Tone River has the largest basin. Japanese rivers are short and steep, with dams upstream for power and irrigation.',
      ja: '信濃川（367km）が日本最長、利根川が流域面積最大。日本の河川は短く急で、上流にダムが多く発電・灌漑に利用される。',
    },
  },
  {
    id: 'climate-1',
    category: 'climate',
    emoji: '🌸',
    title: { 'zh-TW': '四季分明', en: 'Four Distinct Seasons', ja: '四季がはっきりしている' },
    content: {
      'zh-TW': '日本大部分屬溫帶，四季分明。春有櫻花、夏有梅雨和颱風、秋有紅葉、冬有積雪。沖繩屬亞熱帶，全年溫暖。',
      en: 'Most of Japan has a temperate climate with four distinct seasons: cherry blossoms in spring, rainy season and typhoons in summer, autumn foliage, and winter snow. Okinawa is subtropical and warm year-round.',
      ja: '日本の大部分は温帯で四季がはっきり。春は桜、夏は梅雨と台風、秋は紅葉、冬は積雪。沖縄は亜熱帶で一年中温暖。',
    },
  },
  {
    id: 'climate-2',
    category: 'climate',
    emoji: '☔',
    title: { 'zh-TW': '梅雨與颱風', en: 'Rainy Season & Typhoons', ja: '梅雨と台風' },
    content: {
      'zh-TW': '每年 6～7 月，梅雨鋒面帶來連續降雨（梅雨/front）。夏末至秋季，颱風從太平洋登陸，常造成豪雨和災害。太平洋側降水多於日本海側。',
      en: 'From June to July, the rainy season front brings continuous rainfall (tsuyu/baiu). From late summer to autumn, typhoons from the Pacific cause heavy rain and disasters. The Pacific side receives more precipitation than the Sea of Japan side.',
      ja: '6～7月は梅雨前線による連続降雨（梅雨）。夏末から秋にかけて台風が上陸し豪雨災害をもたらす。太平洋側は日本海側より降水量が多い。',
    },
  },
  {
    id: 'climate-3',
    category: 'climate',
    emoji: '❄️',
    title: { 'zh-TW': '偏西風與季節風', en: 'Westerlies & Monsoon Winds', ja: '偏西風と季節風' },
    content: {
      'zh-TW': '冬季，偏西風帶來日本海側大量降雪（豪雪地帶）。夏季，東南季風（太平洋高氣壓）帶來溫暖濕潤空氣，形成高溫多雨的夏季。',
      en: 'In winter, westerlies bring heavy snow to the Sea of Japan side (snow country). In summer, the southeastern monsoon (Pacific high) brings warm, humid air, creating hot, rainy summers.',
      ja: '冬は偏西風により日本海側に大量の降雪（豪雪地帯）。夏は東南の季節風（太平洋高気圧）が温暖湿潤な空気をもたらし、高温多湿の夏になる。',
    },
  },
  {
    id: 'disaster-1',
    category: 'disaster',
    emoji: '🌋',
    title: { 'zh-TW': '地震與火山', en: 'Earthquakes & Volcanoes', ja: '地震と火山' },
    content: {
      'zh-TW': '日本位於環太平洋火山地震帶（火環），地震和火山活動頻繁。約 10% 的世界活火山位於日本，如富士山、阿蘇山、櫻島等。',
      en: 'Japan sits on the Pacific Ring of Fire, with frequent earthquakes and volcanic activity. About 10% of the world\'s active volcanoes are in Japan, including Fuji, Aso, and Sakurajima.',
      ja: '日本は環太平洋造山帯（ファイアリング）に位置し、地震・火山活動が頻繁。世界の活火山の約10%が日本にあり、富士山・阿蘇山・桜島などがある。',
    },
  },
  {
    id: 'disaster-2',
    category: 'disaster',
    emoji: '🌊',
    title: { 'zh-TW': '津波與豪雨', en: 'Tsunami & Heavy Rainfall', ja: '津波と豪雨' },
    content: {
      'zh-TW': '海底地震可引發津波，2011 年東日本大震災的津波造成嚴重破壞。近年因全球暖化，集中豪雨和線狀降水帶造成的洪水災害也日益增多。',
      en: 'Undersea earthquakes can trigger tsunamis; the 2011 Tohoku earthquake tsunami caused devastating damage. Recently, localized heavy rain and linear rainbands have increased flood disasters due to climate change.',
      ja: '海底地震は津波を引き起こす。2011年東日本大震災の津波は甚大な被害をもたらした。近年は地球温暖化により集中豪雨・線状降水帯による水害も増加。',
    },
  },
  {
    id: 'population-1',
    category: 'population',
    emoji: '🏙️',
    title: { 'zh-TW': '三大都市圈', en: 'Three Major Metropolitan Areas', ja: '三大都市圏' },
    content: {
      'zh-TW': '日本人口約 1.2 億，集中於平野部。三大都市圈為：① 京濱（東京・橫濱）② 中京（名古屋）③ 阪神（大阪・神戶）。加上北九州，合稱四大工業地帶。',
      en: 'Japan\'s population of about 120 million concentrates in plains. The three major metro areas are: ① Keihin (Tokyo-Yokohama) ② Chukyo (Nagoya) ③ Hanshin (Osaka-Kobe). With Kitakyushu, these form the four major industrial belts.',
      ja: '人口約1.2億は平野部に集中。三大都市圏は①京浜（東京・横浜）②中京（名古屋）③阪神（大阪・神戸）。北九州と合わせ四大工業地帯という。',
    },
  },
  {
    id: 'population-2',
    category: 'population',
    emoji: '👴',
    title: { 'zh-TW': '少子高齡化與過疏化', en: 'Aging & Rural Depopulation', ja: '少子高齢化と過疎化' },
    content: {
      'zh-TW': '日本出生率下降、人口老化嚴重，總人口已開始減少。地方和山村因年輕人外流出現過疏化（過度稀疏化），而都市則持續集中人口。',
      en: 'Japan faces declining birth rates and severe aging; total population is now decreasing. Rural and mountain areas suffer depopulation as youth migrate to cities, while urban areas continue to concentrate population.',
      ja: '出生率の低下と高齢化が進み、総人口は減少に転じた。地方や山村は若者の流出で過疎化が進み、都市部への人口集中が続いている。',
    },
  },
]
