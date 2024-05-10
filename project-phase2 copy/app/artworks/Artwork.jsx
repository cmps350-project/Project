
import React, { useState } from 'react';
import styles from '@/app/styles/page.module.css'
import { useRouter } from 'next/navigation'


export default function Artwork({ artwork }) {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);

  const imageUrl = isHovering ? artwork.image.alternate_url : artwork.image.image_url;
  async function handleBuyNow () {
    const userId = localStorage.getItem('userId');
    if (userId) {
        const response = await fetch(`/api/users/customers/${userId}`)
        const user = await response.json(); 
        if (user) {
          router.push(`/shoppingcart/${artwork.artworkNo}`);
        }else{
          alert("You are not a customer. cannot buy art.")
        }
    }else{
      alert('You are not logged in, please login to purchase artwork');
      router.push(`/users/login`);
    }
  }
  


  return (
    <>
        <article className = {styles.mainArtworkItem} id = {artwork.id} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className = {styles.mainImgContainer}>
                <img className = {styles.mainArtworkImage} src={imageUrl} alt={artwork.description}></img>
                <button className={`${styles.button} ${styles.mainImageBtn} ${isHovering ? '' : styles.hidden}`} onClick={handleBuyNow}>Buy Now</button>

            </div>
            <h3 className = {styles.mainArtTitle}>{artwork.title}</h3> 
            <p className = {styles.mainArtist}>{artwork.artist.name}</p>
            <p className = {styles.mainPrice}>{artwork.price}$</p>
        </article>
    
    </>
  )
}
