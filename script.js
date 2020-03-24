var startBtn = document.querySelector("#startBtn");
var timer = document.querySelector(".shotClock");

startBtn.addEventListener('click', startTime);

var questions = [
  {
    question: "Hyper Text Markup Language Stand For?",
    choices: ["JavaScript", "XHTML", "CSS", "HTML"],
    answer: "HTML"
  },
  {
    question: "Which language is used for dynamically changing web pages?",
    choices: ["HTML", "JQuery", "CSS", "Javascript"],
    answer: "Javascript"
  },
  {
    question: "Which is not a JavaScript Framework?",
    choices: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: "Django"
  },
  {
    question: "Which is used for Connect To Database?",
    choices: ["PHP", "HTML", "JS", "All"],
    answer: "PHP"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<script>","<scripting>","<javascript>","<js>"],
    answers: "<script>"
  }

];


// for ( i = 0; i <questions.length; i++){
//   console.log(questions[i]);
// }


for (key in questions) {
  console.log(questions[key]);
}


// Countdown




var shotClock = 3;

function startTime() {
  var timerInterval = setInterval(function () {
    timer.textContent = shotClock;
    shotClock--;

    if (shotClock === -1) {
      clearInterval(timerInterval);
      gameOver();
    }

  }, 1000);
}
// startQuiz();

function gameOver() {
  timer.textContent = "Time is up! Lets see how you scored!";
}




