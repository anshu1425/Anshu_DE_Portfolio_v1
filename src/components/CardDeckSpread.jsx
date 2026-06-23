import React, { useState, useEffect, startTransition, useMemo, useRef } from "react";
import { useInView } from "framer-motion";

export default function CardDeckSpread({
  children,
  cardRadius = 20,
  cardShadow = true,
  cardWidth = 220,
  cardHeight = 300,
  overlap = 60,
  style = {},
  shadowIntensity = 0.12,
  hoverBorderColor = "var(--color-border)",
  animationTrigger = "scroll",
  animationDelay = 0,
  animationIntensity = 1,
  blurIntensity = 2,
}) {
  const cardsData = React.Children.toArray(children);
  const numberOfCards = cardsData.length;
  
  const [hovered, setHovered] = useState(null);
  const [entered, setEntered] = useState(animationTrigger === "instant");
  const [shouldAnimate, setShouldAnimate] = useState(animationTrigger === "instant");
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  useEffect(() => {
    if (animationTrigger === "scroll") {
      if (isInView) {
        startTransition(() => setShouldAnimate(true));
      }
    } else if (animationTrigger === "delay") {
      const timer = setTimeout(() => {
        startTransition(() => setShouldAnimate(true));
      }, animationDelay);
      return () => clearTimeout(timer);
    }
  }, [isInView, animationTrigger, animationDelay]);

  useEffect(() => {
    setShouldAnimate(animationTrigger === "instant");
    setEntered(false);
  }, [animationTrigger]);

  useEffect(() => {
    if (!shouldAnimate) {
      setEntered(false);
      return;
    }
    setEntered(false);
    const timeouts = [];
    const intensity = Math.max(animationIntensity, 0.3);
    const baseDuration = 120;
    const step = baseDuration / intensity;

    for (let i = 0; i < numberOfCards; i++) {
      timeouts.push(
        window.setTimeout(() => {
          if (i === numberOfCards - 1) {
            setEntered(true);
          }
        }, i * step)
      );
    }
    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, [numberOfCards, shouldAnimate, animationIntensity]);

  const layout = useMemo(() => {
    const totalWidth = cardWidth + (numberOfCards - 1) * overlap;
    const initialStackLeft = (totalWidth - cardWidth) / 2;
    return { numCards: numberOfCards, totalWidth, initialStackLeft };
  }, [numberOfCards, cardWidth, overlap]);

  const animationTiming = useMemo(() => {
    const intensity = Math.max(animationIntensity, 0.3);
    return { duration: 0.7 / intensity, delayStep: 0.09 / intensity };
  }, [animationIntensity]);

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "visible",
        background: "transparent",
        cursor: animationTrigger === "click" && !shouldAnimate ? "pointer" : "default",
      }}
      onClick={
        animationTrigger === "click" && !shouldAnimate
          ? (e) => {
              e.stopPropagation();
              startTransition(() => setShouldAnimate(true));
            }
          : undefined
      }
    >
      <div
        style={{
          position: "relative",
          width: layout.totalWidth,
          height: cardHeight,
          overflow: "visible",
          paddingBottom: 32,
        }}
      >
        {cardsData.map((cardChild, i) => {
          const isHovered = hovered === i;
          const z = layout.numCards - i + (isHovered ? 100 : 0);
          const left = entered ? i * overlap : layout.initialStackLeft;
          const blur = hovered !== null && !isHovered ? blurIntensity : 0;
          const top = entered ? 0 : i * 2;
          const horizontalOffset = entered ? 0 : i * 2;
          const transitionDelay = i * animationTiming.delayStep;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: left + horizontalOffset,
                top,
                width: cardWidth,
                height: cardHeight,
                borderRadius: cardRadius,
                boxShadow: cardShadow ? `0 4px 24px rgba(0,0,0,${shadowIntensity})` : "none",
                background: "#fff",
                zIndex: z,
                willChange: "transform, opacity",
                transition: `left ${animationTiming.duration}s cubic-bezier(0.25, 0.8, 0.25, 1) ${transitionDelay}s, top ${animationTiming.duration}s cubic-bezier(0.25, 0.8, 0.25, 1) ${transitionDelay}s, opacity ${animationTiming.duration}s cubic-bezier(0.25, 0.8, 0.25, 1) ${transitionDelay}s, transform ${isHovered ? "0.3s" : "0.4s"} cubic-bezier(0.25, 0.8, 0.25, 1), filter ${isHovered ? "0.3s" : "0.4s"} cubic-bezier(0.25, 0.8, 0.25, 1)`,
                opacity: 1,
                filter: blur ? `blur(${blur}px)` : "none",
                transform: isHovered ? "scale(1.08) translateY(-12px)" : "scale(1) translateY(0)",
                outline: isHovered ? `2px solid ${hoverBorderColor}` : "none",
                overflow: "hidden",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {cardChild}
            </div>
          );
        })}
      </div>
    </div>
  );
}
