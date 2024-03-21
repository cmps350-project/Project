document.addEventListener("DOMContentLoaded", function() {
    const basketItems = document.querySelectorAll(".basket-item");

    basketItems.forEach(function(item) {
        const incrementBtn = item.querySelector(".increment-btn");
        const decrementBtn = item.querySelector(".decrement-btn");
        const quantityValue = item.querySelector(".quantity-value");

        incrementBtn.addEventListener("click", function() {
            let quantity = parseInt(quantityValue.textContent);
            quantity++;
            quantityValue.textContent = quantity;
        });

        decrementBtn.addEventListener("click", function() {
            let quantity = parseInt(quantityValue.textContent);
            if (quantity > 1) {
                quantity--;
                quantityValue.textContent = quantity;
            }
        });
    });
});
