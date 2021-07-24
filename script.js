"use strict";
const name1 = prompt("what is player-1 name?");
const name2 = prompt("what is player-2 name?");
document.querySelector(".player-1-name").innerHTML = name1;
document.querySelector(".player-2-name").innerHTML = name2;

const gameTable = document.querySelector(".game-table");
const turn1 = document.querySelector(".turn1");
const turn2 = document.querySelector(".turn2");
const score1 = document.querySelector(".score-1");
const score2 = document.querySelector(".score-2");
let currentActive = 0;
const playAgain = document.querySelector(".btn-play-again");
let arr = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];
let score = [0, 0];
console.log(arr);
//check row

//fill winner
const fillWinner = function (winnerArr) {
  for (let [r, c] of winnerArr) {
    let generator = r * 3 + (c + 1);
    const cell = document.querySelector(`.cell-${generator}`);
    cell.style.background = "green";
  }
};
const checkRow = function () {
  for (let i = 0; i < arr.length; i++) {
    let fi = arr[i][0];
    let count = 1;
    if (fi !== -1) {
      for (let j = 1; j < arr[0].length; j++) {
        if (fi === arr[i][j]) count++;
      }
    }
    if (count === arr[i].length) {
      fillWinner([
        [i, 0],
        [i, 1],
        [i, 2],
      ]);

      return true;
    }
  }
};

const checkCol = function () {
  for (let i = 0; i < arr[0].length; i++) {
    let fi = arr[0][i];
    let count = 1;
    if (fi !== -1) {
      for (let j = 1; j < arr.length; j++) {
        if (fi === arr[j][i]) count++;
      }
    }
    if (count === arr[i].length) {
      fillWinner([
        [0, i],
        [1, i],
        [2, i],
      ]);

      return true;
    }
  }
};

const checkDiagonal1 = function () {
  let fi = arr[0][0];
  if (fi !== -1 && fi === arr[1][1] && fi === arr[2][2]) {
    fillWinner([
      [0, 0],
      [1, 1],
      [2, 2],
    ]);

    return true;
  }
};
const checkDiagonal2 = function () {
  let fi = arr[0][2];
  if (fi !== -1 && fi === arr[1][1] && fi === arr[2][0]) {
    fillWinner([
      [0, 2],
      [1, 1],
      [2, 0],
    ]);
    return true;
  }
};
const updateScore = function () {
  score1.textContent = score[0];
  score2.textContent = score[1];
  score1.style.fontSize = "3rem";
  score2.style.fontSize = "3rem";
};

gameTable.addEventListener("click", function (e) {
  let source = currentActive === 0 ? "o" : "x";
  let parent = e.target.id;

  const html = ` <img class="cell-img" src="${source}-img.png" />`;
  let createClassName = `.cell-${parent}`;
  const currentCell = document.querySelector(createClassName);
  currentCell.innerHTML = html;

  let n = Number(parent);
  let row = Math.trunc((n - 1) / 3);
  let col = Math.trunc((n - 1) % 3);

  arr[row][col] = currentActive;

  if (checkRow()) {
    score[currentActive]++;
    updateScore();
  }
  if (checkCol()) {
    score[currentActive]++;
    updateScore();
  }
  if (checkDiagonal1()) {
    score[currentActive]++;
    updateScore();
  }
  if (checkDiagonal2()) {
    score[currentActive]++;
    updateScore();
  }
  if (currentActive === 0) currentActive = 1;
  else currentActive = 0;
  turn1.classList.toggle("hidden");
  turn2.classList.toggle("hidden");
});

playAgain.addEventListener("click", function () {
  reset();
});

const reset = function () {
  arr = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
  for (let i = 1; i <= 9; i++) {
    let cellGener = `.cell-${i}`;
    let findIt = document.querySelector(cellGener);
    findIt.innerHTML = "";
    findIt.style.background = "#ff94cc";
  }
};
