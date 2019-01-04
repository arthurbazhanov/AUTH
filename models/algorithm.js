// let max = 16;
// let arr = [];
// // max++;
//
// while (max--) {
//   let i = arr.length;
//   let num = Math.floor(Math.random() * (++i));
//   arr.splice(num, 0, max);
// }
// console.log(arr.join(",").match(/\d+,\d+/g).join("\n"));

const teams = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
const initialTeamsLength = teams.length;
let result = new Array(Math.floor(teams.length / 2));
for (let i = 0; i < initialTeamsLength; i++) {
  let randomTeam = teams.splice(Math.floor(Math.random() * teams.length), 1)[0];
  if (i % 2) {
    result[Math.floor(i / 2)][1] = randomTeam;
  } else {
    result[Math.floor(i / 2)] = [randomTeam];
  }
}

console.log('result');
console.log(...result);