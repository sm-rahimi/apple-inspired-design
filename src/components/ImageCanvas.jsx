// src/components/ImageCanvas.jsx
import React, { useRef } from "react";
import Circle from "./Circle";

function ImageCanvas({
  circles,
  onUpdateCircles,
  onCircleSelect,
  selectedCircleIndex,
}) {
  const imageRef = useRef(null);

  const updateCirclePosition = (index, x, y) => {
    const imageRect = imageRef.current.getBoundingClientRect();
    const xPercent = ((x - imageRect.left) / imageRect.width) * 100;
    const yPercent = ((y - imageRect.top) / imageRect.height) * 100;

    const updatedCircles = [...circles];
    updatedCircles[index] = {
      ...updatedCircles[index],
      x: x - imageRect.left,
      y: y - imageRect.top,
      xPercent,
      yPercent,
    };
    onUpdateCircles(updatedCircles);
  };

  return (
    <div className="image-placeholder" ref={imageRef}>
      <img src="https://picsum.photos/978/541" alt="Scenic" />
      {circles.map((circle, index) => (
        <Circle
          key={index}
          index={index}
          x={circles[index].x}
          y={circles[index].y}
          size={circles[index].size}
          image={circles[index].image}
          updatePosition={updateCirclePosition}
          circles={circles}
          onCircleSelect={onCircleSelect}
          isSelected={selectedCircleIndex === index}
          materialChange={circles[index].materialChange}
        />
      ))}
    </div>
  );
}

export default ImageCanvas;
