import * as react_jsx_runtime from 'react/jsx-runtime';

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
interface Staff {
    /** Unique identifier for the staff member */
    id: string;
    /** Full display name */
    name: string;
    /**
     * Hex color code used for the staff member's avatar ring, event cards,
     * and accent bar. e.g. `"#4f46e5"`
     */
    color: string;
    /** 2-letter initials shown inside the avatar circle. e.g. `"SK"` */
    avatar_initials: string;
    /**
     * Optional job title shown below the name in the staff panel.
     * e.g. `"Senior Consultant"`
     */
    role?: string;
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
interface Reservation {
    /** Unique identifier for the reservation */
    id: string;
    /** ID of the staff member this reservation belongs to */
    staff_id: string;
    /** Short display title shown on the event card */
    title: string;
    /** Longer description shown on the card body and hover tooltip */
    description: string;
    /** ISO date string in `YYYY-MM-DD` format */
    date: string;
    /** Start time in 24-hour `HH:MM` format. e.g. `"09:00"` */
    start_time: string;
    /** End time in 24-hour `HH:MM` format. e.g. `"10:30"` */
    end_time: string;
    /**
     * Visual type of the block:
     * - `"reservation"` — solid card with colored accent bar
     * - `"break"` — dashed border with a coffee icon
     */
    type: 'reservation' | 'break';
    /**
     * Hex color for the event card. Typically matches the staff member's `color`.
     * Used to automatically derive the tinted background and border.
     */
    color: string;
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
interface ReservationCalendarProps {
    /**
     * Array of staff members to render as timeline rows.
     * Each staff member occupies one horizontal lane in the calendar.
     */
    staff: Staff[];
    /**
     * Seed reservations for the calendar's initial state.
     * After mount the component manages its own internal state.
     * @default []
     */
    initialReservations?: Reservation[];
    /**
     * Starting color theme.
     * Users can toggle between themes at runtime via the built-in button.
     * @default "light"
     */
    defaultTheme?: 'light' | 'dark';
    /**
     * Fired when the user completes the "New Reservation" modal.
     * Use this callback to persist the new event to your database.
     * The `id` field is auto-generated internally; you receive everything else.
     */
    onReservationCreate?: (reservation: Omit<Reservation, 'id'>) => void;
    /**
     * Fired when the user deletes a reservation via the hover tooltip.
     * Use this callback to remove the event from your database.
     */
    onReservationDelete?: (id: string) => void;
    /**
     * Fired when the user drops a reservation onto a new time slot or staff row.
     * Receives the complete updated reservation including new `staff_id`,
     * `start_time`, and `end_time`.
     */
    onReservationMove?: (reservation: Reservation) => void;
    /**
     * Fired when the user drags the right-edge resize handle.
     * Receives the reservation ID and the new end time in `HH:MM` format.
     */
    onReservationResize?: (id: string, newEndTime: string) => void;
}

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
declare function ReservationCalendar({ staff: staffProp, initialReservations, defaultTheme, onReservationCreate, onReservationDelete, onReservationMove, onReservationResize, }: ReservationCalendarProps): react_jsx_runtime.JSX.Element;

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
declare const HOURS: number[];
/** Array of minute marks at 5-min intervals (0, 5, 10, …, 55) */
declare const MINUTES: number[];
/**
 * Width in pixels of a single 5-minute cell.
 * Increasing this value uniformly scales the entire timeline width and
 * all event card widths — it is the single source of truth for layout sizing.
 */
declare const CELL_WIDTH = 35;
/** Height in pixels of each staff row (including stacked event lanes) */
declare const ROW_HEIGHT = 84;
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
declare function timeToMinutes(time: string): number;
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
declare function minutesToTime(minutes: number): string;
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
declare function timeToX(time: string): number;
/**
 * Converts a pixel x-offset back to the nearest 5-minute time string.
 * Used when computing the drop target during drag & drop.
 *
 * @param x - Pixel offset from the left edge of the timeline
 * @returns Nearest 5-minute-snapped time in `HH:MM` format
 */
declare function xToTime(x: number): string;
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
declare function durationInCells(startTime: string, endTime: string): number;
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
declare function formatTime12h(time: string): string;

declare const INITIAL_STAFF: Staff[];
declare const INITIAL_RESERVATIONS: Reservation[];

export { CELL_WIDTH, HOURS, INITIAL_RESERVATIONS, INITIAL_STAFF, MINUTES, ROW_HEIGHT, type Reservation, ReservationCalendar, type ReservationCalendarProps, type Staff, durationInCells, formatTime12h, minutesToTime, timeToMinutes, timeToX, xToTime };
