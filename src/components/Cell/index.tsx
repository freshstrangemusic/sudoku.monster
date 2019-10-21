import * as React from "react";

import * as styles from "./style.pcss";

export default function Cell(): JSX.Element {
  return (
    <div className={styles["cell"]}>
      <input className={styles["cell__input"]} />
    </div>
  );
}
