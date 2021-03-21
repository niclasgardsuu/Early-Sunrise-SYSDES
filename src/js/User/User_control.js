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
 * Provide the control view for the Vip account balance
*/
function showBalance() {
    balance = getAccountBalance();
    
    $("#innerDisplay").text(balance).fadeIn();
    setTimeout(function() { $("#innerDisplay").fadeOut(); }, 3000);
}

/**
 * Adding an amount to the Vip account balance
*/
function addToAcc() {

    userName  = document.getElementById('adToAccUsername');   
    newAmount = document.getElementById('addAmount');
    changed   = addBalance(userName.value, newAmount.value);
}

/**
 * Control the log in view for Vip
*/
function logInVip() {
    document.getElementById("product-info-hide").checked = false;
    $("#loginDisplay").html("");
    $("#loginDisplay").html(createVipLogIn());
    updateViewUser();
}

/**
 * Control the view for the log in for staff and manager
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
 *  Alerts the user if the password or username was entered incorrectly
*/
function logInUnsuccess() {

    alertBox(getString("log_in_unsuccess_msg"));
    updateViewUser();
}

/**
 *  Log the user out from the website and reset the view to the customer veiw
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