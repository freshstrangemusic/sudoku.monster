import * as React from "react";
import { connect } from "react-redux";

import { Value, parseValue } from "../../sudoku.ts";
import Cell from "../Cell";
import {
  focusCell,
  setCell,
  FocusCellAction,
  SetCellAction,
  State,
} from "./ducks.ts";
import * as styles from "./style.pcss";

interface StateProps {
  focus: {
    x: number;
    y: number;
    locked: boolean;
  } | null;
}

type Props = StateProps & {
  clearFocus: () => void;
  setCell: (x: number, y: number, value: Value) => void;
};

class Sudoku extends React.Component<Props, {}> {
  clearFocus: () => void;
  onKeyDown: (e: KeyboardEvent) => void;

  constructor(props: Props) {
    super(props);

    this.clearFocus = (): void => {
      this.props.clearFocus();
    };

    this.onKeyDown = (e: KeyboardEvent): void => {
      const { focus, setCell } = this.props;

      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        if (focus !== null) {
          setCell(focus.x, focus.y, null);
        }
      } else if (focus && !focus.locked && e.key.length === 1) {
        const value = parseValue(e.key);
        if (value !== null) {
          setCell(focus.x, focus.y, value);
        }
      }
    };
  }

  public componentDidMount(): void {
    document.addEventListener("click", this.clearFocus);
    document.body.addEventListener("keydown", this.onKeyDown);
  }

  public componentWillUnmount(): void {
    document.removeEventListener("click", this.clearFocus);
    document.body.removeEventListener("keydown", this.onKeyDown);
  }

  render(): JSX.Element {
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
}

const mapStateToProps = (state: State): StateProps => {
  const { focus, sudoku } = state;

  if (focus) {
    return {
      focus: {
        ...focus,
        locked: sudoku[focus.y][focus.x].locked,
      },
    };
  }

  return {
    focus,
  };
};

const mapDispatchToProps = {
  clearFocus: (): FocusCellAction => focusCell(),
  setCell: (x: number, y: number, value: Value): SetCellAction =>
    setCell(x, y, value),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sudoku);
