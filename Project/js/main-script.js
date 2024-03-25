import artworks from "../db/artworkData"; // Import the artwork data

function saveArtworksToLocalStorage() {
  localStorage.setItem('artworks', JSON.stringify(artworks));
}

//saveArtworksToLocalStorage();

console.log(artworks);
