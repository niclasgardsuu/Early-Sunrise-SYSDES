function createManagerView() {
    var main = document.getElementById("main-window");
    main.innerHTML = "";

    const addProduct = 
        '<div class="manager-left-container">'+
            '<h3 id="product-manager-add"></h3>'+
                '<dl class="product-info-spec">'+
                    '<dt id="product-manager-articleid"></dt>'+
                    '<dd><input id="product-manager-articleid-i" placeholder="1337" type="number" max="100000" min="0"></dd>'+
                    '<dt id="product-manager-name"></dt>'+
                    '<dd><input id="product-manager-name-i" placeholder="Olvi" type="text"></dd>'+
                    '<dt id="product-manager-name2"></dt>'+
                    '<dd><input id="product-manager-name2-i" placeholder="Tupplapukki" type="text"></dd>'+
                    '<dt id="product-manager-pricewithvat"></dt>'+
                    '<dd><input id="product-manager-pricewithvat-i" placeholder="5:90" type="number" max="100000" min="0"></dd>'+
                    '<dt id="product-manager-volume"></dt>'+
                    '<dd><input id="product-manager-volume-i" placeholder="330 ml" type="number" max="10000" min="0"></dd>'+
                    '<dt id="product-manager-productgroup"></dt>'+
                    '<dd><input id="product-manager-productgroup-i" placeholder="Djup lager" type="text"></dd>'+
                    '<dt id="product-manager-serves"></dt>'+
                    '<dd><input id="product-manager-serves-i" placeholder="Burk" type="text"></dd>'+
                    '<dt id="product-manager-origin"></dt>'+
                    '<dd><input id="product-manager-origin-i" placeholder="Helsinki" type="text"></dd>'+
                    '<dt id="product-manager-origincountry"></dt>'+
                    '<dd><input id="product-manager-origincountry-i" placeholder="Finland" type="text"></dd>'+
                    '<dt id="product-manager-producent"></dt>'+
                    '<dd><input id="product-manager-producent-i" placeholder="Olvi plc" type="text"></dd>'+
                    '<dt id="product-manager-alcohol"></dt>'+
                    '<dd><input id="product-manager-alcohol-i" placeholder="8.5%" type="text"></dd>'+
                    '<dt id="product-manager-img"></dt>'+
                    '<dd><input id="product-manager-img-i" placeholder="olvi.jpeg" type="text"></dd>'+
                    '<dt id="product-manager-main-category"></dt>'+
                    '<dd><input id="product-manager-main-category-i" placeholder="beer" type="text"></dd>'+
                '</dl>'+
            '<button id="product-manager-add-product" class="product-manager-button"></button>'+
            '<span id="product-manager-success-msg"></span>'+
        '</div>';

    main.insertAdjacentHTML('beforeend', addProduct);

    document.getElementById("product-manager-add-product").addEventListener("click", addProductToMeny);
    updateViewManager();
}

function createLoginView() {
    var main = document.getElementById("main-window");
    main.innerHTML = "";

    main.insertAdjacentHTML('beforeend', 
            `<span id="logInForm">
                <label id="userN" for="userN"><b></b></label>
                <input id="username" type="text" placeholder="Enter Username" name="uname" required>
                <label id="passW" for="psw"><b></b></label>
                <input id="password" type="password" placeholder="Enter Password" name="psw" required>
                <button id="logIn" onclick="doInit('logIn')"></button>
            </span>`
        );
    updateViewLogin();
}

function createProductView() {
    var main = document.getElementById("main-window");
    main.innerHTML = "";

    main.insertAdjacentHTML('beforeend',
        '<div class="product-flex">'+
            '<div id="filter-window"></div>'+
            '<div id="product-window"></div>'+
            '<div id="shopping-cart-window" ondrop="dropHandler(event)" ondragover="dragoverHandler(event)"></div>'+
        '</div>'
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
            msg = dict[language]["product-manager-check-input"];
        }
    }

    if (findProductByID(articleid) != null){
        msg += dict[language]["product-manager-check-id"];
        passed = false;
    }

    if (category != dict.mainCategory[0] && category != dict.mainCategory[1] 
        &&  category != dict.mainCategory[2] && category != dict.mainCategory[3]) {
        msg += dict[language]["product-manager-check-category"];
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
    $("#product-manager-success-msg").text(name + dict[language]["product-manager-success-msg"]).fadeIn();     
    setTimeout(function() { $("#product-manager-success-msg").fadeOut(); }, 3000);
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
    document.getElementById("product-info-img").setAttribute("src", product.img);
    document.getElementById("product-info-name").innerText = product.name;
    document.getElementById("product-info-name2").innerText = product.name2;
    document.getElementById("product-info-desc").innerText = product.serves + " " + product.volume;
    document.getElementById("product-info-price").innerText = product.pricewithvat + " kr";
    document.getElementById("product-info-alcohol").innerText = product.alcoholcontent;
    document.getElementById("product-info-category").innerText = category;
    document.getElementById("product-info-type").innerText = product.productgroup;
    document.getElementById("product-info-producent").innerText = product.producent;
    document.getElementById("product-info-articleid").innerText = product.articleid;

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
    productContainer.id = name;

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

