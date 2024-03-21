document.addEventListener("DOMContentLoaded", function() {
    const basketItems = document.querySelectorAll(".basket-item");

    basketItems.forEach(function(item) {
        const incrementBtn = item.querySelector(".increment-btn");
        const decrementBtn = item.querySelector(".decrement-btn");
        const quantityValue = item.querySelector(".quantity-value");
        const priceElement = item.querySelector(".price");
        const initialPrice = parseFloat(priceElement.textContent.replace('$', ''));

        incrementBtn.addEventListener("click", function() {
            let quantity = parseInt(quantityValue.textContent);
            quantity++;
            quantityValue.textContent = quantity;
            updatePrice(quantity, initialPrice, priceElement);
        });

        decrementBtn.addEventListener("click", function() {
            let quantity = parseInt(quantityValue.textContent);
            if (quantity > 1) {
                quantity--;
                quantityValue.textContent = quantity;
                updatePrice(quantity, initialPrice, priceElement);
            } else {
                item.remove();
            }
        });
    });
});

function updatePrice(quantity, initialPrice, priceElement) {
    const totalPrice = initialPrice * quantity;
    priceElement.textContent = '$' + totalPrice.toFixed(2);
}
