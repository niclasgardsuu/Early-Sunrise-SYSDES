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
    modelData['username'] = dict['start_username'];
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
}

function setTable(tableId) {
    
    modelData['tableNumber'] = tableId; // TODO: input
}

function vipOrder(beerId, amount, position) {

    username = modelData['username'];

    var totalAmount = 0;
    var vipOrderId;

    for (i = 0; i < OrderDB.vip.length; i++) {   
        if (OrderDB.vip[i].username == username) {
            
            vipOrderId = OrderDB.vip[i].order_id; 

            if (vipOrderId == "") { // Create new order

                OrderDB.vip[i].order_id = parseInt(modelData['orderCounter']);
                incrementOrder();
               
                for (j = 0; j < OrderDB.all_orders.length; j++) {   

                    if (OrderDB.all_orders[j].order_id == "") {

                        orderId = vipOrderId;
                        OrderDB.all_orders[j].beer_id.push(beerId);
                        OrderDB.all_orders[j].amount.push(amount);
                        OrderDB.all_orders[j].position = modelData['tableNumber']; //TODO: Funktion för att ändra bord
                    }
                }
                totalAmount = calculateCost(beerId, amount);
                vipPay(totalAmount);
            }
        }
    }
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

// Calculates total cost of 1 or more of an item
function calculateCost(drinkId, amount) {
    var totalAmount = 0;
    var getPrice    = findProductByID(drinkId).pricewithvat;
    totalAmount     = getPrice * amount;
    return totalAmount;
}

function findUserId(userName) {

    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            return DB.users[i].user_id;
        }
    }
}

// Handle payment for VIP customers fdsgd
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
