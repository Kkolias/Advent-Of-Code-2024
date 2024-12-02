import inputData from './inputDay2'

/* 
The engineers are trying to figure out which reports are safe. 
The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing
or gradually decreasing. So, a report only counts as safe if both of the following are true:

    - The levels are either all increasing or all decreasing.
    - Any two adjacent levels differ by at least one and at most three.
*/


function parseInputToListOfNumber(): number[][] {
    const rows = inputData.split('\n');
    
    const output = rows.map(row => {
        const numbersAsStr = row.split(' ')
        const numberList = numbersAsStr.map(i => parseInt(i))?.filter(r => r) || []
        return numberList
    })

    console.log(output)

    return []
}

parseInputToListOfNumber()