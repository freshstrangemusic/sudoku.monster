import { equals } from "ramda";

import { Sudoku, Value, newSudoku } from "../../sudoku.ts";
import { update2D } from "../../utils.ts";

const SET_CELL = "sudoku.monster/sudoku/SET_CELL";
const FOCUS_CELL = "sudoku.monster/sudoku/FOCUS_CELL";

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

export interface FocusCellAction {
  type: "sudoku.monster/sudoku/FOCUS_CELL";
  payload: {
    cell?: {
      x: number;
      y: number;
    };
  };
}

export const focusCell = (cell?: {
  x: number;
  y: number;
}): FocusCellAction => ({
  type: FOCUS_CELL,
  payload: {
    cell,
  },
});

type Action = SetCellAction | FocusCellAction;

export interface State {
  sudoku: Sudoku;
  focus: {
    x: number;
    y: number;
  } | null;
}

const defaultState = {
  sudoku: newSudoku(),
  focus: null,
};

export default (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case SET_CELL: {
      const { x, y, value } = action.payload;
      const { sudoku } = state;

      if (sudoku.locked[y][x]) {
        return state;
      }

      return {
        ...state,
        sudoku: {
          ...sudoku,
          values: update2D(sudoku.values, x, y, value),
        },
      };
    }

    case FOCUS_CELL: {
      const { cell } = action.payload;

      if (equals(cell, state.focus)) {
        return state;
      }

      return {
        ...state,
        focus: cell ? { ...cell } : null,
      };
    }

    default:
      return state;
  }
};
