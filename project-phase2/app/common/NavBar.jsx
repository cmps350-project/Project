import React from 'react'
import styles from '@/app/page.module.css'


export default function NavBar() {
  return (
    <>
        <header className = {styles.header}>
            <nav className = {styles.navigation}>
                <ul className = {styles.menu}>
                    <li className = {styles.menuItem}><a href="main.html">Home</a></li>
                    <li className = {styles.menuItem} id = "acc-page"><a>View Account</a></li>
                    <li className = {styles.menuItem} id = "sell-page"><a>Sell Your Art</a></li>                       
                    <li className = {styles.menuItem}><a href="#ethical-commitment">About Us</a></li>
                </ul>
            </nav>
            <h1 className = {styles.headerTitle}>Artfully Yours</h1>
            <div className = {styles.icons}>
                <a id = "basket-icon"><img src="/images/bag_icon.png" alt="Shopping Cart" width="30" height="30" ></img></a>
                <a href="login.html" id = "login-icon"><img src="/images/user.png" alt="User" width="30" height="30" ></img></a>
            </div>
        </header>
    
    
    </>
  )
}
