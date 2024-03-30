document.addEventListener("DOMContentLoaded", function() {
    const purchaseItemsContainer = document.querySelector(".purchase-items")
    const accountInfo = document.querySelector("#account-info")
    const user = JSON.parse(localStorage.getItem('user')) || {}
    const purchaseHistory = user.purchaseHistory || []
    const artworks = JSON.parse(localStorage.getItem('artworks')) || []

    purchaseHistory.forEach(function(purchase) {
        purchase.purchaseHistory.forEach(function(item) {
            const artworkID = item.artworkID
            const quantity = item.quantity
            const artwork = artworks.find((artwork) => artwork.id === artworkID)

            if (artwork) {
                const purchaseItem = createPurchaseItem(artwork, quantity)
                purchaseItemsContainer.appendChild(purchaseItem)
            }
        });
    });

    accountInfo.innerHTML = accInfoToHTML(user)

    function createPurchaseItem(artwork, quantity) {
        const purchaseItem = document.createElement('article')
        purchaseItem.classList.add('artwork-item', 'purchase-item')

        purchaseItem.innerHTML = `
            <img class="img" src="${artwork.images.url}" alt="${artwork.description}">
            <div class="artwork-details">
                <h3 class="title art-title">${artwork.title}</h3> 
                <p class="artist">By Artist: ${artwork.artist}</p>
                <p class="price">Price: $${(artwork.price * quantity).toFixed(2)}</p>
                <p class="category">Category: ${artwork.category}</p>
                <p class="quantity">Quantity: ${quantity}</p>
            </div>
        `

        return purchaseItem
    }
})
function accInfoToHTML(customer){
    return `
    <p>Hello, ${customer.name}!</p>
    <img class = "img" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" width = "100" height = "100">
    <p class = "card-text">username: ${customer.username}</p>
    <p class = "card-text">Full Name: ${customer.name + customer.username}</p>
    <p class = "card-text">Email: ${customer.email} </p>
    <p class = "card-text">Shipping Address: ${customer.shippingAddress}</p>
    <p class = "card-text">Available Credit: ${customer.moneyBalance}</p>
    `

  }

