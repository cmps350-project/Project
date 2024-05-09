import React, { useState } from 'react';
import styles from '@/app/styles/page.module.css'

export default function Artwork({ artwork }) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);

  const imageUrl = isHovering ? artwork.image.alternate_url : artwork.image.image_url;


  return (
    <>
        <article className = {styles.mainArtworkItem} id = {artwork.id} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} key={artwork.id}>
            <div className = {styles.mainImgContainer}>
                <img className = {styles.mainArtworkImage} src={imageUrl} alt={artwork.description}></img>
                <button 
                    className={`${styles.button} ${styles.mainImageBtn} ${isHovering ? '' : styles.hidden}`} 
                    onclick = "addToCart(${artwork.id})">Add to Cart</button>

            </div>
            <h3 className = {styles.mainArtTitle}>{artwork.title}</h3> 
            <p className = {styles.mainArtist}>{artwork.artist.name}</p>
            <p className = {styles.mainPrice}>{artwork.price}$</p>
        </article>
    
    </>
  )
}
