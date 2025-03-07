import React, { useRef, useState } from "react";

const Swip = ({ text, handleFun }) => {
  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [handleX, setHandleX] = useState(7); // Starting position
  const [hasSwiped, setHasSwiped] = useState(false); // Prevents multiple calls

  // Start dragging
  const handleMouseDown = () => {
    setDragging(true);
    setHasSwiped(false); // Reset so we can call handleFun again in a new drag
  };

  // Stop dragging
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Update position while dragging
  const handleMouseMove = async (e) => {
    if (!dragging) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    let newX = e.clientX - rect.left - 20; // "20" is half the handle's width

    // Constrain the handle within the container
    if (newX < 7) newX = 7;
    if (newX > rect.width - 53) newX = rect.width - 53; // 40 = handle width
    if (newX > rect.width - 190) newX = rect.width - 53;
    if (newX > 402) newX = 402;

    // Call handleFun only once per drag when we first hit 402
    if (newX === 402 && !hasSwiped) {
      await handleFun();
      setHasSwiped(true);
    }

    setHandleX(newX);
  };

  return (
    <div
      className="w-full h-14 bg-[#144E00] rounded-full relative flex items-center justify-center select-none"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // If user drags out of container
    >
      {/* Centered text */}
      <span className="text-white text-2xl font-semibold pointer-events-none">
        Swipe to {text}
      </span>

      {/* Draggable white circle */}
      <div
        className="absolute w-11 h-11 bg-white rounded-full shadow cursor-pointer"
        style={{ left: handleX, top: "5.5px" }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default Swip;
