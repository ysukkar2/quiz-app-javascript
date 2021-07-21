const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContanierElement = document.getElementById('question-contanier')
const questionElement = document.getElementById('question')
const answerButtonsElement =  document.getElementById('answers-buttons')

let shuffledQuesions, currentQuestionIndex
startButton.addEventListener('click',startGame)
nextButton.addEventListener('click',()=>{
    currentQuestionIndex++
    setNextQuestion()
})
function startGame(){
    startButton.classList.add('hide')
    shuffledQuesions = questions.sort(()=>Math.random()-.5)
    currentQuestionIndex = 0
    questionContanierElement.classList.remove('hide')
    setNextQuestion()
}
function setNextQuestion(){
    resetSate()
    showQuestion(shuffledQuesions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer=>{
        const button = document.createElement('button')
        button.innerText=answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct  =answer.correct
        }
        button.addEventListener('click',selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
function resetSate(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton  = e.target
    const correct  =selectedButton.dataset.correct
    setStatusClass(document.body,correct)
    Array.from(answerButtonsElement.children).forEach(button=>{
        setStatusClass(button,button.dataset.correct)
    })
    if(shuffledQuesions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }else{
        startButton.innerText= 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element,correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}


function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
const questions = [
    {
        question: ' What is 2 + 2?',
        answers:[
            {text:'4',correct:true},
            {text:'22',correct:false}
        ]
    },
    {
        question : 'who won euro 2004?',
        answers:[
            {text:'Greece', correct:true},
            {text:'England', correct:false},
            {text:'Germany', correct:false},
            {text:'Spain', correct:false},
        ]
    },
    {
        question : 'is web development fun?',
        answers:[
            {text:'Kinda', correct:false},
            {text:'Yes', correct:true},
            {text:'no', correct:false},
            {text:'IDK', correct:false},
        ]


    },
    {
        question:'what is 4 * 2?',
        answers:[
            {text:'6',correct:false},
            {text:'8',correct:true},
        ]
    }
]