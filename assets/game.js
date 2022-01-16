const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: "How many time zones are in Russia?",
    choice1: "4",
    choice2: "11",
    choice3: "8",
    choice4: "6",
    answer: 2,
  },
  {
    question: "What is the National flower of Japan?",
    choice1: "Jasmine",
    choice2: "Plum Blossom",
    choice3: "Wisteria",
    choice4: "Cherry Blossom",
    answer: 4,
  },
  {
    question:
      "Which of the following Empires have no written language: Incan, Aztec, Egyptian, Roman",
    choice1: "Incan",
    choice2: "Aztec",
    choice3: "Egyptian",
    choice4: "Roman",
    answer: 1,
  },
  {
    question: "Until 1923, what was the Turkish city of Istanbul called?",
    choice1: "Izmir",
    choice2: "Ankara",
    choice3: "Constantinople",
    choice4: "Bursa",
    answer: 3,
  },
  {
    question: "What is the smallest country in the world?",
    choice1: "Tuvalu",
    choice2: "Vatican City",
    choice3: "Monaco",
    choice4: "San Marino",
    answer: 2,
  },
]
const SCORE_POINTS = 100
const MAX_QUESTIONS= 4

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore",score);
    return window.location.assign("/end.html");
  }
  questionCounter ++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${
    (questionCounter / MAX_QUESTIONS) * 100
  }%`;
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset.number;
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
      console.log(classToApply)

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
}), 

incrementScore=num=> {
    score+= num
    scoreText.innerText=score
},


startGame()
