'use client'

/**
 * @fileoverview Main ReservationCalendar component
 * @author Mohammad Saquib Khan
 * @version 1.0.0
 */

import { useState, useRef, useEffect } from 'react'
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { format, addDays, subDays } from 'date-fns'
import { ChevronLeft, ChevronRight, Sun, Moon, Plus } from 'lucide-react'
import { Staff, Reservation, ReservationCalendarProps } from '../lib/types'
import { INITIAL_STAFF, INITIAL_RESERVATIONS } from '../lib/initialData'
import { timeToMinutes, minutesToTime, CELL_WIDTH } from '../lib/timeUtils'
import StaffRow from './StaffRow'
import TimeHeader from './TimeHeader'
import ContextMenu from './ContextMenu'
import ReservationModal from './ReservationModal'

let nextId = 1000

/**
 * ReservationCalendar — enterprise-grade staff scheduling calendar.
 *
 * Developed & Designed by Mohammad Saquib Khan
 *
 * @example
 * ```tsx
 * import { ReservationCalendar } from 'schedulepro-calendar'
 * import 'schedulepro-calendar/styles'
 *
 * <ReservationCalendar
 *   staff={myStaff}
 *   initialReservations={myReservations}
 *   defaultTheme="light"
 *   onReservationCreate={(r) => api.create(r)}
 *   onReservationDelete={(id) => api.delete(id)}
 *   onReservationMove={(r) => api.update(r)}
 *   onReservationResize={(id, end) => api.updateEnd(id, end)}
 * />
 * ```
 */
export default function ReservationCalendar({
  staff: staffProp,
  initialReservations,
  defaultTheme = 'light',
  onReservationCreate,
  onReservationDelete,
  onReservationMove,
  onReservationResize,
}: ReservationCalendarProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>(defaultTheme)
  const [date, setDate] = useState(new Date())
  const staffList: Staff[] = staffProp?.length ? staffProp : INITIAL_STAFF
  const [reservations, setReservations] = useState<Reservation[]>(
    initialReservations ?? INITIAL_RESERVATIONS
  )
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; staffId: string; time: string } | null>(null)
  const [modal, setModal] = useState<{ staffId: string; time: string; type: 'reservation' | 'break' } | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const dateStr = format(date, 'yyyy-MM-dd')
  const displayDate = format(date, 'EEEE, d MMMM yyyy')
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  /** Apply theme to document root for CSS variable resolution */
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])

  /** Scroll to 8 AM on mount so the working day is immediately visible */
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 8 * 12 * CELL_WIDTH
  }, [])

  const handleCellClick = (staffId: string, time: string, x: number, y: number) => {
    setContextMenu({ x, y, staffId, time })
  }

  const openModal = (type: 'reservation' | 'break') => {
    if (!contextMenu) return
    setModal({ staffId: contextMenu.staffId, time: contextMenu.time, type })
    setContextMenu(null)
  }

  const handleSave = (data: Omit<Reservation, 'id'>) => {
    const newRes: Reservation = { ...data, id: `spc-${nextId++}` }
    setReservations(prev => [...prev, newRes])
    setModal(null)
    onReservationCreate?.(data)
  }

  const handleDelete = (id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id))
    onReservationDelete?.(id)
  }

  const handleResize = (id: string, newEndTime: string) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, end_time: newEndTime } : r))
    onReservationResize?.(id, newEndTime)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    const reservation = active.data.current?.reservation as Reservation
    if (!reservation) return
    const [targetStaffId, targetTime] = (over.id as string).split('__')
    const durationMins = timeToMinutes(reservation.end_time) - timeToMinutes(reservation.start_time)
    const newEndTime = minutesToTime(timeToMinutes(targetTime) + durationMins)
    const targetStaff = staffList.find(s => s.id === targetStaffId)
    const updated: Reservation = {
      ...reservation,
      staff_id: targetStaffId,
      start_time: targetTime,
      end_time: newEndTime,
      color: targetStaff?.color ?? reservation.color,
    }
    setReservations(prev => prev.map(r => r.id === reservation.id ? updated : r))
    onReservationMove?.(updated)
  }

  const dayReservations = (staffId: string) =>
    reservations.filter(r => r.staff_id === staffId && r.date === dateStr)

  const totalReservations = reservations.filter(r => r.date === dateStr && r.type === 'reservation').length
  const totalBreaks = reservations.filter(r => r.date === dateStr && r.type === 'break').length
  const staffOnDuty = staffList.filter(s => reservations.some(r => r.staff_id === s.id && r.date === dateStr)).length
  const utilisation = Math.round(((totalReservations + totalBreaks) / Math.max(staffList.length * 16, 1)) * 100)

  return (
    <div className="calendar-root">
      <header className="cal-header">
        <div className="cal-header-left">
          <div className="cal-logo">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M1 7h14" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <rect x="3.5" y="9.5" width="3" height="2" rx="0.5" className="cal-logo-icon-fill"/>
              <rect x="8.5" y="9.5" width="3" height="2" rx="0.5" className="cal-logo-icon-fill" opacity="0.5"/>
            </svg>
          </div>
          <span className="cal-title">SchedulePro</span>
          <span className="cal-enterprise-tag">Enterprise</span>
        </div>
        <div className="cal-nav">
          <button className="nav-btn" onClick={() => setDate(d => subDays(d, 1))}><ChevronLeft size={14} /></button>
          <div className="nav-date"><span className="nav-date-text">{displayDate}</span></div>
          <button className="nav-btn" onClick={() => setDate(d => addDays(d, 1))}><ChevronRight size={14} /></button>
          <button className="nav-today" onClick={() => setDate(new Date())}>Today</button>
        </div>
        <div className="cal-header-right">
          <button className="theme-toggle" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <><Sun size={12} /> Light mode</> : <><Moon size={12} /> Dark mode</>}
          </button>
          <button className="new-reservation-btn" onClick={() => {
            if (staffList[0]) setModal({ staffId: staffList[0].id, time: '09:00', type: 'reservation' })
          }}>
            <Plus size={12} /> New Reservation
          </button>
        </div>
      </header>

      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-dot" style={{ background: 'var(--stat-dot-res)' }} />
          <div className="stat-values"><span className="stat-num">{totalReservations}</span><span className="stat-label">Reservations</span></div>
        </div>
        <div className="stat-item">
          <div className="stat-dot" style={{ background: 'var(--stat-dot-brk)' }} />
          <div className="stat-values"><span className="stat-num">{totalBreaks}</span><span className="stat-label">Breaks</span></div>
        </div>
        <div className="stat-item">
          <div className="stat-dot" style={{ background: 'var(--stat-dot-stf)' }} />
          <div className="stat-values"><span className="stat-num">{staffOnDuty}</span><span className="stat-label">Staff on duty</span></div>
        </div>
        <div className="stat-item">
          <div className="stat-dot" style={{ background: 'var(--stat-dot-util)' }} />
          <div className="stat-values"><span className="stat-num">{utilisation}%</span><span className="stat-label">Utilisation</span></div>
        </div>
        <span className="stat-hint">Click any time slot to schedule &nbsp;·&nbsp; Drag events to reschedule</span>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="calendar-grid-wrapper">
          <div className="scroll-container" ref={scrollRef}>
            <TimeHeader />
            {staffList.map(staff => (
              <StaffRow
                key={staff.id}
                staff={staff}
                reservations={dayReservations(staff.id)}
                date={dateStr}
                onCellClick={handleCellClick}
                onDeleteReservation={handleDelete}
                onResizeReservation={handleResize}
              />
            ))}
          </div>
        </div>
      </DndContext>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x} y={contextMenu.y}
          time={contextMenu.time}
          staffName={staffList.find(s => s.id === contextMenu.staffId)?.name ?? ''}
          onAddReservation={() => openModal('reservation')}
          onAddBreak={() => openModal('break')}
          onClose={() => setContextMenu(null)}
        />
      )}

      {modal && (
        <ReservationModal
          staffId={modal.staffId}
          staffList={staffList}
          date={dateStr}
          startTime={modal.time}
          type={modal.type}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
