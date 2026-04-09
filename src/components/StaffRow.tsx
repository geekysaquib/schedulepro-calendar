 'use client'

/**
 * @fileoverview StaffRow component for SchedulePro Calendar
 * @author Mohammad Saquib Khan
 * @version 1.0.0
 */


import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useDroppable } from '@dnd-kit/core'
import { Staff, Reservation } from '../lib/types'
import { HOURS, MINUTES, CELL_WIDTH, ROW_HEIGHT, timeToMinutes, timeToX, formatTime12h } from '../lib/timeUtils'
import ReservationBlock from './ReservationBlock'
import { X, Calendar, Coffee } from 'lucide-react'

interface StaffRowProps {
  staff: Staff
  reservations: Reservation[]
  date: string
  onCellClick: (staffId: string, time: string, x: number, y: number) => void
  onDeleteReservation: (id: string) => void
  onResizeReservation: (id: string, newEndTime: string) => void
}

function DroppableCell({ staffId, time }: { staffId: string; time: string }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `${staffId}__${time}`,
    data: { staffId, time }
  })
  const isHour = time.endsWith(':00')
  const isHalf = time.endsWith(':30')
  return (
    <div
      ref={setNodeRef}
      className={`calendar-cell ${isOver ? 'cell-over' : ''} ${isHour ? 'cell-hour' : isHalf ? 'cell-half' : 'cell-five'}`}
      style={{ width: `${CELL_WIDTH}px`, height: `${ROW_HEIGHT}px` }}
    />
  )
}

// ── Overlap layout ──────────────────────────────────────────────────────────
function overlaps(a: Reservation, b: Reservation): boolean {
  return timeToMinutes(a.start_time) < timeToMinutes(b.end_time) &&
    timeToMinutes(b.start_time) < timeToMinutes(a.end_time)
}

interface OverflowGroup {
  time: string
  x: number
  extras: Reservation[]
}

function buildLayout(reservations: Reservation[]) {
  const slot0: Reservation[] = []
  const slot1: Reservation[] = []
  const overflowMap = new Map<string, Reservation[]>()

  for (const res of reservations) {
    const collidesSlot0 = slot0.some(r => overlaps(r, res))
    const collidesSlot1 = slot1.some(r => overlaps(r, res))

    if (!collidesSlot0) {
      slot0.push(res)
    } else if (!collidesSlot1) {
      slot1.push(res)
    } else {
      const overlappers = [...slot0, ...slot1].filter(r => overlaps(r, res))
      const groupKey = overlappers.reduce((min, r) =>
        timeToMinutes(r.start_time) < timeToMinutes(min.start_time) ? r : min
      ).start_time
      if (!overflowMap.has(groupKey)) overflowMap.set(groupKey, [])
      overflowMap.get(groupKey)!.push(res)
    }
  }

  const overflowGroups: OverflowGroup[] = []
  overflowMap.forEach((extras, time) => {
    overflowGroups.push({ time, x: timeToX(time), extras })
  })

  return { slot0, slot1, overflowGroups }
}

// ── Portalled overflow popup ────────────────────────────────────────────────
function OverflowPopup({
  group, staffColor, anchorEl, onClose, onDelete,
}: {
  group: OverflowGroup
  staffColor: string
  anchorEl: HTMLElement | null
  onClose: () => void
  onDelete: (id: string) => void
}) {
  const popupRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  // Position relative to the badge button
  useEffect(() => {
    if (!anchorEl) return
    const rect = anchorEl.getBoundingClientRect()
    const popupWidth = 230
    const viewportWidth = window.innerWidth
    let left = rect.left
    if (left + popupWidth > viewportWidth - 12) left = viewportWidth - popupWidth - 12
    setPos({ top: rect.bottom + 6, left })
  }, [anchorEl])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node) &&
          anchorEl && !anchorEl.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose, anchorEl])

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      ref={popupRef}
      className="overflow-popup"
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}
      onClick={e => e.stopPropagation()}
    >
      <div className="overflow-popup-header">
        <span>+{group.extras.length} more at {formatTime12h(group.time)}</span>
        <button onClick={onClose}><X size={12} /></button>
      </div>
      {group.extras.map(res => (
        <div key={res.id} className="overflow-item">
          <div className="overflow-dot" style={{ background: staffColor }} />
          <div className="overflow-details">
            <div className="overflow-title">
              {res.type === 'break' ? <Coffee size={11} /> : <Calendar size={11} />}
              {res.title}
            </div>
            <span className="overflow-time">
              {formatTime12h(res.start_time)} – {formatTime12h(res.end_time)}
            </span>
            {res.description && (
              <span className="overflow-desc">{res.description}</span>
            )}
          </div>
          <button className="overflow-delete" onClick={() => onDelete(res.id)}>×</button>
        </div>
      ))}
    </div>,
    document.body
  )
}

// ── Main component ──────────────────────────────────────────────────────────
export default function StaffRow({
  staff, reservations, date, onCellClick, onDeleteReservation, onResizeReservation
}: StaffRowProps) {
  const [openOverflow, setOpenOverflow] = useState<string | null>(null)
  const badgeRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const handleCellClick = (e: React.MouseEvent, time: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    onCellClick(staff.id, time, e.clientX, rect.bottom + 4)
  }

  const { slot0, slot1, overflowGroups } = buildLayout(reservations)
  const ROW_HALF = Math.floor(ROW_HEIGHT / 2)

  return (
    <div className="staff-row" onClick={() => setOpenOverflow(null)}>
      {/* Staff Label */}
      <div className="staff-label" style={{ borderLeft: `3px solid ${staff.color}20` }}>
        <div className="staff-avatar-ring" style={{ background: `linear-gradient(135deg, ${staff.color}, ${staff.color}99)` }}>
          <div className="staff-avatar" style={{ background: staff.color }}>
            {staff.avatar_initials}
          </div>
        </div>
        <div className="staff-info">
          <span className="staff-name">{staff.name}</span>
          {staff.role && <span className="staff-role">{staff.role}</span>}
          <span className="staff-count">
            {reservations.filter(r => r.type === 'reservation').length} appointments
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="row-timeline" style={{ height: `${ROW_HEIGHT}px` }}>
        {/* Droppable cells */}
        <div className="cells-layer">
          {HOURS.map(h =>
            MINUTES.map(m => {
              const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
              return (
                <div key={time} onClick={e => handleCellClick(e, time)} style={{ display: 'contents' }}>
                  <DroppableCell staffId={staff.id} time={time} />
                </div>
              )
            })
          )}
        </div>

        {/* Blocks */}
        <div className="blocks-layer">
          {slot0.map(res => (
            <ReservationBlock key={res.id} reservation={res} staffColor={staff.color}
              topOffset={2} onDelete={onDeleteReservation} onResize={onResizeReservation} />
          ))}
          {slot1.map(res => (
            <ReservationBlock key={res.id} reservation={res} staffColor={staff.color}
              topOffset={ROW_HALF + 2} onDelete={onDeleteReservation} onResize={onResizeReservation} />
          ))}

          {/* +N badges */}
          {overflowGroups.map(group => (
            <div key={group.time} style={{ position: 'absolute', left: `${group.x}px`, top: 0, zIndex: 30, pointerEvents: 'all' }}>
              <button
                ref={el => { if (el) badgeRefs.current.set(group.time, el) }}
                className="overflow-badge"
                style={{ position: 'relative', left: 0, top: '50%', transform: 'translateY(-50%)', background: staff.color }}
                onClick={e => {
                  e.stopPropagation()
                  setOpenOverflow(openOverflow === group.time ? null : group.time)
                }}
              >
                +{group.extras.length}
              </button>

              {openOverflow === group.time && (
                <OverflowPopup
                  group={group}
                  staffColor={staff.color}
                  anchorEl={badgeRefs.current.get(group.time) ?? null}
                  onClose={() => setOpenOverflow(null)}
                  onDelete={id => { onDeleteReservation(id); setOpenOverflow(null) }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
