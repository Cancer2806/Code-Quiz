// Variables for accessing html
const btnStart = document.getElementById("start-button");
const btnHighScores = document.getElementById("high-score");
const btnSubmit = document.getElementById("submit");
const btnGoBack = document.getElementById("go-back");
const btnClearHighScores = document.getElementById("clear-scores");
const scrnStart = document.getElementById("start-screen");
const scrnQuestions = document.getElementById("question-screen");
const scrnGameOver = document.getElementById("game-over");
const scrnHighScore = document.getElementById("high-score");
const txtTimer = document.getElementById("timer-display");
const txtFinalScore = document.getElementById("final-score");
const txtAskQuestion = document.querySelector(".question-asked");
const lstAnswers = document.querySelector("#answer-list");
const txtResult = document.querySelector("#result");
const inptInitials = document.querySelector('#initials');
const lstScoreList = document.querySelector('#score-list');

// Global variables and assignments
let timer;
let timeRemaining;
let finalScore = 0;
let idxQuestion;
const savedScores = [];

// Functions that start and run quiz
// Function to retrieve list of saved scores from local storage
function getSavedScores() {
  // get high scores from local storage
  let currentScoreList = JSON.parse(localStorage.getItem("storedScores"));
  // populate savedScores array from data in local storage
  if (currentScoreList != null) {
    // add each name/score object in storage to savedScores
    for (i = 0; i < currentScoreList.length; i++) {
      savedScores[i] = currentScoreList[i];
    }
  }
  return;
}

// Function to add name/score to local storage and reload the page
function writeScore(event) {
  event.preventDefault();
  // submit Initials and score to local storage
  let currentName = inptInitials.value.trim();
  // if initials are entered, retrieve saved scores from local storage and add current Name
  if (currentName != "" || null) {
    getSavedScores();
    // create object with player name/score and add to list of saved scores
    const tempObj = {
      saveName: currentName,
      saveScore: finalScore,
    }
    savedScores.push(tempObj);
    // write updated high score list to local storage
    localStorage.setItem("storedScores", JSON.stringify(savedScores));
  }
  window.location.reload();
  return;
}

// Function to show the User's score and allow entry of initials
function endQuiz() {
  // display players final score
  txtFinalScore.textContent = finalScore;
  // hide question screen
  scrnQuestions.classList.add("hide");
  // show Gameover screen - allows user to enter Initials
  scrnGameOver.classList.remove("hide");
  btnSubmit.addEventListener("click", writeScore);
  return;
}

// Function to start and end timer when end conditions met
function startTimer() {
  // set interval and start Timer with interval 1000ms
  timer = setInterval(function () {
    timeRemaining--;
    // end condition if all questions answered
    if (idxQuestion > quiz.length) {
      // stop timer and set final score to time remaining
      clearInterval(timer);
      finalScore = timeRemaining;
      // go to Game Over screen
      endQuiz();
    }
    // end condition if User runs out of time
    if (timeRemaining <= 0) {
      // stop timer and set final score to zero
      clearInterval(timer);
      timeRemaining = 0;
      finalScore = 0;
      // go to Game Over screen
      endQuiz();
    }
    // display time remaining on screen
    txtTimer.textContent = timeRemaining;
  }, 1000);
  return;
}

// Function to check User's answer and call the next question
function checkAnswer(event) {
  event.preventDefault();
  // check answer
  const correctAnswer = event.target.getAttribute('correct') === 'true';
  if (correctAnswer) {
    txtResult.textContent = "Correct!"
  } else {
    timeRemaining = timeRemaining - 10;
    txtResult.textContent = "Wrong!";
  }
  // move to next question
  idxQuestion = idxQuestion + 1;
  if (idxQuestion < quiz.length) {
    quizQuestions(idxQuestion);
  } else {
    // when all questions answered, trigger end condition in startTimer function
    idxQuestion = idxQuestion + 1;
  }
  return;
}

// Function to display the quiz question and answer options
function quizQuestions(idxQuestion) {
  // reset the answer list
  lstAnswers.textContent = "";
  // render current question and answers
  const currentQuestion = quiz[idxQuestion];
  txtAskQuestion.textContent = currentQuestion.question;
  for (var i = 0; i < currentQuestion.answers.length; i++) {
    // render answers as a list of buttons
    const currentAnswer = currentQuestion.answers[i];
    const li = document.createElement('li');
    li.classList.add("list-answer");
    const button = document.createElement('button');
    button.classList.add("btn-answer");
    button.textContent = currentAnswer;
    // add button attribute to identify if current answer is correct
    if (currentQuestion.correct === i) {
      button.setAttribute('correct', true);
    } else {
      button.setAttribute('correct', false);
    }
    li.appendChild(button);
    lstAnswers.append(li);
    // add listener to determine if current answer is selected
    button.addEventListener('click', checkAnswer);
  }
  return;
}

// Function to reset global variables and start the quiz
function beginQuiz() {
  // reset variables
  txtResult.textContent = "";
  inptInitials.textContent = "";
  timeRemaining = 70;
  txtTimer.textContent = timeRemaining;
  idxQuestion = 0;
  savedScores.length = 0;

  // disable High Scores button while quiz is in progress
  btnHighScores.disabled = true;

  // hide startup screen
  scrnStart.classList.add("hide");
  // display question screen
  scrnQuestions.classList.remove("hide");
  // start timer and display first question
  startTimer();
  quizQuestions(idxQuestion);
  return;
}

// Function to display high scores to the screen as a list
function renderHighScores() {
  // set maximum number of high scores to show
  let numToDisplay = 5;
  // prevent multiple clicks of Highscores button from adding multiple sets of the high scores list
  lstScoreList.innerHTML = "";
  // call function to sort the high scores list
  savedScores.sort(function (a, b) {
    if (b.saveScore > a.saveScore) {
      return 1;
    } else {
      return -1;
    }
  })
  // creates and renders high scores if there are any saved
  if (savedScores.length != 0) {
    // limit the display to length fo savedScores or 5, whichever is the lesser
    if (savedScores.length < 5) {
      numToDisplay = savedScores.length;
    }
    for (i = 0; i < numToDisplay; i++) {
      const li = document.createElement("li");
      li.textContent = savedScores[i].saveScore + " by " + savedScores[i].saveName;
      li.classList.add("li-highscore");
      lstScoreList.appendChild(li);
    }
  }
  return;
}

// This section not working correctly - will not remove "hide" class from highScoreScreen - works for other screens if substituted in
// Function to display High Scores list
function showHighScores(event) {
    
  // The next line is not working
  scrnHighScore.classList.remove("hide");

  // From here down is working as planned
  scrnStart.classList.add("hide");
  // Retrieve high scores from local storage
  getSavedScores();
  // Sort scores and display the top 5 only
  renderHighScores();
  // If user presses Go Back button, reloads page
  btnGoBack.addEventListener("click", function (event) {
    window.location.reload();
  });
  // if User presses Clear Highscores, clears scores from local storage and reloads page
  btnClearHighScores.addEventListener("click", function (event) {
    localStorage.setItem('storedScores', "[]");
    window.location.reload();
  });
  return;
}

// Event listeners for buttons displayed on opening screen
// When user clicks on Start, start the quiz by calling beginQuiz
btnStart.addEventListener("click", beginQuiz);

// When user clicks on High Scores, go to the highscores screen
btnHighScores.addEventListener("click", showHighScores);
