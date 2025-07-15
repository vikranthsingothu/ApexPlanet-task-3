document.addEventListener('DOMContentLoaded', function() {
    // Quiz Implementation
    const quizData = [
        {
            question: "What does CSS stand for?",
            options: [
                "Computer Style Sheets",
                "Creative Style Sheets",
                "Cascading Style Sheets",
                "Colorful Style Sheets"
            ],
            correct: 2
        },
        {
            question: "Which HTML tag is used to link a JavaScript file?",
            options: [
                "<script>",
                "<javascript>",
                "<js>",
                "<scripting>"
            ],
            correct: 0
        },
        {
            question: "Which of these is NOT a JavaScript data type?",
            options: [
                "String",
                "Boolean",
                "Number",
                "Float"
            ],
            correct: 3
        },
        {
            question: "What does API stand for?",
            options: [
                "Application Programming Interface",
                "Advanced Programming Interface",
                "Automated Programming Interface",
                "Application Process Integration"
            ],
            correct: 0
        },
        {
            question: "Which CSS property is used to make a website responsive?",
            options: [
                "display: flex",
                "position: relative",
                "@media queries",
                "float: left"
            ],
            correct: 2
        }
    ];

    const quizIntro = document.getElementById('quiz-intro');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const questionCounter = document.getElementById('question-counter');
    const prevButton = document.getElementById('prev-question');
    const nextButton = document.getElementById('next-question');
    const startButton = document.getElementById('start-quiz');
    const restartButton = document.getElementById('restart-quiz');
    const scoreDisplay = document.getElementById('score-display');

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = new Array(quizData.length).fill(null);

    function startQuiz() {
        quizIntro.classList.add('hidden');
        quizQuestions.classList.remove('hidden');
        showQuestion();
    }

    function showQuestion() {
        const question = quizData[currentQuestion];
        questionElement.textContent = question.question;
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            if (userAnswers[currentQuestion] === index) {
                button.classList.add('selected');
            }
            button.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(button);
        });

        questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
        prevButton.disabled = currentQuestion === 0;
        nextButton.textContent = currentQuestion === quizData.length - 1 ? 'Finish' : 'Next';
    }

    function selectOption(index) {
        userAnswers[currentQuestion] = index;
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(button => button.classList.remove('selected'));
        buttons[index].classList.add('selected');

        // Check if answer is correct
        if (index === quizData[currentQuestion].correct) {
            buttons[index].classList.add('correct');
        } else {
            buttons[index].classList.add('incorrect');
            buttons[quizData[currentQuestion].correct].classList.add('correct');
        }
    }

    function showResults() {
        quizQuestions.classList.add('hidden');
        quizResults.classList.remove('hidden');

        // Calculate score
        score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === quizData[index].correct) {
                score++;
            }
        });

        scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}!`;
    }

    function resetQuiz() {
        currentQuestion = 0;
        score = 0;
        userAnswers = new Array(quizData.length).fill(null);
        quizResults.classList.add('hidden');
        quizIntro.classList.remove('hidden');
    }

    startButton.addEventListener('click', startQuiz);
    restartButton.addEventListener('click', resetQuiz);

    prevButton.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResults();
        }
    });

    // API Implementation
    const apiSelector = document.getElementById('api-selector');
    const fetchButton = document.getElementById('fetch-data');
    const apiResults = document.getElementById('api-results');

    const apiEndpoints = {
        jokes: 'https://official-joke-api.appspot.com/random_joke',
        weather: 'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true',
        quotes: 'https://api.quotable.io/random'
    };

    fetchButton.addEventListener('click', async function() {
        const selectedApi = apiSelector.value;
        apiResults.innerHTML = '<p>Loading data...</p>';

        try {
            const response = await fetch(apiEndpoints[selectedApi]);
            if (!response.ok) throw new Error('API request failed');
            
            const data = await response.json();
            displayApiResults(selectedApi, data);
        } catch (error) {
            apiResults.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        }
    });

    function displayApiResults(api, data) {
        let html = '';
        
        switch(api) {
            case 'jokes':
                html = `
                    <h3>Random Joke</h3>
                    <p><strong>Setup:</strong> ${data.setup}</p>
                    <p><strong>Punchline:</strong> ${data.punchline}</p>
                `;
                break;
            case 'weather':
                html = `
                    <h3>Current Weather</h3>
                    <p><strong>Temperature:</strong> ${data.current_weather.temperature}°C</p>
                    <p><strong>Wind Speed:</strong> ${data.current_weather.windspeed} km/h</p>
                    <p><strong>Weather Code:</strong> ${data.current_weather.weathercode}</p>
                `;
                break;
            case 'quotes':
                html = `
                    <h3>Random Quote</h3>
                    <blockquote>"${data.content}"</blockquote>
                    <p><strong>- ${data.author}</strong></p>
                `;
                break;
        }
        
        apiResults.innerHTML = html;
    }

    // Image Carousel Implementation
    const prevSlideBtn = document.getElementById('prev-slide');
    const nextSlideBtn = document.getElementById('next-slide');
    const carouselSlide = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    const indicators = document.querySelectorAll('.indicator');

    let currentIndex = 0;
    const totalImages = images.length;

    function updateCarousel() {
        images.forEach((img, index) => {
            img.classList.toggle('hidden', index !== currentIndex);
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    nextSlideBtn.addEventListener('click', nextSlide);
    prevSlideBtn.addEventListener('click', prevSlide);

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            goToSlide(parseInt(indicator.dataset.index));
        });
    });

    // Auto-advance carousel every 5 seconds
    setInterval(nextSlide, 5000);
});
