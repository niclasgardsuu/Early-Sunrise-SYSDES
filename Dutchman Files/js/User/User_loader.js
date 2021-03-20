// =====================================================================================================
// Loader
// =====================================================================================================


/**
 *  The function give an access into the log in process
 * @param {string} userName the username of the user account
 * @param {string} passWord the password of the user account
*/
function logIn(userName, passWord) {

    for (i = 0; i < DB.users.length; i++) {

        if(DB.users[i].username == userName) {
            if(DB.users[i].password == passWord) {
                //add secret to menu
                dict.mainCategory.push("secret");
                createMainCategory();
                // store the username in modelData
                modelData['username']    = userName;
                modelData['credentials'] = DB.users[i].credentials;
                modelData['userID']      = DB.users[i].user_id;
                credentials              = DB.users[i].credentials;
        
                if (credentials == 3) {
                    logInVip();
                    return;
                } else if (credentials == 0 ) {
                    logInStaff();
                    return;
                }
            } else {
                logInUnsuccess();
                return;
            }
        }
    }
    logInUnsuccess();
}

/**
 *  The function give an access into the log out process
*/
function toLogOut() {
    modelData['username']    = dict['start_username'];
    modelData['credentials'] = null;
    //remove secret
    dict.mainCategory.pop();
}

function incrementOrder() {
    
    modelData['orderCounter'] += 1;
    return modelData['orderCounter'];
}

/**
 *  This function will check if a product has enough stock to be added to the cart
 * @param {number} productId id of the product
 * @param {number} productAmount how many of the product you want to add to the shopping cart
 * @returns {boolean} true if there is enough stock to be added
*/
function checkAddToCart(productId, productAmount) {
    var previousAmount = findProductByID(productId).stock; 
    if (previousAmount - productAmount < 0) {
        return false; 
    } 
    return true;
}

/**EXAMPLE! javadoc jsdoc jdoc
    skriv din fina beskrivning
    @param
    @returns
    {string}
    {number}
    {boolean}
    {Object}
    {*} - any type
*/

/**
 *  This function will add a product to the shopping cart 
 * @param {number} productId id of the product
 * @param {number} productAmount how many of the product you want to add to the shopping cart
 * @returns {boolean} true if the addition is successful, otherwise false
*/
function addToCart(productId, productAmount) {
    
    var successful = false;

    var currentMaxAmount = OrderDB.cart.maxAmount - parseInt(productAmount);

    if (currentMaxAmount < 0) {
        alertBox(getString("max-order-error"));
        return successful;
    }

    if ((isNaN(productId) || isNaN(productAmount) || (parseInt(productAmount) <= 0))) { // Error check on input
        updateShoppingCartView();
        alertBox(getString("unknown-error"));
        return successful;
    }

    if (!checkAddToCart(productId, productAmount)) {
        alertBox(getString("stock-empty-error"));
        return successful;
    }

    if (!changeStock(productId, -Math.abs(productAmount))) { 
        alertBox(getString("unknown-error"));
        return successful;
    }

    OrderDB.cart.maxAmount = currentMaxAmount;
    for (id in OrderDB.cart.productId) {
        if(OrderDB.cart.productId[id] == productId) {
            OrderDB.cart.productAmount[id] += productAmount;
            OrderDB.cart.totalPrice += calculateCost(productId, productAmount);
            updateShoppingCartView();
            return true;
        }
    }

    OrderDB.cart.productId.push(productId);
    OrderDB.cart.productAmount.push(productAmount);
    OrderDB.cart.price.push(findProductByID(productId).pricewithvat);
    OrderDB.cart.totalPrice += calculateCost(productId, productAmount);
    OrderDB.cart.order_id = null;
    successful = true; 

    


    updateShoppingCartView();
    return successful;
}


/**
 * Calculate total amount of products in the cart
 * @param {number} amount array of all separate product amounts
 * @returns {number} total amount of products
*/
function calculateAmount(amount) {
    var result = 0;
    for(var i = 0; i < amount.length; i++) {
        result += amount[i];
    }
    return result;
}


/**
 * Puts an order back into the cart for editing 
 * @param {number} id The ID of the order
*/
function revertOrder(id) {
    for (i = 0; i < OrderDB.all_orders.length; i++) {
        if(OrderDB.all_orders[i].order_id == id) {
            var order = { 
                        "productId": OrderDB.all_orders[i].productId,
                        "productAmount": OrderDB.all_orders[i].productAmount,
                        "price": OrderDB.all_orders[i].price,
                        "totalPrice" : OrderDB.all_orders[i].totalPrice,
                        "table": OrderDB.all_orders[i].table,
                        "maxAmount": 10-calculateAmount(OrderDB.all_orders[i].productAmount),
                        "order_id": OrderDB.all_orders[i].order_id
                    };     
            OrderDB.cart = order; 
            var table = OrderDB.all_orders[i].table; 
            //Remove from all orders
            OrderDB.all_orders.splice(i, 1);
            updateViewAllProducts();
            updateShoppingCartView();
            document.getElementById("table-number-input").value = table;
            return;
        }
    }
}

/**
 * Removes a specific amount of a certain product from the shopping cart 
 * @param {number} productId id of the product
 * @param {number} count how many of the product you want to remove from the shopping cart
 * @returns {boolean} true if the removal is successful, otherwise false
*/
function removeFromCart(productId, count) {
    for (var i = 0; i < OrderDB.cart.productId.length; i++) {
        if (OrderDB.cart.productId[i] == productId) {
            if (OrderDB.cart.productAmount[i] - count < 0) {
                return false;
            }
            OrderDB.cart.productAmount[i] -= count;
            var removePrice = parseFloat(OrderDB.cart.price[i]) * count;
            OrderDB.cart.totalPrice -= removePrice;
            OrderDB.cart.maxAmount++;
            if (OrderDB.cart.productAmount[i] == 0) {
                OrderDB.cart.productId.splice(i, 1);
                OrderDB.cart.productAmount.splice(i, 1);
                OrderDB.cart.price.splice(i, 1);
            }
            changeStock(productId, count);
            updateShoppingCartView();
        }
    }
    return true;
}

/**
 * Used to make an order to the bar, based on the shopping carts current content
 * @returns {boolean} true if the orer is successful, otherwise false
*/
function stdOrder() {
    
    sucessful = false;
    var tableNumber = document.getElementById("table-number-input").value;
    if ( tableNumber == "" || tableNumber <= 0 || tableNumber > 10) {
        alertBox(getString("table-number-error"));
        return sucessful;
    }

    if (OrderDB.cart.productId.length == 0) {
        alertBox(getString("empty-cart-error"));
        return sucessful;
    }

    var order_id = OrderDB.cart.order_id;
    if (order_id == null) {
        order_id = incrementOrder();
    }

    var obj = { "order_id": order_id,
                "productId": OrderDB.cart.productId,
                "productAmount": OrderDB.cart.productAmount,
                "price": OrderDB.cart.price,
                "totalPrice" : OrderDB.cart.totalPrice,
                "table": document.getElementById("table-number-input").value,
                "status": "pending" 
            };     
    OrderDB.all_orders.push(obj);

    if (modelData["credentials"] == 3) {
        vipPay();
    }

    clearCart();
    updateShoppingCartView();
    sucessful = true;
    return sucessful;
}

/**
 *  This function will clear a cart from its contents, 
 *  we also choose to reset our undo-redo stack here for security purposes
*/
function clearCart() {

    OrderDB.cart = { "productId": [],
                     "productAmount": [],
                     "price": [],
                     "totalPrice": 0,
                     "table": "",
                     "maxAmount": 10,
                     "order_id": null};

    //To avoid eavesdroppers
    undostack = [];        
    redostack = [];        
}

/**
 *  This function will reset the shopping cart by removing all items from it, rendering it empty
*/
function resetCart() {

    if (OrderDB.cart.productId.length == 0) alertBox(getString("empty-cart-error"));
    
    var drinkList = OrderDB.cart.productId;
    var amountList = OrderDB.cart.productAmount;

    for (var i = 0; i < drinkList; i++) {
        changeStock(drinkList[i], amountList[i]);
    }

    OrderDB.cart = { "productId": [],
                     "productAmount": [],
                     "price": [],
                     "totalPrice": 0,
                     "table": "",
                     "maxAmount": 10,
                     "order_id": null};
}

//TODO: TA BORT DENNA
function getCart() {

    var cart = "";
    cart += ("Drink ID: " + OrderDB.cart.productId + 
                " Amount: " + OrderDB.cart.productAmount + 
                " Cost: " + OrderDB.cart.price + 
                " Total Cost: " + OrderDB.cart.totalPrice);
    return cart;
}

//TODO: TA BORT DENNA
function getOrders() {
    var orders = "";
    
    for (i = 0; i < OrderDB.all_orders.length; i++) {
        if(OrderDB.all_orders[i].status == "pending") {

            orders += ("Order ID: "    + OrderDB.all_orders[i].order_id + 
                       " Total Cost: " + OrderDB.all_orders[i].totalPrice + 
                       " Table: "      + OrderDB.all_orders[i].table + " ");
        }
    }  
    
    return orders;
}

/**
 * Removes an order from the system without completing it/affecting the stock
 * @param {Object} order the current order that is being handled order
*/
function removeOrder(order) {
    console.log(order);
    for (var i = 0; i < order.productId.length; i++) {
        changeStock(order.productId[i], order.productAmount[i]);
    }
    finishOrder(order.order_id);
}

/**
 * Completes an order, removing it from the list of orders
 * @param {number} orderId id of the order
 * @returns {boolean} true if the was successfully finished/handled, else false
*/
function finishOrder(orderId) {

    for (i = 0; i < OrderDB.all_orders.length; i++) {
        if(OrderDB.all_orders[i].order_id == orderId) {
            OrderDB.all_orders.splice(i, 1);
            createBartenderView();
            return true; 
        }
    }
    return false;  
}

/**
 * Changes the current stock for a certain product 
 * @param {number} productId id of the product
 * @param {number} productAmount how many of the product you want to add or remove
 * @returns {boolean} true if the change in stock was sucessfull, else false
*/
function changeStock (productId, productAmount) {
    var successfull = false;

    for (var i = 0; i < dict.mainCategory.length; i++) {
        for (var j = 0; j < drunk[dict.mainCategory[i]].length; j++) {
            console.log("varje iterering");
            if (drunk[dict.mainCategory[i]][j].articleid == productId) {
                console.log("hittade produkten");
                var stockAmount = drunk[dict.mainCategory[i]][j].stock;
                
                if (productAmount == null) {
                    productAmount = parseInt(document.getElementById("product-manager-stock").value);
                    stockAmount = 0;
                }
                
                var val = stockAmount + productAmount;
                console.log(val);
                if (val >= 0) {
                    drunk[dict.mainCategory[i]][j].stock = val;
                    console.log("den borde komma hit");
                    successfull = true;
                } 
            }
        }
    }
    return successfull; 
}

//TODO: TA BORT DENNA
/*
function vipOrder(beerId, amount) {

    username = modelData['username'];

    var totalAmount = 0;
    var vipOrderId;
    var successfull = false;

    for (i = 0; i < OrderDB.vip.length; i++) {   
        if (OrderDB.vip[i].username == username) {

            vipOrderId = OrderDB.vip[i].order_id; 

            if (vipOrderId == "") { // Create new order

                OrderDB.vip[i].order_id = incrementOrder();

                for (j = 0; j < OrderDB.all_orders.length; j++) {   

                    if (OrderDB.all_orders[j].order_id == "") {

                        orderId = vipOrderId;
                        OrderDB.all_orders[j].beer_id.push(beerId);
                        OrderDB.all_orders[j].amount.push(amount);
                        OrderDB.all_orders[j].position = modelData['tableNumber']; //TODO: Funktion för att ändra bord
                    }
                }
                totalAmount = calculateCost(beerId, amount);
                successfull = vipPay(totalAmount);
            }
        }
    }
    return successfull;
}
*/

/**
 * Calculates total cost of 1 or more of a certain item
 * @param {number} productId id of the product
 * @param {number} productAmount how many of the product you want to calculate for
 * @returns {number} the total cost of the specific amount of the product
*/
function calculateCost(productId, productAmount) {
    var totalAmount = 0;
    var getPrice    = findProductByID(productId).pricewithvat;
    totalAmount     = getPrice * productAmount;
    return parseFloat(totalAmount);
}


/**
 * Finds a userID for a specifik user
 * @param {string} userName the current userName
 * @returns {string} the userID that corresponds to the input userName
*/
function findUserId(userName) {

    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            return DB.users[i].user_id;
        }
    }
}

/**
 * Handles payment for drinks when a VIP customer is ordering
 * @returns {boolean} true if the payment is successful, otherwise false
*/
function vipPay() {
    
    var userID = modelData['userID'];
    var totalAmount = OrderDB.cart.totalPrice;
    for (i = 0; i < DB.account.length; i++) {
        if (DB.account[i].user_id == userID) {
            var accountBalance = DB.account[i].creditSEK;
            if(accountBalance >= totalAmount) {
                DB.account[i].creditSEK = parseInt(DB.account[i].creditSEK) - parseInt(totalAmount);
                return true;
            }
        }
    }
    return false;
}

function getComLock() { 
    return Math.floor(Math.random() * 1000);
}

/**
 * Gets the account balance for the currently logged in user
 * @returns {string} the current account balance 
*/
function getAccountBalance() {

    var userID;
    userName = modelData['username'];
    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            userID = DB.users[i].user_id;
        }
    }

    for (i = 0; i < DB.account.length; i++) {
        if (DB.account[i].user_id == userID) {
            return DB.account[i].creditSEK;
        }
    }
}

function addBalance(userName, newAmount) {

    // We use this variable to store the userID, since that is the link between the two data bases.
    var userID;

    // First we find the userID in the user data base.
    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            userID = DB.users[i].user_id;
        }
    }

    // Then we match the userID with the account list.
    // and change the account balance.
    for (i = 0; i < DB.account.length; i++) {   
        if (DB.account[i].user_id == userID) {
            DB.account[i].creditSEK = parseInt(DB.account[i].creditSEK) + parseInt(newAmount);   // This changes the value in the JSON object.
            return DB.account[i].creditSEK;
        }
    }
}

//TODO: TA BORT DENNA
/*
function decreaseStock (id, amount) {
    var successfull = false;
    for (var i = 0; i < dict.mainCategory.length; i++) {
        for (var j = 0; j < drunk[dict.mainCategory[i]].length; j++) {
            if (drunk[dict.mainCategory[i]][j].articleid == id) {
                var oldAmount = drunk[dict.mainCategory[i]][j].stock;
                if (oldAmount - amount >= 0) {
                    drunk[dict.mainCategory[i]][j].stock = oldAmount - amount;
                    successfull = true;
                } 
            }
        }
    }
    return successfull; 
}*/

//TODO: TA BORT DENNA
/*
function setTable(tableId) {
    
    modelData['tableNumber'] = tableId; // TODO: input
}
*/
// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
