'use client'
import { React, useState } from 'react'
import styles from '@/app/page.module.css'
import Artwork from '@/app/artworks/Artwork'
import FtArtwork from '@/app/artworks/FtArtwork'

export default function Artworks({initialArtworks}) {
    const artworks = initialArtworks
    const ftart = initialArtworks[8]
    const btnClasses = "image-btn hidden button"
  return (
   <>
    <div className = {styles.mainContainer}>
        <main className = {styles.mainPageBody}>

            <FtArtwork ftart = {ftart}></FtArtwork>

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

