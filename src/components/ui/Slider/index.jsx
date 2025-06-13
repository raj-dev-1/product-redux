import React, { useState, useEffect } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const images = [
  "/images/coffee-1.jpg",
  "/images/coffee-3.jpg",
  "/images/coffee-3.webp",
  "/images/coffee-4.jpg",
  "/images/coffee-4.webp",
  "/images/coffee-5.webp",
  "/images/coffee-6.webp",
  "/images/coffee-7.webp",
  "/images/coffee-8.webp"
];

const Carousal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentIndex(prev => (prev + 1) % images.length), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (delta) => {
    setCurrentIndex(prev => (prev + delta + images.length) % images.length);
  };

  return (
    <div className="relative w-full">
      <img 
        src={images[currentIndex]} 
        alt="carousel slide" 
        className="w-full h-auto object-cover" 
        loading="lazy"
      />
      <button onClick={() => handleChange(-1)} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black">
        <GoArrowLeft className="w-full h-10" />
      </button>
      <button onClick={() => handleChange(1)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black">
        <GoArrowRight className="w-full h-10" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-500"}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousal;
