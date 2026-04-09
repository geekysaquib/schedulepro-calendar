/**
 * @fileoverview Core TypeScript types for SchedulePro Calendar
 * @author Mohammad Saquib Khan
 * @version 1.0.0
 */

/**
 * Represents a staff member displayed as a row in the calendar.
 *
 * @example
 * ```ts
 * const staff: Staff = {
 *   id: 's1',
 *   name: 'Pratiksha Sharma',
 *   color: '#4f46e5',
 *   avatar_initials: 'PS',
 *   role: 'Senior Consultant',
 * }
 * ```
 */
export interface Staff {
  /** Unique identifier for the staff member */
  id: string
  /** Full display name */
  name: string
  /**
   * Hex color code used for the staff member's avatar ring, event cards,
   * and accent bar. e.g. `"#4f46e5"`
   */
  color: string
  /** 2-letter initials shown inside the avatar circle. e.g. `"SK"` */
  avatar_initials: string
  /**
   * Optional job title shown below the name in the staff panel.
   * e.g. `"Senior Consultant"`
   */
  role?: string
}

/**
 * Represents a single reservation or break block on the calendar.
 *
 * @example
 * ```ts
 * const reservation: Reservation = {
 *   id: 'r1',
 *   staff_id: 's1',
 *   title: 'Client Consultation',
 *   description: 'Initial meeting with new client',
 *   date: '2025-04-10',
 *   start_time: '09:00',
 *   end_time: '10:00',
 *   type: 'reservation',
 *   color: '#4f46e5',
 * }
 * ```
 */
export interface Reservation {
  /** Unique identifier for the reservation */
  id: string
  /** ID of the staff member this reservation belongs to */
  staff_id: string
  /** Short display title shown on the event card */
  title: string
  /** Longer description shown on the card body and hover tooltip */
  description: string
  /** ISO date string in `YYYY-MM-DD` format */
  date: string
  /** Start time in 24-hour `HH:MM` format. e.g. `"09:00"` */
  start_time: string
  /** End time in 24-hour `HH:MM` format. e.g. `"10:30"` */
  end_time: string
  /**
   * Visual type of the block:
   * - `"reservation"` — solid card with colored accent bar
   * - `"break"` — dashed border with a coffee icon
   */
  type: 'reservation' | 'break'
  /**
   * Hex color for the event card. Typically matches the staff member's `color`.
   * Used to automatically derive the tinted background and border.
   */
  color: string
}

/**
 * Props accepted by the top-level `<ReservationCalendar />` component.
 *
 * @example
 * ```tsx
 * <ReservationCalendar
 *   staff={myStaff}
 *   initialReservations={myReservations}
 *   defaultTheme="light"
 *   onReservationCreate={(r) => saveToDb(r)}
 *   onReservationDelete={(id) => deleteFromDb(id)}
 *   onReservationMove={(r) => updateInDb(r)}
 *   onReservationResize={(id, end) => updateEndTime(id, end)}
 * />
 * ```
 */
export interface ReservationCalendarProps {
  /**
   * Array of staff members to render as timeline rows.
   * Each staff member occupies one horizontal lane in the calendar.
   */
  staff: Staff[]

  /**
   * Seed reservations for the calendar's initial state.
   * After mount the component manages its own internal state.
   * @default []
   */
  initialReservations?: Reservation[]

  /**
   * Starting color theme.
   * Users can toggle between themes at runtime via the built-in button.
   * @default "light"
   */
  defaultTheme?: 'light' | 'dark'

  /**
   * Fired when the user completes the "New Reservation" modal.
   * Use this callback to persist the new event to your database.
   * The `id` field is auto-generated internally; you receive everything else.
   */
  onReservationCreate?: (reservation: Omit<Reservation, 'id'>) => void

  /**
   * Fired when the user deletes a reservation via the hover tooltip.
   * Use this callback to remove the event from your database.
   */
  onReservationDelete?: (id: string) => void

  /**
   * Fired when the user drops a reservation onto a new time slot or staff row.
   * Receives the complete updated reservation including new `staff_id`,
   * `start_time`, and `end_time`.
   */
  onReservationMove?: (reservation: Reservation) => void

  /**
   * Fired when the user drags the right-edge resize handle.
   * Receives the reservation ID and the new end time in `HH:MM` format.
   */
  onReservationResize?: (id: string, newEndTime: string) => void
}

/** @internal Used for cell click state tracking */
export interface CellClickInfo {
  staffId: string
  date: string
  time: string
}
