/* DOM */

let startSection = document.querySelector(".start-wrapper");
let quizSection = document.querySelector(".quiz-wrapper");
let startButton = document.querySelector(".start-button");
let quizHeading = document.querySelector(".question-heading");
let buttons = document.querySelectorAll(".answer-row > button");
let resultHeading = document.querySelector(".result-heading");

let signs = ["-", "+"];
let answerCounter = 0;
let rightCounter = 0;
let wrongCounter = 0;

let currentRight;

/* functions */

function startGame() {
  startSection.classList.add("hide");
  quizSection.classList.remove("hide");
  setTimeout(endGame, 10000);
  generateQuestion();
  answerCounter = 0;
  rightCounter = 0;
  wrongCounter = 0;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateQuestion() {
  let number1 = getRandomInt(50);
  let number2 = getRandomInt(50);
  let sign = signs[getRandomInt(signs.length)];
  quizHeading.innerHTML = `${number1} ${sign} ${number2}`;
  createAnswer(number1, number2, sign);
}

function createAnswer(number1, number2, sign) {
  let correctNumber = getRandomInt(buttons.length);

  for (let i = 0; i < buttons.length; i += 1) {
    if (i === correctNumber) {
      buttons[i].className = "button-right";

      if (sign === "-") {
        buttons[i].innerHTML = number1 - number2;
        currentRight = number1 - number2;
      } else {
        buttons[i].innerHTML = number1 + number2;
        currentRight = number1 + number2;
      }

    } else {
      buttons[i].innerHTML = getRandomInt(100);
      buttons[i].className = "button-wrong";
    }
  }
}

startButton.addEventListener("click", startGame);

for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener("click", generateQuestion);
  buttons[i].addEventListener("click", checkAnswer(i));
}

function endGame() {
  startSection.classList.remove("hide");
  quizSection.classList.add("hide");
  resultHeading.classList.remove("hide");
  resultHeading.innerHTML = `total: ${answerCounter}, right: ${rightCounter}, wrong: ${wrongCounter}`;
}

function checkAnswer(i) {
  return function () {
    answerCounter += 1;

    if (buttons[i].innerHTML === String(currentRight)) {
      rightCounter += 1;
      console.log("check")
    } else {
      wrongCounter += 1;
    }
  }
}