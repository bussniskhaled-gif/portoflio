"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Download } from "lucide-react";
import site from "../data/site";
import HeroIllustrations from "./HeroIllustrations";
import { useEntranceDelay } from "../hooks/useEntranceDelay";

function useTypewriter(words, typeSpeed, pause, enabled) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const current = words[wordIndex % words.length];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 120);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1),
          );
        },
        deleting ? typeSpeed / 2 : typeSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [enabled, text, deleting, wordIndex, words, typeSpeed, pause]);

  return enabled ? text : words[0];
}

function scrollToNext() {
  const el = document.getElementById("proof");
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

const item = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const [motionAllowed, setMotionAllowed] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionAllowed(!mql.matches);
  }, []);

  const typed = useTypewriter(
    site.roles,
    site.typingSpeed,
    site.typingPause,
    motionAllowed,
  );

  const delay = useEntranceDelay(0.05, 0.25);
  const container = useMemo(
    () => ({
      hidden: {},
      visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
    }),
    [delay],
  );

  const [first, ...rest] = site.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden pb-16 pt-28 lg:pt-36"
    >
      <div className="relative z-10 w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Main Info Column */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            {/* Status Pill */}
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-mono text-xs text-accent backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              <span>Available for freelance &amp; full-time work</span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              variants={item}
              className="font-display text-5xl font-extrabold tracking-tight text-text sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05]"
            >
              {first}{" "}
              <span className="bg-gradient-to-r from-accent via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                {lastName}
              </span>
            </motion.h1>

            {/* Role (typewriter) */}
            <motion.div
              variants={item}
              className="mt-6 flex items-center gap-2.5 font-mono text-lg text-soft sm:text-xl"
            >
              <span className="text-accent font-bold">&gt;</span>
              <span>
                {typed}
                <motion.span
                  className="ml-1 inline-block h-5 w-[2px] bg-accent align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </span>
            </motion.div>

            {/* Value Proposition */}
            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {site.intro}
            </motion.p>

            {/* Quick Tech Badges */}
            <motion.div
              variants={item}
              className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-soft"
            >
              <span className="rounded-md border border-white/10 bg-surface/80 px-2.5 py-1">
                react
              </span>
              <span className="rounded-md border border-white/10 bg-surface/80 px-2.5 py-1">
                Node.js &amp; Express
              </span>
              <span className="rounded-md border border-white/10 bg-surface/80 px-2.5 py-1">
                PostgreSQL
              </span>
              <span className="rounded-md border border-white/10 bg-surface/80 px-2.5 py-1">
                Tailwind CSS
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-mono text-sm font-semibold text-black transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] hover:brightness-110"
                >
                  let&apos;s talk
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/projects"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-surface/60 px-6 py-3.5 font-mono text-sm text-text backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:text-accent hover:bg-surface"
                >
                  view work
                </Link>
              </motion.div>
              {/* Plain <a>, not <Link>: the résumé is a static PDF in
                  /public, so the browser can download it directly. */}
              <motion.a
                href={site.cv}
                download="Khaled-Waleed-CV.pdf"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-xl px-4 py-3.5 font-mono text-sm text-soft transition-colors duration-300 hover:text-accent"
              >
                <Download size={16} />
                download cv
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Code Architecture Card */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <HeroIllustrations />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={scrollToNext}
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-xs text-muted/70 transition-colors hover:text-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.6, duration: 0.6 }}
      >
        <span className="uppercase tracking-widest">scroll</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-accent" />
        </motion.span>
      </motion.button>
    </section>
  );
}
