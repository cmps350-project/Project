import {getArtworks} from "./db/artwork.js"; // Import the artwork data

const artContainer = document.querySelector("#art-container")
const searchBTN = document.querySelector("#search-btn")
const searchTF = document.querySelector("#search-tf")

let artworks = []
let filteredArtworks = []
let filtering = false

//events
searchBTN.addEventListener('click', searchAndFilter)
document.addEventListener('DOMContentLoaded', () => {
    try {
        if(!localStorage.artworks) {
            artworks = getArtworks()
            console.log("no artworks exist in storage, fetching artworks..")
            localStorage.artworks = JSON.stringify(artworks) //save books in local storage as string
            showArtworks() //display books from local storage
        }
        else{
            console.log('artworks exist in storage, fetching from local storage..')
            showArtworks()
        }
    } catch (error) {
        console.error("Failed to load artworks:", error);
    }
});

function showArtworks(){
    if (!filtering){
        artworks = JSON.parse(localStorage.artworks) //convert it back from string to json obj
        const artworksString = artworks.map((artwork) => artworkToHTML(artwork)).join(' ') //map book to html
        artContainer.innerHTML = artworksString; //add it in html code
    }
    else{ //filtering case, show only filtered art
        const artworksString = filteredArtworks.map((artwork) => artworkToHTML(artwork)).join(' ')
        artContainer.innerHTML = artworksString;
    }
}

function artworkToHTML(artwork){
    return`
    <article class = "artwork-item" id = "${artwork.id}">
    <img class = "img" src= ${artwork.imageUrl} alt="Descriptive Painting Title">
    <h3 class = "title art-title">${artwork.title}</h3> 
    <p class="artist">${artwork.artist}</p>
    <p class="price">${artwork.price}$</p>
    <p class = "category">${artwork.category}</p>
    </article>
    `
}

function searchAndFilter(){
    filtering = true;
    const search = searchTF.value.toLowerCase()
    filteredArtworks = artworks.filter((artwork) => 
    artwork.artist.toLowerCase().includes(search) ||
    artwork.title.toLowerCase().includes(search) ||
    artwork.category.toLowerCase().includes(search))
    if(!searchTF.value){
        filtering = false
    }
    showArtworks()
}
