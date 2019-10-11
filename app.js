/*variables*/
var questionDiv = document.getElementById('question');
var choicesDiv = document.getElementById('choices');
var questionBtn = document.getElementById('questionBtn');
var startQuestion = 0;  //array of questions (question is string, choices are array, answer is string, key is number (to id into local storage)) (for loop through choices, chekc pbject for answer, if matches mark as correct)
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

//set interval to 15 seconds if click is wrong
//