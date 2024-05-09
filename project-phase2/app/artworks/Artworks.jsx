'use client'
import { React, useState } from 'react'
import styles from '@/app/page.module.css'
import Artwork from '@/app/artworks/Artwork'

export default function Artworks({initialArtworks}) {
    const artworks = initialArtworks
    const btnClasses = "image-btn hidden button"
  return (
   <>
    <div className = {styles.mainContainer}>
        <main className = {styles.mainPageBody}>
            <section id="featured-paintings section">
                <h1 class = "title">Featured Artwork</h1>
                <div class = "featured-card" id = "featured-card">    </div>
            </section>
            <section id="all-artwork" class="section artwork-section">
                <h2 className = {styles.title}>All Artwork</h2>
                <form className = {styles.mainSearchForm} id = "search-form">
                    <input type="text" placeholder="Search by Title, Asrtist Name, or Category" className = {styles.mainFormInput} id = "search-tf"></input>
                    <button type="submit" className = {styles.button} id = "search-btn">Search</button>
                </form>
                <div className = {styles.mainArtContainer} id = "art-container">
                {
                    artworks.map(artwork => <Artwork artwork = {artwork}></Artwork>)
                }   
                </div>
            </section>
        </main>
        </div>


    
    </>
  )
}

