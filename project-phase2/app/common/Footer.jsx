import React from 'react'
import styles from '@/app/page.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
   <>

        <div className = {styles.pageBottom}>
            <section id="ethical-commitment"> 
                <h2 className = {styles.title}>Ethical Commitment</h2> 
                <p>We believe in the power of art to inspire and its ability to be created responsibly.</p>
                <div class = "ethical-certif">
                    <img src="/images/natural.png" alt="Natural" width="150" height="200"></img>
                    <img src="/images/sustain.png" alt="Sustainable" width="180" height="230"></img>
                    <img src="/images/vegan.png" alt="Vegan" width="150" height="200"></img>
                </div>
                <ul className = {styles.ul}>
                    <li className = {styles.li}><strong>Sustainable Materials:</strong> We prioritize artists and suppliers who use eco-conscious materials</li>
                    <li className = {styles.li}><strong>Upcycled Art:</strong> We champion a growing collection of artwork that gives new life to existing materials.</li>
                    <li className = {styles.li}><strong>Ethical Sourcing:</strong>We carefully vet the origins of materials, ensuring ethical practices throughout our supply chain.</li>
                    <li className = {styles.li}><strong>Giving Back:</strong> A portion of our proceeds supports initiatives on creative outreach in underrepresented communities.</li>
                </ul>
            </section>
        </div>
        <section className = {styles.socialMedia}>
            <Link href = "https://www.instagram.com/?hl=ar"><img src="./images/instagram.png" alt="Instagram" width="30" height="30"></img></Link>
            <Link href = "https://www.tiktok.com/login"><img src="./images/tiktok.png" alt="tiktok" width="30" height="30"></img></Link>
            <Link href = "https://www.google.com/gmail/about/"><img src="./images/email.png" alt="email" width="30" height="30"></img></Link>
        </section>
        <footer className = {styles.footer}>
            <p class = "copy">&copy; 2024 Artfully Yours</p>
        </footer> 
   
   </>
  )
}
