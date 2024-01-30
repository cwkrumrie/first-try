const questions = [
  {
    question:
      "Which of the three Greek appeals refers to emotion or sensibility?",
    answers: [
      { text: "Logos", correct: false },
      { text: "Ethos", correct: false },
      { text: "Pathos", correct: true },
      { text: "None of These", correct: false },
    ],
  },
  {
    question: "Which is NOT part of the rhetorical situation?",
    answers: [
      { text: "Timing", correct: true },
      { text: "Audience", correct: false },
      { text: "Purpose", correct: false },
      { text: "Genre", correct: false },
    ],
  },
  {
    question: "Which of the following would most appeal to logos?",
    answers: [
      { text: "Evidence", correct: true },
      { text: "Credentials", correct: false },
      { text: "Humor", correct: false },
      { text: "Citations", correct: false },
    ],
  },
  {
    question: "Who do we often refer to as the father of rhetoric?",
    answers: [
      { text: "Plato", correct: false },
      { text: "Aristotle", correct: true },
      { text: "Socrates", correct: false },
      { text: "Erasmus", correct: false },
    ],
  },
  {
    question: "In the rhetorical situation, to what does genre refer?",
    answers: [
      { text: "Reason", correct: false },
      { text: "Reader", correct: false },
      { text: "Category", correct: true },
      { text: "Design", correct: false },
    ],
  },
  {
    question: "For narrative writing, what is often the writer's purpose?",
    answers: [
      { text: "To Explain", correct: false },
      { text: "To Argue", correct: false },
      { text: "To Interpret", correct: false },
      { text: "To Entertain", correct: true },
    ],
  },
  {
    question: "A cover letter is an example of which genre?",
    answers: [
      { text: "Narrative Writing", correct: false },
      { text: "Expositional Writing", correct: false },
      { text: "Persuasive Writing", correct: true },
      { text: "Memoir", correct: false },
    ],
  },
  {
    question:
      "Which of the following is often expected in a professional email?",
    answers: [
      { text: "Subject Line", correct: false },
      { text: "Greeting", correct: false },
      { text: "Expectations of Response", correct: false },
      { text: "All of These", correct: true },
    ],
  },
  {
    question:
      "Based on our reading on the rhetorical situation, which of the following reveals the writer's position?",
    answers: [
      { text: "Stance", correct: true },
      { text: "Purpose", correct: false },
      { text: "Design", correct: false },
      { text: "Audience", correct: false },
    ],
  },
  {
    question:
      "If ethos is related to the author and logos is related to the text/message, to what is pathos related?",
    answers: [
      { text: "Design", correct: false },
      { text: "Stance", correct: false },
      { text: "Purpose", correct: false },
      { text: "Audience", correct: true },
    ],
  },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
          button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");  
  }
  Array.from(answerButtons.children).forEach(button=> {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `Your score: ${score} / ${questions.length}. Keep practicing and reviewing your notes!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz()