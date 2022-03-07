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
let timer;
let timeRemaining;
let finalScore = 0;
let initials = "";
let questionIndex;

questionResult.textContent = "";

function checkAnswer(event) {
  event.preventDefault();
  console.log("inCheckAnswer");
  console.log(event);

  const correctAnswer = event.target.getAttribute('correct') === 'true';
  console.log(`correct answer is ${correctAnswer}`);
  if (correctAnswer) {
    console.log(`correct answer received`);
    questionResult.textContent="Correct!"
  } else {
    timeRemaining = timeRemaining - 10;
    console.log('wrong answer given');
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
  console.log("inStartTimer")
  // set Timer
  timer = setInterval(function () {
    timeRemaining--;
    timerText.textContent = timeRemaining;
 
    // check if all questions answered correctly
    if (questionIndex > quiz.length) {
      // stop timer and set final score to time remaining
      clearInterval(timer);
      finalScore = timeRemaining;
      console.log(`final score is ${finalScore}`)
      endQuiz();
    }
    // condition if player runs out of time
    if (timeRemaining <= 0) {
      // stop timer and set final score to zero
      clearInterval(timer);
      timeRemaining = 0;
      timerText.textContent = timeRemaining;
      finalScore = 0;
      console.log(`final score end timer is ${finalScore}`)
      endQuiz();
    }
  }, 1000);
}

function quizQuestions() {
  console.log(`in quizQuestions and questionIndex = ${questionIndex}`);
  
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
  console.log(`inGetQuestion and questionIndex = ${questionIndex}`)
  
  quizQuestions(questionIndex);
  
  return;
}

function returnStart() {
  // submit initials and score to local storage
  // display start Page again
  // re-enable high score button
  console.log(`inReturnStart`);
  highscoreBtn.disabled = false;
  gameoverScrn.classList.add("hide");
  startScrn.classList.remove("hide");
}

function endQuiz() {
  console.log("inendQuiz");
 
  finalScoreText.textContent = finalScore;
  // hide question screen
  questionScrn.classList.add("hide");
   // hide question screen
  gameoverScrn.classList.remove("hide");
  submitBtn.addEventListener("click", returnStart);

  return;
}

function beginQuiz() {
  // start timer
  
  // display question screen
  // pose questions
  console.log("inBeginQuiz");
  // disable High Scores button while quiz is in progress

  highscoreBtn.disabled = true;
  // hide startup screen
  startScrn.classList.add("hide");
  
  // ensure timer reset
  timeRemaining = 70;
  timerText.textContent = timeRemaining;
  
  questionScrn.classList.remove("hide");
  questionIndex = 0;
  startTimer();
  getQuestions(questionIndex);
  return;
}

function showHighScores() {
  console.log(`inshowHighScores`);
  highScoreScrn.classList.remove("hide");
  startScrn.classList.add("hide");
  
}

// When user clicks on Start, start the quiz by calling beginQuiz
startBtn.addEventListener("click", beginQuiz);

// When user clicks on High Scores, go to the highscores screen
highscoreBtn.addEventListener("click", showHighScores);
  
  
// pseudo code

// all done screen to present when either the timer runs out (no score), or all questions are answered and there is still time left (score is the amount of time left).  If there is a score, player will be asked to enter initials and submit to the highest score board
// play again button will take player back to the start screen
// highscores screen will show a list of the highest scores in order from highest to lowest.  It will have a back button and a button to clear the high scores table

// game over functions - either all questions answered or the timer reaches zero

// enter and save score in local storage

// add event listener for high scores button - disable during question time

