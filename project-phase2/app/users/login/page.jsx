import React from 'react'
import styles from '@/app/styles/page.module.css'


export default function page() {
  return (
    <>
                <main>
                    <div className ={styles.loginForm}>
                    <h2 className = {styles.loginFormTitle}>Login</h2>
                    <form>
                    <div className = {styles.loginFormGroup}>
                        <div className ={styles.loginInputContainer}>
                            <label for="username" className = {styles.loginLabel}>Username</label>
                            <input type="text" id="username" name="username" required className = {styles.loginInputFields}></input>
                        </div>
                    </div>
                    <div className = {styles.loginFormGroup}>
                        <div className = {styles.loginInputContainer}>
                            <label for="password" className = {styles.loginLabel}>Password</label>
                            <input type="password" id="password" name="password" required className = {styles.loginInputFields}></input>
                        </div>
                    </div>
                    <button type="submit" className = {styles.button}>Login</button>
                </form>
                    </div>
            </main>
    </>
  )
}


