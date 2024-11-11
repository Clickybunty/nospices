import About from "../../about/About";
import Button from "../../button/Button";
import Contact from "../../contact/Contact";
import Home from "../../home/Home";
import Services from "../../services/Services";
import styles from "./Navbar.module.css";
export default function Navbar() {
  return (
    <navbar className={styles.navbarContainer}>
      <Home />
      <Contact />
      <Services />
      <About />
      <Button />
    </navbar>
  );
}
