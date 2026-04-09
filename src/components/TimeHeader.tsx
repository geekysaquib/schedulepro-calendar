 'use client'

/**
 * @fileoverview TimeHeader component for SchedulePro Calendar
 * @author Mohammad Saquib Khan
 * @version 1.0.0
 */


import { HOURS, MINUTES, CELL_WIDTH, formatHour } from '../lib/timeUtils'

export default function TimeHeader() {
  return (
    <div className="time-header-row">
      <div className="corner-spacer">
        <span className="corner-label">Staff member</span>
      </div>
      <div className="hour-labels">
        {HOURS.map(h => (
          <div key={h} className="hour-block" style={{ width: `${CELL_WIDTH * 12}px` }}>
            <span className="hour-label">
              {h === 0 ? '12:00 AM' : h < 12 ? `${h}:00 AM` : h === 12 ? '12:00 PM' : `${h-12}:00 PM`}
            </span>
            <div className="minute-ticks">
              {MINUTES.map(m => (
                <div
                  key={m}
                  className={`minute-tick ${m === 0 ? 'major' : m === 30 ? 'semi' : 'minor'}`}
                  style={{ width: `${CELL_WIDTH}px` }}
                >
                  {m === 30 && <span className="minute-label">:30</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
