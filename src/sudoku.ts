/**
 * The valid value of a Sudoku cell.
 *
 * The `null` value implies an empty cell.
 */
export type Value = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;

/**
 * Parse a value from a string.
 */
export const parseValue = (s: string): Value => {
  if (s === "") {
    return null;
  }

  const val = parseInt(s);
  if (typeof val === "number" && val >= 1 && val <= 9) {
    return val as Value;
  }

  return null;
};

/**
 * A Sudoku cell.
 */
export interface Cell {
  /**
   * The current value of the cell.
   */
  readonly value: Value;

  /**
   * Whether or not the cell is locked, i.e., provided by the initial state.
   */
  readonly locked: boolean;
}

/**
 * A Sudoku puzzle, which is a 9x9 grid of `Cell`s.
 */
export type Sudoku = Cell[][];

// The current, hardcoded puzzle.
const _puzzle: Value[][] = [
  [4, null, 3, null, null, 1, 6, 2, null],
  [null, 7, null, null, null, null, null, null, 1],
  [8, 6, 1, 3, null, null, null, null, 5],
  [null, null, 4, null, 3, null, null, null, 9],
  [null, 3, 8, 9, null, 7, 2, 4, null],
  [2, null, null, null, 5, null, 1, null, null],
  [7, null, null, null, null, 3, 9, 1, 2],
  [3, null, null, null, null, null, null, 6, null],
  [null, 4, 9, 7, null, null, 8, null, 3],
];

/**
 * Transform a grid of values into a Sudoku.
 */
const toSudoku = (puzzle: Value[][]): Sudoku => {
  return puzzle.map(row =>
    row.map(value => ({
      value,
      locked: value !== null,
    })),
  );
};

export const newSudoku = (): Sudoku => {
  // TODO: Generate puzzles.
  return toSudoku(_puzzle);
};

/**
 * Set the cell in the puzzle given by the x, y coordinates to the given value.
 *
 * If the cell is locked, this is a no-op.
 *
 * A new puzzle is returned with the cell set.
 */
export const setSudokuCell = (
  sudoku: Sudoku,
  x: number,
  y: number,
  value: Value,
): Sudoku => {
  if (sudoku[y][x].locked) {
    return sudoku;
  }

  const newSudoku = sudoku.slice();
  const row = (newSudoku[y] = newSudoku[y].slice());

  row[x] = {
    ...row[x],
    value,
  };

  return newSudoku;
};

/**
 * Reset the puzzle to its original state.
 *
 * All unlocked cells will be cleared.
 */
export const resetSudoku = (sudoku: Sudoku): Sudoku => {
  return sudoku.map(row =>
    row.map(cell => ({
      value: cell.locked ? cell.value : null,
      locked: cell.locked,
    })),
  );
};
