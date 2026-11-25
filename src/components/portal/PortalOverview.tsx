import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Filter,
  GraduationCap,
  Search,
  ShieldAlert,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  dailyShieldActivity,
  portalAnalytics,
  type Period,
  type PortalActivityLog,
} from "../../data/bmsitData";
import { Counter, Metric, Panel, StackChart, StatusText } from "../ui/glassy-charts";

export type PortalView = "overview" | "profiles" | "courses" | "events" | "shield";

export function PortalOverview({
  period,
  shieldEnabled,
  activeBreachName,
  registeredCredits,
  upcomingEventsCount,
  activityLogs,
  blockedCountBonus,
  onNavigate,
}: {
  period: Period;
  shieldEnabled: boolean;
  activeBreachName: string | null;
  registeredCredits: number;
  upcomingEventsCount: number;
  activityLogs: PortalActivityLog[];
  blockedCountBonus: number;
  onNavigate: (view: PortalView) => void;
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");

  const stats = portalAnalytics[period];
  const totalBlocked = stats.blockedThreats + blockedCountBonus;
  const filteredActivity = activityLogs.filter(
    (item) =>
      [item.event, item.portal, item.actor, item.status]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()) &&
      (statusFilter === "All statuses" || item.status === statusFilter)
  );

  return (
    <div className="gd-command-grid">
      <Panel
        title="BMSIT&M Campus Enrollment"
        subtitle="Autonomous · Yelahanka, Bengaluru"
        className="gd-balance"
        action={<span className="gd-unit">VTU · NAAC A</span>}
      >
        <div className="gd-balance-number">
          <Counter value={stats.activeStudents} />
        </div>
        <div className="gd-balance-change">
          <span className="gd-delta">
            <ArrowUpRight aria-hidden="true" />
            {stats.studentDelta}
          </span>
          <span>active student &amp; faculty accounts</span>
        </div>
        <div className="gd-balance-actions">
          <button type="button" className="gd-primary" onClick={() => onNavigate("profiles")}>
            Student profiles <ArrowUpRight aria-hidden="true" />
          </button>
          <button type="button" className="gd-secondary" onClick={() => onNavigate("courses")}>
            Course reg. <ArrowRight aria-hidden="true" />
          </button>
        </div>
        <div className="gd-streams" aria-label="BMSIT department clusters">
          {stats.deptDistribution.map((dept) => (
            <div key={dept.label}>
              <span>{dept.label}</span>
              <strong>{dept.pct}% share</strong>
            </div>
          ))}
        </div>
      </Panel>

      <div className="gd-summary">
        <Metric
          title={shieldEnabled ? "Portal Shield Blocks" : "Shield Status"}
          icon={shieldEnabled ? <ShieldCheck /> : <ShieldAlert />}
          value={shieldEnabled ? totalBlocked : 0}
          change={shieldEnabled ? stats.threatDelta : "OFFLINE"}
          detail={shieldEnabled ? "threats stopped" : "agent disabled"}
          tone={shieldEnabled ? "teal" : "danger"}
        />
        <Metric
          title="Avg. Attendance"
          icon={<Users />}
          value={stats.avgAttendance}
          format="percent"
          change={stats.attendanceDelta}
          detail="across 9 depts"
        />
        <Metric
          title="CBCS Credits"
          icon={<BookOpen />}
          value={registeredCredits}
          detail="of 24 max credits"
        />
        <Metric
          title="Campus Events"
          icon={<CalendarDays />}
          value={upcomingEventsCount}
          detail="Nov–Dec 2026"
        />
      </div>

      <Panel
        title="Portal Traffic & Shield Watch"
        subtitle="Verified student sessions vs intercepted threats · 7 days"
        className="gd-command-chart"
      >
        <StackChart
          items={dailyShieldActivity.map((d) => ({
            label: d.label,
            lower: d.verified,
            upper: d.intercepted,
          }))}
          labels={["Verified", "Intercepted"]}
          tones={["ink", "teal"]}
          title="Portal traffic integrity by day"
        />
      </Panel>

      <div className="gd-command-side">
        <Panel title="CBCS Credit Allocation" className="gd-capacity">
          <div
            className="gd-capacity-track"
            role="meter"
            aria-label="Registered semester credits"
            aria-valuenow={registeredCredits}
            aria-valuemin={0}
            aria-valuemax={24}
          >
            <span
              className="gd-fill"
              data-warn={registeredCredits > 22}
              style={{ width: `${Math.min(100, (registeredCredits / 24) * 100)}%` }}
            />
          </div>
          <div className="gd-capacity-label">
            <span>
              <strong>{registeredCredits} credits</strong> registered
            </span>
            <span>24 credit semester cap</span>
          </div>
        </Panel>

        <Panel
          title="Mission Portal Shield"
          subtitle={
            activeBreachName
              ? `Active simulated breach: ${activeBreachName}`
              : shieldEnabled
                ? "AI Agent monitoring Results, Profiles & Auth"
                : "Protection paused — vulnerable to web attacks"
          }
          className="gd-approvals"
        >
          <div className="gd-approval-content">
            <span className="gd-list-icon" data-alert={!shieldEnabled || Boolean(activeBreachName)}>
              {shieldEnabled && !activeBreachName ? (
                <ShieldCheck aria-hidden="true" />
              ) : (
                <ShieldAlert aria-hidden="true" />
              )}
            </span>
            <div>
              <strong>{shieldEnabled ? "AI Defense Agent Active" : "Portal Unprotected"}</strong>
              <small>Launch simulated attacks &amp; compare outcomes</small>
            </div>
            <button
              type="button"
              className="gd-icon-button"
              aria-label="Open Mission Portal Shield Simulator"
              onClick={() => onNavigate("shield")}
            >
              <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </Panel>

        <Panel title="Academic Quick Links" subtitle="BMSIT&M Bengaluru portals" className="gd-approvals">
          <div className="gd-approval-content">
            <span className="gd-list-icon">
              <GraduationCap aria-hidden="true" />
            </span>
            <div>
              <strong>Utsaha 2026 &amp; IDEA Lab</strong>
              <small>View calendar &amp; reserve campus event seats</small>
            </div>
            <button
              type="button"
              className="gd-icon-button"
              aria-label="Open Campus Event Calendar"
              onClick={() => onNavigate("events")}
            >
              <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </Panel>
      </div>

      <Panel
        title="Campus Portal Audit Log"
        subtitle="Live synthetic events across Profiles, Courses, Exam Results & Auth"
        className="gd-activity"
        action={
          <div className="gd-table-tools">
            <label className="gd-search">
              <Search aria-hidden="true" />
              <input
                type="search"
                placeholder="Search USN or event"
                aria-label="Search campus activity"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <label className="gd-filter">
              <Filter aria-hidden="true" />
              <select
                aria-label="Filter campus activity"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {["All statuses", "Verified", "Blocked", "Compromised", "Needs review"].map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </label>
          </div>
        }
      >
        <div className="gd-table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Event</th>
                <th scope="col">Portal</th>
                <th scope="col">USN / Source IP</th>
                <th scope="col">Status</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivity.map((item) => (
                <tr key={item.id}>
                  <td>{item.event}</td>
                  <td>{item.portal}</td>
                  <td>{item.actor}</td>
                  <td>
                    <StatusText status={item.status} />
                  </td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredActivity.length === 0 && (
          <p className="gd-empty" role="status">
            No matching portal activity found.
          </p>
        )}
      </Panel>
    </div>
  );
}
