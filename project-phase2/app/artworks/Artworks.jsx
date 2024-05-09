'use client'
import { React, useState } from 'react'
import styles from '@/app/styles/page.module.css'
import Artwork from '@/app/artworks/Artwork'
import FtArtwork from '@/app/artworks/FtArtwork'


export default function Artworks({initialArtworks}) {
    const [searchTerm, setSearchTerm] = useState('');
    const artworks = initialArtworks
    const ftart = initialArtworks[8]
    const btnClasses = "image-btn hidden button"


    
  return (
   <>
        <main className = {styles.mainPageBody}>
            <section id="all-artwork" class="section artwork-section">
                <h2 className = {styles.title}>All Artwork</h2>
                <form className = {styles.mainSearchForm} id = "search-form">
                    <input type="text" placeholder="Search by Title, Asrtist Name, or Category" 
                        className = {styles.formInput} id = "search-tf"   onChange={(event) => setSearchTerm(event.target.value)} >
                    </input>
                    <button type="submit" className = {styles.button} id = "search-btn">Search</button>
                </form>
        <div className={styles.mainArtContainer} id="art-container">
            {
                artworks.filter(artwork => {
                const searchText = searchTerm.toLowerCase();
                return (
                    artwork.title.toLowerCase().includes(searchText) ||
                    artwork.artist.name.toLowerCase().includes(searchText) ||
                    (artwork.category && artwork.category.toLowerCase().includes(searchText))
                );
                }).map(artwork => <Artwork key={artwork.id} artwork={artwork} />) 
            }
        </div>
            </section>
        </main>

    </>
  )
}

