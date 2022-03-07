// Variables for accessing html
const startBtn = document.getElementById("start-button");
const highscoreBtn = document.getElementById("high-score");
const submitBtn = document.getElementById("submit");
const goBackBtn = document.getElementById("go-back");
const clearScoreBtn = document.getElementById("clear-scores");
const timerText = document.getElementById("timer-display");
const startScrn = document.getElementById("start-screen");
const questionScrn = document.getElementById("question-screen");
const gameoverScrn = document.getElementById("game-over");
const highScoreScrn = document.getElementById("high-score");
const finalScoreText = document.getElementById("final-score");
const questionAsked = document.querySelector(".question-asked");
const answerList = document.querySelector("#answer-list");
const questionResult = document.querySelector("#result");

// Global variables and assignments
let timeRemaining = 70;
let finalScore = 0;
let initials = "";

questionResult.textContent = "";

function checkAnswer() {

}

function quizQuestions() {
  questionScrn.classList.remove("hide");

  answerList.textContent = "";
  // loop through the questions
  for (var i = 0; i < quiz.length; i++) {
    const question = quiz[i];
    questionAsked.textContent = question.qu;
    for (var j = 0; j < 4; j++) {
      // create button list of answers
      const answer = question.answers[j];
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.textContent = answer;
      button.addEventListener('click', checkAnswer);
      li.appendChild(button);
      answerList.append(li);
    }

  }

}


function beginQuiz() {
  // start timer
  // hide startscreen
  // display question screen
  // pose questions
  console.log("apples");
  // disable High Scores button while quiz is in progress

  highscoreBtn.disabled = true;
  // remove startup screen
  startScrn.classList.add("hide");
  
  // ensure timer reset
  timerRemaining = 70;
  timerText.textContent = timerRemaining;
  quizQuestions();
}

function showHighScores() {
  
}

// When user clicks on Start, start the quiz by calling beginQuiz
startBtn.addEventListener("click", beginQuiz);

// When user clicks on High Scores, go to the highscores screen
highscoreBtn.addEventListener("click", showHighScores);
  
  
// pseudo code

// setup sections in html to represent the different screens to be used and use the Display: none; property to switch between them

// first screen will be the start screen which contains the instructions and the Start button
// second screen will present each question.  Questions and answers to be contained in an object accessible through array/for loops.  decide whether to use random access or sequentially work through questions
// all done screen to present when either the timer runs out (no score), or all questions are answered and there is still time left (score is the amount of time left).  If there is a score, player will be asked to enter initials and submit to the highest score board
// play again button will take player back to the start screen
// highscores screen will show a list of the highest scores in order from highest to lowest.  It will have a back button and a button to clear the high scores table

// correct answer will go on to next question
// incorrect answer will deduct ten seconds from timer

// high score and the timer show at the top of all screens except the high score screen so put in header

// variables for accessing html elements

// global variables for keeping score and timer display/control

// event listener for start button

// timer start function

// timer end function

// display questions functions

// game over functions - either all questions answered or the timer reaches zero

// enter and save score in local storage

// add event listener for high scores button - disable during question time

