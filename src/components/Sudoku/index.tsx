import * as React from "react";

import Cell from "../Cell";
import * as styles from "./style.pcss";

export default function Sudoku(): JSX.Element {
  const subgrids = [];

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const cells = [];

      for (let i = 0; i < 9; i++) {
        const cellY = y * 3 + Math.floor(i / 3);
        const cellX = x * 3 + (i % 3);
        cells.push(<Cell key={`${cellY}${cellX}`} x={cellX} y={cellY} />);
      }

      subgrids.push(
        <div key={`${y}${x}`} className={styles["subgrid"]}>
          {cells}
        </div>,
      );
    }
  }

  return <div className={styles["grid"]}>{subgrids}</div>;
}
