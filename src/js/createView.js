/**
 *  Create an attribute element
 * @param {string} attr an attribute
 * @param {string} content a content
 * @returns {HTMLElement} an attribute element
*/
function createAttribute(attr,content) {
    if (content == "") {
        return "";
    } else {
        return attr + "=" + content + " ";
    }
}

/**
 *  Create a span with an even element
 * @param {string} id an id
 * @param {string} classname a classname
 * @param {string} content a content
 * @param {string} _function a function
 * @returns {string} a string of a span with an even
*/
function createSpanEvent(id, classname, content, _function) {
    idString = createAttribute("id", id);
    classString = createAttribute("class", classname);
    return "<span " + idString + classString + "onclick="+_function+">" + content + "</span>";
}    

/**
 *  This function will generate a view to display all the currently active orders
*/
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
            
            //the order id button
            var order = document.createElement("div");
            order.className = "bartender-view-button bartender-view-button-order";
            var spanTable = document.createElement("span");
            var spanOrderName = document.createElement("span");
            spanOrderName.className = "bartender-order-name";
            var spanOrder = document.createElement("span");
            order.appendChild(spanOrderName);
            order.appendChild(spanOrder.appendChild(document.createTextNode(sortedOrders[i][j].order_id)));
            order.addEventListener("click", toggleDisplaySibling.bind(null, order));
            
            //table with products
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



/**
 * This function will create a table with the headers product, quantity and price
 * and populate it with the appropriate value
 * @param {Object} order the order object that will be used
 * @returns {HTMLElement} a table html elemnt
*/
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

    for (var i = 0; i < order.productId.length; i++) {
        // Name | Quantity | Price | Button
        var td1 = document.createElement("td");
        var product = findProductByID(order.productId[i]);
        td1.appendChild(document.createTextNode(product.name));

        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(order.productAmount[i]));

        var td3 = document.createElement("td");
        td3.appendChild(document.createTextNode(product.pricewithvat));

        var tr = document.createElement("tr");
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    }

    var totalClass = ["bartender-total", "", ""];
    var totalData = ["", calculateAmount(order.productAmount), order.totalPrice];
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

/**
 * This function will create a div with the order inside it
 * @param {Object} order the order object that will be used
 * @returns {HTMLElement} a div 
*/
function createOrderDiv(order) {
    console.log(order);
    var orderDiv = document.createElement("div");
    orderDiv.id = order.order_id + "-table-order";
    orderDiv.style.border = "2px";
    orderDiv.appendChild(document.createTextNode(order.order_id));
    return orderDiv;
}


/**
 * This function will create the heading for lowest in stock
 * @returns {HTMLElement} a div 
*/
function createLowestInStockHeading() {
    var lowestContainer = document.createElement("div");
    lowestContainer.className = "lowest-in-stock-container";
    var h1 = document.createElement("h1");
    h1.id = "product-low-in-stock";
    lowestContainer.appendChild(h1);
    return lowestContainer;
}

/**
 * This function will create a div with all the lowest stock objects
 * @param {string} name the name that will be displayed in the div
 * @param {number} number the number that will be displayed in the div
 * @returns {HTMLElement} a div
*/
function createLowestInStockDiv(name, stock) {
    var outer = document.createElement("div");
    outer.className = "shopping-cart-div";
    var left = document.createElement("div");
    left.className = "shopping-cart-div-left";
    left.appendChild(document.createTextNode(name));
    var center = document.createElement("div");
    center.className = "shopping-cart-div-center";
    center.appendChild(document.createTextNode(stock));
    /*
    var right = document.createElement("div");
    right.className = "shopping-cart-div-right";
    right.appendChild()
    */

    outer.appendChild(left);
    outer.appendChild(center);
    return outer;
}


/**
 * This function will create the view for the manager
*/
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

    const staff = createAddCurrency();
    const income = createProfitTable();

    managerContainer.insertAdjacentHTML('beforeend', `
        <div id="manager-top-container">` +
            addProduct +
            `<div class="manager-right-container">` + 
                staff + income +
            `</div>` +
        `</div>`);
    managerContainer.appendChild(createLowestInStockView());
    managerWindow.appendChild(managerContainer);
    main.appendChild(managerWindow);

    document.getElementById("product-manager-add-product").addEventListener("click", addProductToMeny);
    updateViewManager();
}

/**
 * Creates a table displaying income, expenses and profit
 */
function createProfitTable() {
    var expenses = parseFloat((OrderDB.accounting.expenses).toFixed(2));
    var income = parseFloat((OrderDB.accounting.income).toFixed(2));
    var profit = parseFloat((income - expenses).toFixed(2));
    return `
    <table class="bartender-show-table" style="margin-top: 20px">
    <tr>
        <td id="expenses"></td>
        <td>`+expenses+`</td>
    <tr>
        <td id="income"></td>
        <td>`+income+`</td>
    </tr>
    <tr>
        <td id="profit"></td>
        <td >`+profit+`</td>
    </tr>
    `
}

/**
 * This function will create the view for the login 
*/
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
                    <button class="login-button" id="logIn" onclick="toLogIn()"></button>
                </div>
            </div>`;


    document.getElementById("product-info-hide").checked = true;
    loginContainer.insertAdjacentHTML('beforeend', loginForm);
    updateViewLogin();
}

/**
 * This function will create the main base view 
*/
function createMainView() {
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
                        <select name id="table-number-select">
                            <option value="0" id="bar"></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select> `+/*<input id="table-number-input" type="number" max=10 min=1>*/`
                    </div>
                </div>
                <div id="shopping-cart-container-bottom" ondrop="dropHandler(event)" ondragover="dragoverHandler(event)">
                    
                </div>
            </div>
        </div>`
    );
    
    document.getElementById("checkout-order").addEventListener("click", stdOrder);   
    document.getElementById("cancel-order").addEventListener("click", function() {
        resetCart();
        updateShoppingCartView();
        console.log("test");
    });
}

/**
 *  Creates an element representing a product in the shopping cart
 * @param {number} id the id of the product
 * @param {number} count how many of that product
 * @returns {HTMLElement} a div that is shown in the shopping cart
 */
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
        <img src="../img/close.svg">
    </div>
    `
    );
    return div;
}

/**
 * Creates the view when there is nothing in the shopping cart
 */
function createEmptyShoppingCart() {
    return `<div id="shopping-cart-container-msg" class="shopping-cart-div">
                <span id="shopping-cart-drop-here">${getString("shopping-cart-drop-here")}</span>
            </div>`
}


/**
 *  This function will create a product shown in the menu
 * @param {string} name the name of the product
 * @param {number} price the price of the product
 * @param {string} imgSrc the file path from where the image of the product is located
 * @param {number} id the id of the product
 * @param {string} category the category in which the product belongs to
 * @returns {HTMLElement} true if the addition is successful, otherwise false
*/
function createProductContainer(name, price, imgSrc, id, category) {
    
    //Upper part of the product container
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
    //End of upper part


    //Lower part of the product container
        var productBuy = document.createElement("button");
        productBuy.className = "product-buy";
        var temp = {
                   execute : addToCart.bind(null, id, 1),
                    unexecute: removeFromCart.bind(null, id, 1)
                }
        productBuy.addEventListener("click", doit.bind(null, temp));

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
    //End of lower part

    return productContainer;
}

/**
 *  Creates an element for displaying the filter buttons for a specfic catefory
 * @param {string} category the current main category
 * @param {array} array an array of all sub categories
 * @param {string} id the current subcategory
 * @return {HTMLElement} the container with all filter buttons
 */
function createFilterView(category, array ,id) {
    var span1 = document.createElement("span");
    var input = document.createElement("input");
    input.setAttribute("type","checkbox");
    input.className = "filter-checkbox";
    input.id = id; 
    input.addEventListener("change", createProductsByFilter.bind(null, array, category));
    span1.appendChild(input)
    var span2 = document.createElement("span");
    span2.appendChild(document.createTextNode(id));
    var label = document.createElement("label");
    label.setAttribute("for",id);
    label.className = "filter-label";
    label.appendChild(span1);
    label.appendChild(span2);
    var container = document.createElement("div");
    container.className = "filter-container";
    container.appendChild(label);
    return container;
}

/**
 *  Creates a button for displaying products in a category
 * @param {string} mainCategory the category
 * @returns {HTMLElement} the button
 */
function createMainCategoryButton(mainCategory) {
    //Namn på kategorin
    var name = document.createElement("span");
    name.id = mainCategory;
    //Bild på kategorin
    var img = document.createElement("img");
    img.src = "../img/" + mainCategory + ".svg";
    img.className = "menu-category-img";

    //länk för kategorin
    var a = document.createElement("a");
    a.className = "menu-category-box";
    a.appendChild(img);
    a.appendChild(name);
    //måste använda bind för att få med argumentet i funktionen
    a.addEventListener("click", updateViewProducts.bind(null, mainCategory));
    return a;
}
/**
 * Creates a element that displays an alert
 * @param {string} msg the alert message that is displayed
 * @returns {HTMLElement} the alert object
 */
function createAlertBoxView(msg) {
    var alertBox = document.createElement("div");
    alertBox.className = "alert-box";

    var alertMsg = document.createElement("span");
    alertMsg.className = "alert-box-msg";
    alertMsg.appendChild(document.createTextNode(msg));

    var alertClose = document.createElement("span");
    alertClose.className = "alert-box-close cursor";
    alertClose.appendChild(document.createTextNode("x"));
    alertClose.addEventListener("click", function() {
        this.parentNode.remove();
    });
  
    alertBox.appendChild(alertMsg);
    alertBox.appendChild(alertClose);
    return alertBox;
}

/**
 *  Creates an element for displaying the filter buttons for a specfic category
 * @param {Object} product the product that will be shown
 * @return {string} HTML code of the element
 */
function createShowProductBaseView(product) {
    return `<div class="product-info-container-left">
            <div class="product-info-container-img">
                <img id="product-info-img" src="../img/${product.img}" class="product-img" alt="">
            </div>
        </div>
        <div id="product-info-container-right">
        </div>
    `;
}

/**
 *  Creates a window that displays information about a product
 * @param {Object} product the product
 * @param {string} origin where the product is from
 * @param {string} allergens what allergens are in the product
 * @param {string} category what category the product belongs in
 * @returns {string} HTML code of the window element
 */
function createProductInfoView(product, origin, allergens, category) {
    return productInfo = 
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
}

/**
 *  Generates information about a product that should only be known to a bartender or manager
 * @param {Object} product the product
 * @returns {string} the HTML code of the info
 */
function createStaffInfoView(product) {
    return `
            <div id="product-manager-view" class="product-info-container-spec">
                <h2 id="product-manager"></h2>
                <dl class="product-info-spec">
                    <dt id="product-stock-view"></dt>
                    <dd>
                        <input id="product-manager-stock" value="${product.stock}" type="number" max="10000" min="0">
                    </dd>
                    <dt id="product-manager-price"></dt>
                    <dd>
                        <input id="product-manager-price-i" value="${product.pricewithvat}" type="number" max="10000" min="0">
                    </dd>
                </dl>
                <button id="product-manager-refill"></button>
                <button id="product-manager-remove-product"></button>
            </div>`;

}


/**
 *  Create div specific for vip with the log in
 * @returns {HTMLElement} a div
*/
function createVipLogIn() {
    //div containing everything
    var vip = document.createElement("div")
    vip.id="vip";

    //span that can be pressed to log out
    var logout = document.createElement("span");
    logout.id = "logOut";
    logout.classList = "cursor";
    logout.addEventListener("click",logOut);
    vip.appendChild(logout);

    //button to display balance
    var balButton = document.createElement("button");
    balButton.id = "balance";
    balButton.classList = "cursor";
    balButton.addEventListener("click",showBalance);
    vip.appendChild(balButton);

    //span that shows the balance
    var inner = document.createElement("span");
    inner.id = "innerDisplay";
    vip.appendChild(inner);

    return vip;
}

/**
 *  Create div specific for adding currency
 * @returns {HTMLElement} the div
*/
function createAddCurrency() {
    
    return `
    <div id="add-currency">
        <div id="username-add-currency">
            <dl class="product-info-spec">
                <dt id="adToAccUserN"></dt>
                <input id="adToAccUsername" placeholder="User" type="text" max="100000" min="0">
            </dl>
        </div>
        <div id="amount-add-currency">
            <dl class="product-info-spec">
                <dt id="addA"></dt>
                <input id="addAmount" placeholder="Amount" type="text" max="100000" min="0">
            </dl>
        </div>
        <button id="addToAcc" onclick="addToAcc"></button>
    </div>
    `
}
