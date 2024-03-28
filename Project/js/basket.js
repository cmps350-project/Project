
document.addEventListener("DOMContentLoaded", function() {
    const basketItemsContainer = document.querySelector(".basket-items")

    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []

    shoppingCart.forEach(function(artwork) {
        const artworkItem = document.createElement('article')
        artworkItem.classList.add('artwork-item', 'basket-item')

        artworkItem.innerHTML = `
            <img class="img" src="${artwork.images.url}" alt="${artwork.description}">
            <div class="artwork-details">
                <h3 class="title art-title">${artwork.title}</h3> 
                <p class="artist">${artwork.artist}</p>
                <p class="price">$${artwork.price}</p>
                <p class="category">${artwork.category}</p>
                <div class="quantity">
                    <button class="decrement-btn">-</button>
                    <span class="quantity-value">1</span>
                    <button class="increment-btn">+</button>
                </div>
            </div>
        `

        basketItemsContainer.appendChild(artworkItem)
    })

    const basketItems = document.querySelectorAll(".basket-item")

    basketItems.forEach(function(item) {
        const incrementBtn = item.querySelector(".increment-btn")
        const decrementBtn = item.querySelector(".decrement-btn")
        const quantityValue = item.querySelector(".quantity-value")
        const priceElement = item.querySelector(".price")
        const initialPrice = parseFloat(priceElement.textContent.replace('$', ''))

        incrementBtn.addEventListener("click", function() {
            let quantity = parseInt(quantityValue.textContent)
            quantity++
            quantityValue.textContent = quantity
            updatePrice(quantity, initialPrice, priceElement)
        })

        decrementBtn.addEventListener("click", function() {
            let quantity = parseInt(quantityValue.textContent)
            if (quantity > 1) {
                quantity--
                quantityValue.textContent = quantity;
                updatePrice(quantity, initialPrice, priceElement)
            } else {
                item.remove()
            }
        })
    })
})

function updatePrice(quantity, initialPrice, priceElement) {
    const totalPrice = initialPrice * quantity
    priceElement.textContent = '$' + totalPrice.toFixed(2)
}
