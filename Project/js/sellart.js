let currentUser = JSON.parse(localStorage.getItem("user"));
let localArtworkitems = JSON.parse(localStorage.getItem("artworks"));
let cart = JSON.parse(localStorage.getItem("artworks"));
console.log(currentUser);
function handleSubmit() {
 event.preventDefault();
    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value.trim();
    const year = document.getElementById("artpiece-year").value.trim();
    const price = document.getElementById("artpiece-price").value.trim();
    const quantity = document
          .getElementById("artpiece-quantity")
          .value.trim();
    const images = document.getElementById("artpiece-image").value.trim();
    const description = document.getElementById("description").value.trim();
    const artist = document.getElementById("artist").value.trim();

        if (
          title === "" ||
          category === "" ||
          year === "" ||
          price === "" ||
          quantity === "" ||
        
          description === "" ||
          artist === ""
        ) {
          alert("Please fill out all fields.");
        } else {
          const masterPiece = {
            id: localArtworkitems.length + 1,
            title,
            category,
            year,
            price,
            quantity,
           // images: { url: images, alternate: title },
            description,
            artist,
            sellerId: currentUser.id,
          };
          //check rather this user is seller or not. other type of user is not allow
          if (currentUser.type == "seller") {
            //check if product with same name exist, if yes than only update the quantity
            let index = localArtworkitems.findIndex(
              (item) =>
                item.title.toLowerCase() == masterPiece.title.toLowerCase()
            );
            if (index >= 0) {
              localArtworkitems[index].quantity = masterPiece.quantity;
              localStorage.setItem(
                "artworks",
                JSON.stringify(localArtworkitems)
              );
            } else {
              localArtworkitems.push(masterPiece);
              localStorage.setItem(
                "artworks",
                JSON.stringify(localArtworkitems)
              );
            }
            console.log(localArtworkitems);
            alert("Your new masterpiece has been added successfully :)!");
            window.location = "salehistory.html";
          } else {
            alert("Sorry you are not a Seller :)!");
          }
        }
      }