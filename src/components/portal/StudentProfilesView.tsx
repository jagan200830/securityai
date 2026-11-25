import { useState } from "react";
import { Award, BookMarked, Filter, GraduationCap, Search, ShieldCheck, Users } from "lucide-react";
import { portalAnalytics, type Period, type StudentRecord } from "../../data/bmsitData";
import {
  BreakdownDonutChart,
  Legend,
  Metric,
  Panel,
  StatusText,
  TrafficLineChart,
} from "../ui/glassy-charts";

export function StudentProfilesView({
  students,
  period,
  shieldEnabled,
  onInspectStudent,
}: {
  students: StudentRecord[];
  period: Period;
  shieldEnabled: boolean;
  onInspectStudent: (student: StudentRecord) => void;
}) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");

  const departments = ["All departments", "CSE", "AI & ML", "ECE", "CSBS", "Mechanical", "EEE", "MBA"];
  const stats = portalAnalytics[period];

  const filtered = students.filter((s) => {
    const matchText = [s.usn, s.name, s.department, s.mentor, s.email]
      .join(" ")
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchDept = department === "All departments" || s.department === department;
    return matchText && matchDept;
  });

  const avgCgpa = students.reduce((acc, s) => acc + s.cgpa, 0) / students.length;
  const honorsCount = students.filter((s) => s.standing === "Honors").length;
  const watchCount = students.filter((s) => s.standing === "Attendance Watch").length;

  return (
    <div className="gd-analytics">
      <div className="gd-metric-grid">
        <Metric
          title="Enrolled Students"
          icon={<Users />}
          value={stats.activeStudents}
          change={stats.studentDelta}
          detail="verified USNs"
          tone="teal"
        />
        <Metric
          title="Mean Cohort CGPA"
          icon={<Award />}
          value={avgCgpa}
          format="decimal"
          detail="Autonomous CBCS"
        />
        <Metric
          title="Honors Standing"
          icon={<GraduationCap />}
          value={honorsCount}
          detail={`of ${students.length} sample profiles`}
        />
        <Metric
          title="PII Guard Mode"
          icon={<ShieldCheck />}
          value={watchCount}
          detail={shieldEnabled ? "masking & ACL active" : "unprotected exposure"}
          tone={shieldEnabled ? undefined : "coral"}
        />
      </div>

      <div className="gd-analytics-grid">
        <Panel
          title="Profile & Exam Portal Traffic"
          subtitle="Verified student profile queries vs intercepted scraping attempts"
          action={
            <Legend
              entries={[
                { label: "Verified Lookups (k)", tone: "teal" },
                { label: "Blocked Probes", tone: "coral" },
              ]}
            />
          }
        >
          <TrafficLineChart
            labels={stats.axis}
            primarySeries={stats.legitimateTraffic}
            secondarySeries={stats.blockedTraffic}
            primaryLabel="Verified Lookups"
            secondaryLabel="Blocked Probes"
          />
        </Panel>

        <Panel title="Enrollment by Cluster" subtitle="BMSIT&M Bengaluru UG & PG">
          <BreakdownDonutChart
            items={stats.deptDistribution}
            total={stats.activeStudents}
            totalLabel="Students"
          />
        </Panel>
      </div>

      <Panel
        title="BMSIT&M Student Directory (Synthetic Data)"
        subtitle="Select any student row to inspect USN transcript, attendance, hostel allocation, and PII protection status."
        action={
          <div className="gd-table-tools">
            <label className="gd-search">
              <Search aria-hidden="true" />
              <input
                type="search"
                placeholder="Search USN or name"
                aria-label="Search student profiles"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <label className="gd-filter">
              <Filter aria-hidden="true" />
              <select
                aria-label="Filter by department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departments.map((d) => (
                  <option key={d}>{d}</option>
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
                <th scope="col">USN</th>
                <th scope="col">Student Name</th>
                <th scope="col">Dept · Sem</th>
                <th scope="col">CGPA</th>
                <th scope="col">Attendance</th>
                <th scope="col">Faculty Mentor</th>
                <th scope="col">Standing</th>
                <th scope="col">Library</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr
                  key={student.id}
                  className="gd-clickable"
                  tabIndex={0}
                  onClick={() => onInspectStudent(student)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onInspectStudent(student);
                    }
                  }}
                >
                  <td>{student.usn}</td>
                  <td>{student.name}</td>
                  <td>
                    {student.department} · Sem {student.semester} ({student.section})
                  </td>
                  <td>{student.cgpa.toFixed(2)}</td>
                  <td>{student.attendance.toFixed(1)}%</td>
                  <td>{student.mentor}</td>
                  <td>
                    <StatusText status={student.standing} />
                  </td>
                  <td>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <BookMarked size={12} aria-hidden="true" />
                      {student.libraryBooks}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="gd-empty" role="status">
            No matching student profiles in this department.
          </p>
        )}
      </Panel>
    </div>
  );
}
