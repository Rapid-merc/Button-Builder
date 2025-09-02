"use client";

import Link from "next/link";
import { Sparkles, Twitter, Github } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top Nav with background image */}
      <header
      
        className="sticky top-0 z-40 w-full border-b bg-cover bg-center px-6 py-3 flex items-center justify-between"
        style={{ backgroundImage: "url('/footer.jpg')" }} // replace with your image
      >
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <Sparkles className="h-5 w-5" />
          Button Builder
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="#">Documentation</Link>
          <Link href="/examples">Examples</Link>
          <Link href="/button-builder">Playground</Link>
          <button className="rounded-lg bg-white/80 px-4 py-1.5 shadow hover:bg-white">
            Sign In
          </button>
        </nav>
      </header>

      {/* Hero with background image */}
      <section
        className="mx-auto mt-10 max-w-5xl px-6"
      >
        <div
          className="overflow-hidden rounded-2xl bg-cover bg-center p-12 text-center text-white shadow-lg"
          style={{ backgroundImage: "url('/background.jpg')" }} // replace with your image
        >
          <h1 className="text-4xl font-bold sm:text-5xl">Button Builder</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-100">
            Stop searching for the right button — build it yourself! Adjust styles, colors, and interactions in real-time, and generate code ready to drop into your app.
          </p>
          <Link
            href="/button-builder"
            className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-indigo-700 shadow hover:bg-slate-100"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer with background image */}
      {/* Footer with background image */}
      <footer
        className="mt-auto border-t bg-cover bg-center px-6 py-8 text-sm text-slate-700"
        style={{ backgroundImage: "url('/footer.jpg')" }} // replace with your image
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center gap-4">
          {/* Centered links */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="hover:underline">About</Link>
            <Link href="#" className="hover:underline">Contact</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
            <Link href="#" className="hover:underline">Privacy Policy</Link>
          </div>

          {/* Centered socials */}
          <div className="flex items-center justify-center gap-4">
            <Link href="#" aria-label="Twitter" className="hover:text-slate-900">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href="#" aria-label="GitHub" className="hover:text-slate-900">
              <Github className="h-4 w-4" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="mt-4 text-center text-xs text-slate-600">
            Life is worth living ♥
          </div>
        </div>
      </footer>

    </div>
  );
}
