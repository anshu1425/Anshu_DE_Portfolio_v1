import React, { useEffect, useState, useRef, startTransition } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function EyeFollowButton({
  text = "Get in touch",
  link = "/contact",
  buttonColor = "#000",
  textColor = "#fff",
  eyeColor = "#fff",
  pupilColor = "#000",
  eyeSize = 36,
  pupilSize = 14,
  eyeSpacing = 4,
  trackingSpeed = 150,
  trackingRange = 90,
  enableBlinking = true,
  blinkInterval = 2500,
  style = {},
  className = ""
}) {
  const containerRef = useRef(null);
  const [leftPupilPos, setLeftPupilPos] = useState({ x: 0, y: 0 });
  const [rightPupilPos, setRightPupilPos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  const actualPupilSize = Math.min(pupilSize, eyeSize * 0.8);
  const maxDistance = ((eyeSize - actualPupilSize) / 2) * (trackingRange / 100);

  useEffect(() => {
    if (!enableBlinking) return;
    const blinkDuration = 150;
    const interval = setInterval(() => {
      startTransition(() => setIsBlinking(true));
      setTimeout(() => {
        startTransition(() => setIsBlinking(false));
      }, blinkDuration);
    }, blinkInterval);
    return () => clearInterval(interval);
  }, [enableBlinking, blinkInterval]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const leftEyeOffsetX = -(eyeSize + eyeSpacing) / 2;
      const rightEyeOffsetX = (eyeSize + eyeSpacing) / 2;

      const calculatePupilPosition = (eyeOffsetX) => {
        const relativeX = mouseX - eyeOffsetX;
        const relativeY = mouseY;
        const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
        if (distance === 0) return { x: 0, y: 0 };
        const clampedDistance = Math.min(distance, maxDistance);
        const angle = Math.atan2(relativeY, relativeX);
        return {
          x: Math.cos(angle) * clampedDistance,
          y: Math.sin(angle) * clampedDistance
        };
      };

      const leftPos = calculatePupilPosition(leftEyeOffsetX);
      const rightPos = calculatePupilPosition(rightEyeOffsetX);

      startTransition(() => {
        setLeftPupilPos(leftPos);
        setRightPupilPos(rightPos);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [eyeSize, eyeSpacing, maxDistance]);

  return (
    <Link to={link} style={{ textDecoration: 'none', display: 'inline-block' }}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
          backgroundColor: buttonColor,
          padding: '8px 8px 8px 24px',
          borderRadius: 999,
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
          ...style
        }}
        className={className}
      >
        <span style={{ color: textColor, fontWeight: 700, fontSize: 16 }}>{text}</span>
        
        <div ref={containerRef} style={{ display: 'flex', gap: eyeSpacing }}>
          {/* Left Eye */}
          <div style={{ width: eyeSize, height: eyeSize, borderRadius: '50%', overflow: 'hidden' }}>
            <motion.div
              animate={{ scaleY: isBlinking ? 0.2 : 1 }}
              transition={{ duration: 0.1 }}
              style={{ width: '100%', height: '100%', backgroundColor: eyeColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <motion.div
                animate={{ x: leftPupilPos.x, y: leftPupilPos.y }}
                transition={{ type: "spring", stiffness: trackingSpeed, damping: 20 }}
                style={{ width: actualPupilSize, height: actualPupilSize, borderRadius: '50%', backgroundColor: pupilColor, opacity: isBlinking ? 0 : 1 }}
              />
            </motion.div>
          </div>

          {/* Right Eye */}
          <div style={{ width: eyeSize, height: eyeSize, borderRadius: '50%', overflow: 'hidden' }}>
            <motion.div
              animate={{ scaleY: isBlinking ? 0.2 : 1 }}
              transition={{ duration: 0.1 }}
              style={{ width: '100%', height: '100%', backgroundColor: eyeColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <motion.div
                animate={{ x: rightPupilPos.x, y: rightPupilPos.y }}
                transition={{ type: "spring", stiffness: trackingSpeed, damping: 20 }}
                style={{ width: actualPupilSize, height: actualPupilSize, borderRadius: '50%', backgroundColor: pupilColor, opacity: isBlinking ? 0 : 1 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
