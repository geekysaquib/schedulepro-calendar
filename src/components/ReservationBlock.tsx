 'use client'

/**
 * @fileoverview ReservationBlock component for SchedulePro Calendar
 * @author Mohammad Saquib Khan
 * @version 1.0.0
 */


import { useState, useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDraggable } from '@dnd-kit/core'
import { Reservation } from '../lib/types'
import { CELL_WIDTH, durationInCells, formatTime12h, timeToX, timeToMinutes, minutesToTime } from '../lib/timeUtils'
import { Trash2, Coffee, Calendar } from 'lucide-react'

interface ReservationBlockProps {
  reservation: Reservation
  staffColor: string
  topOffset?: number
  onDelete: (id: string) => void
  onResize: (id: string, newEndTime: string) => void
}

// ── Derive tinted block colors from staff color ─────────────────────────────
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return { r, g, b }
}

function blockColors(color: string, isBreak: boolean, isDark: boolean) {
  const { r, g, b } = hexToRgb(color)
  if (isDark) {
    const bg     = `rgba(${r},${g},${b},0.22)`
    const border = isBreak ? `rgba(${r},${g},${b},0.55)` : `rgba(${r},${g},${b},0.40)`
    const title  = `rgba(${Math.min(r+100,255)},${Math.min(g+100,255)},${Math.min(b+100,255)},1)`
    const desc   = `rgba(${Math.min(r+80,255)},${Math.min(g+80,255)},${Math.min(b+80,255)},0.72)`
    return { bg, border, title, desc }
  } else {
    const bg     = `rgba(${r},${g},${b},0.13)`
    const border = isBreak ? `rgba(${r},${g},${b},0.55)` : `rgba(${r},${g},${b},0.40)`
    const title  = `rgb(${Math.max(r-50,0)},${Math.max(g-50,0)},${Math.max(b-50,0)})`
    const desc   = `rgba(${Math.max(r-30,0)},${Math.max(g-30,0)},${Math.max(b-30,0)},0.72)`
    return { bg, border, title, desc }
  }
}

// ── Portalled tooltip ────────────────────────────────────────────────────────
function BlockTooltip({ anchorEl, reservation, staffColor, displayEnd, onDelete, onClose }: {
  anchorEl: HTMLElement | null
  reservation: Reservation
  staffColor: string
  displayEnd: string
  onDelete: () => void
  onClose: () => void
}) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const isBreak = reservation.type === 'break'

  useEffect(() => {
    if (!anchorEl) return
    const r = anchorEl.getBoundingClientRect()
    const tw = 210
    const vw = window.innerWidth
    const spaceBelow = window.innerHeight - r.bottom
    const top = spaceBelow > 160 ? r.bottom + 6 : r.top - 150
    let left = r.left
    if (left + tw > vw - 12) left = vw - tw - 12
    if (left < 8) left = 8
    setPos({ top, left })
  }, [anchorEl])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node) &&
          anchorEl && !anchorEl.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose, anchorEl])

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      ref={tooltipRef}
      className="reservation-tooltip"
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}
      onClick={e => e.stopPropagation()}
    >
      <div className="tooltip-header" style={{ color: staffColor }}>
        {isBreak ? <Coffee size={13} /> : <Calendar size={13} />}
        {reservation.title}
      </div>
      <div className="tooltip-time">
        {formatTime12h(reservation.start_time)} – {formatTime12h(displayEnd)}
      </div>
      {reservation.description && (
        <div className="tooltip-desc">{reservation.description}</div>
      )}
      <button className="tooltip-delete" onClick={onDelete}>
        <Trash2 size={12} /> Delete event
      </button>
    </div>,
    document.body
  )
}

// ── Main block ───────────────────────────────────────────────────────────────
export default function ReservationBlock({
  reservation, staffColor, topOffset = 0, onDelete, onResize
}: ReservationBlockProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [liveEndTime, setLiveEndTime] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(false)
  const blockRef = useRef<HTMLDivElement>(null)
  const resizeStartX = useRef(0)
  const resizeStartEndMins = useRef(0)

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: reservation.id,
    data: { reservation },
    disabled: isResizing,
  })

  const displayEnd = liveEndTime ?? reservation.end_time
  const left  = timeToX(reservation.start_time)
  const width = Math.max(durationInCells(reservation.start_time, displayEnd) * CELL_WIDTH - 2, CELL_WIDTH)
  const isBreak = reservation.type === 'break'
  const colors = blockColors(staffColor, isBreak, isDark)

  const blockStyle: React.CSSProperties = {
    left: `${left}px`,
    width: `${width}px`,
    top: `${topOffset}px`,
    height: 'calc(50% - 4px)',
    background: colors.bg,
    borderColor: colors.border,
    borderStyle: isBreak ? 'dashed' : 'solid',
    borderWidth: isBreak ? '1.5px' : '1px',
    transform: (!isResizing && transform) ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.45 : 1,
    zIndex: isDragging ? 1000 : isResizing ? 100 : 10,
  }

  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsResizing(true)
    setShowTooltip(false)
    resizeStartX.current = e.clientX
    resizeStartEndMins.current = timeToMinutes(reservation.end_time)
    const startMins = timeToMinutes(reservation.start_time)

    const onMove = (me: MouseEvent) => {
      me.preventDefault()
      const dx = me.clientX - resizeStartX.current
      const deltaCells = Math.round(dx / CELL_WIDTH)
      const newMins = Math.max(startMins + 5, resizeStartEndMins.current + deltaCells * 5)
      setLiveEndTime(minutesToTime(newMins))
    }

    const onUp = (me: MouseEvent) => {
      const dx = me.clientX - resizeStartX.current
      const deltaCells = Math.round(dx / CELL_WIDTH)
      const newMins = Math.max(startMins + 5, resizeStartEndMins.current + deltaCells * 5)
      onResize(reservation.id, minutesToTime(newMins))
      setLiveEndTime(null)
      setIsResizing(false)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [reservation.id, reservation.end_time, reservation.start_time, onResize])

  return (
    <>
      <div
        ref={blockRef}
        className={`reservation-block ${isResizing ? 'resizing' : ''}`}
        style={blockStyle}
        onMouseEnter={() => !isResizing && !isDragging && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Left accent stripe */}
        <div className="block-accent-bar" style={{ background: staffColor }} />

        {/* Drag zone */}
        <div ref={setNodeRef} className="block-drag-zone" {...listeners} {...attributes}>
          <div className="block-inner">
            <div className="block-top-row">
              {isBreak
                ? <Coffee size={9} color={colors.title} />
                : <Calendar size={9} color={colors.title} />
              }
              <span className="block-title" style={{ color: colors.title }}>
                {reservation.title}
              </span>
            </div>
            {reservation.description && (
              <span className="block-desc" style={{ color: colors.desc }}>
                {reservation.description}
              </span>
            )}
          </div>
        </div>

        {/* Resize handle */}
        <div className="resize-handle" onMouseDown={handleResizeMouseDown}>
          <div className="resize-grip" />
        </div>
      </div>

      {showTooltip && !isDragging && !isResizing && (
        <BlockTooltip
          anchorEl={blockRef.current}
          reservation={reservation}
          staffColor={staffColor}
          displayEnd={displayEnd}
          onDelete={() => { setShowTooltip(false); onDelete(reservation.id) }}
          onClose={() => setShowTooltip(false)}
        />
      )}
    </>
  )
}
