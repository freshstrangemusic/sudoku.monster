import * as React from "react";
import { connect } from "react-redux";
import { equals } from "ramda";

import { FocusCellAction, State, focusCell } from "../Sudoku/ducks.ts";
import { Value } from "../../sudoku.ts";
import * as styles from "./style.pcss";

interface OwnProps {
  x: number;
  y: number;
}

interface StateProps {
  focused: boolean;
  locked: boolean;
  value: Value;
}

type Props = OwnProps &
  StateProps & {
    focusCell: (x: number, y: number) => void;
  };

const Cell = (props: Props): JSX.Element => {
  const { x, y, focused, focusCell, value, locked } = props;

  const classes = [styles["cell"]];
  if (focused) {
    classes.push(styles["cell--focused"]);
  }

  return (
    <div
      className={classes.join(" ")}
      onClick={(e): void => {
        e.nativeEvent.stopImmediatePropagation();
        focusCell(x, y);
      }}
    >
      <span className={locked ? "" : styles["cell__input"]}>{value}</span>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const { x, y } = ownProps;
  const { sudoku, focus } = state;
  const value = sudoku.values[y][x];
  const locked = sudoku.locked[y][x];

  return {
    focused: equals({ x, y }, focus),
    locked,
    value,
  };
};

const mapDispatchToProps = {
  focusCell: (x: number, y: number): FocusCellAction => focusCell({ x, y }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cell);
