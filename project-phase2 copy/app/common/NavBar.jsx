'use client'
import React from 'react'
import styles from '@/app/styles/page.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation';


export default function NavBar() {
    const router = useRouter();
    
      const handleSellYourArtClick = async() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            const response = await fetch(`/api/users/sellers/${userId}`)
            const user = await response.json(); 
            if (user) {
              router.push(`/artworks/${userId}/upsert`);
            }else{
                alert("You are not a seller and therefore cannot access this page");
            }
        }else{
          alert('You are not logged in, please login as seller to sell your art');
          router.push(`/users/login`);
        }
      };


        const handleViewAccountClick = async () => {
            try {
              const userId = localStorage.getItem('userId');
              if (!userId) {
                alert('You are not logged in. Please login to view your account.');
                router.push(`/users/login`);
                return;
              }
              const customerResponse = await fetch(`/api/users/customers/${userId}`);
              const customer = await customerResponse.json();
              if (customer) {
                //user is customer
                router.push(`/artworks/${userId}/viewCustomer`);
                return;
              }
              const sellerResponse = await fetch(`/api/users/sellers/${userId}`);
              const seller = await sellerResponse.json();
          
              if (seller) {
                //user is seller
                router.push(`/artworks/${userId}/viewSeller`);
                return;
              }
              const adminResponse = await fetch(`/api/users/admins/${userId}`);
              const admin = await adminResponse.json();
          
              if (admin) {
                //user is admin
                router.push(`/artworks/${userId}/viewAdmin`);
                return;
              }
          
              //if user is neither type
              alert('User not found.');
            } catch (error) {
              console.error('Error fetching user:', error);
              alert('An error occurred while fetching user data.');
            }
          };
          

  return (
    <>
    <div className={styles.pageHead}>
        <header className = {styles.header}>
            <nav className = {styles.navigation}>
                <ul className = {styles.menu}>
                    <li className = {styles.menuItem}><Link href="/">Home</Link></li>
                    <li className = {styles.menuItem} id = "acc-page" onClick={handleViewAccountClick}>View Account</li>
                    <li className = {styles.menuItem} id = "sell-page" onClick={handleSellYourArtClick}>Sell Your Art</li>                       
                    <li className = {styles.menuItem}><Link href="#ethical-commitment">About Us</Link></li>
                </ul>
            </nav>
            <h1 className = {styles.headerTitle}>Artfully Yours</h1>
            <div className = {styles.icons}>
                <Link href="/users/login" id = "login-icon"><img src="/images/user.png" alt="User" width="30" height="30" ></img></Link>
            </div>
        </header>
        <section id="home" className = {styles.mainHomeSection}>
                <p className = {styles.tag}>Fuel your creative spirit</p>
        </section>  
    </div>
    
    
    </>
  )
}

    
