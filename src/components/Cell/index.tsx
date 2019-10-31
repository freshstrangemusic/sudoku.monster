import * as React from "react";
import { connect } from "react-redux";

import { State, actions } from "../Sudoku/ducks.ts";
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
    focusCell: (x: number, y: number, union: boolean) => void;
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
        focusCell(x, y, false);
      }}
    >
      <span className={locked ? "" : styles["cell__input"]}>{value}</span>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const { x, y } = ownProps;
  const { focused, sudoku } = state;

  return {
    focused: focused[y][x],
    locked: sudoku.locked[y][x],
    value: sudoku.values[y][x],
  };
};

const mapDispatchToProps = {
  focusCell: (
    x: number,
    y: number,
    union: boolean,
  ): ReturnType<typeof actions.focusCell> => actions.focusCell(x, y, union),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cell);
