import React, { useEffect, useRef } from "react";
import simpleParallax from "simple-parallax-js";

const ParallaxImage = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      new simpleParallax(imageRef.current, {
        scale: 1.5,
      });
    }
  }, []);

  return (
    <div>
      <img
        ref={imageRef}
        src={require("../../parallax-background.jpg")} // Richtiger Bildpfad
        alt="Parallax Background"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default ParallaxImage;
