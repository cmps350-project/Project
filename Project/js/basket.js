document.addEventListener("DOMContentLoaded", function() {
    const basketItemsContainer = document.querySelector(".basket-items")
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []
    let artworks = JSON.parse(localStorage.getItem('artworks')) || []

    shoppingCart.forEach(function(item) {
        const artworkID = item.artworkID
        const quantity = item.quantity
        const artwork = artworks.find((artwork) => artwork.id === artworkID)

        if (artwork) {
            const artworkItem = createArtworkItem(artwork, quantity)
            basketItemsContainer.appendChild(artworkItem)
            const quantityValue = artworkItem.querySelector(".quantity-value")
            const priceElement = artworkItem.querySelector(".price")
            const initialPrice = parseFloat(artwork.price)
            handleQuantityChange(artworkItem, quantityValue, initialPrice, priceElement, artworkID)
        }
    })

    function createArtworkItem(artwork, quantity) {
        const artworkItem = document.createElement('article')
        artworkItem.classList.add('artwork-item', 'basket-item')

        artworkItem.innerHTML = `
            <img class="img" src="${artwork.images.url}" alt="${artwork.description}">
            <div class="artwork-details">
                <h3 class="title art-title">${artwork.title}</h3> 
                <p class="description">${artwork.description}</p>
                <p class="artist">By Artist: ${artwork.artist}</p>
                <p class="category">Category: ${artwork.category}</p>
                <p class="year">Year: ${artwork.year}</p>
                <p class="medium">Medium: ${artwork.medium}</p>
                <p class="price">Price: $${(artwork.price * quantity).toFixed(2)}</p>
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
                updateShoppingCart(artworkID, quantity)
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
                updateShoppingCart(artworkID, quantity)
            } else {
                item.remove()
                updateShoppingCart(artworkID, 0)
            }
        })
    }

    function updateShoppingCart(artworkID, quantity) {
        let found = false
        shoppingCart.forEach((item, index) => {
            if (item.artworkID === artworkID) {
                if (quantity > 0) {
                    shoppingCart[index].quantity = quantity
                } else {
                    shoppingCart.splice(index, 1)
                }
                found = true
            }
        })
        if (!found && quantity > 0) {
            shoppingCart.push({ artworkID: artworkID, quantity: quantity })
        }
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
    }
    const checkoutBtn = document.querySelector('.checkout-btn')
    checkoutBtn.addEventListener('click', function() {
        if (shoppingCart.length === 0) {
            alert('Your shopping cart is empty! Add some items to checkout')
            window.location.href = 'main.html'
        } else {
            window.location.href = 'checkout.html'
        }
    })
})
