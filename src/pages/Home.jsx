import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import appleLogo from '../assets/apple_logo.png'
import spinWheelIcon from '../assets/spin-the-wheel.png'
import randomizerIcon from '../assets/Randomizer.png'
import controllerIcon from '../assets/Ps-controller.png'
import phase10Icon from '../assets/Phase10.png'
import macOSIcon from '../assets/MacOS.png'

export default function Home() {
  const [showHelpDropdown, setShowHelpDropdown] = useState(false)
  const [showRulesModal, setShowRulesModal] = useState(false)
  const [showPhase10RulesModal, setShowPhase10RulesModal] = useState(false)
  const [showAppleDropdown, setShowAppleDropdown] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  const games = [
    {
      name: 'Spin the Wheel',
      path: '/spin-wheel',
      icon: spinWheelIcon,
      isImage: true,
      imageSize: '80px',
    },
    {
      name: 'Randomizer',
      path: '/randomizer',
      icon: randomizerIcon,
      isImage: true,
      imageSize: '80px',
    },
    {
      name: 'Tic Scorekeeper',
      path: '/tic-scorekeeper',
      icon: '🃏',
    },
    {
      name: 'Phase 10',
      path: '/phase-10',
      icon: phase10Icon,
      isImage: true,
      imageSize: '80px',
    }
  ]

  return (
    <div className="home-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4a90c8 0%, #5ba3d8 50%, #4a90c8 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Navbar / Menu Bar */}
      <div className="navbar" style={{
        height: '28px',
        background: 'linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%)',
        borderBottom: '2px solid #999',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        fontSize: '12px',
        fontWeight: 'bold',
        gap: '20px'
      }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', cursor: 'pointer' }}
          onClick={() => setShowAppleDropdown(!showAppleDropdown)}
        >
          <img src={appleLogo} alt="Apple" style={{ height: '20px', width: 'auto' }} />
          {showAppleDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              background: '#f5f5f5',
              border: '2px outset #999',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              minWidth: '150px',
              zIndex: 1000,
              marginTop: '2px'
            }}>
              <div
                style={{
                  padding: '6px 12px',
                  cursor: 'pointer',
                  background: '#f5f5f5'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4a90c8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
                onClick={(e) => {
                  e.stopPropagation()
                  setShowAboutModal(true)
                  setShowAppleDropdown(false)
                }}
              >
                About
              </div>
            </div>
          )}
        </div>
        <div>File</div>
        <div>Edit</div>
        <div>View</div>
        <div>Special</div>
        <div
          style={{ position: 'relative', cursor: 'pointer' }}
          onClick={() => setShowHelpDropdown(!showHelpDropdown)}
        >
          Help
          {showHelpDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              background: '#f5f5f5',
              border: '2px outset #999',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              minWidth: '150px',
              zIndex: 1000,
              marginTop: '2px'
            }}>
              <div
                style={{
                  padding: '6px 12px',
                  cursor: 'pointer',
                  background: '#f5f5f5'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4a90c8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
                onClick={(e) => {
                  e.stopPropagation()
                  setShowRulesModal(true)
                  setShowHelpDropdown(false)
                }}
              >
                Rules of Tic
              </div>
              <div
                style={{
                  padding: '6px 12px',
                  cursor: 'pointer',
                  background: '#f5f5f5'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4a90c8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
                onClick={(e) => {
                  e.stopPropagation()
                  setShowPhase10RulesModal(true)
                  setShowHelpDropdown(false)
                }}
              >
                Rules of Phase 10
              </div>
            </div>
          )}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Clock */}
          <div style={{ fontSize: '12px', fontWeight: 'normal' }}>
            {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </div>
          {/* Sound Icon */}
          <div style={{ fontSize: '16px' }}>🔊</div>
          {/* MacOS Icon */}
          <img src={macOSIcon} alt="MacOS" style={{ height: '18px', width: 'auto' }} />
        </div>
      </div>

      {/* Hero Section - System Folder */}
      <section className="hero-section" style={{
        flex: '0 0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px'
      }}>
        <div className="mac-window" style={{ width: '400px' }}>
          <div className="mac-window-header mac-window-header-active">
            <div className="mac-window-close"></div>
            <div className="mac-window-title">System Folder</div>
            <div style={{ width: '12px' }}></div>
          </div>
          <div className="mac-window-content" style={{ padding: '20px', background: 'white' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ marginBottom: '15px' }}>
                <img src={controllerIcon} alt="Controller" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
                Family Gaming Hub
              </h1>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '0' }}>
                Version 1.0
              </p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '20px',
              justifyItems: 'center'
            }}>
              {games.map((game) => (
                <Link
                  key={game.path}
                  to={game.path}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '70px',
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '4px',
                    position: 'relative'
                  }}>
                    {/* Folder */}
                    <svg width="70" height="60" viewBox="0 0 70 60" style={{ position: 'absolute' }}>
                      {/* Folder tab */}
                      <path d="M 5 10 L 25 10 L 30 5 L 45 5 L 50 10 L 65 10 L 65 15 L 5 15 Z"
                        fill="url(#folderGradient1)"
                        stroke="#5a7a9d"
                        strokeWidth="1.5"/>
                      {/* Folder body */}
                      <rect x="5" y="15" width="60" height="40" rx="3"
                        fill="url(#folderGradient2)"
                        stroke="#5a7a9d"
                        strokeWidth="1.5"/>
                      <defs>
                        <linearGradient id="folderGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#b5c9e4', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#8da9c9', stopOpacity: 1 }} />
                        </linearGradient>
                        <linearGradient id="folderGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#9db4d4', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#7a9bbd', stopOpacity: 1 }} />
                        </linearGradient>
                      </defs>
                    </svg>
                    {/* App icon overlay */}
                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1
                    }}>
                      {game.isImage ? (
                        <img src={game.icon} alt={game.name} style={{ width: '28px', height: '28px', objectFit: 'cover', filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }} />
                      ) : (
                        <div style={{ fontSize: '28px', filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }}>
                          {game.icon}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{
                    color: '#000',
                    fontSize: '11px',
                    textAlign: 'center',
                    lineHeight: '1.2',
                    wordWrap: 'break-word',
                    maxWidth: '100%'
                  }}>
                    {game.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Trash */}
      <footer className="footer-section" style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: '20px',
        pointerEvents: 'none'
      }}>
        <div className="trash-icon" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '80px',
          pointerEvents: 'auto'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '50px',
            marginBottom: '8px'
          }}>
            🗑️
          </div>
          <div style={{
            color: 'white',
            fontSize: '13px',
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5), -1px -1px 0 rgba(0,0,0,0.3)',
            lineHeight: '1.2',
            padding: '4px 8px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '4px'
          }}>
            Trash
          </div>
        </div>
      </footer>

      {/* Rules Modal */}
      {showRulesModal && (
        <div className="mac-modal-overlay" onClick={() => setShowRulesModal(false)}>
          <div className="mac-window" style={{ width: '500px', maxWidth: '90%', margin: '20px' }} onClick={(e) => e.stopPropagation()}>
            <div className="mac-window-header mac-window-header-active">
              <div className="mac-window-close" onClick={() => setShowRulesModal(false)}></div>
              <div className="mac-window-title">Rules of Tic</div>
              <div style={{ width: '12px' }}></div>
            </div>
            <div className="mac-window-content" style={{ padding: '20px', maxHeight: '60vh', overflowY: 'auto' }}>
              <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>🎯 Objective</h3>
                <p style={{ marginBottom: '8px' }}>
                  The goal is to be the first player each round to "Tic" — i.e. get rid of all your cards — and across rounds, end the game with the lowest total points.
                </p>
                <p style={{ marginBottom: '15px' }}>
                  You "get rid" of cards by forming sets (3 or more of the same rank) or straight flushes (runs in the same suit).
                </p>

                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>Setup</h3>
                <p style={{ marginBottom: '8px' }}>
                  Use two standard decks of cards (including jokers), shuffled together.
                </p>
                <p style={{ marginBottom: '8px' }}>
                  The game supports 2–6 players. More players slows down the game.
                </p>
                <p style={{ marginBottom: '8px' }}>
                  For round 1, each player is dealt 3 cards. Jokers are wild cards — and for that round, 3s are also wild (because you have 3 cards total).
                </p>
                <p style={{ marginBottom: '15px' }}>
                  The top card of the remainder deck is turned face up — this is the start of the discard pile.
                </p>

                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>Gameplay (by round)</h3>
                <p style={{ marginBottom: '8px' }}>
                  The player to the dealer's left goes first.
                </p>
                <p style={{ marginBottom: '8px' }}>
                  On their turn a player may either:
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '8px' }}>
                  <li>draw the top card from the discard pile, or</li>
                  <li>draw from the deck.</li>
                </ul>
                <p style={{ marginBottom: '8px' }}>
                  They may then choose to keep that card or discard it — but they cannot hold more than the round's number of cards (e.g. 3 cards in round 1).
                </p>
                <p style={{ marginBottom: '8px' }}>
                  The aim is to form either:
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '8px' }}>
                  <li>a set (e.g. three Queens), or</li>
                  <li>a straight flush (e.g. 9-10-J of clubs), using wild cards if needed.</li>
                </ul>
                <p style={{ marginBottom: '15px' }}>
                  Once a player successfully does that — i.e. "Tics" — the round is over. Other players get one last draw/discard chance to either complete sets/runs (if possible) or at least minimize their points.
                </p>

                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>Scoring & Round Progression</h3>
                <p style={{ marginBottom: '8px' }}>
                  Cards left in a player's hand after someone "Tics" count as points against them: Aces = 15, face cards = 10, numbered cards = face value.
                </p>
                <p style={{ marginBottom: '8px' }}>
                  The player who got rid of all cards (Tic) gets –15 points added to their score (i.e. negative 15), lowering their total.
                </p>
                <p style={{ marginBottom: '8px' }}>
                  After each round, the dealer role shifts and the next round increases the number of dealt cards by one. For instance:
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '8px' }}>
                  <li>Round 1: 3 cards each (3s wild)</li>
                  <li>Round 2: 4 cards each (4s wild)</li>
                  <li>Round 3: 5 cards each (5s wild)</li>
                  <li>… and so on up to a 13-card hand, where Kings are wild.</li>
                </ul>
                <p style={{ marginBottom: '15px' }}>
                  The game continues through rounds until you decide to stop — the winner is the player with the lowest total points after that.
                </p>
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={() => setShowRulesModal(false)}
                  className="mac-button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phase 10 Rules Modal */}
      {showPhase10RulesModal && (
        <div className="mac-modal-overlay" onClick={() => setShowPhase10RulesModal(false)}>
          <div className="mac-window" style={{ width: '500px', maxWidth: '90%', margin: '20px' }} onClick={(e) => e.stopPropagation()}>
            <div className="mac-window-header mac-window-header-active">
              <div className="mac-window-close" onClick={() => setShowPhase10RulesModal(false)}></div>
              <div className="mac-window-title">Rules of Phase 10</div>
              <div style={{ width: '12px' }}></div>
            </div>
            <div className="mac-window-content" style={{ padding: '20px', maxHeight: '60vh', overflowY: 'auto' }}>
              <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>🎯 Goal</h3>
                <p style={{ marginBottom: '8px' }}>
                  The goal of Phase 10 is to be the first player to complete all 10 phases, in order.
                </p>
                <p style={{ marginBottom: '15px' }}>
                  If multiple players finish Phase 10 in the same round, the one with the lowest total score (across rounds) wins.
                </p>

                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>📦 Setup</h3>
                <p style={{ marginBottom: '8px' }}>
                  Requires 2–6 players.
                </p>
                <p style={{ marginBottom: '8px' }}>
                  Use the special Phase 10 deck (108 cards): number cards 1–12 in four colors (red, blue, yellow, green), plus 8 Wild cards and 4 Skip cards.
                </p>
                <p style={{ marginBottom: '8px' }}>
                  Shuffle and deal 10 cards face-down to each player.
                </p>
                <p style={{ marginBottom: '8px' }}>
                  Place the remaining cards face-down as the draw pile; turn the top card face-up to start the discard pile.
                </p>
                <p style={{ marginBottom: '15px' }}>
                  Choose a dealer; play proceeds clockwise from the player to the dealer's left.
                </p>

                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>🧩 Phases</h3>
                <p style={{ marginBottom: '8px' }}>
                  Each round, a player must try to complete the "phase" they're currently on. Here are the 10 phases in order:
                </p>
                <table style={{ width: '100%', marginBottom: '8px', fontSize: '11px', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#e8e8e8' }}>
                      <th style={{ padding: '4px', border: '1px solid #999', textAlign: 'left' }}>Phase</th>
                      <th style={{ padding: '4px', border: '1px solid #999', textAlign: 'left' }}>Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td style={{ padding: '4px', border: '1px solid #ccc' }}>1</td><td style={{ padding: '4px', border: '1px solid #ccc' }}>2 sets of 3</td></tr>
                    <tr><td style={{ padding: '4px', border: '1px solid #ccc' }}>2</td><td style={{ padding: '4px', border: '1px solid #ccc' }}>1 set of 3 + 1 run of 4</td></tr>
                    <tr><td style={{ padding: '4px', border: '1px solid #ccc' }}>3</td><td style={{ padding: '4px', border: '1px solid #ccc' }}>1 set of 4 + 1 run of 4</td></tr>
                    <tr><td style={{ padding: '4px', border: '1px solid #ccc' }}>4</td><td style={{ padding: '4px', border: '1px solid #ccc' }}>1 run of 7</td></tr>
                    <tr><td style={{ padding: '4px', border: '1px solid #ccc' }}>5</td><td style={{ padding: '4px', border: '1px solid #ccc' }}>1 run of 8</td></tr>
                    <tr><td style={{ padding: '4px', border: '1px solid #ccc' }}>6</td><td style={{ padding: '4px', border: '1px solid #ccc' }}>1 run of 9</td></tr>
                    <tr><td style={{ padding: '4px', border: '1px solid #ccc' }}>7</td><td style={{ padding: '4px', border: '1px solid #ccc' }}>2 sets of 4</td></tr>
                    <tr><td style={{ padding: '4px', border: '1px solid #ccc' }}>8</td><td style={{ padding: '4px', border: '1px solid #ccc' }}>7 cards of one color</td></tr>
                    <tr><td style={{ padding: '4px', border: '1px solid #ccc' }}>9</td><td style={{ padding: '4px', border: '1px solid #ccc' }}>1 set of 5 + 1 set of 2</td></tr>
                    <tr><td style={{ padding: '4px', border: '1px solid #ccc' }}>10</td><td style={{ padding: '4px', border: '1px solid #ccc' }}>1 set of 5 + 1 set of 3</td></tr>
                  </tbody>
                </table>
                <p style={{ marginBottom: '8px' }}>
                  "Set" means a group of cards with the same number (color doesn't matter).
                </p>
                <p style={{ marginBottom: '8px' }}>
                  "Run" means a sequence of consecutive numbers (color doesn't need to match for number-only phases).
                </p>
                <p style={{ marginBottom: '8px' }}>
                  Players must complete phases in order: you can't skip ahead.
                </p>
                <p style={{ marginBottom: '15px' }}>
                  Only one phase per hand (round) can be laid down.
                </p>

                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>🔄 Turn Structure</h3>
                <p style={{ marginBottom: '8px' }}>On a player's turn, they:</p>
                <ol style={{ marginLeft: '20px', marginBottom: '15px' }}>
                  <li style={{ marginBottom: '4px' }}><strong>Draw</strong> — take one card from either the draw pile or the top of the discard pile.</li>
                  <li style={{ marginBottom: '4px' }}><strong>Lay down your Phase</strong> (optional) — if you have the needed cards.</li>
                  <li style={{ marginBottom: '4px' }}><strong>Hit</strong> (optional) — once your phase is laid, you may add cards to your own or other players' laid phases.</li>
                  <li><strong>Discard</strong> — end your turn by discarding one card to the discard pile.</li>
                </ol>

                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>🃏 Special Cards</h3>
                <p style={{ marginBottom: '8px' }}>
                  <strong>Wild cards:</strong> act as a substitute for any number/color needed to complete a phase. Once played in a phase, a Wild stays as that card for the remainder of the hand.
                </p>
                <p style={{ marginBottom: '15px' }}>
                  <strong>Skip cards:</strong> when discarded, the next player loses their turn. Skip cards cannot be used as part of a set or run.
                </p>

                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>🧮 Scoring & Round End</h3>
                <p style={{ marginBottom: '8px' }}>
                  A round ends when a player "goes out" — gets rid of all cards from their hand.
                </p>
                <p style={{ marginBottom: '8px' }}>
                  Players who completed their phase move to the next phase; players who didn't remain on the same phase.
                </p>
                <p style={{ marginBottom: '8px' }}>For players left with cards in hand at round's end:</p>
                <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                  <li>Number cards 1–9: 5 points each</li>
                  <li>Number cards 10–12: 10 points each</li>
                  <li>Skip cards: 15 points each</li>
                  <li>Wild cards: 25 points each</li>
                </ul>

                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>🏁 Winning the Game</h3>
                <p style={{ marginBottom: '8px' }}>
                  The first player to complete Phase 10 and go out wins.
                </p>
                <p style={{ marginBottom: '15px' }}>
                  If more than one player finishes Phase 10 in the same round: compare their total scores — lowest wins.
                </p>
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={() => setShowPhase10RulesModal(false)}
                  className="mac-button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <div className="mac-modal-overlay" onClick={() => setShowAboutModal(false)}>
          <div className="mac-window" style={{ width: '350px', margin: '20px' }} onClick={(e) => e.stopPropagation()}>
            <div className="mac-window-header mac-window-header-active">
              <div className="mac-window-close" onClick={() => setShowAboutModal(false)}></div>
              <div className="mac-window-title">About</div>
              <div style={{ width: '12px' }}></div>
            </div>
            <div className="mac-window-content" style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <img src={appleLogo} alt="Apple" style={{ width: '64px', height: 'auto' }} />
              </div>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' }}>
                Family Gaming Hub
              </h1>
              <p style={{ fontSize: '11px', color: '#666', marginBottom: '15px' }}>
                Version 1.0
              </p>
              <div style={{
                background: '#f5f5f5',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '12px',
                marginBottom: '15px',
                fontSize: '11px',
                textAlign: 'left'
              }}>
                <p style={{ marginBottom: '6px' }}><strong>Developer:</strong> Luke Stahl</p>
                <p style={{ marginBottom: '6px' }}><strong>Memory:</strong> 64 MB of fun</p>
                <p style={{ marginBottom: '6px' }}><strong>Processor:</strong> React 18.3.1</p>
                <p><strong>Built with:</strong> Code & curiosity</p>
              </div>
              <p style={{ fontSize: '10px', color: '#666', marginBottom: '15px' }}>
                © 2025 Luke Stahl. All rights reserved.
              </p>
              <a
                href="https://lucasstahl.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button className="mac-button mac-button-primary" style={{ fontSize: '12px', padding: '8px 20px' }}>
                  Visit Site
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
