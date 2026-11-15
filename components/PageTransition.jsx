"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
};

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <>
      {/* AnimatePresence + exit on the route-change sweep */}
      <AnimatePresence>
        <motion.div
          key={pathname}
          className="pointer-events-none fixed left-0 top-[71px] z-[55] h-[2px] w-full origin-left bg-accent"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      </AnimatePresence>

      <motion.main
        key={pathname}
        variants={pageVariants}
        initial="enter"
        animate="center"
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </>
  );
}
