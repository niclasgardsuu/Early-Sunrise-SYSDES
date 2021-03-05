// =====================================================================================================
// Loader
// =====================================================================================================

function logIn(userName, passWord) {

    for (i = 0; i < DB.users.length; i++) {

        if(DB.users[i].username == userName) {
            if(DB.users[i].password == passWord) {
                // store the username in modelData
                modelData['username'] = userName;
                return DB.users[i].credentials;
            } else {
                return (-1);
            }
        }
    }
    return (-1);
}

function logOut() {
    modelData['username'] = Userdict['start_username'];
}

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
    //
    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            userID = DB.users[i].user_id;
        }
    }

    // Then we match the userID with the account list.
    // and change the account balance.
    //
    for (i = 0; i < DB.account.length; i++) {   
        if (DB.account[i].user_id == userID) {
            DB.account[i].creditSEK = parseInt(DB.account[i].creditSEK) + parseInt(newAmount);   // This changes the value in the JSON object.
            return DB.account[i].creditSEK;
        }
    }
}

function incrementOrder() {
    
    modelData['orderCounter'] += 1;
    return modelData['orderCounter'];
}

function setTable(tableId) {
    
    modelData['tableNumber'] = tableId; // TODO: input
}

function addToCart(drinkId, drinkAmount) {
    
    var totalAmount = 0;
    var successfull = false;
    var table = modelData['tableNumber'];
    
    if ((isNaN(drinkId) || isNaN(drinkAmount) || (parseInt(drinkAmount) <= 0))) { // Error check on input
        return successfull;
    }

    var currentMaxAmount = OrderDB.cart.maxAmount - parseInt(drinkAmount);
    if(currentMaxAmount >= 0) {
        
        OrderDB.cart.drinkId.push(drinkId);
        OrderDB.cart.drinkAmount.push(drinkAmount);
        OrderDB.cart.price.push(findProductByID(drinkId).pricewithvat);
        OrderDB.cart.totalPrice += calculateCost(drinkId, drinkAmount);
        OrderDB.cart.maxAmount = currentMaxAmount;
        successfull = true; 
    } 
    return successfull;
}

function stdOrder() {
    
    var order_id = incrementOrder();
    var table = modelData['tableNumber'];
            var obj = { "order_id": order_id,
                        "drinkId": OrderDB.cart.drinkId,
                        "drinkAmount": OrderDB.cart.drinkAmount,
                        "price": OrderDB.cart.price,
                        "totalPrice" : OrderDB.cart.totalPrice,
                        "table": OrderDB.cart.table,
                        "status": "pending" 
                    };     
            OrderDB.all_orders.push(obj);
            resetCart();
}

function resetCart() {

    OrderDB.cart = { "drinkId": [],
                     "drinkAmount": [],
                     "price": [],
                     "totalPrice": 0,
                     "table": "",
                     "maxAmount": 10 };
}

function getCart() {

    var cart = "";
    cart += ("Drink ID: " + OrderDB.cart.drinkId + 
                " Amount: " + OrderDB.cart.drinkAmount + 
                " Cost: " + OrderDB.cart.price + 
                " Total Cost: " + OrderDB.cart.totalPrice);
    return cart;
}




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

function completeOrder(orderId) {

    for (i = 0; i < OrderDB.all_orders.length; i++) {
        if(OrderDB.all_orders[i].order_id == orderId) {
            OrderDB.all_orders[i].status = "complete";
            return true; 
        }
    }
    return false;  
}

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

function findProductByID(id) {
    for (var i = 0; i < Userdict.mainCategory.length; i++) {
        for (var j = 0; j < drunk[Userdict.mainCategory[i]].length; j++) {
            if (drunk[Userdict.mainCategory[i]][j].articleid == id) {
                return drunk[Userdict.mainCategory[i]][j];
            }
        }
    }
    return null;
}

// Calculates total cost of 1 or more of an item
function calculateCost(drinkId, amount) {
    var totalAmount = 0;
    var getPrice    = findProductByID(drinkId).pricewithvat;
    totalAmount     = getPrice * amount;
    return parseInt(totalAmount);
}

function findUserId(userName) {

    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            return DB.users[i].user_id;
        }
    }
}

// Handle payment for VIP customers 
function vipPay(totalAmount) {
    
    userName = modelData['username'];
    var userID = findUserId(userName);
    for (i = 0; i < DB.account.length; i++) {
        if (DB.account[i].user_id == userID) {
            var accountBalance = DB.account[i].creditSEK;
            if(accountBalance >= totalAmount) {
                DB.account[i].creditSEK = parseInt(DB.account[i].creditSEK) - parseInt(totalAmount);
                alert(parseInt(DB.account[i].creditSEK));
                return true;
            }
        }
    }
    return false;
}

function getComLock() { 
    return Math.floor(Math.random() * 1000);
}


// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
