function generateRandomNum(min,max) {
   const randomNumber = Math.floor(Math.random() * max - min + 1);
   return randomNumber;
};

function buildNumbersArr(start,end) {
    let numAray = [];
    for(let i = start; i<= end; i++) {
        numAray.push(i);
    }
    return numAray;
};

let numbersArray = buildNumbersArr(1,133);

export default function returnRandomId () {
let randomIndex = generateRandomNum(0,numbersArray.length - 1);
let randomId = numbersArray[randomIndex];
numbersArray.splice(randomIndex, 1);
return randomId;

};