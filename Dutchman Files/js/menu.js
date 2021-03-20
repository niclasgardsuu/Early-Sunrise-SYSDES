/**
 * This function will create the view for the products that are low in stock
 * @returns {HTMLElement} a div
*/
function createLowestInStockView() {
    var lowest = theLowestInStock(5);
    var lowestContainer = document.createElement("div");
    lowestContainer.className = "lowest-in-stock-container";
    var h1 = document.createElement("h1");
    h1.id = "product-low-in-stock";
    lowestContainer.appendChild(h1);
    for (i in lowest) {
        lowestContainer.appendChild(createLowestInStockDiv(lowest[i].name, lowest[i].stock));
    }
    return lowestContainer;
}

/** 
 * Updates the shopping cart view to display the current state of the shopping cart
*/
function updateShoppingCartView() {
    var shoppingBottom = document.getElementById("shopping-cart-container-bottom");
    shoppingBottom.textContent = "";

    for(var i = 0; i < OrderDB.cart.productId.length; i++) {
        var id = OrderDB.cart.productId[i];
        var productDiv = createShoppingCartDiv(id ,OrderDB.cart.productAmount[i]);
        shoppingBottom.appendChild(productDiv);
        var removeButton = document.getElementById(id+"-cart-button");  

        var temp = {
                execute: removeFromCart.bind(null, id, 1),
                unexecute : addToCart.bind(null, id, 1)
            }

        removeButton.addEventListener("click", doit.bind(null, temp));  
    }

    if (OrderDB.cart.productId.length == 0) {
        shoppingBottom.insertAdjacentHTML("beforeend",
                    `<div id="shopping-cart-container-msg" class="shopping-cart-div">
                        <span id="shopping-cart-drop-here">${getString("shopping-cart-drop-here")}</span>
                    </div>`);
    }
}

/** 
 * Will display a big window containing information about a product
 * @param {number} id the id of the product
 * @param {string} category the category which the product belongs to
*/
function showProductInfo(id, category) {
    var product = findProductByID(id);
    document.getElementById("product-info-hide").checked = true;

    var productContainer = document.getElementById("product-info-container-id");

    var origin = product.origincountry;
    if (product.origin != "") { 
        origin += ", " + product.origin;
    }

    var allergens = getAllergens(id);
    //check if there are no allergens for the product
    if (allergens == null) {
        allergens = "inga";
    } 

    productContainer.innerHTML = "";    
    productContainer.innerHTML = createShowProductBaseView(product);

    var containerRight = document.getElementById("product-info-container-right");

    if(modelData["credentials"] == 0) {
        containerRight.innerHTML = createProductInfoView(product, origin, allergens, category) + createStaffInfoView(product);

        document.getElementById("product-manager-stock").addEventListener("change", changeStock.bind(null, id, null));

        var refill = document.getElementById("product-manager-refill");
        refill.addEventListener("click", changeStock.bind(null, id, 24));
        refill.addEventListener("click", function () {
            document.getElementById("product-manager-stock").value = parseInt(document.getElementById("product-manager-stock").value) + 24;
        });
        document.getElementById("product-manager-remove-product").addEventListener("click", removeProductFromMeny);
        document.getElementById("product-manager-price-i").addEventListener("change", changePrice.bind(null, product.articleid, category));
    } else {
        containerRight.innerHTML = createProductInfoView(product, origin, allergens, category);
    }

    var temp = {
                execute : addToCart.bind(null, id, 1),
                unexecute: removeFromCart.bind(null, id, 1)
            }
    
    document.getElementById("product-buy-id").addEventListener("click", doit.bind(null, temp));
    updateView();
}


