const shippingAddressInput = document.querySelector('#shipping-address')
const cardNumberInput = document.querySelector('#card-number')
const expiryDateInput = document.querySelector('#expiry-date')
const cvvInput = document.querySelector('#cvv')
const checkoutForm = document.querySelector('#checkout-form')

document.addEventListener('DOMContentLoaded', function() {
    const savedShippingAddress = localStorage.getItem('shippingAddress')
    const savedCardNumber = localStorage.getItem('cardNumber')
    const savedExpiryDate = localStorage.getItem('expiryDate')
    const savedCvv = localStorage.getItem('cvv')
    const checkoutForm = document.querySelector('#checkout-form')

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
        console.log("button pressed")
        event.preventDefault()

        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []
        const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || []
        const artworks = JSON.parse(localStorage.getItem('artworks')) || []
        
        const totalPrice = shoppingCart.reduce((total, item) => {
            const artwork = artworks.find(artwork => artwork.id === item.artworkID)
            return total + artwork.price * item.quantity
        }, 0)

        const user = JSON.parse(localStorage.getItem('user'))

        if (totalPrice > user.moneyBalance) {
            alert('Your order total exceeds your current balance. Please remove items from your cart or add funds to your account.')
            return
        }

        localStorage.setItem('shippingAddress', shippingAddressInput.value)
        localStorage.setItem('cardNumber', cardNumberInput.value)
        localStorage.setItem('expiryDate', expiryDateInput.value)
        localStorage.setItem('cvv', cvvInput.value)

        purchaseHistory.push(...shoppingCart)
        localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory))

        localStorage.removeItem('shoppingCart')

        alert('Your order has been accepted! Thank you for shopping with us.')

        window.location.href = 'main.html'
    })
})

