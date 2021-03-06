var startBtn = document.querySelector("#startBtn");
var saveBtn = document.querySelector("#saveBtn");
var timer = document.querySelector(".shotClock");
var updateScore = document.querySelector("#newScore");
var savedName = document.querySelector("#savedName");
var currentScore = document.querySelector("#currentScore");
var currentName = document.querySelector("#currentName");
var postScore = document.querySelector("#post");
var highscore = document.getElementById('scoreBoard');
var $scoreBoard = document.querySelector("#scoreboardDiv");
var $showScore = document.getElementById("showScore");
var $quiz = document.getElementById("quiz");
var $div = document.getElementById("message");
var restartBtn = document.getElementById("restart");
$(restartBtn).hide();
$($showScore).hide();
var qIndex = 0;
var score = 0;
var shotClock = 90;
var userName = "";
var isShowing = false;
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
        choices: ["Song lyrics", "Not a name", "Not a number", "Not anything new"],
        answer: "Not a number"
    }
];

function onload() {
    var savedScores = JSON.parse(localStorage.getItem('highscores')) || [];
    if (localStorage.getItem('highscores') == null) {
        console.log('no scores found');
        return;
    }else{
    for (var i = 0; i < savedScores.length; i++) {
        console.log(savedScores[i]);
        var name = document.createElement('li');
        name.classList.add('list-group-item');
        name.textContent = `Name: ${savedScores[i].userName} Score: ${savedScores[i].score}`;
        console.log($showScore);
        $showScore.appendChild(name);
    }}
}

function startQuiz() {
    userName = prompt("Please enter first name to start Quiz");
    currentName.textContent = `Name: ${userName}`;
    qIndex = 0;
    score = 0;
    $(startBtn).hide();
    $(restartBtn).show();
    startTime();
    askQuestion();
}

function startTime() {
    timer.textContent = shotClock;
    var timerInterval = setInterval(function () {
        shotClock--;
        timer.textContent = shotClock;
        if (shotClock <= -1) {
            clearInterval(timerInterval);
            gameOver();
            alert(`You got ${score} out of 10 correct, ${userName}`);
        }
    }, 1000);
}

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

function checkAnswer(userAnswer) {

    if (userAnswer === questions[qIndex].answer) {
        score++;
        currentScore.textContent = `New Score: ${score} / 10`;
        qIndex++;
        askQuestion();
    } else {
        shotClock -= 10;
        qIndex++;
        askQuestion();
    }
}

function gameOver() {
    timer.textContent = "Time is up! Lets see how you scored!";
    shotClock = 0;
}

function saveScore() {
    var savedScores = JSON.parse(localStorage.getItem('highscores')) || [];
    var newScore = {
        userName: userName,
        score: score
    }
    savedScores.push(newScore)
    localStorage.setItem("highscores", JSON.stringify(savedScores));
}

function restartQuiz() {
    $quiz.innerHTML = "";
    shotClock = 90;
    startQuiz()
}

onload();

highscore.addEventListener("click", function (event) {
    event.preventDefault();

    if (isShowing) {
        $($showScore).hide();
        isShowing !== false;
    } else {
        $($showScore).show();
        isShowing !== true;
    }
})

startBtn.addEventListener("click", startQuiz);
saveBtn.addEventListener("click", saveScore);
restartBtn.addEventListener("click", restartQuiz);
$quiz.addEventListener("click", function (event) {
    event.preventDefault();
    var element = event.target;
    if (element.matches(".answerBtn")) {
        var userAnswer = element.textContent;
        checkAnswer(userAnswer);
    }
});