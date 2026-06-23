import { useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function DepthBlurCarousel(incomingProps) {
  const props = {
    ...incomingProps,
    ...(incomingProps.layoutProps || {}),
    ...(incomingProps.stylingProps || {}),
    ...(incomingProps.effectProps || {}),
    ...(incomingProps.blurProps || {})
  };
  const {
    items: propItems,
    itemWidth = 500,
    itemHeight = 400,
    sideItemWidth = 320,
    sideItemHeight = 320,
    gap = 48,
    maxRotation = 35,
    perspective = 800,
    borderRadius = 16,
    scrollDamping = 100,
    blurSpread = 25,
    blurStrength = 16,
    ...domProps
  } = props;

  const renderItems = useMemo(() => {
    const pool = propItems && propItems.length > 0 ? propItems : [];
    if (pool.length === 0) return [];
    const arr = [];
    while (arr.length < 18) {
      arr.push(...pool);
    }
    return arr;
  }, [propItems]);

  const totalItems = renderItems.length;
  const scrollTarget = useRef(0);
  const rawScroll = useMotionValue(0);
  const snapTimeout = useRef(null);
  const mountRef = useRef(null);

  const smoothScroll = useSpring(rawScroll, {
    stiffness: 180,
    damping: scrollDamping,
    mass: 1,
    restDelta: 0.001
  });

  const handleWheel = (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY * 0.8;
    scrollTarget.current += delta * 0.004;
    rawScroll.set(scrollTarget.current);
    clearTimeout(snapTimeout.current);
    snapTimeout.current = setTimeout(() => {
      scrollTarget.current = Math.round(scrollTarget.current);
      rawScroll.set(scrollTarget.current);
    }, 150);
  };

  const handlePan = (e, info) => {
    const delta = -info.delta.x * 0.005;
    scrollTarget.current += delta;
    rawScroll.set(scrollTarget.current);
    clearTimeout(snapTimeout.current);
  };

  const handlePanEnd = (e, info) => {
    scrollTarget.current += -info.velocity.x * 0.0015;
    scrollTarget.current = Math.round(scrollTarget.current);
    rawScroll.set(scrollTarget.current);
  };

  if (renderItems.length === 0) return null;

  return (
    <motion.div
      {...domProps}
      ref={mountRef}
      onWheel={handleWheel}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      style={{
        width: "100%",
        height: "100%",
        minWidth: 300,
        minHeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: Math.max(perspective, 1),
        overflow: "hidden",
        position: "relative",
        cursor: "grab",
        touchAction: "pan-y",
        ...props.style
      }}
    >
      <div style={{ position: "relative", width: 0, height: 0, transformStyle: "preserve-3d" }}>
        {renderItems.map((item, i) => (
          <PremiumSmearCard
            key={`card-${i}`}
            item={item}
            index={i}
            total={totalItems}
            smoothScroll={smoothScroll}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            sideItemWidth={sideItemWidth}
            sideItemHeight={sideItemHeight}
            gap={gap}
            maxRotation={maxRotation}
            borderRadius={borderRadius}
          />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: `${blurSpread}%`,
          backdropFilter: `blur(${blurStrength}px)`,
          WebkitBackdropFilter: `blur(${blurStrength}px)`,
          maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10000
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: `${blurSpread}%`,
          backdropFilter: `blur(${blurStrength}px)`,
          WebkitBackdropFilter: `blur(${blurStrength}px)`,
          maskImage: "linear-gradient(to left, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10000
        }}
      />
    </motion.div>
  );
}

function PremiumSmearCard({
  item,
  index,
  total,
  smoothScroll,
  itemWidth,
  itemHeight,
  sideItemWidth,
  sideItemHeight,
  gap,
  maxRotation,
  borderRadius
}) {
  const localOffset = useTransform(smoothScroll, (v) => {
    let linearBase = index - v;
    let mapped = ((linearBase % total) + total) % total;
    if (mapped > total / 2) mapped -= total;
    return mapped;
  });

  const absOffset = useTransform(localOffset, Math.abs);
  const cardWidth = useTransform(absOffset, [0, 1], [itemWidth, sideItemWidth], { clamp: true });
  const cardHeight = useTransform(absOffset, [0, 1], [itemHeight, sideItemHeight], { clamp: true });
  const marginLeft = useTransform(cardWidth, (w) => -w / 2);
  const marginTop = useTransform(cardHeight, (h) => -h / 2);

  const x = useTransform(localOffset, (o) => {
    const a = Math.abs(o);
    const s = Math.sign(o);
    const centerToNext = itemWidth / 2 + gap + sideItemWidth / 2;
    const sideToSide = sideItemWidth + gap;
    if (a === 0) return 0;
    if (a <= 1) return s * centerToNext * a;
    return s * (centerToNext + (a - 1) * sideToSide * 0.85);
  });

  const z = useTransform(absOffset, (a) => -a * 200);
  const rotateY = useTransform(localOffset, (o) => {
    return Math.sign(o) * Math.min(Math.abs(o) * 35, maxRotation);
  });

  const zIndex = useTransform(absOffset, (a) => 1000 - Math.round(a * 10));
  const visibilityOpacity = useTransform(absOffset, [0, 5, 7], [1, 1, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        marginLeft,
        marginTop,
        width: cardWidth,
        height: cardHeight,
        rotateY,
        x,
        z,
        zIndex,
        transformStyle: "preserve-3d",
        opacity: visibilityOpacity
      }}
    >
      <div style={{ width: '100%', height: '100%', borderRadius, overflow: 'hidden' }}>
        {item}
      </div>
    </motion.div>
  );
}
