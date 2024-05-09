import React from 'react'

export default function page() {
  return (
    <>
                <main class="login-form">
                <h2 class="form-title">Login</h2>
                <form>
                    <div class="form-group">
                        <div class="input-container">
                            <input type="text" id="username" name="username" required></input>
                            <label for="username">Username</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-container">
                            <input type="password" id="password" name="password" required></input>
                            <label for="password">Password</label>
                        </div>
                    </div>
                    <button type="submit" class="button">Login</button>
                </form>
            </main>
    </>
  )
}
