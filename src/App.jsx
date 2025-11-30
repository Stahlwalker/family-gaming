import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SpinWheel from './pages/SpinWheel'
import Randomizer from './pages/Randomizer'
import TicScorekeeper from './pages/TicScorekeeper'
import Phase10 from './pages/Phase10'
import './macos9.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spin-wheel" element={<SpinWheel />} />
        <Route path="/randomizer" element={<Randomizer />} />
        <Route path="/tic-scorekeeper" element={<TicScorekeeper />} />
        <Route path="/phase-10" element={<Phase10 />} />
      </Routes>
    </Router>
  )
}

export default App
