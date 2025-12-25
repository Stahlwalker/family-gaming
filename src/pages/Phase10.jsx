import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Phase10() {
  const [players, setPlayers] = useState([])
  const [newPlayerName, setNewPlayerName] = useState('')
  const [savedGames, setSavedGames] = useState([])
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showLoadModal, setShowLoadModal] = useState(false)
  const [gameName, setGameName] = useState('')
  const [showAddScoreModal, setShowAddScoreModal] = useState(false)
  const [addScorePlayerIndex, setAddScorePlayerIndex] = useState(null)
  const [scoreToAdd, setScoreToAdd] = useState('')
  const [extraRounds, setExtraRounds] = useState(0)

  const phases = [
    'Phase 1: 2 sets of 3',
    'Phase 2: 1 set of 3 + 1 run of 4',
    'Phase 3: 1 set of 4 + 1 run of 4',
    'Phase 4: 1 run of 7',
    'Phase 5: 1 run of 8',
    'Phase 6: 1 run of 9',
    'Phase 7: 2 sets of 4',
    'Phase 8: 7 cards of one color',
    'Phase 9: 1 set of 5 + 1 set of 2',
    'Phase 10: 1 set of 5 + 1 set of 3'
  ]

  useEffect(() => {
    const saved = localStorage.getItem('phase10-saved-games')
    if (saved) {
      setSavedGames(JSON.parse(saved))
    }
  }, [])

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      setPlayers([...players, {
        name: newPlayerName.trim(),
        currentPhase: 1,
        score: 0,
        phaseHistory: Array(10).fill(false),
        extraRoundsHistory: []
      }])
      setNewPlayerName('')
    }
  }

  const addExtraRound = () => {
    const newPlayers = players.map(player => ({
      ...player,
      extraRoundsHistory: [...(player.extraRoundsHistory || []), false]
    }))
    setPlayers(newPlayers)
    setExtraRounds(extraRounds + 1)
  }

  const toggleExtraRound = (playerIndex, roundIndex) => {
    const newPlayers = [...players]
    if (!newPlayers[playerIndex].extraRoundsHistory) {
      newPlayers[playerIndex].extraRoundsHistory = []
    }
    newPlayers[playerIndex].extraRoundsHistory[roundIndex] = !newPlayers[playerIndex].extraRoundsHistory[roundIndex]
    setPlayers(newPlayers)
  }

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index))
  }

  const updatePlayerScore = (playerIndex, value) => {
    const newPlayers = [...players]
    newPlayers[playerIndex].score = parseInt(value) || 0
    setPlayers(newPlayers)
  }

  const openAddScoreModal = (playerIndex) => {
    setAddScorePlayerIndex(playerIndex)
    setScoreToAdd('')
    setShowAddScoreModal(true)
  }

  const addScore = () => {
    if (scoreToAdd && addScorePlayerIndex !== null) {
      const newPlayers = [...players]
      const pointsToAdd = parseInt(scoreToAdd) || 0
      newPlayers[addScorePlayerIndex].score = (newPlayers[addScorePlayerIndex].score || 0) + pointsToAdd
      setPlayers(newPlayers)
      setShowAddScoreModal(false)
      setScoreToAdd('')
      setAddScorePlayerIndex(null)
    }
  }

  const completePhase = (playerIndex) => {
    const newPlayers = [...players]
    const currentPhase = newPlayers[playerIndex].currentPhase
    newPlayers[playerIndex].phaseHistory[currentPhase - 1] = true
    if (currentPhase < 10) {
      newPlayers[playerIndex].currentPhase = currentPhase + 1
    }
    setPlayers(newPlayers)
  }

  const resetPhase = (playerIndex, phaseNumber) => {
    const newPlayers = [...players]
    newPlayers[playerIndex].phaseHistory[phaseNumber - 1] = false
    newPlayers[playerIndex].currentPhase = phaseNumber
    setPlayers(newPlayers)
  }

  const saveGame = () => {
    if (gameName.trim()) {
      const newGame = {
        name: gameName.trim(),
        date: new Date().toISOString(),
        players: players
      }
      const updated = [...savedGames, newGame]
      localStorage.setItem('phase10-saved-games', JSON.stringify(updated))
      setSavedGames(updated)
      setGameName('')
      setShowSaveModal(false)
    }
  }

  const loadGame = (game) => {
    setPlayers(game.players)
    // Calculate extraRounds based on the loaded players' extraRoundsHistory
    const maxExtraRounds = Math.max(0, ...game.players.map(p => (p.extraRoundsHistory || []).length))
    setExtraRounds(maxExtraRounds)
    setShowLoadModal(false)
  }

  const deleteGame = (index) => {
    const updated = savedGames.filter((_, i) => i !== index)
    localStorage.setItem('phase10-saved-games', JSON.stringify(updated))
    setSavedGames(updated)
  }

  const newGame = () => {
    setPlayers([])
    setExtraRounds(0)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button className="mac-button" style={{ marginBottom: '20px' }}>← Back to Home</button>
      </Link>

      <div className="mac-window">
        <div className="mac-window-header mac-window-header-active">
          <div className="mac-window-close"></div>
          <div className="mac-window-title">🎴 Phase 10 Scorekeeper</div>
          <div style={{ width: '12px' }}></div>
        </div>
        <div className="mac-window-content">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button onClick={() => setShowSaveModal(true)} className="mac-button" disabled={players.length === 0}>
              Save Game
            </button>
            <button onClick={() => setShowLoadModal(true)} className="mac-button">
              Load Game
            </button>
            <button onClick={newGame} className="mac-button">
              New Game
            </button>
          </div>

          <div className="mac-groupbox">
            <div className="mac-groupbox-label">Add Players</div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                placeholder="Player name"
                className="mac-input"
                style={{ flex: 1 }}
              />
              <button onClick={addPlayer} className="mac-button">Add Player</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {players.map((player, index) => (
                <div key={index} className="mac-tag">
                  <span>{player.name}</span>
                  <span className="mac-tag-close" onClick={() => removePlayer(index)}>×</span>
                </div>
              ))}
            </div>
          </div>

          {players.length > 0 && (
            <div style={{ overflowX: 'auto', marginTop: '20px' }}>
              <table className="mac-table">
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Current Phase</th>
                    <th>Score</th>
                    {phases.map((phase, i) => (
                      <th key={i} style={{ minWidth: '40px', textAlign: 'center' }}>{i + 1}</th>
                    ))}
                    {Array.from({ length: extraRounds }, (_, i) => (
                      <th key={`extra-${i}`} style={{ minWidth: '40px', textAlign: 'center' }}>{i + 11}</th>
                    ))}
                    <th style={{ minWidth: '40px', textAlign: 'center' }}>
                      <button
                        onClick={addExtraRound}
                        className="mac-button"
                        style={{ padding: '2px 6px', fontSize: '14px' }}
                        title="Add extra round"
                      >
                        +
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, pIndex) => (
                    <tr key={pIndex}>
                      <td style={{ fontWeight: 'bold' }}>{player.name}</td>
                      <td style={{ textAlign: 'center' }}>{player.currentPhase}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <input
                            type="number"
                            value={player.score}
                            onChange={(e) => updatePlayerScore(pIndex, e.target.value)}
                            className="mac-input"
                            style={{ width: '80px' }}
                          />
                          <button
                            onClick={() => openAddScoreModal(pIndex)}
                            className="mac-button"
                            style={{ padding: '4px 8px', fontSize: '14px', minWidth: '32px' }}
                            title="Add points"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      {phases.map((phase, phaseIndex) => (
                        <td key={phaseIndex} style={{ textAlign: 'center' }}>
                          {player.phaseHistory[phaseIndex] ? (
                            <button
                              onClick={() => resetPhase(pIndex, phaseIndex + 1)}
                              className="mac-button"
                              style={{ padding: '2px 6px', fontSize: '16px' }}
                            >
                              ✓
                            </button>
                          ) : player.currentPhase === phaseIndex + 1 ? (
                            <button
                              onClick={() => completePhase(pIndex)}
                              className="mac-button mac-button-primary"
                              style={{ padding: '2px 6px', fontSize: '10px' }}
                            >
                              ✓
                            </button>
                          ) : (
                            <span style={{ color: '#999' }}>—</span>
                          )}
                        </td>
                      ))}
                      {Array.from({ length: extraRounds }, (_, roundIndex) => (
                        <td key={`extra-${roundIndex}`} style={{ textAlign: 'center' }}>
                          {player.extraRoundsHistory && player.extraRoundsHistory[roundIndex] ? (
                            <button
                              onClick={() => toggleExtraRound(pIndex, roundIndex)}
                              className="mac-button"
                              style={{ padding: '2px 6px', fontSize: '16px' }}
                            >
                              ✓
                            </button>
                          ) : (
                            <button
                              onClick={() => toggleExtraRound(pIndex, roundIndex)}
                              className="mac-button"
                              style={{ padding: '2px 6px', fontSize: '10px', opacity: 0.3 }}
                            >
                              ✓
                            </button>
                          )}
                        </td>
                      ))}
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ color: '#999' }}>—</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mac-groupbox" style={{ marginTop: '20px' }}>
                <div className="mac-groupbox-label">Phase Reference</div>
                <div style={{ fontSize: '11px', lineHeight: '1.8' }}>
                  {phases.map((phase, i) => (
                    <div key={i}>{phase}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="mac-modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="mac-window" style={{ width: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="mac-window-header mac-window-header-active">
              <div className="mac-window-close" onClick={() => setShowSaveModal(false)}></div>
              <div className="mac-window-title">Save Game</div>
              <div style={{ width: '12px' }}></div>
            </div>
            <div className="mac-window-content">
              <p style={{ marginBottom: '12px' }}>Enter a name for this game:</p>
              <input
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveGame()}
                placeholder="Game name"
                className="mac-input"
                style={{ width: '100%', marginBottom: '16px' }}
              />
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowSaveModal(false)} className="mac-button">Cancel</button>
                <button onClick={saveGame} className="mac-button mac-button-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Load Modal */}
      {showLoadModal && (
        <div className="mac-modal-overlay" onClick={() => setShowLoadModal(false)}>
          <div className="mac-window" style={{ width: '500px', maxHeight: '80vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div className="mac-window-header mac-window-header-active">
              <div className="mac-window-close" onClick={() => setShowLoadModal(false)}></div>
              <div className="mac-window-title">Load Game</div>
              <div style={{ width: '12px' }}></div>
            </div>
            <div className="mac-window-content">
              {savedGames.length === 0 ? (
                <p>No saved games found.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {savedGames.map((game, index) => (
                    <div key={index} className="mac-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div onClick={() => loadGame(game)} style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold' }}>{game.name}</div>
                        <div style={{ fontSize: '10px', color: '#666' }}>
                          {new Date(game.date).toLocaleDateString()} - {game.players.length} players
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteGame(index)
                        }}
                        className="mac-button"
                        style={{ padding: '4px 8px' }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <button onClick={() => setShowLoadModal(false)} className="mac-button">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Score Modal */}
      {showAddScoreModal && addScorePlayerIndex !== null && (
        <div className="mac-modal-overlay" onClick={() => setShowAddScoreModal(false)}>
          <div className="mac-window" style={{ width: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="mac-window-header mac-window-header-active">
              <div className="mac-window-close" onClick={() => setShowAddScoreModal(false)}></div>
              <div className="mac-window-title">Add Points to {players[addScorePlayerIndex].name}</div>
              <div style={{ width: '12px' }}></div>
            </div>
            <div className="mac-window-content">
              <p style={{ marginBottom: '12px' }}>
                Current Score: <strong>{players[addScorePlayerIndex].score}</strong>
              </p>
              <p style={{ marginBottom: '12px' }}>Enter points to add:</p>
              <input
                type="number"
                value={scoreToAdd}
                onChange={(e) => setScoreToAdd(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addScore()}
                placeholder="Points to add"
                className="mac-input"
                style={{ width: '100%', marginBottom: '16px' }}
                autoFocus
              />
              {scoreToAdd && (
                <p style={{ marginBottom: '16px', color: '#666', fontSize: '12px' }}>
                  New Score: {(players[addScorePlayerIndex].score || 0) + (parseInt(scoreToAdd) || 0)}
                </p>
              )}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowAddScoreModal(false)} className="mac-button">Cancel</button>
                <button onClick={addScore} className="mac-button mac-button-primary">Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
