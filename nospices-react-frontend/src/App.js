import "./App.css";
import Content from "./components/layout/content/Content";
import Footer from "./components/layout/footer/Footer";
import Navbar from "./components/layout/navbar/Navbar";
import Paralaxe from "./components/paralaxe/Paralaxe";

export default function App() {
  return (
    <div className="appContainer">
      <Navbar />
      <Paralaxe />
      <Content />
      <Footer />
    </div>
  );
}
