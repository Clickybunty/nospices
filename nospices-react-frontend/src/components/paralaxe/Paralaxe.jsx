import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React from "react";
import styles from "./Paralaxe.module.css";
import image1 from "../../1.jpg";
import image11 from "../../cyberpunk_section_1.png";
import image2 from "../../2.jpg";
import image22 from "../../cyberpunk_section_2.png";
import image3 from "../../3.jpg";
import image33 from "../../cyberpunk_section_3.png";
// import Content from "../layout/content/Content";
import Example from "../beispiel/Beispiel";
export default function Paralaxe() {
  return (
    <div>
      <Parallax pages={3}>
        <ParallaxLayer offset={0} speed={0.5} className={styles.center}>
          <img src={image1} alt="Page 1" width="100%" />
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.3} className={styles.textOverlay}>
          <div>
            <img src={image11} alt="Page 1" width="72%" />
            <Example />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5} className={styles.center}>
          <img src={image2} alt="Page 2" width="100%" />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.3} className={styles.textOverlay}>
          <div>
            <img src={image22} alt="Page 2" width="72%" />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.5} className={styles.center}>
          <img src={image3} alt="Page 3" width="100%" />
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.3} className={styles.textOverlay}>
          <div>
            <img src={image33} alt="Page 3" width="72%" />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
