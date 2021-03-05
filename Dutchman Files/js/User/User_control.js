// =====================================================================================================
// Control
// =====================================================================================================
// Call the appropriate functions.
// And updates the model with the result, and then updates the view from the model.
// =====================================================================================================

function doInit(func) {

    if (func == 'logIn') {
  
        username    = document.getElementById('username');
        password    = document.getElementById('password');
        credentials = logIn(username.value, password.value);
            
        if (credentials == 3) {
            $("#login").hide();
            logInVip();
        } else if (credentials == 0) {
            $("#login").hide();
            logInStaff();
        } else {
            logInUnsuccess();
        }
    };

    if (func == 'logOut' || func == 'staffLogO') {

        logOut();   // restore data in modeldata
        reset();    // restore the view
    };

    if (func == 'addToAcc') {

        userName    = document.getElementById('adToAccUsername');   
        newAmount   = document.getElementById('addAmount');
        var changed = addBalance(userName.value, newAmount.value);          // TODO: Error checka så att vi inte kan lägga in en sträng som new amount.
        $("#innerDisplay").text(changed + " SEK").fadeIn();                 // TODO: use dictionary for SEK
        setTimeout(function() { $("#innerDisplay").fadeOut(); }, 3000);
    };

    if (func == 'vipOrder') {
        alert("vip");
        drinkId     = document.getElementById('drinkId').value;   
        drinkAmount = document.getElementById('drinkAmount').value;
        if (vipOrder(drinkId, drinkAmount)) {
            var combination = getComLock();
            $("#innerDisplay").text("Your code for the fridge: " + combination).fadeIn();
            balance = getAccountBalance();
            //$("#innerDisplay").html(createSpan("balance","","") + createSpan("balanceNumber", "", " : " + balance));
            $("#balanceNumber").text(" : " + balance); 
            updateViewIds("login-vip");
        }
    };

    if (func == 'addToCart') {
    
        drinkId     = document.getElementById('stdDrinkId').value;   
        drinkAmount = document.getElementById('stdDrinkAmount').value;
        if (addToCart(drinkId, drinkAmount)) {
            var showCart = getCart();
            $("#innerDisplay").text(showCart);
        }
    };

    if (func == 'stdOrder') {

        stdOrder();
        var showCart = getCart();
        $("#innerDisplay").text(showCart);
    };

    if (func == 'completeOrder') {

        OrderId = parseInt(document.getElementById('completeOrderId').value); 
        if (completeOrder(OrderId)) {
            var showOrder = getOrders();
            $("#innerDisplay").text(showOrder); 
        }
    }
}

function logInVip() {

    $("#logInForm").hide(); 
    $("#display").html(createVipLogIn());
    balance = getAccountBalance();
    $("#balanceDisplay").html(createSpan("balance","","") + createSpan("balanceNumber", "", " : " + balance));

    updateViewIds("login-vip");

}

function logInStaff() {

    $("#logInForm").hide(); 
    $("#manager").show();
    $("#display").html(createStaffLogIn()).show();

    var showOrder = getOrders();
    $("#innerDisplay").text(showOrder); 
    updateViewIds("login-staff");

    //update_view();
}

function logInUnsuccess() {

    $("#message").html(createSpan("log_in_unsuccess_msg","",""));
    $("#message").fadeIn();
    updateViewIds("login-ids");
    //update_view();
    setTimeout(function() { $("#message").fadeOut(); }, 3000);
}

function reset() {

    $("#vip").hide();
    $("#manager").hide();
    $("#staff").hide();
    $("#display").html("");
    $("#logInForm").fadeIn(); 
    $("#login").fadeIn();
    //update_view();
}

/*
function update_view() {

    keys = Userdict['keys'];
    for (idx in keys) {
        key = keys[idx];
        $("#" + key).text(get_string(key));
    };
}

// We don't update the view the first time until the document is ready
// loading.
//
$(document).ready(function() {
    update_view();
})  */
// ===========================================================================
// END OF FILE
// ===========================================================================
