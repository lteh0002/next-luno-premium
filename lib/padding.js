//Function to justify final outcome of console.log of the results
export function leftFillNum(num, targetLength) {
    return num.toString().padEnd(targetLength, ' ');
}