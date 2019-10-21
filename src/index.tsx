import * as React from "react";
import { render } from "react-dom";

import * as styles from "./index.pcss";

window.addEventListener("load", () => {
  const container = document.getElementById("content");

  render(
    <div className={styles["sudoku-monster"]}>
      <h1>sudoku.monster</h1>
    </div>,
    container,
  );
});
