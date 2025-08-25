"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Sparkles, MoveHorizontal, MoveVertical } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const SIZES = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-2.5",
  xl: "text-xl px-6 py-3",
} as const;

type SizeKey = keyof typeof SIZES;

type Variant =
  | "solid"
  | "outline"
  | "ghost"
  | "link"
  | "soft"; // soft = subtle background

const RADIUS = {
  none: "rounded-none",
  sm: "rounded-md",
  lg: "rounded-xl",
  full: "rounded-full",
} as const;

type RadiusKey = keyof typeof RADIUS;

const WEIGHTS = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

type WeightKey = keyof typeof WEIGHTS;

export default function ButtonBuilderPage() {
  const [label, setLabel] = useState("Launch");
  const [size, setSize] = useState<SizeKey>("md");
  const [variant, setVariant] = useState<Variant>("solid");
  const [radius, setRadius] = useState<RadiusKey>("lg");
  const [weight, setWeight] = useState<WeightKey>("semibold");
  const [wFull, setWFull] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [shadow, setShadow] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [withIcon, setWithIcon] = useState(true);
  const [iconRight, setIconRight] = useState(false);

  // Colors
  const [bgColor, setBgColor] = useState("#4f46e5");
  const [textColor, setTextColor] = useState("#ffffff");
  const [borderColor, setBorderColor] = useState("#4f46e5");
  const [hoverBgColor, setHoverBgColor] = useState("#2563eb");
  const [activeBgColor, setActiveBgColor] = useState("#1d4ed8");

  const [hoverScale, setHoverScale] = useState(1.03);
  const [pressScale, setPressScale] = useState(0.98);
  const [gap, setGap] = useState(8);

  const baseClasses = useMemo(() => {
    const sizeCls = SIZES[size];
    const radCls = RADIUS[radius];
    const weightCls = WEIGHTS[weight];

    const widthCls = wFull ? "w-full" : "inline-flex";
    const caseCls = uppercase ? "uppercase tracking-wide" : "";

    const common = cn(
      widthCls,
      "items-center justify-center select-none transition-[transform,shadow,background,border,color] duration-200",
      sizeCls,
      radCls,
      weightCls,
      disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    );

    const solid = cn(
      `bg-[${bgColor}] text-[${textColor}] border border-[${borderColor}]`,
      shadow && !disabled && "shadow-sm hover:shadow-md",
    );

    const outline = cn(
      `bg-transparent text-[${bgColor}] border border-[${borderColor}]`,
      "hover:bg-black/5",
    );

    const ghost = cn(
      "bg-transparent border border-transparent",
      `text-[${bgColor}] hover:bg-[${bgColor}] hover:text-[${textColor}]/90 hover:bg-opacity-10`,
    );

    const link = cn(
      "bg-transparent border border-transparent underline-offset-4",
      `text-[${bgColor}] hover:underline`,
    );

    const soft = cn(
      `bg-[${bgColor}]/12 text-[${bgColor}] border border-[${bgColor}]/20`,
      shadow && !disabled && "shadow-sm hover:shadow-md",
    );

    const byVariant: Record<Variant, string> = {
      solid,
      outline,
      ghost,
      link,
      soft,
    };

    return cn(common, byVariant[variant]);
  }, [size, radius, weight, wFull, uppercase, disabled, shadow, variant, bgColor, textColor, borderColor, gap]);

  const codeSnippet = `
import { motion } from "framer-motion";

export default function MyButton() {
  return (
    <motion.button
      whileHover={{ backgroundColor: "${hoverBgColor}", scale: ${hoverScale} }}
      whileTap={{ backgroundColor: "${activeBgColor}", scale: ${pressScale} }}
      className="${baseClasses}"
      style={{
        backgroundColor: "${bgColor}",
        color: "${textColor}",
        borderColor: "${borderColor}",
        gap: "${gap}px",
      }}
    >
      ${withIcon && !iconRight ? '<Sparkles className="size-4" /> ' : ""}
      ${uppercase ? label.toUpperCase() : label}
      ${withIcon && iconRight ? ' <Sparkles className="size-4" />' : ""}
    </motion.button>
  );
}
`.trim();


  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch (_) {
      // no-op
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <div className="mx-auto max-w-6xl p-6 md:p-10">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Button Builder</h1>
            <p className="text-sm text-slate-600">Design Tailwind buttons, preview instantly, and export code.</p>
          </div>
          <a
            href="#code"
            className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:shadow-sm"
          >
            <Copy className="size-4" /> Copy Code
          </a>
        </header>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <section className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-slate-600">Label</span>
                <input
                  className="rounded-xl border px-3 py-2"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Button text"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-slate-600">Size</span>
                <select className="rounded-xl border px-3 py-2" value={size} onChange={(e) => setSize(e.target.value as SizeKey)}>
                  {Object.keys(SIZES).map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-slate-600">Variant</span>
                <select className="rounded-xl border px-3 py-2" value={variant} onChange={(e) => setVariant(e.target.value as Variant)}>
                  {(["solid","outline","ghost","link","soft"] as Variant[]).map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-slate-600">Radius</span>
                <select className="rounded-xl border px-3 py-2" value={radius} onChange={(e) => setRadius(e.target.value as RadiusKey)}>
                  {Object.keys(RADIUS).map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-slate-600">Font weight</span>
                <select className="rounded-xl border px-3 py-2" value={weight} onChange={(e) => setWeight(e.target.value as WeightKey)}>
                  {Object.keys(WEIGHTS).map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-slate-600">Gap (icon/text)</span>
                <input type="range" min={0} max={24} value={gap} onChange={(e)=> setGap(Number(e.target.value))} />
              </label>

              <div className="flex items-center gap-3 mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={wFull} onChange={(e)=> setWFull(e.target.checked)} />
                  Full width
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={shadow} onChange={(e)=> setShadow(e.target.checked)} />
                  Shadow
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={uppercase} onChange={(e)=> setUppercase(e.target.checked)} />
                  Uppercase
                </label>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={withIcon} onChange={(e)=> setWithIcon(e.target.checked)} />
                  Icon
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={iconRight} onChange={(e)=> setIconRight(e.target.checked)} disabled={!withIcon} />
                  Icon Right
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={disabled} onChange={(e)=> setDisabled(e.target.checked)} />
                  Disabled
                </label>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <label className="flex flex-col gap-4">
                  <span className="text-sm text-slate-600">Background</span>
                  <input type="color" value={bgColor} onChange={(e)=> setBgColor(e.target.value)} className="h-10 w-full rounded" />
                </label>
                <label className="flex flex-col gap-4">
                  <span className="text-sm text-slate-600">Text</span>
                  <input type="color" value={textColor} onChange={(e)=> setTextColor(e.target.value)} className="h-10 w-full rounded" />
                </label>
                <label className="flex flex-col gap-4">
                  <span className="text-sm text-slate-600">Border</span>
                  <input type="color" value={borderColor} onChange={(e)=> setBorderColor(e.target.value)} className="h-10 w-full rounded" />
                </label>
                <label className="flex flex-col gap-4">
                  <span className="text-sm text-slate-600">Hover</span>
                  <input type="color" value={hoverBgColor} onChange={(e) => setHoverBgColor(e.target.value)} className="h-10 w-full rounded" />
                </label>

                <label className="flex flex-col gap-4">
                  <span className="text-sm text-slate-600">Active</span>
                  <input type="color" value={activeBgColor} onChange={(e) => setActiveBgColor(e.target.value)} className="h-10 w-full rounded" />
                </label>
              </div>

              

              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-slate-600 flex items-center gap-2">Hover scale <MoveHorizontal className="size-4"/></span>
                  <input type="range" min={1} max={1.15} step={0.01} value={hoverScale} onChange={(e)=> setHoverScale(Number(e.target.value))} />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm text-slate-600 flex items-center gap-2">Press scale <MoveVertical className="size-4"/></span>
                  <input type="range" min={0.9} max={1} step={0.01} value={pressScale} onChange={(e)=> setPressScale(Number(e.target.value))} />
                </label>
              </div>
            </div>
          </section>

          {/* Preview */}
          <section className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
            <div className="flex min-h-48 items-center justify-center rounded-xl border bg-slate-50 p-6">
              <motion.button
                whileHover={!disabled ? { backgroundColor: hoverBgColor, scale: hoverScale } : undefined}
                whileTap={!disabled ? { backgroundColor: activeBgColor, scale: pressScale } : undefined}
                className={baseClasses}
                disabled={disabled}
                style={{
                  backgroundColor: variant === "solid" || variant === "soft" ? bgColor : "transparent",
                  color: variant === "solid" ? textColor : bgColor,
                  borderColor: borderColor,
                  gap: `${gap}px`,
                }}
              >
                {!iconRight && withIcon && <Sparkles className="size-4" aria-hidden />}
                <span>{uppercase ? label.toUpperCase() : label}</span>
                {iconRight && withIcon && <Sparkles className="size-4" aria-hidden />}
              </motion.button>
            </div>


            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => copy(baseClasses)}
                className="rounded-xl border px-3 py-2 text-sm hover:shadow-sm"
                title="Copy class names"
              >
                <Copy className="inline size-4 mr-2" /> Copy class list
              </button>
              <button
                onClick={() => copy(codeSnippet)}
                className="rounded-xl border px-3 py-2 text-sm hover:shadow-sm"
                title="Copy full JSX"
              >
                <Copy className="inline size-4 mr-2" /> Copy JSX snippet
              </button>
            </div>
          </section>
        </div>

        {/* Code export */}
        <section id="code" className="mt-8 rounded-2xl border bg-white p-5 md:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Exported Code</h2>
          <p className="text-sm text-slate-600 mb-3">Paste this in your component or page. Lucide icons are optional.</p>
          <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">
            <code>{codeSnippet}</code>
          </pre>
        </section>

        <footer className="mt-10 flex items-center justify-between text-xs text-slate-500">
          <p>Built with Next.js, TypeScript, Tailwind, Framer Motion, and Lucide.</p>
          <a href="https://tailwindcss.com/" className="hover:underline" target="_blank" rel="noreferrer">Tailwind Docs</a>
        </footer>
      </div>
    </div>
  );
}
