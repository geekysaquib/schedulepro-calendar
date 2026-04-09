/**
 * SchedulePro Calendar v1.0.0
 * Developed & Designed by Mohammad Saquib Khan
 * https://github.com/yourusername/schedulepro-calendar
 * @license MIT
 */
"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CELL_WIDTH: () => CELL_WIDTH,
  HOURS: () => HOURS,
  INITIAL_RESERVATIONS: () => INITIAL_RESERVATIONS,
  INITIAL_STAFF: () => INITIAL_STAFF,
  MINUTES: () => MINUTES,
  ROW_HEIGHT: () => ROW_HEIGHT,
  ReservationCalendar: () => ReservationCalendar,
  durationInCells: () => durationInCells,
  formatTime12h: () => formatTime12h,
  minutesToTime: () => minutesToTime,
  timeToMinutes: () => timeToMinutes,
  timeToX: () => timeToX,
  xToTime: () => xToTime
});
module.exports = __toCommonJS(index_exports);

// src/components/ReservationCalendar.tsx
var import_react5 = require("react");
var import_core3 = require("@dnd-kit/core");
var import_date_fns = require("date-fns");
var import_lucide_react5 = require("lucide-react");

// src/lib/initialData.ts
var INITIAL_STAFF = [
  { id: "s1", name: "Pratiksha Sharma", color: "#4f46e5", avatar_initials: "PS", role: "Senior Consultant" },
  { id: "s2", name: "Saquib Khan", color: "#d97706", avatar_initials: "SK", role: "Full Stack Engineer" },
  { id: "s3", name: "Aashish Singh", color: "#059669", avatar_initials: "AS", role: "Solutions Architect" },
  { id: "s4", name: "Ashok Chandan", color: "#dc2626", avatar_initials: "AC", role: "QA Lead" },
  { id: "s5", name: "Harshit Sharma", color: "#7c3aed", avatar_initials: "HS", role: "UI/UX Designer" },
  { id: "s6", name: "Ankit Maurya", color: "#0891b2", avatar_initials: "AM", role: "DevOps Engineer" }
];
var today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
function d(offset) {
  const dt = /* @__PURE__ */ new Date();
  dt.setDate(dt.getDate() + offset);
  return dt.toISOString().split("T")[0];
}
var INITIAL_RESERVATIONS = [
  // ══════════════════════════════════════
  //  TODAY  —  Pratiksha Sharma (s1)
  // ══════════════════════════════════════
  { id: "r001", staff_id: "s1", title: "Morning Briefing", description: "Daily team briefing", date: today, start_time: "08:00", end_time: "08:30", type: "reservation", color: "#6366f1" },
  { id: "r002", staff_id: "s1", title: "Client Consultation", description: "Initial meeting with new client", date: today, start_time: "09:00", end_time: "10:00", type: "reservation", color: "#6366f1" },
  // Overlap with r002 (stack test)
  { id: "r003", staff_id: "s1", title: "Sprint Planning", description: "Q4 sprint kick-off", date: today, start_time: "09:30", end_time: "10:30", type: "reservation", color: "#6366f1" },
  // Third overlap → overflow badge
  { id: "r004", staff_id: "s1", title: "Investor Call", description: "Seed round discussion", date: today, start_time: "09:45", end_time: "10:15", type: "reservation", color: "#6366f1" },
  { id: "r005", staff_id: "s1", title: "Lunch Break", description: "", date: today, start_time: "12:00", end_time: "13:00", type: "break", color: "#6366f1" },
  { id: "r006", staff_id: "s1", title: "UX Walkthrough", description: "Design review with product", date: today, start_time: "14:00", end_time: "15:00", type: "reservation", color: "#6366f1" },
  { id: "r007", staff_id: "s1", title: "Code Merge Review", description: "Final review before release", date: today, start_time: "15:30", end_time: "16:30", type: "reservation", color: "#6366f1" },
  { id: "r008", staff_id: "s1", title: "EOD Wrap-up", description: "", date: today, start_time: "17:30", end_time: "18:00", type: "reservation", color: "#6366f1" },
  // ══════════════════════════════════════
  //  TODAY  —  Saquib Khan (s2)
  // ══════════════════════════════════════
  { id: "r009", staff_id: "s2", title: "Client Call", description: "Weekly check-in", date: today, start_time: "08:30", end_time: "09:30", type: "reservation", color: "#f59e0b" },
  { id: "r010", staff_id: "s2", title: "Team Standup", description: "Daily sync", date: today, start_time: "09:30", end_time: "10:00", type: "reservation", color: "#f59e0b" },
  // Overlap with standup
  { id: "r011", staff_id: "s2", title: "Hotfix Review", description: "P1 bug review", date: today, start_time: "09:45", end_time: "10:30", type: "reservation", color: "#f59e0b" },
  { id: "r012", staff_id: "s2", title: "Break", description: "", date: today, start_time: "11:00", end_time: "11:15", type: "break", color: "#f59e0b" },
  { id: "r013", staff_id: "s2", title: "API Design Session", description: "REST vs GraphQL discussion", date: today, start_time: "11:30", end_time: "12:30", type: "reservation", color: "#f59e0b" },
  { id: "r014", staff_id: "s2", title: "Lunch", description: "", date: today, start_time: "13:00", end_time: "13:45", type: "break", color: "#f59e0b" },
  { id: "r015", staff_id: "s2", title: "Project Review", description: "Q3 review with stakeholders", date: today, start_time: "14:00", end_time: "15:30", type: "reservation", color: "#f59e0b" },
  // Overlap with project review
  { id: "r016", staff_id: "s2", title: "Deployment Check", description: "Prod deployment validation", date: today, start_time: "14:30", end_time: "15:00", type: "reservation", color: "#f59e0b" },
  { id: "r017", staff_id: "s2", title: "DB Optimisation", description: "Indexing & query plan review", date: today, start_time: "16:00", end_time: "17:00", type: "reservation", color: "#f59e0b" },
  // ══════════════════════════════════════
  //  TODAY  —  Aashish Singh (s3)
  // ══════════════════════════════════════
  { id: "r018", staff_id: "s3", title: "Morning Run Debrief", description: "", date: today, start_time: "08:00", end_time: "08:20", type: "break", color: "#10b981" },
  { id: "r019", staff_id: "s3", title: "Architecture Review", description: "Microservices discussion", date: today, start_time: "09:00", end_time: "10:30", type: "reservation", color: "#10b981" },
  { id: "r020", staff_id: "s3", title: "Code Review", description: "PR review session", date: today, start_time: "11:00", end_time: "12:00", type: "reservation", color: "#10b981" },
  // Overlap
  { id: "r021", staff_id: "s3", title: "Security Audit", description: "OWASP checklist review", date: today, start_time: "11:30", end_time: "12:30", type: "reservation", color: "#10b981" },
  { id: "r022", staff_id: "s3", title: "Lunch Break", description: "", date: today, start_time: "12:30", end_time: "13:30", type: "break", color: "#10b981" },
  { id: "r023", staff_id: "s3", title: "Infra Planning", description: "Azure migration roadmap", date: today, start_time: "14:00", end_time: "15:30", type: "reservation", color: "#10b981" },
  { id: "r024", staff_id: "s3", title: "CI/CD Workshop", description: "GitHub Actions setup", date: today, start_time: "16:00", end_time: "17:30", type: "reservation", color: "#10b981" },
  // Third overlap on morning → overflow badge
  { id: "r025", staff_id: "s3", title: "Vendor Meeting", description: "Cloud pricing negotiation", date: today, start_time: "11:15", end_time: "12:00", type: "reservation", color: "#10b981" },
  // ══════════════════════════════════════
  //  TODAY  —  Ashok Chandan (s4)
  // ══════════════════════════════════════
  { id: "r026", staff_id: "s4", title: "HR One-on-One", description: "Performance feedback", date: today, start_time: "08:30", end_time: "09:00", type: "reservation", color: "#ef4444" },
  { id: "r027", staff_id: "s4", title: "Training Session", description: "New hire onboarding", date: today, start_time: "10:00", end_time: "11:30", type: "reservation", color: "#ef4444" },
  // Overlap
  { id: "r028", staff_id: "s4", title: "QA Kickoff", description: "Test plan for v2.1", date: today, start_time: "10:30", end_time: "11:30", type: "reservation", color: "#ef4444" },
  { id: "r029", staff_id: "s4", title: "Break", description: "", date: today, start_time: "13:00", end_time: "13:30", type: "break", color: "#ef4444" },
  { id: "r030", staff_id: "s4", title: "Bug Triage", description: "Sprint backlog review", date: today, start_time: "14:00", end_time: "14:45", type: "reservation", color: "#ef4444" },
  { id: "r031", staff_id: "s4", title: "Release Notes", description: "Drafting v2.1 changelog", date: today, start_time: "15:00", end_time: "16:00", type: "reservation", color: "#ef4444" },
  { id: "r032", staff_id: "s4", title: "Retrospective", description: "Sprint 23 retro", date: today, start_time: "16:30", end_time: "17:30", type: "reservation", color: "#ef4444" },
  // Third overlap → overflow badge
  { id: "r033", staff_id: "s4", title: "Load Testing", description: "k6 performance tests", date: today, start_time: "10:15", end_time: "11:00", type: "reservation", color: "#ef4444" },
  // ══════════════════════════════════════
  //  TODAY  —  Harshit Sharma (s5)
  // ══════════════════════════════════════
  { id: "r034", staff_id: "s5", title: "Design Stand-up", description: "Figma review", date: today, start_time: "09:00", end_time: "09:30", type: "reservation", color: "#8b5cf6" },
  { id: "r035", staff_id: "s5", title: "Component Library", description: "Storybook update", date: today, start_time: "10:00", end_time: "11:30", type: "reservation", color: "#8b5cf6" },
  { id: "r036", staff_id: "s5", title: "Break", description: "", date: today, start_time: "11:30", end_time: "12:00", type: "break", color: "#8b5cf6" },
  { id: "r037", staff_id: "s5", title: "A/B Test Review", description: "Homepage variant analysis", date: today, start_time: "13:00", end_time: "14:00", type: "reservation", color: "#8b5cf6" },
  // Overlap
  { id: "r038", staff_id: "s5", title: "Motion Design", description: "Lottie animation review", date: today, start_time: "13:30", end_time: "14:30", type: "reservation", color: "#8b5cf6" },
  { id: "r039", staff_id: "s5", title: "Design Sync", description: "UI/UX review", date: today, start_time: "15:00", end_time: "16:00", type: "reservation", color: "#8b5cf6" },
  { id: "r040", staff_id: "s5", title: "Accessibility Audit", description: "WCAG 2.1 compliance", date: today, start_time: "16:30", end_time: "17:30", type: "reservation", color: "#8b5cf6" },
  // Third → overflow
  { id: "r041", staff_id: "s5", title: "Brand Guidelines", description: "Logo & color token review", date: today, start_time: "13:15", end_time: "14:00", type: "reservation", color: "#8b5cf6" },
  // ══════════════════════════════════════
  //  TODAY  —  Ankit Maurya (s6)
  // ══════════════════════════════════════
  { id: "r042", staff_id: "s6", title: "Client Call", description: "Weekly check-in", date: today, start_time: "08:30", end_time: "09:30", type: "reservation", color: "#06b6d4" },
  { id: "r043", staff_id: "s6", title: "Infra Standup", description: "DevOps sync", date: today, start_time: "09:30", end_time: "10:00", type: "reservation", color: "#06b6d4" },
  { id: "r044", staff_id: "s6", title: "K8s Migration", description: "Kubernetes cluster setup", date: today, start_time: "10:30", end_time: "12:00", type: "reservation", color: "#06b6d4" },
  { id: "r045", staff_id: "s6", title: "Lunch", description: "", date: today, start_time: "12:30", end_time: "13:15", type: "break", color: "#06b6d4" },
  // Overlap
  { id: "r046", staff_id: "s6", title: "Monitoring Review", description: "Grafana dashboard update", date: today, start_time: "10:45", end_time: "11:30", type: "reservation", color: "#06b6d4" },
  { id: "r047", staff_id: "s6", title: "Terraform Planning", description: "IaC module refactor", date: today, start_time: "14:00", end_time: "15:30", type: "reservation", color: "#06b6d4" },
  { id: "r048", staff_id: "s6", title: "Incident Review", description: "Post-mortem for P1 last week", date: today, start_time: "16:00", end_time: "17:00", type: "reservation", color: "#06b6d4" },
  // ══════════════════════════════════════
  //  YESTERDAY (d(-1))
  // ══════════════════════════════════════
  { id: "r049", staff_id: "s1", title: "Sprint Demo", description: "Sprint 22 demo", date: d(-1), start_time: "10:00", end_time: "11:30", type: "reservation", color: "#6366f1" },
  { id: "r050", staff_id: "s1", title: "Lunch", description: "", date: d(-1), start_time: "13:00", end_time: "14:00", type: "break", color: "#6366f1" },
  { id: "r051", staff_id: "s2", title: "Backend Review", description: "API endpoint audit", date: d(-1), start_time: "09:00", end_time: "10:30", type: "reservation", color: "#f59e0b" },
  { id: "r052", staff_id: "s2", title: "Break", description: "", date: d(-1), start_time: "12:00", end_time: "12:30", type: "break", color: "#f59e0b" },
  { id: "r053", staff_id: "s3", title: "Tech Interview", description: "Senior dev candidate", date: d(-1), start_time: "11:00", end_time: "12:00", type: "reservation", color: "#10b981" },
  { id: "r054", staff_id: "s4", title: "Test Automation", description: "Playwright setup", date: d(-1), start_time: "14:00", end_time: "15:30", type: "reservation", color: "#ef4444" },
  { id: "r055", staff_id: "s5", title: "Prototyping", description: "Mobile nav prototype", date: d(-1), start_time: "10:00", end_time: "12:00", type: "reservation", color: "#8b5cf6" },
  { id: "r056", staff_id: "s6", title: "Cost Review", description: "Cloud billing analysis", date: d(-1), start_time: "15:00", end_time: "16:00", type: "reservation", color: "#06b6d4" },
  { id: "r057", staff_id: "s1", title: "Planning", description: "Next sprint grooming", date: d(-1), start_time: "15:00", end_time: "16:00", type: "reservation", color: "#6366f1" },
  { id: "r058", staff_id: "s3", title: "Code Freeze Prep", description: "Branch cleanup", date: d(-1), start_time: "16:00", end_time: "17:00", type: "reservation", color: "#10b981" },
  { id: "r059", staff_id: "s5", title: "Icon Set Review", description: "New icon library", date: d(-1), start_time: "14:00", end_time: "15:00", type: "reservation", color: "#8b5cf6" },
  { id: "r060", staff_id: "s2", title: "Schema Migration", description: "Postgres v15 upgrade", date: d(-1), start_time: "14:30", end_time: "16:00", type: "reservation", color: "#f59e0b" },
  // ══════════════════════════════════════
  //  TOMORROW (d(1))
  // ══════════════════════════════════════
  { id: "r061", staff_id: "s1", title: "All Hands", description: "Company-wide meeting", date: d(1), start_time: "09:00", end_time: "10:00", type: "reservation", color: "#6366f1" },
  { id: "r062", staff_id: "s1", title: "Break", description: "", date: d(1), start_time: "12:00", end_time: "12:30", type: "break", color: "#6366f1" },
  { id: "r063", staff_id: "s2", title: "All Hands", description: "Company-wide meeting", date: d(1), start_time: "09:00", end_time: "10:00", type: "reservation", color: "#f59e0b" },
  { id: "r064", staff_id: "s3", title: "All Hands", description: "Company-wide meeting", date: d(1), start_time: "09:00", end_time: "10:00", type: "reservation", color: "#10b981" },
  { id: "r065", staff_id: "s4", title: "All Hands", description: "Company-wide meeting", date: d(1), start_time: "09:00", end_time: "10:00", type: "reservation", color: "#ef4444" },
  { id: "r066", staff_id: "s5", title: "All Hands", description: "Company-wide meeting", date: d(1), start_time: "09:00", end_time: "10:00", type: "reservation", color: "#8b5cf6" },
  { id: "r067", staff_id: "s6", title: "All Hands", description: "Company-wide meeting", date: d(1), start_time: "09:00", end_time: "10:00", type: "reservation", color: "#06b6d4" },
  { id: "r068", staff_id: "s2", title: "Release Planning", description: "v2.2 planning", date: d(1), start_time: "11:00", end_time: "12:00", type: "reservation", color: "#f59e0b" },
  { id: "r069", staff_id: "s3", title: "DB Backup Drill", description: "Disaster recovery test", date: d(1), start_time: "11:00", end_time: "12:30", type: "reservation", color: "#10b981" },
  { id: "r070", staff_id: "s4", title: "QA Sprint", description: "Manual test run", date: d(1), start_time: "10:30", end_time: "13:00", type: "reservation", color: "#ef4444" },
  { id: "r071", staff_id: "s5", title: "Design Handoff", description: "Dev-ready Figma specs", date: d(1), start_time: "11:00", end_time: "12:00", type: "reservation", color: "#8b5cf6" },
  { id: "r072", staff_id: "s6", title: "Pipeline Review", description: "CI build time optimisation", date: d(1), start_time: "10:00", end_time: "11:30", type: "reservation", color: "#06b6d4" },
  { id: "r073", staff_id: "s1", title: "Client Onboarding", description: "New enterprise client", date: d(1), start_time: "14:00", end_time: "15:30", type: "reservation", color: "#6366f1" },
  { id: "r074", staff_id: "s2", title: "Perf Profiling", description: "React render bottlenecks", date: d(1), start_time: "14:00", end_time: "15:00", type: "reservation", color: "#f59e0b" },
  // Overlap tomorrow
  { id: "r075", staff_id: "s2", title: "SEO Audit", description: "Core web vitals review", date: d(1), start_time: "14:30", end_time: "15:30", type: "reservation", color: "#f59e0b" },
  { id: "r076", staff_id: "s5", title: "Dark Mode QA", description: "Token verification", date: d(1), start_time: "14:00", end_time: "15:00", type: "reservation", color: "#8b5cf6" },
  { id: "r077", staff_id: "s6", title: "Log Aggregation", description: "ELK stack config", date: d(1), start_time: "13:00", end_time: "14:30", type: "reservation", color: "#06b6d4" },
  { id: "r078", staff_id: "s3", title: "Peer Review", description: "Cross-team code review", date: d(1), start_time: "14:00", end_time: "15:30", type: "reservation", color: "#10b981" },
  { id: "r079", staff_id: "s4", title: "Break", description: "", date: d(1), start_time: "13:00", end_time: "13:30", type: "break", color: "#ef4444" },
  { id: "r080", staff_id: "s1", title: "Break", description: "", date: d(1), start_time: "16:00", end_time: "16:15", type: "break", color: "#6366f1" },
  // ══════════════════════════════════════
  //  d(2)
  // ══════════════════════════════════════
  { id: "r081", staff_id: "s1", title: "Roadmap Review", description: "H1 roadmap update", date: d(2), start_time: "09:00", end_time: "10:30", type: "reservation", color: "#6366f1" },
  { id: "r082", staff_id: "s2", title: "GraphQL Migration", description: "REST to GQL phase 1", date: d(2), start_time: "10:00", end_time: "12:00", type: "reservation", color: "#f59e0b" },
  { id: "r083", staff_id: "s3", title: "Kafka Setup", description: "Event streaming POC", date: d(2), start_time: "09:00", end_time: "11:00", type: "reservation", color: "#10b981" },
  { id: "r084", staff_id: "s4", title: "Regression Suite", description: "Full regression run", date: d(2), start_time: "08:00", end_time: "10:00", type: "reservation", color: "#ef4444" },
  { id: "r085", staff_id: "s5", title: "Illustration Review", description: "Onboarding flow art", date: d(2), start_time: "10:00", end_time: "11:00", type: "reservation", color: "#8b5cf6" },
  { id: "r086", staff_id: "s6", title: "Secrets Rotation", description: "Vault token renewal", date: d(2), start_time: "09:00", end_time: "09:30", type: "reservation", color: "#06b6d4" },
  { id: "r087", staff_id: "s1", title: "Break", description: "", date: d(2), start_time: "12:00", end_time: "12:30", type: "break", color: "#6366f1" },
  { id: "r088", staff_id: "s2", title: "Break", description: "", date: d(2), start_time: "13:00", end_time: "13:30", type: "break", color: "#f59e0b" },
  { id: "r089", staff_id: "s3", title: "Lunch", description: "", date: d(2), start_time: "12:30", end_time: "13:00", type: "break", color: "#10b981" },
  { id: "r090", staff_id: "s4", title: "Smoke Tests", description: "Staging env check", date: d(2), start_time: "14:00", end_time: "15:00", type: "reservation", color: "#ef4444" },
  { id: "r091", staff_id: "s5", title: "Typography Audit", description: "Font scale review", date: d(2), start_time: "13:00", end_time: "14:00", type: "reservation", color: "#8b5cf6" },
  { id: "r092", staff_id: "s6", title: "Backup Verification", description: "S3 snapshot integrity", date: d(2), start_time: "11:00", end_time: "12:00", type: "reservation", color: "#06b6d4" },
  { id: "r093", staff_id: "s1", title: "Sales Handoff", description: "CRM update meeting", date: d(2), start_time: "15:00", end_time: "16:00", type: "reservation", color: "#6366f1" },
  { id: "r094", staff_id: "s2", title: "Type Safety", description: "Strict TS migration", date: d(2), start_time: "15:00", end_time: "16:30", type: "reservation", color: "#f59e0b" },
  { id: "r095", staff_id: "s3", title: "Chaos Engineering", description: "Fault injection tests", date: d(2), start_time: "14:00", end_time: "15:30", type: "reservation", color: "#10b981" },
  // ══════════════════════════════════════
  //  d(3) & d(-2)
  // ══════════════════════════════════════
  { id: "r096", staff_id: "s1", title: "OKR Review", description: "Q4 OKR alignment", date: d(3), start_time: "09:00", end_time: "10:00", type: "reservation", color: "#6366f1" },
  { id: "r097", staff_id: "s2", title: "Cache Strategy", description: "Redis tier review", date: d(3), start_time: "10:00", end_time: "11:00", type: "reservation", color: "#f59e0b" },
  { id: "r098", staff_id: "s3", title: "Service Mesh", description: "Istio config review", date: d(3), start_time: "09:30", end_time: "11:00", type: "reservation", color: "#10b981" },
  { id: "r099", staff_id: "s4", title: "End-to-End Tests", description: "Cypress suite update", date: d(3), start_time: "11:00", end_time: "13:00", type: "reservation", color: "#ef4444" },
  { id: "r100", staff_id: "s5", title: "Color System", description: "Dark/light token audit", date: d(3), start_time: "10:00", end_time: "11:30", type: "reservation", color: "#8b5cf6" },
  { id: "r101", staff_id: "s6", title: "Network Policy", description: "K8s ingress rules", date: d(3), start_time: "09:00", end_time: "10:30", type: "reservation", color: "#06b6d4" },
  { id: "r102", staff_id: "s1", title: "Hiring Interview", description: "Sr. Frontend candidate", date: d(3), start_time: "14:00", end_time: "15:00", type: "reservation", color: "#6366f1" },
  { id: "r103", staff_id: "s2", title: "Break", description: "", date: d(3), start_time: "12:00", end_time: "12:30", type: "break", color: "#f59e0b" },
  { id: "r104", staff_id: "s5", title: "Responsive QA", description: "Mobile breakpoint checks", date: d(3), start_time: "13:00", end_time: "14:30", type: "reservation", color: "#8b5cf6" },
  { id: "r105", staff_id: "s6", title: "Lunch Break", description: "", date: d(3), start_time: "12:30", end_time: "13:00", type: "break", color: "#06b6d4" },
  { id: "r106", staff_id: "s1", title: "Sprint Kickoff", description: "Sprint 24 planning", date: d(-2), start_time: "09:00", end_time: "10:30", type: "reservation", color: "#6366f1" },
  { id: "r107", staff_id: "s3", title: "Docker Hardening", description: "Image vulnerability scan", date: d(-2), start_time: "10:00", end_time: "11:30", type: "reservation", color: "#10b981" },
  { id: "r108", staff_id: "s4", title: "Manual Testing", description: "Exploratory test session", date: d(-2), start_time: "13:00", end_time: "15:00", type: "reservation", color: "#ef4444" },
  { id: "r109", staff_id: "s5", title: "User Testing", description: "Session recording review", date: d(-2), start_time: "14:00", end_time: "15:30", type: "reservation", color: "#8b5cf6" },
  { id: "r110", staff_id: "s2", title: "Break", description: "", date: d(-2), start_time: "11:00", end_time: "11:15", type: "break", color: "#f59e0b" },
  { id: "r111", staff_id: "s6", title: "SLA Review", description: "Uptime & latency check", date: d(-2), start_time: "10:00", end_time: "11:00", type: "reservation", color: "#06b6d4" }
];

// src/lib/timeUtils.ts
var HOURS = Array.from({ length: 24 }, (_, i) => i);
var MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);
var CELL_WIDTH = 35;
var HOUR_WIDTH = CELL_WIDTH * 12;
var ROW_HEIGHT = 84;
function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}
function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
function timeToX(time) {
  const mins = timeToMinutes(time);
  return mins / 5 * CELL_WIDTH;
}
function xToTime(x) {
  const cells = Math.round(x / CELL_WIDTH);
  return minutesToTime(cells * 5);
}
function durationInCells(startTime, endTime) {
  const startMins = timeToMinutes(startTime);
  const endMins = timeToMinutes(endTime);
  return Math.max(1, (endMins - startMins) / 5);
}
function formatTime12h(time) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

// src/components/StaffRow.tsx
var import_react2 = require("react");
var import_react_dom2 = require("react-dom");
var import_core2 = require("@dnd-kit/core");

// src/components/ReservationBlock.tsx
var import_react = require("react");
var import_react_dom = require("react-dom");
var import_core = require("@dnd-kit/core");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
function blockColors(color, isBreak, isDark) {
  const { r, g, b } = hexToRgb(color);
  if (isDark) {
    const bg = `rgba(${r},${g},${b},0.22)`;
    const border = isBreak ? `rgba(${r},${g},${b},0.55)` : `rgba(${r},${g},${b},0.40)`;
    const title = `rgba(${Math.min(r + 100, 255)},${Math.min(g + 100, 255)},${Math.min(b + 100, 255)},1)`;
    const desc = `rgba(${Math.min(r + 80, 255)},${Math.min(g + 80, 255)},${Math.min(b + 80, 255)},0.72)`;
    return { bg, border, title, desc };
  } else {
    const bg = `rgba(${r},${g},${b},0.13)`;
    const border = isBreak ? `rgba(${r},${g},${b},0.55)` : `rgba(${r},${g},${b},0.40)`;
    const title = `rgb(${Math.max(r - 50, 0)},${Math.max(g - 50, 0)},${Math.max(b - 50, 0)})`;
    const desc = `rgba(${Math.max(r - 30, 0)},${Math.max(g - 30, 0)},${Math.max(b - 30, 0)},0.72)`;
    return { bg, border, title, desc };
  }
}
function BlockTooltip({ anchorEl, reservation, staffColor, displayEnd, onDelete, onClose }) {
  const tooltipRef = (0, import_react.useRef)(null);
  const [pos, setPos] = (0, import_react.useState)({ top: 0, left: 0 });
  const isBreak = reservation.type === "break";
  (0, import_react.useEffect)(() => {
    if (!anchorEl) return;
    const r = anchorEl.getBoundingClientRect();
    const tw = 210;
    const vw = window.innerWidth;
    const spaceBelow = window.innerHeight - r.bottom;
    const top = spaceBelow > 160 ? r.bottom + 6 : r.top - 150;
    let left = r.left;
    if (left + tw > vw - 12) left = vw - tw - 12;
    if (left < 8) left = 8;
    setPos({ top, left });
  }, [anchorEl]);
  (0, import_react.useEffect)(() => {
    const handler = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target) && anchorEl && !anchorEl.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, anchorEl]);
  if (typeof document === "undefined") return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref: tooltipRef,
        className: "reservation-tooltip",
        style: { position: "fixed", top: pos.top, left: pos.left, zIndex: 9999 },
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tooltip-header", style: { color: staffColor }, children: [
            isBreak ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Coffee, { size: 13 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Calendar, { size: 13 }),
            reservation.title
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tooltip-time", children: [
            formatTime12h(reservation.start_time),
            " \u2013 ",
            formatTime12h(displayEnd)
          ] }),
          reservation.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tooltip-desc", children: reservation.description }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "tooltip-delete", onClick: onDelete, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, { size: 12 }),
            " Delete event"
          ] })
        ]
      }
    ),
    document.body
  );
}
function ReservationBlock({
  reservation,
  staffColor,
  topOffset = 0,
  onDelete,
  onResize
}) {
  const [showTooltip, setShowTooltip] = (0, import_react.useState)(false);
  const [isResizing, setIsResizing] = (0, import_react.useState)(false);
  const [liveEndTime, setLiveEndTime] = (0, import_react.useState)(null);
  const [isDark, setIsDark] = (0, import_react.useState)(false);
  const blockRef = (0, import_react.useRef)(null);
  const resizeStartX = (0, import_react.useRef)(0);
  const resizeStartEndMins = (0, import_react.useRef)(0);
  (0, import_react.useEffect)(() => {
    const check = () => setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  const { attributes, listeners, setNodeRef, transform, isDragging } = (0, import_core.useDraggable)({
    id: reservation.id,
    data: { reservation },
    disabled: isResizing
  });
  const displayEnd = liveEndTime != null ? liveEndTime : reservation.end_time;
  const left = timeToX(reservation.start_time);
  const width = Math.max(durationInCells(reservation.start_time, displayEnd) * CELL_WIDTH - 2, CELL_WIDTH);
  const isBreak = reservation.type === "break";
  const colors = blockColors(staffColor, isBreak, isDark);
  const blockStyle = {
    left: `${left}px`,
    width: `${width}px`,
    top: `${topOffset}px`,
    height: "calc(50% - 4px)",
    background: colors.bg,
    borderColor: colors.border,
    borderStyle: isBreak ? "dashed" : "solid",
    borderWidth: isBreak ? "1.5px" : "1px",
    transform: !isResizing && transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : void 0,
    opacity: isDragging ? 0.45 : 1,
    zIndex: isDragging ? 1e3 : isResizing ? 100 : 10
  };
  const handleResizeMouseDown = (0, import_react.useCallback)((e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setShowTooltip(false);
    resizeStartX.current = e.clientX;
    resizeStartEndMins.current = timeToMinutes(reservation.end_time);
    const startMins = timeToMinutes(reservation.start_time);
    const onMove = (me) => {
      me.preventDefault();
      const dx = me.clientX - resizeStartX.current;
      const deltaCells = Math.round(dx / CELL_WIDTH);
      const newMins = Math.max(startMins + 5, resizeStartEndMins.current + deltaCells * 5);
      setLiveEndTime(minutesToTime(newMins));
    };
    const onUp = (me) => {
      const dx = me.clientX - resizeStartX.current;
      const deltaCells = Math.round(dx / CELL_WIDTH);
      const newMins = Math.max(startMins + 5, resizeStartEndMins.current + deltaCells * 5);
      onResize(reservation.id, minutesToTime(newMins));
      setLiveEndTime(null);
      setIsResizing(false);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [reservation.id, reservation.end_time, reservation.start_time, onResize]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref: blockRef,
        className: `reservation-block ${isResizing ? "resizing" : ""}`,
        style: blockStyle,
        onMouseEnter: () => !isResizing && !isDragging && setShowTooltip(true),
        onMouseLeave: () => setShowTooltip(false),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "block-accent-bar", style: { background: staffColor } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", __spreadProps(__spreadValues(__spreadValues({ ref: setNodeRef, className: "block-drag-zone" }, listeners), attributes), { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "block-inner", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "block-top-row", children: [
              isBreak ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Coffee, { size: 9, color: colors.title }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Calendar, { size: 9, color: colors.title }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block-title", style: { color: colors.title }, children: reservation.title })
            ] }),
            reservation.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block-desc", style: { color: colors.desc }, children: reservation.description })
          ] }) })),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "resize-handle", onMouseDown: handleResizeMouseDown, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "resize-grip" }) })
        ]
      }
    ),
    showTooltip && !isDragging && !isResizing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      BlockTooltip,
      {
        anchorEl: blockRef.current,
        reservation,
        staffColor,
        displayEnd,
        onDelete: () => {
          setShowTooltip(false);
          onDelete(reservation.id);
        },
        onClose: () => setShowTooltip(false)
      }
    )
  ] });
}

// src/components/StaffRow.tsx
var import_lucide_react2 = require("lucide-react");
var import_jsx_runtime2 = require("react/jsx-runtime");
function DroppableCell({ staffId, time }) {
  const { setNodeRef, isOver } = (0, import_core2.useDroppable)({
    id: `${staffId}__${time}`,
    data: { staffId, time }
  });
  const isHour = time.endsWith(":00");
  const isHalf = time.endsWith(":30");
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      ref: setNodeRef,
      className: `calendar-cell ${isOver ? "cell-over" : ""} ${isHour ? "cell-hour" : isHalf ? "cell-half" : "cell-five"}`,
      style: { width: `${CELL_WIDTH}px`, height: `${ROW_HEIGHT}px` }
    }
  );
}
function overlaps(a, b) {
  return timeToMinutes(a.start_time) < timeToMinutes(b.end_time) && timeToMinutes(b.start_time) < timeToMinutes(a.end_time);
}
function buildLayout(reservations) {
  const slot0 = [];
  const slot1 = [];
  const overflowMap = /* @__PURE__ */ new Map();
  for (const res of reservations) {
    const collidesSlot0 = slot0.some((r) => overlaps(r, res));
    const collidesSlot1 = slot1.some((r) => overlaps(r, res));
    if (!collidesSlot0) {
      slot0.push(res);
    } else if (!collidesSlot1) {
      slot1.push(res);
    } else {
      const overlappers = [...slot0, ...slot1].filter((r) => overlaps(r, res));
      const groupKey = overlappers.reduce(
        (min, r) => timeToMinutes(r.start_time) < timeToMinutes(min.start_time) ? r : min
      ).start_time;
      if (!overflowMap.has(groupKey)) overflowMap.set(groupKey, []);
      overflowMap.get(groupKey).push(res);
    }
  }
  const overflowGroups = [];
  overflowMap.forEach((extras, time) => {
    overflowGroups.push({ time, x: timeToX(time), extras });
  });
  return { slot0, slot1, overflowGroups };
}
function OverflowPopup({
  group,
  staffColor,
  anchorEl,
  onClose,
  onDelete
}) {
  const popupRef = (0, import_react2.useRef)(null);
  const [pos, setPos] = (0, import_react2.useState)({ top: 0, left: 0 });
  (0, import_react2.useEffect)(() => {
    if (!anchorEl) return;
    const rect = anchorEl.getBoundingClientRect();
    const popupWidth = 230;
    const viewportWidth = window.innerWidth;
    let left = rect.left;
    if (left + popupWidth > viewportWidth - 12) left = viewportWidth - popupWidth - 12;
    setPos({ top: rect.bottom + 6, left });
  }, [anchorEl]);
  (0, import_react2.useEffect)(() => {
    const handler = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target) && anchorEl && !anchorEl.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, anchorEl]);
  if (typeof document === "undefined") return null;
  return (0, import_react_dom2.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        ref: popupRef,
        className: "overflow-popup",
        style: { position: "fixed", top: pos.top, left: pos.left, zIndex: 9999 },
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "overflow-popup-header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
              "+",
              group.extras.length,
              " more at ",
              formatTime12h(group.time)
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react2.X, { size: 12 }) })
          ] }),
          group.extras.map((res) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "overflow-item", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "overflow-dot", style: { background: staffColor } }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "overflow-details", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "overflow-title", children: [
                res.type === "break" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react2.Coffee, { size: 11 }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react2.Calendar, { size: 11 }),
                res.title
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "overflow-time", children: [
                formatTime12h(res.start_time),
                " \u2013 ",
                formatTime12h(res.end_time)
              ] }),
              res.description && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "overflow-desc", children: res.description })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "overflow-delete", onClick: () => onDelete(res.id), children: "\xD7" })
          ] }, res.id))
        ]
      }
    ),
    document.body
  );
}
function StaffRow({
  staff,
  reservations,
  date,
  onCellClick,
  onDeleteReservation,
  onResizeReservation
}) {
  const [openOverflow, setOpenOverflow] = (0, import_react2.useState)(null);
  const badgeRefs = (0, import_react2.useRef)(/* @__PURE__ */ new Map());
  const handleCellClick = (e, time) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onCellClick(staff.id, time, e.clientX, rect.bottom + 4);
  };
  const { slot0, slot1, overflowGroups } = buildLayout(reservations);
  const ROW_HALF = Math.floor(ROW_HEIGHT / 2);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "staff-row", onClick: () => setOpenOverflow(null), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "staff-label", style: { borderLeft: `3px solid ${staff.color}20` }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "staff-avatar-ring", style: { background: `linear-gradient(135deg, ${staff.color}, ${staff.color}99)` }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "staff-avatar", style: { background: staff.color }, children: staff.avatar_initials }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "staff-info", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "staff-name", children: staff.name }),
        staff.role && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "staff-role", children: staff.role }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "staff-count", children: [
          reservations.filter((r) => r.type === "reservation").length,
          " appointments"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "row-timeline", style: { height: `${ROW_HEIGHT}px` }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "cells-layer", children: HOURS.map(
        (h) => MINUTES.map((m) => {
          const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { onClick: (e) => handleCellClick(e, time), style: { display: "contents" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DroppableCell, { staffId: staff.id, time }) }, time);
        })
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "blocks-layer", children: [
        slot0.map((res) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ReservationBlock,
          {
            reservation: res,
            staffColor: staff.color,
            topOffset: 2,
            onDelete: onDeleteReservation,
            onResize: onResizeReservation
          },
          res.id
        )),
        slot1.map((res) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ReservationBlock,
          {
            reservation: res,
            staffColor: staff.color,
            topOffset: ROW_HALF + 2,
            onDelete: onDeleteReservation,
            onResize: onResizeReservation
          },
          res.id
        )),
        overflowGroups.map((group) => {
          var _a;
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { position: "absolute", left: `${group.x}px`, top: 0, zIndex: 30, pointerEvents: "all" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              "button",
              {
                ref: (el) => {
                  if (el) badgeRefs.current.set(group.time, el);
                },
                className: "overflow-badge",
                style: { position: "relative", left: 0, top: "50%", transform: "translateY(-50%)", background: staff.color },
                onClick: (e) => {
                  e.stopPropagation();
                  setOpenOverflow(openOverflow === group.time ? null : group.time);
                },
                children: [
                  "+",
                  group.extras.length
                ]
              }
            ),
            openOverflow === group.time && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              OverflowPopup,
              {
                group,
                staffColor: staff.color,
                anchorEl: (_a = badgeRefs.current.get(group.time)) != null ? _a : null,
                onClose: () => setOpenOverflow(null),
                onDelete: (id) => {
                  onDeleteReservation(id);
                  setOpenOverflow(null);
                }
              }
            )
          ] }, group.time);
        })
      ] })
    ] })
  ] });
}

// src/components/TimeHeader.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function TimeHeader() {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "time-header-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "corner-spacer", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "corner-label", children: "Staff member" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "hour-labels", children: HOURS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "hour-block", style: { width: `${CELL_WIDTH * 12}px` }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "hour-label", children: h === 0 ? "12:00 AM" : h < 12 ? `${h}:00 AM` : h === 12 ? "12:00 PM" : `${h - 12}:00 PM` }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "minute-ticks", children: MINUTES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: `minute-tick ${m === 0 ? "major" : m === 30 ? "semi" : "minor"}`,
          style: { width: `${CELL_WIDTH}px` },
          children: m === 30 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "minute-label", children: ":30" })
        },
        m
      )) })
    ] }, h)) })
  ] });
}

// src/components/ContextMenu.tsx
var import_react3 = require("react");
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime4 = require("react/jsx-runtime");
function ContextMenu({
  x,
  y,
  time,
  staffName,
  onAddReservation,
  onAddBreak,
  onClose
}) {
  const ref = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);
  const adjustedX = Math.min(x, window.innerWidth - 220);
  const adjustedY = Math.min(y, window.innerHeight - 150);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      ref,
      className: "context-menu",
      style: { left: adjustedX, top: adjustedY },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "context-menu-header", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "context-staff", children: staffName }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "context-time", children: formatTime12h(time) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: "context-item reservation-item", onClick: onAddReservation, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.Calendar, { size: 14 }),
          "Add Reservation"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: "context-item break-item", onClick: onAddBreak, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.Coffee, { size: 14 }),
          "Add Break"
        ] })
      ]
    }
  );
}

// src/components/ReservationModal.tsx
var import_react4 = require("react");
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime5 = require("react/jsx-runtime");
function ReservationModal({
  staffId,
  staffList,
  date,
  startTime,
  type,
  onSave,
  onClose
}) {
  const defaultTitle = type === "break" ? "Break" : "";
  const defaultEnd = minutesToTime(timeToMinutes(startTime) + 60);
  const [title, setTitle] = (0, import_react4.useState)(defaultTitle);
  const [description, setDescription] = (0, import_react4.useState)("");
  const [endTime, setEndTime] = (0, import_react4.useState)(defaultEnd);
  const [selectedStaffId, setSelectedStaffId] = (0, import_react4.useState)(staffId);
  const selectedStaff = staffList.find((s) => s.id === selectedStaffId);
  const handleSubmit = () => {
    if (!title.trim()) return;
    onSave({
      staff_id: selectedStaffId,
      title: title.trim(),
      description: description.trim(),
      date,
      start_time: startTime,
      end_time: endTime,
      type,
      color: (selectedStaff == null ? void 0 : selectedStaff.color) || "#6366f1"
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "modal-overlay", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "modal", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "modal-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "modal-title-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "div",
          {
            className: "modal-type-badge",
            style: {
              background: type === "break" ? "#f59e0b22" : `${selectedStaff == null ? void 0 : selectedStaff.color}22`,
              color: type === "break" ? "#f59e0b" : selectedStaff == null ? void 0 : selectedStaff.color
            },
            children: type === "break" ? "\u2615 Break" : "\u{1F4C5} Reservation"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "modal-close", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react4.X, { size: 16 }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { className: "modal-heading", children: type === "break" ? "Add Break" : "New Reservation" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "modal-subheading", children: date })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "modal-body", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "form-group", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: "form-label", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react4.User, { size: 13 }),
          " Staff Member"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "staff-select-grid", children: staffList.map((s) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
          "button",
          {
            className: `staff-chip ${selectedStaffId === s.id ? "selected" : ""}`,
            style: selectedStaffId === s.id ? { background: s.color, borderColor: s.color } : { borderColor: s.color + "44" },
            onClick: () => setSelectedStaffId(s.id),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "span",
                {
                  className: "chip-avatar",
                  style: {
                    background: selectedStaffId === s.id ? "white" : s.color,
                    color: selectedStaffId === s.id ? s.color : "white"
                  },
                  children: s.avatar_initials
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "chip-name", children: s.name.split(" ")[0] })
            ]
          },
          s.id
        )) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "form-group", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: "form-label", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react4.Tag, { size: 13 }),
          " Title"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "input",
          {
            className: "form-input",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            placeholder: type === "break" ? "Break" : "e.g. Client Meeting",
            autoFocus: true,
            onKeyDown: (e) => e.key === "Enter" && handleSubmit()
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "form-group", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: "form-label", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react4.Clock, { size: 13 }),
          " Time"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "time-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "time-display", children: formatTime12h(startTime) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "time-arrow", children: "\u2192" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "input",
            {
              className: "form-input time-input",
              type: "time",
              value: endTime,
              onChange: (e) => setEndTime(e.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "form-group", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: "form-label", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react4.AlignLeft, { size: 13 }),
          " Description"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "textarea",
          {
            className: "form-input form-textarea",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            placeholder: "Optional notes...",
            rows: 3
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "modal-footer", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "btn-secondary", onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
        "button",
        {
          className: "btn-primary",
          style: { background: type === "break" ? "#f59e0b" : selectedStaff == null ? void 0 : selectedStaff.color },
          onClick: handleSubmit,
          disabled: !title.trim(),
          children: [
            "Add ",
            type === "break" ? "Break" : "Reservation"
          ]
        }
      )
    ] })
  ] }) });
}

// src/components/ReservationCalendar.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var nextId = 1e3;
function ReservationCalendar({
  staff: staffProp,
  initialReservations,
  defaultTheme = "light",
  onReservationCreate,
  onReservationDelete,
  onReservationMove,
  onReservationResize
}) {
  var _a, _b;
  const [theme, setTheme] = (0, import_react5.useState)(defaultTheme);
  const [date, setDate] = (0, import_react5.useState)(/* @__PURE__ */ new Date());
  const staffList = (staffProp == null ? void 0 : staffProp.length) ? staffProp : INITIAL_STAFF;
  const [reservations, setReservations] = (0, import_react5.useState)(
    initialReservations != null ? initialReservations : INITIAL_RESERVATIONS
  );
  const [contextMenu, setContextMenu] = (0, import_react5.useState)(null);
  const [modal, setModal] = (0, import_react5.useState)(null);
  const scrollRef = (0, import_react5.useRef)(null);
  const dateStr = (0, import_date_fns.format)(date, "yyyy-MM-dd");
  const displayDate = (0, import_date_fns.format)(date, "EEEE, d MMMM yyyy");
  const sensors = (0, import_core3.useSensors)((0, import_core3.useSensor)(import_core3.PointerSensor, { activationConstraint: { distance: 5 } }));
  (0, import_react5.useEffect)(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  (0, import_react5.useEffect)(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 8 * 12 * CELL_WIDTH;
  }, []);
  const handleCellClick = (staffId, time, x, y) => {
    setContextMenu({ x, y, staffId, time });
  };
  const openModal = (type) => {
    if (!contextMenu) return;
    setModal({ staffId: contextMenu.staffId, time: contextMenu.time, type });
    setContextMenu(null);
  };
  const handleSave = (data) => {
    const newRes = __spreadProps(__spreadValues({}, data), { id: `spc-${nextId++}` });
    setReservations((prev) => [...prev, newRes]);
    setModal(null);
    onReservationCreate == null ? void 0 : onReservationCreate(data);
  };
  const handleDelete = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
    onReservationDelete == null ? void 0 : onReservationDelete(id);
  };
  const handleResize = (id, newEndTime) => {
    setReservations((prev) => prev.map((r) => r.id === id ? __spreadProps(__spreadValues({}, r), { end_time: newEndTime }) : r));
    onReservationResize == null ? void 0 : onReservationResize(id, newEndTime);
  };
  const handleDragEnd = (event) => {
    var _a2, _b2;
    const { active, over } = event;
    if (!over) return;
    const reservation = (_a2 = active.data.current) == null ? void 0 : _a2.reservation;
    if (!reservation) return;
    const [targetStaffId, targetTime] = over.id.split("__");
    const durationMins = timeToMinutes(reservation.end_time) - timeToMinutes(reservation.start_time);
    const newEndTime = minutesToTime(timeToMinutes(targetTime) + durationMins);
    const targetStaff = staffList.find((s) => s.id === targetStaffId);
    const updated = __spreadProps(__spreadValues({}, reservation), {
      staff_id: targetStaffId,
      start_time: targetTime,
      end_time: newEndTime,
      color: (_b2 = targetStaff == null ? void 0 : targetStaff.color) != null ? _b2 : reservation.color
    });
    setReservations((prev) => prev.map((r) => r.id === reservation.id ? updated : r));
    onReservationMove == null ? void 0 : onReservationMove(updated);
  };
  const dayReservations = (staffId) => reservations.filter((r) => r.staff_id === staffId && r.date === dateStr);
  const totalReservations = reservations.filter((r) => r.date === dateStr && r.type === "reservation").length;
  const totalBreaks = reservations.filter((r) => r.date === dateStr && r.type === "break").length;
  const staffOnDuty = staffList.filter((s) => reservations.some((r) => r.staff_id === s.id && r.date === dateStr)).length;
  const utilisation = Math.round((totalReservations + totalBreaks) / Math.max(staffList.length * 16, 1) * 100);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "calendar-root", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("header", { className: "cal-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "cal-header-left", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "cal-logo", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("rect", { x: "1", y: "3", width: "14", height: "11", rx: "2.5", stroke: "currentColor", strokeWidth: "1.2" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M1 7h14", stroke: "currentColor", strokeWidth: "1.2" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M5 1v4M11 1v4", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("rect", { x: "3.5", y: "9.5", width: "3", height: "2", rx: "0.5", className: "cal-logo-icon-fill" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("rect", { x: "8.5", y: "9.5", width: "3", height: "2", rx: "0.5", className: "cal-logo-icon-fill", opacity: "0.5" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "cal-title", children: "SchedulePro" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "cal-enterprise-tag", children: "Enterprise" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "cal-nav", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { className: "nav-btn", onClick: () => setDate((d2) => (0, import_date_fns.subDays)(d2, 1)), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react5.ChevronLeft, { size: 14 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "nav-date", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "nav-date-text", children: displayDate }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { className: "nav-btn", onClick: () => setDate((d2) => (0, import_date_fns.addDays)(d2, 1)), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react5.ChevronRight, { size: 14 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { className: "nav-today", onClick: () => setDate(/* @__PURE__ */ new Date()), children: "Today" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "cal-header-right", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { className: "theme-toggle", onClick: () => setTheme((t) => t === "dark" ? "light" : "dark"), children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react5.Sun, { size: 12 }),
          " Light mode"
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react5.Moon, { size: 12 }),
          " Dark mode"
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { className: "new-reservation-btn", onClick: () => {
          if (staffList[0]) setModal({ staffId: staffList[0].id, time: "09:00", type: "reservation" });
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react5.Plus, { size: 12 }),
          " New Reservation"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "stats-bar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "stat-item", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "stat-dot", style: { background: "var(--stat-dot-res)" } }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "stat-values", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "stat-num", children: totalReservations }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "stat-label", children: "Reservations" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "stat-item", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "stat-dot", style: { background: "var(--stat-dot-brk)" } }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "stat-values", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "stat-num", children: totalBreaks }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "stat-label", children: "Breaks" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "stat-item", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "stat-dot", style: { background: "var(--stat-dot-stf)" } }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "stat-values", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "stat-num", children: staffOnDuty }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "stat-label", children: "Staff on duty" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "stat-item", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "stat-dot", style: { background: "var(--stat-dot-util)" } }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "stat-values", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "stat-num", children: [
            utilisation,
            "%"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "stat-label", children: "Utilisation" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "stat-hint", children: "Click any time slot to schedule \xA0\xB7\xA0 Drag events to reschedule" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_core3.DndContext, { sensors, onDragEnd: handleDragEnd, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "calendar-grid-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "scroll-container", ref: scrollRef, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(TimeHeader, {}),
      staffList.map((staff) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        StaffRow,
        {
          staff,
          reservations: dayReservations(staff.id),
          date: dateStr,
          onCellClick: handleCellClick,
          onDeleteReservation: handleDelete,
          onResizeReservation: handleResize
        },
        staff.id
      ))
    ] }) }) }),
    contextMenu && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      ContextMenu,
      {
        x: contextMenu.x,
        y: contextMenu.y,
        time: contextMenu.time,
        staffName: (_b = (_a = staffList.find((s) => s.id === contextMenu.staffId)) == null ? void 0 : _a.name) != null ? _b : "",
        onAddReservation: () => openModal("reservation"),
        onAddBreak: () => openModal("break"),
        onClose: () => setContextMenu(null)
      }
    ),
    modal && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      ReservationModal,
      {
        staffId: modal.staffId,
        staffList,
        date: dateStr,
        startTime: modal.time,
        type: modal.type,
        onSave: handleSave,
        onClose: () => setModal(null)
      }
    )
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CELL_WIDTH,
  HOURS,
  INITIAL_RESERVATIONS,
  INITIAL_STAFF,
  MINUTES,
  ROW_HEIGHT,
  ReservationCalendar,
  durationInCells,
  formatTime12h,
  minutesToTime,
  timeToMinutes,
  timeToX,
  xToTime
});
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
//# sourceMappingURL=index.js.map