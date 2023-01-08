const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter= 0 
let availableQuestions = []


let questions = [
    { question: 'JavaScript is a ______-side programming language',
    choice1: 'Client',
    choice2: 'Server',
    choice3: 'Both',
    choice4: 'None',
    answer: 3,

},
{ question: 'How do you find the minimum of x and y using JavaSCript?',
    choice1: 'min(x,y):',
    choice2: 'Math.min(x,y)',
    choice3: 'Math.min(xy)',
    choice4: 'min(xy):',
    answer: 2,

},
{ question: 'Which JavaScript label catches all the values, eept for the ones specified?',
    choice1: 'catch',
    choice2: 'label',
    choice3: 'try',
    choice4: 'default',
    answer: 4,

},
{ question: 'What will the code return? Boolean (3<7)',
    choice1: 'true',
    choice2: 'false',
    choice3: 'NaN',
    choice4: 'SyntaxError',
    answer: 1,

}
    
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 4


startGame = () => {
    questionCounter= 0
    score= 0
    availableQuestions= [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score)

      return window.location.assign('./end.html')
    }

questionCounter++
progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
currentQuestion = availableQuestions[questionsIndex]
question.innerText = currentQuestion.question

choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})

availableQuestions.splice(questionsIndex, 1)

acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return 

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset ['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect' 
       
         if(classToApply == 'correct')     {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion ()

        }, 1000)
    } )
})


incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame ()