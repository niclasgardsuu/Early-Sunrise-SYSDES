dict = {
        "mainCategory": ["beer","spirits","wine","non-alcoholic"],

        "sv": {
            "beer":"öl",
            "spirits":"sprit",
            "wine":"vin",
            "non-alcoholic":"alkoholfritt"
        },
        "en": {
            "beer": "beer",
            "spirits": "spirits",
            "wine": "wine",
            "non-alcoholic":"non-alcoholic"
        }
    };

function updateShoppingCartView() {
    //genererar htmlkod för shoppingcart, och rensar det som stod innan
    var shoppingCartWindow = document.getElementById("shopping-cart-window");
    shoppingCartWindow.insertAdjacentHTML('afterbegin',
    `
    <div id="shopping-cart-options>
        <button id="checkout-order">
            KÖP
        </div>
        <button id="cancel-order">
            KÖP INTE
        </div>
        <span id="total-price">
            1337:-
        </span>
    </div>
    `)
    shoppingCartWindow.textContent = "";
    for(var i = 1; i < cart.length; i++) {
        var productDiv = createShoppingCartDiv(cart[i].id,cart[i].count);
        shoppingCartWindow.appendChild(productDiv);
        var removeButton = document.getElementById(cart[i].id+"-cart-button");  
        removeButton.addEventListener("click", removeFromShoppingCart.bind(null,cart[i].id));  
    }
}

function createShoppingCartDiv(id,count) {
    var div = document.createElement("div");
    div.className = "shopping-cart-div";
    div.id = id+"-cart";
    var name = findProductByID(id).name;
    div.insertAdjacentHTML('beforeend',
    `
    <div class="shopping-cart-div-left">
        `+name+`
    </div>
    <div class="shopping-cart-div-center">
        `+count+`
    </div>
    <div class="shopping-cart-div-right" id="`+id+`-cart-button">

    </div>
    `
    );
    return div;
}

function addToShoppingCart(product_id) {
    for(product in cart) {
        if(cart[product].id == product_id) {
            cart[product].count = cart[product].count + 1;
            updateShoppingCartView();
            return;
        }
    }
    var product = {
        "id":product_id,
        "count": 1
    };
    cart.push(product);
    
    updateShoppingCartView();
}

function removeFromShoppingCart(product_id) {
    for(product in cart) {
        if(cart[product].id == product_id && cart[product].count > 1) {
            cart[product].count = cart[product].count - 1;
            updateShoppingCartView();
            return;
        }
    }
    const index = indexOfCartProduct(cart,product_id);
    console.log(index);
    if (index > -1) {
      cart.splice(index, 1);
    }
    updateShoppingCartView();
    
} 

function indexOfCartProduct(cart,id) {
    for(var i = 0; i < cart.length; i++) {
        console.log("Cart ID: "+cart[i].id + " Product ID: "+id);
        if(cart[i].id == id) return i;
    }
    return -1;
}

function findProductByID(id) {
    for (var i = 0; i < dict.mainCategory.length; i++) {
        for (var j = 0; j < drunk[dict.mainCategory[i]].length; j++) {
            if (drunk[dict.mainCategory[i]][j].articleid == id) {
                return drunk[dict.mainCategory[i]][j];
            }
        }
    }
    return null;
}

function getAllergens(id) {
    for (var i = 0; i < allergensDB.products.length; i++) {
        if (allergensDB.products[i].articleid == id) {
            return allergensDB.products[i].allergens;
        }
    }
    return null;
}

function showProductInfo(id) {
    var product = findProductByID(id);
    document.getElementById("product-info-hide").checked = true;
    document.getElementById("product-info-img").setAttribute("src", product.img);
    document.getElementById("product-info-name").innerText = product.name;
    document.getElementById("product-info-name2").innerText = product.name2;
    document.getElementById("product-info-desc").innerText = product.serves + " " + product.volume + " ml";
    document.getElementById("product-info-price").innerText = product.pricewithvat + " kr";
    document.getElementById("product-info-alcohol").innerText = product.alcoholcontent;
    document.getElementById("product-info-type").innerText = product.productgroup;
    document.getElementById("product-info-producent").innerText = product.producent;

    var origin = document.getElementById("product-info-origin");
    origin.innerText = product.origincountry;
    //add extra origin information if it exist
    if (product.origin !== "") origin.innerText += ", " + product.origin;

    var allergens = getAllergens(id);
    //check if there are no allergens for the product
    if (allergens == null) {
        document.getElementById("product-info-allergens").innerText = "inga";
    } else {
        document.getElementById("product-info-allergens").innerText = allergens;
    }
    
}


function updateProductInfoView() {

}

//Create all products in the database and print them out
function createAllProducts() {
    for (var i = 0; i < dict.mainCategory.length; i++) {
        createProductsByCategory(dict.mainCategory[i]);
    }
}

//Create all products within a category and print them out
function createProductsByCategory(category) {
    var bevType = drunk[category];
    var productWindow = document.getElementById("product-window");
    for (var i = 0; i < bevType.length; i++) {
        productWindow.appendChild(createProductContainer(bevType[i].name, bevType[i].pricewithvat, bevType[i].img, bevType[i].articleid));
    }
}

//Create all products within a category that has been filtered and print them out
function createProductsByFilter(filterId, category) {
    var noFilter = true;
    document.getElementById("product-window").textContent = "";
    for (var i = 0; i < filterId.length; i++) {
        //check if the filter is checked
        if (document.getElementById(filterId[i]).checked) {
            noFilter = false;
            var productgroup = filterId[i].replace(/\-/g, ' ');
            var bevType = drunk[category];
            var productWindow = document.getElementById("product-window");
            for (var j = 0; j < bevType.length; j++) {
                //Print only out the products that has the same productgroup
                if (bevType[j].productgroup == productgroup) {
                    productWindow.appendChild(createProductContainer(bevType[j].name, bevType[j].pricewithvat, bevType[j].img, bevType[j].articleid));
                }
            }
        }
    }

    //if no filter is checked we print out all the products in the category
    if (noFilter) {
        createProductsByCategory(category);
    }
}

function updateViewMain(category) {
    document.getElementById("filter-window").textContent = "";
    createFilter(category);
    document.getElementById("product-window").textContent = "";
    createProductsByCategory(category);
}


function createProductContainer(name, price, imgSrc, id) {
    /*
    <div class="product-container-top">
        <div class="product-container-top-top">
            <span class="product-name">Norrlands Guld</span>
        </div>
        <div class="product-container-top-bottom">
            <img src="./img/beer.svg" alt="">
        </div>
    </div>
    */

    var productName = document.createElement("span");
    var productContainerTopTop = document.createElement("div");
    productName.className = "product-name product-name-font";
    productContainerTopTop.className = "product-container-top-top";
    productName.appendChild(document.createTextNode(name));
    productContainerTopTop.appendChild(productName);

    var img = document.createElement("img");
    img.setAttribute("src",imgSrc);
    img.className = "product-img";
    var productContainerTopBottom = document.createElement("div");
    productContainerTopBottom.className = "product-container-top-bottom";
    productContainerTopBottom.appendChild(img);

    var productContainerTop = document.createElement("div");
    productContainerTop.className = "product-container-top";
    productContainerTop.addEventListener("click", showProductInfo.bind(null, id));
    productContainerTop.appendChild(productContainerTopTop);
    productContainerTop.appendChild(productContainerTopBottom);

    /*
    <div class="product-container-bottom">
        <div class="product-container-bottom-left">
            <span class="product-price">
                7:90
            </span>
        </div>
        <div class="product-container-bottom-right">
            <button class="product-buy">Köp</button>
        </div>
    </div>
    */

    var productBuy = document.createElement("button");
    productBuy.className = "product-buy";
    productBuy.appendChild(document.createTextNode("Lägg i kundvagnen"));

    var productPrice = document.createElement("span");
    productPrice.className = "product-price-font";
    productPrice.appendChild(document.createTextNode(price+" kr"));
    
    var productContainerBottomLeft = document.createElement("div");
    var productContainerBottomRight = document.createElement("div");
    productContainerBottomLeft.className = "product-container-bottom-left";
    productContainerBottomLeft.appendChild(productPrice);
    productContainerBottomRight.className = "product-container-bottom-right";
    productContainerBottomRight.appendChild(productBuy);

    var productContainerBottom = document.createElement("div");
    productContainerBottom.className = "product-container-bottom";
    productContainerBottom.appendChild(productContainerBottomLeft);
    productContainerBottom.appendChild(productContainerBottomRight);

    var productContainer = document.createElement("div");
    productContainer.className = "product-container";
    productContainer.appendChild(productContainerTop);
    productContainer.appendChild(productContainerBottom);
    productContainer.draggable = "true";
    productContainer.addEventListener("dragstart", dragstartHandler);
    productContainer.id = id;

    return productContainer;
} 

function getFilter(category) {
    var filter = [];
    for (var i = 0; i < drunk[category].length; i++) {
        if (!filter.includes(drunk[category][i].productgroup)) {
            filter.push(drunk[category][i].productgroup);
        }
    }
    return filter;
}

function createFilter(category) {
    var filter = getFilter(category);
    var filterId = [];
    //Need to remove spaces and replace with dash for id
    for (var i = 0; i < filter.length; i++) {
        filterId[i] = filter[i].replace(/\s+/g, '-');
    }

    var id = document.getElementById("filter-window");
    for(var i = 0; i < filter.length; i++) {
        var span1 = document.createElement("span");
        var input = document.createElement("input");
        input.setAttribute("type","checkbox");
        input.className = "filter-checkbox";
        input.id = filterId[i];
        input.addEventListener("change", createProductsByFilter.bind(null, filterId, category));
        span1.appendChild(input)
        var span2 = document.createElement("span");
        span2.appendChild(document.createTextNode(filter[i]));
        var label = document.createElement("label");
        label.setAttribute("for",filterId[i]);
        label.className = "filter-label";
        label.appendChild(span1);
        label.appendChild(span2);
        var container = document.createElement("div");
        container.className = "filter-container";
        container.appendChild(label);
        id.appendChild(container);
    }
}

function createMainCategory() {
    var id = document.getElementById("main-category");
    for (var i = 0; i < dict.mainCategory.length; i++) {
        //Namn på kategorin
        var name = document.createElement("span");
        name.appendChild(document.createTextNode(dict.mainCategory[i]));
        //Bild på kategorin
        var img = document.createElement("img");
        img.src = "./img/" + dict.mainCategory[i] + ".svg";
        img.className = "main-category-img";

        //länk för kategorin
        var a = document.createElement("a");
        a.className = "main-category-box";
        a.appendChild(img);
        a.appendChild(name);
        //måste använda bind för att få med argumentet i funktionen
        a.addEventListener("click", updateViewMain.bind(null, dict.mainCategory[i]));
        id.appendChild(a);
    }
}

//Måste ha med någon view control fattar inte hur vi ska göra
//det dock
function update_view(id, result) {
    document.getElementById(id).innerHTML(result);
    view.innerHTML = "";
    view.innerHTML = result;
}

