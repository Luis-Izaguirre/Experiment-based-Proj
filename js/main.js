// Cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Open Cart, adds active to dom in css file
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};


// Cart Working JS, checks if web browser document is loading and applies 'ready' function
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}else{
   ready(); 
}

// Making Function, iterates through class 'cart-remove' and event listens if on click, then calls function
function ready() {
    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    //Quantity Changes,
    //Loops through and checks all "cart-quantity" for an event
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Add To Cart
    //Loops through "add-cart" and listens for the click event
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
}

// Remove Items From Cart
//removes the parent element in other words removes the item
//Then it updates the total by calling function
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
// Quantity Changes
//checks if the input for quantity has not changed and if value is 0 or less,
//If it's not then it will update the quantity by calling function
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}

// Add To Cart
// grabs the events from the web doc and retrieves data if clicked on
//specifically the title, price, and productImg update and are printed to console
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

//FIX ME
function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
        alert('You have already add this item to cart');
        return;
        }
    }

var cartBoxContent = `
                    <img src="img/product2.jpg" alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">Earbuds</div>
                        <div class="cart-price">$25</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <!-- Remove Cart -->
                    <i class='bx bxs-trash-alt cart-remove'></i>`;
                    
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

}// End addProductToCart Function

// Update Total, from parent element get children class and get individual "cartBox" classes
//Loop iterates through individual "cartBox", gets it's price, quantity, and removes "$"
// Does simple math and adds the total to document

function updateTotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace('$', ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);

        document.getElementsByClassName("total-price")[0].innerText = '$' + total;
    }
}