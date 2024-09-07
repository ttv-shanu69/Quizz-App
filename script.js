const Questions = [
    {
        question: " In which decade was the American Institute of Electrical Engineers (AIEE) founded?",
        answer: [
            { text:"1850s", correct: false},
            { text:"1880s", correct: true},
            { text:"1930s", correct: false},
            { text:"1950s", correct: false},
        ]
    }, 

    {
        question: "OS' computer abbreviation usually means?",
        answer: [
            { text:"Order of significance", correct: false},
            { text:"Open Software", correct: false},
            { text:"Operating System", correct: true},
            { text:"Optical Sensor", correct: false},
        ]
    },

    {
        question: "What is part of a database that holds only one type of information?",
        answer: [
            { text:"Report", correct: false},
            { text:"Field", correct: true},
            { text:"Record", correct: false},
            { text:"File", correct: false},
        ]
    },

    {
        question: "In which decade with the first transatlantic radio broadcast occur?",
        answer: [
            { text:"1850s", correct: false},
            { text:"1860s", correct: false},
            { text:"1870s", correct: false},
            { text:"1900s", correct: true},
        ]
    } 
]; 

const QuestionElement = document.getElementById('Question');
const NextBtn = document.getElementById('next_btn');
const AnswerButtons = document.querySelector('.answer_buttons');

let CurrentQuestionIndex = 0;
let Score = 0;

function StartQuiz() {
    CurrentQuestionIndex = 0;
    Score = 0; 
    NextBtn.innerText = "Next";
    ShowQuestion();
};

function ShowQuestion() {
    resetState();
    let currentQuestion = Questions[CurrentQuestionIndex];
    let QuestionNo = CurrentQuestionIndex + 1;
    QuestionElement.innerHTML = QuestionNo + "." + currentQuestion.question; 

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        AnswerButtons.appendChild(button); 
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        } 
        button.addEventListener("click", SeelctAnswer);
    });
};

ShowQuestion();  

function resetState() {
    NextBtn.style.display = "none";
    while(AnswerButtons.firstChild) {
        AnswerButtons.removeChild(AnswerButtons.firstChild); 
    }
};

function SeelctAnswer(e) {
    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.correct === "true";
    console.log(e.target);

    if(isCorrect) {
        selectbtn.classList.add('correct');
        Score++;
    } else {
        selectbtn.classList.add('incorrect');
    }

    Array.from(AnswerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        } 
        button.disabled = "true";
    });
    NextBtn.style.display = "block";
};

function ShowScore() {
    resetState();
    QuestionElement.innerHTML = `You Scored ${Score} out of ${Questions.length}!`;
    NextBtn.style.display = "block";
    NextBtn.innerHTML = "Play Again";
};

function NextQuestion() {
    CurrentQuestionIndex++;
    if(CurrentQuestionIndex < Questions.length) {
        ShowQuestion();
    } else {
        ShowScore();
    }
};

NextBtn.addEventListener("click", () => {
    if(CurrentQuestionIndex < Questions.length) {
        NextQuestion();
    } else {
        StartQuiz();
    }
});

StartQuiz();