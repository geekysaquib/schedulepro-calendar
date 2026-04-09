'use client'

/**
 * @fileoverview ReservationModal component for SchedulePro Calendar
 * @author Mohammad Saquib Khan
 * @version 1.0.0
 */


import { useState } from 'react'
import { X, Clock, User, AlignLeft, Tag } from 'lucide-react'
import { Staff, Reservation } from '../lib/types'
import { formatTime12h, minutesToTime, timeToMinutes } from '../lib/timeUtils'

interface ReservationModalProps {
  staffId: string
  staffList: Staff[]
  date: string
  startTime: string
  type: 'reservation' | 'break'
  onSave: (data: Omit<Reservation, 'id'>) => void
  onClose: () => void
}

export default function ReservationModal({
  staffId, staffList, date, startTime, type, onSave, onClose
}: ReservationModalProps) {
  const defaultTitle = type === 'break' ? 'Break' : ''
  const defaultEnd = minutesToTime(timeToMinutes(startTime) + 60)

  const [title, setTitle] = useState(defaultTitle)
  const [description, setDescription] = useState('')
  const [endTime, setEndTime] = useState(defaultEnd)
  const [selectedStaffId, setSelectedStaffId] = useState(staffId)

  const selectedStaff = staffList.find(s => s.id === selectedStaffId)

  const handleSubmit = () => {
    if (!title.trim()) return
    onSave({
      staff_id: selectedStaffId,
      title: title.trim(),
      description: description.trim(),
      date,
      start_time: startTime,
      end_time: endTime,
      type,
      color: selectedStaff?.color || '#6366f1',
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div
              className="modal-type-badge"
              style={{
                background: type === 'break' ? '#f59e0b22' : `${selectedStaff?.color}22`,
                color: type === 'break' ? '#f59e0b' : selectedStaff?.color,
              }}
            >
              {type === 'break' ? '☕ Break' : '📅 Reservation'}
            </div>
            <button className="modal-close" onClick={onClose}><X size={16} /></button>
          </div>
          <h2 className="modal-heading">{type === 'break' ? 'Add Break' : 'New Reservation'}</h2>
          <p className="modal-subheading">{date}</p>
        </div>

        <div className="modal-body">
          {/* Staff */}
          <div className="form-group">
            <label className="form-label"><User size={13} /> Staff Member</label>
            <div className="staff-select-grid">
              {staffList.map(s => (
                <button
                  key={s.id}
                  className={`staff-chip ${selectedStaffId === s.id ? 'selected' : ''}`}
                  style={selectedStaffId === s.id
                    ? { background: s.color, borderColor: s.color }
                    : { borderColor: s.color + '44' }}
                  onClick={() => setSelectedStaffId(s.id)}
                >
                  <span
                    className="chip-avatar"
                    style={{
                      background: selectedStaffId === s.id ? 'white' : s.color,
                      color: selectedStaffId === s.id ? s.color : 'white',
                    }}
                  >
                    {s.avatar_initials}
                  </span>
                  <span className="chip-name">{s.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="form-group">
            <label className="form-label"><Tag size={13} /> Title</label>
            <input
              className="form-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={type === 'break' ? 'Break' : 'e.g. Client Meeting'}
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          {/* Time */}
          <div className="form-group">
            <label className="form-label"><Clock size={13} /> Time</label>
            <div className="time-row">
              <div className="time-display">{formatTime12h(startTime)}</div>
              <span className="time-arrow">→</span>
              <input
                className="form-input time-input"
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label"><AlignLeft size={13} /> Description</label>
            <textarea
              className="form-input form-textarea"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Optional notes..."
              rows={3}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary"
            style={{ background: type === 'break' ? '#f59e0b' : selectedStaff?.color }}
            onClick={handleSubmit}
            disabled={!title.trim()}
          >
            Add {type === 'break' ? 'Break' : 'Reservation'}
          </button>
        </div>
      </div>
    </div>
  )
}
