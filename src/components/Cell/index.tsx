import * as React from "react";
import { connect } from "react-redux";

import { State, SetCellAction, setCell } from "../Sudoku/ducks.ts";
import { Value, parseValue } from "../../sudoku.ts";
import * as styles from "./style.pcss";

interface OwnProps {
  x: number;
  y: number;
}

interface StateProps {
  locked: boolean;
  value: Value;
}

type Props = OwnProps &
  StateProps & {
    setCell: (x: number, y: number, value: Value) => void;
  };

const Cell = (props: Props): JSX.Element => {
  const { x, y, value, locked, setCell } = props;

  const inner = locked ? (
    <span>{value || ""}</span>
  ) : (
    <input
      className={styles["cell__input"]}
      maxLength={1}
      value={value || ""}
      onChange={(e): void => setCell(x, y, parseValue(e.target.value))}
    />
  );

  return <div className={styles["cell"]}>{inner}</div>;
};

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const { x, y } = ownProps;
  const cell = state.sudoku[y][x];

  return {
    value: cell.value,
    locked: cell.locked,
  };
};

const mapDispatchToProps = {
  setCell: (x: number, y: number, value: Value): SetCellAction =>
    setCell(x, y, value),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cell);
