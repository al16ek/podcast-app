import { Question } from "./question"
import { createModal, isValid } from "./util"
import { getLoginForm, signUpWithEmailAndPassword } from "./login"
import { authWithEmailAndPassword, getAuthForm } from "./auth"
import "./style.css"

const form = document.getElementById("form")
const modalBtn = document.getElementById("modal-btn")
const input = form.querySelector("#question-input")
const submitBtn = form.querySelector("#submit")

window.addEventListener("load", Question.renderList)

modalBtn.addEventListener("click", openModal)

form.addEventListener("submit", submitFormHandler)

function submitFormHandler(event) {
  event.preventDefault()
  input.addEventListener("input", () => {
    submitBtn.disabled = !isValid(input.value)
  })

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    }
    submitBtn.disabled = true
    // Async request to server to save question
    Question.create(question).then(() => {
      input.value = ""
      input.className = ""
      submitBtn.disabled = false
    })
  }
}

function openModal() {
  createModal("Авторизация", getAuthForm())
  document.getElementById("signUpBtn").addEventListener("click", (event) => {
    event.preventDefault()
    console.log("click")
    createModal("Регистрация", getLoginForm())
    document
      .getElementById("auth-form")
      .addEventListener("submit", signUpFormHandler, { once: true })
  })
  document
    .getElementById("auth-form")
    .addEventListener("submit", authFormHandler, { once: true })
}

function signUpFormHandler(event) {
  event.preventDefault()
  const btn = event.target.querySelector("button")
  const email = event.target.querySelector("#email").value
  const password = event.target.querySelector("#password").value

  signUpWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(() => (btn.disabled = false))
}

function authFormHandler(event) {
  event.preventDefault()
  const btn = event.target.querySelector("button")
  const email = event.target.querySelector("#email").value
  const password = event.target.querySelector("#password").value

  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => (btn.disabled = false))
}

function renderModalAfterAuth(content) {
  if (typeof content === "string") {
    createModal("Ошибка", content)
  } else {
    createModal("Список вопросов", Question.listToHTML(content))
  }
}
