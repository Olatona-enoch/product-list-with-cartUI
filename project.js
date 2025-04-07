const cart = []; // Array to store cart items
const cartList = document.getElementById("cart-items");
const btns = document.querySelectorAll(".btn");
const bottomCard = document.getElementById ("bottomCard");
const modal_ul = document.getElementById("modal-ul");
let cartcounter = document.getElementById("cartcounter");


btns.forEach((btn) => {
    btn.addEventListener("click", function () {
        // Get product details from the button's data attributes
        const itemName = btn.getAttribute("data-name");
        const itemVariation = btn.getAttribute("data-variation");
        const itemPrice = parseFloat(btn.getAttribute("data-price")) ;
        const itemImage = btn.getAttribute("data-image");

        //to check if item is already in the cart
        let newItem = cart.find(item => item.name === itemName && item.variation === itemVariation );
        // if item is already there add 1 to quantity if not make new item
        if (newItem) {
            newItem.quantity += 1;
        } else {
            newItem = { name: itemName, price: itemPrice, image: itemImage, variation: itemVariation, quantity: 1 };
            cart.push(newItem);
        }

        // Add item to cart
        updateBtn(btn, newItem);
        updateCart();c
    });
});

//to change button to - and + 
function updateBtn(btn, item) {
    btn.classList.remove("custom-btn");
    btn.classList.add("clicked-btn");
    btn.innerHTML = `
        <i class="bi bi-dash-circle fs-5 minus-btn" data-name="${item.name}" data-variation="${item.variation}"></i>
        ${item.quantity}
        <i class="bi bi-plus-circle fs-5 plus-btn" data-name="${item.name}" data-variation="${item.variation}"></i>
    `;
    // Add event listeners for plus and minus buttons
    btn.querySelector(".plus-btn").addEventListener("click", function (event) {
        event.stopPropagation();
        updateQuantity(item.name, item.variation, 1, btn);
    });

    btn.querySelector(".minus-btn").addEventListener("click", function (event) {
        event.stopPropagation();
        updateQuantity(item.name, item.variation, -1, btn);
    });
}

function updateQuantity(itemName, itemVariation, newQuantity, btn) {
    const item = cart.find(item => item.name === itemName && item.variation === itemVariation);

    if (!item) return;

    item.quantity += newQuantity;

    // Remove item if quantity is 0
    if (item.quantity <= 0) {
        cart.splice(cart.indexOf(item), 1);
        btn.classList.remove("clicked-btn");
        btn.classList.add("custom-btn");
        btn.innerHTML = `
            <i class="bi bi-cart-plus custom-lightbrown fs-5"></i> 
            &nbsp; Add to Cart
        `;
    } else {
        updateBtn(btn, item);
    }

    updateCart();
}


function resetButton(btn) {
    btn.classList.remove("clicked-btn");
    btn.classList.add("custom-btn");
    btn.innerHTML = `
        <i class="bi bi-cart-plus custom-lightbrown fs-5"></i> 
        &nbsp; Add to Cart
    `;
}


// Function to update cart display
function updateCart() {
        // declare the cart counter variable
    
    // declare the total price variable
    let totalPrice = document.getElementById("totalPrice");
    cartList.innerHTML = ""; // Clear current list
    // inittialize variables to zero
    let totalQuantity = 0;
    let totalpriceValue = 0;
    if (cart.length === 0) {
        cartList.innerHTML = `
            <div class="text-center">
                <img src="assets/images/illustration-empty-cart.svg" alt=""  class="w-25"> 
                <p class="custom-darkbrown my-4"> Your added items will appear here</p>             
            </div>
        `;
        bottomCard.innerHTML = "";
    }
    cart.forEach((item, index) => {
        totalQuantity += item.quantity;
        totalpriceValue += (item.price * item.quantity);

        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "align-items-center", "justify-content-between");
        li.innerHTML = `
            <div> 
                <p class="fw-medium custom-black mb-0"> ${item.variation}</p>
                <p class="item-details">
                    <span class="custom-lightbrown fw-semibold">${item.quantity}x</span> 
                    &nbsp; &nbsp; <span>@$${item.price.toFixed(2)}</span> 
                    &nbsp; &nbsp;<span class="custom-darkbrown fw-medium">$${(item.price * item.quantity).toFixed(2)}</span> 
                </p>           
            </div>
            <i class="bi bi-x-circle custom-darkbrown fs-5 mb-3 remove-item" data-index="${index}"></i>
        `;
       
        cartList.appendChild(li);
    });
        
        if (cart.length > 0) {
            bottomCard.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                <p class="text-black">Order total</p>
                <p class="fw-bold text-black fs-3" id="totalPrice">$${totalpriceValue.toFixed(2)} </p>
                </div>
                <div class=" d-flex align-items-center justify-content-center rounded" style="background-color: var(--Rose-100);">
                    <p class="pt-3"> <img src="assets/images/icon-carbon-neutral.svg" alt=""> This is a <span class="fw-semibold">carbon-neutral</span> delivery</p>
                </div>
               
                <button class="w-100 mt-4 custom-orderBtn " data-bs-toggle="modal" data-bs-target="#staticBackdrop">Confirm Order </button>
            `;
        }
        cartcounter.innerHTML =`Your Cart(${totalQuantity})`;
    
    
    
    //for remove btn to remove items for the cart
    document.querySelectorAll(".remove-item").forEach((removeBtn) => {
        removeBtn.addEventListener("click", function () {
            const itemIndex = this.getAttribute("data-index");
            const removedItem = cart[itemIndex];
            cart.splice(itemIndex, 1);
           
            //turn btns into a nodelist to find the exact btn
            const itemButton = [...btns].find(btn =>
                btn.getAttribute("data-name") === removedItem.name &&
                btn.getAttribute("data-variation") === removedItem.variation
            );
            if (itemButton) {
                resetButton(itemButton);
            }

            updateCart();
        });
    });

    orderConfirmed();

}


function orderConfirmed() {

    modal_ul.innerHTML = "";
    let totalpriceValue = 0
    cart.forEach(item =>{
        totalpriceValue += item.price * item.quantity;

        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex",  "align-items-center", "justify-content-between",  "mb-0", "custom-modal-li");
        li.innerHTML = `
            <div class="d-flex align-items-center ">
            <img src="${item.image}" alt="" class="thumbnail me-3 rounded">
            <div class="">
                <p class="fw-medium custom-black mb-2 d-none d-sm-block">${item.variation}</p>
                <p class="fw-medium custom-black mb-2 d-block d-sm-none  text-truncate " style="max-width: 120px;">${item.variation}</p>
                <p class="item-details mb-0"> <span class="custom-lightbrown"> ${item.quantity}x</span>  &nbsp; <span>@$${item.price}</span> </p>
            </div>  
            </div>
            <div class="text-center ms-5 custom-black fw-semibold"> 
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            </div>   

        `;
        modal_ul.appendChild(li);
    });

    const finalPrice = document.getElementById("finalPrice");
    finalPrice.innerHTML = `$${totalpriceValue.toFixed(2)}`;

}
function clearCart() {
    cart.length = 0;
    cartList.innerHTML = `
        <div class="text-center">
            <img src="assets/images/illustration-empty-cart.svg" alt=""  class="w-25"> 
            <p class="custom-darkbrown my-4"> Your added items will appear here</p>             
        </div>
    `;
    bottomCard.innerHTML = "";
    btns.forEach(resetButton);
    updateCart();


}
{/* <li class="list-group-item">
<div> 
  <p class="fw-medium item-variation"> Classic Tiramisu</p>
  <p class="item-name"><span class="custom-lightbrown fw-semibold">1x</span> &nbsp; &nbsp; <span>@$5.50</span> &nbsp; &nbsp;<span class="custom-darkbrown fw-medium">$5.50</span> </p>
</div>
</li> */}
