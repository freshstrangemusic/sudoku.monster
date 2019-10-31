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
  dragging: boolean;
  focused: boolean;
  locked: boolean;
  value: Value;
}

type Props = OwnProps &
  StateProps & {
    focusCell: (x: number, y: number, union: boolean) => void;
    setDragging: (dragging: boolean) => void;
  };

const Cell = (props: Props): JSX.Element => {
  const {
    dragging,
    focusCell,
    focused,
    locked,
    setDragging,
    value,
    x,
    y,
  } = props;

  const classes = [styles["cell"]];
  if (focused) {
    classes.push(styles["cell--focused"]);
  }

  return (
    <div
      className={classes.join(" ")}
      onMouseDown={(): void => {
        setDragging(true);
        focusCell(x, y, false);
      }}
      onMouseUp={(): void => {
        setDragging(false);
      }}
      onMouseEnter={(): void => {
        if (dragging) {
          focusCell(x, y, true);
        }
      }}
    >
      <span className={locked ? "" : styles["cell__input"]}>{value}</span>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const { x, y } = ownProps;
  const { dragging, focused, sudoku } = state;

  return {
    dragging,
    focused: focused[y][x],
    locked: sudoku.locked[y][x],
    value: sudoku.values[y][x],
  };
};

const mapDispatchToProps = {
  setDragging: (dragging: boolean): ReturnType<typeof actions.setDragging> =>
    actions.setDragging(dragging),
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
