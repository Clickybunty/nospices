import Button from "../../button/Button";
import Impressum from "../../impressum/Impressum";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <Impressum />
      <Button />
    </footer>
  );
}
export default Footer();
