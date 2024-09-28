// src/App.jsx
import React, { useState } from "react";
import ImageCanvas from "./components/ImageCanvas";
import MaterialSelector from "./components/MaterialSelector";

function App() {
  const [circles, setCircles] = useState([]);
  const [selectedCircleIndex, setSelectedCircleIndex] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [xInput, setXInput] = useState("");
  const [yInput, setYInput] = useState("");

  const handleAddCircle = () => {
    if (selectedMaterial && xInput !== "" && yInput !== "") {
      const newCircle = {
        x: parseInt(xInput),
        y: parseInt(yInput),
        xPercent: 0,
        yPercent: 0,
        size: selectedMaterial.size,
        image: selectedMaterial.image,
        material: selectedMaterial.name,
        index: circles.length,
        materialChange: false,
      };
      setCircles([...circles, newCircle]);
      setXInput("");
      setYInput("");
    } else {
      alert("Please select a coin and enter x and y values.");
    }
  };

  const handleUpdateCircles = (updatedCircles) => {
    // Reset materialChange after updating
    const circlesWithoutMaterialChange = updatedCircles.map((circle) => ({
      ...circle,
      materialChange: false,
    }));
    setCircles(circlesWithoutMaterialChange);
    if (selectedCircleIndex !== null) {
      const circle = circlesWithoutMaterialChange[selectedCircleIndex];
      setXInput(Math.round(circle.x));
      setYInput(Math.round(circle.y));
    }
  };

  const handleCircleSelect = (index) => {
    setSelectedCircleIndex(index);
    const circle = circles[index];
    setXInput(Math.round(circle.x));
    setYInput(Math.round(circle.y));
    setSelectedMaterial({
      name: circle.material,
      image: circle.image,
      size: circle.size,
    });
  };

  const handleMaterialChange = (material) => {
    if (selectedCircleIndex !== null) {
      const updatedCircles = [...circles];
      updatedCircles[selectedCircleIndex] = {
        ...updatedCircles[selectedCircleIndex],
        material: material.name,
        image: material.image,
        size: material.size,
        materialChange: true, // Trigger animation
      };
      setCircles(updatedCircles);
      setSelectedMaterial(material);
    } else {
      setSelectedMaterial(material);
    }
  };

  const handleSubmit = () => {
    const outputData = {
      circles: circles.map((circle) => ({
        x: circle.x,
        y: circle.y,
        xPercent: circle.xPercent,
        yPercent: circle.yPercent,
        size: circle.size,
        material: circle.material,
      })),
    };
    console.log(outputData);
  };

  return (
    <div className="app-container">
      <div className="left-section">
        <ImageCanvas
          circles={circles}
          onUpdateCircles={handleUpdateCircles}
          onCircleSelect={handleCircleSelect}
          selectedCircleIndex={selectedCircleIndex}
        />
      </div>
      <div className="right-section">
        <div className="distance-input">
          <h2>Distance for Circle</h2>
          <div className="inputs">
            <input
              type="text"
              placeholder="X"
              value={xInput}
              onChange={(e) => setXInput(e.target.value)}
            />
            <input
              type="text"
              placeholder="Y"
              value={yInput}
              onChange={(e) => setYInput(e.target.value)}
            />
          </div>
          <button onClick={handleAddCircle}>Add Coin</button>
        </div>
        <MaterialSelector
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={handleMaterialChange}
        />
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
