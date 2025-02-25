const cart = []; // Array to store cart items
const cartList = document.getElementById("cart-items");
const btns = document.querySelectorAll(".btn");

btns.forEach((btn) => {
    btn.addEventListener("click", function () {
        // Get product details from the button's data attributes
        const itemName = btn.getAttribute("data-name");
        const itemVariation = btn.getAttribute("data-variation");
        const itemPrice = btn.getAttribute("data-price");
        const itemImage = btn.getAttribute("data-image");

        // Add item to cart
        const newItem = { name: itemName, price: itemPrice, image: itemImage, variation: itemVariation };
        cart.push(newItem);
        btn.classList.remove("custom-btn");
        btn.classList.add("clicked-btn");
        btn.innerHTML = `<i class="bi bi-dash-circle fs-5"></i> 1 <i class="bi bi-plus-circle fs-5"></i>`

        updateCart();
    });
});

// Function to update cart display
function updateCart() {
    cartList.innerHTML = ""; // Clear current list
    cart.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "align-items-center", "justify-content-between");
        li.innerHTML = `
            <div> 
                <p class="fw-medium custom-black mb-0"> ${item.variation}</p>
                <p class="item-name"><span class="custom-lightbrown fw-semibold">1x</span> &nbsp; &nbsp; <span>@$${item.price}</span> &nbsp; &nbsp;<span class="custom-darkbrown fw-medium">$5.50</span> </p>
            </div>
            <i class="bi bi-x-circle custom-darkbrown fs-5 mb-3 "></i>
        `;
        cartList.appendChild(li);
    });
}
{/* <li class="list-group-item">
<div> 
  <p class="fw-medium item-variation"> Classic Tiramisu</p>
  <p class="item-name"><span class="custom-lightbrown fw-semibold">1x</span> &nbsp; &nbsp; <span>@$5.50</span> &nbsp; &nbsp;<span class="custom-darkbrown fw-medium">$5.50</span> </p>
</div>
</li> */}
