// Variables for accessing html
const startBtn = document.getElementById("start-button");
const highscoreBtn = document.getElementById("high-score");
const submitBtn = document.getElementById("submit");
const goBackBtn = document.getElementById("go-back");
const clearScoreBtn = document.getElementById("clear-scores");
const timerText = document.getElementById("timer-countdown");
const startScrn = document.getElementById("start-screen");
const questionScrn = document.getElementById("question-screen");
const gameoverScrn = document.getElementById("game-over");
const highScoreScrn = document.getElementById("high-score");
const finalScoreText = document.getElementById("final-score");


// Global variables
timeRemaining = 70;
finalScore = 0;
initials = ""

function beginQuiz() {
  // start timer
  // hide startscreen
  // display question screen
  // pose questions
  console.log("apples");
  startScrn.classList.add("hide");
  questionScrn.classList.remove("hide");

}

// When user clicks on Start, start the quiz by calling beginQuiz
startBtn.addEventListener("click", beginQuiz);
  
  
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

