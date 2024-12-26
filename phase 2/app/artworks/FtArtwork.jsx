'use client'
import { React, useState } from 'react'
import styles from '@/app/styles/page.module.css'

export default function FtArtwork({ftart}) {
  return (
    <>
    <div className = {styles.mainFeaturedCard} id = "featured-card">
    <div className = {styles.mainFtImgContainer}>
        <img className = {styles.mainFeaturedImg} src={ftart.image.image_url} alt="Descriptive Painting Title"></img>
        </div>
        <div className = {styles.mainFeaturedText}>
            <h3 className = {styles.mainArtTitle}>{ftart.title}</h3> 
            <p className = {styles.artist}>{ftart.artist.name}</p>
            <p className = {styles.description}>{ftart.description}</p>
        </div>
    </div>
    </>

    )
}

