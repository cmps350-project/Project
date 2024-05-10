import React from 'react';
import User from '@/app/artworks/[userId]/User';
import userRepo from '@/app/repo/user-repo';
import artworkRepo from '@/app/repo/artwork-repo'; 
import styles from '@/app/styles/page.module.css';

export default async function SellerPage({ params }) {
  const userId = params.userId;
  const seller = await userRepo.getSellerByUserId(userId);
  const artworks = await artworkRepo.getArtworksBySellerId(userId);

  return (
    <div className={styles.pageBody}>
      {seller && <User user={seller} />}
      <h2 className={styles.h2}>This is the art you are currently selling</h2>
      <hr className={styles.hr} />
      <div className={styles.cardContainer}>
        <ul>
          {artworks.map((artwork) => (
            <div className={styles.card} key={artwork.artworkNo}>
              <p className={styles.title}>{artwork.title}</p>
              <img src={artwork.image.image_url} alt={artwork.image.alternate_url} height="200" width="150" />
              <p className={styles.fontUpperC}>Price: {Number(artwork.price)}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
