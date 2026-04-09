import { Staff, Reservation } from './types'

export const INITIAL_STAFF: Staff[] = [
  { id: 's1', name: 'Pratiksha Sharma', color: '#4f46e5', avatar_initials: 'PS', role: 'Senior Consultant' },
  { id: 's2', name: 'Saquib Khan', color: '#d97706', avatar_initials: 'SK', role: 'Full Stack Engineer' },
  { id: 's3', name: 'Aashish Singh', color: '#059669', avatar_initials: 'AS', role: 'Solutions Architect' },
  { id: 's4', name: 'Ashok Chandan', color: '#dc2626', avatar_initials: 'AC', role: 'QA Lead' },
  { id: 's5', name: 'Harshit Sharma', color: '#7c3aed', avatar_initials: 'HS', role: 'UI/UX Designer' },
  { id: 's6', name: 'Ankit Maurya', color: '#0891b2', avatar_initials: 'AM', role: 'DevOps Engineer' },
]

const today = new Date().toISOString().split('T')[0]

// Helper to get date offset from today
function d(offset: number) {
  const dt = new Date()
  dt.setDate(dt.getDate() + offset)
  return dt.toISOString().split('T')[0]
}

export const INITIAL_RESERVATIONS: Reservation[] = [

  // ══════════════════════════════════════
  //  TODAY  —  Pratiksha Sharma (s1)
  // ══════════════════════════════════════
  { id: 'r001', staff_id: 's1', title: 'Morning Briefing',      description: 'Daily team briefing', date: today, start_time: '08:00', end_time: '08:30', type: 'reservation', color: '#6366f1' },
  { id: 'r002', staff_id: 's1', title: 'Client Consultation',   description: 'Initial meeting with new client', date: today, start_time: '09:00', end_time: '10:00', type: 'reservation', color: '#6366f1' },
  // Overlap with r002 (stack test)
  { id: 'r003', staff_id: 's1', title: 'Sprint Planning',       description: 'Q4 sprint kick-off', date: today, start_time: '09:30', end_time: '10:30', type: 'reservation', color: '#6366f1' },
  // Third overlap → overflow badge
  { id: 'r004', staff_id: 's1', title: 'Investor Call',         description: 'Seed round discussion', date: today, start_time: '09:45', end_time: '10:15', type: 'reservation', color: '#6366f1' },
  { id: 'r005', staff_id: 's1', title: 'Lunch Break',           description: '', date: today, start_time: '12:00', end_time: '13:00', type: 'break', color: '#6366f1' },
  { id: 'r006', staff_id: 's1', title: 'UX Walkthrough',        description: 'Design review with product', date: today, start_time: '14:00', end_time: '15:00', type: 'reservation', color: '#6366f1' },
  { id: 'r007', staff_id: 's1', title: 'Code Merge Review',     description: 'Final review before release', date: today, start_time: '15:30', end_time: '16:30', type: 'reservation', color: '#6366f1' },
  { id: 'r008', staff_id: 's1', title: 'EOD Wrap-up',           description: '', date: today, start_time: '17:30', end_time: '18:00', type: 'reservation', color: '#6366f1' },

  // ══════════════════════════════════════
  //  TODAY  —  Saquib Khan (s2)
  // ══════════════════════════════════════
  { id: 'r009', staff_id: 's2', title: 'Client Call',           description: 'Weekly check-in', date: today, start_time: '08:30', end_time: '09:30', type: 'reservation', color: '#f59e0b' },
  { id: 'r010', staff_id: 's2', title: 'Team Standup',          description: 'Daily sync', date: today, start_time: '09:30', end_time: '10:00', type: 'reservation', color: '#f59e0b' },
  // Overlap with standup
  { id: 'r011', staff_id: 's2', title: 'Hotfix Review',         description: 'P1 bug review', date: today, start_time: '09:45', end_time: '10:30', type: 'reservation', color: '#f59e0b' },
  { id: 'r012', staff_id: 's2', title: 'Break',                 description: '', date: today, start_time: '11:00', end_time: '11:15', type: 'break', color: '#f59e0b' },
  { id: 'r013', staff_id: 's2', title: 'API Design Session',    description: 'REST vs GraphQL discussion', date: today, start_time: '11:30', end_time: '12:30', type: 'reservation', color: '#f59e0b' },
  { id: 'r014', staff_id: 's2', title: 'Lunch',                 description: '', date: today, start_time: '13:00', end_time: '13:45', type: 'break', color: '#f59e0b' },
  { id: 'r015', staff_id: 's2', title: 'Project Review',        description: 'Q3 review with stakeholders', date: today, start_time: '14:00', end_time: '15:30', type: 'reservation', color: '#f59e0b' },
  // Overlap with project review
  { id: 'r016', staff_id: 's2', title: 'Deployment Check',      description: 'Prod deployment validation', date: today, start_time: '14:30', end_time: '15:00', type: 'reservation', color: '#f59e0b' },
  { id: 'r017', staff_id: 's2', title: 'DB Optimisation',       description: 'Indexing & query plan review', date: today, start_time: '16:00', end_time: '17:00', type: 'reservation', color: '#f59e0b' },

  // ══════════════════════════════════════
  //  TODAY  —  Aashish Singh (s3)
  // ══════════════════════════════════════
  { id: 'r018', staff_id: 's3', title: 'Morning Run Debrief',   description: '', date: today, start_time: '08:00', end_time: '08:20', type: 'break', color: '#10b981' },
  { id: 'r019', staff_id: 's3', title: 'Architecture Review',   description: 'Microservices discussion', date: today, start_time: '09:00', end_time: '10:30', type: 'reservation', color: '#10b981' },
  { id: 'r020', staff_id: 's3', title: 'Code Review',           description: 'PR review session', date: today, start_time: '11:00', end_time: '12:00', type: 'reservation', color: '#10b981' },
  // Overlap
  { id: 'r021', staff_id: 's3', title: 'Security Audit',        description: 'OWASP checklist review', date: today, start_time: '11:30', end_time: '12:30', type: 'reservation', color: '#10b981' },
  { id: 'r022', staff_id: 's3', title: 'Lunch Break',           description: '', date: today, start_time: '12:30', end_time: '13:30', type: 'break', color: '#10b981' },
  { id: 'r023', staff_id: 's3', title: 'Infra Planning',        description: 'Azure migration roadmap', date: today, start_time: '14:00', end_time: '15:30', type: 'reservation', color: '#10b981' },
  { id: 'r024', staff_id: 's3', title: 'CI/CD Workshop',        description: 'GitHub Actions setup', date: today, start_time: '16:00', end_time: '17:30', type: 'reservation', color: '#10b981' },
  // Third overlap on morning → overflow badge
  { id: 'r025', staff_id: 's3', title: 'Vendor Meeting',        description: 'Cloud pricing negotiation', date: today, start_time: '11:15', end_time: '12:00', type: 'reservation', color: '#10b981' },

  // ══════════════════════════════════════
  //  TODAY  —  Ashok Chandan (s4)
  // ══════════════════════════════════════
  { id: 'r026', staff_id: 's4', title: 'HR One-on-One',         description: 'Performance feedback', date: today, start_time: '08:30', end_time: '09:00', type: 'reservation', color: '#ef4444' },
  { id: 'r027', staff_id: 's4', title: 'Training Session',      description: 'New hire onboarding', date: today, start_time: '10:00', end_time: '11:30', type: 'reservation', color: '#ef4444' },
  // Overlap
  { id: 'r028', staff_id: 's4', title: 'QA Kickoff',            description: 'Test plan for v2.1', date: today, start_time: '10:30', end_time: '11:30', type: 'reservation', color: '#ef4444' },
  { id: 'r029', staff_id: 's4', title: 'Break',                 description: '', date: today, start_time: '13:00', end_time: '13:30', type: 'break', color: '#ef4444' },
  { id: 'r030', staff_id: 's4', title: 'Bug Triage',            description: 'Sprint backlog review', date: today, start_time: '14:00', end_time: '14:45', type: 'reservation', color: '#ef4444' },
  { id: 'r031', staff_id: 's4', title: 'Release Notes',         description: 'Drafting v2.1 changelog', date: today, start_time: '15:00', end_time: '16:00', type: 'reservation', color: '#ef4444' },
  { id: 'r032', staff_id: 's4', title: 'Retrospective',         description: 'Sprint 23 retro', date: today, start_time: '16:30', end_time: '17:30', type: 'reservation', color: '#ef4444' },
  // Third overlap → overflow badge
  { id: 'r033', staff_id: 's4', title: 'Load Testing',          description: 'k6 performance tests', date: today, start_time: '10:15', end_time: '11:00', type: 'reservation', color: '#ef4444' },

  // ══════════════════════════════════════
  //  TODAY  —  Harshit Sharma (s5)
  // ══════════════════════════════════════
  { id: 'r034', staff_id: 's5', title: 'Design Stand-up',       description: 'Figma review', date: today, start_time: '09:00', end_time: '09:30', type: 'reservation', color: '#8b5cf6' },
  { id: 'r035', staff_id: 's5', title: 'Component Library',     description: 'Storybook update', date: today, start_time: '10:00', end_time: '11:30', type: 'reservation', color: '#8b5cf6' },
  { id: 'r036', staff_id: 's5', title: 'Break',                 description: '', date: today, start_time: '11:30', end_time: '12:00', type: 'break', color: '#8b5cf6' },
  { id: 'r037', staff_id: 's5', title: 'A/B Test Review',       description: 'Homepage variant analysis', date: today, start_time: '13:00', end_time: '14:00', type: 'reservation', color: '#8b5cf6' },
  // Overlap
  { id: 'r038', staff_id: 's5', title: 'Motion Design',         description: 'Lottie animation review', date: today, start_time: '13:30', end_time: '14:30', type: 'reservation', color: '#8b5cf6' },
  { id: 'r039', staff_id: 's5', title: 'Design Sync',           description: 'UI/UX review', date: today, start_time: '15:00', end_time: '16:00', type: 'reservation', color: '#8b5cf6' },
  { id: 'r040', staff_id: 's5', title: 'Accessibility Audit',   description: 'WCAG 2.1 compliance', date: today, start_time: '16:30', end_time: '17:30', type: 'reservation', color: '#8b5cf6' },
  // Third → overflow
  { id: 'r041', staff_id: 's5', title: 'Brand Guidelines',      description: 'Logo & color token review', date: today, start_time: '13:15', end_time: '14:00', type: 'reservation', color: '#8b5cf6' },

  // ══════════════════════════════════════
  //  TODAY  —  Ankit Maurya (s6)
  // ══════════════════════════════════════
  { id: 'r042', staff_id: 's6', title: 'Client Call',           description: 'Weekly check-in', date: today, start_time: '08:30', end_time: '09:30', type: 'reservation', color: '#06b6d4' },
  { id: 'r043', staff_id: 's6', title: 'Infra Standup',         description: 'DevOps sync', date: today, start_time: '09:30', end_time: '10:00', type: 'reservation', color: '#06b6d4' },
  { id: 'r044', staff_id: 's6', title: 'K8s Migration',         description: 'Kubernetes cluster setup', date: today, start_time: '10:30', end_time: '12:00', type: 'reservation', color: '#06b6d4' },
  { id: 'r045', staff_id: 's6', title: 'Lunch',                 description: '', date: today, start_time: '12:30', end_time: '13:15', type: 'break', color: '#06b6d4' },
  // Overlap
  { id: 'r046', staff_id: 's6', title: 'Monitoring Review',     description: 'Grafana dashboard update', date: today, start_time: '10:45', end_time: '11:30', type: 'reservation', color: '#06b6d4' },
  { id: 'r047', staff_id: 's6', title: 'Terraform Planning',    description: 'IaC module refactor', date: today, start_time: '14:00', end_time: '15:30', type: 'reservation', color: '#06b6d4' },
  { id: 'r048', staff_id: 's6', title: 'Incident Review',       description: 'Post-mortem for P1 last week', date: today, start_time: '16:00', end_time: '17:00', type: 'reservation', color: '#06b6d4' },

  // ══════════════════════════════════════
  //  YESTERDAY (d(-1))
  // ══════════════════════════════════════
  { id: 'r049', staff_id: 's1', title: 'Sprint Demo',           description: 'Sprint 22 demo', date: d(-1), start_time: '10:00', end_time: '11:30', type: 'reservation', color: '#6366f1' },
  { id: 'r050', staff_id: 's1', title: 'Lunch',                 description: '', date: d(-1), start_time: '13:00', end_time: '14:00', type: 'break', color: '#6366f1' },
  { id: 'r051', staff_id: 's2', title: 'Backend Review',        description: 'API endpoint audit', date: d(-1), start_time: '09:00', end_time: '10:30', type: 'reservation', color: '#f59e0b' },
  { id: 'r052', staff_id: 's2', title: 'Break',                 description: '', date: d(-1), start_time: '12:00', end_time: '12:30', type: 'break', color: '#f59e0b' },
  { id: 'r053', staff_id: 's3', title: 'Tech Interview',        description: 'Senior dev candidate', date: d(-1), start_time: '11:00', end_time: '12:00', type: 'reservation', color: '#10b981' },
  { id: 'r054', staff_id: 's4', title: 'Test Automation',       description: 'Playwright setup', date: d(-1), start_time: '14:00', end_time: '15:30', type: 'reservation', color: '#ef4444' },
  { id: 'r055', staff_id: 's5', title: 'Prototyping',           description: 'Mobile nav prototype', date: d(-1), start_time: '10:00', end_time: '12:00', type: 'reservation', color: '#8b5cf6' },
  { id: 'r056', staff_id: 's6', title: 'Cost Review',           description: 'Cloud billing analysis', date: d(-1), start_time: '15:00', end_time: '16:00', type: 'reservation', color: '#06b6d4' },
  { id: 'r057', staff_id: 's1', title: 'Planning',              description: 'Next sprint grooming', date: d(-1), start_time: '15:00', end_time: '16:00', type: 'reservation', color: '#6366f1' },
  { id: 'r058', staff_id: 's3', title: 'Code Freeze Prep',      description: 'Branch cleanup', date: d(-1), start_time: '16:00', end_time: '17:00', type: 'reservation', color: '#10b981' },
  { id: 'r059', staff_id: 's5', title: 'Icon Set Review',       description: 'New icon library', date: d(-1), start_time: '14:00', end_time: '15:00', type: 'reservation', color: '#8b5cf6' },
  { id: 'r060', staff_id: 's2', title: 'Schema Migration',      description: 'Postgres v15 upgrade', date: d(-1), start_time: '14:30', end_time: '16:00', type: 'reservation', color: '#f59e0b' },

  // ══════════════════════════════════════
  //  TOMORROW (d(1))
  // ══════════════════════════════════════
  { id: 'r061', staff_id: 's1', title: 'All Hands',             description: 'Company-wide meeting', date: d(1), start_time: '09:00', end_time: '10:00', type: 'reservation', color: '#6366f1' },
  { id: 'r062', staff_id: 's1', title: 'Break',                 description: '', date: d(1), start_time: '12:00', end_time: '12:30', type: 'break', color: '#6366f1' },
  { id: 'r063', staff_id: 's2', title: 'All Hands',             description: 'Company-wide meeting', date: d(1), start_time: '09:00', end_time: '10:00', type: 'reservation', color: '#f59e0b' },
  { id: 'r064', staff_id: 's3', title: 'All Hands',             description: 'Company-wide meeting', date: d(1), start_time: '09:00', end_time: '10:00', type: 'reservation', color: '#10b981' },
  { id: 'r065', staff_id: 's4', title: 'All Hands',             description: 'Company-wide meeting', date: d(1), start_time: '09:00', end_time: '10:00', type: 'reservation', color: '#ef4444' },
  { id: 'r066', staff_id: 's5', title: 'All Hands',             description: 'Company-wide meeting', date: d(1), start_time: '09:00', end_time: '10:00', type: 'reservation', color: '#8b5cf6' },
  { id: 'r067', staff_id: 's6', title: 'All Hands',             description: 'Company-wide meeting', date: d(1), start_time: '09:00', end_time: '10:00', type: 'reservation', color: '#06b6d4' },
  { id: 'r068', staff_id: 's2', title: 'Release Planning',      description: 'v2.2 planning', date: d(1), start_time: '11:00', end_time: '12:00', type: 'reservation', color: '#f59e0b' },
  { id: 'r069', staff_id: 's3', title: 'DB Backup Drill',       description: 'Disaster recovery test', date: d(1), start_time: '11:00', end_time: '12:30', type: 'reservation', color: '#10b981' },
  { id: 'r070', staff_id: 's4', title: 'QA Sprint',             description: 'Manual test run', date: d(1), start_time: '10:30', end_time: '13:00', type: 'reservation', color: '#ef4444' },
  { id: 'r071', staff_id: 's5', title: 'Design Handoff',        description: 'Dev-ready Figma specs', date: d(1), start_time: '11:00', end_time: '12:00', type: 'reservation', color: '#8b5cf6' },
  { id: 'r072', staff_id: 's6', title: 'Pipeline Review',       description: 'CI build time optimisation', date: d(1), start_time: '10:00', end_time: '11:30', type: 'reservation', color: '#06b6d4' },
  { id: 'r073', staff_id: 's1', title: 'Client Onboarding',     description: 'New enterprise client', date: d(1), start_time: '14:00', end_time: '15:30', type: 'reservation', color: '#6366f1' },
  { id: 'r074', staff_id: 's2', title: 'Perf Profiling',        description: 'React render bottlenecks', date: d(1), start_time: '14:00', end_time: '15:00', type: 'reservation', color: '#f59e0b' },
  // Overlap tomorrow
  { id: 'r075', staff_id: 's2', title: 'SEO Audit',             description: 'Core web vitals review', date: d(1), start_time: '14:30', end_time: '15:30', type: 'reservation', color: '#f59e0b' },
  { id: 'r076', staff_id: 's5', title: 'Dark Mode QA',          description: 'Token verification', date: d(1), start_time: '14:00', end_time: '15:00', type: 'reservation', color: '#8b5cf6' },
  { id: 'r077', staff_id: 's6', title: 'Log Aggregation',       description: 'ELK stack config', date: d(1), start_time: '13:00', end_time: '14:30', type: 'reservation', color: '#06b6d4' },
  { id: 'r078', staff_id: 's3', title: 'Peer Review',           description: 'Cross-team code review', date: d(1), start_time: '14:00', end_time: '15:30', type: 'reservation', color: '#10b981' },
  { id: 'r079', staff_id: 's4', title: 'Break',                 description: '', date: d(1), start_time: '13:00', end_time: '13:30', type: 'break', color: '#ef4444' },
  { id: 'r080', staff_id: 's1', title: 'Break',                 description: '', date: d(1), start_time: '16:00', end_time: '16:15', type: 'break', color: '#6366f1' },

  // ══════════════════════════════════════
  //  d(2)
  // ══════════════════════════════════════
  { id: 'r081', staff_id: 's1', title: 'Roadmap Review',        description: 'H1 roadmap update', date: d(2), start_time: '09:00', end_time: '10:30', type: 'reservation', color: '#6366f1' },
  { id: 'r082', staff_id: 's2', title: 'GraphQL Migration',     description: 'REST to GQL phase 1', date: d(2), start_time: '10:00', end_time: '12:00', type: 'reservation', color: '#f59e0b' },
  { id: 'r083', staff_id: 's3', title: 'Kafka Setup',           description: 'Event streaming POC', date: d(2), start_time: '09:00', end_time: '11:00', type: 'reservation', color: '#10b981' },
  { id: 'r084', staff_id: 's4', title: 'Regression Suite',      description: 'Full regression run', date: d(2), start_time: '08:00', end_time: '10:00', type: 'reservation', color: '#ef4444' },
  { id: 'r085', staff_id: 's5', title: 'Illustration Review',   description: 'Onboarding flow art', date: d(2), start_time: '10:00', end_time: '11:00', type: 'reservation', color: '#8b5cf6' },
  { id: 'r086', staff_id: 's6', title: 'Secrets Rotation',      description: 'Vault token renewal', date: d(2), start_time: '09:00', end_time: '09:30', type: 'reservation', color: '#06b6d4' },
  { id: 'r087', staff_id: 's1', title: 'Break',                 description: '', date: d(2), start_time: '12:00', end_time: '12:30', type: 'break', color: '#6366f1' },
  { id: 'r088', staff_id: 's2', title: 'Break',                 description: '', date: d(2), start_time: '13:00', end_time: '13:30', type: 'break', color: '#f59e0b' },
  { id: 'r089', staff_id: 's3', title: 'Lunch',                 description: '', date: d(2), start_time: '12:30', end_time: '13:00', type: 'break', color: '#10b981' },
  { id: 'r090', staff_id: 's4', title: 'Smoke Tests',           description: 'Staging env check', date: d(2), start_time: '14:00', end_time: '15:00', type: 'reservation', color: '#ef4444' },
  { id: 'r091', staff_id: 's5', title: 'Typography Audit',      description: 'Font scale review', date: d(2), start_time: '13:00', end_time: '14:00', type: 'reservation', color: '#8b5cf6' },
  { id: 'r092', staff_id: 's6', title: 'Backup Verification',   description: 'S3 snapshot integrity', date: d(2), start_time: '11:00', end_time: '12:00', type: 'reservation', color: '#06b6d4' },
  { id: 'r093', staff_id: 's1', title: 'Sales Handoff',         description: 'CRM update meeting', date: d(2), start_time: '15:00', end_time: '16:00', type: 'reservation', color: '#6366f1' },
  { id: 'r094', staff_id: 's2', title: 'Type Safety',           description: 'Strict TS migration', date: d(2), start_time: '15:00', end_time: '16:30', type: 'reservation', color: '#f59e0b' },
  { id: 'r095', staff_id: 's3', title: 'Chaos Engineering',     description: 'Fault injection tests', date: d(2), start_time: '14:00', end_time: '15:30', type: 'reservation', color: '#10b981' },

  // ══════════════════════════════════════
  //  d(3) & d(-2)
  // ══════════════════════════════════════
  { id: 'r096', staff_id: 's1', title: 'OKR Review',            description: 'Q4 OKR alignment', date: d(3), start_time: '09:00', end_time: '10:00', type: 'reservation', color: '#6366f1' },
  { id: 'r097', staff_id: 's2', title: 'Cache Strategy',        description: 'Redis tier review', date: d(3), start_time: '10:00', end_time: '11:00', type: 'reservation', color: '#f59e0b' },
  { id: 'r098', staff_id: 's3', title: 'Service Mesh',          description: 'Istio config review', date: d(3), start_time: '09:30', end_time: '11:00', type: 'reservation', color: '#10b981' },
  { id: 'r099', staff_id: 's4', title: 'End-to-End Tests',      description: 'Cypress suite update', date: d(3), start_time: '11:00', end_time: '13:00', type: 'reservation', color: '#ef4444' },
  { id: 'r100', staff_id: 's5', title: 'Color System',          description: 'Dark/light token audit', date: d(3), start_time: '10:00', end_time: '11:30', type: 'reservation', color: '#8b5cf6' },
  { id: 'r101', staff_id: 's6', title: 'Network Policy',        description: 'K8s ingress rules', date: d(3), start_time: '09:00', end_time: '10:30', type: 'reservation', color: '#06b6d4' },
  { id: 'r102', staff_id: 's1', title: 'Hiring Interview',      description: 'Sr. Frontend candidate', date: d(3), start_time: '14:00', end_time: '15:00', type: 'reservation', color: '#6366f1' },
  { id: 'r103', staff_id: 's2', title: 'Break',                 description: '', date: d(3), start_time: '12:00', end_time: '12:30', type: 'break', color: '#f59e0b' },
  { id: 'r104', staff_id: 's5', title: 'Responsive QA',         description: 'Mobile breakpoint checks', date: d(3), start_time: '13:00', end_time: '14:30', type: 'reservation', color: '#8b5cf6' },
  { id: 'r105', staff_id: 's6', title: 'Lunch Break',           description: '', date: d(3), start_time: '12:30', end_time: '13:00', type: 'break', color: '#06b6d4' },
  { id: 'r106', staff_id: 's1', title: 'Sprint Kickoff',        description: 'Sprint 24 planning', date: d(-2), start_time: '09:00', end_time: '10:30', type: 'reservation', color: '#6366f1' },
  { id: 'r107', staff_id: 's3', title: 'Docker Hardening',      description: 'Image vulnerability scan', date: d(-2), start_time: '10:00', end_time: '11:30', type: 'reservation', color: '#10b981' },
  { id: 'r108', staff_id: 's4', title: 'Manual Testing',        description: 'Exploratory test session', date: d(-2), start_time: '13:00', end_time: '15:00', type: 'reservation', color: '#ef4444' },
  { id: 'r109', staff_id: 's5', title: 'User Testing',          description: 'Session recording review', date: d(-2), start_time: '14:00', end_time: '15:30', type: 'reservation', color: '#8b5cf6' },
  { id: 'r110', staff_id: 's2', title: 'Break',                 description: '', date: d(-2), start_time: '11:00', end_time: '11:15', type: 'break', color: '#f59e0b' },
  { id: 'r111', staff_id: 's6', title: 'SLA Review',            description: 'Uptime & latency check', date: d(-2), start_time: '10:00', end_time: '11:00', type: 'reservation', color: '#06b6d4' },
]
