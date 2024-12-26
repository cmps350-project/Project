//selecting html elements
const artForm = document.querySelector("#art-form")
const artContainer = document.querySelector("#display-art-container")
//saved
const artist = JSON.parse(localStorage.user)
let artist_artworks = []
let updating = false;

//adding event listeners
artForm.addEventListener('submit', submitArt)
document.addEventListener('DOMContentLoaded', () => {
    window.insertToForm = insertToForm
    showArtistArtworks()
})
function showArtistArtworks(){
    let artworks = JSON.parse(localStorage.artworks)
    let artist_artworks = artworks.filter((artwork) => artwork.artist == artist.fullName)
    const artworksString = artist_artworks.map((artwork) => artistArtToHTML(artwork)).join(' ')
    artContainer.innerHTML = artworksString; //add it in html code
}
function artistArtToHTML(artwork){
    return `
    <div class = "art-card">
        <button type = "button" class = "button" onclick = "insertToForm(${artwork.id})">Insert In Form</button>
        <img class = "img" src = "${artwork.images.url}">
        <p class = "card-text">Title: ${artwork.title}</p>
        <p class = "card-text">Category: ${artwork.category}</p>
        <p class = "card-text">Medium:${artwork.medium} </p>
        <p class = "card-text">Year: ${artwork.year}</p>
        <p class = "card-text">Price: ${artwork.price}</p>
        <p class = "card-text">Quantity: ${artwork.quantity}</p>
        <p class = "card-text smaller">Url: ${artwork.images.url}</p>
        <p class = "card-text smaller">Alternative:${artwork.images.alternate} </p>
        <p class = "card-text smaller">Description: ${artwork.description}</p>
    </div>
    `
}
function insertToForm(artworkID){
    DisableForm();
    let artworks = JSON.parse(localStorage.artworks)
    let artist_artworks = artworks.filter((artwork) => artwork.artist == artist.fullName)
    const artwork = artist_artworks.find((a) => a.id == artworkID)
    artForm.title.value = artwork.title; 
    artForm.category.value = artwork.category;
    artForm.medium.value = artwork.medium; 
    artForm.year.value = artwork.year; 
    artForm.price.value = artwork.price; 
    artForm.image.value = artwork.images.url; 
    artForm.alternative.value = artwork.images.alternate; 
    artForm.description.value = artwork.description;  
}

function submitArt(e){
    let artworks = JSON.parse(localStorage.artworks)
    let isDuplicate = hasDuplicateArtwork(createArtworkObject(e.target), artworks)
    e.preventDefault()
    if (validateSellArtForm() && !updating &&!isDuplicate){
        const masterpeice = createArtworkObject(e.target) //e.target is basically the form
        console.log(masterpeice)
        artForm.reset() //reset form
        artworks.unshift(masterpeice)
        localStorage.artworks = JSON.stringify(artworks)
        alert(`Your masterpiece titled ${masterpeice.title} is added to Sale Successfully (:`)
        }
    else if (updating || isDuplicate){
        let artwork = artworks.find((a) => a.title == artForm.title.value)
        artwork.quantity+=1
        localStorage.artworks = JSON.stringify(artworks)
        alert(`updated artwork quantity to ${artwork.quantity}`)
        EnableForm()
        artForm.reset() //reset form
    }else{
        alert("Form Invalid!")
    }
    showArtistArtworks()
}

function createArtworkObject(form) {
    const formData = formToObject(form);
  
    const artwork = {
      id: Date.now(),
      title: formData.title,
      artist: artist.fullName,
      category: formData.category,
      medium: formData.medium, 
      year: parseInt(formData.year),
      price: parseFloat(formData.price),
      quantity: 1,
      description: formData.description, 
      images: {
        url: formData.image, 
        alternate: formData.alternative
      }
    };
    return artwork;
  }
function formToObject(form){
    const formData = new FormData(form);
    const data = {}
    
    for (const [key, value] of formData){   //key is the name part of the form, and the value is whatever the user enters
        data[key] = value
    }
    return data
}

function DisableForm(){
    updating = true;
    const formElements = artForm.querySelectorAll('input, textarea, select');
    formElements.forEach(element => {
    element.disabled = true; 
    });
}
function EnableForm(){
    updating = false;
    const formElements = artForm.querySelectorAll('input, textarea, select');
    formElements.forEach(element => {
    element.disabled = false; 
    });
}

function hasDuplicateArtwork(formObject, artworkArray) {
    return artworkArray.some(existingArtwork => {
        return existingArtwork.title === formObject.title && 
               existingArtwork.artist === formObject.artist; 
    });
}

function validateSellArtForm() {
    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const year = document.getElementById("artpiece-year").value;
    const price = document.getElementById("artpiece-price").value;
    const image = document.getElementById("artpiece-image").value;
    const altImage = document.getElementById("alternative-image").value;
    const description = document.getElementById("description").value.trim();
  
    let isValid = true; // Start assuming the form is valid
    if (title === "") {
      alert("Please enter a title for your art piece.");
      isValid = false;
    }
    if (category === "") {
      alert("Please select an art category.");
      isValid = false;
    }
    if (isNaN(year) || year < 1800 || year > new Date().getFullYear()) {
      alert("Please enter a valid year (e.g., 2023).");
      isValid = false;
    }
  
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price (greater than 0).");
      isValid = false;
    }
  
    if (image === "" || altImage === "") {
      alert("Please upload both the main image and an alternative image.");
      isValid = false;
    }
  
    if (description === "") {
      alert("Please enter a description for your art piece.");
      isValid = false;
    }
  
    return isValid;
  }
  