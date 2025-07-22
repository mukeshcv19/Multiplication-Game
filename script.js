let correctAnswer = 0;
let startTime = 0;
let timerInterval;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
    const useTwoDigits = false;
    const num1 = useTwoDigits ? getRandomInt(10, 99) : getRandomInt(100, 999);
    const num2 = useTwoDigits ? getRandomInt(10, 99) : getRandomInt(100, 999);

    correctAnswer = num1 * num2;
    startTime = new Date().getTime(); // Start timing

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const elapsed = ((now - startTime) / 1000).toFixed(2);
        document.getElementById('elapsedTime').innerText = `Time Elapsed: ${elapsed} seconds`;
    }, 1000);

    document.getElementById('question').innerText = `What is ${num1} × ${num2}?`;
    document.getElementById('result').innerText = '';
    document.getElementById('answer').value = '';
    document.getElementById('takenTime').innerText = '';
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const resultEl = document.getElementById('result');

    const endTime = new Date().getTime();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // in seconds

    clearInterval(timerInterval);
    document.getElementById('takenTime').innerText = `Time Taken: ${timeTaken} seconds`;

    if (isNaN(userAnswer)) {
        resultEl.innerText = 'Please enter a number!';
        resultEl.style.color = 'orange';
    } else if (userAnswer === correctAnswer) {
        resultEl.innerText = `Correct! You took ${timeTaken} seconds.`;
        resultEl.style.color = 'green';
    } else {
        resultEl.innerText = `Oops! The correct answer is ${correctAnswer}. You took ${timeTaken} seconds.`;
        resultEl.style.color = 'red';
    }
}

// Initialize the first question when page loads
window.onload = generateQuestion;