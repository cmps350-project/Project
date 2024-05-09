'use client'
import { React, useState } from 'react'
import styles from '@/app/styles/page.module.css'
import Artwork from '@/app/artworks/Artwork'
import FtArtwork from '@/app/artworks/FtArtwork'


export default function Artworks({initialArtworks}) {
    const [artworks, setArtworks] = useState(initialArtworks)


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
      

    const ftart = initialArtworks[8]


    
  return (
   <>
        <main className = {styles.mainPageBody}>
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

