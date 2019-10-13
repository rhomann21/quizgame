/*variables*/
var currentQuestionIndex = 0;
var time = questions.length * 15;

var questionDiv = document.getElementById('question');
var choicesDiv = document.getElementById('choices');
var questionBtn = document.getElementById('questionBtn');
var quizBlock = document.getElementById('quizQuestions');

//questions time choices submit start initials
//TIMER

var startBtn = document.querySelector('#startBtn');
var timeElement = document.querySelector('#time');
var secondsLeft = 75;
var timerInterval;

quizQuestions.style.display = "none";

startBtn.onclick = function() { 
  quizQuestions.style.display = "block";
  startBtn.style.display = "none"; 
} 

startBtn.addEventListener('click', function() {
    setTime();
});

function setTime() {
  timerInterval = setInterval(function() {
    secondsLeft--;

    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
      secondsLeft = 0; // "-5" wouldn't make sense to show
     // sendMessage();
    }

    timeElement.textContent = secondsLeft;

  }, 1000);
};

/*function sendMessage() {
  timeElement.textContent = "Please enter your initials:";

  var input = document.createElement('input'); 
    input.type = "text"; 
    container.appendChild(input); 

};*/

startBtn.addEventListener('click', function() {
  /* call render question */
  questionDiv.innerHTML = renderQuestion(currentQuestionIndex);
  renderChoices(currentQuestionIndex);
    
});

  /* helpers */
/* takes in index, uses that index to find question in db to return the title */
questionDiv.innerHTML = renderQuestion(currentQuestionIndex);
renderChoices(currentQuestionIndex);

function renderQuestion(index) {
    return questions[index].title;
};

function renderNextQuestion(questionIndex) {
  questionDiv.innerHTML = renderQuestion(questionIndex);
  renderChoices(questionIndex);
}

function checkAnswer(event) {
  var buttonEl = event.target;
  console.log(buttonEl.textContent);
  console.log(buttonEl.questionIndex);
  console.log(buttonEl.textContent === questions[buttonEl.questionIndex].answer);

  if(buttonEl.textContent === questions[buttonEl.questionIndex].answer) {
    if(currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      renderNextQuestion(currentQuestionIndex);
    } else {
      // end quiz
      var finalScore = secondsLeft;
      clearInterval(timerInterval);
      console.log('finalScore is:', secondsLeft);
    }
  } else {
    secondsLeft -= 15;
  }
}

/* takes in index, uses this index to return the choices from the db */
function renderChoices(index) {
    choicesDiv.innerHTML = '';
    for(i = 0; i < questions[index].choices.length; i++) {
        var choiceBtn = document.createElement('button');
        choiceBtn.className = 'btn btn-primary';
        choiceBtn.textContent = questions[index].choices[i];
        choiceBtn.questionIndex = index;
        choiceBtn.onclick = checkAnswer;
        choicesDiv.appendChild(choiceBtn);

    };
};
