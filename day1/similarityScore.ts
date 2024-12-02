import { parseInputDataToLeftAndRightSide } from "../day1/day1";

function getTimesNumberAppearsInRightList(
  number: number,
  rightList: number[]
): number {
  return rightList?.filter((num) => num === number)?.length || 0;
}

export function similarityScore(): number {
  const data: { left: number[]; right: number[] } =
    parseInputDataToLeftAndRightSide();

  const leftList = data?.left || [];
  const rightList = data?.right || [];

  let score = 0;
  leftList?.forEach((leftNum) => {
    const multiplier = getTimesNumberAppearsInRightList(leftNum, rightList);

    const scoreToAdd = leftNum * multiplier;
    score += scoreToAdd;
  });

  return score;
}


