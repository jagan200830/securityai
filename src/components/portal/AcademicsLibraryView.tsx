import { Award, BookMarked, CheckCircle2, Clock3, GraduationCap, RotateCcw } from "lucide-react";
import type { LibraryBook, PortalUser, StudentRecord } from "../../data/bmsitData";
import { Metric, Panel, StatusText } from "../ui/glassy-charts";

export function AcademicsLibraryView({
  currentUser,
  studentRecord,
  books,
  onToggleBorrowBook,
  onOpenLogin,
}: {
  currentUser: PortalUser | null;
  studentRecord: StudentRecord;
  books: LibraryBook[];
  onToggleBorrowBook: (bookId: string) => void;
  onOpenLogin: () => void;
}) {
  const borrowedCount = books.filter((b) => b.status === "Borrowed").length;

  const subjectAttendance = [
    { code: "22CS61", subject: "Distributed Systems & Cloud Security", attended: 34, total: 36 },
    { code: "22AI62", subject: "Deep Learning & Autonomous Agents", attended: 31, total: 34 },
    { code: "22CS63", subject: "Web Security & OWASP Defense Lab", attended: 22, total: 24 },
    { code: "22OE61", subject: "Ethical Hacking & Digital Forensics", attended: 25, total: 28 },
  ];

  return (
    <div className="gd-analytics">
      {!currentUser && (
        <div
          className="gd-panel"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong style={{ fontSize: 13 }}>Viewing Preview Transcript for {studentRecord.name} ({studentRecord.usn})</strong>
            <p style={{ fontSize: 11.5, color: "var(--gd-muted)", marginTop: 3 }}>
              Sign in with your synthetic BMSIT&amp;M student or faculty account to personalize results and library loans.
            </p>
          </div>
          <button type="button" className="gd-primary" onClick={onOpenLogin}>
            Sign In to Portal
          </button>
        </div>
      )}

      <div className="gd-metric-grid">
        <Metric
          title="Cumulative CGPA"
          icon={<Award />}
          value={studentRecord.cgpa}
          format="decimal"
          detail={`${studentRecord.standing} · Sem ${studentRecord.semester}`}
          tone="teal"
        />
        <Metric
          title="Overall Attendance"
          icon={<CheckCircle2 />}
          value={studentRecord.attendance}
          format="percent"
          detail="VTU min threshold 85%"
        />
        <Metric
          title="Credits Earned"
          icon={<GraduationCap />}
          value={studentRecord.creditsEarned}
          detail={studentRecord.department}
        />
        <Metric
          title="Library Books Issued"
          icon={<BookMarked />}
          value={borrowedCount}
          detail="Central Library Bengaluru"
        />
      </div>

      <div className="gd-analytics-grid">
        <Panel
          title={`Exam Results & CIE Marks — ${studentRecord.usn}`}
          subtitle="Autonomous Examination Portal · Verified Synthetic Marks Card"
          action={<StatusText status={studentRecord.feeStatus} />}
        >
          <div className="gd-table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Course Code</th>
                  <th scope="col">Subject Title</th>
                  <th scope="col">CIE / 50</th>
                  <th scope="col">SEE Status</th>
                  <th scope="col">Grade</th>
                </tr>
              </thead>
              <tbody>
                {studentRecord.recentScores.map((row) => (
                  <tr key={row.code}>
                    <td>{row.code}</td>
                    <td>{row.subject}</td>
                    <td>{row.cie} / 50</td>
                    <td>
                      <StatusText status="Verified" />
                    </td>
                    <td>{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel
          title="Subject-Wise Attendance"
          subtitle="Current Semester Live Eligibility Tracker"
        >
          <div style={{ display: "grid", gap: 12 }}>
            {subjectAttendance.map((item) => {
              const pct = (item.attended / item.total) * 100;
              return (
                <div key={item.code}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 5 }}>
                    <strong>
                      {item.code} · {item.subject}
                    </strong>
                    <span>
                      {item.attended}/{item.total} ({pct.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="gd-capacity-track">
                    <span
                      className="gd-fill"
                      data-warn={pct < 85}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      <Panel
        title="BMSIT&M Central Library Portal"
        subtitle="Borrow or return digital & print holdings — 14-day autonomous lending cycle"
      >
        <div className="gd-table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Title &amp; ISBN</th>
                <th scope="col">Author</th>
                <th scope="col">Shelf Location</th>
                <th scope="col">Status</th>
                <th scope="col">Due Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>
                    <div>{book.title}</div>
                    <div style={{ fontSize: 10, color: "var(--gd-muted)", fontWeight: 600 }}>
                      {book.isbn}
                    </div>
                  </td>
                  <td>{book.author}</td>
                  <td>{book.shelf}</td>
                  <td>
                    <StatusText status={book.status === "Borrowed" ? "Verified" : "Available"} />
                  </td>
                  <td>
                    {book.dueDate ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <Clock3 size={11} aria-hidden="true" />
                        {book.dueDate}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className={book.status === "Borrowed" ? "gd-secondary" : "gd-primary"}
                      onClick={() => onToggleBorrowBook(book.id)}
                    >
                      {book.status === "Borrowed" ? (
                        <>
                          <RotateCcw size={12} aria-hidden="true" />
                          Return
                        </>
                      ) : (
                        "Borrow Book"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
