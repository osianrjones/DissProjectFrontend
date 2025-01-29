import React, { useState } from 'react';
import slide1 from '../resources/slide1.mp4';
import slide2 from '../resources/slide2.mp4';
import slide3 from '../resources/slide3.mp4';

const Carousel = () => {
  const items = [
    {
      image: slide1,
    },
    {
      image: slide2,
    },
    {
      image: slide3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-2/3 h-screen">
      <div className="w-full h-full bg-cover bg-center rounded-lg">
          <div className="flex items-center justify-center h-full rounded-xl">
              <video
                  key={currentIndex}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="video-fade"
                  style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: -1, // Keeps the video in the background
                  }}
              >
                  <source src={items[currentIndex].image} type="video/mp4"/>
              </video>
                  <p className="text-white text-xl text-center">{items[currentIndex].text}</p>
          </div>
      </div>
        <button
            className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-gray-700 text-white p-2 rounded-full focus:outline-none"
            onClick={prevSlide}
        >
            &#10094; {/* Left Arrow */}
        </button>
        <button
            className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-gray-700 text-white p-2 rounded-full focus:outline-none"
            onClick={nextSlide}
        >
            &#10095; {/* Right Arrow */}
        </button>
        <style>
            {`.video-fade {
                opacity: 0;
                animation: fadeIn 0.5s forwards;
            }
            
            @keyframes fadeIn {
                to {
                    opacity: 1;
                }
            }
            `}
        </style>
    </div>
);
};

export default Carousel;
