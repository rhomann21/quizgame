/*variables*/
var choicesDiv = document.getElementById("choices");
var currentQuestionIndex = 0;
var questionBtn = document.getElementById("questionBtn");
var quizBlock = document.getElementById("quizQuestions");
var questionDiv = document.getElementById("question");
var quizDiv = document.getElementById("textWrapper");
var scoreDiv = document.getElementById("highScores");
var secondsLeft = 75;
var startBtn = document.querySelector("#startBtn");
var submitBtn = document.getElementById("submitBtn");
var time = questions.length * 15;
var timeElement = document.querySelector("#time");
var timerInterval;

//hide quiz questions
quizQuestions.style.display = "none";
highScores.style.display = "none";

//hide start screen and display questions
startBtn.onclick = function() {
  quizQuestions.style.display = "block";
  startBtn.style.display = "none";
};

//set timer and timer properties
startBtn.addEventListener("click", function() {
  setTime();
});

function setTime() {
  timerInterval = setInterval(function() {
    secondsLeft--;

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      secondsLeft = 0; // "-5" wouldn't make sense to show
    }

    timeElement.textContent = secondsLeft;
  }, 1000);
}

//call render question
startBtn.addEventListener("click", function() {
  questionDiv.innerHTML = renderQuestion(currentQuestionIndex);
  renderChoices(currentQuestionIndex);
});

questionDiv.innerHTML = renderQuestion(currentQuestionIndex);
renderChoices(currentQuestionIndex);

function renderQuestion(index) {
  return questions[index].title;
}

function renderNextQuestion(questionIndex) {
  questionDiv.innerHTML = renderQuestion(questionIndex);
  renderChoices(questionIndex);
}

//check answer
function checkAnswer(event) {
  var buttonEl = event.target;

  if (buttonEl.textContent === questions[buttonEl.questionIndex].answer) {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      renderNextQuestion(currentQuestionIndex);
    } else {
      // end quiz
      clearInterval(timerInterval);
      quizDiv.style.display = "none";
      highScores.style.display = "block";
      document.querySelector("#final-score").innerText = secondsLeft;
    }
  } else {
    secondsLeft -= 15;
  }
}

//takes in index, uses this index to return the choices from the db
function renderChoices(index) {
  choicesDiv.innerHTML = "";
  for (i = 0; i < questions[index].choices.length; i++) {
    var choiceBtn = document.createElement("button");
    choiceBtn.className = "btn btn-primary quiz-answer-btn";
    choiceBtn.textContent = questions[index].choices[i];
    choiceBtn.questionIndex = index;
    choiceBtn.onclick = checkAnswer;
    choicesDiv.appendChild(choiceBtn);
  }
}

//Add to local storage
submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  var user = document.getElementById("userInitials").value;
  var finalScore = document.querySelector("#final-score").innerText;
  var newScore = {
    user: user,
    score: finalScore
  };
  var allScores = JSON.parse(localStorage.getItem("allScores"));
  if (allScores) {
    allScores.push(newScore);
  } else {
    allScores = [newScore];
  }
  localStorage.setItem("allScores", JSON.stringify(allScores));
  window.location = "./highscores.html";
});