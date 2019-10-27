import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import Sudoku from "./components/Sudoku";
import reducer from "./components/Sudoku/ducks";
import * as styles from "./index.pcss";

window.addEventListener("load", () => {
  const container = document.getElementById("content");
  const store = createStore(reducer, undefined, composeWithDevTools());

  render(
    <div className={styles["sudoku-monster"]}>
      <div className={styles["sudoku-monster__banner"]}>
        <h1>sudoku.monster</h1>
      </div>
      <Provider store={store}>
        <Sudoku />
      </Provider>
    </div>,
    container,
  );
});
