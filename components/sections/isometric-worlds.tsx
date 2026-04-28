"use client";

import { m, type Variants } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const worldEntrance: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay: i * 0.2, ease },
  }),
};

/** Continuous ambient float — each card bobs gently on its own cycle */
const ambientFloat = (i: number): Variants => ({
  float: {
    y: [0, -6, 0],
    transition: {
      duration: 4 + i * 0.7,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.5,
    },
  },
});

/* ------------------------------------------------------------------ */
/*  Brand Palette Constants                                            */
/* ------------------------------------------------------------------ */

const BRAND = {
  navy: "#101a40",
  navyLight: "#141c3a",
  navyDark: "#080e24",
  blue: "#1A6BFF",
  purple: "#b06cc8",
  cyan: "#6dd5ea",
  yellow: "#ecd04a",
  orange: "#e07848",
  orangeDark: "#c45e38",
  teal: "#127a90",
  green: "#10b981",
} as const;

/* ------------------------------------------------------------------ */
/*  Shared isometric helpers                                           */
/* ------------------------------------------------------------------ */

/** Standard isometric diamond base */
function IsoPlatform({
  cx,
  cy,
  w,
  h,
  fill,
  stroke,
  depth = 18,
  depthFill,
}: {
  cx: number;
  cy: number;
  w: number;
  h: number;
  fill: string;
  stroke: string;
  depth?: number;
  depthFill?: string;
}) {
  const hw = w / 2;
  const hh = h / 2;
  return (
    <g>
      {/* Left face */}
      <path
        d={`M${cx - hw} ${cy} L${cx - hw} ${cy + depth} L${cx} ${cy + hh + depth} L${cx} ${cy + hh} Z`}
        fill={depthFill ?? fill}
        stroke={stroke}
        strokeWidth="0.8"
        opacity="0.7"
      />
      {/* Right face */}
      <path
        d={`M${cx + hw} ${cy} L${cx + hw} ${cy + depth} L${cx} ${cy + hh + depth} L${cx} ${cy + hh} Z`}
        fill={depthFill ?? fill}
        stroke={stroke}
        strokeWidth="0.8"
        opacity="0.85"
      />
      {/* Top face */}
      <path
        d={`M${cx} ${cy - hh} L${cx + hw} ${cy} L${cx} ${cy + hh} L${cx - hw} ${cy} Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth="1"
      />
    </g>
  );
}

/** Isometric box/building */
function IsoBox({
  x,
  y,
  w,
  d,
  h,
  fill,
  fillLeft,
  fillRight,
  stroke,
  children,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  fill: string;
  fillLeft?: string;
  fillRight?: string;
  stroke: string;
  children?: React.ReactNode;
}) {
  // Isometric projection: x-axis goes right-down, y-axis goes left-down, z goes up
  const hw = w / 2;
  const hd = d / 2;
  return (
    <g>
      {/* Left face */}
      <path
        d={`M${x - hw} ${y} L${x - hw} ${y - h} L${x} ${y - h + hd} L${x} ${y + hd} Z`}
        fill={fillLeft ?? fill}
        stroke={stroke}
        strokeWidth="0.6"
        opacity="0.8"
      />
      {/* Right face */}
      <path
        d={`M${x + hw} ${y} L${x + hw} ${y - h} L${x} ${y - h + hd} L${x} ${y + hd} Z`}
        fill={fillRight ?? fill}
        stroke={stroke}
        strokeWidth="0.6"
        opacity="0.9"
      />
      {/* Top face */}
      <path
        d={`M${x} ${y - h - hd} L${x + hw} ${y - h} L${x} ${y - h + hd} L${x - hw} ${y - h} Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth="0.8"
      />
      {children}
    </g>
  );
}

/** Tiny isometric person silhouette */
function IsoPerson({ x, y, color = BRAND.navy }: { x: number; y: number; color?: string }) {
  return (
    <g>
      <circle cx={x} cy={y - 5} r="1.8" fill={color} />
      <path d={`M${x} ${y - 3} L${x - 1.5} ${y + 1} L${x + 1.5} ${y + 1} Z`} fill={color} />
      <line x1={x} y1={y + 1} x2={x} y2={y + 4} stroke={color} strokeWidth="0.8" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  WORLD 1: Web Development (Navy + cyan + purple)                    */
/* ------------------------------------------------------------------ */

function WebDevWorld() {
  return (
    <svg viewBox="0 0 520 440" fill="none" className="h-full w-full" aria-label="Web Development isometric world">
      {/* Main platform */}
      <IsoPlatform cx={260} cy={300} w={460} h={270} fill={BRAND.navy} stroke={BRAND.cyan} depth={20} depthFill={BRAND.navyDark} />

      {/* Grid lines on platform */}
      {[...Array(6)].map((_, i) => (
        <line key={`gl${i}`} x1={80 + i * 60} y1={170 + i * 5} x2={130 + i * 60} y2={420 - i * 10}
          stroke={BRAND.cyan} strokeWidth="0.5" opacity="0.25" />
      ))}

      {/* Large monitor/screen building (back-left) */}
      <IsoBox x={160} y={260} w={100} d={30} h={120} fill={BRAND.navyLight} fillLeft={BRAND.navyDark} fillRight={BRAND.navy} stroke={BRAND.cyan}>
        {/* Screen face */}
        <rect x={113} y={153} width={45} height={60} rx={2} fill={BRAND.navyDark} stroke={BRAND.cyan} strokeWidth="1"
          transform="skewY(15)" />
      </IsoBox>
      {/* CSS label on monitor */}
      <text x={145} y={185} fill={BRAND.cyan} fontFamily="monospace" fontSize="11" fontWeight="bold"
        transform="skewY(15) translate(-30,-35)">CSS</text>
      {/* JS label */}
      <text x={105} y={235} fill={BRAND.yellow} fontFamily="monospace" fontSize="9" fontWeight="bold" opacity="0.7"
        transform="skewY(-15) translate(50,10)">JS</text>

      {/* HTML capsule (glowing) — left side */}
      <m.g
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx={78} cy={215} rx={14} ry={30} fill="none" stroke={BRAND.orange} strokeWidth="1.5" opacity="0.8" />
        <ellipse cx={78} cy={215} rx={10} ry={24} fill={BRAND.navyDark} stroke={BRAND.orange} strokeWidth="1" />
        <text x={66} y={210} fill={BRAND.orange} fontFamily="monospace" fontSize="7" fontWeight="bold">H</text>
        <text x={73} y={218} fill={BRAND.orange} fontFamily="monospace" fontSize="7" fontWeight="bold">T</text>
        <text x={66} y={226} fill={BRAND.orange} fontFamily="monospace" fontSize="7" fontWeight="bold">ML</text>
        {/* Glow */}
        <ellipse cx={78} cy={215} rx={18} ry={34} fill="url(#htmlGlow)" opacity="0.5" />
      </m.g>

      {/* Code bracket icons */}
      <text x={120} y={270} fill={BRAND.cyan} fontFamily="monospace" fontSize="14" opacity="0.5">&lt;/&gt;</text>

      {/* Smaller building right */}
      <IsoBox x={340} y={270} w={60} d={24} h={65} fill={BRAND.navyLight} fillLeft={BRAND.navyDark} fillRight={BRAND.navy} stroke={BRAND.cyan} />
      {/* Server rack details */}
      {[0, 8, 16, 24].map((i) => (
        <rect key={`srv${i}`} x={315} y={218 + i} width={22} height={4} rx={1}
          fill={BRAND.navyLight} stroke={BRAND.cyan} strokeWidth="0.5" transform="skewY(15)" />
      ))}

      {/* WiFi signal (animated) */}
      <m.g
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {[12, 20, 28].map((r, i) => (
          <path
            key={`wifi${i}`}
            d={`M${260 - r} ${260 - r * 0.5} Q${260} ${260 - r * 1.2} ${260 + r} ${260 - r * 0.5}`}
            fill="none"
            stroke={BRAND.purple}
            strokeWidth="1.5"
            opacity={0.4 + i * 0.2}
          />
        ))}
        <circle cx={260} cy={265} r={3} fill={BRAND.purple} />
      </m.g>

      {/* Satellite dish */}
      <path d="M400 235 Q415 215 430 235" fill="none" stroke={BRAND.cyan} strokeWidth="1.5" />
      <line x1={415} y1={225} x2={415} y2={250} stroke={BRAND.cyan} strokeWidth="1" />
      <circle cx={415} cy={225} r={2} fill={BRAND.yellow} />

      {/* Terminal text box */}
      <rect x={280} y={295} width={65} height={16} rx={2} fill={BRAND.navyDark} stroke={BRAND.cyan} strokeWidth="1" />
      <text x={287} y={307} fill={BRAND.cyan} fontFamily="monospace" fontSize="7" opacity="0.7">npm run_</text>

      {/* Cursor arrow */}
      <m.g
        animate={{ x: [0, 4, 0], y: [0, 3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M130 275 L130 290 L136 285 L142 292 L145 289 L139 282 L145 280 Z"
          fill={BRAND.cyan} stroke={BRAND.teal} strokeWidth="0.5" />
      </m.g>

      {/* Small people */}
      <IsoPerson x={200} y={300} color={BRAND.teal} />
      <IsoPerson x={310} y={315} color={BRAND.teal} />
      <IsoPerson x={370} y={310} color={BRAND.teal} />

      {/* Purple glowing orbs */}
      {[[240, 345], [280, 360], [320, 355], [255, 370]].map(([cx, cy], i) => (
        <m.g key={`orb${i}`}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <circle cx={cx} cy={cy} r={6} fill={BRAND.purple} opacity="0.4" />
          <circle cx={cx} cy={cy} r={3} fill={BRAND.purple} opacity="0.8" />
          <circle cx={cx} cy={cy} r={10} fill="url(#purpleGlow)" opacity="0.3" />
        </m.g>
      ))}

      {/* Floating drone (animated) */}
      <m.g
        animate={{ x: [0, 15, 0], y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x={285} y={135} width={18} height={6} rx={2} fill={BRAND.navyLight} stroke={BRAND.cyan} strokeWidth="1" />
        <line x1={280} y1={138} x2={285} y2={138} stroke={BRAND.cyan} strokeWidth="1" />
        <line x1={303} y1={138} x2={308} y2={138} stroke={BRAND.cyan} strokeWidth="1" />
        {/* Propellers */}
        <m.line x1={276} y1={137} x2={284} y2={139} stroke={BRAND.cyan} strokeWidth="1"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "280px 138px" }}
        />
        <m.line x1={304} y1={137} x2={312} y2={139} stroke={BRAND.cyan} strokeWidth="1"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "308px 138px" }}
        />
        {/* Green glow beneath drone */}
        <circle cx={294} cy={148} r={12} fill={BRAND.green} opacity="0.15" />
      </m.g>

      {/* Clouds */}
      <g opacity="0.15">
        <ellipse cx={400} cy={155} rx={18} ry={7} fill={BRAND.cyan} />
        <ellipse cx={390} cy={155} rx={10} ry={5} fill={BRAND.cyan} />
        <ellipse cx={435} cy={165} rx={12} ry={5} fill={BRAND.cyan} />
      </g>

      <defs>
        <radialGradient id="htmlGlow">
          <stop offset="0%" stopColor={BRAND.orange} stopOpacity="0.4" />
          <stop offset="100%" stopColor={BRAND.orange} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="purpleGlow">
          <stop offset="0%" stopColor={BRAND.purple} stopOpacity="0.6" />
          <stop offset="100%" stopColor={BRAND.purple} stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  WORLD 2: AI Automation (Deep navy + brand-blue theme)              */
/* ------------------------------------------------------------------ */

function AiAutomationWorld() {
  return (
    <svg viewBox="0 0 520 440" fill="none" className="h-full w-full" aria-label="AI Automation isometric world">
      <IsoPlatform cx={260} cy={300} w={460} h={270} fill={BRAND.navy} stroke={BRAND.blue} depth={20} depthFill={BRAND.navyDark} />

      {/* Grid */}
      {[...Array(6)].map((_, i) => (
        <line key={`ag${i}`} x1={80 + i * 60} y1={170 + i * 5} x2={130 + i * 60} y2={420 - i * 10}
          stroke={BRAND.blue} strokeWidth="0.5" opacity="0.25" />
      ))}

      {/* Central AI brain / neural hub */}
      <m.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Outer ring */}
        <m.circle cx={260} cy={210} r={52} fill="none" stroke={BRAND.blue} strokeWidth="1.5" opacity="0.4"
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "260px 210px" }}
        />
        {/* Inner shell */}
        <circle cx={260} cy={210} r={38} fill={BRAND.navyDark} stroke={BRAND.blue} strokeWidth="2" />
        {/* Brain circuitry pattern */}
        <path d="M242 210 Q248 196 260 198 Q272 196 278 210" fill="none" stroke={BRAND.cyan} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M242 210 Q248 224 260 222 Q272 224 278 210" fill="none" stroke={BRAND.cyan} strokeWidth="1.5" strokeLinecap="round" />
        {/* Central dot */}
        <circle cx={260} cy={210} r={4} fill={BRAND.blue} />
        {/* Neural nodes around brain */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const nx = Math.round(260 + 44 * Math.cos(rad));
          const ny = Math.round(210 + 44 * Math.sin(rad));
          return (
            <m.circle key={`nn${angle}`} cx={nx} cy={ny} r={3} fill={BRAND.cyan}
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: angle / 360 }}
              style={{ transformOrigin: `${nx}px ${ny}px` }}
            />
          );
        })}
      </m.g>

      {/* Workflow pipeline — left side */}
      <IsoBox x={130} y={275} w={60} d={20} h={70} fill={BRAND.navyLight} fillLeft={BRAND.navyDark} fillRight={BRAND.navy} stroke={BRAND.blue} />
      {/* Pipeline lights */}
      {[0, 14, 28, 42].map((i) => (
        <m.rect key={`pl${i}`} x={106} y={214 + i} width={10} height={6} rx={1}
          fill={BRAND.blue} opacity="0.6"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
        />
      ))}

      {/* Automation conveyor — right side */}
      <IsoBox x={390} y={270} w={55} d={18} h={60} fill={BRAND.navyLight} fillLeft={BRAND.navyDark} fillRight={BRAND.navy} stroke={BRAND.blue} />
      {/* Conveyor belt dots */}
      {[0, 1, 2, 3].map((i) => (
        <m.circle key={`cb${i}`} cx={372 + i * 12} cy={250 - i * 4} r={3}
          fill={BRAND.yellow}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
        />
      ))}

      {/* Data flow lines from pipeline → brain → conveyor */}
      <m.path d="M160 240 Q210 220 240 215" fill="none" stroke={BRAND.blue} strokeWidth="1" strokeDasharray="4 4" opacity="0.5"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <m.path d="M280 215 Q320 220 365 240" fill="none" stroke={BRAND.blue} strokeWidth="1" strokeDasharray="4 4" opacity="0.5"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating status pills */}
      {[
        { x: 88, y: 305, text: "QUALIFY" },
        { x: 370, y: 310, text: "ROUTE" },
        { x: 220, y: 345, text: "AUTOMATE" },
      ].map((pill, i) => (
        <m.g key={`apill${i}`}
          animate={{ y: [0, -3, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        >
          <rect x={pill.x} y={pill.y} width={58} height={14} rx={7} fill={BRAND.blue} opacity="0.5" />
          <text x={pill.x + 6} y={pill.y + 10} fill={BRAND.cyan} fontFamily="monospace" fontSize="6">{pill.text}</text>
        </m.g>
      ))}

      {/* Small lightning bolt — automation symbol */}
      <m.g
        animate={{ opacity: [0.5, 1, 0.5], y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M255 155 L262 145 L258 155 L265 155 L258 168 L262 158 L255 158 Z"
          fill={BRAND.yellow} stroke={BRAND.yellow} strokeWidth="0.5" strokeLinejoin="round" />
      </m.g>

      {/* Gear (small, top-right) */}
      <m.g
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "410px 180px" }}
      >
        <circle cx={410} cy={180} r={16} fill="none" stroke={BRAND.purple} strokeWidth="1.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect key={`agt${angle}`} x={408} y={162} width={4} height={6} rx={1}
            fill={BRAND.purple} transform={`rotate(${angle}, 410, 180)`} />
        ))}
        <circle cx={410} cy={180} r={6} fill={BRAND.navyDark} stroke={BRAND.purple} strokeWidth="1" />
      </m.g>

      {/* Upward efficiency arrow */}
      <m.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M450 260 L450 230 L442 242 M450 230 L458 242"
          fill="none" stroke={BRAND.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </m.g>

      {/* Small people */}
      <IsoPerson x={210} y={315} color={BRAND.blue} />
      <IsoPerson x={310} y={325} color={BRAND.blue} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  WORLD 3: Digital Marketing (Orange + yellow warm theme)            */
/* ------------------------------------------------------------------ */

function MarketingWorld() {
  return (
    <svg viewBox="0 0 520 440" fill="none" className="h-full w-full" aria-label="Digital Marketing isometric world">
      <IsoPlatform cx={260} cy={300} w={460} h={270} fill={BRAND.orange} stroke={BRAND.navy} depth={20} depthFill={BRAND.orangeDark} />

      {/* Grid pattern */}
      {[...Array(6)].map((_, i) => (
        <line key={`mg${i}`} x1={80 + i * 60} y1={170 + i * 5} x2={130 + i * 60} y2={420 - i * 10}
          stroke={BRAND.navy} strokeWidth="0.5" opacity="0.25" />
      ))}

      {/* Globe/sphere wireframe */}
      <m.g
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "310px 200px" }}
      >
        <circle cx={310} cy={200} r={60} fill={BRAND.yellow} opacity="0.2" />
        <circle cx={310} cy={200} r={60} fill="none" stroke={BRAND.navy} strokeWidth="1" />
        {/* Longitude lines */}
        <ellipse cx={310} cy={200} rx={30} ry={60} fill="none" stroke={BRAND.navy} strokeWidth="1" />
        <ellipse cx={310} cy={200} rx={50} ry={60} fill="none" stroke={BRAND.navy} strokeWidth="1" />
        {/* Latitude lines */}
        <ellipse cx={310} cy={180} rx={55} ry={15} fill="none" stroke={BRAND.navy} strokeWidth="1" />
        <ellipse cx={310} cy={200} rx={60} ry={18} fill="none" stroke={BRAND.navy} strokeWidth="1" />
        <ellipse cx={310} cy={220} rx={55} ry={15} fill="none" stroke={BRAND.navy} strokeWidth="1" />
      </m.g>

      {/* Buildings flanking the globe */}
      {[
        { x: 180, h: 70, w: 40 },
        { x: 210, h: 50, w: 30 },
        { x: 400, h: 80, w: 35 },
        { x: 430, h: 55, w: 30 },
      ].map((b, i) => (
        <IsoBox key={`mb${i}`} x={b.x} y={290} w={b.w} d={16} h={b.h}
          fill={BRAND.orange} fillLeft={BRAND.navy} fillRight={BRAND.orangeDark} stroke={BRAND.navy}>
          {/* Windows */}
          {[...Array(Math.floor(b.h / 18))].map((_, j) => (
            <rect key={`mw${i}${j}`} x={b.x - b.w / 4} y={290 - b.h + 10 + j * 16} width={8} height={6} rx={1}
              fill={BRAND.yellow} opacity="0.5" transform={`skewY(${i < 2 ? -12 : 12})`} />
          ))}
        </IsoBox>
      ))}

      {/* Clouds */}
      {[
        { x: 350, y: 120, s: 1 },
        { x: 400, y: 140, s: 0.7 },
        { x: 160, y: 135, s: 0.8 },
      ].map((c, i) => (
        <m.g key={`mc${i}`}
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx={c.x} cy={c.y} rx={22 * c.s} ry={8 * c.s} fill={BRAND.yellow} opacity="0.4" />
          <ellipse cx={c.x - 10 * c.s} cy={c.y} rx={14 * c.s} ry={6 * c.s} fill={BRAND.yellow} opacity="0.3" />
        </m.g>
      ))}

      {/* Megaphone/speaker */}
      <m.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M120 240 L150 225 L150 265 L120 255 Z" fill={BRAND.navy} stroke={BRAND.navyDark} strokeWidth="1" />
        <rect x={110} y={242} width={12} height={14} rx={2} fill={BRAND.navyLight} stroke={BRAND.navyDark} strokeWidth="1" />
        <path d="M150 225 L170 218 L170 272 L150 265 Z" fill={BRAND.navyDark} opacity="0.8" />
      </m.g>

      {/* Sound waves from megaphone */}
      {[0, 1, 2].map((i) => (
        <m.path
          key={`sw${i}`}
          d={`M${172 + i * 12} ${230 - i * 5} Q${180 + i * 12} ${248} ${172 + i * 12} ${266 + i * 5}`}
          fill="none"
          stroke={BRAND.yellow}
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ opacity: [0, 0.7, 0], x: [0, 6, 12] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: i * 0.25 }}
        />
      ))}

      {/* Social reactions floating up */}
      <m.g
        animate={{ y: [0, -25, -50], opacity: [1, 0.7, 0], scale: [1, 1.2, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      >
        <circle cx={200} cy={180} r={8} fill={BRAND.purple} opacity="0.8" />
        <text x={196} y={184} fill="white" fontSize="8">&#9829;</text>
      </m.g>
      <m.g
        animate={{ y: [0, -20, -40], opacity: [1, 0.6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 1 }}
      >
        <circle cx={230} cy={170} r={6} fill={BRAND.blue} opacity="0.7" />
        <text x={227} y={174} fill="white" fontSize="7">&#9733;</text>
      </m.g>

      {/* Small people */}
      <IsoPerson x={260} y={320} color={BRAND.navy} />
      <IsoPerson x={350} y={330} color={BRAND.navy} />
      <IsoPerson x={150} y={310} color={BRAND.navy} />

      {/* Crane */}
      <g>
        <line x1={450} y1={310} x2={450} y2={200} stroke={BRAND.navy} strokeWidth="2" />
        <line x1={450} y1={200} x2={480} y2={200} stroke={BRAND.navy} strokeWidth="1.5" />
        <line x1={480} y1={200} x2={480} y2={220} stroke={BRAND.navy} strokeWidth="1" strokeDasharray="2 2" />
        <line x1={450} y1={200} x2={440} y2={210} stroke={BRAND.navy} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  WORLD 4: Growth Systems (Navy + yellow/green)                      */
/* ------------------------------------------------------------------ */

function GrowthWorld() {
  return (
    <svg viewBox="0 0 520 440" fill="none" className="h-full w-full" aria-label="Growth Systems isometric world">
      <IsoPlatform cx={260} cy={300} w={460} h={270} fill={BRAND.navy} stroke={BRAND.yellow} depth={20} depthFill={BRAND.navyDark} />

      {/* Grid */}
      {[...Array(6)].map((_, i) => (
        <line key={`gg${i}`} x1={80 + i * 60} y1={170 + i * 5} x2={130 + i * 60} y2={420 - i * 10}
          stroke={BRAND.yellow} strokeWidth="0.5" opacity="0.25" />
      ))}

      {/* Large rotating gear (center) */}
      <m.g
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "260px 230px" }}
      >
        <circle cx={260} cy={230} r={55} fill="none" stroke={BRAND.yellow} strokeWidth="2" />
        <circle cx={260} cy={230} r={45} fill="none" stroke={BRAND.yellow} strokeWidth="1" opacity="0.6" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <rect
            key={`gt${angle}`}
            x={256}
            y={170}
            width={8}
            height={14}
            rx={2}
            fill={BRAND.yellow}
            transform={`rotate(${angle}, 260, 230)`}
          />
        ))}
        <circle cx={260} cy={230} r={20} fill={BRAND.navy} stroke={BRAND.yellow} strokeWidth="1.5" />
        {/* Inner cross */}
        <line x1={250} y1={230} x2={270} y2={230} stroke={BRAND.yellow} strokeWidth="1" />
        <line x1={260} y1={220} x2={260} y2={240} stroke={BRAND.yellow} strokeWidth="1" />
      </m.g>

      {/* Secondary gear (smaller, counter-rotating) */}
      <m.g
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "375px 195px" }}
      >
        <circle cx={375} cy={195} r={28} fill="none" stroke={BRAND.yellow} strokeWidth="1.5" opacity="0.8" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect
            key={`gs${angle}`}
            x={373}
            y={164}
            width={5}
            height={9}
            rx={1}
            fill={BRAND.yellow}
            opacity="0.8"
            transform={`rotate(${angle}, 375, 195)`}
          />
        ))}
        <circle cx={375} cy={195} r={12} fill={BRAND.navy} stroke={BRAND.yellow} strokeWidth="1" />
      </m.g>

      {/* Server/data building stack */}
      <IsoBox x={130} y={270} w={60} d={20} h={80} fill={BRAND.navyLight} fillLeft={BRAND.navyDark} fillRight={BRAND.navy} stroke={BRAND.yellow} />
      {/* Server lights */}
      {[0, 12, 24, 36, 48].map((i) => (
        <m.circle key={`sl${i}`} cx={108} cy={200 + i} r={2}
          fill={BRAND.green}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
        />
      ))}

      {/* Data flow lines */}
      <m.path d="M160 230 Q200 200 240 210" fill="none" stroke={BRAND.yellow} strokeWidth="1" strokeDasharray="4 4" opacity="0.5"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <m.path d="M280 210 Q320 195 360 200" fill="none" stroke={BRAND.yellow} strokeWidth="1" strokeDasharray="4 4" opacity="0.5"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Flowing data particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <m.circle
          key={`dp${i}`}
          cx={150 + i * 45}
          cy={320 + (i % 2) * 15}
          r={3}
          fill={BRAND.yellow}
          animate={{
            opacity: [0.2, 0.9, 0.2],
            scale: [0.7, 1.3, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.35,
          }}
        />
      ))}

      {/* AI brain icon */}
      <m.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx={260} cy={155} r={18} fill={BRAND.navyLight} stroke={BRAND.yellow} strokeWidth="1.5" />
        {/* Brain pattern */}
        <path d="M252 155 Q256 147 260 150 Q264 147 268 155" fill="none" stroke={BRAND.yellow} strokeWidth="1" />
        <path d="M252 155 Q256 163 260 160 Q264 163 268 155" fill="none" stroke={BRAND.yellow} strokeWidth="1" />
        {/* Glow ring */}
        <m.circle cx={260} cy={155} r={24} fill="none" stroke={BRAND.yellow} strokeWidth="0.5"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "260px 155px" }}
        />
      </m.g>

      {/* Rising arrow */}
      <m.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M420 280 L420 240 L412 252 M420 240 L428 252"
          fill="none" stroke={BRAND.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </m.g>

      {/* Small people */}
      <IsoPerson x={200} y={310} color={BRAND.yellow} />
      <IsoPerson x={340} y={315} color={BRAND.yellow} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data + illustration map                                            */
/* ------------------------------------------------------------------ */

const worlds = [
  {
    id: "web-dev",
    label: "Web Development",
    tagline: "Conversion-focused sites built for growth",
    href: "/services#growth-starter",
    Illustration: WebDevWorld,
    theme: "dark" as const,
  },
  {
    id: "ai-automation",
    label: "AI Automation",
    tagline: "Remove manual bottlenecks with intelligent workflows",
    href: "/services#ai-growth-engine",
    Illustration: AiAutomationWorld,
    theme: "blue" as const,
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    tagline: "Content & campaigns that generate leads",
    href: "/services#growth-retainer",
    Illustration: MarketingWorld,
    theme: "coral" as const,
  },
  {
    id: "growth",
    label: "Growth Systems",
    tagline: "AI-powered automation & lead workflows",
    href: "/services#ai-growth-engine",
    Illustration: GrowthWorld,
    theme: "gold" as const,
  },
];

/* ------------------------------------------------------------------ */
/*  Main exported component                                            */
/* ------------------------------------------------------------------ */

export function IsometricWorlds() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32 lg:py-40">
      {/* Background ambient effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 text-center sm:mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Digital Worlds
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Building your digital{" "}
            <span className="text-primary">
              foundations
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every service is an interconnected part of your growth ecosystem.
            Explore the worlds we build.
          </p>
        </m.div>

        {/* Staggered diagonal grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {worlds.map((world, i) => (
            <m.div
              key={world.id}
              custom={i}
              variants={{
                ...worldEntrance,
                ...ambientFloat(i),
              }}
              initial="hidden"
              whileInView={["visible", "float"]}
              viewport={{ once: true, margin: "-60px" }}
              className={cn(
                "group relative",
                /* Diagonal stagger on large screens */
                i === 1 && "md:translate-y-12 lg:translate-y-16",
                i === 2 && "md:-translate-y-6 lg:-translate-y-8",
                i === 3 && "md:translate-y-6 lg:translate-y-8",
              )}
            >
              <Link href={world.href} className="block">
                <m.div
                  className="relative overflow-hidden rounded-2xl border border-border/30 bg-muted/30"
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(18, 122, 144, 0.12), 0 0 0 1px rgba(18, 122, 144, 0.08)",
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    },
                  }}
                >
                  {/* Illustration — zooms in subtly on card hover */}
                  <m.div
                    className="relative aspect-[4/3] w-full overflow-hidden"
                    whileHover={{
                      scale: 1.06,
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    }}
                  >
                    <world.Illustration />
                  </m.div>

                  {/* Label bar */}
                  <div className="flex items-center justify-between border-t border-border/20 bg-background/80 px-5 py-3 backdrop-blur-sm">
                    <div className="overflow-hidden">
                      <m.h3
                        className="font-display text-base font-bold text-foreground sm:text-lg"
                        whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                      >
                        {world.label}
                      </m.h3>
                      <m.p
                        className="text-xs text-muted-foreground sm:text-sm"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 1, x: 4, transition: { type: "spring", stiffness: 400, damping: 20, delay: 0.03 } }}
                      >
                        {world.tagline}
                      </m.p>
                    </div>
                    <m.div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground"
                      whileHover={{
                        scale: 1.15,
                        borderColor: "var(--primary)",
                        color: "var(--primary)",
                        transition: { type: "spring", stiffness: 400, damping: 18 },
                      }}
                    >
                      <m.svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        whileHover={{
                          x: 3,
                          transition: { type: "spring", stiffness: 500, damping: 20 },
                        }}
                      >
                        <path d="M1 7h12M8 2l5 5-5 5" />
                      </m.svg>
                    </m.div>
                  </div>
                </m.div>
              </Link>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
