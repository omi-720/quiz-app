import { questions as originalQuestions } from "../data/questions.js"

let questions = []
let index = 0
let score = 0

export function current() {
    return questions[index]
}

export function submit(choiceIndex) {
    if (choiceIndex === current().answer) {
        score++
    }
    index++
    return index < questions.length
}

export function getScore() {
    return { score, total: questions.length }
}

export function reset() {
    index = 0
    score = 0
    questions = shuffle([...originalQuestions])
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}
