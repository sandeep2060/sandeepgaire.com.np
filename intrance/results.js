document.addEventListener('DOMContentLoaded', function () {
    const scorePara = document.getElementById('score');
    const answersDiv = document.getElementById('answers');

    // Retrieve data from localStorage
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
    const questions = JSON.parse(localStorage.getItem('questions'));

    if (!userAnswers || !questions) {
        answersDiv.textContent = "No results found. Please complete the quiz first.";
        return;
    }

    let score = 0;
    let answersHTML = "";

    questions.forEach((q, index) => {
        const userAnswer = userAnswers[`q${index + 1}`];
        const isCorrect = userAnswer === q.answer;

        if (isCorrect) {
            score++;
        }

        answersHTML += `
            <div class="question">
                <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
                <p><strong>Your Answer:</strong> ${userAnswer}</p>
                <p><strong>Correct Answer:</strong> ${q.answer}</p>
                <p><strong>Status:</strong> <span style="color: ${isCorrect ? 'green' : 'red'}">${isCorrect ? 'Correct' : 'Incorrect'}</span></p>
            </div>
        `;
    });

    scorePara.textContent = `Your Score: ${score} out of ${questions.length}`;
    answersDiv.innerHTML = answersHTML;
});