import { Sudoku, Value, newSudoku, setSudokuCell } from "../../sudoku.ts";

const SET_CELL = "sudoku.monster/sudoku/SET_CELL";

export interface SetCellAction {
  type: "sudoku.monster/sudoku/SET_CELL";
  payload: {
    x: number;
    y: number;
    value: Value;
  };
}

export const setCell = (x: number, y: number, value: Value): SetCellAction => ({
  type: SET_CELL,
  payload: {
    x,
    y,
    value,
  },
});

type Action = SetCellAction;

export interface State {
  sudoku: Sudoku;
}

const defaultState = {
  sudoku: newSudoku(),
};

export default (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case SET_CELL: {
      const { x, y, value } = action.payload;

      return {
        ...state,
        sudoku: setSudokuCell(state.sudoku, x, y, value),
      };
    }

    default:
      return state;
  }
};
