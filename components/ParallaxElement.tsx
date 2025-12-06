"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useSpring } from "motion/react";

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number; // Negative = slower/reverse, Positive = faster
  className?: string;
  direction?: "vertical" | "horizontal";
}

export function ParallaxElement({
  children,
  speed = 0.5,
  className = "",
  direction = "vertical",
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate movement range based on speed
  // speed 1 = moves 100px
  // speed 0.5 = moves 50px
  const range = [0, 1];
  const outputRange = [0, 100 * speed];

  const movement = useTransform(scrollYProgress, range, outputRange);

  const springMovement = useSpring(movement, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const style = isMobile
    ? {}
    : direction === "vertical"
    ? { y: springMovement }
    : { x: springMovement };

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  );
}
