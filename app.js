/*variables*/
var currentQuestionIndex = 0;
var time = questions.length * 15;

var questionDiv = document.getElementById('question');
var choicesDiv = document.getElementById('choices');
var questionBtn = document.getElementById('questionBtn');
var startQuestion = 0; 

//questions time choices submit start initials
//TIMER

var startBtn = document.querySelector('#startBtn');
var timeElement = document.querySelector('.timerElement');
var secondsLeft = 75;

function startScreen() {
  document.getElementById("startScreen").style.display = "none";
};

startBtn.addEventListener('click', function() {
    setTime();
});

function setTime() {
    var timerInterval = setInterval(function() {
    secondsLeft--;
    timeElement.textContent = secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
}

function sendMessage() {
  timeElement.textContent = "Please enter your initials:";

  var input = document.createElement('input'); 
input.type = "text"; 
//...    
container.appendChild(input); 

}


 //array of questions (question is string, choices are array, answer is string, key is number (to id into local storage)) (for loop through choices, chekc pbject for answer, if matches mark as correct)
    //score

  /* helpers */
/* takes in index, uses that index to find question in db to return the title */
function renderQuestion(index) {
    return questions[index].title;
};
/* takes in index, uses this index to return the choices from the db */
function renderChoices(index) {
    choicesDiv.innerHTML = '';
    for(i = 0; i < questions[index].choices.length; i++) {
        var choiceBtn = document.createElement('button');
        choiceBtn.className = 'btn btn-primary';
        choiceBtn.textContent = questions[index].choices[i];
        choicesDiv.appendChild(choiceBtn);
    };
}


/* events */
questionBtn.addEventListener('click', function() {
    startQuestion++;
    /* call redner question */
    questionDiv.innerHTML = renderQuestion(startQuestion);
    renderChoices(startQuestion);
});

/* init */
questionDiv.innerHTML = renderQuestion(startQuestion);
renderChoices(0);
