import React, { useState, useEffect, startTransition } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export default function StackedCardCarousel({
  children,
  backgroundColor = "transparent",
  cardBackground = "#FFFFFF",
  scrollSensitivity = 3,
  scrollDirection = "reverse",
  cardBorderRadius = 32,
  cardShadowIntensity = 1,
  cardSpacing = 40,
  animationSpeed = 260,
  dragThreshold = 50,
  forceMobileView = false,
}) {
  const cards = React.Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => {
      startTransition(() => {
        setIsMobile(forceMobileView || window.innerWidth < 768);
      });
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [forceMobileView]);

  useEffect(() => {
    let scrollTimeout;
    let accumulatedDelta = 0;
    const scrollThreshold = scrollSensitivity;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling) return;
      accumulatedDelta += e.deltaY;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = window.setTimeout(() => {
        if (Math.abs(accumulatedDelta) > scrollThreshold) {
          setIsScrolling(true);
          const scrollDown = accumulatedDelta > 0;
          const shouldAdvance = scrollDirection === "natural" ? scrollDown : !scrollDown;

          if (shouldAdvance && activeIndex < cards.length - 1) {
            startTransition(() => setActiveIndex(activeIndex + 1));
          } else if (!shouldAdvance && activeIndex > 0) {
            startTransition(() => setActiveIndex(activeIndex - 1));
          }

          setTimeout(() => {
            setIsScrolling(false);
          }, 600);
        }
        accumulatedDelta = 0;
      }, 50);
    };

    const container = document.getElementById("stacked-carousel-container");
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        container.removeEventListener("wheel", handleWheel);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      };
    }
  }, [activeIndex, cards.length, isScrolling, scrollSensitivity, scrollDirection]);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const threshold = dragThreshold;
    if (info.offset.x > threshold && activeIndex > 0) {
      startTransition(() => setActiveIndex(activeIndex - 1));
    } else if (info.offset.x < -threshold && activeIndex < cards.length - 1) {
      startTransition(() => setActiveIndex(activeIndex + 1));
    }
    animate(dragX, 0, { type: "spring", stiffness: 300, damping: 30 });
  };

  const handleCardClick = (index) => {
    if (index !== activeIndex && !isDragging) {
      startTransition(() => setActiveIndex(index));
    }
  };

  const getCardStyle = (index) => {
    const offset = index - activeIndex;
    const isViewed = index < activeIndex;

    if (isViewed) {
      return {
        x: 0,
        y: isMobile ? 600 : 800,
        scale: 0.9,
        opacity: 0,
        zIndex: cards.length + index + 100,
        rotateX: 15,
        rotateZ: 0,
      };
    }

    if (isMobile) {
      const scaleReduction = offset * 0.05;
      const mobileScaleReduction = offset * (scaleReduction * 0.625);
      return {
        x: 0,
        y: offset * (cardSpacing * -0.2),
        scale: Math.max(0.7, 1 - mobileScaleReduction),
        opacity: 1,
        zIndex: cards.length - offset,
        rotateX: 0,
        rotateZ: 0,
      };
    }

    const scaleReduction = offset * 0.08;
    const desktopScaleReduction = offset * scaleReduction;
    return {
      x: 0,
      y: offset * -cardSpacing,
      scale: Math.max(0.6, 1 - desktopScaleReduction),
      opacity: 1,
      zIndex: cards.length - offset,
      rotateX: 0,
      rotateZ: 0,
    };
  };

  return (
    <div
      id="stacked-carousel-container"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        padding: isMobile ? "20px" : "40px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxWidth: isMobile ? "100%" : "900px",
          maxHeight: isMobile ? "100%" : "600px",
          perspective: "1500px",
        }}
      >
        {cards.map((card, index) => {
          const style = getCardStyle(index);
          const isActive = index === activeIndex;
          const isBehind = index > activeIndex;
          const isViewed = index < activeIndex;

          return (
            <motion.div
              key={index}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              onClick={() => handleCardClick(index)}
              animate={style}
              transition={
                isViewed
                  ? { type: "spring", stiffness: 80, damping: 20 }
                  : { type: "spring", stiffness: animationSpeed, damping: 30 }
              }
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: cardBackground,
                borderRadius: isMobile ? cardBorderRadius * 0.75 : cardBorderRadius,
                boxShadow: isActive
                  ? `0 ${20 * cardShadowIntensity}px ${60 * cardShadowIntensity}px rgba(0, 0, 0, ${0.15 * cardShadowIntensity})`
                  : `0 ${10 * cardShadowIntensity}px ${30 * cardShadowIntensity}px rgba(0, 0, 0, ${0.08 * cardShadowIntensity})`,
                cursor: isActive ? "grab" : "pointer",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                overflow: "hidden",
                userSelect: "none",
                pointerEvents: isViewed ? "none" : isBehind ? "auto" : isActive ? "auto" : "none",
                transformStyle: "preserve-3d",
              }}
            >
              {card}
            </motion.div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "12px" : "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          zIndex: 1000,
        }}
      >
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => startTransition(() => setActiveIndex(index))}
            style={{
              width: index === activeIndex ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: index === activeIndex ? "var(--color-text)" : "var(--color-border-2)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              opacity: index === activeIndex ? 1 : 0.4,
            }}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
