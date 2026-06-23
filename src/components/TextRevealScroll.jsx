import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TextRevealScroll({ 
  text = "", 
  dimOpacity = 0.2, 
  revealMode = "words", 
  startOffset = 90, 
  endOffset = 30,
  style = {},
  className = ""
}) {
  const containerRef = useRef(null);
  
  // Create scroll-driven progress based on the viewport intersection
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`start ${startOffset}%`, `start ${endOffset}%`]
  });

  // Split text depending on the mode
  const tokens = revealMode === "words" ? text.split(/(\s+)/) : text.split("");

  return (
    <span ref={containerRef} style={{ display: 'inline', ...style }} className={className}>
      {tokens.map((token, i) => {
        // Preserve pure whitespace segments (spaces, newlines) natively
        if (revealMode === "words" && /^\s+$/.test(token)) {
          return token;
        }

        // Calculate the fractional range for this specific token to create a sequential reveal
        const start = i / tokens.length;
        const end = start + (1 / tokens.length);
        
        // Map the overall scroll progress to this token's opacity range
        const opacity = useTransform(scrollYProgress, [start, end], [dimOpacity, 1]);

        return (
          <motion.span key={i} style={{ opacity, display: 'inline' }}>
            {revealMode === "chars" && token === " " ? "\u00A0" : token}
          </motion.span>
        );
      })}
    </span>
  );
}
