/**
 *  This function will show and hide the sibling of the element that is specified
*/
function toggleDisplaySibling(element) {
    element.classList.toggle("bartender-view-button-order-toggle");
    var content = element.nextElementSibling;
    content.classList.toggle("bartender-view-show");
}


/**
 * This function will remove a product from the database and update the view 
 * @returns {undefined} if remove did not work return null
*/
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

/**
 * This function will check if the parameters are valid
 * @param {string} articleid the article id of the product
 * @param {string} category the main category which the product is in
 * @param {Array} cannotBeEmpty the array with all values that can't be empty
 * @returns {boolen} true if all checks passed else false
*/
function checkAddProductToMeny(articleid, category, cannotBeEmpty) {
    var msg = "";
    var passed = true;

    for (var i = 0; i < cannotBeEmpty.length; i++ ) {
        if (cannotBeEmpty[i] == "") {
            passed = false;
            msg = getString("product-manager-input-error");
        }
    }

    if (findProductByID(articleid) != null){
        msg += getString("product-manager-id-error");
        passed = false;
    }

    if (category != dict.mainCategory[0] && category != dict.mainCategory[1] 
        &&  category != dict.mainCategory[2] && category != dict.mainCategory[3]) {
        msg += getString("product-manager-category-error");
        passed = false;
    }

    if (!passed) alertBox(msg);

    return passed;
}

/**
 * This function will add a product to the database
*/
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


/**
 *  Changes the price of a product if it exists in a specific category
 * @param {number} id the id of the product
 * @param {string} category the category which the product belongs to
 */
function changePrice(id, category) {
    for (i in drunk[category]) {
        if (drunk[category][i].articleid == id) {
            drunk[category][i].pricewithvat = document.getElementById("product-manager-price-i").value;
        }
    }
    showProductInfo(id, category);
    updateViewProducts(category);
}


/**
 *Create all products in the database and print them out
 */
function createAllProducts() {
    for (var i = 0; i < dict.mainCategory.length; i++) {
        createProductsByCategory(dict.mainCategory[i]);
    }
}

/**
 *  Create all products within a category and print them out
 * @param {string} category the category
 */
function createProductsByCategory(category) {
    var bevType = drunk[category];
    var productWindow = document.getElementById("product-window");
    for (var i = 0; i < bevType.length; i++) {
        productWindow.appendChild(createProductContainer(bevType[i].name, bevType[i].pricewithvat, bevType[i].img, bevType[i].articleid, category));
    }
}


/**
 *  Create all products within a category that has been filtered and print them out 
 * @param {string} name the name of the product
 * @param {string} category the category where the product belongs to
 * @returns {HTMLElement} true if the addition is successful, otherwise false
*/
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


/**
 *  This function will update which products are shown on screen according to what main category is pressed
 * @param {string} category the main category
 */
function updateViewProducts(category) {
    createMainView();
    document.getElementById("filter-window").textContent = "";
    createFilter(category);
    document.getElementById("product-window").textContent = "";
    createProductsByCategory(category);
    updateViewClasses("classes");
    updateShoppingCartView();
    updateView();
}

/**
 *  This function will create the filter button that allows the user to filter what items to be shown when viewing the menu
 * @param {string} category the category of the products that is going to show in the menu when clicked
*/
function createFilter(category) {
    var filter = getFilter(category);
    var filterId = [];
    //Need to remove spaces and replace with dash for id
    for (var i = 0; i < filter.length; i++) {
        filterId[i] = filter[i].replace(/\s+/g, '-');
    }

    var filterContainer = document.getElementById("filter-window");
    for(var i = 0; i < filter.length; i++) {
        filterContainer.appendChild(createFilterView(category, filterId, filterId[i]));
    }
}

/**
 *  This function will create html elements displaying the main categories that can be chosen when viewing the menu
*/
function createMainCategory() {
    var id = document.getElementById("main-category");
    id.innerHTML = "";
    for (var i = 0; i < dict.mainCategory.length; i++) {
        id.appendChild(createMainCategoryButton(dict.mainCategory[i]));
    }
    id.firstChild.classList.add("menu-first-category-box");
    updateViewMainCategory();
}

/**
 *  Updates the view to display all products and the shopping cart
*/
function updateViewAllProducts() {
    document.getElementById("main-window").innerHTML = "";
    createMainView()
    createAllProducts();
    updateShoppingCartView();
    updateViewMain();
}

/**
 *  This function will alert the user with a box with a message stating the fault
 * @param {string} msg the message that will be shown
*/
function alertBox(msg) {
    var container = document.getElementById("alert-box-container");
    container.appendChild(createAlertBoxView(msg));

    if (container.childElementCount > 3) {
        removeAlertBox();
    } else {
        setTimeout(removeAlertBox, 3000);
    }
}

/**
 *  This function will remove the first alert box from the screen
*/
function removeAlertBox() {
    var container = document.getElementById("alert-box-container");
    if (container.hasChildNodes()) container.removeChild(container.firstChild);
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

/** 
 * Updates the shopping cart view to display the current state of the shopping cart
*/
function updateShoppingCartView() {
    var shoppingBottom = document.getElementById("shopping-cart-container-bottom");
    shoppingBottom.textContent = "";

    for(var i = 0; i < OrderDB.cart.productId.length; i++) {
        var id = OrderDB.cart.productId[i];
        console.log(id);
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
        shoppingBottom.insertAdjacentHTML("beforeend", createEmptyShoppingCart());
    }
}

/**
 * This function will create the view for the products that are low in stock
 * @returns {HTMLElement} a div
*/
function createLowestInStockView() {
    var lowest = theLowestInStock(5);
    lowestContainer = createLowestInStockHeading();
    for (i in lowest) {
        lowestContainer.appendChild(createLowestInStockDiv(lowest[i].name, lowest[i].stock));
    }
    return lowestContainer;
}
