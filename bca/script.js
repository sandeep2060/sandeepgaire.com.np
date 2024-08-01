const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Mars", "Saturn"],
        answer: "Jupiter"
    }
];

let timer;
const totalTime = 7200; // Total time in seconds (5 minutes)
let remainingTime = totalTime;

function loadQuiz() {
    const quizContainer = document.getElementById('quiz');
    let quizHTML = '';

    questions.forEach((q, index) => {
        quizHTML += `
            <div class="question">
                <p>${index + 1}. ${q.question}</p>
                <ul class="options">
                    ${q.options.map((option, i) => `
                        <li>
                            <input type="radio" name="question${index}" value="${option}" id="q${index}o${i}">
                            <label for="q${index}o${i}">${option}</label>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    });

    quizContainer.innerHTML = quizHTML;
}

function calculateResults() {
    let score = 0;

    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>You scored ${score} out of ${questions.length}</h2>`;
    
    // Display answers and correct answers
    let answersHTML = '<h3>Answer Sheet:</h3>';
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        answersHTML += `
            <div>
                <p><strong>Q${index + 1}: ${q.question}</strong></p>
                <p>Your answer: ${selectedOption ? selectedOption.value : 'No answer selected'}</p>
                <p>Correct answer: ${q.answer}</p>
                <hr>
            </div>
        `;
    });
    resultDiv.innerHTML += answersHTML;
}

function startTimer() {
    timer = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timer);
            calculateResults();
        } else {
            remainingTime--;
            const hour = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime / 60)% 60);
            const seconds = remainingTime % 60;
            
            document.getElementById('time').textContent = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }, 1000);
}

document.getElementById('submit').addEventListener('click', () => {
    clearInterval(timer);
    calculateResults();
});

window.onload = () => {
    loadQuiz();
    startTimer();
};
