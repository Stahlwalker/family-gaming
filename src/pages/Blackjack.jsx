import { useState } from 'react'
import { Link } from 'react-router-dom'

const SUITS = ['♠', '♥', '♦', '♣']
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

const createDeck = () => {
  const deck = []
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({ suit, value })
    }
  }
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

const calculateHandValue = (hand) => {
  let value = 0
  let aces = 0

  for (const card of hand) {
    if (card.value === 'A') {
      aces++
      value += 11
    } else if (['J', 'Q', 'K'].includes(card.value)) {
      value += 10
    } else {
      value += parseInt(card.value)
    }
  }

  while (value > 21 && aces > 0) {
    value -= 10
    aces--
  }

  return value
}

export default function Blackjack() {
  const [deck, setDeck] = useState(shuffleDeck(createDeck()))
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [gameState, setGameState] = useState('betting') // betting, playing, dealer, ended
  const [message, setMessage] = useState('Place your bet and deal!')
  const [dealerRevealed, setDealerRevealed] = useState(false)

  const startGame = () => {
    const newDeck = shuffleDeck(createDeck())
    const player = [newDeck[0], newDeck[2]]
    const dealer = [newDeck[1], newDeck[3]]
    const remaining = newDeck.slice(4)

    setDeck(remaining)
    setPlayerHand(player)
    setDealerHand(dealer)
    setGameState('playing')
    setMessage('Hit or Stand?')
    setDealerRevealed(false)

    const playerValue = calculateHandValue(player)
    if (playerValue === 21) {
      setGameState('ended')
      setDealerRevealed(true)
      setMessage('Blackjack! You win!')
    }
  }

  const hit = () => {
    if (gameState !== 'playing') return

    const newCard = deck[0]
    const newHand = [...playerHand, newCard]
    const newDeck = deck.slice(1)

    setPlayerHand(newHand)
    setDeck(newDeck)

    const value = calculateHandValue(newHand)
    if (value > 21) {
      setGameState('ended')
      setDealerRevealed(true)
      setMessage('Bust! Dealer wins.')
    } else if (value === 21) {
      stand()
    }
  }

  const stand = () => {
    if (gameState !== 'playing') return

    setGameState('dealer')
    setDealerRevealed(true)
    setMessage('Dealer\'s turn...')

    setTimeout(() => {
      dealerPlay()
    }, 500)
  }

  const dealerPlay = () => {
    let currentDeck = [...deck]
    let currentDealerHand = [...dealerHand]
    let dealerValue = calculateHandValue(currentDealerHand)

    while (dealerValue < 17) {
      const newCard = currentDeck[0]
      currentDealerHand.push(newCard)
      currentDeck = currentDeck.slice(1)
      dealerValue = calculateHandValue(currentDealerHand)
    }

    setDealerHand(currentDealerHand)
    setDeck(currentDeck)

    const playerValue = calculateHandValue(playerHand)

    if (dealerValue > 21) {
      setMessage('Dealer busts! You win!')
    } else if (dealerValue > playerValue) {
      setMessage('Dealer wins!')
    } else if (dealerValue < playerValue) {
      setMessage('You win!')
    } else {
      setMessage('Push! It\'s a tie.')
    }

    setGameState('ended')
  }

  const reset = () => {
    setDeck(shuffleDeck(createDeck()))
    setPlayerHand([])
    setDealerHand([])
    setGameState('betting')
    setMessage('Place your bet and deal!')
    setDealerRevealed(false)
  }

  const Card = ({ card, hidden }) => {
    const isRed = card.suit === '♥' || card.suit === '♦'

    if (hidden) {
      return (
        <div style={{
          width: '70px',
          height: '100px',
          background: 'linear-gradient(135deg, #1a5490 0%, #2a6fa8 100%)',
          border: '2px solid #333',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          fontWeight: 'bold',
          color: '#fff',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            fontSize: '12px',
            letterSpacing: '2px',
            opacity: 0.3
          }}>
            DEALER
          </div>
        </div>
      )
    }

    return (
      <div style={{
        width: '70px',
        height: '100px',
        background: 'white',
        border: '2px solid #333',
        borderRadius: '8px',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        position: 'relative'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: isRed ? '#d32f2f' : '#000',
          lineHeight: '1'
        }}>
          {card.value}
          <div style={{ fontSize: '16px' }}>{card.suit}</div>
        </div>
        <div style={{
          fontSize: '30px',
          textAlign: 'center',
          color: isRed ? '#d32f2f' : '#000'
        }}>
          {card.suit}
        </div>
        <div style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: isRed ? '#d32f2f' : '#000',
          textAlign: 'right',
          lineHeight: '1',
          transform: 'rotate(180deg)'
        }}>
          {card.value}
          <div style={{ fontSize: '16px' }}>{card.suit}</div>
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
      <div className="mac-window" style={{ width: '90%', maxWidth: '800px', marginBottom: '20px' }}>
        <div className="mac-window-header mac-window-header-active">
          <Link to="/" className="mac-window-close"></Link>
          <div className="mac-window-title">Blackjack</div>
          <div style={{ width: '12px' }}></div>
        </div>

        <div className="mac-window-content" style={{
          padding: '30px',
          background: '#1a7f4f',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Dealer Section */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: '#fff', fontSize: '18px', marginBottom: '15px', fontWeight: 'bold' }}>
              Dealer {dealerHand.length > 0 && dealerRevealed && `(${calculateHandValue(dealerHand)})`}
            </h2>
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {dealerHand.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  hidden={index === 1 && !dealerRevealed}
                />
              ))}
            </div>
          </div>

          {/* Message Area */}
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            padding: '15px 20px',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px solid #333',
            margin: '20px 0'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
              {message}
            </h3>
          </div>

          {/* Player Section */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h2 style={{ color: '#fff', fontSize: '18px', marginBottom: '15px', fontWeight: 'bold' }}>
              You {playerHand.length > 0 && `(${calculateHandValue(playerHand)})`}
            </h2>
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '20px'
            }}>
              {playerHand.map((card, index) => (
                <Card key={index} card={card} />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {gameState === 'betting' && (
              <button
                onClick={startGame}
                className="mac-button mac-button-primary"
                style={{ fontSize: '14px', padding: '10px 30px' }}
              >
                Deal Cards
              </button>
            )}

            {gameState === 'playing' && (
              <>
                <button
                  onClick={hit}
                  className="mac-button mac-button-primary"
                  style={{ fontSize: '14px', padding: '10px 30px' }}
                >
                  Hit
                </button>
                <button
                  onClick={stand}
                  className="mac-button"
                  style={{ fontSize: '14px', padding: '10px 30px' }}
                >
                  Stand
                </button>
              </>
            )}

            {gameState === 'ended' && (
              <button
                onClick={reset}
                className="mac-button mac-button-primary"
                style={{ fontSize: '14px', padding: '10px 30px' }}
              >
                New Game
              </button>
            )}
          </div>
        </div>
      </div>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <button className="mac-button" style={{ fontSize: '12px' }}>
          ← Back to Home
        </button>
      </Link>
    </div>
  )
}
