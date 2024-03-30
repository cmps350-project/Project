const priceInput = document.getElementById('artpiece-price');
const quantityInput =  document.getElementById('artpiece-quantity');

//price validation
priceInput.addEventListener('input', function(event) {
   
    const inputValue = event.target.value;

    if (inputValue < 0 ) {
        alert("Please enter a valid number for Price.");
        event.target.value = '';
    }
}); 

//quanitity validation 
quantityInput.addEventListener('input', function(event) {
   
    const inputValue = event.target.value;

    if (inputValue < 0) {
        alert("Please enter a valid number for Quantity.");
        event.target.value = '';
    }
});

function handleSubmit() {
    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value.trim();
    const year = document.getElementById('artpiece-year').value.trim();
    const price = document.getElementById('artpiece-price').value.trim();
    const quantity = document.getElementById('artpiece-quantity').value.trim();
   // const image = document.getElementById('artpiece-image').value.trim();
    const description = document.getElementById('description').value.trim();

    //|| image === ''
    if (title === '' || category === '' || year === '' || price === '' || quantity === ''  || description === '') {
        alert('Please fill out all fields.');
    } else {
        alert('Your new masterpiece has been added successfully :)!');
    }
}