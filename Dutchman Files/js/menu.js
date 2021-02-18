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
        productWindow.appendChild(createProductContainer(bevType[i].name, bevType[i].pricewithvat, bevType[i].img));
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
                    productWindow.appendChild(createProductContainer(bevType[j].name, bevType[j].pricewithvat, bevType[j].img));
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


function createProductContainer(name, price, imgSrc) {
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
    productName.className = "product-name";
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
    productBuy.appendChild(document.createTextNode("Köp"));

    var productPrice = document.createElement("span");
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

