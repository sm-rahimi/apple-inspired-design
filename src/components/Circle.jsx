// src/components/Circle.jsx
import React, { useRef, useEffect } from "react";

function Circle({
  index,
  x,
  y,
  size,
  image,
  updatePosition,
  circles,
  onCircleSelect,
  isSelected,
  materialChange,
}) {
  const circleRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    if (materialChange) {
      // Trigger animation on material change
      circle.classList.add("material-change");
      setTimeout(() => {
        circle.classList.remove("material-change");
      }, 600); // Duration of the animation
    }

    circle.style.backgroundImage = `url(${image})`;
  }, [x, y, size, image, materialChange]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    onCircleSelect(index);

    const circle = circleRef.current;
    const shiftX = e.clientX - circle.getBoundingClientRect().left;
    const shiftY = e.clientY - circle.getBoundingClientRect().top;

    function onMouseMove(event) {
      let newX = event.clientX - shiftX;
      let newY = event.clientY - shiftY;

      // Ensure the circle stays within the image boundaries
      const imageRect = circle.parentElement.getBoundingClientRect();
      const circleDiameter = size;

      // Correct the position if the circle is going out of bounds
      newX = Math.max(0, Math.min(newX, imageRect.width - circleDiameter));
      newY = Math.max(0, Math.min(newY, imageRect.height - circleDiameter));
      //console.log("newX:", newX, "newY:", newY, "size", size);

      // Adjust position to prevent collision with other circles
      let adjustedX = newX;
      let adjustedY = newY;
      const offset = { x: size * 0.36, y: size * 0.36 };

      circles.forEach((otherCircle, i) => {
        if (i !== index) {
          const dx = adjustedX - otherCircle.x - offset.x;
          const dy = adjustedY - otherCircle.y - offset.y;
          const distance = Math.hypot(dx, dy);
          const minDistance = (size + otherCircle.size) / 2 + size / 12.5;

          if (distance < minDistance) {
            // Calculate overlap
            const overlap = minDistance - distance;

            // Adjust position to eliminate overlap
            const angle = Math.atan2(dy, dx);
            adjustedX += Math.cos(angle) * overlap;
            adjustedY += Math.sin(angle) * overlap;
          }
        }
      });

      // Ensure the adjusted position is within bounds after adjustment
      adjustedX = Math.max(
        0,
        Math.min(adjustedX, imageRect.width - circleDiameter)
      );
      adjustedY = Math.max(
        0,
        Math.min(adjustedY, imageRect.height - circleDiameter)
      );

      updatePosition(index, adjustedX, adjustedY);
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, { once: true });
  };

  return (
    <div
      className={`circle ${isSelected ? "selected" : ""}`}
      ref={circleRef}
      onMouseDown={handleMouseDown}
    ></div>
  );
}

export default Circle;
