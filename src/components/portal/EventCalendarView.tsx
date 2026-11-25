import { useState } from "react";
import { CalendarDays, Check, Clock3, Filter, MapPin, Plus, Users } from "lucide-react";
import type { CampusEvent } from "../../data/bmsitData";
import { Metric, Panel, StatusText } from "../ui/glassy-charts";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// November 2026 starts on Sunday (0) and has 30 days
const NOV_DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

export function EventCalendarView({
  events,
  onToggleRsvp,
  onInspectEvent,
}: {
  events: CampusEvent[];
  onToggleRsvp: (id: string) => void;
  onInspectEvent: (event: CampusEvent) => void;
}) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [category, setCategory] = useState("All categories");

  const featuredEvents = events.filter((e) => e.featured && e.image);
  const rsvpCount = events.filter((e) => e.rsvped).length;
  const totalAttendees = events.reduce((acc, e) => acc + e.attendees, 0);

  const visibleEvents = events.filter((e) => {
    const matchCat = category === "All categories" || e.category === category;
    const matchDay =
      selectedDay === null || (e.monthLabel === "Nov 2026" && e.dayOfMonth === selectedDay);
    return matchCat && matchDay;
  });

  return (
    <div className="gd-analytics">
      <div className="gd-metric-grid">
        <Metric
          title="Scheduled Events"
          icon={<CalendarDays />}
          value={events.length}
          detail="Nov–Dec 2026 calendar"
          tone="teal"
        />
        <Metric
          title="Your RSVPs"
          icon={<Check />}
          value={rsvpCount}
          detail="confirmed campus passes"
        />
        <Metric
          title="Total Registrations"
          icon={<Users />}
          value={totalAttendees}
          detail="students & guests"
        />
        <Metric
          title="Venues Active"
          icon={<MapPin />}
          value={5}
          detail="BSN Hall, IDEA Lab, BICEP"
        />
      </div>

      <section aria-label="Featured BMSIT&M campus highlights" data-gd-enter>
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
                    {evt.category} · {evt.dayOfMonth} {evt.monthLabel} · {evt.venue}
                  </small>
                  <strong>{evt.title}</strong>
                </div>
              </div>
              <div className="gd-event-body">
                <p>{evt.summary}</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    paddingTop: 6,
                    borderTop: "1px solid var(--gd-line)",
                  }}
                >
                  <span style={{ fontSize: 10.5, color: "var(--gd-muted)" }}>
                    <strong style={{ color: "var(--gd-ink)" }}>{evt.attendees}</strong>/{evt.capacity} attending
                  </span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      type="button"
                      className="gd-secondary"
                      onClick={() => onInspectEvent(evt)}
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      className={evt.rsvped ? "gd-teal-btn" : "gd-primary"}
                      onClick={() => onToggleRsvp(evt.id)}
                    >
                      {evt.rsvped ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
                      {evt.rsvped ? "Going" : "RSVP"}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="gd-calendar-layout">
        <Panel
          title="November 2026 Campus Calendar"
          subtitle="Click a highlighted date to filter BMSIT&M events, or clear selection to view all"
          action={
            selectedDay !== null && (
              <button
                type="button"
                className="gd-secondary"
                onClick={() => setSelectedDay(null)}
              >
                Show all dates
              </button>
            )
          }
        >
          <div className="gd-cal-grid" role="grid" aria-label="November 2026 calendar">
            {WEEKDAYS.map((day) => (
              <div key={day} className="gd-cal-dow">
                {day}
              </div>
            ))}
            {NOV_DAYS.map((day) => {
              const dayEvents = events.filter(
                (e) => e.monthLabel === "Nov 2026" && e.dayOfMonth === day
              );
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  className="gd-cal-day"
                  data-selected={isSelected}
                  data-has-event={dayEvents.length > 0}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedDay(isSelected ? null : day)}
                >
                  <span>{day}</span>
                  {dayEvents[0] && (
                    <span className="gd-cal-marker">{dayEvents[0].category}</span>
                  )}
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel
          title={selectedDay ? `Events on Nov ${selectedDay}, 2026` : "All Upcoming Campus Events"}
          subtitle="Academic schedules, hackathons, BICEP pitches, and TEDxBMSITM"
          action={
            <label className="gd-filter">
              <Filter aria-hidden="true" />
              <select
                aria-label="Filter events by category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {["All categories", "Cultural", "Technical", "Academic", "Innovation"].map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </label>
          }
        >
          <div className="gd-event-list">
            {visibleEvents.map((evt) => (
              <div key={evt.id} className="gd-event-row">
                <div className="gd-event-row-info">
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "var(--gd-muted)" }}>
                    <span>
                      {evt.dayOfMonth} {evt.monthLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{evt.category}</span>
                    <span aria-hidden="true">·</span>
                    <StatusText status={evt.rsvped ? "Verified" : `${evt.capacity - evt.attendees} left`} />
                  </div>
                  <strong style={{ marginTop: 2 }}>{evt.title}</strong>
                  <small>
                    <Clock3 size={11} style={{ display: "inline", verticalAlign: "-1px", marginRight: 4 }} aria-hidden="true" />
                    {evt.time} · {evt.venue}
                  </small>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button
                    type="button"
                    className="gd-secondary"
                    onClick={() => onInspectEvent(evt)}
                  >
                    Info
                  </button>
                  <button
                    type="button"
                    className={evt.rsvped ? "gd-teal-btn" : "gd-primary"}
                    onClick={() => onToggleRsvp(evt.id)}
                  >
                    {evt.rsvped ? "Going" : "RSVP"}
                  </button>
                </div>
              </div>
            ))}
            {visibleEvents.length === 0 && (
              <p className="gd-empty" role="status">
                No scheduled events on this date. Select another highlighted date or show all dates.
              </p>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
