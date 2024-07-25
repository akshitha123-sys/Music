'use strict';
const quizQuestions = [
    "What type of environment do you prefer? ",
    "How do you handle stress? ",
    "Which instrument sound do you resonate with the most? ",
    "How do you prefer to express yourself? "
];

const quizOptions = [
    ["Calm and relaxed", "Energetic and lively", "Creative and inspiring"],
    ["Listen to music", "Exercise", "Read a book"],
    ["Smooth and melodic", "Energetic and rhythmic", "Expressive and versatile"],
    ["Through precision and coordination", "Through emotion and feeling", "Through creativity and innovation"]
];

const instruments = ["Tabla", "Violin", "drum"];

function createQuizForm() {
    const form = document.getElementById("personalityQuizForm");

    for (let i = 0; i < quizQuestions.length; i++) {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = '<strong>' + quizQuestions[i] + '</strong>';

        const select = document.createElement("select");
        select.name = 'question_' + i;

        for (let j = 0; j < quizOptions[i].length; j++) {
            const option = document.createElement("option");
            option.value = quizOptions[i][j];
            option.text = quizOptions[i][j];
            select.add(option);
        }

        questionDiv.appendChild(select);
        form.appendChild(questionDiv);
        var para=document.createElement("p");
        form.appendChild(para);
    }

    document.getElementById("submitButton").addEventListener("click",submitQuiz,false);
}

function submitQuiz() {
    const resultDiv = document.getElementById("result");
    const result = calculateResult();
    resultDiv.innerHTML = 'Your suggested musical interest is: <strong>' + result + '</strong>';
}

function calculateResult() {
    const randomIndex = Math.floor(Math.random() * instruments.length);
    return instruments[randomIndex];
}

window.addEventListener("load", createQuizForm,false);
