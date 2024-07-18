const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const scoreContainer = document.getElementById('score');
const clockContainer = document.getElementById('clock');

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris"
        },
        correctAnswer: "c"
    },
    {
        question: "Who is the CEO of Tesla?",
        answers: {
            a: "Jeff Bezos",
            b: "Elon Musk",
            c: "Bill Gates"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the name of the JavaScript framework developed by Facebook?",
        answers: {
            a: "Angular",
            b: "Vue",
            c: "React"
        },
        correctAnswer: "c"
    },
    {
        question: "What is DevOps?",
        answers: {
            a: "Continuous Delivery",
            b: "Static Development",
            c: "Manual Operations"
        },
        correctAnswer: "a"
    },
    {
        question: "What is Python primarily used for?",
        answers: {
            a: "Web development",
            b: "Database management",
            c: "Network security"
        },
        correctAnswer: "a"
    },
    {
        question: "What does HTML stand for?",
        answers: {
            a: "Hyper Text Markup Language",
            b: "Highly Typed Modular Language",
            c: "Home Tool Management Layer"
        },
        correctAnswer: "a"
    },
    {
        question: "What is Python primarily used for?",
        answers: {
            a: "Web development",
            b: "Database management",
            c: "Network security"
        },
        correctAnswer: "a"
    },
    {
        question: "What does HTML stand for?",
        answers: {
            a: "Hyper Text Markup Language",
            b: "Highly Typed Modular Language",
            c: "Home Tool Management Layer"
        },
        correctAnswer: "a"
    },
    {
        question: "What does API stand for?",
        answers: {
            a: "Application Programming Interface",
            b: "Automated Process Integration",
            c: "Advanced Protocol Interaction"
        },
        correctAnswer: "a"
    },
    {
        question: "Which operating system is developed by Apple Inc.?",
        answers: {
            a: "Windows",
            b: "macOS",
            c: "Linux"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the purpose of SQL?",
        answers: {
            a: "Statistical Analysis",
            b: "Database Management",
            c: "Web Server Configuration"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the main role of a firewall?",
        answers: {
            a: "Network speed optimization",
            b: "Data encryption",
            c: "Network security"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the primary function of DNS?",
        answers: {
            a: "Data encryption",
            b: "Domain name resolution",
            c: "Database management"
        },
        correctAnswer: "b"
    },
    {
        question: "Which technology is used for virtualizing hardware resources?",
        answers: {
            a: "VirtualBox",
            b: "Docker",
            c: "VMware"
        },
        correctAnswer: "c"
    },
    {
        question: "What does HTTPS indicate about a website?",
        answers: {
            a: "Secure connection",
            b: "Hypertext transfer protocol",
            c: "High-performance servers"
        },
        correctAnswer: "a"
    },
    {
        question: "Which data structure uses Last In First Out (LIFO) principle?",
        answers: {
            a: "Queue",
            b: "Stack",
            c: "Tree"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the purpose of version control systems like Git?",
        answers: {
            a: "Database synchronization",
            b: "Source code management",
            c: "Network optimization"
        },
        correctAnswer: "b"
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let numCorrect = 0;
let timeLimit = 60; // 60 seconds
let timerInterval;

function startQuiz() {
    buildQuiz(); // Build the first question
    startTimer(); // Start the timer
}

function buildQuiz() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const answers = [];

    for (let letter in currentQuestion.answers) {
        answers.push(
            `<label>
                <input type="radio" name="question${currentQuestionIndex}" value="${letter}">
                ${letter} : ${currentQuestion.answers[letter]}
            </label>`
        );
    }

    quizContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <div class="answers">${answers.join('')}</div>
    `;
}

function showResults() {
    const answerContainer = quizContainer.querySelector('.answers');
    const selector = `input[name=question${currentQuestionIndex}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (!userAnswer) {
        alert('Please select an answer before submitting.');
        return;
    }

    if (userAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
        numCorrect++;
        answerContainer.style.color = 'green';
    } else {
        answerContainer.style.color = 'red';
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        buildQuiz(); // Build the next question
    } else {
        endQuiz(); // End the quiz if all questions are answered
    }
}

function endQuiz() {
    clearInterval(timerInterval); // Stop the timer

    quizContainer.innerHTML = '';
    resultsContainer.innerHTML = `You got ${numCorrect} out of ${quizQuestions.length} correct!`;

    scoreContainer.innerHTML = `Score: ${numCorrect} out of ${quizQuestions.length}`;
}

function startTimer() {
    let secondsLeft = timeLimit;
    updateClock(secondsLeft); // Initial display

    timerInterval = setInterval(() => {
        secondsLeft--;
        updateClock(secondsLeft);

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endQuiz(); // End the quiz when time runs out
        }
    }, 1000); // Update every second
}

function updateClock(secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    clockContainer.innerHTML = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

submitButton.addEventListener('click', showResults);

startQuiz(); // Start the quiz when the page loads
