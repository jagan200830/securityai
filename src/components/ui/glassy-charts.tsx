import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const numberFmt = new Intl.NumberFormat("en-US");
const compactFmt = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

export type ChartTone = "coral" | "ink" | "teal" | "ochre";
export type CountFormat = "number" | "compact" | "percent" | "decimal";

export const formatCount: Record<CountFormat, (value: number) => string> = {
  number: (v) => numberFmt.format(Math.round(v)),
  compact: (v) => compactFmt.format(v),
  percent: (v) => `${v.toFixed(1)}%`,
  decimal: (v) => v.toFixed(2),
};

export function Counter({ value, format = "number" }: { value: number; format?: CountFormat }) {
  const text = formatCount[format](value);
  return (
    <>
      <span data-gd-count={value} data-format={format} aria-hidden="true">
        {text}
      </span>
      <span className="gd-sr">{text}</span>
    </>
  );
}

export function Legend({ entries }: { entries: { label: string; tone: ChartTone }[] }) {
  return (
    <div className="gd-legend">
      {entries.map(({ label, tone }) => (
        <span key={label}>
          <i data-tone={tone} aria-hidden="true" />
          {label}
        </span>
      ))}
    </div>
  );
}

export type StackItem = { label: string; lower: number; upper: number };

export function StackChart({
  items,
  labels,
  tones,
  format = numberFmt.format,
  title,
}: {
  items: StackItem[];
  labels: [string, string];
  tones: [ChartTone, ChartTone];
  format?: (value: number) => string;
  title: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const max = Math.max(1, ...items.map((item) => item.lower + item.upper)) * 1.12;
  const selected = active === null ? undefined : items[active];

  return (
    <figure className="gd-stack" aria-label={title}>
      <div className="gd-stack-meta">
        <Legend entries={labels.map((label, index) => ({ label, tone: tones[index] }))} />
        {selected && (
          <span className="gd-chart-readout">
            {selected.label} · {format(selected.lower + selected.upper)}
          </span>
        )}
      </div>
      <div
        className="gd-stack-plot"
        style={{ "--gd-series-count": items.length } as CSSProperties}
        onMouseLeave={() => setActive(null)}
      >
        {items.map((item, index) => (
          <button
            type="button"
            className="gd-stack-column"
            key={item.label}
            aria-label={`${item.label}: ${format(item.lower)} ${labels[0]}, ${format(item.upper)} ${labels[1]}`}
            aria-pressed={active === index}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            onMouseEnter={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <span className="gd-stack-track" aria-hidden="true">
              <span
                className="gd-stack-bar"
                style={{ height: `${((item.lower + item.upper) / max) * 100}%` }}
              >
                <i data-tone={tones[1]} style={{ flexGrow: item.upper }} />
                <i data-tone={tones[0]} style={{ flexGrow: item.lower }} />
              </span>
            </span>
            <span className="gd-stack-label" aria-hidden="true">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </figure>
  );
}

type Point = [number, number];

function curve(points: Point[]) {
  return points.reduce((path, [x, y], index) => {
    if (index === 0) return `M ${x} ${y}`;
    const [prevX, prevY] = points[index - 1];
    const mid = (x + prevX) / 2;
    return `${path} C ${mid} ${prevY}, ${mid} ${y}, ${x} ${y}`;
  }, "");
}

export function TrafficLineChart({
  labels,
  primarySeries,
  secondarySeries,
  primaryLabel = "Verified Requests",
  secondaryLabel = "Blocked Attacks",
  unitSuffix = "k",
}: {
  labels: string[];
  primarySeries: number[];
  secondarySeries: number[];
  primaryLabel?: string;
  secondaryLabel?: string;
  unitSuffix?: string;
}) {
  const fillId = `traffic-fill-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [active, setActive] = useState<number | null>(null);
  const plotHeight = 192;
  const width = 600;
  const max = Math.ceil((Math.max(...primarySeries, ...secondarySeries) * 1.15) / 5) * 5;
  const points = (values: number[]): Point[] =>
    values.map((value, index) => [
      (index * width) / Math.max(1, values.length - 1),
      plotHeight - (value / max) * plotHeight,
    ]);
  const primaryPoints = points(primarySeries);
  const secondaryPoints = points(secondarySeries);
  const primaryLine = curve(primaryPoints);
  const last = ((primaryPoints.length - 1) * width) / Math.max(1, primaryPoints.length - 1);
  const point = active === null ? undefined : primaryPoints[active];
  const secPoint = active === null ? undefined : secondaryPoints[active];
  const ticks = [max, max * 0.75, max * 0.5, max * 0.25, 0];

  return (
    <figure className="gd-revenue-chart" aria-label={`${primaryLabel} vs ${secondaryLabel}`}>
      <div className="gd-revenue-main">
        <div className="gd-chart-y" aria-hidden="true">
          {ticks.map((v) => (
            <span key={v}>{v === 0 ? "0" : `${Number(v.toFixed(1))}${unitSuffix}`}</span>
          ))}
        </div>
        <div className="gd-line-plot" onMouseLeave={() => setActive(null)}>
          <svg viewBox={`0 0 ${width} ${plotHeight}`} preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0" stopColor="var(--gd-teal)" stopOpacity=".28" />
                <stop offset="1" stopColor="var(--gd-teal)" stopOpacity=".02" />
              </linearGradient>
            </defs>
            {ticks.map((tick, index) => (
              <line
                className="gd-grid-line"
                key={tick}
                x1="0"
                x2={width}
                y1={(plotHeight * index) / 4}
                y2={(plotHeight * index) / 4}
              />
            ))}
            <g className="gd-line-reveal">
              <path d={`${primaryLine} L ${last} ${plotHeight} H 0 Z`} fill={`url(#${fillId})`} />
              <path className="gd-chart-path" data-tone="teal" d={primaryLine} />
              <path className="gd-chart-path" data-tone="coral" d={curve(secondaryPoints)} />
            </g>
            {point && secPoint && (
              <g>
                <line className="gd-line-cursor" x1={point[0]} x2={point[0]} y1="0" y2={plotHeight} />
                <circle cx={point[0]} cy={point[1]} r="4" fill="var(--gd-teal)" />
                <circle cx={secPoint[0]} cy={secPoint[1]} r="4" fill="var(--gd-coral)" />
              </g>
            )}
          </svg>
          <div className="gd-chart-zones">
            {labels.map((label, index) => (
              <button
                type="button"
                key={label}
                aria-label={`${label}, ${primaryLabel} ${primarySeries[index]}${unitSuffix}, ${secondaryLabel} ${secondarySeries[index]}`}
                aria-pressed={active === index}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
          {active !== null && (
            <div
              className="gd-line-tooltip"
              style={{ "--gd-tooltip-x": `${(active / Math.max(1, labels.length - 1)) * 100}%` } as CSSProperties}
            >
              <strong>{labels[active]}</strong>
              <span>
                {primaryLabel} <b>{primarySeries[active]}{unitSuffix}</b>
              </span>
              <span>
                {secondaryLabel} <b>{secondarySeries[active]}</b>
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="gd-chart-axis" aria-hidden="true">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </figure>
  );
}

const donutTones: ChartTone[] = ["teal", "coral", "ink"];

export function BreakdownDonutChart({
  items,
  total,
  totalLabel,
}: {
  items: { label: string; pct: number }[];
  total: number;
  totalLabel: string;
}) {
  const maskId = `gd-ring-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [active, setActive] = useState<number | null>(null);
  const ratios = items.map((i) => i.pct);

  return (
    <div className="gd-device" aria-label={totalLabel}>
      <div className="gd-device-ring">
        <svg viewBox="0 0 124 124" aria-hidden="true">
          <defs>
            <mask id={maskId}>
              <circle
                className="gd-donut-draw"
                cx="62"
                cy="62"
                r="47"
                fill="none"
                stroke="white"
                strokeWidth="15"
                pathLength="100"
                strokeDasharray="100 0"
                transform="rotate(-90 62 62)"
              />
            </mask>
          </defs>
          <circle cx="62" cy="62" r="47" fill="none" stroke="var(--gd-track)" strokeWidth="14" />
          <g mask={`url(#${maskId})`} transform="rotate(-90 62 62)">
            {ratios.map((ratio, index) => (
              <circle
                key={items[index].label}
                cx="62"
                cy="62"
                r="47"
                pathLength="100"
                fill="none"
                strokeWidth="14"
                data-tone={donutTones[index % donutTones.length]}
                className="gd-device-segment"
                data-muted={active !== null && index !== active}
                strokeDasharray={`${Math.max(0, ratio - 1.2)} 100`}
                strokeDashoffset={-ratios.slice(0, index).reduce((sum, val) => sum + val, 0)}
              />
            ))}
          </g>
        </svg>
        <div className="gd-device-total">
          <strong>
            {active === null ? (
              <Counter value={total} />
            ) : (
              numberFmt.format(Math.round((total * ratios[active]) / 100))
            )}
          </strong>
          <span>{active === null ? totalLabel : items[active].label}</span>
        </div>
      </div>
      <div className="gd-device-list">
        {items.map((item, index) => (
          <button
            type="button"
            key={item.label}
            aria-pressed={active === index}
            aria-label={`${item.label}, ${item.pct}%`}
            onClick={() => setActive(active === index ? null : index)}
          >
            <span>
              <i data-tone={donutTones[index % donutTones.length]} aria-hidden="true" />
              {item.label}
            </span>
            <span className="gd-mix-track" aria-hidden="true">
              <i
                className="gd-fill"
                data-tone={donutTones[index % donutTones.length]}
                style={{ width: `${item.pct}%` }}
              />
            </span>
            <strong>{item.pct}%</strong>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Panel({
  title,
  subtitle,
  action,
  className = "",
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`gd-panel ${className}`} data-gd-enter>
      <header className="gd-panel-head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

export function Metric({
  title,
  icon,
  value,
  format,
  change,
  detail,
  tone,
}: {
  title: string;
  icon: ReactNode;
  value: number;
  format?: CountFormat;
  change?: string;
  detail?: string;
  tone?: "teal" | "coral" | "danger";
}) {
  return (
    <article className="gd-metric" data-tone={tone} data-gd-enter>
      <div className="gd-metric-head">
        <span>{title}</span>
        <span className="gd-metric-icon" aria-hidden="true">
          {icon}
        </span>
      </div>
      <strong className="gd-metric-value">
        <Counter value={value} format={format} />
      </strong>
      <div className="gd-metric-caption">
        {change && (
          <span className="gd-delta" data-attention={tone === "coral" || tone === "danger"}>
            {change.startsWith("−") || change.startsWith("-") ? (
              <ArrowDownRight aria-hidden="true" />
            ) : (
              <ArrowUpRight aria-hidden="true" />
            )}
            {change}
          </span>
        )}
        <span>{detail ?? "vs prior period"}</span>
      </div>
    </article>
  );
}

export function StatusText({ status }: { status: string }) {
  const state =
    status === "Verified" || status === "Honors" || status === "Paid" || status === "Protected" || status === "Scholarship Approved"
      ? "teal"
      : status === "Blocked" || status === "Compromised" || status === "Attendance Watch" || status === "Critical"
        ? "coral"
        : status === "Needs review" || status === "Pending Verification" || status === "High"
          ? "ochre"
          : "ink";
  return (
    <span className="gd-status-text" data-state={state}>
      {status}
    </span>
  );
}
