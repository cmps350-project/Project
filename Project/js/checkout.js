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
        localStorage.setItem('shippingAddress', shippingAddressInput.value)
        localStorage.setItem('cardNumber', cardNumberInput.value)
        localStorage.setItem('expiryDate', expiryDateInput.value)
        localStorage.setItem('cvv', cvvInput.value)
        alert('Your order has been accepted! Thank you for shopping with us.')
        window.location.href = 'main.html'
    })
})
