import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Play,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  ShieldOff,
  Split,
  Zap,
} from "lucide-react";
import { attackScenarios, type AttackId, type AttackScenario } from "../../data/bmsitData";
import { Metric, Panel, StatusText } from "../ui/glassy-charts";

export interface SimulationRunRecord {
  id: string;
  attackId: AttackId;
  attackName: string;
  targetPortal: string;
  shieldActive: boolean;
  recordsExposed: number;
  responseLabel: string;
  outcome: string;
  timestamp: string;
}

export function PortalShieldView({
  shieldEnabled,
  onToggleShield,
  onSimulationExecuted,
  simulationHistory,
  activeBreach,
  onResetPortal,
}: {
  shieldEnabled: boolean;
  onToggleShield: (enabled: boolean) => void;
  onSimulationExecuted: (scenario: AttackScenario, protectedMode: boolean) => void;
  simulationHistory: SimulationRunRecord[];
  activeBreach: AttackScenario | null;
  onResetPortal: () => void;
}) {
  const [selectedId, setSelectedId] = useState<AttackId>("sqli");
  const [isRunning, setIsRunning] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const [lastRunMode, setLastRunMode] = useState<"protected" | "unprotected" | "comparison" | null>(null);

  const selected = attackScenarios.find((a) => a.id === selectedId) ?? attackScenarios[0];

  useEffect(() => {
    setVisibleSteps(0);
    setLastRunMode(null);
  }, [selectedId]);

  const runLiveAttack = () => {
    if (isRunning) return;
    setIsRunning(true);
    setVisibleSteps(0);
    const mode = shieldEnabled ? "protected" : "unprotected";
    setLastRunMode(mode);

    if (shieldEnabled) {
      // Animate AI Agent 4-step autonomous defense trace
      selected.withAgent.agentSteps.forEach((_, idx) => {
        window.setTimeout(() => {
          setVisibleSteps(idx + 1);
          if (idx === selected.withAgent.agentSteps.length - 1) {
            setIsRunning(false);
            onSimulationExecuted(selected, true);
          }
        }, 280 * (idx + 1));
      });
    } else {
      window.setTimeout(() => {
        setVisibleSteps(1);
        setIsRunning(false);
        onSimulationExecuted(selected, false);
      }, 420);
    }
  };

  const runSideBySideComparison = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLastRunMode("comparison");
    setVisibleSteps(selected.withAgent.agentSteps.length);
    window.setTimeout(() => {
      onSimulationExecuted(selected, false);
      onSimulationExecuted(selected, true);
      onToggleShield(true);
      setIsRunning(false);
    }, 360);
  };

  const blockedRuns = simulationHistory.filter((r) => r.shieldActive).length;
  const breachedRuns = simulationHistory.filter((r) => !r.shieldActive).length;
  const totalProtectedRecords = simulationHistory
    .filter((r) => r.shieldActive)
    .reduce((sum, r) => {
      const sc = attackScenarios.find((s) => s.id === r.attackId);
      return sum + (sc ? Math.max(120, sc.withoutAgent.recordsExposed) : 0);
    }, 0);

  return (
    <div className="gd-analytics">
      <div className="gd-metric-grid">
        <Metric
          title="Portal Shield Agent"
          icon={shieldEnabled ? <ShieldCheck /> : <ShieldOff />}
          value={shieldEnabled ? 100 : activeBreach ? activeBreach.withoutAgent.integrityScore : 38}
          format="percent"
          detail={shieldEnabled ? "Defense active · integrity" : "Unprotected · vulnerable"}
          tone={shieldEnabled ? "teal" : "danger"}
        />
        <Metric
          title="Attacks Neutralized"
          icon={<Zap />}
          value={blockedRuns}
          detail="zero records leaked"
        />
        <Metric
          title="Unprotected Breaches"
          icon={<AlertTriangle />}
          value={breachedRuns}
          detail="simulated without agent"
          tone={breachedRuns > 0 ? "coral" : undefined}
        />
        <Metric
          title="Records Safeguarded"
          icon={<Activity />}
          value={totalProtectedRecords}
          detail="student & staff rows"
        />
      </div>

      <Panel
        title="Track 2 Live Demo Control: Without Agent vs. With Portal Shield AI Agent"
        subtitle="Toggle the AI Defense Agent ON or OFF, choose a realistic web attack targeting the BMSIT&M portal, and launch it to see the exact difference."
        action={
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <div className="gd-period" role="group" aria-label="AI Security Agent Mode">
              <button
                type="button"
                aria-pressed={!shieldEnabled}
                onClick={() => onToggleShield(false)}
              >
                Agent OFF (Unprotected)
              </button>
              <button
                type="button"
                aria-pressed={shieldEnabled}
                onClick={() => onToggleShield(true)}
              >
                Agent ON (Protected)
              </button>
            </div>
            {activeBreach && (
              <button type="button" className="gd-secondary" onClick={onResetPortal}>
                <RotateCcw aria-hidden="true" />
                Restore Portal
              </button>
            )}
          </div>
        }
      >
        <div className="gd-shield-grid">
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: "var(--gd-muted)", marginBottom: 8 }}>
              1. Select Attack Vector Targeting BMSIT&amp;M Portal
            </div>
            <div className="gd-attack-list">
              {attackScenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  className="gd-attack-btn"
                  aria-pressed={selected.id === scenario.id}
                  onClick={() => setSelectedId(scenario.id)}
                >
                  <div className="gd-attack-btn-head">
                    <strong>{scenario.name}</strong>
                    <StatusText status={scenario.severity} />
                  </div>
                  <small>
                    {scenario.targetPortal} · {scenario.category}
                  </small>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: 11 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--gd-muted)" }}>
                  2. Inspect Payload &amp; Execute Against Live Demo Portal
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 820, marginTop: 3 }}>{selected.name}</h3>
                <p style={{ fontSize: 11.5, color: "var(--gd-muted)", marginTop: 4, lineHeight: 1.48 }}>
                  {selected.description}
                </p>
              </div>
            </div>

            <div className="gd-code-box" data-danger={!shieldEnabled}>
              <div><strong>Target:</strong> {selected.endpoint}</div>
              <div><strong>Source IP:</strong> {selected.attackerIp}</div>
              <div><strong>Payload:</strong> {selected.payload}</div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button
                type="button"
                className={shieldEnabled ? "gd-teal-btn" : "gd-danger"}
                disabled={isRunning}
                onClick={runLiveAttack}
              >
                <Play aria-hidden="true" />
                {isRunning
                  ? "Executing Simulation..."
                  : shieldEnabled
                    ? "Launch Attack (With AI Agent ON)"
                    : "Launch Attack (Without Agent — Unprotected)"}
              </button>
              <button
                type="button"
                className="gd-primary"
                disabled={isRunning}
                onClick={runSideBySideComparison}
              >
                <Split aria-hidden="true" />
                Run Side-by-Side Comparison
              </button>
            </div>

            {lastRunMode === "unprotected" && (
              <div className="gd-compare-col" data-mode="without">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <strong style={{ color: "var(--gd-coral)", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                    <ShieldAlert size={16} aria-hidden="true" />
                    BREACH OCCURRED — {selected.withoutAgent.outcomeHeadline}
                  </strong>
                  <StatusText status="Compromised" />
                </div>
                <p style={{ fontSize: 11.5, lineHeight: 1.48 }}>{selected.withoutAgent.impactSummary}</p>
                <div className="gd-code-box" data-danger="true">
                  {selected.withoutAgent.leakedPreview.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            )}

            {lastRunMode === "protected" && visibleSteps > 0 && (
              <div className="gd-compare-col" data-mode="with">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <strong style={{ color: "var(--gd-teal)", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                    <ShieldCheck size={16} aria-hidden="true" />
                    DEFENDED IN {selected.withAgent.responseMs}ms — {selected.withAgent.outcomeHeadline}
                  </strong>
                  <StatusText status="Protected" />
                </div>
                <div className="gd-step-list">
                  {selected.withAgent.agentSteps.slice(0, visibleSteps).map((step) => (
                    <div key={step.phase} className="gd-step-row">
                      <strong>{step.phase}</strong>
                      <span>{step.ms}</span>
                      <p>{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Panel>

      <Panel
        title={`Outcome Comparison: ${selected.shortLabel} — Without Agent vs. With Portal Shield AI`}
        subtitle="Clear side-by-side breakdown demonstrating exactly what happens to BMSIT&M records and uptime with and without continuous AI protection."
      >
        <div className="gd-compare-grid">
          <section className="gd-compare-col" data-mode="without" aria-label="Outcome without AI agent">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: 14, color: "var(--gd-coral)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <ShieldOff size={16} aria-hidden="true" />
                Without AI Agent (Unprotected Portal)
              </strong>
              <StatusText status="Compromised" />
            </div>
            <p style={{ fontSize: 12, fontWeight: 760 }}>{selected.withoutAgent.outcomeHeadline}</p>
            <p style={{ fontSize: 11.5, color: "var(--gd-muted)", lineHeight: 1.48 }}>
              {selected.withoutAgent.impactSummary}
            </p>
            <dl className="gd-compare-facts">
              <div>
                <dt>Records Leaked</dt>
                <dd style={{ color: "var(--gd-coral)" }}>
                  {selected.withoutAgent.recordsExposed.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt>Portal Integrity</dt>
                <dd style={{ color: "var(--gd-coral)" }}>{selected.withoutAgent.integrityScore}%</dd>
              </div>
              <div>
                <dt>Recovery / Impact</dt>
                <dd>{selected.withoutAgent.downtimeLabel}</dd>
              </div>
            </dl>
            <div className="gd-code-box" data-danger="true">
              {selected.withoutAgent.leakedPreview.map((row, idx) => (
                <div key={idx}>{row}</div>
              ))}
            </div>
          </section>

          <section className="gd-compare-col" data-mode="with" aria-label="Outcome with Portal Shield AI agent">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: 14, color: "var(--gd-teal)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <CheckCircle2 size={16} aria-hidden="true" />
                With Portal Shield AI Agent (Protected)
              </strong>
              <StatusText status="Protected" />
            </div>
            <p style={{ fontSize: 12, fontWeight: 760 }}>{selected.withAgent.outcomeHeadline}</p>
            <p style={{ fontSize: 11.5, color: "var(--gd-muted)", lineHeight: 1.48 }}>
              {selected.withAgent.mitigationAction}
            </p>
            <dl className="gd-compare-facts">
              <div>
                <dt>Records Leaked</dt>
                <dd style={{ color: "var(--gd-teal)" }}>{selected.withAgent.recordsExposed}</dd>
              </div>
              <div>
                <dt>Portal Integrity</dt>
                <dd style={{ color: "var(--gd-teal)" }}>{selected.withAgent.integrityScore}%</dd>
              </div>
              <div>
                <dt>Agent Mitigation</dt>
                <dd>{selected.withAgent.responseMs} ms</dd>
              </div>
            </dl>
            <div className="gd-step-list" style={{ marginTop: 0 }}>
              {selected.withAgent.agentSteps.map((step) => (
                <div key={step.phase} className="gd-step-row">
                  <strong>{step.phase}</strong>
                  <span>{step.ms}</span>
                  <p>{step.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Panel>

      <Panel
        title="Session Attack & Defense Ledger"
        subtitle="Chronological record of simulated attacks run during this demo session"
      >
        <div className="gd-table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Attack Vector</th>
                <th scope="col">Target Portal</th>
                <th scope="col">Agent Mode</th>
                <th scope="col">Records Exposed</th>
                <th scope="col">Response</th>
                <th scope="col">Outcome</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {simulationHistory.map((run) => (
                <tr key={run.id}>
                  <td>{run.attackName}</td>
                  <td>{run.targetPortal}</td>
                  <td>
                    <StatusText status={run.shieldActive ? "Protected" : "Compromised"} />
                  </td>
                  <td>{run.recordsExposed.toLocaleString()}</td>
                  <td>{run.responseLabel}</td>
                  <td>{run.outcome}</td>
                  <td>{run.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {simulationHistory.length === 0 && (
          <p className="gd-empty" role="status">
            No attack simulations executed yet. Toggle Agent OFF or ON above and click Launch Attack to record results.
          </p>
        )}
      </Panel>
    </div>
  );
}
