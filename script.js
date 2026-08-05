let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* SAVE CART */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

/* CART COUNT */

function updateCartCount() {

    let count = 0;

    cart.forEach(item => {
        count += item.quantity || 1;
    });

    let cartCount = document.getElementById("cart-count");

    if(cartCount){
        cartCount.textContent = count;
    }
}

/* ADD TO CART */

function addToCart(name, price, image) {

    let existingItem = cart.find(item => item.name === name);

    if(existingItem){
        existingItem.quantity += 1;
    }
    else{
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    saveCart();

    alert(name + " added to cart!");
}

/* DISPLAY CART */

function displayCart() {

    let cartItems = document.getElementById("cart-items");

    if(!cartItems) return;

    let total = 0;

    cartItems.innerHTML = "";

    if(cart.length === 0){

        cartItems.innerHTML = `
            <p style="text-align:center;">
                Your cart is empty.
            </p>
        `;

        return;
    }

    cart.forEach((item,index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `
        <div class="cart-card">

            <img src="${item.image}" class="cart-image">

            <div class="cart-info">

                <h3>${item.name}</h3>

            <div class="qty-controls">

    <button onclick="changeQuantity(${index},-1)">
        -
    </button>

    <span>${item.quantity}</span>

    <button onclick="changeQuantity(${index},1)">
        +
    </button>

</div>

                <p>Rs. ${item.price * item.quantity}</p>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        </div>
        `
    });

    cartItems.innerHTML += `
        <h3 style="text-align:center; margin-top:20px;">
            Total: Rs. ${total}
        </h3>
    `;
}

/* REMOVE ITEM */

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    displayCart();
}

function changeQuantity(index, change){

    cart[index].quantity += change;

    if(cart[index].quantity <= 0){

        cart.splice(index,1);
    }

    saveCart();

    displayCart();
}

/* PRODUCT FILTER */

function filterProducts(category){

    let products =
    document.querySelectorAll(".product-card");

    products.forEach(product => {

        if(category === "all"){
            product.style.display = "block";
        }

        else if(product.classList.contains(category)){
            product.style.display = "block";
        }

        else{
            product.style.display = "none";
        }

    });
}

function searchProducts() {

    let input = document.getElementById("searchInput");

    if (!input) return;

    let value = input.value.toLowerCase().trim();

    let products = document.querySelectorAll(".product-card");

    let found = false;

    products.forEach(product => {

        let title = product.querySelector("h3").textContent.toLowerCase();

        let show = false;

        // Exact category search
        if (value === "ring" || value === "rings") {
            show = product.classList.contains("ring");
        }
        else if (value === "earring" || value === "earrings") {
            show = product.classList.contains("earring");
        }
        else if (value === "bracelet" || value === "bracelets") {
            show = product.classList.contains("bracelet");
        }
        else if (value === "necklace" || value === "necklaces") {
            show = product.classList.contains("necklace");
        }
        else {
            show = title.includes(value);
        }

        product.style.display = show ? "block" : "none";

        if (show) found = true;
    });

    // No Result Found message
    let noResult = document.getElementById("no-result");

    if (!noResult) {
        noResult = document.createElement("h3");
        noResult.id = "no-result";
        noResult.style.textAlign = "center";
        noResult.style.marginTop = "30px";
        noResult.style.color = "#8b5e3c";
        document.getElementById("product-grid").after(noResult);
    }

    noResult.textContent = found ? "" : "No Result Found";
}

/* IMAGE POPUP */

function openImage(src){

    let modal =
    document.getElementById("imageModal");

    let modalImg =
    document.getElementById("modalImg");

    if(modal && modalImg){

        modal.style.display = "flex";

        modalImg.src = src;
    }
}

function closeImage(){

    let modal =
    document.getElementById("imageModal");

    if(modal){
        modal.style.display = "none";
    }
}

/* INITIAL LOAD */

updateCartCount();
displayCart();

function openImage(src){
    document.getElementById("popupImage").src = src;
    document.getElementById("imagePopup").style.display = "flex";
}

function closeImage(){
    document.getElementById("imagePopup").style.display = "none";
}
