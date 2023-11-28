import React from "react";
import styles from "./Button.module.css";

function Button({ handleClick, label }) {
  return (
    <button onClick={handleClick} className={styles.btn}>
      {label}
    </button>
  );
}

export default Button;
