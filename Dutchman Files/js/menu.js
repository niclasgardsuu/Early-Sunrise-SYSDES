
function createManagerView() {
    var main = document.getElementById("main-window");
    main.innerHTML = "";

    const addProduct = 
        `<div class="manager-left-container">
            <h3 id="product-manager-add"></h3>
                <dl class="product-info-spec">
                    <dt id="product-manager-articleid"></dt>
                    <dd><input id="product-manager-articleid-i" placeholder="1337" type="number" max="100000" min="0"></dd>
                    <dt id="product-manager-name"></dt>
                    <dd><input id="product-manager-name-i" placeholder="Olvi" type="text"></dd>
                    <dt id="product-manager-name2"></dt>
                    <dd><input id="product-manager-name2-i" placeholder="Tupplapukki" type="text"></dd>
                    <dt id="product-manager-pricewithvat"></dt>
                    <dd><input id="product-manager-pricewithvat-i" placeholder="5:90" type="number" max="100000" min="0"></dd>
                    <dt id="product-manager-volume"></dt>
                    <dd><input id="product-manager-volume-i" placeholder="330 ml" type="number" max="10000" min="0"></dd>
                    <dt id="product-manager-productgroup"></dt>
                    <dd><input id="product-manager-productgroup-i" placeholder="Djup lager" type="text"></dd>
                    <dt id="product-manager-serves"></dt>
                    <dd><input id="product-manager-serves-i" placeholder="Burk" type="text"></dd>
                    <dt id="product-manager-origin"></dt>
                    <dd><input id="product-manager-origin-i" pceholder="Helsinki" type="text"></dd>
                    <dt id="product-manager-origincountry"></dt>
                    <dd><input id="product-manager-origincountry-i" placeholder="Finland" type="text"></dd>
                    <dt id="product-manager-producent"></dt>
                    <dd><input id="product-manager-producent-i" placeholder="Olvi plc" type="text"></dd>
                    <dt id="product-manager-alcohol"></dt>
                    <dd><input id="product-manager-alcohol-i" placeholder="8.5%" type="text"></dd>
                    <dt id="product-manager-img"></dt>
                    <dd><input id="product-manager-img-i" placeholder="olvi.jpeg" type="text"></dd>
                    <dt id="product-manager-main-category"></dt>
                    <dd><input id="product-manager-main-category-i" placeholder="beer" type="text"></dd>
                </dl>
            <button id="product-manager-add-product"></button>
            <span id="product-manager-success-msg"></span>
        </div>`;

    const staff = createStaffLogIn();

    main.insertAdjacentHTML('beforeend', addProduct + staff);

    document.getElementById("product-manager-add-product").addEventListener("click", addProductToMeny);
    updateViewManager();
}

function createLoginView() {

    var loginContainer = document.getElementById("product-info-container-id");

    loginContainer.innerHTML = "";

    const loginForm = 
            `
            <div class="login-container">
                <div id="logInForm">
                    <div class ="login-input-container">
                        <div>
                            <label id="userN" for="userN"><b></b></label>
                        </div>
                        <input id="username" class="login-input" type="text" placeholder="Enter Username" name="uname" required>
                    </div>
                    <div class ="login-input-container">
                        <div>
                            <label id="passW" for="psw"><b></b></label>
                        </div>
                        <input id="password" class="login-input" type="password" placeholder="Enter Password" name="psw" required>
                    </div>
                    <button class="login-button" id="logIn" onclick="doInit('logIn')"></button>
                </div>
            </div>`;


    document.getElementById("product-info-hide").checked = true;
    loginContainer.insertAdjacentHTML('beforeend', loginForm);
    updateViewLogin();
}

function createProductView() {
    var main = document.getElementById("main-window");
    main.innerHTML = "";

    main.insertAdjacentHTML('beforeend',
        `<div class="product-flex">
            <div id="filter-window"></div>
            <div id="product-window"></div>
            <div id="shopping-cart-window" ondrop="dropHandler(event)" ondragover="dragoverHandler(event)"></div>
        </div>`
    );
    
}

function removeProductFromMeny() {
    var id = document.getElementById("product-info-articleid").textContent;
    var category = document.getElementById("product-info-category").textContent;
    for (var i = 0; i < drunk[category].length; i++) {
        if (drunk[category][i].articleid == id) {
            drunk[category].splice(i,1);
            document.getElementById("product-info-hide").checked = false;
            updateViewProducts(category);
            return;
        }
    } 
    return null;
}

function checkAddProductToMeny(articleid, category, cannotBeEmpty) {
    var msg = "";
    var passed = true;

    for (var i = 0; i < cannotBeEmpty.length; i++ ) {
        if (cannotBeEmpty[i] == "") {
            passed = false;
            msg = getString("product-manager-check-input");
        }
    }

    if (findProductByID(articleid) != null){
        msg += getString("product-manager-check-id");
        passed = false;
    }

    if (category != dict.mainCategory[0] && category != dict.mainCategory[1] 
        &&  category != dict.mainCategory[2] && category != dict.mainCategory[3]) {
        msg += getString("product-manager-check-category");
        passed = false;
    }

    if (!passed) alert(msg);

    return passed;
}

function addProductToMeny() {
    
    var articleid = document.getElementById("product-manager-articleid-i").value;
    var name = document.getElementById("product-manager-name-i").value;
    var name2 = document.getElementById("product-manager-name2-i").value;
    var pricewithvat = document.getElementById("product-manager-pricewithvat-i").value;
    var volume = document.getElementById("product-manager-volume-i").value;
    var productgroup = document.getElementById("product-manager-productgroup-i").value;
    var serves = document.getElementById("product-manager-serves-i").value;
    var origin = document.getElementById("product-manager-origin-i").value;
    var origincountry = document.getElementById("product-manager-origincountry-i").value;
    var producent = document.getElementById("product-manager-producent-i").value;
    var alcoholcontent = document.getElementById("product-manager-alcohol-i").value;
    var img = "./img/" + document.getElementById("product-manager-img-i").value;
    var category = document.getElementById("product-manager-main-category-i").value;

    var cannotBeEmpty = [articleid, name, pricewithvat, volume, productgroup, serves, origincountry, producent, alcoholcontent];
    var passed = checkAddProductToMeny(articleid, category, cannotBeEmpty);
    if (!passed) return;

    product = {
        "articleid": articleid,
        "name": name,
        "name2": name2,
        "pricewithvat": pricewithvat,
        "volume": volume,
        "productgroup": productgroup,
        "serves": serves,
        "origin": origin,
        "origincountry": origincountry,
        "producent": producent,
        "alcoholcontent": alcoholcontent,
        "img": img,
    }
    drunk[category].push(product);
    $("#product-manager-success-msg").text(name + getString("product-manager-success-msg")).fadeIn();     
    setTimeout(function() { $("#product-manager-success-msg").fadeOut(); }, 3000);
}

function updateShoppingCartView() {
    //genererar htmlkod för shoppingcart, och rensar det som stod innan
    var shoppingCartWindow = document.getElementById("shopping-cart-window");
    shoppingCartWindow.textContent = "";
    //var price = totalOrderPrice();
    shoppingCartWindow.insertAdjacentHTML('afterbegin',
    `
    <div id="shopping-cart-options">
        <button id="checkout-order">
            ${getString("checkout-order")}
        </button>
        <button id="cancel-order">
            ${getString("cancel-order")}
        </button>
        <span id="total-price">
            1337:-
        </span>
    </div>
    `)
    document.getElementById("checkout-order").addEventListener("click",stdOrder);
    for(var i = 0; i < OrderDB["cart"]["drinkId"].length; i++) {
        console.log(OrderDB["cart"]);
        var productDiv = createShoppingCartDiv(OrderDB["cart"]["drinkId"][i],OrderDB["cart"]["drinkAmount"][i]);
        shoppingCartWindow.appendChild(productDiv);
        var removeButton = document.getElementById(OrderDB["cart"]["drinkId"][i]+"-cart-button");  
        removeButton.addEventListener("click", function () {
            resetCart();
            updateShoppingCartView();
        });//removeFromShoppingCart.bind(null,OrderDB["cart"]["drinkId"][i]));  
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
    if (index > -1) {
      cart.splice(index, 1);
    }
    updateShoppingCartView();
    
} 

function indexOfCartProduct(cart,id) {
    for(var i = 0; i < cart.length; i++) {
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
    productContainer.insertAdjacentHTML("beforeend", 
    `<div class="product-info-container-left">
                <img id="product-info-img" src="${product.img}" class="product-img" alt="">
            </div>
            <div class="product-info-container-right">
                <h1 id="product-info-name" class="product-info-name product-name-font">${product.name}</h1>
                <h2 id="product-info-name2" class="product-info-name2 product-name-font">${product.name2}</h2>
                <span id="product-info-desc" class="product-info-desc">${product.serves + " " + product.volume}</span>
                <h1 id="product-info-price" class="product-info-price product-price-font">${product.pricewithvat + " kr"}</h1>
                <button id="product-buy-id" class="product-buy"></button>
                <div class="product-info-container-spec">
                    <h3 id="product-spec">Specifikationer</h3>
                    <dl class="product-info-spec">
                        <dt id="product-spec-alcohol"></dt>
                        <dd id="product-info-alcohol">${product.alcoholcontent}</dd>
                        <dt id="product-spec-category"></dt>
                        <dd id="product-info-category">${category}</dd>
                        <dt id="product-spec-type"></dt>
                        <dd id="product-info-type">${product.productgroup}</dd>
                        <dt id="product-spec-producent"></dt>
                        <dd id="product-info-producent">${product.producent}</dd>
                        <dt id="product-spec-origin"></dt>
                        <dd id="product-info-origin">${origin}</dd>
                        <dt id="product-spec-allergens"></dt>
                        <dd id="product-info-allergens">${allergens}</dd>
                        <dt id="product-spec-articleid"></dt>
                        <dd id="product-info-articleid">${product.articleid}</dd>
                    </dl>
                </div>
                <div id="product-manager-view" class="product-info-container-spec">
                    <h2 id="product-manager"></h2>
                    <dl class="product-info-spec">
                        <dt id="product-stock-view"></dt>
                        <dd>
                            <input id="product-manager-stock" type="number" max="10000" min="0">
                        </dd>
                    </dl>
                    <button id="product-manager-refill"></button>
                    <button id="product-manager-remove-product"></button>
                </div>
            </div>
        `);
    document.getElementById("product-buy-id").addEventListener("click",addToCart.bind(null,id,1));
    document.getElementById("product-manager-remove-product").addEventListener("click", removeProductFromMeny);
    updateView();
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
        productWindow.appendChild(createProductContainer(bevType[i].name, bevType[i].pricewithvat, bevType[i].img, bevType[i].articleid, category));
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
                    productWindow.appendChild(createProductContainer(bevType[j].name, bevType[j].pricewithvat, bevType[j].img, bevType[j].articleid, category));
                }
            }

        }
    }

    //if no filter is checked we print out all the products in the category
    if (noFilter) {
        createProductsByCategory(category);
    }
    updateViewClasses();
}


function updateViewProducts(category) {
    createProductView();
    document.getElementById("filter-window").textContent = "";
    createFilter(category);
    document.getElementById("product-window").textContent = "";
    createProductsByCategory(category);
    updateViewClasses();
    updateShoppingCartView();
}


function createProductContainer(name, price, imgSrc, id, category) {
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

    var img = document.createElement("img");
    img.setAttribute("src",imgSrc);
    img.className = "product-img";

    var productContainerTopTop = document.createElement("div");
    productContainerTopTop.className = "product-container-top-top";
    productContainerTopTop.appendChild(img);

    var productName = document.createElement("span");
    productName.className = "product-name product-name-font";
    productName.appendChild(document.createTextNode(name));

    var productContainerTopBottom = document.createElement("div");
    productContainerTopBottom.className = "product-container-top-bottom";
    productContainerTopBottom.appendChild(productName);

    var productContainerTop = document.createElement("div");
    productContainerTop.className = "product-container-top";
    productContainerTop.addEventListener("click", showProductInfo.bind(null, id, category));
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
    productBuy.addEventListener("click", addToCart.bind(null,id,1));

    var productPrice = document.createElement("span");
    productPrice.className = "product-price-font product-price";
    productPrice.appendChild(document.createTextNode(price+" kr"));
    
    var productContainerBottomTop= document.createElement("div");
    var productContainerBottomBottom= document.createElement("div");
    productContainerBottomTop.className = "product-container-bottom-top";
    productContainerBottomTop.appendChild(productPrice);
    productContainerBottomBottom.className = "product-container-bottom-bottom";
    productContainerBottomBottom.appendChild(productBuy);

    var productContainerBottom = document.createElement("div");
    productContainerBottom.className = "product-container-bottom";
    productContainerBottom.appendChild(productContainerBottomTop);
    productContainerBottom.appendChild(productContainerBottomBottom);

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
        name.id = dict.mainCategory[i];
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
        a.addEventListener("click", updateViewProducts.bind(null, dict.mainCategory[i]));
        id.appendChild(a);
    }
}

