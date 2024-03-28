document.addEventListener("DOMContentLoaded", function() {
    const basketItemsContainer = document.querySelector(".basket-items")

    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []
    let artworks = JSON.parse(localStorage.getItem('artworks')) || []

    shoppingCart.forEach(function(artworkID) {
        const quantity = 1
        const artworkItem = createArtworkItem(artworkID, quantity)
        basketItemsContainer.appendChild(artworkItem)
        const quantityValue = artworkItem.querySelector(".quantity-value")
        const priceElement = artworkItem.querySelector(".price")
        const initialPrice = parseFloat(priceElement.textContent.replace('$', ''))
        handleQuantityChange(artworkItem, quantityValue, initialPrice, priceElement, artworkID)
    })

    function createArtworkItem(artworkID) {
        const artwork = artworks.find((artwork) => artwork.id === artworkID)
        const quantity = shoppingCart.filter((id) => id === artworkID).length
        const artworkItem = document.createElement('article')
        artworkItem.classList.add('artwork-item', 'basket-item')
    
        artworkItem.innerHTML = `
            <img class="img" src="${artwork.images.url}" alt="${artwork.description}">
            <div class="artwork-details">
                <h3 class="title art-title">${artwork.title}</h3> 
                <p class="artist">${artwork.artist}</p>
                <p class="price">$${(artwork.price * quantity).toFixed(2)}</p>
                <p class="category">${artwork.category}</p>
                <div class="quantity">
                    <button class="decrement-btn">-</button>
                    <span class="quantity-value">${quantity}</span>
                    <button class="increment-btn">+</button>
                </div>
            </div>
        `
    
        return artworkItem
    }
    
    function updatePrice(quantity, initialPrice, priceElement) {
        const totalPrice = initialPrice * quantity
        priceElement.textContent = '$' + totalPrice.toFixed(2)
    }

    function handleQuantityChange(item, quantityValue, initialPrice, priceElement, artworkID) {
        const incrementBtn = item.querySelector(".increment-btn")
        const decrementBtn = item.querySelector(".decrement-btn")

        incrementBtn.addEventListener("click", function() {
            let quantity = parseInt(quantityValue.textContent)
            let artwork = artworks.find((artwork) => artwork.id === artworkID)
            if (artwork && quantity < artwork.quantity) {
                quantity++
                quantityValue.textContent = quantity
                updatePrice(quantity, initialPrice, priceElement)
            } else {
                alert("Quantity cannot exceed available quantity.")
            }
        })

        decrementBtn.addEventListener("click", function() {
            let quantity = parseInt(quantityValue.textContent)
            if (quantity > 1) {
                quantity--
                quantityValue.textContent = quantity
                updatePrice(quantity, initialPrice, priceElement)
            } else {
                item.remove()
                shoppingCart = shoppingCart.filter((id) => id !== artworkID)
                
            }
        })
    } //need to fix quantity in local storage too

    // Add checkout functionality here
})
