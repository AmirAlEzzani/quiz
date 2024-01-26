const question = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { test: "Shark", correct: false},
            { test: "Blue whale", correct: true},
            { test: "Elephant", correct: false},
            { test: "Giraffe", correct: false},
            
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { test: "Vatican City", correct: true},
            { test: "Bhutan", correct: false},
            { test: "Nepal", correct: false},
            { test: "Sri Lanka", correct: false},
            
        ]
    }, 
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { test: "Kalahari", correct: false},
            { test: "Gobi", correct: false},
            { test: "Sahara", correct: false},
            { test: "Antarctica", correct: true},
            
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { test: "Asia", correct: false},
            { test: "Australia", correct: true},
            { test: "Arctic", correct: false},
            { test: "Africa", correct: false},
            
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    next.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    next.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    next.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    next.innerHTML = 'Play Again';
    next.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

next.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();