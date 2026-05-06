"use client";

import { m, type Variants } from "framer-motion";
import { Section, SectionHeader } from "./section";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const cardEntrance: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease },
  }),
};

/* ------------------------------------------------------------------ */
/*  Mini UI Mockup Illustrations (inline SVG with CSS animations)      */
/* ------------------------------------------------------------------ */

function CrmMockup() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="h-full w-full" aria-hidden="true">
      <rect width="240" height="160" rx="8" fill="var(--color-muted)" />

      {/* Sidebar */}
      <rect x="8" y="8" width="52" height="144" rx="6" fill="var(--color-background)" />
      <rect x="16" y="20" width="28" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.7" />
      <rect x="16" y="32" width="36" height="2" rx="1" fill="var(--color-muted-foreground)" opacity="0.3" />
      <rect x="16" y="40" width="32" height="2" rx="1" fill="var(--color-muted-foreground)" opacity="0.3" />
      <rect x="16" y="48" width="36" height="2" rx="1" fill="var(--color-primary)" opacity="0.5" />
      <rect x="16" y="56" width="28" height="2" rx="1" fill="var(--color-muted-foreground)" opacity="0.3" />

      {/* Contact cards */}
      <rect x="68" y="8" width="164" height="36" rx="6" fill="var(--color-background)" />
      <circle cx="84" cy="26" r="10" fill="var(--color-primary)" opacity="0.15" />
      <circle cx="84" cy="24" r="3" fill="var(--color-primary)" opacity="0.6" />
      <rect x="80" y="29" width="8" height="4" rx="2" fill="var(--color-primary)" opacity="0.4" />
      <rect x="100" y="19" width="60" height="3" rx="1.5" fill="var(--color-foreground)" opacity="0.7" />
      <rect x="100" y="27" width="80" height="2" rx="1" fill="var(--color-muted-foreground)" opacity="0.4" />
      {/* Status badge — animated pulse */}
      <rect x="198" y="20" width="26" height="12" rx="6" fill="var(--color-primary)" opacity="0.12" />
      <rect x="204" y="24" width="14" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.7" />
      <circle cx="196" cy="14" r="3" fill="var(--color-mol-orange)" className="feat-anim-pulse" />

      <rect x="68" y="50" width="164" height="36" rx="6" fill="var(--color-background)" />
      <circle cx="84" cy="68" r="10" fill="var(--color-mol-cyan)" opacity="0.15" />
      <circle cx="84" cy="66" r="3" fill="var(--color-mol-cyan)" opacity="0.6" />
      <rect x="100" y="61" width="48" height="3" rx="1.5" fill="var(--color-foreground)" opacity="0.7" />
      <rect x="100" y="69" width="72" height="2" rx="1" fill="var(--color-muted-foreground)" opacity="0.4" />

      <rect x="68" y="92" width="164" height="36" rx="6" fill="var(--color-background)" />
      <circle cx="84" cy="110" r="10" fill="var(--color-mol-purple)" opacity="0.15" />
      <circle cx="84" cy="108" r="3" fill="var(--color-mol-purple)" opacity="0.6" />
      <rect x="100" y="103" width="56" height="3" rx="1.5" fill="var(--color-foreground)" opacity="0.7" />
      <rect x="100" y="111" width="68" height="2" rx="1" fill="var(--color-muted-foreground)" opacity="0.4" />

      {/* Floating action button — animated float */}
      <circle cx="218" cy="140" r="12" fill="var(--color-primary)" className="feat-anim-float" />
      <rect x="214" y="138" width="8" height="2" rx="1" fill="white" />
      <rect x="217" y="135" width="2" height="8" rx="1" fill="white" />
    </svg>
  );
}

function ContentCalendarMockup() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="h-full w-full" aria-hidden="true">
      <rect width="240" height="160" rx="8" fill="var(--color-muted)" />

      {/* Calendar header */}
      <rect x="8" y="8" width="224" height="24" rx="6" fill="var(--color-background)" />
      <rect x="16" y="16" width="48" height="4" rx="2" fill="var(--color-foreground)" opacity="0.7" />
      <rect x="190" y="14" width="8" height="8" rx="2" fill="var(--color-primary)" opacity="0.2" />
      <rect x="206" y="14" width="8" height="8" rx="2" fill="var(--color-primary)" opacity="0.2" />

      {/* Day labels */}
      {["M", "T", "W", "T", "F", "S", "S"].map((_, i) => (
        <rect key={i} x={16 + i * 31} y="40" width="12" height="3" rx="1.5" fill="var(--color-muted-foreground)" opacity="0.4" />
      ))}

      {/* Calendar grid */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => {
          const idx = row * 7 + col;
          const hasEvent = [3, 8, 11, 15, 19, 22, 26, 30].includes(idx);
          const isHighlight = [8, 15, 22].includes(idx);
          return (
            <g key={idx}>
              <rect
                x={12 + col * 31}
                y={50 + row * 20}
                width="26"
                height="16"
                rx="3"
                fill={isHighlight ? "var(--color-primary)" : hasEvent ? "var(--color-mol-cyan)" : "var(--color-background)"}
                opacity={isHighlight ? 0.15 : hasEvent ? 0.12 : 1}
              />
              {hasEvent && (
                <rect
                  x={16 + col * 31}
                  y={56 + row * 20}
                  width="14"
                  height="2"
                  rx="1"
                  fill={isHighlight ? "var(--color-primary)" : "var(--color-mol-cyan)"}
                  opacity="0.7"
                  className={isHighlight ? "feat-anim-pulse" : ""}
                />
              )}
            </g>
          );
        })
      )}
    </svg>
  );
}

function LeadFunnelMockup() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="h-full w-full" aria-hidden="true">
      <rect width="240" height="160" rx="8" fill="var(--color-muted)" />

      {/* Stage 1 — Awareness */}
      <rect x="24" y="12" width="192" height="26" rx="4" fill="var(--color-primary)" opacity="0.12" />
      <rect x="32" y="18" width="44" height="3.5" rx="1.5" fill="var(--color-primary)" opacity="0.7" />
      <text x="32" y="30" fontSize="5" fill="var(--color-primary)" opacity="0.5" fontFamily="system-ui">Awareness</text>
      {/* Lead count badge */}
      <rect x="180" y="16" width="28" height="14" rx="7" fill="var(--color-primary)" opacity="0.18" />
      <text x="188" y="26" fontSize="6" fill="var(--color-primary)" opacity="0.8" fontFamily="system-ui" fontWeight="bold">2,400</text>
      {/* Animated flow indicator */}
      <circle cx="120" cy="40" r="2" fill="var(--color-primary)" className="feat-anim-slide-down" />

      {/* Stage 2 — Interest */}
      <rect x="38" y="44" width="164" height="26" rx="4" fill="var(--color-mol-cyan)" opacity="0.12" />
      <rect x="46" y="50" width="38" height="3.5" rx="1.5" fill="var(--color-mol-cyan)" opacity="0.7" />
      <text x="46" y="62" fontSize="5" fill="var(--color-mol-cyan)" opacity="0.5" fontFamily="system-ui">Interest</text>
      {/* Lead count badge */}
      <rect x="168" y="48" width="26" height="14" rx="7" fill="var(--color-mol-cyan)" opacity="0.18" />
      <text x="175" y="58" fontSize="6" fill="var(--color-mol-cyan)" opacity="0.8" fontFamily="system-ui" fontWeight="bold">1,180</text>
      {/* Conversion rate */}
      <text x="200" y="58" fontSize="5" fill="var(--color-muted-foreground)" opacity="0.6" fontFamily="system-ui">49%</text>
      <circle cx="120" cy="72" r="2" fill="var(--color-mol-cyan)" className="feat-anim-slide-down" style={{ animationDelay: "0.3s" }} />

      {/* Stage 3 — Consideration */}
      <rect x="52" y="76" width="136" height="26" rx="4" fill="var(--color-mol-purple)" opacity="0.12" />
      <rect x="60" y="82" width="44" height="3.5" rx="1.5" fill="var(--color-mol-purple)" opacity="0.7" />
      <text x="60" y="94" fontSize="5" fill="var(--color-mol-purple)" opacity="0.5" fontFamily="system-ui">Consideration</text>
      {/* Lead count badge */}
      <rect x="156" y="80" width="24" height="14" rx="7" fill="var(--color-mol-purple)" opacity="0.18" />
      <text x="163" y="90" fontSize="6" fill="var(--color-mol-purple)" opacity="0.8" fontFamily="system-ui" fontWeight="bold">540</text>
      <text x="184" y="90" fontSize="5" fill="var(--color-muted-foreground)" opacity="0.6" fontFamily="system-ui">46%</text>
      <circle cx="120" cy="104" r="2" fill="var(--color-mol-purple)" className="feat-anim-slide-down" style={{ animationDelay: "0.6s" }} />

      {/* Stage 4 — Intent */}
      <rect x="66" y="108" width="108" height="22" rx="4" fill="var(--color-mol-orange)" opacity="0.12" />
      <rect x="74" y="114" width="32" height="3.5" rx="1.5" fill="var(--color-mol-orange)" opacity="0.7" />
      <text x="74" y="124" fontSize="5" fill="var(--color-mol-orange)" opacity="0.5" fontFamily="system-ui">Intent</text>
      <rect x="142" y="112" width="24" height="12" rx="6" fill="var(--color-mol-orange)" opacity="0.18" />
      <text x="149" y="120" fontSize="5.5" fill="var(--color-mol-orange)" opacity="0.8" fontFamily="system-ui" fontWeight="bold">210</text>
      <text x="170" y="120" fontSize="5" fill="var(--color-muted-foreground)" opacity="0.6" fontFamily="system-ui">39%</text>

      {/* Stage 5 — Closed/Won */}
      <rect x="82" y="134" width="76" height="18" rx="4" fill="var(--color-primary)" opacity="0.2" />
      <rect x="90" y="140" width="24" height="3.5" rx="1.5" fill="var(--color-primary)" opacity="0.8" />
      <text x="118" y="146" fontSize="6" fill="var(--color-primary)" opacity="0.9" fontFamily="system-ui" fontWeight="bold">86</text>
      {/* Pulsing success indicator */}
      <circle cx="148" cy="143" r="3" fill="var(--color-success)" opacity="0.7" className="feat-anim-pulse" />
    </svg>
  );
}

function AnalyticsMockup() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="h-full w-full" aria-hidden="true">
      <rect width="240" height="160" rx="8" fill="var(--color-muted)" />

      {/* Mini stat cards with labels */}
      <rect x="8" y="8" width="72" height="36" rx="6" fill="var(--color-background)" />
      <text x="16" y="18" fontSize="4.5" fill="var(--color-muted-foreground)" opacity="0.6" fontFamily="system-ui">Conversion</text>
      <text x="16" y="30" fontSize="9" fill="var(--color-primary)" opacity="0.85" fontFamily="system-ui" fontWeight="bold">4.2%</text>
      {/* Trend indicator */}
      <polygon points="62,28 66,22 70,28" fill="var(--color-success)" opacity="0.7" />

      <rect x="84" y="8" width="72" height="36" rx="6" fill="var(--color-background)" />
      <text x="92" y="18" fontSize="4.5" fill="var(--color-muted-foreground)" opacity="0.6" fontFamily="system-ui">CAC</text>
      <text x="92" y="30" fontSize="9" fill="var(--color-mol-cyan)" opacity="0.85" fontFamily="system-ui" fontWeight="bold">K82</text>
      <polygon points="138,28 142,22 146,28" fill="var(--color-success)" opacity="0.7" />

      <rect x="160" y="8" width="72" height="36" rx="6" fill="var(--color-background)" />
      <text x="168" y="18" fontSize="4.5" fill="var(--color-muted-foreground)" opacity="0.6" fontFamily="system-ui">Pipeline</text>
      <text x="168" y="30" fontSize="9" fill="var(--color-mol-purple)" opacity="0.85" fontFamily="system-ui" fontWeight="bold">K1.2M</text>
      {/* Animated ping on pipeline value */}
      <circle cx="220" cy="24" r="3" fill="var(--color-mol-purple)" opacity="0.5" className="feat-anim-ping" />

      {/* Chart area */}
      <rect x="8" y="52" width="224" height="100" rx="6" fill="var(--color-background)" />

      {/* Grid lines */}
      {[80, 100, 120, 140].map((y) => (
        <line key={y} x1="16" y1={y} x2="224" y2={y} stroke="var(--color-border)" strokeWidth="0.5" opacity="0.4" />
      ))}

      {/* Y-axis labels */}
      <text x="14" y="82" fontSize="4" fill="var(--color-muted-foreground)" opacity="0.4" fontFamily="system-ui" textAnchor="end">400</text>
      <text x="14" y="102" fontSize="4" fill="var(--color-muted-foreground)" opacity="0.4" fontFamily="system-ui" textAnchor="end">300</text>
      <text x="14" y="122" fontSize="4" fill="var(--color-muted-foreground)" opacity="0.4" fontFamily="system-ui" textAnchor="end">200</text>
      <text x="14" y="142" fontSize="4" fill="var(--color-muted-foreground)" opacity="0.4" fontFamily="system-ui" textAnchor="end">100</text>

      {/* Primary trend line — animated draw */}
      <polyline
        points="24,130 50,118 76,122 102,100 128,90 154,95 180,72 210,65"
        stroke="var(--color-primary)"
        strokeWidth="2"
        fill="none"
        opacity="0.8"
        className="feat-anim-draw"
      />
      {/* Area fill */}
      <polygon
        points="24,130 50,118 76,122 102,100 128,90 154,95 180,72 210,65 210,144 24,144"
        fill="var(--color-primary)"
        opacity="0.06"
      />

      {/* Secondary trend line (previous period) */}
      <polyline
        points="24,136 50,130 76,132 102,120 128,114 154,118 180,100 210,95"
        stroke="var(--color-mol-cyan)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
        opacity="0.5"
      />

      {/* Data points on primary line — animated pulse */}
      {[
        [24, 130], [50, 118], [76, 122], [102, 100], [128, 90], [154, 95], [180, 72], [210, 65]
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="2.5"
          fill="var(--color-primary)"
          opacity="0.7"
          className={i === 7 ? "feat-anim-pulse" : ""}
        />
      ))}

      {/* Legend */}
      <rect x="24" y="56" width="4" height="4" rx="1" fill="var(--color-primary)" opacity="0.8" />
      <text x="31" y="60" fontSize="4.5" fill="var(--color-muted-foreground)" opacity="0.6" fontFamily="system-ui">This month</text>
      <rect x="72" y="56" width="4" height="4" rx="1" fill="var(--color-mol-cyan)" opacity="0.6" />
      <text x="79" y="60" fontSize="4.5" fill="var(--color-muted-foreground)" opacity="0.6" fontFamily="system-ui">Last month</text>
    </svg>
  );
}

function AutomationMockup() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="h-full w-full" aria-hidden="true">
      <rect width="240" height="160" rx="8" fill="var(--color-muted)" />

      {/* Trigger node */}
      <rect x="84" y="8" width="72" height="24" rx="12" fill="var(--color-primary)" opacity="0.15" />
      <circle cx="96" cy="20" r="4" fill="var(--color-primary)" opacity="0.6" />
      <text x="106" y="22" fontSize="5.5" fill="var(--color-primary)" opacity="0.8" fontFamily="system-ui" fontWeight="600">New Lead</text>
      {/* Status dot — active */}
      <circle cx="150" cy="14" r="2.5" fill="var(--color-success)" opacity="0.8" className="feat-anim-pulse" />

      {/* Connector line with flow animation */}
      <line x1="120" y1="32" x2="120" y2="48" stroke="var(--color-border)" strokeWidth="1.5" className="feat-anim-connector" />
      <polygon points="116,46 120,52 124,46" fill="var(--color-border)" />
      {/* Flow dot */}
      <circle cx="120" cy="40" r="2" fill="var(--color-primary)" className="feat-anim-slide-down" />

      {/* Condition diamond */}
      <polygon points="120,54 148,70 120,86 92,70" fill="var(--color-mol-cyan)" stroke="var(--color-mol-cyan)" strokeWidth="1" opacity="0.15" />
      <text x="106" y="72" fontSize="5" fill="var(--color-mol-cyan)" opacity="0.8" fontFamily="system-ui" fontWeight="500">Score ≥ 80?</text>

      {/* Yes branch */}
      <line x1="148" y1="70" x2="180" y2="70" stroke="var(--color-border)" strokeWidth="1.5" className="feat-anim-connector" />
      <text x="154" y="66" fontSize="4" fill="var(--color-success)" opacity="0.7" fontFamily="system-ui">Yes</text>
      <rect x="180" y="58" width="52" height="24" rx="6" fill="var(--color-mol-purple)" opacity="0.12" />
      <text x="189" y="72" fontSize="5" fill="var(--color-mol-purple)" opacity="0.8" fontFamily="system-ui" fontWeight="500">Assign Rep</text>

      {/* No branch */}
      <line x1="92" y1="70" x2="60" y2="70" stroke="var(--color-border)" strokeWidth="1.5" className="feat-anim-connector" />
      <text x="66" y="66" fontSize="4" fill="var(--color-mol-orange)" opacity="0.7" fontFamily="system-ui">No</text>
      <rect x="8" y="58" width="52" height="24" rx="6" fill="var(--color-mol-orange)" opacity="0.12" />
      <text x="14" y="72" fontSize="5" fill="var(--color-mol-orange)" opacity="0.8" fontFamily="system-ui" fontWeight="500">Nurture Seq</text>

      {/* Merge connector */}
      <line x1="120" y1="86" x2="120" y2="100" stroke="var(--color-border)" strokeWidth="1.5" className="feat-anim-connector" />
      <polygon points="116,98 120,104 124,98" fill="var(--color-border)" />

      {/* Action node — send email */}
      <rect x="72" y="106" width="96" height="28" rx="6" fill="var(--color-primary)" opacity="0.12" />
      <circle cx="88" cy="120" r="5" fill="var(--color-primary)" opacity="0.4" />
      {/* Email icon */}
      <rect x="84" y="118" width="8" height="5" rx="1" fill="none" stroke="var(--color-primary)" strokeWidth="0.8" opacity="0.8" />
      <polyline points="84,118 88,121 92,118" fill="none" stroke="var(--color-primary)" strokeWidth="0.6" opacity="0.8" />
      <text x="100" y="118" fontSize="5" fill="var(--color-primary)" opacity="0.8" fontFamily="system-ui" fontWeight="500">Send Follow-up</text>
      <text x="100" y="126" fontSize="4" fill="var(--color-muted-foreground)" opacity="0.5" fontFamily="system-ui">After 24h delay</text>

      {/* Execution counter */}
      <rect x="172" y="140" width="60" height="14" rx="7" fill="var(--color-background)" />
      <circle cx="182" cy="147" r="3" fill="var(--color-success)" opacity="0.6" className="feat-anim-pulse" />
      <text x="188" y="149" fontSize="4.5" fill="var(--color-muted-foreground)" opacity="0.7" fontFamily="system-ui">342 runs today</text>
    </svg>
  );
}

function ReportingMockup() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="h-full w-full" aria-hidden="true">
      <rect width="240" height="160" rx="8" fill="var(--color-muted)" />

      {/* Report header */}
      <rect x="8" y="8" width="224" height="28" rx="6" fill="var(--color-background)" />
      <rect x="16" y="16" width="64" height="5" rx="2" fill="var(--color-foreground)" opacity="0.7" />
      <rect x="16" y="25" width="40" height="3" rx="1.5" fill="var(--color-muted-foreground)" opacity="0.3" />
      <rect x="180" y="16" width="40" height="12" rx="6" fill="var(--color-primary)" opacity="0.12" />
      <rect x="188" y="20" width="24" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.7" />

      {/* Bar chart */}
      <rect x="8" y="44" width="140" height="108" rx="6" fill="var(--color-background)" />
      {[
        { h: 60, o: 0.6 },
        { h: 44, o: 0.4 },
        { h: 72, o: 0.7 },
        { h: 52, o: 0.5 },
        { h: 80, o: 0.8 },
        { h: 36, o: 0.35 },
      ].map((bar, i) => (
        <rect
          key={i}
          x={20 + i * 20}
          y={140 - bar.h}
          width="12"
          height={bar.h}
          rx="2"
          fill="var(--color-primary)"
          opacity={bar.o}
          className="feat-anim-grow"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}

      {/* Donut chart */}
      <rect x="156" y="44" width="76" height="108" rx="6" fill="var(--color-background)" />
      <circle cx="194" cy="86" r="28" fill="none" stroke="var(--color-primary)" strokeWidth="8" opacity="0.15" />
      <circle
        cx="194"
        cy="86"
        r="28"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="8"
        strokeDasharray="110 66"
        strokeDashoffset="0"
        opacity="0.7"
        strokeLinecap="round"
        className="feat-anim-rotate"
      />
      <circle
        cx="194"
        cy="86"
        r="28"
        fill="none"
        stroke="var(--color-mol-cyan)"
        strokeWidth="8"
        strokeDasharray="44 132"
        strokeDashoffset="-110"
        opacity="0.6"
        strokeLinecap="round"
        className="feat-anim-rotate"
      />

      {/* Legend dots */}
      <circle cx="172" cy="130" r="3" fill="var(--color-primary)" opacity="0.7" />
      <rect x="180" y="128" width="20" height="3" rx="1.5" fill="var(--color-muted-foreground)" opacity="0.4" />
      <circle cx="172" cy="140" r="3" fill="var(--color-mol-cyan)" opacity="0.6" />
      <rect x="180" y="138" width="16" height="3" rx="1.5" fill="var(--color-muted-foreground)" opacity="0.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature Cards Data                                                  */
/* ------------------------------------------------------------------ */

const features = [
  {
    title: "CRM & Lead Management",
    description: "Centralise every lead, track every touchpoint, and never let a prospect slip through the cracks.",
    Illustration: CrmMockup,
  },
  {
    title: "Content Calendar",
    description: "Plan, schedule, and publish content across all channels from a single source of truth.",
    Illustration: ContentCalendarMockup,
  },
  {
    title: "Lead Funnel Builder",
    description: "Visualise your pipeline from first touch to closed deal — with real-time conversion rates at every stage so you see exactly where leads drop off and why.",
    Illustration: LeadFunnelMockup,
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time metrics that matter — conversion rates, CAC, pipeline velocity, and ROI at a glance. Compare periods, spot trends, and make data-driven decisions fast.",
    Illustration: AnalyticsMockup,
  },
  {
    title: "Workflow Automation",
    description: "Automate follow-ups, lead scoring, and handoffs with intelligent triggers. Your team focuses on closing while the system handles nurturing and routing.",
    Illustration: AutomationMockup,
  },
  {
    title: "Executive Reporting",
    description: "Monthly reports your board will actually read. Clear data, actionable insights, zero fluff.",
    Illustration: ReportingMockup,
  },
];

/* ------------------------------------------------------------------ */
/*  Exported Component                                                  */
/* ------------------------------------------------------------------ */

export function FeaturesGrid() {
  return (
    <Section size="lg" background="muted">
      <div className="mb-12 sm:mb-16">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          The tools behind your{" "}
          <span className="text-primary">growth system</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Every engagement includes a full digital infrastructure — not a patchwork of disconnected tools.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <m.div
            key={feature.title}
            custom={i}
            variants={cardEntrance}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="group relative overflow-hidden rounded-xl border border-border/40 bg-background transition-shadow hover:shadow-lg"
          >
            {/* Mini UI mockup illustration */}
            <div className="relative overflow-hidden bg-muted/50 p-4">
              <div className="aspect-[3/2] overflow-hidden rounded-lg">
                <feature.Illustration />
              </div>
            </div>

            {/* Text content */}
            <div className="p-5">
              <h3 className="font-display text-base font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </m.div>
        ))}
      </div>
    </Section>
  );
}
