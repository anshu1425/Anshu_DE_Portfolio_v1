import { useState, useEffect, useCallback, useRef, startTransition } from "react";
import { motion } from "framer-motion";

export default function ProductFocusCarousel(props) {
  const {
    items = [],
    cardRadius = 24,
    gap = 40,
    activeScale = 1,
    inactiveScale = 0.8,
    showArrows = true,
    autoplay = false,
    autoplaySpeed = 4000,
    backgroundColor = "transparent",
    arrowColor = "#000000",
    arrowBackgroundColor = "#FFFFFF",
    itemWidth = 560,
    itemHeight = 440
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Handle autoplay
  useEffect(() => {
    if (!autoplay || isHovered || items.length === 0) return;
    const interval = setInterval(() => {
      startTransition(() => {
        setActiveIndex(prev => (prev + 1) % items.length);
      });
    }, autoplaySpeed);
    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, isHovered, items.length]);

  const navigateTo = useCallback(index => {
    startTransition(() => {
      setActiveIndex(index);
    });
  }, []);

  const navigateNext = useCallback(() => {
    if (items.length === 0) return;
    startTransition(() => {
      setActiveIndex(prev => (prev + 1) % items.length);
    });
  }, [items.length]);

  const navigatePrev = useCallback(() => {
    if (items.length === 0) return;
    startTransition(() => {
      setActiveIndex(prev => (prev - 1 + items.length) % items.length);
    });
  }, [items.length]);

  const handleDragEnd = useCallback((event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      navigatePrev();
    } else if (info.offset.x < -threshold) {
      navigateNext();
    }
  }, [navigateNext, navigatePrev]);

  const getCardPosition = index => {
    const diff = index - activeIndex;
    const normalizedDiff = diff > items.length / 2 ? diff - items.length : diff < -items.length / 2 ? diff + items.length : diff;
    return normalizedDiff;
  };

  const getCardStyle = (position, isMobile) => {
    const baseWidth = isMobile ? 320 : itemWidth;
    const baseHeight = isMobile ? 380 : itemHeight;
    if (position === 0) {
      return { x: 0, scale: activeScale, zIndex: 10, opacity: 1, width: baseWidth, height: baseHeight };
    }
    const absPosition = Math.abs(position);
    const cardDirection = position > 0 ? 1 : -1;
    const translateX = cardDirection * (baseWidth * 0.85 + gap * (1 - absPosition * 0.2));
    const scale = inactiveScale * (1 - absPosition * 0.15);
    const blur = absPosition > 1 ? 2 : 0;
    return {
      x: translateX,
      scale,
      zIndex: 10 - absPosition,
      opacity: 1,
      width: baseWidth,
      height: baseHeight,
      filter: blur > 0 ? `blur(${blur}px)` : "none"
    };
  };

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div
          style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: "100%", height: "100%", touchAction: "pan-y" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          {items.map((item, index) => {
            const position = getCardPosition(index);
            const isVisible = Math.abs(position) <= 2;
            if (!isVisible) return null;
            return (
              <ProductCard
                key={index}
                item={item}
                position={position}
                isActive={position === 0}
                cardRadius={cardRadius}
                onClick={() => navigateTo(index)}
                getCardStyle={getCardStyle}
              />
            );
          })}
        </motion.div>
      </div>
      {showArrows && (
        <>
          <ArrowButton direction="left" onClick={navigatePrev} arrowColor={arrowColor} arrowBackgroundColor={arrowBackgroundColor} />
          <ArrowButton direction="right" onClick={navigateNext} arrowColor={arrowColor} arrowBackgroundColor={arrowBackgroundColor} />
        </>
      )}
    </div>
  );
}

function ProductCard({ item, position, isActive, cardRadius, onClick, getCardStyle }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const style = getCardStyle(position, isMobile);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: style.width,
        height: style.height,
        borderRadius: cardRadius,
        overflow: "hidden",
        cursor: isActive ? "default" : "pointer",
        boxShadow: isActive ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "0 10px 30px -10px rgba(0, 0, 0, 0.15)",
        zIndex: style.zIndex,
        filter: style.filter
      }}
      initial={false}
      animate={{ x: style.x, scale: style.scale, opacity: style.opacity }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onClick}
    >
      <div style={{ width: "100%", height: "100%", position: "relative", pointerEvents: isActive ? "auto" : "none" }}>
        {item}
      </div>
    </motion.div>
  );
}

function ArrowButton({ direction, onClick, arrowColor, arrowBackgroundColor }) {
  return (
    <button
      style={{
        position: "absolute",
        [direction]: "24px",
        top: "50%",
        transform: "translateY(-50%)",
        width: 48,
        height: 48,
        borderRadius: "50%",
        backgroundColor: arrowBackgroundColor,
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        zIndex: 50
      }}
      onClick={onClick}
      aria-label={direction === "left" ? "Previous" : "Next"}
      type="button"
    >
      <svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke={arrowColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: direction === "left" ? "rotate(0deg)" : "rotate(180deg)" }}
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
}
