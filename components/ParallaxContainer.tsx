"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion, useSpring } from "motion/react";

interface ParallaxContainerProps {
  id: string;
  backgroundSrc: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
  zIndex?: number;
}

export function ParallaxContainer({
  id,
  backgroundSrc,
  alt,
  children,
  className = "",
  zIndex = 0,
}: ParallaxContainerProps) {
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device
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

  // Create a smooth parallax effect
  // Moving the background slightly slower than the scroll
  // y range: [-50, 50] means the background will move 100px total relative to the container
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Add spring physics for smoother movement
  const springY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative sticky top-0 h-[150vh] md:h-[102vh] overflow-hidden ${className}`}
      style={{ zIndex }}
    >
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ y: isMobile ? 0 : springY }}
      >
        <div className="relative w-full h-full">
          <Image
            src={backgroundSrc}
            alt={alt}
            fill
            priority
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </section>
  );
}
