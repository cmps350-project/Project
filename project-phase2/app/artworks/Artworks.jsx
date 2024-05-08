'use client'
import { React, useState } from 'react'
import styles from '@/app/page.module.css'


export default function Artworks({initialArtworks}) {
    const artworks = initialArtworks
    const btnClasses = "image-btn hidden button"
  return (
    <>

    <section id="all-artwork" class="section artwork-section">
                <h2 className = {styles.title}>All Artwork</h2>
                <form className = {styles.mainSearchForm} id = "search-form">
                    <input type="text" placeholder="Search by Title, Asrtist Name, or Category" className = {styles.mainFormInput} id = "search-tf"></input>
                    <button type="submit" className = {styles.button} id = "search-btn">Search</button>
                </form>
                <div className = {styles.mainArtContainer} id = "art-container">
                {
                    artworks.map(artwork => 
                        <article className = {styles.mainArtworkItem} id = {artwork.id}>
                        <div className = {styles.mainImgContainer}>
                            <button className = {styles.hidden} onclick = "addToCart(${artwork.id})">Add to Cart</button>
                        </div>
                        <h3 className = {styles.mainArtTitle}>{artwork.title}</h3> 
                        <p className = {styles.mainArtist}>{artwork.artist}</p>
                        <p className = {styles.mainPrice}>{artwork.price}$</p>
                        </article>
                    )
                }
                    
                </div>
            </section>

    
    </>
  )
}
