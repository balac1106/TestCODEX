import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import QuizGame from './pages/QuizGame'
import MapGame from './pages/MapGame'
import FlashCards from './pages/FlashCards'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/quiz" element={<QuizGame />} />
          <Route path="/map" element={<MapGame />} />
          <Route path="/flashcards" element={<FlashCards />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
