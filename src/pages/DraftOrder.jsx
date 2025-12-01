import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function DraftOrder() {
  const [participants, setParticipants] = useState([])
  const [newParticipant, setNewParticipant] = useState('')
  const [draftOrder, setDraftOrder] = useState([])
  const [draftType, setDraftType] = useState('standard') // 'standard' or 'snake'
  const [numRounds, setNumRounds] = useState(1)

  const addParticipant = () => {
    if (newParticipant.trim() && !participants.includes(newParticipant.trim())) {
      setParticipants([...participants, newParticipant.trim()])
      setNewParticipant('')
    }
  }

  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index))
    setDraftOrder([])
  }

  const generateDraftOrder = () => {
    if (participants.length < 2) return

    // Shuffle participants
    const shuffled = [...participants].sort(() => Math.random() - 0.5)

    if (draftType === 'standard') {
      // Standard draft: repeat the order for each round
      const standardOrder = []
      for (let i = 0; i < numRounds; i++) {
        standardOrder.push(...shuffled)
      }
      setDraftOrder(standardOrder)
    } else {
      // Snake draft: alternate forward and reverse each round
      const snakeOrder = []
      for (let i = 0; i < numRounds; i++) {
        if (i % 2 === 0) {
          snakeOrder.push(...shuffled)
        } else {
          snakeOrder.push(...shuffled.slice().reverse())
        }
      }
      setDraftOrder(snakeOrder)
    }
  }

  const reset = () => {
    setDraftOrder([])
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button className="mac-button" style={{ marginBottom: '20px' }}>← Back to Home</button>
      </Link>

      <div className="mac-window">
        <div className="mac-window-header mac-window-header-active">
          <div className="mac-window-close"></div>
          <div className="mac-window-title">🎲 Draft Order Generator</div>
          <div style={{ width: '12px' }}></div>
        </div>
        <div className="mac-window-content">
          <div className="mac-groupbox">
            <div className="mac-groupbox-label">Draft Settings</div>

            {/* Draft Type Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
                Draft Type:
              </label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="draftType"
                    value="standard"
                    checked={draftType === 'standard'}
                    onChange={(e) => {
                      setDraftType(e.target.value)
                      setDraftOrder([])
                    }}
                  />
                  <span style={{ fontSize: '12px' }}>Standard</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="draftType"
                    value="snake"
                    checked={draftType === 'snake'}
                    onChange={(e) => {
                      setDraftType(e.target.value)
                      setDraftOrder([])
                    }}
                  />
                  <span style={{ fontSize: '12px' }}>Snake</span>
                </label>
              </div>
              <p style={{ fontSize: '11px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
                {draftType === 'standard'
                  ? 'Standard: Same order each round'
                  : 'Snake: Order reverses each round'}
              </p>
            </div>

            {/* Number of Rounds */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
                Number of Rounds:
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={numRounds}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1
                  setNumRounds(Math.max(1, Math.min(50, value)))
                  setDraftOrder([])
                }}
                className="mac-input"
                style={{ width: '100px' }}
              />
            </div>

            {/* Add Participants */}
            <div style={{ marginTop: '24px', marginBottom: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block' }}>
                Participants:
              </label>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addParticipant()}
                placeholder="Enter name"
                className="mac-input"
                style={{ flex: 1 }}
              />
              <button onClick={addParticipant} className="mac-button">Add</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {participants.map((participant, index) => (
                <div key={index} className="mac-tag">
                  <span>{participant}</span>
                  <span className="mac-tag-close" onClick={() => removeParticipant(index)}>×</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={generateDraftOrder}
                disabled={participants.length < 2}
                className="mac-button mac-button-primary"
                style={{ flex: 1 }}
              >
                Generate Draft Order
              </button>
              {draftOrder.length > 0 && (
                <button onClick={reset} className="mac-button">Reset</button>
              )}
            </div>
          </div>

          {draftOrder.length > 0 && (
            <div className="mac-groupbox">
              <div className="mac-groupbox-label">
                {draftType === 'standard' ? 'Draft Order' : 'Snake Draft Order'}
              </div>

              <div>
                {Array.from({ length: numRounds }, (_, roundIndex) => {
                  const roundStart = roundIndex * participants.length
                  const roundEnd = (roundIndex + 1) * participants.length
                  const roundParticipants = draftOrder.slice(roundStart, roundEnd)
                  const isReverse = draftType === 'snake' && roundIndex % 2 === 1
                  const colors = ['#4a90c8', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6']
                  const roundColor = colors[roundIndex % colors.length]

                  return (
                    <div key={roundIndex} style={{ marginBottom: roundIndex < numRounds - 1 ? '16px' : '0' }}>
                      {numRounds > 1 && (
                        <div style={{
                          fontSize: '12px',
                          fontWeight: 'bold',
                          marginBottom: '8px',
                          padding: '8px',
                          background: '#e8e8e8',
                          borderRadius: '4px'
                        }}>
                          Round {roundIndex + 1} {draftType === 'snake' ? (isReverse ? '(Reverse)' : '(Forward)') : ''}
                        </div>
                      )}
                      {roundParticipants.map((participant, index) => (
                        <div
                          key={`round${roundIndex}-${index}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px',
                            marginBottom: '8px',
                            background: 'white',
                            border: '2px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        >
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: numRounds > 1 ? roundColor : '#4a90c8',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            marginRight: '12px',
                            fontSize: '12px'
                          }}>
                            {roundStart + index + 1}
                          </div>
                          <span style={{ fontWeight: 'bold' }}>{participant}</span>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
