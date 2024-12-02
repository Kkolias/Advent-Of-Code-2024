import inputData from "./input";

let numberRowList: { left: number; right: number }[] = [];

function parseInputDataToLeftAndRightSide(): {
  left: number[];
  right: number[];
} {
  // data is like "11   22{newline}33   44"
  // left is [11, 33] and right is [22, 44]

  const left: number[] = [];
  const right: number[] = [];
  const lines = inputData.split("\n");
  lines.forEach((line) => {
    const numbers = line.split("   ");
    const leftNumber = parseInt(numbers[0]);
    const rightNumber = parseInt(numbers[1]);
    left.push(leftNumber);
    right.push(rightNumber);
  });

  const leftFiltered = left.filter((num) => !isNaN(num));
  const rightFiltered = right.filter((num) => !isNaN(num));
  return { left: leftFiltered, right: rightFiltered };
}

function sortList(list: number[]): number[] {
  return list.sort((a, b) => a - b);
}

function getDiffOfRow(row: { left: number; right: number }): number {
  const leftNumber = row.left;
  const rightNumber = row.right;

  const biggerNum = leftNumber > rightNumber ? leftNumber : rightNumber;
  const smallerNum = leftNumber < rightNumber ? leftNumber : rightNumber;

  return biggerNum - smallerNum;
}

function parseDistanceList(): number[] {
  const output = numberRowList.map((row) => {
    const distance = getDiffOfRow(row);
    return distance;
  });

  return output;
}

function parseLeftRightListToOne(
  leftList: number[],
  rightList: number[]
): { left: number; right: number }[] {
  const result: { left: number; right: number }[] = [];
  for (let i = 0; i < leftList.length; i++) {
    const left = leftList?.[i] || 0;
    const right = rightList?.[i] || 0;
    result.push({ left, right });
  }
  return result;
}

function sumDistanceList(distanceList: number[]): number {
  return distanceList.reduce((acc, curr) => acc + curr, 0);
}

function main() {
  const parsed = parseInputDataToLeftAndRightSide();

  const leftSorted = sortList(parsed.left);
  const rightSorted = sortList(parsed.right);

  const rowList = parseLeftRightListToOne(leftSorted, rightSorted);
  numberRowList = rowList;

  const distanceList = parseDistanceList();
  const sum = sumDistanceList(distanceList);
  console.log("Sum of distances: ", sum);
}

main();
