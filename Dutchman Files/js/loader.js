// =====================================================================================================
// Loader - API functions for the Flying Dutchman data base.
// =====================================================================================================

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

/**
 *  Increment the order number by one and update it in the modeldata
 * @returns {number} an incremented order number
*/
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
                        "order_id": OrderDB.all_orders[i].order_id,
                        "username": OrderDB.all_orders[i].username
                    };     
            OrderDB.cart = order; 
            var table = OrderDB.all_orders[i].table; 
            //Remove from all orders
            OrderDB.all_orders.splice(i, 1);
            updateViewAllProducts();
            updateShoppingCartView();
            document.getElementById("table-number-select").value = table;
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
 * @returns {Array} true if the orer is successful, otherwise false
*/
function stdOrder() {
    
    var username;
    if(OrderDB.cart.username == null) {
        username = modelData["username"];
    } else {
        username = OrderDB.cart.username;
    }
            

    sucessful = false;
    var tableSelect = document.getElementById("table-number-select");
    var tableNumber = tableSelect.options[tableSelect.selectedIndex].value;
    console.log(tableNumber);



    if ( tableNumber == "" || tableNumber < 0 || tableNumber > 10) {
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

    var obj = { "username": username,
                "order_id": order_id,
                "productId": OrderDB.cart.productId,
                "productAmount": OrderDB.cart.productAmount,
                "price": OrderDB.cart.price,
                "totalPrice" : OrderDB.cart.totalPrice,
                "table": tableNumber,
                "status": "pending" 
            };     
    OrderDB.all_orders.push(obj);

    if (modelData["credentials"] == 3) {
        vipPay();
    }

    if(username != "none") {
        for(var i = 0; i < OrderDB.cart.productId.length; i++) {
            for(var j = 0; j < drunk["secret"].length; j++) {
                if(OrderDB.cart.productId[i] == drunk["secret"][j].articleid) {
                    alertBox(getString("your-secret-code") + getComLock());
                }
            }
        }
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

    if (OrderDB.cart.productId.length == 0) {
        alertBox(getString("empty-cart-error"));
        return;
    }
    console.log("hur många gånger?");
    var drinkList = OrderDB.cart.productId;
    var amountList = OrderDB.cart.productAmount;

    for (var i = 0; i < drinkList.length; i++) {
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

/**
 * Removes an order from the system without completing it/affecting the stock
 * @param {Object} order the current order that is being handled order
*/
function removeOrder(order) {
    console.log(order);
    for (var i = 0; i < order.productId.length; i++) {
        changeStock(order.productId[i], order.productAmount[i]);
    }
    console.log(order);
    addBalance(order.username,order.totalPrice);
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
            OrderDB.accounting.income += OrderDB.all_orders[i].totalPrice;
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
            console.log(productId);
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

/**
 * Gets a combination lock for the frigde
 * @returns {number} a combination lock
*/
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

/**
 * Add new balance to a vip account balance
 * @param {string} userName a username
 * @param {number} amount an amount
 * @returns {number} a new account balance
*/
function addBalance(userName, amount) {
        
    if(!isNaN(amount)) {
    
        // We use this variable to store the userID, since that is the link between the two data bases.
        var userID;

        // First we find the userID in the user data base.
        for (i = 0; i < DB.users.length; i++) {
            if (DB.users[i].username == userName) {
                userID = DB.users[i].user_id;
            }
        }
        alertBox(userID);
        // Then we match the userID with the account list.
        // and change the account balance.
        for (i = 0; i < DB.account.length; i++) {   
            if (DB.account[i].user_id == userID) {
                DB.account[i].creditSEK = parseInt(DB.account[i].creditSEK) + parseInt(amount);   // This changes the value in the JSON object.
                return DB.account[i].creditSEK;
            }
        }
    }
}

/**
 *  This function will sort all orders so that every order will map 
 *  to a specific table
 * @returns {Array} the list of all orders for that specific table 
*/
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

/**
 * This function will get all objects that has a stock number lower than the number inside the parameter
 * @param {number} number the number that will be used to determine what the lowest stock is
 * @returns {Array} an array with the lowest in stock objects
*/
function theLowestInStock(number) {
    var result = [];
    for (i in dict.mainCategory) {
        for (j in drunk[dict.mainCategory[i]]) {
            if (drunk[dict.mainCategory[i]][j].stock < number) {
                result.push(drunk[dict.mainCategory[i]][j]);
            }
        }
    }
    return result;
}

/**
 *  Gets the position of where an item is in the shopping cart
 * @param {*} cart the shopping cart
 * @param {*} id the id of the product
 * @returns {number} the index of the program, or -1 if it f
 */
function indexOfCartProduct(cart,id) {
    for(var i = 0; i < cart.length; i++) {
        if(cart[i].id == id) return i;
    }
    return -1;
}

/**
 *  Finds a product object from its ID
 * @param {number} id the id of the product
 * @returns {object} the product
 */
function findProductByID(id) {
    dict.mainCategory.push("secret");
    for (var i = 0; i < dict.mainCategory.length; i++) {
        for (var j = 0; j < drunk[dict.mainCategory[i]].length; j++) {
            if (drunk[dict.mainCategory[i]][j].articleid == id) {
                var product = drunk[dict.mainCategory[i]][j];
                dict.mainCategory.pop();
                return product;
            }
        }
    } 
    dict.mainCategory.pop();
    return null;
}

/**
 *  Get allergens of a specific product
 * @param {number} id 
 * @returns {string} allergens of a specific product
 */
function getAllergens(id) {
    for (var i = 0; i < allergensDB.products.length; i++) {
        if (allergensDB.products[i].articleid == id) {
            return allergensDB.products[i].allergens;
        }
    }
    return null;
}

/**
 *  This function will fetch all the different sub categories of a specific main category
 * @param {string} category the main category
 * @returns {array} an array of all the sub categories
*/
function getFilter(category) {
    var filter = [];
    for (var i = 0; i < drunk[category].length; i++) {
        if (!filter.includes(drunk[category][i].productgroup)) {
            filter.push(drunk[category][i].productgroup);
        }
    }
    return filter;
}

/**
 *  This function will calculate profit by comparing expenses and incomes
 * @returns {number} the profit
 */
function calculateProfit() {
    var profit = OrderDB.account.income - OrderDB.accounting.expenses;
    return profit;
}

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
