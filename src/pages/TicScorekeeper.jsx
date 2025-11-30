import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CARD_RANKS = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

export default function TicScorekeeper() {
  const [players, setPlayers] = useState([])
  const [newPlayer, setNewPlayer] = useState('')
  const [scores, setScores] = useState({})
  const [savedGames, setSavedGames] = useState([])
  const [currentGameName, setCurrentGameName] = useState('')
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showLoadDialog, setShowLoadDialog] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('ticSavedGames')
    if (saved) {
      setSavedGames(JSON.parse(saved))
    }
  }, [])

  const addPlayer = () => {
    if (newPlayer.trim() && !players.includes(newPlayer.trim())) {
      const updatedPlayers = [...players, newPlayer.trim()]
      setPlayers(updatedPlayers)

      const newScores = { ...scores }
      CARD_RANKS.forEach((rank) => {
        if (!newScores[rank]) newScores[rank] = {}
        newScores[rank][newPlayer.trim()] = ''
      })
      setScores(newScores)
      setNewPlayer('')
    }
  }

  const removePlayer = (playerToRemove) => {
    setPlayers(players.filter((p) => p !== playerToRemove))
    const newScores = { ...scores }
    Object.keys(newScores).forEach((rank) => {
      delete newScores[rank][playerToRemove]
    })
    setScores(newScores)
  }

  const updateScore = (rank, player, value) => {
    setScores({
      ...scores,
      [rank]: {
        ...scores[rank],
        [player]: value
      }
    })
  }

  const calculateTotal = (player) => {
    return CARD_RANKS.reduce((total, rank) => {
      const score = scores[rank]?.[player]
      const num = parseInt(score) || 0
      return total + num
    }, 0)
  }

  const saveGame = () => {
    if (!currentGameName.trim()) return

    const gameData = {
      name: currentGameName.trim(),
      date: new Date().toISOString(),
      players,
      scores
    }

    const existingIndex = savedGames.findIndex((g) => g.name === currentGameName.trim())
    let updatedGames

    if (existingIndex >= 0) {
      updatedGames = [...savedGames]
      updatedGames[existingIndex] = gameData
    } else {
      updatedGames = [...savedGames, gameData]
    }

    setSavedGames(updatedGames)
    localStorage.setItem('ticSavedGames', JSON.stringify(updatedGames))
    setShowSaveDialog(false)
  }

  const loadGame = (game) => {
    setPlayers(game.players)
    setScores(game.scores)
    setCurrentGameName(game.name)
    setShowLoadDialog(false)
  }

  const deleteGame = (gameName) => {
    const updatedGames = savedGames.filter((g) => g.name !== gameName)
    setSavedGames(updatedGames)
    localStorage.setItem('ticSavedGames', JSON.stringify(updatedGames))
  }

  const newGame = () => {
    setPlayers([])
    setScores({})
    setCurrentGameName('')
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button className="mac-button">← Back to Home</button>
        </Link>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setShowLoadDialog(true)} className="mac-button">Load Game</button>
          <button onClick={() => setShowSaveDialog(true)} disabled={players.length === 0} className="mac-button">
            Save Game
          </button>
          <button onClick={newGame} className="mac-button">New Game</button>
        </div>
      </div>

      <div className="mac-window">
        <div className="mac-window-header mac-window-header-active">
          <div className="mac-window-close"></div>
          <div className="mac-window-title">🃏 Tic Scorekeeper</div>
          <div style={{ width: '12px' }}></div>
        </div>
        <div className="mac-window-content">
          {currentGameName && (
            <div style={{
              padding: '8px 16px',
              background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
              border: '2px solid #999',
              borderRadius: '4px',
              marginBottom: '16px',
              fontWeight: 'bold'
            }}>
              Current Game: {currentGameName}
            </div>
          )}

          <div className="mac-groupbox">
            <div className="mac-groupbox-label">Players</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={newPlayer}
                onChange={(e) => setNewPlayer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                placeholder="Enter player name"
                className="mac-input"
                style={{ flex: 1 }}
              />
              <button onClick={addPlayer} className="mac-button">Add Player</button>
            </div>
          </div>

          {players.length > 0 && (
            <div style={{ marginTop: '20px', overflowX: 'auto' }}>
              <table className="mac-table">
                <thead>
                  <tr>
                    <th style={{ fontWeight: 'bold' }}>Card</th>
                    {players.map((player) => (
                      <th key={player} style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          {player}
                          <span
                            onClick={() => removePlayer(player)}
                            style={{
                              cursor: 'pointer',
                              color: '#c00',
                              fontWeight: 'bold',
                              fontSize: '14px'
                            }}
                          >
                            ×
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CARD_RANKS.map((rank) => (
                    <tr key={rank}>
                      <td style={{ fontWeight: 'bold' }}>{rank}</td>
                      {players.map((player) => (
                        <td key={player} style={{ padding: '4px' }}>
                          <input
                            type="number"
                            value={scores[rank]?.[player] || ''}
                            onChange={(e) => updateScore(rank, player, e.target.value)}
                            placeholder="0"
                            className="mac-input"
                            style={{ width: '100%', textAlign: 'center' }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr style={{ background: 'linear-gradient(180deg, #f0f0f0 0%, #d8d8d8 100%)' }}>
                    <td style={{ fontWeight: 'bold' }}>TOTAL</td>
                    {players.map((player) => (
                      <td
                        key={player}
                        style={{
                          fontWeight: 'bold',
                          fontSize: '16px',
                          textAlign: 'center'
                        }}
                      >
                        {calculateTotal(player)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showSaveDialog && (
        <div className="mac-modal-overlay">
          <div className="mac-window" style={{ width: '500px', margin: '20px' }}>
            <div className="mac-window-header mac-window-header-active">
              <div className="mac-window-close" onClick={() => setShowSaveDialog(false)}></div>
              <div className="mac-window-title">Save Game</div>
              <div style={{ width: '12px' }}></div>
            </div>
            <div className="mac-window-content">
              <input
                type="text"
                value={currentGameName}
                onChange={(e) => setCurrentGameName(e.target.value)}
                placeholder="Enter game name"
                className="mac-input"
                style={{ width: '100%', marginBottom: '16px' }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={saveGame} className="mac-button mac-button-primary" style={{ flex: 1 }}>
                  Save
                </button>
                <button onClick={() => setShowSaveDialog(false)} className="mac-button" style={{ flex: 1 }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLoadDialog && (
        <div className="mac-modal-overlay">
          <div className="mac-window" style={{ width: '600px', maxHeight: '80vh', overflow: 'auto', margin: '20px' }}>
            <div className="mac-window-header mac-window-header-active">
              <div className="mac-window-close" onClick={() => setShowLoadDialog(false)}></div>
              <div className="mac-window-title">Load Game</div>
              <div style={{ width: '12px' }}></div>
            </div>
            <div className="mac-window-content">
              {savedGames.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '20px' }}>No saved games</p>
              ) : (
                <div style={{ marginBottom: '16px' }}>
                  {savedGames.map((game) => (
                    <div
                      key={game.name}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        marginBottom: '8px',
                        background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                        border: '2px solid #999',
                        borderRadius: '4px'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{game.name}</h4>
                        <p style={{ fontSize: '11px', color: '#666' }}>
                          {new Date(game.date).toLocaleDateString()} - {game.players.length} players
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => loadGame(game)} className="mac-button">Load</button>
                        <button onClick={() => deleteGame(game.name)} className="mac-button">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => setShowLoadDialog(false)} className="mac-button" style={{ width: '100%' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
