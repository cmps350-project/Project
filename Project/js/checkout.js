
document.addEventListener('DOMContentLoaded', function() {
    const shippingAddressInput = document.querySelector('#shipping-address')
    const cardNumberInput = document.querySelector('#card-number')
    const expiryDateInput = document.querySelector('#expiry-date')
    const cvvInput = document.querySelector('#cvv')
    const checkoutForm = document.querySelector('#checkout-form')

    const currentUser = JSON.parse(localStorage.getItem('user')) || {}
    const savedShippingAddress = currentUser.shippingAddress || ''
    const savedCardNumber = currentUser.purchaseHistory && currentUser.purchaseHistory.length > 0
    ? currentUser.purchaseHistory[0].cardNumber
    : ''
    const savedExpiryDate = currentUser.purchaseHistory && currentUser.purchaseHistory.length > 0
    ? currentUser.purchaseHistory[0].expiryDate
    : ''
    const savedCvv = currentUser.purchaseHistory && currentUser.purchaseHistory.length > 0
    ? currentUser.purchaseHistory[0].cvv
    : ''

    if (savedShippingAddress) {
        shippingAddressInput.value = savedShippingAddress
    }
    if (savedCardNumber) {
        cardNumberInput.value = savedCardNumber
    }
    if (savedExpiryDate) {
        expiryDateInput.value = savedExpiryDate
    }
    if (savedCvv) {
        cvvInput.value = savedCvv
    }

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault()

        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []
        const artworks = JSON.parse(localStorage.getItem('artworks')) || []
        const user = JSON.parse(localStorage.getItem('user')) || {}

        const totalPrice = shoppingCart.reduce((total, item) => {
            const artwork = artworks.find(artwork => artwork.id === item.artworkID)
            return total + artwork.price * item.quantity
        }, 0);

        if (totalPrice > user.moneyBalance) {
            alert('Your order total exceeds your current balance. Please remove items from your cart or add funds to your account.')
            return;
        }

        shoppingCart.forEach(item => {
            const artwork = artworks.find(artwork => artwork.id === item.artworkID)
            if (artwork) {
                artwork.quantity -= item.quantity 
            }
        })
        localStorage.setItem('artworks', JSON.stringify(artworks))

        user.moneyBalance -= totalPrice

        localStorage.setItem('user', JSON.stringify(user))

        const purchaseDetails = {
            shippingAddress: shippingAddressInput.value,
            cardNumber: cardNumberInput.value,
            expiryDate: expiryDateInput.value,
            cvv: cvvInput.value,
            purchaseHistory: shoppingCart
        };

        if (user.purchaseHistory) {
            user.purchaseHistory.push(purchaseDetails)
        } else {
            user.purchaseHistory = [purchaseDetails]
        }

        localStorage.setItem('user', JSON.stringify(user))

        const allItemsSold = JSON.parse(localStorage.getItem('allItemsSold')) || []
        shoppingCart.forEach(item => {
            allItemsSold.push({
                username: user.username,
                artworkID: item.artworkID,
                quantity: item.quantity
            })
        })
        localStorage.setItem('allItemsSold', JSON.stringify(allItemsSold))
        localStorage.removeItem('shoppingCart')

        alert('Your order has been accepted! Thank you for shopping with us.')
        window.location.href = 'main.html'
    })
})
