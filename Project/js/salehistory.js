let currentUser = JSON.parse(localStorage.getItem("user"));
let localArtworkitems = JSON.parse(localStorage.getItem("artworks"));
let cart = JSON.parse(localStorage.getItem("shoppingCart"));
if (currentUser.type != "seller") {
  alert("access denied you are not seller");
  window.location = "main.html";
}

if (cart) {
  let table = document.getElementById("mytable");
  //get the shopping cart data and comparison with our product list and extract the items
  cart.forEach((element) => {
    let masterArt = localArtworkitems.find(
      (a) => a.id == element.artworkID
    );
    console.log(masterArt); // after fetching data implement it in table
    let tr = document.createElement("tr");
    let img = document.createElement("img");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    td1.textContent = masterArt?.title;
    img.src = masterArt?.images?.url;
    img.style.width = "50px";
    img.style.height = "70px";
    td2.appendChild(img);
    td3.textContent = masterArt?.price;
    td4.textContent = element.quantity;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    table.appendChild(tr);
  });
}




// const basketIcon = document.querySelector("#basket-icon")

// basketIcon.addEventListener('click', () => {
//   console.log("button pressed");
//     const loggedInUser = localStorage.getItem("user",)
//     if (!loggedInUser || loggedInUser.type !== 'customer') {
//         alert ("You must be logged in as a customer to access your basket")
//         window.location.href = "login.html"
//     } else {
//         window.location.href = "basket.html"
//     }
// })