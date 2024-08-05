const questions = [
    {
        question: "She is very good ....... swimming. ",
        options: ["at", "on", "of", "for"],
        answer: "at"
    },
    {
        question: "Laxmi will have arrived home ..... 7pm tomorrow. ",
        options: ["in", "at", "by", "on"],
        answer: "at"
    },

{
        question: "Sandeep is_____honest and diligent student.",
        options: ["a", "an", "the", "No article"],
        answer: "an"
    },
    

   {
        question: "The passive voice of 'Who did it?' is: ",
        options: ["Who was it done?", "Who was it done by?", "Who was done it?", "Who had it done by?"],
        answer: "Who was it done by?"
    },

    {
        question: "We had to stop____the entrance for the security check.",
        options: ["in", "on ","at","for"],
        answer: "at"
    },
    {
        question: "Using a____ cleaner is the best way for avoiding the dust pollution.",
        options: ["vaccum", "vacume","vacuum", "vacuume"],
        answer: "vacuum"
    },
    {
        question: "The plural form of'OX'is:",
        options: ["oxen", "oxes","oxez", "none"],
        answer: "oxen"
    },
     {
        question: "The feminine form of'DEER'is:",
        options: ["deeress", "doe","stag", "none"],
        answer: "doe"
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
    resultDiv.innerHTML = `<h2>You scored<h1> ${score} </h1>out of ${questions.length}</h2>`;
    
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
