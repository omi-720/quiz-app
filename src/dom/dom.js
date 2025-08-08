import { current,getScore,reset,submit } from "../state/quiz.js";

let quizCard = document.createElement("div")
quizCard.id = "quiz-card"

document.body.append(quizCard)

export function showQuestion(){
    let q = current()
    quizCard.innerHTML = `
    <h2>${q.question}</h2>
    <div id="choices"></div>
    <p id="progress"></p>
    `

    let choiceBox = quizCard.querySelector("#choices")
    q.choices.forEach((el,i)=>{
        let button = document.createElement("button")
        button.innerText = el 
        button.onclick = ()=>{
            let more = submit(i)
            more ? showQuestion() : showResult()
        }
        choiceBox.append(button)
    })
    getProgress()
}
//hello
export function getProgress(){
    const {score,total}= getScore()
    quizCard.querySelector("#progress").textContent = `Score: ${score} / Total: ${total}`
}

export function showResult(){
    const {score,total}= getScore()
    const prevHigh = parseInt(localStorage.getItem("highScore") || "0")

    if (score > prevHigh) {
        localStorage.setItem("highScore", score)
    }

    const highScore = localStorage.getItem("highScore")
    quizCard.innerHTML = `
    <h2>Quiz is Finishef</h2>
   
    <p>Your score: ${score}/${total}</p>
    <button id="retry">Try Again</button>
    `
    quizCard.querySelector("#retry").onclick = () => {
        reset()
        showQuestion()
    }
    
}