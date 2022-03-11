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
const initials = document.querySelector('#initials');
const scoreList = document.querySelector('#score-list');

// Global variables and assignments
let timer;
let timeRemaining;
let finalScore = 0;
let questionIndex;
const savedScores = [];

function checkAnswer(event) {
  event.preventDefault();
  const correctAnswer = event.target.getAttribute('correct') === 'true';
  if (correctAnswer) {
    questionResult.textContent="Correct!"
  } else {
    timeRemaining = timeRemaining - 10;
    questionResult.textContent = "Wrong!";
  }
  // move to next question
  questionIndex = questionIndex + 1;
  if (questionIndex < quiz.length) {
    getQuestions(questionIndex);
  } else {
    // when all questions answered correctly, trigger win condition
    questionIndex = questionIndex + 1;
  }
  return;
}

function startTimer() {
  // set interval and start Timer
  timer = setInterval(function () {
    timeRemaining--;
    timerText.textContent = timeRemaining;
 
    // check if all questions answered correctly
    if (questionIndex > quiz.length) {
      // stop timer and set final score to time remaining
      clearInterval(timer);
      finalScore = timeRemaining;
      // go to final score screen
      endQuiz();
    }
    // condition if player runs out of time
    if (timeRemaining <= 0) {
      // stop timer and set final score to zero
      clearInterval(timer);
      timeRemaining = 0;
      timerText.textContent = timeRemaining;
      finalScore = 0;
      // go to final score screen
      endQuiz();
    }
  }, 1000);
}

function quizQuestions() {
  answerList.textContent = "";
    // render current question and answers
    const question = quiz[questionIndex];
    questionAsked.textContent = question.qu;
    for (var i = 0; i < question.answers.length; i++) {
      // render answers as a list of buttons
      const answer = question.answers[i];
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.textContent = answer;
      // add button attribute to identify correct answer
      if (question.correct == i) {
        button.setAttribute('correct', true);
      } else {
        button.setAttribute('correct', false);
      }
      button.addEventListener('click', checkAnswer);
      li.appendChild(button);
      answerList.append(li);
    } 
  return;
  }

function getQuestions(questionIndex) {
  quizQuestions(questionIndex);
return;
}

function renderHighScores() {
  console.log("in RenderHighScores");

  let tempScoreName = "";
  let tempHighScore;

  if (savedScores.length != 0) {
    for (i = 0; i < savedScores.length; i++) {
      tempScoreName = savedScores[i].saveName;
      tempHighScore = savedScores[i].saveScore;

      const li = document.createElement("li");
      li.textContent = tempHighScore + " by " + tempScoreName;
      console.log("contents of list item:  " + li.textContent);
      scoreList.appendChild(li);
    }
  }
  return;
}

// This section not working correctly - will not remove "hide" class from highScoreScreen - works for other screens if substituted in
function showHighScores(event) {
  event.preventDefault();
  console.log(`inshowHighScores`);
  highScoreScrn.classList.remove("hide");
  startScrn.classList.add("hide");
  getHighScores();
  renderHighScores();
  
  console.log(`savedScore length is ${savedScores.length}`);

  goBackBtn.addEventListener("click", beginQuiz);
  clearScoreBtn.addEventListener("click", clearHighScores);
  
  return;
}

function returnStart(event) {
  // submit initials and score to local storage
  event.preventDefault();
  
  let tempName = initials.value.trim();
  console.log(`name entered is ${tempName}`);
  // create object with player name and score
  const tempObj = {
    saveName: tempName,
    saveScore: finalScore
  }
  // add player name and score to end of savedScores array
  if (tempName != "") {
    savedScores.push(tempObj);
  }

  // write updated high score list to local storage
  localStorage.setItem("storedScores", JSON.stringify(savedScores));  
  console.log(`savedScores ${savedScores.length}`);
  // reset savedScores to 0, to ensure only updated once
  savedScores.length = 0;
  tempName = "";
   
  // re-enable high score button
  highscoreBtn.disabled = false;
  // display start Page again
  gameoverScrn.classList.add("hide");
  startScrn.classList.remove("hide");
  return;
}

function endQuiz() {
  // display players final score
  finalScoreText.textContent = finalScore;
  // hide question screen
  questionScrn.classList.add("hide");
   // show Gameover screen - allows user to enter initials
  gameoverScrn.classList.remove("hide");
  submitBtn.addEventListener("click", returnStart);
  return;
}

function clearHighScores(event) {
  event.preventDefault;
  console.log("inclearHighScores");

  const clearEntry = [];
  clearEntry.length = 0;
  // set local storage to empty array to clear saved scores
  localStorage.setItem("storedScores", JSON.stringify(clearEntry));
  console.log("storage now contains:  " + JSON.parse(localStorage.getItem("storedScores")));
  return;
}

function getHighScores() {
  // get high scores from local storage
  let tempScores = JSON.parse(localStorage.getItem("storedScores"));
 
  if (tempScores != null) {
    // add each name/score object in storage to savedScores
    for (i = 0; i < tempScores.length; i++) {
      savedScores[i] = tempScores[i];
    }
  }
  return;
}

function beginQuiz() {
  // reset variables
  questionResult.textContent = "";
  initials.textContent = "";
  // savedScores.length = 0;
  
  // disable High Scores button while quiz is in progress
  highscoreBtn.disabled = true;
  // hide startup screen
  startScrn.classList.add("hide");
  
  // ensure timer reset
  timeRemaining = 70;
  timerText.textContent = timeRemaining;
  // display question screen
  questionScrn.classList.remove("hide");
  questionIndex = 0;
  // start timer
  startTimer();
  getQuestions(questionIndex);
  return;
}

getHighScores();

// When user clicks on Start, start the quiz by calling beginQuiz
startBtn.addEventListener("click", beginQuiz);

// When user clicks on High Scores, go to the highscores screen
highscoreBtn.addEventListener("click", showHighScores);
  
  
// pseudo code

// play again button will take player back to the start screen
// highscores screen will show a list of the highest scores in order from highest to lowest.  It will have a back button and a button to clear the high scores table

// enter and save score in local storage

// add event listener for high scores button - disable during question time

