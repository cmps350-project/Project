import React from 'react';
import artworkRepo from "@/app/repo/artwork-repo";
import styles from "@/app/styles/basket.module.css";

export default async function ArtworkPage({ params }) {
    
    const artwork = await artworkRepo.getArtworkbyId(params.artworkId);

    if (!artwork) {
        return <div>Artwork not found</div>;
    }

    return (
    
        <>
         <div className = {styles.basketContainer} id = "art-container">
                
            <article className={styles.basketArtworkItem} id={artwork.id} >
                <div className={styles.basketArtworkItemImg}>
                    <img className={styles.basketArtworkItemImg} src={ artwork.image.image_url} alt={artwork.description} />
                   
                </div>
                <div className={styles.basketArtworkDetails}>
                    <h3 className={styles.mainArtTitle}>{artwork.basketArtTitle}</h3>
                    <p className={styles.artist}>By: {artwork.artist.name}</p>
                    <p className={styles.price}>Price: ${artwork.price}</p>
                    <p className={styles.description}>{artwork.description}</p>
                    <p className={styles.category}>Category: {artwork.category}</p>
                    <p className={styles.medium}>Medium: {artwork.medium}</p>
                    <p className={styles.year}>Year: {artwork.year}</p>
                </div>
            </article>
            </div>
        </>
    );
    
}
