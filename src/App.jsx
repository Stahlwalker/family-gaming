import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SpinWheel from './pages/SpinWheel'
import Randomizer from './pages/Randomizer'
import DraftOrder from './pages/DraftOrder'
import TicScorekeeper from './pages/TicScorekeeper'
import Phase10 from './pages/Phase10'
import Blackjack from './pages/Blackjack'
import Solitaire from './pages/Solitaire'
import './macos9.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spin-wheel" element={<SpinWheel />} />
        <Route path="/randomizer" element={<Randomizer />} />
        <Route path="/draft-order" element={<DraftOrder />} />
        <Route path="/tic-scorekeeper" element={<TicScorekeeper />} />
        <Route path="/phase-10" element={<Phase10 />} />
        <Route path="/blackjack" element={<Blackjack />} />
        <Route path="/solitaire" element={<Solitaire />} />
      </Routes>
    </Router>
  )
}

export default App
