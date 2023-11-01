const fetch = require("node-fetch");

async function fetchValuesConcurrently(length) {
  const duplicateArray = [];

  for (let row = 0; row < length; row++) {
    const columnData = [];

    for (let column = 0; column < length; column += 2) {
      let resFirst = await fetch(`http://localhost:3001/value?rowIndex=${row}&colIndex=${column}`);
      let resSecond = await fetch(`http://localhost:3001/value?rowIndex=${row}&colIndex=${column + 1}`);
      let firstVal = await resFirst.json();
      let secondVal = await resSecond.json();
      columnData.push(firstVal.value);
      columnData.push(secondVal.value);
    }
    duplicateArray.push(columnData);
  }
  console.log(duplicateArray);
}

async function main() {
  const response = await fetch("http://localhost:3001/initialize");
  const data = await response.json();
  fetchValuesConcurrently(data.size);
}

main();
