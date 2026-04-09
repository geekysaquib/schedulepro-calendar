# SchedulePro Calendar

[![npm version](https://img.shields.io/npm/v/schedulepro-calendar.svg)](https://www.npmjs.com/package/schedulepro-calendar)
[![license](https://img.shields.io/npm/l/schedulepro-calendar.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A professional, enterprise-grade **staff reservation calendar** component for **React** and **Next.js**.

> **Developed & Designed by [Mohammad Saquib Khan](https://github.com/geekysaquib)**

---

## Preview

A 24-hour horizontal timeline calendar with per-staff rows, drag & drop rescheduling, 5-minute precision, overlap stacking, and a polished corporate design in both light and dark themes.

---

## Features

- 📅 **24-hour timeline** — full day view with 5-minute cell precision
- 👥 **Per-staff rows** — each staff member gets their own horizontal lane with name, role, and avatar
- 🖱️ **Drag & drop** — move reservations across time slots and between staff members
- ↔️ **Resize handle** — drag the right edge of any card to extend in 5-min steps
- 📦 **Overlap stacking** — up to 2 events shown side-by-side; extras shown as a `+N` badge with a popup
- ➕ **Add via click** — click any time cell to open a context menu → reservation or break
- ☕ **Break support** — breaks render with a dashed border and coffee icon
- 🌙 **Dark & Light themes** — fully CSS-variable-driven, smooth transition
- 📌 **Sticky headers** — time ruler and staff column stay visible while scrolling
- 📊 **Live stats bar** — reservations, breaks, staff on duty, utilisation %
- 🔗 **Callback props** — hook into create/delete/move/resize for backend sync
- 💪 **TypeScript** — fully typed with exported interfaces

---

## Installation

```bash
npm install schedulepro-calendar
# or
yarn add schedulepro-calendar
# or
pnpm add schedulepro-calendar
```

### Peer dependencies

Make sure these are installed in your project:

```bash
npm install react react-dom
```

For Next.js projects, `next` is already installed.

---

## Quick Start

### 1. Import the component and styles

```tsx
import { ReservationCalendar } from 'schedulepro-calendar'
import 'schedulepro-calendar/styles'
```

### 2. Define your data

```tsx
import { Staff, Reservation } from 'schedulepro-calendar'

const staff: Staff[] = [
  {
    id: 's1',
    name: 'Alice Johnson',
    color: '#4f46e5',
    avatar_initials: 'AJ',
    role: 'Senior Consultant',
  },
  {
    id: 's2',
    name: 'Bob Smith',
    color: '#059669',
    avatar_initials: 'BS',
    role: 'Engineer',
  },
]

const reservations: Reservation[] = [
  {
    id: 'r1',
    staff_id: 's1',
    title: 'Client Meeting',
    description: 'Weekly sync call',
    date: '2025-04-10',       // YYYY-MM-DD
    start_time: '09:00',      // HH:MM (24-hour)
    end_time: '10:00',
    type: 'reservation',
    color: '#4f46e5',         // should match staff.color
  },
  {
    id: 'r2',
    staff_id: 's1',
    title: 'Lunch Break',
    description: '',
    date: '2025-04-10',
    start_time: '12:00',
    end_time: '13:00',
    type: 'break',            // renders with dashed border + coffee icon
    color: '#4f46e5',
  },
]
```

### 3. Render

```tsx
export default function SchedulePage() {
  return (
    <ReservationCalendar
      staff={staff}
      initialReservations={reservations}
      defaultTheme="light"
      onReservationCreate={(r) => console.log('Created:', r)}
      onReservationDelete={(id) => console.log('Deleted:', id)}
      onReservationMove={(r) => console.log('Moved:', r)}
      onReservationResize={(id, end) => console.log('Resized:', id, 'new end:', end)}
    />
  )
}
```

> **Note for Next.js:** Wrap in a client component or add `'use client'` at the top of the file, since the calendar uses React hooks and browser APIs.

---

## Next.js Setup

```tsx
// app/schedule/page.tsx
'use client'

import { ReservationCalendar } from 'schedulepro-calendar'
import 'schedulepro-calendar/styles'

export default function SchedulePage() {
  return (
    <div style={{ height: '100vh' }}>
      <ReservationCalendar staff={[]} defaultTheme="light" />
    </div>
  )
}
```

If you leave `staff` empty, the calendar renders with built-in demo staff and reservations so you can see it working immediately.

---

## API Reference

### `<ReservationCalendar />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `staff` | `Staff[]` | demo data | Array of staff members to render as rows |
| `initialReservations` | `Reservation[]` | demo data | Seed reservations for the initial state |
| `defaultTheme` | `'light' \| 'dark'` | `'light'` | Starting color theme |
| `onReservationCreate` | `(r: Omit<Reservation, 'id'>) => void` | — | Fired when a new reservation is saved |
| `onReservationDelete` | `(id: string) => void` | — | Fired when a reservation is deleted |
| `onReservationMove` | `(r: Reservation) => void` | — | Fired after drag & drop with updated fields |
| `onReservationResize` | `(id: string, newEndTime: string) => void` | — | Fired after resize with new end time |

---

### `Staff`

```ts
interface Staff {
  id: string             // unique identifier
  name: string           // full display name
  color: string          // hex color, e.g. "#4f46e5"
  avatar_initials: string // 2-letter initials, e.g. "AJ"
  role?: string          // optional job title shown below name
}
```

---

### `Reservation`

```ts
interface Reservation {
  id: string
  staff_id: string       // must match a Staff.id
  title: string          // shown on the event card
  description: string    // shown in card body and hover tooltip
  date: string           // YYYY-MM-DD
  start_time: string     // HH:MM (24-hour)
  end_time: string       // HH:MM (24-hour)
  type: 'reservation' | 'break'
  color: string          // hex, typically matches staff.color
}
```

---

## Backend Integration Example

```tsx
'use client'

import { ReservationCalendar, Reservation } from 'schedulepro-calendar'
import 'schedulepro-calendar/styles'
import { useEffect, useState } from 'react'

export default function SchedulePage() {
  const [staff, setStaff] = useState([])
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    // Load from your API
    fetch('/api/staff').then(r => r.json()).then(setStaff)
    fetch('/api/reservations').then(r => r.json()).then(setReservations)
  }, [])

  const handleCreate = async (r: Omit<Reservation, 'id'>) => {
    await fetch('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(r),
    })
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/reservations/${id}`, { method: 'DELETE' })
  }

  const handleMove = async (r: Reservation) => {
    await fetch(`/api/reservations/${r.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        staff_id: r.staff_id,
        start_time: r.start_time,
        end_time: r.end_time,
      }),
    })
  }

  const handleResize = async (id: string, newEndTime: string) => {
    await fetch(`/api/reservations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ end_time: newEndTime }),
    })
  }

  return (
    <ReservationCalendar
      staff={staff}
      initialReservations={reservations}
      onReservationCreate={handleCreate}
      onReservationDelete={handleDelete}
      onReservationMove={handleMove}
      onReservationResize={handleResize}
    />
  )
}
```

---

## Supabase Integration Example

```tsx
import { createClient } from '@supabase/supabase-js'
import { ReservationCalendar, Reservation } from 'schedulepro-calendar'
import 'schedulepro-calendar/styles'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function SchedulePage() {
  return (
    <ReservationCalendar
      staff={myStaff}
      initialReservations={myReservations}
      onReservationCreate={async (r) => {
        await supabase.from('reservations').insert(r)
      }}
      onReservationDelete={async (id) => {
        await supabase.from('reservations').delete().eq('id', id)
      }}
      onReservationMove={async (r) => {
        await supabase.from('reservations').update({
          staff_id: r.staff_id,
          start_time: r.start_time,
          end_time: r.end_time,
        }).eq('id', r.id)
      }}
      onReservationResize={async (id, end) => {
        await supabase.from('reservations').update({ end_time: end }).eq('id', id)
      }}
    />
  )
}
```

---

## CSS Customization

All visual tokens are CSS custom properties. Override them in your global CSS after importing the library styles:

```css
/* globals.css */
@import 'schedulepro-calendar/styles';

[data-theme="light"] {
  --accent: #7c3aed;          /* change accent color */
  --staff-width: 240px;       /* wider staff panel */
  --row-height: 100px;        /* taller rows */
}
```

### Key variables

| Variable | Default (light) | Description |
|----------|----------------|-------------|
| `--accent` | `#2563eb` | Primary accent color (Today button, focus rings) |
| `--staff-width` | `220px` | Width of the sticky staff column |
| `--row-height` | `84px` | Height of each staff row |
| `--cell-width` | `35px` | Width of each 5-minute cell (scales entire grid) |
| `--bg` | `#f7f8fa` | Page background |
| `--surface` | `#ffffff` | Card / header surface |
| `--text` | `#1a2235` | Primary text |

---

## Exported Utilities

In addition to the main component, these helpers are exported for custom integrations:

```ts
import {
  timeToMinutes,    // '09:30' → 570
  minutesToTime,    // 570 → '09:30'
  timeToX,          // '09:00' → pixel left offset
  formatTime12h,    // '13:30' → '1:30 PM'
  CELL_WIDTH,       // px width of one 5-min cell
  ROW_HEIGHT,       // px height of a staff row
  INITIAL_STAFF,    // demo staff array
  INITIAL_RESERVATIONS, // demo reservations array
} from 'schedulepro-calendar'
```

---

## Requirements

| Dependency | Version |
|-----------|---------|
| React | ≥ 18.0.0 |
| react-dom | ≥ 18.0.0 |
| Next.js | ≥ 13.0.0 (optional) |

---

## Changelog

### 1.0.0 (2025)
- Initial release
- 24-hour horizontal timeline with 5-minute precision
- Drag & drop rescheduling
- Right-edge resize handle
- Overlap stacking with `+N` overflow badge
- Light & dark themes
- Sticky time header and staff column
- Full TypeScript support
- Callback props for backend integration

---

## License

MIT © [Mohammad Saquib Khan](https://github.com/geekysaquib)

---

## Author

**Mohammad Saquib Khan**
- GitHub: [@geekysaquib](https://github.com/geekysaquib)
- npm: [schedulepro-calendar](https://www.npmjs.com/package/schedulepro-calendar)

> *Developed & Designed by Mohammad Saquib Khan*
