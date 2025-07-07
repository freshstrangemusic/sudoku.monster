/**
 * Clone the two-dimensional array.
 */
export function clone2D<T>(arr: T[][]): T[][] {
  return arr.map(row => row.map(value => value));
}

/**
 * Update the two-dimensional array with the given value at the given coordinates.
 */
export function update2D<T>(arr: T[][], x: number, y: number, value: T): T[][] {
  return Object.assign([...arr], {
    [y]: Object.assign([...arr[y]], { [x]: value }),
  });
}
