import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import appleLogo from '../assets/apple_logo.png'
import spinWheelIcon from '../assets/spin-the-wheel.png'
import randomizerIcon from '../assets/Randomizer.png'
import controllerIcon from '../assets/Ps-controller.png'
import phase10Icon from '../assets/Phase10.png'
import macOSIcon from '../assets/MacOS.png'
import bearsLogo from '../assets/Chicago_Bears.png'
import vikingsLogo from '../assets/Minnesota_Vikings.png'
import lionsLogo from '../assets/Detroit Lions.png'
import trashFull from '../assets/apple_trash_full.webp'
import creedSong from '../assets/Creed.mp3'
import iMacG3 from '../assets/Apple iMac G3.png'

export default function Home() {
  const [showHelpDropdown, setShowHelpDropdown] = useState(false)
  const [showRulesModal, setShowRulesModal] = useState(false)
  const [showPhase10RulesModal, setShowPhase10RulesModal] = useState(false)
  const [showAppleDropdown, setShowAppleDropdown] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showSpecialDropdown, setShowSpecialDropdown] = useState(false)
  const [showFileDropdown, setShowFileDropdown] = useState(false)
  const [showEditDropdown, setShowEditDropdown] = useState(false)
  const [showViewDropdown, setShowViewDropdown] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [trashOpen, setTrashOpen] = useState(false)
  const [showSoundModal, setShowSoundModal] = useState(false)
  const [showIMacModal, setShowIMacModal] = useState(false)
  const [volume, setVolume] = useState(50)
  const [isPlaying, setIsPlaying] = useState(false)
  const [partyMode, setPartyMode] = useState(false)
  const audioRef = useRef(null)

  // Edit mode state
  const [editMode, setEditMode] = useState(false)
  const [editableTitle, setEditableTitle] = useState('Family Gaming Hub')
  const [editableVersion, setEditableVersion] = useState('Version 1.0')
  const [editableGameNames, setEditableGameNames] = useState({
    'spin-wheel': 'Spin the Wheel',
    'randomizer': 'Match Generator',
    'draft-order': 'Draft Order',
    'tic-scorekeeper': 'Tic Scorekeeper',
    'phase-10': 'Phase 10'
  })
  const [backgroundColor, setBackgroundColor] = useState('linear-gradient(135deg, #4a90c8 0%, #5ba3d8 50%, #4a90c8 100%)')
  const [showColorPicker, setShowColorPicker] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setShowHelpDropdown(false)
      setShowAppleDropdown(false)
      setShowSpecialDropdown(false)
      setShowFileDropdown(false)
      setShowEditDropdown(false)
      setShowViewDropdown(false)
    }

    if (showHelpDropdown || showAppleDropdown || showSpecialDropdown || showFileDropdown || showEditDropdown || showViewDropdown) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showHelpDropdown, showAppleDropdown, showSpecialDropdown, showFileDropdown, showEditDropdown, showViewDropdown])
  const games = [
    {
      name: 'Spin the Wheel',
      path: '/spin-wheel',
      icon: spinWheelIcon,
      isImage: true,
      imageSize: '80px',
    },
    {
      name: 'Match Generator',
      path: '/randomizer',
      icon: randomizerIcon,
      isImage: true,
      imageSize: '80px',
    },
    {
      name: 'Draft Order',
      path: '/draft-order',
      icon: '🎲',
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
      background: backgroundColor,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
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
          onClick={(e) => {
            e.stopPropagation()
            setShowFileDropdown(false)
            setShowSpecialDropdown(false)
            setShowHelpDropdown(false)
            setShowAppleDropdown(!showAppleDropdown)
          }}
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
        <div
          style={{ position: 'relative', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
            setShowAppleDropdown(false)
            setShowSpecialDropdown(false)
            setShowHelpDropdown(false)
            setShowFileDropdown(!showFileDropdown)
          }}
        >
          File
          {showFileDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              background: '#f5f5f5',
              border: '2px outset #999',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              minWidth: '180px',
              zIndex: 1000,
              marginTop: '2px'
            }}>
              <Link
                to="/spin-wheel"
                style={{
                  display: 'block',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  background: '#f5f5f5',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4a90c8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
                onClick={() => setShowFileDropdown(false)}
              >
                Spin the Wheel
              </Link>
              <Link
                to="/randomizer"
                style={{
                  display: 'block',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  background: '#f5f5f5',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4a90c8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
                onClick={() => setShowFileDropdown(false)}
              >
                Match Generator
              </Link>
              <Link
                to="/draft-order"
                style={{
                  display: 'block',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  background: '#f5f5f5',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4a90c8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
                onClick={() => setShowFileDropdown(false)}
              >
                Draft Order
              </Link>
              <Link
                to="/tic-scorekeeper"
                style={{
                  display: 'block',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  background: '#f5f5f5',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4a90c8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
                onClick={() => setShowFileDropdown(false)}
              >
                Tic Scorekeeper
              </Link>
              <Link
                to="/phase-10"
                style={{
                  display: 'block',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  background: '#f5f5f5',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4a90c8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
                onClick={() => setShowFileDropdown(false)}
              >
                Phase 10
              </Link>
            </div>
          )}
        </div>
        <div
          style={{ position: 'relative', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
            setShowAppleDropdown(false)
            setShowFileDropdown(false)
            setShowSpecialDropdown(false)
            setShowHelpDropdown(false)
            setShowEditDropdown(!showEditDropdown)
          }}
        >
          Edit
          {showEditDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              background: '#f5f5f5',
              border: '2px outset #999',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              minWidth: '180px',
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
                  setEditMode(!editMode)
                  setShowEditDropdown(false)
                }}
              >
                {editMode ? '✓ Edit Mode' : 'Edit Mode'}
              </div>
              {editMode && (
                <>
                  <div style={{ borderTop: '1px solid #999', margin: '2px 0' }}></div>
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
                      setShowColorPicker(true)
                      setShowEditDropdown(false)
                    }}
                  >
                    Change Background...
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div
          style={{ position: 'relative', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
            setShowAppleDropdown(false)
            setShowFileDropdown(false)
            setShowEditDropdown(false)
            setShowSpecialDropdown(false)
            setShowHelpDropdown(false)
            setShowViewDropdown(!showViewDropdown)
          }}
        >
          View
          {showViewDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              background: '#f5f5f5',
              border: '2px outset #999',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              minWidth: '180px',
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
                  setPartyMode(!partyMode)
                  setShowViewDropdown(false)
                }}
              >
                {partyMode ? '✓ Party Mode' : 'Party Mode'}
              </div>
            </div>
          )}
        </div>
        <div
          style={{ position: 'relative', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
            setShowAppleDropdown(false)
            setShowFileDropdown(false)
            setShowHelpDropdown(false)
            setShowViewDropdown(false)
            setShowSpecialDropdown(!showSpecialDropdown)
          }}
        >
          Special
          {showSpecialDropdown && (
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
              <Link
                to="/blackjack"
                style={{
                  display: 'block',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  background: '#f5f5f5',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4a90c8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
                onClick={() => setShowSpecialDropdown(false)}
              >
                Blackjack
              </Link>
              <Link
                to="/solitaire"
                style={{
                  display: 'block',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  background: '#f5f5f5',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4a90c8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
                onClick={() => setShowSpecialDropdown(false)}
              >
                Solitaire
              </Link>
            </div>
          )}
        </div>
        <div
          style={{ position: 'relative', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
            setShowAppleDropdown(false)
            setShowFileDropdown(false)
            setShowSpecialDropdown(false)
            setShowHelpDropdown(!showHelpDropdown)
          }}
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
          <div
            style={{ fontSize: '16px', cursor: 'pointer' }}
            onClick={() => setShowSoundModal(true)}
          >
            🔊
          </div>
          {/* MacOS Icon */}
          <img
            src={macOSIcon}
            alt="MacOS"
            style={{ height: '18px', width: 'auto', cursor: 'pointer' }}
            onClick={() => setShowIMacModal(true)}
          />
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
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                  outline: editMode ? '2px dashed #4a90c8' : 'none',
                  padding: '2px 4px',
                  cursor: editMode ? 'text' : 'default'
                }}
                contentEditable={editMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => setEditableTitle(e.target.textContent)}
              >
                {editableTitle}
              </h1>
              <p
                style={{
                  fontSize: '12px',
                  color: '#666',
                  marginBottom: '0',
                  outline: editMode ? '2px dashed #4a90c8' : 'none',
                  padding: '2px 4px',
                  cursor: editMode ? 'text' : 'default'
                }}
                contentEditable={editMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => setEditableVersion(e.target.textContent)}
              >
                {editableVersion}
              </p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '20px',
              justifyItems: 'center'
            }}>
              {games.map((game) => {
                const gameKey = game.path.replace('/', '')
                return (
                <Link
                  key={game.path}
                  to={game.path}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100px',
                    cursor: editMode ? 'default' : 'pointer',
                    pointerEvents: editMode ? 'none' : 'auto'
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
                  <div
                    style={{
                      color: '#000',
                      fontSize: '11px',
                      textAlign: 'center',
                      lineHeight: '1.2',
                      wordWrap: 'break-word',
                      maxWidth: '100%',
                      outline: editMode ? '2px dashed #4a90c8' : 'none',
                      padding: '2px 4px',
                      cursor: editMode ? 'text' : 'default',
                      pointerEvents: editMode ? 'auto' : 'none'
                    }}
                    contentEditable={editMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      setEditableGameNames({
                        ...editableGameNames,
                        [gameKey]: e.target.textContent
                      })
                    }}
                  >
                    {editableGameNames[gameKey] || game.name}
                  </div>
                </Link>
                )
              })}
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
          pointerEvents: 'auto',
          position: 'relative'
        }}>
          <div
            onClick={() => setTrashOpen(!trashOpen)}
            style={{
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px',
              cursor: 'pointer',
              transform: trashOpen ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.2s'
            }}
          >
            <img
              src={trashFull}
              alt="Trash"
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'contain',
                filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'
              }}
            />
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

      {/* Trash Modal - NFC North Rivals */}
      {trashOpen && (
        <div className="mac-modal-overlay" onClick={() => setTrashOpen(false)}>
          <div className="mac-window" style={{ width: '420px', maxWidth: '90%', margin: '20px' }} onClick={(e) => e.stopPropagation()}>
            <div className="mac-window-header mac-window-header-active">
              <div className="mac-window-close" onClick={() => setTrashOpen(false)}></div>
              <div className="mac-window-title">Trash</div>
              <div style={{ width: '12px' }}></div>
            </div>
            <div className="mac-window-content" style={{ padding: '0', background: 'white' }}>
              {/* Toolbar */}
              <div style={{
                background: 'linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%)',
                borderBottom: '1px solid #999',
                padding: '6px 12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold' }}>3 items</div>
              </div>

              {/* Icon Grid View */}
              <div style={{
                padding: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                justifyItems: 'center',
                background: 'white',
                minHeight: '180px'
              }}>
                {/* Chicago Bears */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100px',
                  cursor: 'default'
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px',
                    border: '2px solid transparent'
                  }}>
                    <img src={bearsLogo} alt="Chicago Bears" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                  </div>
                  <div style={{
                    fontSize: '11px',
                    textAlign: 'center',
                    lineHeight: '1.2',
                    wordWrap: 'break-word',
                    maxWidth: '100%',
                    color: '#000'
                  }}>
                    Chicago Bears
                  </div>
                </div>

                {/* Minnesota Vikings */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100px',
                  cursor: 'default'
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px',
                    border: '2px solid transparent'
                  }}>
                    <img src={vikingsLogo} alt="Minnesota Vikings" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                  </div>
                  <div style={{
                    fontSize: '11px',
                    textAlign: 'center',
                    lineHeight: '1.2',
                    wordWrap: 'break-word',
                    maxWidth: '100%',
                    color: '#000'
                  }}>
                    Minnesota Vikings
                  </div>
                </div>

                {/* Detroit Lions */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100px',
                  cursor: 'default'
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px',
                    border: '2px solid transparent'
                  }}>
                    <img src={lionsLogo} alt="Detroit Lions" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                  </div>
                  <div style={{
                    fontSize: '11px',
                    textAlign: 'center',
                    lineHeight: '1.2',
                    wordWrap: 'break-word',
                    maxWidth: '100%',
                    color: '#000'
                  }}>
                    Detroit Lions
                  </div>
                </div>
              </div>

              {/* Footer with status message */}
              <div style={{
                background: 'linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%)',
                borderTop: '1px solid #999',
                padding: '6px 12px',
                fontSize: '11px',
                color: '#333',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                💚 Go Pack Go! 💛
              </div>
            </div>
          </div>
        </div>
      )}

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
                <p style={{ marginBottom: '6px' }}><strong>Memory:</strong> 1 TB of fun</p>
                <p style={{ marginBottom: '6px' }}><strong>Processor:</strong> React 18.3.1</p>
                <p><strong>Built with:</strong> Code & curiosity</p>
              </div>
              <p style={{ fontSize: '10px', color: '#666', marginBottom: '15px' }}>
                © 2025 Luke Stahl. All rights reserved.
              </p>
              <a
                href="https://lukestahl.io/"
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

      {/* Color Picker Modal */}
      {showColorPicker && (
        <div className="mac-modal-overlay" onClick={() => setShowColorPicker(false)}>
          <div className="mac-window" style={{ width: '400px', margin: '20px' }} onClick={(e) => e.stopPropagation()}>
            <div className="mac-window-header mac-window-header-active">
              <div className="mac-window-close" onClick={() => setShowColorPicker(false)}></div>
              <div className="mac-window-title">Change Background</div>
              <div style={{ width: '12px' }}></div>
            </div>
            <div className="mac-window-content" style={{ padding: '20px' }}>
              <p style={{ fontSize: '12px', marginBottom: '15px' }}>Choose a background color:</p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                marginBottom: '20px'
              }}>
                {[
                  { name: 'Classic Blue', value: 'linear-gradient(135deg, #4a90c8 0%, #5ba3d8 50%, #4a90c8 100%)' },
                  { name: 'Purple Dream', value: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #8b5cf6 100%)' },
                  { name: 'Green Forest', value: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #10b981 100%)' },
                  { name: 'Pink Sunset', value: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #ec4899 100%)' },
                  { name: 'Orange Burst', value: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)' },
                  { name: 'Red Fire', value: 'linear-gradient(135deg, #ef4444 0%, #f87171 50%, #ef4444 100%)' },
                  { name: 'Teal Wave', value: 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 50%, #14b8a6 100%)' },
                  { name: 'Indigo Night', value: 'linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #6366f1 100%)' },
                  { name: 'Gray Stone', value: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 50%, #6b7280 100%)' }
                ].map((color) => (
                  <div
                    key={color.name}
                    onClick={() => {
                      setBackgroundColor(color.value)
                      setShowColorPicker(false)
                    }}
                    style={{
                      background: color.value,
                      height: '60px',
                      borderRadius: '6px',
                      border: '2px solid #333',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      padding: '5px',
                      boxShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 'bold',
                      color: 'white',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      background: 'rgba(0,0,0,0.3)',
                      padding: '2px 6px',
                      borderRadius: '3px'
                    }}>
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setShowColorPicker(false)}
                  className="mac-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Mode Indicator */}
      {editMode && (
        <div style={{
          position: 'fixed',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(74, 144, 200, 0.95)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          border: '2px solid #333',
          boxShadow: '3px 3px 8px rgba(0,0,0,0.4)',
          fontSize: '11px',
          fontWeight: 'bold',
          zIndex: 1000,
          textAlign: 'center',
          maxWidth: 'calc(100% - 40px)'
        }}>
          ✏️ Edit Mode
        </div>
      )}

      {/* iMac G3 Modal */}
      {showIMacModal && (
        <div className="mac-modal-overlay" onClick={() => setShowIMacModal(false)}>
          <div className="mac-window" style={{ width: '500px', maxWidth: '90%', margin: '20px' }} onClick={(e) => e.stopPropagation()}>
            <div className="mac-window-header mac-window-header-active">
              <div className="mac-window-close" onClick={() => setShowIMacModal(false)}></div>
              <div className="mac-window-title">The year is 1998</div>
              <div style={{ width: '12px' }}></div>
            </div>
            <div className="mac-window-content" style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                  src={iMacG3}
                  alt="Apple iMac G3"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: '300px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
                Inspired by the Apple iMac G3
              </h3>
              <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#333', marginBottom: '15px' }}>
                Apple was on the brink of collapse in the late 90s after years of failed products, but Steve Jobs' return and the launch of the iMac in 1998 reversed its trajectory by introducing a bold, Internet-ready all-in-one device that redefined consumer tech design. While early sales were modest, the iMac became a cultural and design turning point that set Apple back on a path to growth.
              </p>
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setShowIMacModal(false)}
                  className="mac-button mac-button-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sound Modal */}
      {showSoundModal && (
        <div className="mac-modal-overlay" onClick={() => setShowSoundModal(false)}>
          <div className="mac-window" style={{ width: '400px', maxWidth: '90%', margin: '20px' }} onClick={(e) => e.stopPropagation()}>
            <div className="mac-window-header mac-window-header-active">
              <div className="mac-window-close" onClick={() => {
                setShowSoundModal(false)
                if (audioRef.current) {
                  audioRef.current.pause()
                  setIsPlaying(false)
                }
              }}></div>
              <div className="mac-window-title">Sound</div>
              <div style={{ width: '12px' }}></div>
            </div>
            <div className="mac-window-content" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                  Now Playing: Creed 🎸
                </h3>
              </div>

              {/* Volume Control */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '10px'
                }}>
                  <span style={{ fontSize: '16px' }}>🔇</span>
                  <div style={{ flex: 1, position: 'relative', height: '30px' }}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      style={{
                        width: '100%',
                        height: '8px',
                        background: '#ddd',
                        border: '1px inset #999',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: 'pointer',
                        appearance: 'none',
                        WebkitAppearance: 'none'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '16px' }}>🔊</span>
                </div>
                <div style={{ textAlign: 'center', fontSize: '12px', color: '#666' }}>
                  Volume: {volume}%
                </div>
              </div>

              {/* Play/Pause Button */}
              <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <button
                  onClick={togglePlayPause}
                  className="mac-button mac-button-primary"
                  style={{ fontSize: '14px', padding: '10px 30px' }}
                >
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
              </div>

              <div style={{
                fontSize: '10px',
                color: '#999',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                With Arms Wide Open 🎵
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={creedSong} loop />

      {/* Party Mode Confetti */}
      {partyMode && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
          overflow: 'hidden'
        }}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '-10px',
                left: `${Math.random() * 100}%`,
                width: '10px',
                height: '10px',
                background: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)],
                animation: `confetti-fall ${3 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
