// =====================================================================================================
// Control and View Control for User 
// =====================================================================================================
// Call the appropriate functions.
// And updates the model with the result, and then updates the view from the model.
// =====================================================================================================

/**
 * Get into log in process
*/
function toLogIn() {

    username    = document.getElementById('username');
    password    = document.getElementById('password');
    logIn(username.value, password.value);
}

/**
 * Provide the view control for the vip account balance
*/
function balance() {
    balance = getAccountBalance();
    $("#innerDisplay").text(balance).fadeIn();
    setTimeout(function() { $("#innerDisplay").fadeOut(); }, 3000);
}

/**
 * For adding an amount to the Vip account balance
*/
function addToAcc() {

    userName  = document.getElementById('adToAccUsername');   
    newAmount = document.getElementById('addAmount');
    changed   = addBalance(userName.value, newAmount.value);
    $("#innerDisplay").text(changed).fadeIn();
    setTimeout(function() { $("#innerDisplay").fadeOut(); }, 3000);
}

/**
 * 
*/
function vipOrder() {
    productId     = document.getElementById('productId').value;   
    productAmount = document.getElementById('productAmount').value;
    if (vipOrder(productId, productAmount)) {
        var combination = getComLock();
        $("#innerDisplay").text("Your code for the fridge: " + combination).fadeIn();
    }
}

/**
 * 
*/
function addToCart() {
    productId     = document.getElementById('stdDrinkId').value;   
    productAmount = document.getElementById('stdDrinkAmount').value;
    if (addToCart(productId, productAmount)) {
        var showCart = getCart();
        $("#innerDisplay").text(showCart);
    }
}

/**
 * 
*/
function stdOrder() {
    stdOrder();
    var showCart = getCart();
    $("#innerDisplay").text(showCart);
}

/**
 * 
*/
function logInVip() {
    document.getElementById("product-info-hide").checked = false;
    $("#loginDisplay").html("");
    $("#loginDisplay").html(createVipLogIn());
    updateViewUser();
}

/**
 * 
*/
function logInStaff() {

    document.getElementById("product-info-hide").checked = false;
    $("#loginDisplay").html("");
    $("#loginDisplay").html(createSpanEvent("logOut","cursor","","logOut()") +
                            createSpanEvent("manager","cursor","","createManagerView()")+
                            createSpanEvent("bartender","cursor","","createBartenderView()")+
                            createSpanEvent("notify-security", "cursor", "", "window.location.href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'"));

    if (theLowestInStock(5).length != 0) {
        alertBox(getString("less-than-five-warning"));
    } 

    if(OrderDB.all_orders.length != 0) {
        alertBox(getString("order-notification"));
    }

    updateViewUser();
}

/**
 * 
*/
function logInUnsuccess() {

    alertBox(getString("log_in_unsuccess_msg"));
    updateViewUser();
}

/**
 * 
*/
function logOut() {
    $("#loginDisplay").html("");
    $("#loginDisplay").html(createSpanEvent("login", "cursor", "", "createLoginView()"));
    toLogOut();
    createMainCategory();
    updateViewAllProducts();
}

// ===========================================================================
// END OF FILE
// ===========================================================================