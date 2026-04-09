 'use client'

/**
 * @fileoverview ContextMenu component for SchedulePro Calendar
 * @author Mohammad Saquib Khan
 * @version 1.0.0
 */


import { useEffect, useRef } from 'react'
import { Calendar, Coffee } from 'lucide-react'
import { formatTime12h } from '../lib/timeUtils'

interface ContextMenuProps {
  x: number
  y: number
  time: string
  staffName: string
  onAddReservation: () => void
  onAddBreak: () => void
  onClose: () => void
}

export default function ContextMenu({
  x, y, time, staffName, onAddReservation, onAddBreak, onClose
}: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  // Adjust position so menu doesn't go off screen
  const adjustedX = Math.min(x, window.innerWidth - 220)
  const adjustedY = Math.min(y, window.innerHeight - 150)

  return (
    <div
      ref={ref}
      className="context-menu"
      style={{ left: adjustedX, top: adjustedY }}
    >
      <div className="context-menu-header">
        <span className="context-staff">{staffName}</span>
        <span className="context-time">{formatTime12h(time)}</span>
      </div>
      <button className="context-item reservation-item" onClick={onAddReservation}>
        <Calendar size={14} />
        Add Reservation
      </button>
      <button className="context-item break-item" onClick={onAddBreak}>
        <Coffee size={14} />
        Add Break
      </button>
    </div>
  )
}
