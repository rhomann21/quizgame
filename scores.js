var backBtn = document.getElementById("backBtn");
var clearScoresBtn = document.getElementById("clearScoresBtn");
var scoresElement = document.getElementById("scores");
var allScores = JSON.parse(localStorage.getItem("allScores"));

//back button to return to quiz
backBtn.addEventListener("click", function() {
  window.history.back();
});

//clear score
clearScoresBtn.addEventListener("click", function() {
  localStorage.removeItem("allScores");
  scoresElement.innerHTML = "";
});

//show the scores in list, append
function showScores() {
  for (i = 0; i < allScores.length; i++) {
    var score = allScores[i];
    var newScoreElement = document.createElement("li");
    newScoreElement.className = "scoreItem";
    newScoreElement.innerHTML =
      "User: " + score.user + ", Score: " + score.score;
    scoresElement.appendChild(newScoreElement);
  }
}

showScores();