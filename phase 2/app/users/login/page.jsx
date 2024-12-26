'use client'
import React, { useState } from 'react';
import styles from '@/app/styles/page.module.css';
import { useRouter } from 'next/navigation'

export default function page() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleFormSubmit = async(event) => {
    event.preventDefault(); 

    try{
      const response = await fetch(`/api/users/${formData.username},${formData.password}`)
      const userId = await response.json();  
      if (userId) {
        localStorage.setItem('userId', userId);
        alert("User logged in Successfully");
        router.push('/');
      } else {
        alert("Login Failed");
      }
      router.push('/')
    }catch(error){
      alert("Login Failed");
      router.refresh()
    }
    setFormData({ username: '', password: '' });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <main>
        <div className={styles.loginForm}>
          <h2 className={styles.loginFormTitle}>Login</h2>
          <form onSubmit={handleFormSubmit}>
            <div className={styles.loginFormGroup}>
              <div className={styles.loginInputContainer}>
                <label htmlFor="username" className={styles.loginLabel}>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className={styles.loginInputFields}
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={styles.loginFormGroup}>
              <div className={styles.loginInputContainer}>
                <label htmlFor="password" className={styles.loginLabel}>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className={styles.loginInputFields}
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button type="submit" className={styles.button}>Login</button>
          </form>
        </div>
      </main>
    </>
  );
}
