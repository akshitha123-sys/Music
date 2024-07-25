function loadQuestion(instrument) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'knowledge.xml', true);
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xmlDoc = xhr.responseXML;
            const question = xmlDoc.getElementsByTagName(instrument)[0].getElementsByTagName('question')[0].textContent;
            displayQuestion(question, instrument);
        }
    }, false);
    xhr.send();
}

function displayQuestion(question, instrument) {
    const questionContainer = document.getElementById('question-container');
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.onclick = function () {
        clearResultMessage();
        validateAnswer(instrument);
    };

    questionContainer.innerHTML = `
        <p>${question}</p>
        <input type="text" id="answerInput" placeholder="Enter your answer">
    `;
    questionContainer.appendChild(submitButton);
}

function validateAnswer(instrument) {
    const userAnswer = document.getElementById('answerInput').value.toLowerCase();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'knowledge.xml', true);
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xmlDoc = xhr.responseXML;
            const correctAnswer = xmlDoc.getElementsByTagName(instrument)[0].getElementsByTagName('answer')[0].textContent.toLowerCase();

            const resultMessage = document.createElement('p');
            resultMessage.style.marginTop = '10px';

            if (userAnswer === correctAnswer) {
                resultMessage.innerText = 'Correct! Well done.';
                resultMessage.style.color = 'green';
            } else {
                resultMessage.innerText = 'Incorrect. Try again.';
                resultMessage.style.color = 'red';
            }

            const questionContainer = document.getElementById('question-container');
            questionContainer.appendChild(resultMessage);
        }
    }, false);
    xhr.send();
}

function clearResultMessage() {
    const questionContainer = document.getElementById('question-container');
    const resultMessages = questionContainer.getElementsByTagName('p');

    while (resultMessages.length > 0) {
        resultMessages[0].parentNode.removeChild(resultMessages[0]);
    }
}