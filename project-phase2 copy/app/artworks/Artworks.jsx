'use client'
import { React, useState } from 'react'
import styles from '@/app/styles/page.module.css'
import Artwork from '@/app/artworks/Artwork'
import FtArtwork from '@/app/artworks/FtArtwork'


export default function Artworks({initialArtworks}) {
    const [artworks, setArtworks] = useState(initialArtworks)
    const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(8);


    async function handleLoadArtworks(searchValue) {
        const promises = [
          fetch(`/api/artworks?artistname=${searchValue}`),
          fetch(`/api/artworks?category=${searchValue}`),
          fetch(`/api/artworks?title=${searchValue}`),
        ];
        const responses = await Promise.all(promises);
        const datasets = await Promise.all(responses.map(response => response.json()));
      
        const searchedArtworks = datasets.flat(); 
        setArtworks(searchedArtworks);
      }

      function handleScrollLeft() {
        setSelectedArtworkIndex(prevIndex =>
          prevIndex === 0 ? initialArtworks.length - 1 : prevIndex - 1
        );
      }
    
      function handleScrollRight() {
        setSelectedArtworkIndex(prevIndex =>
          prevIndex === initialArtworks.length - 1 ? 0 : prevIndex + 1
        );
      }
    
      
    
  return (
   <>
        <main className = {styles.mainPageBody}>
        <section id="featured-paintings section" className = {styles.ftArtworkSection}>
        <h1 className = {styles.title}>Featured Artwork</h1>
          <img src = "https://icones.pro/wp-content/uploads/2021/06/symbole-fleche-gauche-gris.png" onClick={handleScrollLeft} height = "30" width = "30"></img>
          <img src = "https://icones.pro/wp-content/uploads/2021/06/symbole-fleche-droite-grise.png" onClick={handleScrollRight} height = "30" width = "30"></img>
          <FtArtwork ftart={initialArtworks[selectedArtworkIndex]}></FtArtwork>
        </section> 

            <section id="all-artwork" class="section artwork-section">
                <h2 className = {styles.title}>All Artwork</h2>
                <form className = {styles.mainSearchForm} id = "search-form">
                    <input type="text" placeholder="Search by Title, Asrtist Name, or Category" 
                        className = {styles.formInput} id = "search-tf"   onChange={e => handleLoadArtworks(e.target.value)} >
                    </input>
                </form>
                <div className = {styles.mainArtContainer} id = "art-container">
                {
                    artworks.map(artwork => <Artwork artwork = {artwork}></Artwork>)
                }   
                </div>
            </section>
        </main>

    </>
  )
}

