import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import style from "./Beispiel.module.css";

function Example() {
  return (
    <div className={style.beispielContainer}>
      <h1>
        Pascal Master of Git!
        <Badge bg="secondary" as={Button}>
          New
        </Badge>
      </h1>
    </div>
  );
}

export default Example;
