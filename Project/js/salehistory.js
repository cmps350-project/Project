document.addEventListener('DOMContentLoaded', function() {
  // Retrieve current user data from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const allItemsSold = JSON.parse(localStorage.getItem('allItemsSold')) || []
  const localArtworks = JSON.parse(localStorage.getItem('artworks')) || []
      // Select table body and account info element
  const tableBody = document.querySelector('#mytable tbody')
  const accountInfo = document.querySelector("#account-info")
  
  accountInfo.innerHTML = accInfoToHTML(currentUser)

    // Redirect if the current user is not a seller
  if (currentUser.type !== 'seller') {
    alert('Access denied. You are not a seller.')
    window.location = 'main.html'
  }

  // Filter items sold by the current seller
  const sellerItemsSold = allItemsSold.filter(item => {
    const artwork = localArtworks.find(art => art.id === item.artworkID)
    return artwork && artwork.artist === currentUser.fullName
  })

   // Iterate over seller's sold items and display them in the table
  sellerItemsSold.forEach(itemSold => {
    const artwork = localArtworks.find(art => art.id === itemSold.artworkID)
    if (artwork) {
      const row = tableBody.insertRow()
      const titleCell = row.insertCell()
      const imgCell = row.insertCell()
      const priceCell = row.insertCell()
      const quantityCell = row.insertCell()
      const buyerCell = row.insertCell()

      const img = document.createElement('img')
      img.src = artwork.images.url
      img.alt = artwork.title
      img.width = 50
      img.height = 70

      imgCell.appendChild(img)
      // Populate cells with artwork details
      titleCell.textContent = artwork.title
      priceCell.textContent = artwork.price
      quantityCell.textContent = itemSold.quantity
      buyerCell.textContent = itemSold.username
    }
  })
})


const basketIcon = document.querySelector("#basket-icon")

basketIcon.addEventListener('click', () => {
  console.log("button pressed");
    // Retrieve logged-in user data from localStorage
    const loggedInUser = localStorage.getItem("user",)
    if (!loggedInUser || loggedInUser.type !== 'customer') {
        alert ("You must be logged in as a customer to access your basket")
        window.location.href = "login.html"
    } else {
        window.location.href = "basket.html"
    }
})

// Function to generate HTML for account information
function accInfoToHTML(artist){
  return `
  <p>Hello, ${artist.fullName}!</p>
  <img class = "img" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" width = "100" height = "100">
  <p class = "card-text">username: ${artist.username}</p>
  <p class = "card-text">Full Name: ${artist.fullName}</p>
  <p class = "card-text">Email: ${artist.email} </p>
  <p class = "card-text">Company Name: ${artist.companyName}</p>
  `

}

