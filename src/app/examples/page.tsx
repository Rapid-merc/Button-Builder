"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ExamplesPage() {
  const examples = [
    {
      label: "Solid Button",
      code: `<button className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700">Primary Action</button>`,
      element: (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700"
        >
          Primary Action
        </motion.button>
      ),
    },
    {
      label: "Outline Button",
      code: `<button className="rounded-lg border-2 border-blue-600 px-6 py-3 text-blue-600 font-medium hover:bg-blue-50">Outline Button</button>`,
      element: (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-lg border-2 border-blue-600 px-6 py-3 text-blue-600 font-medium hover:bg-blue-50"
        >
          Outline Button
        </motion.button>
      ),
    },
    {
      label: "Icon Left",
      code: `<button className="flex items-center gap-2 rounded-lg bg-pink-600 px-6 py-3 text-white font-medium shadow hover:bg-pink-700"><Heart className="size-4" /> Like</button>`,
      element: (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-lg bg-pink-600 px-6 py-3 text-white font-medium shadow hover:bg-pink-700"
        >
          <Heart className="size-4" /> Like
        </motion.button>
      ),
    },
    {
      label: "Icon Right",
      code: `<button className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white font-medium shadow hover:bg-green-700">Next <ArrowRight className="size-4" /></button>`,
      element: (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white font-medium shadow hover:bg-green-700"
        >
          Next <ArrowRight className="size-4" />
        </motion.button>
      ),
    },
    {
      label: "Ghost Button",
      code: `<button className="rounded-lg px-6 py-3 font-medium text-slate-700 hover:bg-slate-100">Ghost Button</button>`,
      element: (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-lg px-6 py-3 font-medium text-slate-700 hover:bg-slate-100"
        >
          Ghost Button
        </motion.button>
      ),
    },
    {
      label: "Soft Button",
      code: `<button className="rounded-lg bg-blue-100 px-6 py-3 text-blue-700 font-medium hover:bg-blue-200">Soft Button</button>`,
      element: (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-lg bg-blue-100 px-6 py-3 text-blue-700 font-medium hover:bg-blue-200"
        >
          Soft Button
        </motion.button>
      ),
    },
  ];

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <div className="mx-auto max-w-6xl p-6 md:p-10">
        <header className="flex items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Button Examples
            </h1>
            <p className="text-sm text-slate-600">
              Explore ready-made button styles you can use or customize further.
            </p>
          </div>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((ex, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-4 rounded-2xl border p-6 shadow-sm"
            >
              {ex.element}
              <button
                onClick={() => copyToClipboard(ex.code, i)}
                className="rounded bg-slate-800 px-3 py-1 text-sm text-white hover:bg-slate-700"
              >
                {copiedIndex === i ? "Copied!" : "Copy Code"}
              </button>
            </div>
          ))}
        </div>
        <footer className="mt-10 flex items-center justify-between text-xs text-slate-500">
          <p>Built with Next.js, TypeScript, Tailwind, Framer Motion, and Lucide.</p>
          <a href="https://tailwindcss.com/" className="hover:underline" target="_blank" rel="noreferrer">Tailwind Docs</a>
        </footer>
      </div>
    </div>
  );
}
