var userName = "";
var startBtn = document.querySelector("#startBtn");
var saveBtn = document.querySelector("#saveBtn");
var timer = document.querySelector(".shotClock");
var score = 0;
var shotClock = 90;
var updateScore = document.querySelector("#newScore");
var savedName = document.querySelector("#savedName");
var currentScore = document.querySelector("#currentScore");
var currentName = document.querySelector("#currentName");

startBtn.addEventListener("click", startQuiz);
saveBtn.addEventListener("click", saveScore);


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
    choices: ["<script>", "<scripting>", "<javascript>", "<js>"],
    answer: "<script>"
  },
  {
    question: "Where is the correct place to insert external javascript?",
    choices: [
      "Both the <head> section and the <body> section are correct",
      "The <body> section",
      "The <head> section",
      "A <form> tag"
    ],
    answer: "Both the <head> section and the <body> section are correct"
  },
  {
    question: "How do you write Hello World in an alert box?",
    choices: [
      "alertbox('hello World')",
      "alert('Hello world')",
      "msg('Hello World')",
      "msgBox('Hello World')"
    ],
    answer: "alert('Hello world')"
  },
  {
    question: "How do you create a function in JavaScript?",
    choices: [
      "function:myFunction()",
      "function = myFunction()",
      "function myFunction()",
      "javascript for dummies?"
    ],
    answer: "function myFunction()"
  },
  {
    question: "How do you call a function named myFunction?",
    choices: [
      "call function myFunction()",
      "myFunction()",
      "call myFunction()",
      "Hey function your name is function!"
    ],
    answer: "myFunction()"
  },
  {
    question: "What does NaN stand for in javascript?",
    choices: ["Song lyrics","Not a name","Not a number","Not anything new"],
    answer: "Not a number"
  }
];



var $quiz = document.getElementById("quiz");
var $div = document.getElementById("message");



var qIndex = 0;
  function askQuestion() {
    $quiz.innerHTML = "";


  if (!questions[qIndex]) {
    gameOver();
    
  } else {
    var currentQuestion = questions[qIndex].question;
    var questionBtn = document.createElement("button");
    questionBtn.textContent = currentQuestion;
    questionBtn.className = "btn btn-success btn-lg btn-block qBtn";
    $quiz.appendChild(questionBtn);
    var currentChoices = questions[qIndex].choices;
      for (var i = 0; i < currentChoices.length; i++) {
        var choiceBtn = document.createElement("button");
        choiceBtn.textContent = currentChoices[i];
        choiceBtn.className = "btn btn-primary btn-lg btn-block answerBtn";
        $quiz.appendChild(choiceBtn);
    }

  }
}





$quiz.addEventListener("click", function (event) {
  event.preventDefault();
  var element = event.target;
  if (element.matches(".answerBtn")) {
    var userAnswer = element.textContent;
    checkAnswer(userAnswer);
  }
});

function checkAnswer(userAnswer) {
  // Capture the answer user clicks on
  console.log(userAnswer);
  // compare to actual answer in questions array object
  if (userAnswer === questions[qIndex].answer) {
    score++;
    currentScore.textContent = `New Score: ${score}`;
    qIndex++;
    askQuestion();

  } else {
    shotClock -= 15;
    qIndex++;
    askQuestion();
  }
  //if answer is correct we increment the score -
  //   change color of button if correct/wrong
  //if answer is incorrect reduce time



  //increment qIndex for next question after the first one is answered.
  //if questions array contains the new qIndex will call askQuestion function
  //else the question does not exist in the array then we call gameEnd function
}

// todoList.addEventListener('click', function(event){
//   event.preventDefault();
//   var element = event.target;
//   if(element.matches('button')) {
//     var index = element.parentElement.getAttribute('data-index');
//     todos.splice(index, 1);
//     renderTodos();
//   }
// })

// Countdown

function startTime() {
  timer.textContent = shotClock;
  var timerInterval = setInterval(function () {
    shotClock--;
    timer.textContent = shotClock;

    if (shotClock === -1) {
      clearInterval(timerInterval);
      gameOver();
      alert(`You got ${score} out of 10 correct, ${userName}`);
    }
  }, 1000);
}
// startQuiz();


function gameOver() {
  timer.textContent = "Time is up! Lets see how you scored!";
  shotClock = 0;
  
}

function saveScore() {
  var savedScores = JSON.parse(localStorage.getItem('highscores')) || [];
  console.log(savedScores);
  var newScore = {
    userName: userName,
    score: score
  }
  savedScores.push(newScore)
  // savedScore.push({userName, score})

  // sort the saved scores array by score high to low. array.sort()

  localStorage.setItem("highscores", JSON.stringify(savedScores));

}







// start game function 
function startQuiz() {
  userName = prompt("Please enter first name to start Quiz");
  currentName.textContent = `Name: ${userName}`;
  qIndex = 0;
  score = 0;
  startTime();
  askQuestion();
}





