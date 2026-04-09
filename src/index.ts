/**
 * @fileoverview SchedulePro Calendar — Public API
 *
 * A professional, enterprise-grade staff reservation calendar component
 * for React and Next.js.
 *
 * @author Mohammad Saquib Khan
 * @version 1.0.0
 * @license MIT
 *
 * @example
 * ```tsx
 * // 1. Import the component and styles
 * import { ReservationCalendar } from 'schedulepro-calendar'
 * import 'schedulepro-calendar/styles'
 *
 * // 2. Define your staff and reservations
 * const staff = [
 *   { id: 's1', name: 'Alice Johnson', color: '#4f46e5', avatar_initials: 'AJ', role: 'Designer' },
 *   { id: 's2', name: 'Bob Smith',     color: '#059669', avatar_initials: 'BS', role: 'Engineer' },
 * ]
 *
 * const reservations = [
 *   {
 *     id: 'r1',
 *     staff_id: 's1',
 *     title: 'Client Meeting',
 *     description: 'Weekly sync',
 *     date: '2025-04-10',
 *     start_time: '09:00',
 *     end_time: '10:00',
 *     type: 'reservation',
 *     color: '#4f46e5',
 *   },
 * ]
 *
 * // 3. Render
 * export default function App() {
 *   return (
 *     <ReservationCalendar
 *       staff={staff}
 *       initialReservations={reservations}
 *       defaultTheme="light"
 *       onReservationCreate={(r) => console.log('Created', r)}
 *       onReservationDelete={(id) => console.log('Deleted', id)}
 *       onReservationMove={(r) => console.log('Moved', r)}
 *       onReservationResize={(id, end) => console.log('Resized', id, end)}
 *     />
 *   )
 * }
 * ```
 */

// ── Main component ────────────────────────────────────────────────────────────
export { default as ReservationCalendar } from './components/ReservationCalendar'

// ── Public types ──────────────────────────────────────────────────────────────
export type {
  Staff,
  Reservation,
  ReservationCalendarProps,
} from './lib/types'

// ── Utility functions (useful for consumers building custom integrations) ─────
export {
  timeToMinutes,
  minutesToTime,
  timeToX,
  xToTime,
  durationInCells,
  formatTime12h,
  CELL_WIDTH,
  ROW_HEIGHT,
  HOURS,
  MINUTES,
} from './lib/timeUtils'

// ── Demo data (useful for quick prototyping) ──────────────────────────────────
export { INITIAL_STAFF, INITIAL_RESERVATIONS } from './lib/initialData'
