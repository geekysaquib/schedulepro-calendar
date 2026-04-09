/**
 * @fileoverview Time ↔ pixel conversion utilities for SchedulePro Calendar.
 *
 * The calendar timeline renders a full 24-hour day as a horizontally scrollable
 * grid. Each 5-minute interval is one "cell". All pixel positions are derived
 * from these constants so changing `CELL_WIDTH` scales the entire layout.
 *
 * @author Mohammad Saquib Khan
 * @version 1.0.0
 */

/** Array of all 24 hours (0–23) used to render the time header */
export const HOURS = Array.from({ length: 24 }, (_, i) => i)

/** Array of minute marks at 5-min intervals (0, 5, 10, …, 55) */
export const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5)

/**
 * Width in pixels of a single 5-minute cell.
 * Increasing this value uniformly scales the entire timeline width and
 * all event card widths — it is the single source of truth for layout sizing.
 */
export const CELL_WIDTH = 35

/** Total pixel width of one hour (12 five-minute cells) */
export const HOUR_WIDTH = CELL_WIDTH * 12

/** Height in pixels of each staff row (including stacked event lanes) */
export const ROW_HEIGHT = 84

/**
 * Converts a time string to total minutes from midnight.
 *
 * @param time - Time in `HH:MM` format (24-hour)
 * @returns Total minutes elapsed since 00:00
 *
 * @example
 * timeToMinutes('09:30') // → 570
 * timeToMinutes('00:00') // → 0
 * timeToMinutes('23:55') // → 1435
 */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/**
 * Converts total minutes from midnight to a `HH:MM` time string.
 * Wraps around midnight automatically (e.g. 1500 minutes → "01:00").
 *
 * @param minutes - Total minutes from midnight
 * @returns Time string in `HH:MM` 24-hour format
 *
 * @example
 * minutesToTime(570)  // → "09:30"
 * minutesToTime(0)    // → "00:00"
 * minutesToTime(1440) // → "00:00" (wraps at midnight)
 */
export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/**
 * Converts a time string to a pixel `left` offset within the timeline.
 * Used to absolutely position event cards on the horizontal axis.
 *
 * @param time - Time in `HH:MM` 24-hour format
 * @returns Pixel offset from the left edge of the timeline (00:00)
 *
 * @example
 * timeToX('08:00') // → 1344 (at default CELL_WIDTH=35: 96 cells × 35px)
 */
export function timeToX(time: string): number {
  const mins = timeToMinutes(time)
  return (mins / 5) * CELL_WIDTH
}

/**
 * Converts a pixel x-offset back to the nearest 5-minute time string.
 * Used when computing the drop target during drag & drop.
 *
 * @param x - Pixel offset from the left edge of the timeline
 * @returns Nearest 5-minute-snapped time in `HH:MM` format
 */
export function xToTime(x: number): string {
  const cells = Math.round(x / CELL_WIDTH)
  return minutesToTime(cells * 5)
}

/**
 * Returns the number of 5-minute cells spanned by a time range.
 * Used to calculate event card widths.
 *
 * @param startTime - Start in `HH:MM` format
 * @param endTime - End in `HH:MM` format
 * @returns Number of 5-minute cells (minimum 1)
 *
 * @example
 * durationInCells('09:00', '10:00') // → 12 (one hour = 12 × 5 min)
 * durationInCells('09:00', '09:05') // → 1 (minimum)
 */
export function durationInCells(startTime: string, endTime: string): number {
  const startMins = timeToMinutes(startTime)
  const endMins   = timeToMinutes(endTime)
  return Math.max(1, (endMins - startMins) / 5)
}

/**
 * Formats a 24-hour time string into a 12-hour AM/PM string.
 *
 * @param time - Time in `HH:MM` 24-hour format
 * @returns Human-readable time string
 *
 * @example
 * formatTime12h('13:30') // → "1:30 PM"
 * formatTime12h('00:00') // → "12:00 AM"
 */
export function formatTime12h(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour   = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

/**
 * Formats an hour number (0–23) as a short AM/PM label for the time header.
 *
 * @param hour - Hour integer (0–23)
 * @returns Short label like `"9AM"` or `"12PM"`
 *
 * @example
 * formatHour(9)  // → "9AM"
 * formatHour(0)  // → "12AM"
 * formatHour(12) // → "12PM"
 */
export function formatHour(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM'
  const h      = hour % 12 || 12
  return `${h}${period}`
}
