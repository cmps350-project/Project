document.addEventListener("DOMContentLoaded", function() {
    const purchaseItemsContainer = document.querySelector(".purchase-items")
    let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || []
    let artworks = JSON.parse(localStorage.getItem('artworks')) || []

    purchaseHistory.forEach(function(item) {
        const artworkID = item.artworkID
        const quantity = item.quantity
        const artwork = artworks.find((artwork) => artwork.id === artworkID)

        if (artwork) {
            const purchaseItem = createPurchaseItem(artwork, quantity)
            purchaseItemsContainer.appendChild(purchaseItem)
        }
    })

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
