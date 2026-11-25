import { useState } from "react";
import { BookOpen, CheckCircle2, Clock3, Filter, PlusCircle, Search, Trash2, Users } from "lucide-react";
import type { CourseItem } from "../../data/bmsitData";
import { Metric, Panel, StatusText } from "../ui/glassy-charts";

const MAX_CREDITS = 24;

export function CourseRegistrationView({
  courses,
  onToggleRegister,
}: {
  courses: CourseItem[];
  onToggleRegister: (code: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All departments");
  const [categoryFilter, setCategoryFilter] = useState("All types");

  const registeredCourses = courses.filter((c) => c.registered);
  const totalCredits = registeredCourses.reduce((sum, c) => sum + c.credits, 0);
  const remainingCredits = Math.max(0, MAX_CREDITS - totalCredits);
  const openSeats = courses.reduce((sum, c) => sum + Math.max(0, c.capacity - c.enrolled), 0);

  const filteredCourses = courses.filter((c) => {
    const matchText = [c.code, c.title, c.faculty, c.department, c.room]
      .join(" ")
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchDept = deptFilter === "All departments" || c.department === deptFilter;
    const matchCat = categoryFilter === "All types" || c.category === categoryFilter;
    return matchText && matchDept && matchCat;
  });

  return (
    <div className="gd-analytics">
      <div className="gd-metric-grid">
        <Metric
          title="Registered Credits"
          icon={<BookOpen />}
          value={totalCredits}
          detail={`of ${MAX_CREDITS} CBCS credit cap`}
          tone="teal"
        />
        <Metric
          title="Enrolled Courses"
          icon={<CheckCircle2 />}
          value={registeredCourses.length}
          detail="Active for Odd/Even 2026"
        />
        <Metric
          title="Remaining Allowance"
          icon={<Clock3 />}
          value={remainingCredits}
          detail="credits available to add"
        />
        <Metric
          title="Open Campus Seats"
          icon={<Users />}
          value={openSeats}
          detail="across listed electives"
        />
      </div>

      <Panel
        title="Semester Credit Allowance — Student 1BY22CS041 (Aarav Kulkarni)"
        subtitle="BMSIT&M Autonomous CBCS Scheme · Register or drop courses below to update seat counts in real time"
      >
        <div
          className="gd-capacity-track"
          role="meter"
          aria-label="Semester credit progress"
          aria-valuenow={totalCredits}
          aria-valuemin={0}
          aria-valuemax={MAX_CREDITS}
        >
          <span
            className="gd-fill"
            data-warn={totalCredits > 22}
            style={{ width: `${Math.min(100, (totalCredits / MAX_CREDITS) * 100)}%` }}
          />
        </div>
        <div className="gd-capacity-label">
          <span>
            <strong>{totalCredits} / {MAX_CREDITS} credits</strong> allocated across {registeredCourses.length} courses
          </span>
          <span>
            {registeredCourses.map((c) => c.code).join(" · ") || "No courses registered yet"}
          </span>
        </div>
      </Panel>

      <Panel
        title="Autonomous Course Catalog (2026–27)"
        subtitle="Core engineering courses, AICTE IDEA Lab modules, and Open Electives"
        action={
          <div className="gd-table-tools">
            <label className="gd-search">
              <Search aria-hidden="true" />
              <input
                type="search"
                placeholder="Code, title or faculty"
                aria-label="Search course catalog"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <label className="gd-filter">
              <Filter aria-hidden="true" />
              <select
                aria-label="Filter by department"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
              >
                {["All departments", "CSE", "AI & ML", "ECE", "CSBS", "Mechanical", "Open Elective"].map(
                  (d) => (
                    <option key={d}>{d}</option>
                  )
                )}
              </select>
            </label>
            <label className="gd-filter">
              <Filter aria-hidden="true" />
              <select
                aria-label="Filter by course category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {["All types", "Core", "Professional Elective", "Open Elective", "Lab"].map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </label>
          </div>
        }
      >
        <div className="gd-course-grid">
          {filteredCourses.map((course) => {
            const seatsLeft = Math.max(0, course.capacity - course.enrolled);
            const wouldExceed = !course.registered && totalCredits + course.credits > MAX_CREDITS;
            return (
              <article
                key={course.code}
                className="gd-course-card"
                data-registered={course.registered}
              >
                <div>
                  <div className="gd-course-top">
                    <div>
                      <div className="gd-course-meta">
                        <strong>{course.code}</strong>
                        <span aria-hidden="true">·</span>
                        <span>{course.department}</span>
                        <span aria-hidden="true">·</span>
                        <span>{course.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{course.credits} Credits</span>
                      </div>
                      <h3>{course.title}</h3>
                    </div>
                    <StatusText status={course.registered ? "Verified" : `${seatsLeft} seats`} />
                  </div>
                  <p className="gd-course-desc" style={{ marginTop: 7 }}>
                    {course.description}
                  </p>
                </div>

                <div>
                  <div className="gd-course-meta" style={{ marginBottom: 9 }}>
                    <span>{course.faculty}</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.schedule}</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.room}</span>
                  </div>
                  <div className="gd-course-foot">
                    <span style={{ fontSize: 10.5, color: "var(--gd-muted)" }}>
                      Enrolled: <strong style={{ color: "var(--gd-ink)" }}>{course.enrolled}/{course.capacity}</strong> · Prereq: {course.prerequisite}
                    </span>
                    {course.registered ? (
                      <button
                        type="button"
                        className="gd-secondary"
                        onClick={() => onToggleRegister(course.code)}
                      >
                        <Trash2 aria-hidden="true" />
                        Drop Course
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="gd-primary"
                        disabled={wouldExceed || seatsLeft === 0}
                        title={wouldExceed ? "Exceeds 24-credit semester limit" : undefined}
                        onClick={() => onToggleRegister(course.code)}
                      >
                        <PlusCircle aria-hidden="true" />
                        {wouldExceed ? "Credit Cap" : seatsLeft === 0 ? "Waitlist Full" : "Register"}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {filteredCourses.length === 0 && (
          <p className="gd-empty" role="status">
            No courses match your search criteria.
          </p>
        )}
      </Panel>
    </div>
  );
}
