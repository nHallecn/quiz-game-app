// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
    question: "What is the capital of Cameroon?",
    answers: [
        {text:"London", correct: false},
        {text:"Abuja", correct: false},
        {text:"Yaounde", correct: true},
        {text:"Madrid", correct: false},
    ],
},
{
    question: "Which planer is known as red planet?",
    answers: [
        {text:"Venus", correct: false},
        {text:"Mars", correct: true},
        {text:"Jupiter", correct: false},
        {text:"Pluto", correct: false},
    ],
},
{
    question: "What is the largest organ in the human body?",
    answers: [
        {text:"Heart", correct: false},
        {text:"Lungs", correct: false},
        {text:"Brain", correct: false},
        {text:"Skin", correct: true},
    ],
},
{
    question: "Which animal is known as the 'Ship of the Desert'?",
    answers: [
        {text:"Camel", correct: true},
        {text:"Horse", correct: false},
        {text:"Elephant", correct: false},
        {text:"Giraffe", correct: false},
    ],
},
{
    question: "What is the chemical symbol for water?",
    answers: [
        {text:"W", correct: false},
        {text:"H2O", correct: true},
        {text:"O2", correct: false},
        {text:"H", correct: false},
    ],
},
]

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestions();
}

function showQuestions(){
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event){
    if(answerDisabled) return;

    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(()=>{
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length){
            showQuestions();
        } else {
            showResults();
        }
    },1000)
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if(percentage === 100){
        resultMessage.textContent = "Perfect! You are a genius!";
    } else if (percentage >= 80){
        resultMessage.textContent = "Great Job! You know your stuff!";
    } else if (percentage >= 60 ){
        resultMessage.textContent = "Good Effort! Keep Learning!";
    } else if (percentage >= 40 ){
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");
    startQuiz();
}