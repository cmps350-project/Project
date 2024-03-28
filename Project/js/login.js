
const loginForm = document.querySelector(".login-form")
const usernameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")

document.addEventListener('DOMContentLoaded', async () => {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault()

        const username = usernameInput.value.trim()
        const password = passwordInput.value.trim()

        try {
            const response = await fetch('./js/db/users.json')
            if (!response.ok) {
                throw new Error('Failed to fetch user data')
            }

            const users = await response.json()
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
    })
})

