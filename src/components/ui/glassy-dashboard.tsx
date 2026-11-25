import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookMarked,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Home,
  LogIn,
  Moon,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sun,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "@fontsource-variable/manrope";

import {
  CAMPUS_ASSETS,
  initialCourses,
  initialEvents,
  initialLibraryBooks,
  initialPortalActivity,
  initialStudents,
  periods,
  type AttackScenario,
  type CampusEvent,
  type LibraryBook,
  type Period,
  type PortalActivityLog,
  type PortalUser,
  type StudentRecord,
} from "../../data/bmsitData";
import { portalDashboardStyles } from "../../styles/portalStyles";
import { formatCount, StatusText, type CountFormat } from "./glassy-charts";
import { CollegeHomeView, type CollegeRoute } from "../portal/CollegeHomeView";
import { PortalLoginView } from "../portal/PortalLoginView";
import { AcademicsLibraryView } from "../portal/AcademicsLibraryView";
import { StudentProfilesView } from "../portal/StudentProfilesView";
import { CourseRegistrationView } from "../portal/CourseRegistrationView";
import { EventCalendarView } from "../portal/EventCalendarView";
import { PortalShieldView, type SimulationRunRecord } from "../portal/PortalShieldView";

export interface GlassyDashboardProps {
  backgroundImage?: string;
  workspaceName?: string;
  panelFrost?: number;
  initialTheme?: "light" | "dark";
}

gsap.registerPlugin(useGSAP);

const views = [
  {
    id: "home",
    label: "Campus Home",
    short: "Home",
    icon: Home,
    description:
      "BMS Institute of Technology & Management, Yelahanka, Bengaluru — official-style campus portal with synthetic data.",
    prompt: "Search BMSIT&M notices, student USNs, courses, or events...",
  },
  {
    id: "profiles",
    label: "Student Profiles",
    short: "Profiles",
    icon: Users,
    description:
      "Synthetic BMSIT&M student directory with USNs, CGPA standings, attendance records, and faculty mentor assignments.",
    prompt: "Look up a USN (e.g. 1BY22CS041) or department profile...",
  },
  {
    id: "courses",
    label: "Course Registration",
    short: "Courses",
    icon: BookOpen,
    description:
      "Autonomous CBCS semester course registration with live seat tracking, prerequisites, and 24-credit allowance.",
    prompt: "Register or drop 2026–27 Autonomous CBCS courses...",
  },
  {
    id: "academics",
    label: "Results & Library",
    short: "Results",
    icon: BookMarked,
    description:
      "Autonomous CIE marks card, subject-wise attendance eligibility, and Central Library book lending portal.",
    prompt: "Check CIE marks, attendance eligibility, or borrow library books...",
  },
  {
    id: "events",
    label: "Event Calendar",
    short: "Events",
    icon: CalendarDays,
    description:
      "Upcoming BMSIT&M campus events including Utsaha 2026, AICTE IDEA Lab sprints, BICEP Demo Day, and TEDxBMSITM.",
    prompt: "Explore November–December 2026 campus events & RSVP...",
  },
  {
    id: "shield",
    label: "Portal Shield AI",
    short: "Shield",
    icon: ShieldCheck,
    description:
      "Track 2 Mission Portal Shield — simulate real web attacks on this college portal and compare outcomes without vs. with the AI agent.",
    prompt: "Simulate SQLi, XSS, DDoS, or Credential Stuffing attacks...",
  },
] as const;

const allRoutes: CollegeRoute[] = ["home", "login", "profiles", "courses", "academics", "events", "shield"];

function routeFromHash(): CollegeRoute {
  if (typeof location === "undefined") return "home";
  const id = location.hash.slice(1);
  return allRoutes.find((r) => r === id) ?? "home";
}

function saveCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function useNavigationReducedMotion(motion: boolean) {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    update();
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced || !motion;
}

function Dock({
  active,
  side = false,
  select,
}: {
  active: CollegeRoute;
  side?: boolean;
  select: (view: CollegeRoute) => void;
}) {
  const nav = useRef<HTMLElement>(null);
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = nav.current;
    const indicator = marker.current;
    if (!container || !indicator) return;
    const adjust = () => {
      const current = container.querySelector<HTMLElement>('[aria-current="page"]');
      if (!current) {
        indicator.style.visibility = "hidden";
        return;
      }
      indicator.style.width = `${current.offsetWidth}px`;
      indicator.style.height = `${current.offsetHeight}px`;
      indicator.style.transform = `translate(${current.offsetLeft}px, ${current.offsetTop}px)`;
      indicator.style.visibility = "visible";
      indicator.dataset.ready = "true";
    };
    const observer = new ResizeObserver(adjust);
    observer.observe(container);
    container.querySelectorAll("a").forEach((link) => observer.observe(link));
    adjust();
    return () => observer.disconnect();
  }, [active]);

  const onSelect = (event: MouseEvent<HTMLAnchorElement>, id: CollegeRoute) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    select(id);
  };

  return (
    <nav
      ref={nav}
      className={side ? "gd-dock gd-dock-side" : "gd-dock gd-dock-bottom"}
      aria-label={side ? "Campus portal shortcuts" : "Campus portal navigation"}
    >
      <span ref={marker} className="gd-dock-indicator" aria-hidden="true" />
      {views.map(({ id, label, short, icon: Icon }) => (
        <a
          href={`#${id}`}
          key={id}
          aria-label={label}
          aria-current={active === id ? "page" : undefined}
          onClick={(event) => onSelect(event, id)}
        >
          <Icon aria-hidden="true" />
          <span className="gd-dock-text" aria-hidden="true">
            {label}
          </span>
          <span className="gd-dock-short" aria-hidden="true">
            {short}
          </span>
          {side && (
            <span className="gd-dock-tip" aria-hidden="true">
              {label}
            </span>
          )}
        </a>
      ))}
    </nav>
  );
}

function Dialog({
  title,
  children,
  close,
}: {
  title: string;
  children: ReactNode;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const label = useId();
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    dialog?.querySelector("input")?.focus();
  }, []);
  return (
    <dialog
      className="gd-dialog"
      ref={ref}
      aria-labelledby={label}
      onClose={close}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <section className="gd-dialog-inner">
        <header>
          <h2 id={label}>{title}</h2>
          <button
            type="button"
            className="gd-icon-button"
            aria-label="Close dialog"
            onClick={() => ref.current?.close()}
          >
            <X aria-hidden="true" />
          </button>
        </header>
        {children}
      </section>
    </dialog>
  );
}

function QuickActions({
  workspaceName,
  students,
  select,
  inspectStudent,
  close,
}: {
  workspaceName: string;
  students: StudentRecord[];
  select: (view: CollegeRoute) => void;
  inspectStudent: (student: StudentRecord) => void;
  close: () => void;
}) {
  const [query, setQuery] = useState("");
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const matchingViews = views.filter((view) =>
    terms.every((term) => `${view.label} ${view.description} ${view.prompt}`.toLowerCase().includes(term))
  );
  const matchingStudents = terms.length
    ? students
        .filter((s) =>
          terms.every((term) => `${s.usn} ${s.name} ${s.department}`.toLowerCase().includes(term))
        )
        .slice(0, 4)
    : [];

  return (
    <Dialog title={`Search ${workspaceName} Portal`} close={close}>
      <label className="gd-search gd-command-input">
        <Search aria-hidden="true" />
        <input
          type="search"
          aria-label="Search portal sections or student USNs"
          placeholder="Jump to Login, Courses, Events, or USN (e.g. 1BY22CS041)"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="gd-quick-list">
        <button
          type="button"
          onClick={() => {
            close();
            select("login");
          }}
        >
          <LogIn aria-hidden="true" />
          <div>
            <strong>Student &amp; Staff Portal Login</strong>
            <small>Sign in with synthetic BMSIT&amp;M USN or test SQLi login defense</small>
          </div>
          <ChevronRight aria-hidden="true" />
        </button>
        {matchingViews.map(({ label, id, description, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              close();
              select(id);
            }}
          >
            <Icon aria-hidden="true" />
            <div>
              <strong>{label}</strong>
              <small>{description}</small>
            </div>
            <ChevronRight aria-hidden="true" />
          </button>
        ))}
        {matchingStudents.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              close();
              select("profiles");
              inspectStudent(s);
            }}
          >
            <Users aria-hidden="true" />
            <div>
              <strong>
                {s.usn} · {s.name}
              </strong>
              <small>
                {s.department} Sem {s.semester} · CGPA {s.cgpa.toFixed(2)} · {s.attendance}% Attendance
              </small>
            </div>
            <ChevronRight aria-hidden="true" />
          </button>
        ))}
        {matchingViews.length === 0 && matchingStudents.length === 0 && (
          <p className="gd-empty" role="status">
            No matching portal sections or student USNs.
          </p>
        )}
      </div>
    </Dialog>
  );
}

type ModalState =
  | "search"
  | "notifications"
  | { kind: "student"; student: StudentRecord }
  | { kind: "event"; event: CampusEvent }
  | null;

export function GlassyDashboard({
  backgroundImage = CAMPUS_ASSETS.backdrop,
  workspaceName = "BMSIT&M",
  panelFrost = 14,
  initialTheme = "light",
}: GlassyDashboardProps = {}) {
  const [view, setView] = useState<CollegeRoute>(routeFromHash);
  const [active, setActive] = useState<CollegeRoute>(view);
  const [period, setPeriod] = useState<Period>("30 days");
  const [theme, setTheme] = useState(initialTheme);
  useEffect(() => setTheme(initialTheme), [initialTheme]);

  const [modal, setModal] = useState<ModalState>(null);
  const [readNotices, setReadNotices] = useState(false);

  // Authenticated College Portal User State
  const [currentUser, setCurrentUser] = useState<PortalUser | null>(null);

  // Interactive BMSIT&M Portal State
  const [students] = useState(initialStudents);
  const [courses, setCourses] = useState(initialCourses);
  const [events, setEvents] = useState(initialEvents);
  const [books, setBooks] = useState<LibraryBook[]>(initialLibraryBooks);
  const [activityLogs, setActivityLogs] = useState<PortalActivityLog[]>(initialPortalActivity);

  // Track 2: Mission Portal Shield State
  const [shieldEnabled, setShieldEnabled] = useState(true);
  const [activeBreach, setActiveBreach] = useState<AttackScenario | null>(null);
  const [simulationHistory, setSimulationHistory] = useState<SimulationRunRecord[]>([]);

  const root = useRef<HTMLDivElement>(null);
  const scrollArea = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const pending = useRef<CollegeRoute>(view);
  const exit = useRef<gsap.core.Tween | null>(null);
  const reduced = useNavigationReducedMotion(true);
  const { contextSafe } = useGSAP({ scope: root });

  const changeView = contextSafe((next: CollegeRoute) => {
    if (pending.current === next) return;
    pending.current = next;
    setActive(next);
    exit.current?.kill();
    if (reduced || !content.current) {
      setView(next);
      return;
    }
    if (next === view) {
      exit.current = gsap.to(content.current, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.16,
        clearProps: "opacity,filter",
      });
      return;
    }
    exit.current = gsap.to(content.current, {
      opacity: 0,
      filter: "blur(6px)",
      duration: 0.13,
      ease: "power1.in",
      onComplete: () => setView(next),
    });
  });

  function selectView(next: CollegeRoute) {
    if (location.hash !== `#${next}`) history.pushState(null, "", `#${next}`);
    changeView(next);
  }

  useEffect(() => {
    const restore = () => changeView(routeFromHash());
    addEventListener("popstate", restore);
    addEventListener("hashchange", restore);
    return () => {
      removeEventListener("popstate", restore);
      removeEventListener("hashchange", restore);
    };
  }, [changeView]);

  useEffect(() => {
    scrollArea.current?.scrollTo({ top: 0 });
  }, [view]);

  useGSAP(
    () => {
      const layer = content.current;
      if (!layer) return;
      const counts = layer.querySelectorAll<HTMLElement>("[data-gd-count]");
      gsap.set(layer, { clearProps: "opacity,filter" });
      if (reduced) {
        counts.forEach((el) => {
          const fmt = formatCount[el.dataset.format as CountFormat];
          if (fmt) el.textContent = fmt(Number(el.dataset.gdCount));
        });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        layer,
        { opacity: 0.65, filter: "blur(4px)" },
        { opacity: 1, filter: "blur(0px)", clearProps: "opacity,filter", duration: 0.28 },
        0
      );
      tl.from(
        "[data-gd-enter]",
        { y: 14, opacity: 0, stagger: 0.04, duration: 0.44, clearProps: "transform,opacity" },
        0.03
      );
      const bars = layer.querySelectorAll(".gd-stack-bar");
      const line = layer.querySelector(".gd-line-reveal");
      const ring = layer.querySelector(".gd-donut-draw");
      const meters = layer.querySelectorAll(".gd-fill");
      if (bars.length) tl.from(bars, { scaleY: 0, stagger: 0.03, duration: 0.42, clearProps: "transform" }, 0.14);
      if (line)
        tl.fromTo(
          line,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.68, clearProps: "clipPath" },
          0.12
        );
      if (ring)
        tl.fromTo(
          ring,
          { attr: { "stroke-dasharray": "0 100" } },
          { attr: { "stroke-dasharray": "100 0" }, duration: 0.7 },
          0.14
        );
      if (meters.length)
        tl.from(meters, { scaleX: 0, duration: 0.52, stagger: 0.04, clearProps: "transform" }, 0.16);
      counts.forEach((el, index) => {
        const value = Number(el.dataset.gdCount);
        const format = formatCount[el.dataset.format as CountFormat];
        if (!format) return;
        const counter = { value: 0 };
        tl.to(
          counter,
          {
            value,
            duration: 0.68,
            onUpdate: () => {
              el.textContent = format(counter.value);
            },
          },
          0.08 + index * 0.02
        );
      });
    },
    { scope: content, dependencies: [view, period, reduced], revertOnUpdate: true }
  );

  const nowTime = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  const handleToggleCourse = (code: string) => {
    let actionText = "";
    setCourses((prev) =>
      prev.map((c) => {
        if (c.code !== code) return c;
        const nextReg = !c.registered;
        actionText = nextReg
          ? `Registered for ${c.code} (${c.title})`
          : `Dropped course ${c.code} (${c.title})`;
        return {
          ...c,
          registered: nextReg,
          enrolled: nextReg ? c.enrolled + 1 : Math.max(0, c.enrolled - 1),
        };
      })
    );
    if (actionText) {
      setActivityLogs((prev) => [
        {
          id: `LOG-${Date.now()}`,
          event: actionText,
          portal: "Course Portal",
          actor: currentUser?.usnOrId ?? "1BY22CS041",
          status: "Verified",
          time: nowTime(),
        },
        ...prev,
      ]);
    }
  };

  const handleToggleRsvp = (id: string) => {
    let eventLog = "";
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== id) return evt;
        const nextRsvp = !evt.rsvped;
        eventLog = nextRsvp
          ? `RSVP confirmed for ${evt.title}`
          : `RSVP canceled for ${evt.title}`;
        return {
          ...evt,
          rsvped: nextRsvp,
          attendees: nextRsvp ? evt.attendees + 1 : Math.max(0, evt.attendees - 1),
        };
      })
    );
    if (eventLog) {
      setActivityLogs((prev) => [
        {
          id: `LOG-${Date.now()}`,
          event: eventLog,
          portal: "Event Calendar",
          actor: currentUser?.usnOrId ?? "1BY22CS041",
          status: "Verified",
          time: nowTime(),
        },
        ...prev,
      ]);
    }
  };

  const handleToggleBorrowBook = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== bookId) return b;
        const borrowing = b.status === "Available";
        return {
          ...b,
          status: borrowing ? "Borrowed" : "Available",
          dueDate: borrowing ? "12 Dec 2026" : undefined,
        };
      })
    );
  };

  const handleToggleShield = (enabled: boolean) => {
    setShieldEnabled(enabled);
    if (enabled) {
      setActiveBreach(null);
    }
    setActivityLogs((prev) => [
      {
        id: `LOG-${Date.now()}`,
        event: enabled
          ? "Portal Shield AI Defense Agent enabled across all endpoints"
          : "Portal Shield AI Defense Agent paused (Demo Unprotected Mode)",
        portal: "Portal Shield",
        actor: currentUser?.usnOrId ?? "Security Admin",
        status: enabled ? "Verified" : "Needs review",
        time: nowTime(),
      },
      ...prev,
    ]);
  };

  const handleSimulationExecuted = (scenario: AttackScenario, protectedMode: boolean) => {
    const time = nowTime();
    if (protectedMode) {
      setActiveBreach(null);
    } else {
      setActiveBreach(scenario);
    }

    setReadNotices(false);

    setSimulationHistory((prev) => [
      {
        id: `SIM-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        attackId: scenario.id,
        attackName: scenario.shortLabel,
        targetPortal: scenario.targetPortal,
        shieldActive: protectedMode,
        recordsExposed: protectedMode
          ? scenario.withAgent.recordsExposed
          : scenario.withoutAgent.recordsExposed,
        responseLabel: protectedMode
          ? `${scenario.withAgent.responseMs} ms (Auto-Blocked)`
          : scenario.withoutAgent.downtimeLabel,
        outcome: protectedMode
          ? scenario.withAgent.outcomeHeadline
          : scenario.withoutAgent.outcomeHeadline,
        timestamp: time,
      },
      ...prev,
    ]);

    setActivityLogs((prev) => [
      {
        id: `LOG-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        event: protectedMode
          ? `AI Agent blocked ${scenario.shortLabel} (${scenario.withAgent.responseMs}ms)`
          : `BREACH: ${scenario.shortLabel} exposed ${scenario.withoutAgent.recordsExposed} records`,
        portal: scenario.targetPortal,
        actor: scenario.attackerIp,
        status: protectedMode ? "Blocked" : "Compromised",
        time,
      },
      ...prev,
    ]);
  };

  const handleLoginSuccess = (user: PortalUser) => {
    setCurrentUser(user);
    setActivityLogs((prev) => [
      {
        id: `LOG-${Date.now()}`,
        event: `${user.role === "faculty" ? "Faculty" : "Student"} authenticated (${user.name})`,
        portal: "Unified Auth",
        actor: user.usnOrId,
        status: "Verified",
        time: nowTime(),
      },
      ...prev,
    ]);
    selectView("academics");
  };

  const handleExportCsv = () => {
    if (view === "profiles") {
      saveCsv("bmsit-student-profiles-synthetic.csv", [
        ["USN", "Name", "Department", "Semester", "CGPA", "Attendance (%)", "Mentor", "Standing"],
        ...students.map((s) => [
          s.usn,
          s.name,
          s.department,
          s.semester,
          s.cgpa,
          s.attendance,
          s.mentor,
          s.standing,
        ]),
      ]);
    } else if (view === "courses") {
      saveCsv("bmsit-course-registration.csv", [
        ["Code", "Title", "Department", "Credits", "Faculty", "Schedule", "Enrolled", "Status"],
        ...courses.map((c) => [
          c.code,
          c.title,
          c.department,
          c.credits,
          c.faculty,
          c.schedule,
          `${c.enrolled}/${c.capacity}`,
          c.registered ? "Registered" : "Available",
        ]),
      ]);
    } else if (view === "events") {
      saveCsv("bmsit-campus-events-2026.csv", [
        ["Date", "Event", "Category", "Venue", "Time", "Attendees", "RSVP"],
        ...events.map((e) => [
          e.date,
          e.title,
          e.category,
          e.venue,
          e.time,
          `${e.attendees}/${e.capacity}`,
          e.rsvped ? "Going" : "Not Registered",
        ]),
      ]);
    } else if (view === "academics") {
      saveCsv("bmsit-library-and-results.csv", [
        ["Book ID", "Title", "Author", "Shelf", "Status", "Due Date"],
        ...books.map((b) => [b.id, b.title, b.author, b.shelf, b.status, b.dueDate ?? "—"]),
      ]);
    } else {
      saveCsv("bmsit-portal-shield-report.csv", [
        ["Attack", "Target Portal", "Agent Mode", "Records Exposed", "Response", "Outcome", "Time"],
        ...simulationHistory.map((r) => [
          r.attackName,
          r.targetPortal,
          r.shieldActive ? "Protected (AI ON)" : "Unprotected (AI OFF)",
          r.recordsExposed,
          r.responseLabel,
          r.outcome,
          r.timestamp,
        ]),
      ]);
    }
  };

  const activeStudentRecord =
    students.find((s) => currentUser && s.usn.toLowerCase() === currentUser.usnOrId.toLowerCase()) ??
    students[0];

  const currentMeta =
    view === "login"
      ? {
          label: "Student & Faculty Portal Login",
          description:
            "Unified BMSIT&M Bengaluru authentication gateway with live Track 2 SQL Injection & Brute-Force security testing.",
        }
      : (views.find((item) => item.id === view) ?? views[0]);

  const registeredCredits = courses
    .filter((c) => c.registered)
    .reduce((sum, c) => sum + c.credits, 0);
  const alertNotices = activityLogs
    .filter((l) => l.status === "Blocked" || l.status === "Compromised" || l.status === "Needs review")
    .slice(0, 6);

  const close = () => setModal(null);

  return (
    <div
      className="gd-app"
      data-theme={theme}
      data-breach={Boolean(activeBreach && !shieldEnabled)}
      ref={root}
      style={{ "--gd-panel-frost": `${Math.max(0, Math.min(36, panelFrost))}px` } as CSSProperties}
    >
      <style>{portalDashboardStyles}</style>
      <img
        className="gd-background"
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
      />

      <div className="gd-surround">
        <header className="gd-top gd-top-portal">
          <a
            href="#home"
            className="gd-brand"
            onClick={(e) => {
              e.preventDefault();
              selectView("home");
            }}
          >
            <span className="gd-logo" aria-hidden="true">
              BMS
            </span>
            <div>
              <strong>{workspaceName}</strong>
              <small>Bengaluru · Autonomous Campus Portal</small>
            </div>
          </a>

          <nav className="gd-nav-links" aria-label="Primary college portal navigation">
            {views.map(({ id, short }) => (
              <button
                key={id}
                type="button"
                aria-current={active === id ? "page" : undefined}
                onClick={() => selectView(id)}
              >
                {short}
              </button>
            ))}
          </nav>

          <div className="gd-top-actions">
            <button
              type="button"
              className="gd-icon-button"
              aria-label="Search BMSIT&M portal"
              title="Search portal & student USNs"
              onClick={() => setModal("search")}
            >
              <Search aria-hidden="true" />
            </button>
            <button
              type="button"
              className="gd-shield-switch"
              data-active={shieldEnabled}
              title="Toggle Track 2 Portal Shield AI Defense Agent"
              onClick={() => handleToggleShield(!shieldEnabled)}
            >
              {shieldEnabled ? <ShieldCheck aria-hidden="true" /> : <ShieldAlert aria-hidden="true" />}
              <span>{shieldEnabled ? "Shield ON" : "Shield OFF"}</span>
            </button>
            <button
              title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
              type="button"
              className="gd-icon-button"
              aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
            </button>
            <button
              type="button"
              className="gd-icon-button gd-notices"
              aria-label="Portal security and campus alerts"
              onClick={() => {
                setReadNotices(true);
                setModal("notifications");
              }}
            >
              <Bell aria-hidden="true" />
              {!readNotices && alertNotices.length > 0 && <i aria-hidden="true" />}
            </button>
            <button
              type="button"
              className="gd-user-pill"
              onClick={() => selectView("login")}
            >
              {currentUser ? <UserCheck size={14} aria-hidden="true" /> : <LogIn size={14} aria-hidden="true" />}
              <span>{currentUser ? currentUser.usnOrId : "Portal Login"}</span>
            </button>
          </div>
        </header>

        <div className="gd-stage-wrap">
          <Dock active={active} side select={selectView} />

          <main className="gd-stage">
            <div className="gd-stage-scroll" ref={scrollArea}>
              {activeBreach && !shieldEnabled && (
                <div className="gd-breach-strip" role="alert">
                  <div className="gd-breach-strip-left">
                    <AlertTriangle aria-hidden="true" />
                    <span>
                      <strong>Simulated Unprotected Breach Active:</strong> {activeBreach.name} —{" "}
                      {activeBreach.withoutAgent.outcomeHeadline} (
                      {activeBreach.withoutAgent.recordsExposed.toLocaleString()} records affected).
                    </span>
                  </div>
                  <button
                    type="button"
                    className="gd-teal-btn"
                    onClick={() => handleToggleShield(true)}
                  >
                    <ShieldCheck aria-hidden="true" />
                    Activate AI Shield &amp; Restore
                  </button>
                </div>
              )}

              {view !== "home" && (
                <header className="gd-view-head">
                  <div>
                    <h1>{currentMeta.label}</h1>
                    <p>{currentMeta.description}</p>
                  </div>
                  <div className="gd-view-actions">
                    {view === "profiles" && (
                      <div className="gd-period" role="group" aria-label="Reporting period">
                        {periods.map((item) => (
                          <button
                            type="button"
                            key={item}
                            aria-pressed={item === period}
                            onClick={() => setPeriod(item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                    {view !== "login" && (
                      <button type="button" className="gd-primary gd-export" onClick={handleExportCsv}>
                        <ArrowDownToLine aria-hidden="true" />
                        Export CSV
                      </button>
                    )}
                  </div>
                </header>
              )}

              <div className="gd-content" ref={content} key={view} data-view={view}>
                {view === "home" && (
                  <CollegeHomeView
                    currentUser={currentUser}
                    shieldEnabled={shieldEnabled}
                    events={events}
                    registeredCredits={registeredCredits}
                    onNavigate={selectView}
                    onInspectEvent={(event) => setModal({ kind: "event", event })}
                  />
                )}
                {view === "login" && (
                  <PortalLoginView
                    currentUser={currentUser}
                    shieldEnabled={shieldEnabled}
                    onToggleShield={handleToggleShield}
                    onLoginSuccess={handleLoginSuccess}
                    onLogout={() => setCurrentUser(null)}
                    onTriggerLoginAttack={handleSimulationExecuted}
                  />
                )}
                {view === "profiles" && (
                  <StudentProfilesView
                    students={students}
                    period={period}
                    shieldEnabled={shieldEnabled}
                    onInspectStudent={(student) => setModal({ kind: "student", student })}
                  />
                )}
                {view === "courses" && (
                  <CourseRegistrationView
                    courses={courses}
                    onToggleRegister={handleToggleCourse}
                  />
                )}
                {view === "academics" && (
                  <AcademicsLibraryView
                    currentUser={currentUser}
                    studentRecord={activeStudentRecord}
                    books={books}
                    onToggleBorrowBook={handleToggleBorrowBook}
                    onOpenLogin={() => selectView("login")}
                  />
                )}
                {view === "events" && (
                  <EventCalendarView
                    events={events}
                    onToggleRsvp={handleToggleRsvp}
                    onInspectEvent={(event) => setModal({ kind: "event", event })}
                  />
                )}
                {view === "shield" && (
                  <PortalShieldView
                    shieldEnabled={shieldEnabled}
                    onToggleShield={handleToggleShield}
                    onSimulationExecuted={handleSimulationExecuted}
                    simulationHistory={simulationHistory}
                    activeBreach={activeBreach}
                    onResetPortal={() => {
                      setActiveBreach(null);
                      setShieldEnabled(true);
                    }}
                  />
                )}
              </div>
            </div>
          </main>

          <Dock active={active} select={selectView} />
        </div>

        <footer className="gd-footer">
          <span>BMSIT&amp;M Campus Portal Demo · Track 2 Mission Portal Shield · Synthetic Data Only</span>
          <a href="https://bmsit.ac.in/" target="_blank" rel="noreferrer">
            Modeled on bmsit.ac.in
            <ArrowUpRight aria-hidden="true" />
          </a>
        </footer>
      </div>

      {modal === "search" && (
        <QuickActions
          workspaceName={workspaceName}
          students={students}
          select={selectView}
          inspectStudent={(student) => setModal({ kind: "student", student })}
          close={close}
        />
      )}

      {modal === "notifications" && (
        <Dialog title="Campus & Shield Alerts" close={close}>
          <div className="gd-quick-list">
            {alertNotices.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  close();
                  selectView("shield");
                }}
              >
                <Bell aria-hidden="true" />
                <div>
                  <strong>{item.event}</strong>
                  <small>
                    {item.portal} · {item.actor} · {item.time}
                  </small>
                </div>
                <ArrowRight aria-hidden="true" />
              </button>
            ))}
            {alertNotices.length === 0 && <p className="gd-empty">No recent security alerts.</p>}
          </div>
        </Dialog>
      )}

      {modal && typeof modal === "object" && modal.kind === "student" && (
        <Dialog title={`${modal.student.name} · ${modal.student.usn}`} close={close}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 11.5 }}>
            <StatusText status={modal.student.standing} />
            <span aria-hidden="true">·</span>
            <span>
              {modal.student.department} · Semester {modal.student.semester} (Sec {modal.student.section})
            </span>
          </div>
          <p className="gd-work-dialog-description">
            Mentor: <strong>{modal.student.mentor}</strong> · {modal.student.hostelStatus} · Fee Status:{" "}
            <StatusText status={modal.student.feeStatus} />
          </p>
          <dl className="gd-work-facts">
            <div>
              <dt>CGPA</dt>
              <dd>{modal.student.cgpa.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Attendance</dt>
              <dd>{modal.student.attendance.toFixed(1)}%</dd>
            </div>
            <div>
              <dt>Credits Earned</dt>
              <dd>{modal.student.creditsEarned}</dd>
            </div>
          </dl>
          <div className="gd-code-box" style={{ marginBottom: 12 }}>
            <div>
              <strong>
                Protected PII ({shieldEnabled ? "Masked by Shield ACL" : "Exposed if Unprotected"}):
              </strong>
            </div>
            <div>
              Email: {shieldEnabled ? `${modal.student.usn.toLowerCase()}@bmsit.in` : modal.student.email}
            </div>
            <div>
              Phone: {shieldEnabled ? "+91 98*** ***" + modal.student.phone.slice(-2) : modal.student.phone}
            </div>
          </div>
          <div className="gd-table-scroll" style={{ marginBottom: 12 }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Subject</th>
                  <th scope="col">CIE / 50</th>
                  <th scope="col">Grade</th>
                </tr>
              </thead>
              <tbody>
                {modal.student.recentScores.map((sc) => (
                  <tr key={sc.code}>
                    <td>{sc.code}</td>
                    <td>{sc.subject}</td>
                    <td>{sc.cie}</td>
                    <td>{sc.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            className="gd-primary"
            onClick={() => {
              close();
              selectView("shield");
            }}
          >
            Test SQLi / IDOR Protection on Student DB <ArrowRight aria-hidden="true" />
          </button>
        </Dialog>
      )}

      {modal && typeof modal === "object" && modal.kind === "event" && (
        <Dialog title={modal.event.title} close={close}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 11.5 }}>
            <StatusText status={modal.event.rsvped ? "Verified" : modal.event.category} />
            <span aria-hidden="true">·</span>
            <span>
              {modal.event.dayOfMonth} {modal.event.monthLabel} · {modal.event.time}
            </span>
          </div>
          <p className="gd-work-dialog-description">{modal.event.summary}</p>
          <dl className="gd-work-facts">
            <div>
              <dt>Venue</dt>
              <dd>{modal.event.venue}</dd>
            </div>
            <div>
              <dt>Organizer</dt>
              <dd>{modal.event.organizer}</dd>
            </div>
            <div>
              <dt>Attendance</dt>
              <dd>
                {modal.event.attendees}/{modal.event.capacity}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            className={modal.event.rsvped ? "gd-secondary" : "gd-primary"}
            onClick={() => {
              handleToggleRsvp(modal.event.id);
              close();
            }}
          >
            {modal.event.rsvped ? "Cancel RSVP" : "Confirm Campus RSVP"}
          </button>
        </Dialog>
      )}
    </div>
  );
}

export default GlassyDashboard;
