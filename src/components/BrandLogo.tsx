"use client";

import { motion } from "framer-motion";

function NeuralIcon({ size = 32 }: { size?: number }) {
  const s = Math.max(size ?? 32, 1) / 100;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="28"
          stroke="#7F77DD"
          strokeOpacity={0.15}
          strokeWidth={1 * s}
          strokeDasharray="5 5"
        />
        <circle
          cx="50"
          cy="50"
          r="18"
          stroke="#7F77DD"
          strokeOpacity={0.06}
          strokeWidth={1 * s}
        />
      </motion.g>

      <g stroke="#5DCAA5" strokeOpacity={0.25} strokeWidth={0.8 * s}>
        {[
          [22.5, 26],
          [17.5, 55],
          [27.5, 80],
          [61, 16],
          [84, 31],
          [85, 64],
          [70, 85],
        ].map(([x2, y2], i) => (
          <motion.line
            key={i}
            x1={50 * s}
            y1={50 * s}
            x2={x2 * s}
            y2={y2 * s}
            animate={{ strokeOpacity: [0.25, 0.5, 0.25] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </g>

      <g stroke="#7F77DD" strokeOpacity={0.12} strokeWidth={0.6 * s}>
        <line x1={22.5 * s} y1={26 * s} x2={61 * s} y2={16 * s} />
        <line x1={61 * s} y1={16 * s} x2={84 * s} y2={31 * s} />
        <line x1={84 * s} y1={31 * s} x2={85 * s} y2={64 * s} />
        <line x1={85 * s} y1={64 * s} x2={70 * s} y2={85 * s} />
        <line x1={70 * s} y1={85 * s} x2={27.5 * s} y2={80 * s} />
        <line x1={27.5 * s} y1={80 * s} x2={17.5 * s} y2={55 * s} />
        <line x1={17.5 * s} y1={55 * s} x2={22.5 * s} y2={26 * s} />
      </g>

      {[
        { cx: 22.5, cy: 26, r: 3.5, delay: 0 },
        { cx: 17.5, cy: 55, r: 3, delay: 0.6 },
        { cx: 27.5, cy: 80, r: 3.5, delay: 1.2 },
        { cx: 61, cy: 16, r: 3, delay: 1.8 },
        { cx: 84, cy: 31, r: 4, delay: 2.4 },
        { cx: 85, cy: 64, r: 3, delay: 3 },
        { cx: 70, cy: 85, r: 3.5, delay: 3.6 },
      ].map((node) => (
        <motion.circle
          key={node.cx}
          cx={node.cx * s}
          cy={node.cy * s}
          r={node.r * s}
          fill="#AFA9EC"
          stroke="#7F77DD"
          strokeWidth={0.8 * s}
          animate={{
            r: [node.r * s, (node.r + 0.8) * s, node.r * s],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.delay,
          }}
        />
      ))}

      <motion.circle
        cx={50 * s}
        cy={50 * s}
        r={10 * s}
        fill="url(#orbFill)"
        fillOpacity={0.38}
        animate={{ r: [10 * s, 11 * s, 10 * s] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx={50 * s} cy={50 * s} r={5.5 * s} fill="url(#orbCore)" fillOpacity={0.95} />
      <circle cx={48.5 * s} cy={48.5 * s} r={2 * s} fill="white" fillOpacity={0.5} />

      <defs>
        <linearGradient id="orbFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AFA9EC" />
          <stop offset="100%" stopColor="#5DCAA5" />
        </linearGradient>
        <linearGradient id="orbCore" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EEEDFE" />
          <stop offset="100%" stopColor="#9FE1CB" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

function Wordmark({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const isSmall = size === "small";
  return (
    <div className="flex flex-col leading-none">
      <span
        className={`font-bold tracking-tight bg-gradient-to-r from-[#6B5ED7] via-[#7F77DD] to-[#AFA9EC] bg-clip-text text-transparent ${
          isSmall ? "text-sm" : size === "large" ? "text-2xl" : "text-base"
        }`}
      >
        NEURAL
      </span>
      <span
        className={`font-light tracking-[0.15em] bg-gradient-to-r from-[#5DCAA5] to-[#1D9E75] bg-clip-text text-transparent ${
          isSmall ? "text-[10px]" : size === "large" ? "text-lg" : "text-xs"
        }`}
      >
        AURORA
      </span>
    </div>
  );
}

interface BrandLogoProps {
  size?: "small" | "default" | "large";
  showWordmark?: boolean;
}

export function BrandLogo({ size = "default", showWordmark = true }: BrandLogoProps) {
  const iconSize = size === "small" ? 20 : size === "large" ? 48 : 28;

  return (
    <div className="inline-flex items-center gap-1.5">
      <NeuralIcon size={iconSize} />
      {showWordmark && <Wordmark size={size} />}
    </div>
  );
}

export function BrandLogoFull({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col items-center gap-2 ${className}`}
    >
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <NeuralIcon size={48} />
      </motion.div>
      <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#6B5ED7] via-[#7F77DD] to-[#AFA9EC] bg-clip-text text-transparent">
        NEURAL
      </span>
      <span className="text-lg font-light tracking-[0.2em] bg-gradient-to-r from-[#5DCAA5] to-[#1D9E75] bg-clip-text text-transparent -mt-1">
        AURORA
      </span>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase mt-1">
        Documentation
      </p>
    </motion.div>
  );
}
