
import React from 'react';
import artworkRepo from '@/app/repo/artwork-repo';
import ShoppingCart from '@/app/shoppingcart/shoppingcart';

export default async function ArtworkPage({ params }) {
  const artwork = await artworkRepo.getArtworkbyId(params.artworkId);

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return (
    <>
      <ShoppingCart artwork={artwork} />
    </>
  );
}
