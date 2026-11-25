import {
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  BookOpen,
  CalendarDays,
  GraduationCap,
  LogIn,
  ShieldAlert,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  bmsitDepartments,
  CAMPUS_ASSETS,
  campusCirculars,
  type CampusEvent,
  type PortalUser,
} from "../../data/bmsitData";
import { Panel } from "../ui/glassy-charts";

export type CollegeRoute = "home" | "login" | "profiles" | "courses" | "academics" | "events" | "shield";

export function CollegeHomeView({
  currentUser,
  shieldEnabled,
  events,
  registeredCredits,
  onNavigate,
  onInspectEvent,
}: {
  currentUser: PortalUser | null;
  shieldEnabled: boolean;
  events: CampusEvent[];
  registeredCredits: number;
  onNavigate: (route: CollegeRoute) => void;
  onInspectEvent: (event: CampusEvent) => void;
}) {
  const featuredEvents = events.filter((e) => e.featured && e.image).slice(0, 3);

  const gateways: {
    id: CollegeRoute;
    title: string;
    desc: string;
    cta: string;
    icon: typeof Users;
    highlight?: string;
  }[] = [
    {
      id: "profiles",
      title: "Student Profiles & Directory",
      desc: "Access USN records, academic standing, faculty mentors, hostel details, and protected student PII.",
      cta: "Open Directory",
      icon: Users,
      highlight: "5,140 synthetic records",
    },
    {
      id: "courses",
      title: "CBCS Course Registration",
      desc: "Enroll or drop Odd/Even 2026–27 Autonomous core subjects, AICTE IDEA Lab modules, and Open Electives.",
      cta: "Register Courses",
      icon: BookOpen,
      highlight: `${registeredCredits} / 24 credits active`,
    },
    {
      id: "academics",
      title: "Results, Attendance & Library",
      desc: "View CIE marks cards, subject-wise attendance eligibility, fee verification, and Central Library book loans.",
      cta: "View Academics",
      icon: BookMarked,
      highlight: "CIE-2 & Library live",
    },
    {
      id: "events",
      title: "Campus Event Calendar",
      desc: "Explore Utsaha 2026, AICTE IDEA Lab 24-Hr Sprint, BICEP Demo Day, and TEDxBMSITM at BSN Auditorium.",
      cta: "Browse Calendar",
      icon: CalendarDays,
      highlight: `${events.length} upcoming events`,
    },
    {
      id: "login",
      title: currentUser ? `Signed in: ${currentUser.usnOrId}` : "Student & Staff Portal Login",
      desc: "Unified BMSIT&M authentication for students and faculty with live SQLi & brute-force defense testing.",
      cta: currentUser ? "Switch Account" : "Sign In to Portal",
      icon: LogIn,
      highlight: currentUser ? currentUser.department : "Demo USN autofill ready",
    },
    {
      id: "shield",
      title: "Mission Portal Shield (AI Agent)",
      desc: "Simulate SQLi, XSS, Credential Stuffing, DDoS, and IDOR attacks and compare outcomes without vs. with AI defense.",
      cta: "Open Security Demo",
      icon: shieldEnabled ? ShieldCheck : ShieldAlert,
      highlight: shieldEnabled ? "AI Shield Active" : "Shield Paused — Vulnerable",
    },
  ];

  return (
    <div className="gd-analytics">
      <section className="gd-college-hero" data-gd-enter aria-label="BMSIT&M Bengaluru Campus Portal">
        <img
          src={CAMPUS_ASSETS.backdrop}
          alt="BMS Institute of Technology and Management campus in Yelahanka, Bengaluru"
          className="gd-college-hero-bg"
          referrerPolicy="no-referrer"
        />
        <div className="gd-college-hero-scrim" aria-hidden="true" />

        <div className="gd-college-hero-main">
          <div>
            <div className="gd-hero-kicker">
              Autonomous Institute under VTU · NAAC &apos;A&apos; Accredited · Doddaballapur Main Road, Yelahanka, Bengaluru
            </div>
            <h1>BMS Institute of Technology &amp; Management Campus Portal</h1>
            <p className="gd-college-hero-sub">
              Unified digital gateway for student profiles, Autonomous CBCS course registration, exam results, Central Library access, and campus events — continuously guarded by the Track 2 Mission Portal Shield AI agent.
            </p>
            <div className="gd-hero-cta-row">
              {currentUser ? (
                <button type="button" className="gd-hero-cta-light" onClick={() => onNavigate("academics")}>
                  <GraduationCap size={16} aria-hidden="true" />
                  My Student Workspace ({currentUser.usnOrId})
                </button>
              ) : (
                <button type="button" className="gd-hero-cta-light" onClick={() => onNavigate("login")}>
                  <LogIn size={16} aria-hidden="true" />
                  Student &amp; Staff Login
                </button>
              )}
              <button type="button" className="gd-hero-cta-glass" onClick={() => onNavigate("courses")}>
                Course Registration
                <ArrowRight size={15} aria-hidden="true" />
              </button>
              <button type="button" className="gd-hero-cta-glass" onClick={() => onNavigate("shield")}>
                {shieldEnabled ? <ShieldCheck size={15} aria-hidden="true" /> : <ShieldAlert size={15} aria-hidden="true" />}
                Test Portal Shield Demo
              </button>
            </div>
          </div>

          <div className="gd-hero-stats" aria-label="BMSIT institutional highlights">
            <div>
              <strong>5,140+</strong>
              UG &amp; PG Students
            </div>
            <div>
              <strong>9 Depts</strong>
              Engineering, MBA &amp; MCA
            </div>
            <div>
              <strong>BICEP &amp; IDEA Lab</strong>
              AICTE Innovation Campus
            </div>
            <div>
              <strong>{shieldEnabled ? "Protected" : "Unprotected"}</strong>
              Portal Shield AI Mode
            </div>
          </div>
        </div>

        <aside className="gd-college-hero-notices" aria-label="Latest BMSIT&M circulars and exam notices">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ fontSize: 13.5, fontWeight: 820 }}>Latest Campus Notices &amp; Circulars</strong>
            <button
              type="button"
              onClick={() => onNavigate("events")}
              style={{
                background: "transparent",
                border: 0,
                color: "#f3d7bd",
                fontSize: 11,
                fontWeight: 780,
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              Calendar <ArrowUpRight size={12} aria-hidden="true" />
            </button>
          </div>
          {campusCirculars.map((cir) => (
            <div key={cir.id} className="gd-notice-item">
              <div className="gd-notice-meta">
                {cir.date} · {cir.category}
              </div>
              <strong>{cir.title}</strong>
              <p>{cir.detail}</p>
            </div>
          ))}
        </aside>
      </section>

      <section aria-label="BMSIT&M Online Portals" data-gd-enter>
        <div className="gd-gateway-grid">
          {gateways.map(({ id, title, desc, cta, icon: Icon, highlight }) => (
            <button
              key={id}
              type="button"
              className="gd-gateway-card"
              onClick={() => onNavigate(id)}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="gd-list-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span style={{ fontSize: 10.5, color: "var(--gd-muted)", fontWeight: 740 }}>
                    {highlight}
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <div className="gd-gateway-foot">
                <span>{cta}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </section>

      <Panel
        title="Featured Campus Life & Events"
        subtitle="Highlights across BMSIT&M Yelahanka — click any event for full details or RSVP in the calendar"
        action={
          <button type="button" className="gd-secondary" onClick={() => onNavigate("events")}>
            Full Event Calendar <ArrowRight aria-hidden="true" />
          </button>
        }
      >
        <div className="gd-event-feature-grid">
          {featuredEvents.map((evt) => (
            <article key={evt.id} className="gd-event-photo-card">
              <div className="gd-event-media">
                {evt.image && (
                  <img
                    src={evt.image}
                    alt={`${evt.title} at ${evt.venue}`}
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="gd-event-scrim">
                  <small>
                    {evt.dayOfMonth} {evt.monthLabel} · {evt.venue}
                  </small>
                  <strong>{evt.title}</strong>
                </div>
              </div>
              <div className="gd-event-body">
                <p>{evt.summary}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10.5, color: "var(--gd-muted)" }}>
                    {evt.attendees} attending
                  </span>
                  <button
                    type="button"
                    className="gd-secondary"
                    onClick={() => onInspectEvent(evt)}
                  >
                    View Event
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <Panel
        title="Academic Departments & Innovation Centres"
        subtitle="Programs offered at BMS Institute of Technology & Management, Bengaluru"
      >
        <div className="gd-dept-grid">
          {bmsitDepartments.map((dept) => (
            <article key={dept.code} className="gd-dept-card">
              <span style={{ fontSize: 10, fontWeight: 820, color: "var(--gd-teal)" }}>
                {dept.code} · Intake {dept.intake}
              </span>
              <strong>{dept.name}</strong>
              <small>{dept.labs}</small>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
