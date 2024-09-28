// src/components/MaterialSelector.jsx
import React from "react";

// Import images
import oneEuroImage from "../assets/coins/1euro.png";
import twoEuroImage from "../assets/coins/2euro.png";
import fiftyCentImage from "../assets/coins/50cent.png";
import twentyCentImage from "../assets/coins/20cent.png";
import tenCentImage from "../assets/coins/10cent.png";

function MaterialSelector({ selectedMaterial, setSelectedMaterial }) {
  const coins = [
    { name: "1 Euro", image: oneEuroImage, size: 46 },
    { name: "2 Euro", image: twoEuroImage, size: 50 },
    { name: "50 Cent", image: fiftyCentImage, size: 48 },
    { name: "20 Cent", image: twentyCentImage, size: 44 },
    { name: "10 Cent", image: tenCentImage, size: 38 },
  ];

  return (
    <div className="material-selection">
      <h2>Material Selection</h2>
      <div className="material-options">
        {coins.map((coin, index) => (
          <div
            key={index}
            className={`material-option ${
              selectedMaterial?.name === coin.name ? "selected" : ""
            }`}
            onClick={() => setSelectedMaterial(coin)}
          >
            <img src={coin.image} alt={coin.name} className="coin-image" />
            <p>{coin.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MaterialSelector;
