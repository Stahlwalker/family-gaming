import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Randomizer() {
  const [participants, setParticipants] = useState([])
  const [newParticipant, setNewParticipant] = useState('')
  const [pairings, setPairings] = useState([])
  const [revealed, setRevealed] = useState(new Set())

  useEffect(() => {
    const saved = localStorage.getItem('familyMembers')
    if (saved) {
      setParticipants(JSON.parse(saved))
    }
  }, [])

  const addParticipant = () => {
    if (newParticipant.trim() && !participants.includes(newParticipant.trim())) {
      setParticipants([...participants, newParticipant.trim()])
      setNewParticipant('')
    }
  }

  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index))
    setPairings([])
    setRevealed(new Set())
  }

  const generatePairings = () => {
    if (participants.length < 2) return

    let givers = [...participants]
    let receivers = [...participants]
    let newPairings = []
    let attempts = 0
    const maxAttempts = 100

    while (attempts < maxAttempts) {
      newPairings = []
      let tempGivers = [...givers]
      let tempReceivers = [...receivers]
      let valid = true

      for (let i = 0; i < tempGivers.length; i++) {
        const giver = tempGivers[i]
        const availableReceivers = tempReceivers.filter((r) => r !== giver)

        if (availableReceivers.length === 0) {
          valid = false
          break
        }

        const receiver = availableReceivers[Math.floor(Math.random() * availableReceivers.length)]
        newPairings.push({ giver, receiver })
        tempReceivers = tempReceivers.filter((r) => r !== receiver)
      }

      if (valid) {
        setPairings(newPairings)
        setRevealed(new Set())
        return
      }

      attempts++
    }
  }

  const toggleReveal = (index) => {
    const newRevealed = new Set(revealed)
    if (newRevealed.has(index)) {
      newRevealed.delete(index)
    } else {
      newRevealed.add(index)
    }
    setRevealed(newRevealed)
  }

  const reset = () => {
    setPairings([])
    setRevealed(new Set())
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button className="mac-button" style={{ marginBottom: '20px' }}>← Back to Home</button>
      </Link>

      <div className="mac-window">
        <div className="mac-window-header mac-window-header-active">
          <div className="mac-window-close"></div>
          <div className="mac-window-title">🎁 Match Generator</div>
          <div style={{ width: '12px' }}></div>
        </div>
        <div className="mac-window-content">
          <div className="mac-groupbox">
            <div className="mac-groupbox-label">Participants</div>

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
                onClick={generatePairings}
                disabled={participants.length < 2}
                className="mac-button mac-button-primary"
                style={{ flex: 1 }}
              >
                Generate Pairings
              </button>
              {pairings.length > 0 && (
                <button onClick={reset} className="mac-button">Reset</button>
              )}
            </div>
          </div>

          {pairings.length > 0 && (
            <div className="mac-groupbox">
              <div className="mac-groupbox-label">Secret Pairings</div>
              <p style={{ marginBottom: '16px' }}>
                Click each card to reveal who you're giving to
              </p>

              {pairings.map((pair, index) => (
                <div
                  key={index}
                  onClick={() => toggleReveal(index)}
                  className={revealed.has(index) ? 'mac-card mac-card-revealed' : 'mac-card'}
                  style={{ marginBottom: '12px' }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: 'bold'
                  }}>
                    <span>{pair.giver}</span>
                    {revealed.has(index) ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '18px' }}>→</span>
                        <span>{pair.receiver}</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '11px', fontWeight: 'normal' }}>Click to reveal</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
