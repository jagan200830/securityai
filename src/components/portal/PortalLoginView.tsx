import { useState, type FormEvent } from "react";
import {
  AlertTriangle,
  ArrowRight,
  KeyRound,
  LogIn,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import {
  attackScenarios,
  demoPortalAccounts,
  type AttackScenario,
  type PortalUser,
} from "../../data/bmsitData";
import { Panel, StatusText } from "../ui/glassy-charts";

export function PortalLoginView({
  currentUser,
  shieldEnabled,
  onToggleShield,
  onLoginSuccess,
  onLogout,
  onTriggerLoginAttack,
}: {
  currentUser: PortalUser | null;
  shieldEnabled: boolean;
  onToggleShield: (enabled: boolean) => void;
  onLoginSuccess: (user: PortalUser) => void;
  onLogout: () => void;
  onTriggerLoginAttack: (scenario: AttackScenario, protectedMode: boolean) => void;
}) {
  const [role, setRole] = useState<"student" | "faculty">("student");
  const [identifier, setIdentifier] = useState("1BY22CS041");
  const [password, setPassword] = useState("bmsit@2026");
  const [feedback, setFeedback] = useState<{
    tone: "teal" | "coral" | "ink";
    headline: string;
    detail: string;
  } | null>(null);

  const sqliScenario = attackScenarios.find((s) => s.id === "sqli") ?? attackScenarios[0];
  const bruteScenario = attackScenarios.find((s) => s.id === "bruteforce") ?? attackScenarios[1];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = identifier.trim();

    // Detect live SQL injection attempt right inside the college login form!
    const looksLikeSqli = /('|--|union\s+select|or\s+1=1|or\s+'1'='1')/i.test(trimmed + " " + password);
    if (looksLikeSqli) {
      if (shieldEnabled) {
        onTriggerLoginAttack(sqliScenario, true);
        setFeedback({
          tone: "teal",
          headline: "Blocked by Portal Shield AI Agent (19 ms)",
          detail:
            "SQL Injection authentication bypass detected in USN field. Request quarantined, IP flagged, and zero student credentials leaked.",
        });
      } else {
        onTriggerLoginAttack(sqliScenario, false);
        setFeedback({
          tone: "coral",
          headline: "UNPROTECTED BREACH: SQLi Login Bypass Succeeded!",
          detail:
            "Because the Portal Shield AI Agent is OFF, the crafted SQL tautology bypassed password verification and exposed 5,140 student records.",
        });
      }
      return;
    }

    const match = demoPortalAccounts.find(
      (acct) =>
        acct.usnOrId.toLowerCase() === trimmed.toLowerCase() ||
        acct.email.toLowerCase() === trimmed.toLowerCase()
    );

    if (match && password.trim().length >= 4) {
      setFeedback({
        tone: "teal",
        headline: `Signed in as ${match.name} (${match.usnOrId})`,
        detail: `Welcome back to BMSIT&M Portal · ${match.department}. Redirecting to your academic workspace...`,
      });
      onLoginSuccess(match);
    } else {
      setFeedback({
        tone: "coral",
        headline: "Invalid USN / Faculty ID or password",
        detail: "Use one of the synthetic BMSIT&M demo accounts on the right to sign in immediately.",
      });
    }
  };

  const runSqliBypassTest = () => {
    setIdentifier("1BY22CS041' OR '1'='1' --");
    setPassword("anything");
    if (shieldEnabled) {
      onTriggerLoginAttack(sqliScenario, true);
      setFeedback({
        tone: "teal",
        headline: "Portal Shield AI Intercepted SQLi Login Bypass (22 ms)",
        detail:
          "Autonomous WAF neutralized `' OR '1'='1' --` before hitting the student auth table. Switch Shield OFF to see what happens without protection.",
      });
    } else {
      onTriggerLoginAttack(sqliScenario, false);
      setFeedback({
        tone: "coral",
        headline: "BREACH: Unprotected Login Bypassed via SQL Injection",
        detail:
          "Without the AI agent, the portal executed the raw SQL payload and dumped student PII. Turn Portal Shield ON to block this automatically.",
      });
    }
  };

  const runBruteForceTest = () => {
    if (shieldEnabled) {
      onTriggerLoginAttack(bruteScenario, true);
      setFeedback({
        tone: "teal",
        headline: "Portal Shield AI Throttled 420 req/sec Credential Stuffing (31 ms)",
        detail:
          "Botnet fingerprint isolated and rate-limited at edge. Zero student or library accounts compromised.",
      });
    } else {
      onTriggerLoginAttack(bruteScenario, false);
      setFeedback({
        tone: "coral",
        headline: "BREACH: 40 Student & Staff Accounts Compromised",
        detail:
          "Without velocity protection, automated credential stuffing hijacked active student sessions.",
      });
    }
  };

  return (
    <div className="gd-login-layout">
      <Panel
        title="BMSIT&M Unified Portal Sign-In"
        subtitle="Authenticate with your synthetic University Seat Number (USN) or Faculty ID"
        action={
          <div className="gd-period" role="group" aria-label="Login role">
            <button
              type="button"
              aria-pressed={role === "student"}
              onClick={() => {
                setRole("student");
                setIdentifier("1BY22CS041");
                setPassword("bmsit@2026");
              }}
            >
              Student Login
            </button>
            <button
              type="button"
              aria-pressed={role === "faculty"}
              onClick={() => {
                setRole("faculty");
                setIdentifier("FAC-CSE-104");
                setPassword("admin@2026");
              }}
            >
              Faculty / Staff
            </button>
          </div>
        }
      >
        {currentUser && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 12,
              background: "color-mix(in srgb, var(--gd-teal) 12%, var(--gd-inner))",
              border: "1px solid color-mix(in srgb, var(--gd-teal) 40%, var(--gd-line))",
              marginBottom: 14,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <UserCheck size={16} color="var(--gd-teal)" aria-hidden="true" />
              <div style={{ fontSize: 11.5 }}>
                <strong>Currently signed in: {currentUser.name}</strong> ({currentUser.usnOrId})
              </div>
            </div>
            <button type="button" className="gd-secondary" onClick={onLogout}>
              Sign Out
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <div className="gd-field-group">
            <label htmlFor="bmsit-usn">
              {role === "student" ? "University Seat Number (USN) or @bmsit.in Email" : "Faculty ID or Staff Email"}
            </label>
            <input
              id="bmsit-usn"
              className="gd-text-input"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={role === "student" ? "e.g. 1BY22CS041" : "e.g. FAC-CSE-104"}
              required
            />
          </div>

          <div className="gd-field-group">
            <label htmlFor="bmsit-pwd">Portal Password</label>
            <input
              id="bmsit-pwd"
              className="gd-text-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter demo password"
              required
            />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
            <button type="submit" className="gd-primary">
              <LogIn aria-hidden="true" />
              Sign In to BMSIT&amp;M Portal
            </button>
          </div>
        </form>

        {feedback && (
          <div
            className="gd-compare-col"
            data-mode={feedback.tone === "coral" ? "without" : "with"}
            style={{ marginTop: 14 }}
            role="status"
          >
            <strong
              style={{
                fontSize: 12.5,
                color: feedback.tone === "coral" ? "var(--gd-coral)" : "var(--gd-teal)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {feedback.tone === "coral" ? (
                <AlertTriangle size={15} aria-hidden="true" />
              ) : (
                <ShieldCheck size={15} aria-hidden="true" />
              )}
              {feedback.headline}
            </strong>
            <p style={{ fontSize: 11.5, lineHeight: 1.48 }}>{feedback.detail}</p>
          </div>
        )}
      </Panel>

      <div style={{ display: "grid", gap: 12 }}>
        <Panel
          title="One-Click Synthetic Demo Accounts"
          subtitle="Select any fake student or faculty account to sign in instantly"
        >
          <div className="gd-demo-acct-grid">
            {demoPortalAccounts.map((acct) => (
              <button
                key={acct.id}
                type="button"
                className="gd-demo-acct-btn"
                onClick={() => {
                  setRole(acct.role);
                  setIdentifier(acct.usnOrId);
                  setPassword(acct.demoPassword);
                  onLoginSuccess(acct);
                }}
              >
                <div>
                  <strong>
                    {acct.name} · {acct.usnOrId}
                  </strong>
                  <small>
                    {acct.department} · {acct.subtitle}
                  </small>
                </div>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
        </Panel>

        <Panel
          title="Live Login Security Test (Track 2 Demo)"
          subtitle="Test how this login endpoint behaves WITHOUT vs. WITH the Portal Shield AI Agent"
          action={<StatusText status={shieldEnabled ? "Protected" : "Compromised"} />}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
            <button
              type="button"
              className="gd-secondary"
              onClick={() => onToggleShield(!shieldEnabled)}
            >
              {shieldEnabled ? <ShieldCheck aria-hidden="true" /> : <ShieldAlert aria-hidden="true" />}
              {shieldEnabled ? "Switch Agent OFF (Test Breach)" : "Switch Agent ON (Defend)"}
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button
              type="button"
              className={shieldEnabled ? "gd-teal-btn" : "gd-danger"}
              onClick={runSqliBypassTest}
            >
              <KeyRound aria-hidden="true" />
              Test SQLi Login Bypass
            </button>
            <button
              type="button"
              className={shieldEnabled ? "gd-teal-btn" : "gd-danger"}
              onClick={runBruteForceTest}
            >
              <ShieldAlert aria-hidden="true" />
              Test Brute-Force Burst
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
