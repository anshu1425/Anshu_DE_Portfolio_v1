import React, { useState, useRef, useEffect, startTransition } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export default function ElevatedCarousel(props) {
  const {
    items = [],
    cardWidth = 350,
    cardHeight = 350,
    cardGap = 24,
    elevationOffset = 60,
    backgroundColor = "transparent",
    cardRadius = 24,
    titleColor = "var(--color-text)",
    subheadlineColor = "var(--color-text-2)",
  } = props;

  const [activeIndex, setActiveIndex] = useState(() => Math.floor(items.length / 2));
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const x = useMotionValue(0);

  const totalWidth = items.length * (cardWidth + cardGap);
  const centerOffset = containerRef.current ? containerRef.current.offsetWidth / 2 - cardWidth / 2 : 0;

  useEffect(() => {
    if (!containerRef.current) return;
    const calculatedCenterOffset = containerRef.current.offsetWidth / 2 - cardWidth / 2;
    const targetX = -activeIndex * (cardWidth + cardGap) + calculatedCenterOffset;
    animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
  }, [activeIndex, cardWidth, cardGap, x, items.length]);

  useEffect(() => {
    const checkMobile = () => {
      startTransition(() => setIsMobile(window.innerWidth < 768));
    };
    if (typeof window !== "undefined") {
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  const handlePrevious = () => {
    if (activeIndex > 0) {
      startTransition(() => setActiveIndex(activeIndex - 1));
    }
  };

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      startTransition(() => setActiveIndex(activeIndex + 1));
    }
  };

  const wheelTimeout = useRef(null);
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 15) {
      if (wheelTimeout.current) return;
      if (e.deltaX > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
      wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 500);
    }
  };

  const handleDragEnd = (event, info) => {
    if (!containerRef.current) return;
    const swipeThreshold = 40;
    const currentX = x.get();
    const calculatedCenterOffset = containerRef.current.offsetWidth / 2 - cardWidth / 2;
    const cardTotalWidth = cardWidth + cardGap;
    
    let newIndex = Math.round((-currentX + calculatedCenterOffset) / cardTotalWidth);
    
    if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      newIndex = activeIndex + 1;
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      newIndex = activeIndex - 1;
    }

    const clampedIndex = Math.max(0, Math.min(items.length - 1, newIndex));
    startTransition(() => {
      setActiveIndex(clampedIndex);
      setIsDragging(false);
    });
  };

  const handleCardClick = index => {
    if (!isDragging && index !== activeIndex) {
      startTransition(() => setActiveIndex(index));
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", backgroundColor, overflowX: "hidden", overflowY: "visible", position: "relative", userSelect: "none" }}>
      <div ref={containerRef} onWheel={handleWheel} style={{ flex: 1, position: "relative", overflow: "visible", display: "flex", alignItems: "center" }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: -(totalWidth - (containerRef.current?.offsetWidth || 0)), right: 0 }}
          dragElastic={0.1}
          onDragStart={() => startTransition(() => setIsDragging(true))}
          onDragEnd={handleDragEnd}
          style={{ display: "flex", gap: cardGap, x, cursor: isDragging ? "grabbing" : "grab", touchAction: "pan-y" }}
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div key={index} onClick={() => handleCardClick(index)} style={{ width: cardWidth, flexShrink: 0, cursor: "pointer", position: "relative", height: cardHeight + 120 }}>
                {/* Elevated Top Section */}
                <motion.div
                  animate={{ y: isActive ? -elevationOffset : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    width: "100%",
                    height: cardHeight,
                    borderRadius: cardRadius,
                    position: "relative",
                    zIndex: 2,
                    backgroundColor: item.bg || 'var(--color-bg-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--color-border)',
                    boxShadow: isActive ? '0 12px 32px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    {item.img ? (
                      <img src={item.img} alt={item.title} draggable="false" style={{ width: 80, height: 80, objectFit: 'contain' }} />
                    ) : (
                      <div style={{ fontSize: 72 }}>{item.icon || '📜'}</div>
                    )}
                  </div>
                </motion.div>

                {/* Bottom Text Section */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    paddingTop: 24,
                    zIndex: 1,
                    pointerEvents: "none",
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    transform: `translateY(${isActive ? 0 : -20}px)`
                  }}
                >
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <h3 style={{ margin: 0, color: titleColor, fontSize: 20, fontWeight: 700, lineHeight: 1.3 }}>{item.title}</h3>
                    <p style={{ margin: 0, color: subheadlineColor, fontSize: 15 }}>{item.subheadline}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <button onClick={handlePrevious} disabled={activeIndex === 0} style={{ position: "absolute", left: 16, top: `calc(50% - ${elevationOffset / 2}px)`, transform: "translateY(-50%)", width: 48, height: 48, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 50, opacity: activeIndex === 0 ? 0.3 : 1, transition: "opacity 0.2s ease" }} aria-label="Previous">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button onClick={handleNext} disabled={activeIndex === items.length - 1} style={{ position: "absolute", right: 16, top: `calc(50% - ${elevationOffset / 2}px)`, transform: "translateY(-50%)", width: 48, height: 48, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 50, opacity: activeIndex === items.length - 1 ? 0.3 : 1, transition: "opacity 0.2s ease" }} aria-label="Next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
      </button>
    </div>
  );
}
