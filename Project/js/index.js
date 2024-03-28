const filePath = 'js/db/artwork.json';

const artContainer = document.querySelector("#art-container")
const searchBTN = document.querySelector("#search-btn")
const searchTF = document.querySelector("#search-tf")
const featuredArtDiv = document.querySelector("#featured-card")
const basketIcon = document.querySelector("#basket-icon")

let artworks = []
let filteredArtworks = []
let filtering = false
let shoppingCart = []

// basketIcon.addEventListener('click', goToBasket)
searchBTN.addEventListener('click', searchAndFilter)
document.addEventListener('DOMContentLoaded', async () => {
    //functions
    window.addToCart = addToCart;
    try {
        if(!localStorage.artworks) {
            const data = await fetch(filePath);
            const artworks = await data.json();
            console.log("no artworks exist in storage, fetching artworks..")
            localStorage.artworks = JSON.stringify(artworks) //save books in local storage as string
            showArtworks() //display books from local storage

        }else{
            console.log('artworks exist in storage, fetching from local storage..')
            showArtworks()
        }
    } catch (error) {
        console.error("Failed to load artworks:", error);
    }
})

function getLoggedInUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
        return JSON.parse(userString);
    } else {
        return null;
    }
}
basketIcon.addEventListener('click', () => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser || loggedInUser.type !== 'customer') {
        alert ("You must be logged in as a customer to access your basket")
        window.location.href = "login.html"
    } else {
        window.location.href = "basket.html"
    }
});





function showArtworks(){
    if (!filtering){
        artworks = JSON.parse(localStorage.artworks) //convert it back from string to json obj
        featureArtwork(artworks[3])// feature an artwork
        const artworksString = artworks.map((artwork) => artworkToHTML(artwork)).join(' ') //map book to html
        artContainer.innerHTML = artworksString; //add it in html code
    }
    else{ //filtering case, show only filtered art
        const artworksString = filteredArtworks.map((artwork) => artworkToHTML(artwork)).join(' ')
        artContainer.innerHTML = artworksString;
    }
    artworkEvents()

}

function featureArtwork(artwork){
    featuredArtDiv.innerHTML = featuredArtToHTML(artwork)
}

function artworkEvents() {
    const artworkCard = document.querySelectorAll(".artwork-item");
  
    artworkCard.forEach(card => {
        const cardID = card.id
        const artworkId = parseInt(cardID); 
        const artwork = artworks.find(artwork => artwork.id === artworkId); //find the artwork were hovering over from card id
    
        const imageElement = card.querySelector('.artwork-image'); //get the image form the card
        const imageBTN = card.querySelector('.image-btn'); //get the button
    
        //when hovered over, change the image and display the buy button
        card.addEventListener('mouseover', () => {
            imageBTN.style.display = 'block';
          if (artwork && artwork.images.alternate) { //check if hover image exists
            imageElement.style.opacity = 0;
            setTimeout(() => {
              imageElement.src = artwork.images.alternate;
            }, 50);
            imageElement.style.opacity = 1; 
          }
        });
    
        //mouse out, go back to normal image
        card.addEventListener('mouseout', () => {
          imageElement.src = artwork.images.url;
          imageBTN.style.display = 'none';

          
        });
      });
    }


    function addToCart(artworkID){
        if (!isLoggedIn()){
            alert("You must be logged in as a customer to add to cart")
            window.location.href = "login.html"
        }
        else {
            const artwork = artworks.find((artwork) => artwork.id == artworkID)
            const quantity = 1
            const cartItemIndex = shoppingCart.findIndex(item => item.artworkID === artworkID);
            if (cartItemIndex !== -1) {
                alert(`${artwork.title} already exists in your cart. Manage the Quantity in your shopping basket`)
            } else {
                alert(`added ${artwork.title} to cart successfully`)
                shoppingCart.push({ artworkID: artwork.id, quantity: quantity })
                localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
            }
        }
    }
    

function artworkToHTML(artwork){
    return`
    <article class = "artwork-item" id = "${artwork.id}">
    <div class="img-container">
        <img class = "img artwork-image" src= ${artwork.images.url} alt="${artwork.description}">
        <button class="image-btn button" onclick = "addToCart(${artwork.id})">Add to Cart</button>
    </div>
    <h3 class = "title art-title">${artwork.title}</h3> 
    <p class="artist">${artwork.artist}</p>
    <p class = "price">${artwork.price}$</p>
    </article>
    `
}


function featuredArtToHTML(artwork){
    return `
    <div class = "ft-image-container">
        <
        <img class = "featured-img" src="${artwork.images.url}" alt="Descriptive Painting Title">
    </div>
    <div class = "featured-text">
        <h3 class = "title art-title">${artwork.title}</h3> 
        <p class="artist">${artwork.artist}</p>
        <p class="descrciption">${artwork.description}</p>
    </div>
    `
}

function searchAndFilter(e){
    e.preventDefault()
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

function goToBasket(){
    if (!isLoggedIn())
        window.location.href = "login.html"
    else
        window.location.href = "basket.html"
}


// user related functions
function isLoggedIn(){
    console.log(localStorage.user)
    if (!localStorage.user)
        return false
    else
        return true
}




