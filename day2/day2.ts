import inputData from "./inputDay2";

/* 
The engineers are trying to figure out which reports are safe. 
The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing
or gradually decreasing. So, a report only counts as safe if both of the following are true:

    - The levels are either all increasing or all decreasing.
    - Any two adjacent levels differ by at least one and at most three.
*/

// function isRowSafeWithDampener(row: number[]): boolean {
//   const isIncreasingOrDecreasing = isSomeVersionOfRowIncOrDec(row);
//   if (!isIncreasingOrDecreasing) return false;

//   const biggestDiff = biggestDifInRow(row);
//   return biggestDiff <= 3;
// }

function isSomeVersionOfRowsafe(row: number[]): boolean {
  let indexToRemove = -1;
  let isVersionSafe = false;

  while (indexToRemove < row?.length) {
    if (indexToRemove === -1) {
      isVersionSafe = isRowSafe(row)
    } else {
      const rowWithoutIndex = row.filter(
        (_i, index) => index !== indexToRemove
      );
      isVersionSafe = isRowSafe(rowWithoutIndex)
    }

    if (isVersionSafe) break;

    indexToRemove += 1;
  }

  return isVersionSafe;
}

function isRowSafe(row: number[]): boolean {
  const isIncreasingOrDecreasing = isDecreasing(row) || isIncreasing(row);
  if (!isIncreasingOrDecreasing) return false;

  const biggestDiff = biggestDifInRow(row);
  return biggestDiff <= 3;
}

function biggestDifInRow(row: number[]): number {
  let biggestDiff = 0;

  row.forEach((val, index) => {
    if (index === row?.length - 1) return;

    const nextItem = row?.[index + 1];
    const diff = val - nextItem;
    const diffAbs = Math.abs(diff);
    if (diffAbs > biggestDiff) {
      biggestDiff = diffAbs;
    }
  });

  return biggestDiff;
}

function isIncreasing(row: number[]): boolean {
  return row.every((val, index, arr) => {
    if (index === arr?.length - 1) return true;

    const nextItem = arr?.[index + 1];
    const isNextBigger = val < nextItem;
    return isNextBigger;
  });
}

function isDecreasing(row: number[]): boolean {
  return row.every((val, index, arr) => {
    if (index === arr?.length - 1) return true;

    const nextItem = arr?.[index + 1];
    const isNextSmaller = val > nextItem;

    return isNextSmaller;
  });
}

function parseInputToListOfNumber(): number[][] {
  const rows = inputData.split("\n");

  const output = rows.map((row) => {
    const numbersAsStr = row.split(" ");
    const numberList =
      numbersAsStr.map((i) => parseInt(i))?.filter((r) => r) || [];
    return numberList;
  });
  return output;
}

function part1(rows: number[][]): number {
  const safeRows = rows.filter((row) => isRowSafe(row));
  return safeRows?.length;
}

function part2(rows: number[][]): number {
    const safeRows = rows.filter(row => isSomeVersionOfRowsafe(row))
    return safeRows?.length
}

function main() {
  const rows = parseInputToListOfNumber();
  console.log("Part 1 answer: ", part1(rows));
  console.log("-------------------");
  console.log("Part 2 answer: ", part2(rows));
}
main();
