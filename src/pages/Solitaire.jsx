import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SUITS = ['♠', '♥', '♦', '♣']
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

const createDeck = () => {
  const deck = []
  SUITS.forEach((suit, suitIndex) => {
    VALUES.forEach((value, valueIndex) => {
      deck.push({
        suit,
        value,
        suitIndex,
        valueIndex,
        id: `${suit}-${value}`
      })
    })
  })
  return deck
}

const shuffleDeck = (deck) => {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Solitaire() {
  const [stock, setStock] = useState([])
  const [waste, setWaste] = useState([])
  const [foundations, setFoundations] = useState([[], [], [], []])
  const [tableau, setTableau] = useState([[], [], [], [], [], [], []])
  const [draggedCard, setDraggedCard] = useState(null)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    newGame()
  }, [])

  useEffect(() => {
    checkWin()
  }, [foundations])

  const newGame = () => {
    const deck = shuffleDeck(createDeck())
    const newTableau = [[], [], [], [], [], [], []]
    let deckIndex = 0

    // Deal cards to tableau
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row <= col; row++) {
        newTableau[col].push({
          ...deck[deckIndex],
          faceUp: row === col
        })
        deckIndex++
      }
    }

    setTableau(newTableau)
    setStock(deck.slice(deckIndex))
    setWaste([])
    setFoundations([[], [], [], []])
    setDraggedCard(null)
    setGameWon(false)
  }

  const checkWin = () => {
    const allComplete = foundations.every(foundation => foundation.length === 13)
    if (allComplete) {
      setGameWon(true)
    }
  }

  const drawFromStock = () => {
    if (stock.length === 0) {
      setStock([...waste].reverse())
      setWaste([])
    } else {
      const newCard = { ...stock[0], faceUp: true }
      setWaste([newCard, ...waste])
      setStock(stock.slice(1))
    }
  }

  const canPlaceOnFoundation = (card, foundation) => {
    if (foundation.length === 0) {
      return card.value === 'A'
    }
    const topCard = foundation[foundation.length - 1]
    return card.suit === topCard.suit && card.valueIndex === topCard.valueIndex + 1
  }

  const canPlaceOnTableau = (card, column) => {
    if (column.length === 0) {
      return card.value === 'K'
    }
    const topCard = column[column.length - 1]
    const isRed1 = card.suit === '♥' || card.suit === '♦'
    const isRed2 = topCard.suit === '♥' || topCard.suit === '♦'
    return isRed1 !== isRed2 && card.valueIndex === topCard.valueIndex - 1
  }

  const handleDragStart = (e, card, source, sourceIndex) => {
    if (!card.faceUp) return

    let cards = []
    if (source === 'waste') {
      cards = [waste[0]]
    } else if (source === 'tableau') {
      const col = tableau[sourceIndex]
      const cardIndex = col.findIndex(c => c.id === card.id)
      cards = col.slice(cardIndex)
    } else if (source === 'foundation') {
      cards = [foundations[sourceIndex][foundations[sourceIndex].length - 1]]
    }

    setDraggedCard({ cards, source, sourceIndex })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDropOnTableau = (e, targetIndex) => {
    e.preventDefault()
    if (!draggedCard) return

    const cards = draggedCard.cards
    if (canPlaceOnTableau(cards[0], tableau[targetIndex])) {
      // Add cards to target
      const newTableau = [...tableau]
      newTableau[targetIndex] = [...newTableau[targetIndex], ...cards]

      // Remove from source
      if (draggedCard.source === 'waste') {
        setWaste(waste.slice(1))
      } else if (draggedCard.source === 'tableau') {
        const col = [...tableau[draggedCard.sourceIndex]]
        const cardIndex = col.findIndex(c => c.id === cards[0].id)
        const newCol = col.slice(0, cardIndex)

        if (newCol.length > 0 && !newCol[newCol.length - 1].faceUp) {
          newCol[newCol.length - 1].faceUp = true
        }

        newTableau[draggedCard.sourceIndex] = newCol
      } else if (draggedCard.source === 'foundation') {
        const newFoundations = [...foundations]
        newFoundations[draggedCard.sourceIndex] = newFoundations[draggedCard.sourceIndex].slice(0, -1)
        setFoundations(newFoundations)
      }

      setTableau(newTableau)
    }

    setDraggedCard(null)
  }

  const handleDropOnFoundation = (e, foundationIndex) => {
    e.preventDefault()
    if (!draggedCard || draggedCard.cards.length !== 1) return

    const card = draggedCard.cards[0]
    if (canPlaceOnFoundation(card, foundations[foundationIndex])) {
      // Add to foundation
      const newFoundations = [...foundations]
      newFoundations[foundationIndex] = [...newFoundations[foundationIndex], card]

      // Remove from source
      if (draggedCard.source === 'waste') {
        setWaste(waste.slice(1))
      } else if (draggedCard.source === 'tableau') {
        const col = [...tableau[draggedCard.sourceIndex]]
        const newCol = col.slice(0, -1)

        if (newCol.length > 0 && !newCol[newCol.length - 1].faceUp) {
          newCol[newCol.length - 1].faceUp = true
        }

        const newTableau = [...tableau]
        newTableau[draggedCard.sourceIndex] = newCol
        setTableau(newTableau)
      } else if (draggedCard.source === 'foundation') {
        newFoundations[draggedCard.sourceIndex] = newFoundations[draggedCard.sourceIndex].slice(0, -1)
      }

      setFoundations(newFoundations)
    }

    setDraggedCard(null)
  }

  const Card = ({ card, onDragStart, style = {} }) => {
    if (!card) {
      return (
        <div style={{
          width: '60px',
          height: '85px',
          border: '2px dashed rgba(255,255,255,0.3)',
          borderRadius: '6px',
          ...style
        }} />
      )
    }

    if (!card.faceUp) {
      return (
        <div style={{
          width: '60px',
          height: '85px',
          background: 'linear-gradient(135deg, #1a5490 0%, #2a6fa8 100%)',
          border: '2px solid #333',
          borderRadius: '6px',
          cursor: 'default',
          boxShadow: '1px 1px 3px rgba(0,0,0,0.3)',
          ...style
        }} />
      )
    }

    const isRed = card.suit === '♥' || card.suit === '♦'

    return (
      <div
        draggable={!!onDragStart}
        onDragStart={onDragStart}
        style={{
          width: '60px',
          height: '85px',
          background: 'white',
          border: '2px solid #333',
          borderRadius: '6px',
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: onDragStart ? 'grab' : 'default',
          boxShadow: '1px 1px 3px rgba(0,0,0,0.3)',
          position: 'relative',
          userSelect: 'none',
          ...style
        }}
      >
        <div style={{
          fontSize: '11px',
          fontWeight: 'bold',
          color: isRed ? '#d32f2f' : '#000',
          lineHeight: '1',
          pointerEvents: 'none'
        }}>
          {card.value}
          <div style={{ fontSize: '14px' }}>{card.suit}</div>
        </div>
        <div style={{
          fontSize: '24px',
          textAlign: 'center',
          color: isRed ? '#d32f2f' : '#000',
          pointerEvents: 'none'
        }}>
          {card.suit}
        </div>
        <div style={{
          fontSize: '11px',
          fontWeight: 'bold',
          color: isRed ? '#d32f2f' : '#000',
          textAlign: 'right',
          lineHeight: '1',
          transform: 'rotate(180deg)',
          pointerEvents: 'none'
        }}>
          {card.value}
          <div style={{ fontSize: '14px' }}>{card.suit}</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a5490 0%, #2a6fa8 50%, #1a5490 100%)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div className="mac-window" style={{ width: '95%', maxWidth: '900px', marginBottom: '20px' }}>
        <div className="mac-window-header mac-window-header-active">
          <Link to="/" className="mac-window-close"></Link>
          <div className="mac-window-title">Solitaire</div>
          <div style={{ width: '12px' }}></div>
        </div>

        <div className="mac-window-content" style={{
          padding: '20px',
          background: '#1a7f4f',
          minHeight: '600px'
        }}>
          {/* Top Row: Stock, Waste, Foundations, and New Game Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* Stock */}
              <div
                onClick={drawFromStock}
                style={{
                  width: '60px',
                  height: '85px',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {stock.length > 0 ? (
                  <Card card={{ ...stock[0], faceUp: false }} />
                ) : (
                  <div style={{
                    width: '60px',
                    height: '85px',
                    border: '2px dashed rgba(255,255,255,0.3)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '24px',
                    textAlign: 'center'
                  }}>
                    ↻
                  </div>
                )}
              </div>

              {/* Waste */}
              <div style={{ width: '60px', height: '85px', position: 'relative' }}>
                {waste.length > 0 ? (
                  <Card
                    card={waste[0]}
                    onDragStart={(e) => handleDragStart(e, waste[0], 'waste', 0)}
                  />
                ) : (
                  <Card card={null} />
                )}
              </div>
            </div>

            {/* New Game Button */}
            <button
              onClick={newGame}
              className="mac-button mac-button-primary"
              style={{ fontSize: '12px', padding: '6px 16px' }}
            >
              New Game
            </button>

            {/* Foundations */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {foundations.map((foundation, index) => (
                <div
                  key={index}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropOnFoundation(e, index)}
                  style={{
                    width: '60px',
                    height: '85px',
                    cursor: 'pointer'
                  }}
                >
                  {foundation.length > 0 ? (
                    <Card
                      card={foundation[foundation.length - 1]}
                      onDragStart={(e) => handleDragStart(e, foundation[foundation.length - 1], 'foundation', index)}
                    />
                  ) : (
                    <Card card={null} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tableau */}
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center'
          }}>
            {tableau.map((column, colIndex) => (
              <div
                key={colIndex}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropOnTableau(e, colIndex)}
                style={{
                  width: '60px',
                  minHeight: '300px',
                  position: 'relative'
                }}
              >
                {column.length === 0 ? (
                  <Card card={null} />
                ) : (
                  column.map((card, cardIndex) => (
                    <Card
                      key={card.id}
                      card={card}
                      onDragStart={(e) => handleDragStart(e, card, 'tableau', colIndex)}
                      style={{
                        position: cardIndex === 0 ? 'relative' : 'absolute',
                        top: cardIndex === 0 ? 0 : `${cardIndex * 20}px`,
                        left: 0
                      }}
                    />
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <button className="mac-button" style={{ fontSize: '12px' }}>
          ← Back to Home
        </button>
      </Link>

      {/* Win Message */}
      {gameWon && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '30px 40px',
          borderRadius: '8px',
          border: '3px solid #333',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          textAlign: 'center',
          zIndex: 1000
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>You Win!</h2>
          <p style={{ fontSize: '14px', marginBottom: '20px' }}>Congratulations!</p>
          <button
            onClick={newGame}
            className="mac-button mac-button-primary"
            style={{ fontSize: '14px', padding: '8px 24px' }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
