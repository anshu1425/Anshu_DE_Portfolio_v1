import React, { useState, useRef } from "react";

export default function RevealGalleryStack(props) {
  const {
    items = [],
    layout = "row",
    cardRadius = 24,
    cardShadow = 0.42,
    cardBorder = true,
    borderColor = "rgba(0,0,0,0.1)",
    backgroundColor = "transparent",
    stackOffset = 18,
    spreadAmount = 360,
    rotationAmount = 7,
    hoverScale = 1.05,
    focusScale = 1.08,
    animationSpeed = 520,
    clickToFocus = false,
    dimInactive = true,
    inactiveOpacity = 0.5,
    tiltOnHover = true,
    heightMode = "portrait",
    cardWidth = 340
  } = props;

  const [isHovering, setIsHovering] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  const total = items.length;
  const activeFocus = clickToFocus ? focusedIndex : null;

  function handlePointerMove(event) {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setPointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5
    });
  }

  function handleCardClick(index) {
    if (!clickToFocus) return;
    setFocusedIndex(current => (current === index ? null : index));
  }

  function getCardTransform(index) {
    const center = (total - 1) / 2;
    const relative = index - center;
    const isFocused = activeFocus === index;
    const hasFocus = activeFocus !== null;
    const spread = isHovering || hasFocus || layout === "row";
    const baseScale = isFocused ? focusScale : isHovering ? hoverScale : 1;
    const tiltX = tiltOnHover && isHovering ? -pointer.y * 5 : 0;
    const tiltY = tiltOnHover && isHovering ? pointer.x * 5 : 0;

    if (layout === "row") {
      const x = relative * spreadAmount;
      const y = isFocused ? -18 : 0;
      const r = isHovering ? relative * rotationAmount * 0.25 : 0;
      return `translate(-50%, -50%) translate(${x}px, ${y}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotate(${r}deg) scale(${baseScale})`;
    }
    if (layout === "fan") {
      const x = spread ? relative * spreadAmount : relative * stackOffset;
      const y = spread ? Math.abs(relative) * 8 : relative * stackOffset * 0.45;
      const r = relative * (spread ? rotationAmount : rotationAmount * 0.55);
      const focusLift = isFocused ? -28 : 0;
      return `translate(-50%, -50%) translate(${x}px, ${y + focusLift}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotate(${r}deg) scale(${baseScale})`;
    }
    // stack
    const x = spread ? relative * spreadAmount : relative * stackOffset;
    const y = spread ? 0 : relative * stackOffset * 0.72;
    const r = spread ? relative * rotationAmount * 0.28 : relative * rotationAmount;
    const focusLift = isFocused ? -24 : 0;
    return `translate(-50%, -50%) translate(${x}px, ${y + focusLift}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotate(${r}deg) scale(${baseScale})`;
  }

  function getAspectRatio() {
    if (heightMode === "square") return "1 / 1";
    if (heightMode === "portrait") return "4 / 5";
    if (heightMode === "landscape") return "4 / 3";
    return undefined;
  }

  const aspectRatio = getAspectRatio();

  return (
    <div
      ref={wrapperRef}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => {
        setIsHovering(false);
        setPointer({ x: 0, y: 0 });
      }}
      onPointerMove={handlePointerMove}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 320,
        position: "relative",
        overflow: "visible",
        background: backgroundColor,
        borderRadius: cardRadius + 10,
        perspective: 1200
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 45%, rgba(255,255,255,.42), rgba(255,255,255,0) 58%)",
          pointerEvents: "none",
          opacity: isHovering ? 1 : 0.72,
          transition: `opacity ${animationSpeed}ms ease`
        }}
      />
      {items.map((card, visualIndex) => {
        const isFocused = activeFocus === visualIndex;
        const hasFocus = activeFocus !== null;
        const opacity = dimInactive && hasFocus && !isFocused ? inactiveOpacity : 1;
        const zIndex = isFocused ? 100 : 20 + visualIndex;
        
        return (
          <div
            key={visualIndex}
            onClick={() => handleCardClick(visualIndex)}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "100%",
              maxWidth: cardWidth,
              aspectRatio,
              height: aspectRatio ? undefined : "100%",
              borderRadius: cardRadius,
              cursor: clickToFocus ? "pointer" : "auto",
              transform: getCardTransform(visualIndex),
              transition: `transform ${animationSpeed}ms cubic-bezier(.2,.8,.2,1), opacity ${animationSpeed}ms ease, filter ${animationSpeed}ms ease`,
              zIndex,
              opacity,
              boxShadow: `0 ${18 + cardShadow * 40}px ${30 + cardShadow * 80}px rgba(0,0,0,${0.1 + cardShadow * 0.22})`,
              border: cardBorder ? `1px solid ${borderColor}` : "none",
              background: "white",
              willChange: "transform, opacity",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ width: "100%", height: "100%", pointerEvents: isFocused || !clickToFocus ? "auto" : "none" }}>
              {card}
            </div>
          </div>
        );
      })}
    </div>
  );
}
