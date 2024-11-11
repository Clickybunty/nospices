// import Example from "../../beispiel/Beispiel";
// import Button from "../../button/Button";
import styles from "./Content.module.css";
import image0 from "../../../backgroundPicture.png";
import Warenkorb from "../../warenkorb/Warenkorb";
export default function Content() {
  return (
    <div className={styles.contentContainer}>
      <img src={image0} />
      <Warenkorb />
      {/* <Example /> */}
    </div>
  );
}
