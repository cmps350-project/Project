import { getUsers } from "./db/users.js"

const loginForm = document.querySelector(".login-form")
const usernameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")

console.log("loginForm:", loginForm)

loginForm.addEventListener("submit", function(event) {
    event.preventDefault() 

    login(usernameInput, passwordInput)
})

async function login(usernameInput, passwordInput) {
    try {
        const username = usernameInput.value
        const password = passwordInput.value
        const users = getUsers()

        const user = users.find(user => user.username === username && user.password === password)
        if (user) {
            alert("Login successful!")
            console.log("User found:", user)
            window.location.href = "main.html"
        } else {
            alert("Invalid username or password.")
            console.log("Invalid username or password.")
        }
    } catch (error) {
        console.error("Error fetching user data:", error)
    }
}
