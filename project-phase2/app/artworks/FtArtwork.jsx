'use client'
import { React, useState } from 'react'
import styles from '@/app/styles/page.module.css'

export default function FtArtwork({ftart}) {
  return (
    <>
    <section id="featured-paintings section">
    <h1 className = {styles.title}>Featured Artwork</h1>
    <div className = {styles.mainFeaturedCard} id = "featured-card">
    <div className = {styles.mainFtImgContainer}>
        <select id="artwork-select" class = "artwork-select hidden" placeholder = "Choose Artwork" name="artwork-select"></select>
        <img className = {styles.mainFeaturedImg} src={ftart.image.image_url} alt="Descriptive Painting Title"></img>
        </div>
        <div className = {styles.mainFeaturedText}>
            <h3 class = "title art-title">{ftart.title}</h3> 
            <p class="artist">{ftart.artist.name}</p>
            <p class="descrciption">{ftart.description}</p>
        </div>
    </div>
    </section> 
    </>

    )
}
