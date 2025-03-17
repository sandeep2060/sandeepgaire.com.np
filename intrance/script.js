document.addEventListener('DOMContentLoaded', function () {
    const quizForm = document.getElementById('quiz-form');
    const timerDiv = document.getElementById('timer');

    let timeLeft = 600; // 10 minutes in seconds
    let timer;

    // Questions stored in JavaScript
    const questions = [
        
            {
                "group": "English",
                "question": "She is very good ______ swimming.",
                "options": ["at", "on", "of", "for"],
                "answer": "at"
            },
            {
                "group": "English",
                "question": "Ravi will have arrived home ______ 8 pm tomorrow.",
                "options": ["in", "at", "by", "on"],
                "answer": "by"
            },
            {
                "group": "English",
                "question": "Rita is ______ honest and diligent student.",
                "options": ["a", "an", "this", "no article"],
                "answer": "an"
            },
            {
                "group": "English",
                "question": "The passive version of “Who did it?” is:",
                "options": ["Who was it done?", "Who was it done by?", "Who was done it?", "Who had it done by?"],
                "answer": "Who was it done by?"
            },
            {
                "group": "English",
                "question": "We had to stop ______ the entrance for the security check.",
                "options": ["in", "on", "at", "for"],
                "answer": "at"
            },
            {
                "group": "English",
                "question": "Using a ______ cleaner is the best way for avoiding the dust pollution.",
                "options": ["vacuum", "vacuum", "vacuum", "vacuum"],
                "answer": "vacuum"
            },
            {
                "group": "English",
                "question": "The plural form of “ox” is:",
                "options": ["oxen", "axes", "oxez", "none"],
                "answer": "oxen"
            },
            {
                "group": "English",
                "question": "The feminine form of deer is:",
                "options": ["deeress", "doe", "stag", "none"],
                "answer": "doe"
            },
            {
                "group": "English",
                "question": "If I had known about your arrival, I ______ to receive you at the airport.",
                "options": ["would come", "would came", "would have come", "had come"],
                "answer": "would have come"
            },
            {
                "group": "English",
                "question": "At midnight, all the goats were ______ .",
                "options": ["bleating", "howling", "roaring", "mowing"],
                "answer": "bleating"
            },
            {
                "group": "English",
                "question": "The question tag of “They have already arrived,” is",
                "options": ["Have they?", "Haven’t they?", "Weren’t they?", "Did they?"],
                "answer": "Haven’t they?"
            },
            {
                "group": "English",
                "question": "Please ______ the cigarette. It irritates me.",
                "options": ["put down", "put out", "put away", "put in"],
                "answer": "put out"
            },
            {
                "group": "English",
                "question": "As Gretel’s father could not do anything, he gave ______ .",
                "options": ["away", "out", "in", "into"],
                "answer": "in"
            },
            {
                "group": "English",
                "question": "I have eaten nothing for hours. I am ______ hungry.",
                "options": ["quiet", "quit", "quite", "quit"],
                "answer": "quite"
            },
            {
                "group": "English",
                "question": "The synonym of recurring is:",
                "options": ["occurring repeatedly", "happening rarely", "occurring once a week", "occurring seldom"],
                "answer": "occurring repeatedly"
            },
            {
                "group": "English",
                "question": "The antonym of “on” is:",
                "options": ["of", "un", "off", "out"],
                "answer": "off"
            },
            {
                "group": "English",
                "question": "--- he was very popular among common people, he could not win the election.",
                "options": ["Because", "So", "Although", "Therefore"],
                "answer": "Although"
            },
            {
                "group": "English",
                "question": "The indirect speech of “Are you sure? She said to me”, is:",
                "options": ["She asked me if I was sure.", "She wanted to know was I sure.", "She inquired if I am sure.", "She asked him if I was sure."],
                "answer": "She asked me if I was sure."
            },
            {
                "group": "English",
                "question": "In the night bus yesterday, I had my purse ______.",
                "options": ["steal", "stole", "stolen", "to steal"],
                "answer": "stolen"
            },
            {
                "group": "English",
                "question": "I am looking forward to ______ you very soon again.",
                "options": ["see", "seen", "seeing", "be seen"],
                "answer": "seeing"
            },
            {
                "group": "English",
                "question": "I bought this pen from the ______ store.",
                "options": ["stationery", "stationary", "stationnary", "stantianory"],
                "answer": "stationery"
            },
            {
                "group": "English",
                "question": "This bed is not ______ for two people to sleep in.",
                "options": ["as wide as", "wide enough", "wider enough", "quite wider"],
                "answer": "wide enough"
            },
            {
                "group": "English",
                "question": "The fault in the engine is ______ this time than it was the last time.",
                "options": ["more serious", "seriouser", "very serious", "serious than"],
                "answer": "more serious"
            },
            {
                "group": "English",
                "question": "You will find the photograph of mine ______ page 13.",
                "options": ["at", "on", "of", "with"],
                "answer": "on"
            },
            {
                "group": "English",
                "question": "Reeta can dance ______ of all in this class.",
                "options": ["the best", "better", "best", "more better"],
                "answer": "the best"
            },
            {
                "group": "English",
                "question": "Hurry up and use the fire ______, the house is on fire.",
                "options": ["extincter", "extinguisher", "extinguishing", "extinguish"],
                "answer": "extinguisher"
            },
            {
                "group": "English",
                "question": "The tag question of “I am an engineer,” is:",
                "options": ["Aren’t I?", "Am not I?", "Don’t I?", "Ain’t I?"],
                "answer": "Aren’t I?"
            },
            {
                "group": "English",
                "question": "I am in a state of dilemma. That means I am ______ .",
                "options": ["dazzled", "tired", "puzzled", "not sure"],
                "answer": "puzzled"
            },
            {
                "group": "English",
                "question": "She undergoes a strange experience of seeing something not present in front of her. In other words, she is suffering from ______ .",
                "options": ["hallucination", "bronchitis", "tonsillitis", "psychosis"],
                "answer": "hallucination"
            },
            {
                "group": "English",
                "question": "She can play tennis, but she is ______ at it than her friend.",
                "options": ["badly", "worse", "more badly", "worsley"],
                "answer": "worse"
            },
            {
                "group": "English",
                "question": "Sulav sold his plot of land in the village so that he ______ buy a new house in the city.",
                "options": ["could", "can", "need", "would"],
                "answer": "could"
            },
            {
                "group": "English",
                "question": "If you teased the dog, it ______ bite you.",
                "options": ["will", "would", "did", "can"],
                "answer": "would"
            },
            {
                "group": "English",
                "question": "She is so ___ that she easily catches cold.",
                "options": ["Sincere", "sensitive", "sensible", "sober"],
                "answer": "sensitive"
            },
            {
                "group": "English",
                "question": "The synonym of purgatory is:",
                "options": ["polluted city", "hell", "heaven", "sky"],
                "answer": "hell"
            },
            {
                "group": "English",
                "question": "The synonym of creek is:",
                "options": ["pond", "late", "rivulet", "tributary"],
                "answer": "rivulet"
            },
            {
                "group": "English",
                "question": "No sooner had I left the room, the bomb ______ exploded.",
                "options": ["had", "could be", "would be", "none of the above"],
                "answer": "none of the above"
            },
            {
                "group": "English",
                "question": "Sarita plays chess ______ than her sister.",
                "options": ["more better", "better", "well", "best"],
                "answer": "better"
            },
            {
                "group": "English",
                "question": "I am looking forward to ______ you soon.",
                "options": ["seeing", "see", "be seen", "seen"],
                "answer": "seeing"
            },
            {
                "group": "English",
                "question": "Because of the heavy rain, they decided to call ______ the cricket match.",
                "options": ["out", "up", "off", "down"],
                "answer": "off"
            },
            {
                "group": "English",
                "question": "Cholera broke --- in Jajarkot ten years ago.",
                "options": ["out", "down", "up", "into"],
                "answer": "out"
            },
        
        
            {
                "group": "Mathematics",
                "question": "Which one of the following number has a remainder of 4 when it is divided by 6?",
                "options": ["8", "12", "22", "29"],
                "answer": "22"
            },
            {
                "group": "Mathematics",
                "question": "The sum of the product and quotient of 4 and 4 is ___.",
                "options": ["16", "15", "8", "17"],
                "answer": "17"
            },
            {
                "group": "Mathematics",
                "question": "The average of all even numbers between -4 and 5 is___.",
                "options": ["1", "0.5", "-1", "none of these"],
                "answer": "1"
            },
            {
                "group": "Mathematics",
                "question": "The sum of first five prime numbers is:",
                "options": ["11", "18", "26", "28"],
                "answer": "28"
            },
            {
                "group": "Mathematics",
                "question": "The value of Sin 30 is:",
                "options": ["1/2", "1", "0", "infinity"],
                "answer": "-1/2"
            },
            {
                "group": "Mathematics",
                "question": "The product of two consecutive even number is 224. Then the numbers are:",
                "options": ["16, 18", "12, 14", "14, 16", "18, 20"],
                "answer": "14, 16"
            },
            {
                "group": "Mathematics",
                "question": "If 5 is added to the square of a number, then the result is 14. What is the value of that number?",
                "options": ["3", "5", "7", "9"],
                "answer": "3"
            },
            {
                "group": "Mathematics",
                "question": "If three spoons equals to one glass, two glasses equals to one plate, then how many spoons equals to one plate?",
                "options": ["3", "6", "9", "2"],
                "answer": "6"
            },
            {
                "group": "Mathematics",
                "question": "If a matrix is of order 5 x 7, then each column will contain ___ elements.",
                "options": ["5", "12", "35", "7"],
                "answer": "5"
            },
            {
                "group": "Mathematics",
                "question": "If the equations are \(3x + 4y = 7\) and \(4x - y = 3\), after solving these equations the value of \(x\) and \(y\) will be:",
                "options": ["1, 1", "1, 2", "2, 1", "2, 2"],
                "answer": "1, 1"
            },
            {
                "group": "Mathematics",
                "question": "What is the value of \(x\) in series 1, 9, 25, \(x\), 81,121?",
                "options": ["100", "36", "49", "64"],
                "answer": "49"
            },
            {
                "group": "Mathematics",
                "question": "If \(a + b = c\), then what is the average value of \(a\), \(b\), and \(c\)?",
                "options": ["\((a+b)/3\)", "\(c/3\)", "\(2c/3\)", "\(c/3\)"],
                "answer": "\(c/3\)"
            },
            {
                "group": "Mathematics",
                "question": "If \(x\) in an integer and \(y = -2x - 8\), what is the least value of \(x\) for which \(y\) is less than 9?",
                "options": ["-8", "-9", "-10", "-11"],
                "answer": "-9"
            },
            {
                "group": "Mathematics",
                "question": "The slope of line which equation is \( 2x - 4y = 9 \) is:",
                "options": ["2", "\(\frac{1}{2}\)", "-1/2", "3"],
                "answer": "\(\frac{1}{2}\)"
            },
            {
                "group": "Mathematics",
                "question": "What is the slope of horizontal line?",
                "options": [">1", "<0", "0", "1"],
                "answer": "0"
            },
            {
                "group": "Mathematics",
                "question": "The difference between 3/5 of 80 and 30% of 80 is:",
                "options": ["20", "14", "15", "24"],
                "answer": "24"
            },
            {
                "group": "Mathematics",
                "question": "Gautam spent Rs. 40/-, which is 5% of his daily wage, then his total daily wage is:",
                "options": ["Rs.400/-", "Rs.600/-", "Rs.800/-", "Rs. 1000/-"],
                "answer": "Rs.800/-"
            },
            {
                "group": "Mathematics",
                "question": "If 1254376 represents the CENTURY, then what represents 735?",
                "options": ["NUT", "RUT", "RUN", "YET"],
                "answer": "RUN"
            },
            {
                "group": "Mathematics",
                "question": "Find the missing value in \(\begin{bmatrix} 2 & 7 & 6 \\ 9 & 5 & 1 \\ 4 & 3 & ? \end{bmatrix}\)",
                "options": ["5", "8", "7", "9"],
                "answer": "8"
            },
            {
                "group": "Mathematics",
                "question": "There are 48 students in a computer class. If number of boys are twice than girls, then how many girls are there?",
                "options": ["16", "18", "32", "28"],
                "answer": "16"
            },
            {
                "group": "Mathematics",
                "question": "Find the number x, which is equal to (80% of x) plus 5.",
                "options": ["20", "30", "40", "25"],
                "answer": "25"
            },
            {
                "group": "Mathematics",
                "question": "If the ratio of two numbers is 2:3 and sum of these numbers is 30, then which are these numbers?",
                "options": ["14, 16", "10, 20", "12, 18", "18, 12"],
                "answer": "12, 18"
            },
            {
                "group": "Mathematics",
                "question": "If the age of five girls are 15, 16, 17, 18, 19 respectively then what is the average age of girls?",
                "options": ["15", "17", "18", "19"],
                "answer": "17"
            },
            {
                "group": "Mathematics",
                "question": "How many triangles in this figure?",
                "options": ["6", "7", "8", "9"],
                "answer": "9"
            },
            {
                "group": "Mathematics",
                "question": "What is the value of cos 60°?",
                "options": ["1", "\(\frac{1}{2}\)", "0", "\(\sqrt{3}/2\)"],
                "answer": "\(\frac{1}{2}\)"
            },
            {
                "group": "Mathematics",
                "question": "Find the value of x in series 1, 1, 2, 3, 5, 8, 13, x.",
                "options": ["21", "22", "19", "23"],
                "answer": "21"
            },
            {
                "group": "Mathematics",
                "question": "If 'n' is an integer, which of the following must be even?",
                "options": ["n + 1", "n + 2", "2n + 1", "2n"],
                "answer": "2n"
            },
            {
                "group": "Mathematics",
                "question": "The largest prime factor of 255 is:",
                "options": ["45", "25", "17", "5"],
                "answer": "17"
            },
            {
                "group": "Mathematics",
                "question": "The sum of first n natural number is:",
                "options": ["\(\frac{n(n+1)}{2}\)", "\(\frac{n(n+1)(2n+1)}{2}\)", "\(\frac{(n+1)^2}{2}\)", "none of these"],
                "answer": "\(\frac{n(n+1)}{2}\)"
            },
            {
                "group": "Mathematics",
                "question": "The root of the equation \(3x^2 - 8x + 16 = 0\) are",
                "options": ["real & equal", "real & unequal", "imaginary & unequal", "none of these"],
                "answer": "imaginary & unequal"
            },
            {
                "group": "Mathematics",
                "question": "If \(x + y = 12\) and \(x - y = 6\) then, the value of \(x^2 - y^2\) is:",
                "options": ["18", "36", "60", "72"],
                "answer": "72"
            },
            {
                "group": "Mathematics",
                "question": "If \(x - 5 = 2\), then the value of \(x + 12\) is:",
                "options": ["15", "17", "19", "18"],
                "answer": "19"
            },
            {
                "group": "Mathematics",
                "question": "The value when simplified \(\frac{6^4 - 6^3}{5}\) is:",
                "options": ["1/5", "6\(^3\)", "6/5", "6\(^4\)"],
                "answer": "6\(^3\)"
            },
            {
                "group": "Mathematics",
                "question": "If \(4/a + 4/a + 4/a + 4/a = 16\) then, 4a is:",
                "options": ["4", "8", "12", "16"],
                "answer": "4"
            },
            {
                "group": "Mathematics",
                "question": "The slope of line \(\frac{x}{a} + \frac{y}{b} = 1\) is:",
                "options": ["\(-\left(\frac{a}{b}\right)\)", "\(-\left(\frac{b}{a}\right)\)", "ab", "\(-\left(\frac{1}{ab}\right)\)"],
                "answer": "\(-\left(\frac{b}{a}\right)\)"
            },
            {
                "group": "Mathematics",
                "question": "If \(x = 4y\), what percent of 2x is 2y?",
                "options": ["20%", "40%", "30%", "25%"],
                "answer": "25%"
            },
            {
                "group": "Mathematics",
                "question": "If the cost of 9 kg sugar is Rs. 270/-, how much sugar can be purchased for Rs. 390/-?",
                "options": ["11", "12", "13", "14"],
                "answer": "13"
            },
            {
                "group": "Mathematics",
                "question": "If 3 bananas cost 50 cents, how many bananas can be bought for 20 dollars?",
                "options": ["120", "115", "110", "130"],
                "answer": "120"
            },
            {
                "group": "Mathematics",
                "question": "If \(5:7 = 15:x\), then the value of x is:",
                "options": ["35", "21", "27", "18"],
                "answer": "21"
            },
            {
                "group": "Mathematics",
                "question": "By selling 150 apples, the seller gains the selling price of 30 apples, then gain percentage is:",
                "options": ["25%", "30%", "12%", "20%"],
                "answer": "25%"
            },
            {
                "group": "Mathematics",
                "question": "A vendor purchases lemons at Rs. 5/- per lemon, at what price vendor will sell lemon to gain 20% profit?",
                "options": ["Rs. 4/-", "Rs. 5/-", "Rs. 6/-", "Rs. 7/-"],
                "answer": "Rs. 6/-"
            },
            {
                "group": "Mathematics",
                "question": "What is the population doubling time if population growth rate is 2% per annum?",
                "options": ["50yrs", "30yrs", "40yrs", "none of these"],
                "answer": "50yrs"
            },
            {
                "group": "Mathematics",
                "question": "The cardinal number of a vowel set \(V = \{a, e, i, o, u\}\) is:",
                "options": ["4", "5", "6", "7"],
                "answer": "5"
            },
            {
                "group": "Mathematics",
                "question": "If \(\log_a 81 = 4\), then the value of 'a' is:",
                "options": ["4", "3", "5", "none of these"],
                "answer": "3"
            },
            {
                "group": "Mathematics",
                "question": "The value of \(\frac{\sqrt{18}}{\sqrt{72}}\) is:",
                "options": ["a rational number", "an irrational number", "an imaginary number", "none of these"],
                "answer": "a rational number"
            },
            {
                "group": "Mathematics",
                "question": "If 5/7 of a number is 1025, then 3/7 of number is:",
                "options": ["735", "430", "615", "560"],
                "answer": "615"
            },
            {
                "group": "Mathematics",
                "question": "The number of seconds in \( \frac{1}{3} \) hours is:",
                "options": ["4800", "4700", "4900", "5000"],
                "answer": "4800"
            },
            {
                "group": "Mathematics",
                "question": "The 4m wide carpet is used for carpeting a room of 8m long and 3m wide, then what is the length of carpet?",
                "options": ["5m", "6m", "2m", "3m"],
                "answer": "6m"
            },
            {
                "group": "Mathematics",
                "question": "Hari ranks seventh from the top and twenty sixth from the bottom in a class. Then the total number of students in a class are:",
                "options": ["36", "35", "31", "32"],
                "answer": "32"
            },
            {
                "group": "Mathematics",
                "question": "If three girls write 3 pages in 3 minutes, in how many minutes can one girl write one page?",
                "options": ["4 min", "5 min", "3 min", "6 min"],
                "answer": "3 min"
            }
            ,
                {
                    "group": "General Knowledge",
                    "question": "Nepal was hit by the 7.8 magnitude Earthquake on:",
                    "options": ["2072 Baisakh 10", "2072 Baisakh 11", "2072 Baisakh 12", "2072 Baisakh 13"],
                    "answer": "2072 Baisakh 12"
                },
                {
                    "group": "General Knowledge",
                    "question": "The new constitution of Nepal, 'Nepal Ko Sambidhan' was released on:",
                    "options": ["2072 Asoj 4", "2072 Asoj 3", "2072 Asoj 2", "2072 Asoj 1"],
                    "answer": "2072 Asoj 3"
                },
                {
                    "group": "General Knowledge",
                    "question": "Who is the writer of Novel Ek Chihan?",
                    "options": ["Hridaychandra Singh Pradhan", "Krishnachandra Singh Pradhan", "Bijaybahadur Malla", "Parijat"],
                    "answer": "Parijat"
                },
                {
                    "group": "General Knowledge",
                    "question": "Kusti is played on:",
                    "options": ["Ground", "Court", "Ring", "Akhada"],
                    "answer": "Akhada"
                },
                {
                    "group": "General Knowledge",
                    "question": "Who is considered as the father of computer?",
                    "options": ["Charles Babbage", "Bill Gates", "Mark Zuckerberg", "Chris Hughes"],
                    "answer": "Charles Babbage"
                },
                {
                    "group": "General Knowledge",
                    "question": "Which one of the following is the database program?",
                    "options": ["MySQL", "MS-Excel", "MS-Word", "MS-Outlook"],
                    "answer": "MySQL"
                },
                {
                    "group": "General Knowledge",
                    "question": "What is the full form of LCD?",
                    "options": ["Light and Clear Display", "Liquid Crystal Display", "Light Crystal Display", "Liquid Clear Display"],
                    "answer": "Liquid Crystal Display"
                },
                {
                    "group": "General Knowledge",
                    "question": "Which is the first bank in Nepal?",
                    "options": ["Nepal Bank Limited", "Rastriya Banijya Bank", "Nepal Investment Bank", "Nepal Rastra Bank"],
                    "answer": "Nepal Bank Limited"
                },
                {
                    "group": "General Knowledge",
                    "question": "Which of the following field is not awarded by Nobel Prize?",
                    "options": ["Computer Science", "Physics", "Economics", "Literature"],
                    "answer": "Computer Science"
                },
                {
                    "group": "General Knowledge",
                    "question": "How many provinces (Pradesh) are in Nepal according to the new constitution?",
                    "options": ["5", "7", "8", "9"],
                    "answer": "7"
                }
            
        
       
    ];

    // Function to display questions
    function renderQuestions() {
        let currentGroup = "";
        questions.forEach((q, index) => {
            if (q.group !== currentGroup) {
                const groupHeader = document.createElement('h2');
                groupHeader.textContent = `Group: ${q.group}`;
                quizForm.appendChild(groupHeader);
                currentGroup = q.group;
            }

            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');

            const questionText = document.createElement('p');
            questionText.textContent = `${index + 1}. ${q.question}`;
            questionDiv.appendChild(questionText);

            // Create a container for options
            const optionsGrid = document.createElement('div');
            optionsGrid.classList.add('options-grid');

            q.options.forEach((option, i) => {
                const label = document.createElement('label');
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `q${index + 1}`;
                radio.value = option;
                label.appendChild(radio);
                label.appendChild(document.createTextNode(` ${option}`));
                optionsGrid.appendChild(label);
            });

            questionDiv.appendChild(optionsGrid);
            quizForm.appendChild(questionDiv);
        });

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        quizForm.appendChild(submitButton);
    }

    // Function to start the timer
    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timer);
                submitQuiz();
            }
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDiv.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }, 12000);
    }

    // Function to submit the quiz
    function submitQuiz() {
        clearInterval(timer);
        const formData = new FormData(quizForm);
        let userAnswers = {};

        questions.forEach((q, index) => {
            const userAnswer = formData.get(`q${index + 1}`);
            userAnswers[`q${index + 1}`] = userAnswer || 'Unanswered';
        });

        // Store answers in localStorage
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        localStorage.setItem('questions', JSON.stringify(questions));

        // Redirect to the results page
        window.location.href = 'results.html';
    }

    // Event listener for form submission
    quizForm.addEventListener('submit', function (e) {
        e.preventDefault();
        submitQuiz();
    });

    // Render questions and start the timer
    renderQuestions();
    startTimer();
});