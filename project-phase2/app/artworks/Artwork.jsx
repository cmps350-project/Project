import React from 'react'
import styles from '@/app/styles/page.module.css'
// button classes: class="image-btn hidden button"
export default function Artwork({artwork}) {
  return (
    <>
        <article className = {styles.mainArtworkItem} id = {artwork.id}>
            <div className = {styles.mainImgContainer}>
                <img className = {styles.mainArtworkImage} src= {artwork.image.image_url} alt={artwork.description}></img>
                <button className = {styles.hidden} onclick = "addToCart(${artwork.id})">Add to Cart</button>
            </div>
            <h3 className = {styles.mainArtTitle}>{artwork.title}</h3> 
            <p className = {styles.mainArtist}>{artwork.artist.name}</p>
            <p className = {styles.mainPrice}>{artwork.price}$</p>
        </article>
    
    </>
  )
}
