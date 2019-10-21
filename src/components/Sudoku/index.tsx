import * as React from "react";

import Cell from "../Cell";
import * as styles from "./style.pcss";

export default function Sudoku(): JSX.Element {
  const subgrids = [];

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const cells = [];

      for (let i = 0; i < 9; i++) {
        cells.push(<Cell key={i} />);
      }

      subgrids.push(<div className={styles["subgrid"]}>{cells}</div>);
    }
  }

  return <div className={styles["grid"]}>{subgrids}</div>;
}
