function createBartenderView() {
    var main = document.getElementById("main-window");
    main.innerHTML = "";
    var bartenderMainWindow = document.createElement("div");
    bartenderMainWindow.className = "bartender-main-window";

    var sortedOrders = sortTables();
    for(var i = 0; i < sortedOrders.length; i++) {
        //table div
        var table = document.createElement("div");
        table.className = "bartender-view-button bartender-view-button-table";
        var spanTableName = document.createElement("span");
        spanTableName.className = "bartender-table-name";
        var spanTable = document.createElement("span");
        table.appendChild(spanTableName);
        table.appendChild(spanTable.appendChild(document.createTextNode(sortedOrders[i][0].table)));
        table.addEventListener("click", toggleDisplaySibling.bind(null, table));

        //order div
        var orderContainer = document.createElement("div");
        orderContainer.className = "bartender-order-container";
        for(var j = 0; j < sortedOrders[i].length; j++) {
            
            //gula
            var order = document.createElement("div");
            order.className = "bartender-view-button bartender-view-button-order";
            var spanTable = document.createElement("span");
            var spanOrderName = document.createElement("span");
            spanOrderName.className = "bartender-order-name";
            var spanOrder = document.createElement("span");
            order.appendChild(spanOrderName);
            order.appendChild(spanOrder.appendChild(document.createTextNode(sortedOrders[i][j].order_id)));
            order.addEventListener("click", toggleDisplaySibling.bind(null, order));
            
            //tabellen
            var orderTable = createOrderTable(sortedOrders[i][j]);
            var showContainer = document.createElement("div");
            showContainer.className = "bartender-show-container";
            showContainer.appendChild(orderTable);
            
            orderContainer.appendChild(order);
            orderContainer.appendChild(showContainer);
        }

        var tableContainer = document.createElement("div");
        tableContainer.className = "bartender-view-container";
        tableContainer.appendChild(table);
        tableContainer.appendChild(orderContainer);
        bartenderMainWindow.appendChild(tableContainer);
    }
    main.appendChild(bartenderMainWindow);
    updateViewBartender();
}

function sortTables() {
    var list = [];
    var all = OrderDB.all_orders;
    
    if (list.length = 0) {
        var temp = [];
        temp.push(all[0]);
        list.push(temp);
    }

    for(var i = 0; i < all.length; i++) {
        var found = false;

        for(var j = 0; j < list.length; j++) {
            if(list[j][0].table == all[i].table) {
                list[j].push(all[i]);
                found = true;
            } 
        }

        if (!found) {
            var temp = [];
            temp.push(all[i]);
            list.push(temp);
        }
    }

    return list;
}

function toggleDisplaySibling(element) {
    element.classList.toggle("bartender-view-button-order-toggle");
    var content = element.nextElementSibling;
    content.classList.toggle("bartender-view-show");
}

function createOrderTable(order) {
    var table = document.createElement("table");
    table.className = "bartender-show-table";

    var tr1 = document.createElement("tr");
    for(var i = 0; i < 3; i++) {
        var th = document.createElement("th");
        th.className = "bartender-table-h-"+i;
        tr1.appendChild(th);
    }
    table.appendChild(tr1);

    for (var i = 0; i < order.drinkId.length; i++) {
        // Name | Quantity | Price | Button
        var td1 = document.createElement("td");
        var product = findProductByID(order.drinkId[i]);
        td1.appendChild(document.createTextNode(product.name));

        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(order.drinkAmount[i]));

        var td3 = document.createElement("td");
        td3.appendChild(document.createTextNode(product.pricewithvat));

        var tr = document.createElement("tr");
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    }

    var totalClass = ["bartender-total", "", ""];
    var totalData = ["", calculateAmount(order.drinkAmount), order.totalPrice];
    var tr = document.createElement("tr");
    for (var i = 0; i < 3; i++) {
        var td = document.createElement("td");
        td.className = totalClass[i];
        td.appendChild(document.createTextNode(totalData[i]));
        tr.appendChild(td);
    }
    table.appendChild(tr);


    var ids = ["change-order-","remove-order-", "finish-order-"];
    var fun = [revertOrder.bind(null, order.order_id), removeOrder.bind(null, order), finishOrder.bind(null,order.order_id)];

    var tr2 = document.createElement("tr");
    for (var i = 0; i < 3; i++) {
        var td = document.createElement("td");
        var button = document.createElement("button");
        button.id = ids[i] + order.order_id;
        button.className = "bartender-button-n-"+i;
        button.addEventListener("click", fun[i]);
        td.appendChild(button);
        tr2.appendChild(td);
    }
    table.appendChild(tr2);

    return table;
}

function createOrderDiv(order) {
    console.log(order);
    var orderDiv = document.createElement("div");
    orderDiv.id = order.order_id + "-table-order";
    orderDiv.style.border = "2px";
    orderDiv.appendChild(document.createTextNode(order.order_id));
    return orderDiv;
}

function theLowestInStock() {
    var result = [];
    for (i in dict.mainCategory) {
        for (j in drunk[dict.mainCategory[i]]) {
            if (drunk[dict.mainCategory[i]][j].stock <= 5) {
                result.push(drunk[dict.mainCategory[i]][j]);
            }
        }
    }
    return result;
}

function createLowestInStockDiv(name, stock) {
    var outer = document.createElement("div");
    outer.className = "shopping-cart-div";
    var left = document.createElement("div");
    left.className = "shopping-cart-div-left";
    left.appendChild(document.createTextNode(name))
    var center = document.createElement("div");
    center.className = "shopping-cart-div-center";
    center.appendChild(document.createTextNode(stock))
    /*
    var right = document.createElement("div");
    right.className = "shopping-cart-div-right";
    right.appendChild()
    */

    outer.appendChild(left);
    outer.appendChild(center);
    return outer;
}

function createLowestInStockView() {
    var lowest = theLowestInStock();
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

function createManagerView() {
    var main = document.getElementById("main-window");
    main.innerHTML = "";
    var managerWindow = document.createElement("div");
    managerWindow.className = "manager-window";
    var managerContainer = document.createElement("div");
    managerContainer.className = "manager-container";

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
                    <dd><input id="product-manager-origin-i" placeholder="Helsinki" type="text"></dd>
                    <dt id="product-manager-origincountry"></dt>
                    <dd><input id="product-manager-origincountry-i" placeholder="Finland" type="text"></dd>
                    <dt id="product-manager-producent"></dt>
                    <dd><input id="product-manager-producent-i" placeholder="Olvi plc" type="text"></dd>
                    <dt id="product-manager-alcohol"></dt>
                    <dd><input id="product-manager-alcohol-i" placeholder="8.5%" type="text"></dd>
                    <dt id="product-manager-img"></dt>
                    <dd><input id="product-manager-img-i" placeholder="olvi.jpeg" type="text"></dd>
                    <dt id="product-manager-stock"></dt>
                    <dd><input id="product-manager-stock-i" type="number"></dd>
                    <dt id="product-manager-main-category"></dt>
                    <dd><input id="product-manager-main-category-i" placeholder="beer" type="text"></dd>
                </dl>
            <button id="product-manager-add-product"></button>
            <span id="product-manager-success-msg"></span>
        </div>`;

    const staff = createStaffLogIn();

    managerContainer.insertAdjacentHTML('beforeend', addProduct + staff);
    managerContainer.appendChild(createLowestInStockView());
    managerWindow.appendChild(managerContainer);
    main.appendChild(managerWindow);

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
            <div id="shopping-cart-window">
                <div class="shopping-cart-container-top">
                    <div class="shopping-cart-container-top-top">
                        <button id="checkout-order">
                            ${getString("checkout-order")}
                        </button>
                        <button id="cancel-order">
                            ${getString("cancel-order")}
                        </button>
                    </div>

                    <div class="shopping-cart-container-top-bottom">
                        <span id="table-number">
                            ${getString("table-number")}
                        </span>
                        <input id="table-number-input" type="number" max=10 min=1>
                    </div>
                </div>
                <div id="shopping-cart-container-bottom" ondrop="dropHandler(event)" ondragover="dragoverHandler(event)">
                    
                </div>
            </div>
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
    var stock = document.getElementById("product-manager-stock-i").value;
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
        "stock": stock,
    }
    drunk[category].push(product);
    $("#product-manager-success-msg").text(name + getString("product-manager-success-msg")).fadeIn();     
    setTimeout(function() { $("#product-manager-success-msg").fadeOut(); }, 3000);
}


function updateShoppingCartView() {
    //genererar htmlkod för shoppingcart, och rensar det som stod innan
    var shoppingBottom = document.getElementById("shopping-cart-container-bottom");
    shoppingBottom.textContent = "";

    document.getElementById("checkout-order").addEventListener("click", stdOrder);   
    document.getElementById("cancel-order").addEventListener("click", function() {
        resetCart();
        updateShoppingCartView();
    });

    for(var i = 0; i < OrderDB.cart.drinkId.length; i++) {
        var productDiv = createShoppingCartDiv(OrderDB.cart.drinkId[i],OrderDB.cart.drinkAmount[i]);
        shoppingBottom.appendChild(productDiv);
        var removeButton = document.getElementById(OrderDB.cart.drinkId[i]+"-cart-button");  
        removeButton.addEventListener("click", removeFromCart.bind(null,OrderDB.cart.drinkId[i]));  
    }

    if (OrderDB.cart.drinkId.length == 0) {
        shoppingBottom.insertAdjacentHTML("beforeend",
                    `<div id="shopping-cart-container-msg" class="shopping-cart-div">
                        <span id="shopping-cart-drop-here">${getString("shopping-cart-drop-here")}</span>
                    </div>`);
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

    const staffInfo= `
                <div id="product-manager-view" class="product-info-container-spec">
                    <h2 id="product-manager"></h2>
                    <dl class="product-info-spec">
                        <dt id="product-stock-view"></dt>
                        <dd>
                            <input id="product-manager-stock" value="${product.stock}" type="number" max="10000" min="0">
                        </dd>
                    </dl>
                    <button id="product-manager-refill"></button>
                    <button id="product-manager-remove-product"></button>
                </div>`;

    const productInfo = 
                `<h1 id="product-info-name" class="product-info-name product-name-font">${product.name}</h1>
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
                </div>`;

    
    if(modelData["credentials"] == 0) {
        productContainer.insertAdjacentHTML("beforeend", 
            `<div class="product-info-container-left">
                    <div class="product-info-container-img">
                        <img id="product-info-img" src="${product.img}" class="product-img" alt="">
                    </div>
                </div>
                <div class="product-info-container-right">
                    ${productInfo}
                    ${staffInfo}
                </div>
            `);
             
        document.getElementById("product-manager-stock").addEventListener("change", changeStock.bind(null, id, null));

        var refill = document.getElementById("product-manager-refill");
        refill.addEventListener("click", changeStock.bind(null, id, 24));
        refill.addEventListener("click", function () {
            document.getElementById("product-manager-stock").value = parseInt(document.getElementById("product-manager-stock").value) + 24;
        });
        document.getElementById("product-manager-remove-product").addEventListener("click", removeProductFromMeny);
    } else {
        productContainer.insertAdjacentHTML("beforeend", 
               `<div class="product-info-container-left">
                    <div class="product-info-container-img">
                        <img id="product-info-img" src="${product.img}" class="product-img" alt="">
                    </div>
                </div>
                <div class="product-info-container-right">
                    ${productInfo}
                </div>
            `);
    }
    
    document.getElementById("product-buy-id").addEventListener("click",addToCart.bind(null,id,1));
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
    updateViewClasses("classes");
}


function updateViewProducts(category) {
    createProductView();
    document.getElementById("filter-window").textContent = "";
    createFilter(category);
    document.getElementById("product-window").textContent = "";
    createProductsByCategory(category);
    updateViewClasses("classes");
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


function updateViewAllProducts() {
    document.getElementById("main-window").innerHTML = "";
    createProductView()
    createAllProducts();
    updateShoppingCartView();
    updateViewMain();
}
