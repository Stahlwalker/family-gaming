import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function SpinWheel() {
  const [familyMembers, setFamilyMembers] = useState([])
  const [newMember, setNewMember] = useState('')
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const canvasRef = useRef(null)

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#FFD93D', '#C44569', '#A29BFE']

  useEffect(() => {
    const saved = localStorage.getItem('familyMembers')
    if (saved) {
      setFamilyMembers(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    drawWheel()
  }, [familyMembers, rotation])

  const drawWheel = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (familyMembers.length === 0) {
      // Draw empty state
      ctx.fillStyle = '#ddd'
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.fill()
      ctx.strokeStyle = '#666'
      ctx.lineWidth = 4
      ctx.stroke()

      ctx.fillStyle = '#333'
      ctx.font = '14px Geneva, Arial, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Add family members to spin', centerX, centerY)
      return
    }

    const sliceAngle = (2 * Math.PI) / familyMembers.length

    // Draw wheel segments
    // Start from -90 degrees (top of the wheel) so index 0 is at the top
    familyMembers.forEach((member, index) => {
      const startAngle = (index * sliceAngle) - Math.PI / 2
      const endAngle = ((index + 1) * sliceAngle) - Math.PI / 2
      const color = colors[index % colors.length]

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + sliceAngle / 2)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 16px Geneva, Arial, sans-serif'
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
      ctx.shadowBlur = 3
      ctx.shadowOffsetX = 1
      ctx.shadowOffsetY = 1
      ctx.fillText(member, radius * 0.65, 0)
      ctx.restore()
    })

    // Draw outer circle border
    ctx.strokeStyle = '#666'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.stroke()

    // Draw center circle
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI)
    ctx.fill()
    ctx.strokeStyle = '#666'
    ctx.lineWidth = 3
    ctx.stroke()
  }

  const saveFamilyMembers = (members) => {
    localStorage.setItem('familyMembers', JSON.stringify(members))
    setFamilyMembers(members)
  }

  const addMember = () => {
    if (newMember.trim()) {
      saveFamilyMembers([...familyMembers, newMember.trim()])
      setNewMember('')
    }
  }

  const removeMember = (index) => {
    saveFamilyMembers(familyMembers.filter((_, i) => i !== index))
  }

  const spinWheel = () => {
    if (familyMembers.length === 0 || spinning) return

    setSpinning(true)

    // Calculate random number of full rotations plus extra degrees
    const spins = 5 + Math.random() * 5
    const extraDegrees = Math.random() * 360
    const totalRotation = spins * 360 + extraDegrees

    // Animate rotation - always add to rotation for clockwise
    const endRotation = rotation + totalRotation

    setRotation(endRotation)

    // After spin completes, stop spinning
    setTimeout(() => {
      setSpinning(false)
    }, 3000)
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button className="mac-button" style={{ marginBottom: '20px' }}>← Back to Home</button>
      </Link>

      <div className="mac-window">
        <div className="mac-window-header mac-window-header-active">
          <div className="mac-window-close"></div>
          <div className="mac-window-title">🎡 Spin the Wheel</div>
          <div style={{ width: '12px' }}></div>
        </div>
        <div className="mac-window-content">
          <div className="mac-groupbox">
            <div className="mac-groupbox-label">Family Members</div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addMember()}
                placeholder="Enter name"
                className="mac-input"
                style={{ flex: 1 }}
              />
              <button onClick={addMember} className="mac-button">Add</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {familyMembers.map((member, index) => (
                <div key={index} className="mac-tag">
                  <span>{member}</span>
                  <span className="mac-tag-close" onClick={() => removeMember(index)}>×</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', width: '450px', height: '450px', margin: '30px auto' }}>
            {/* Pointer at top */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '25px solid transparent',
              borderRight: '25px solid transparent',
              borderTop: '50px solid #c00',
              zIndex: 10,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }} />

            {/* Canvas wheel */}
            <canvas
              ref={canvasRef}
              width={450}
              height={450}
              style={{
                transition: spinning ? 'transform 3000ms cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                transform: `rotate(${rotation}deg)`,
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
              }}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={spinWheel}
              disabled={familyMembers.length === 0 || spinning}
              className="mac-button mac-button-primary"
              style={{ fontSize: '18px', padding: '12px 50px' }}
            >
              {spinning ? 'Spinning...' : 'SPIN!'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
