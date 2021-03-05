// =====================================================================================================
// Control
// =====================================================================================================
// Call the appropriate functions.
// And updates the model with the result, and then updates the view from the model.
// =====================================================================================================

function doInit(func) {

    if (func == 'logIn') {
        
        $("#login").hide();

        username    = document.getElementById('username');
        password    = document.getElementById('password');
        credentials = logIn(username.value, password.value);
            
        if (credentials == 3) {
            logInVip();
        } else if (credentials == 0) {
            logInStaff();
        } else {
            logInUnsuccess();
        }
    };

    if (func == 'logOut' || func == 'staffLogO') {

        logOut();   // restore data in modeldata
        reset();    // restore the view
    };

    if (func == 'balance') {

        balance = getAccountBalance();
        $("#innerDisplay").text(balance + " SEK").fadeIn();                 // TODO: use dictionary for SEK
        setTimeout(function() { $("#innerDisplay").fadeOut(); }, 3000);
    };

    if (func == 'addToAcc') {

        userName    = document.getElementById('adToAccUsername');   
        newAmount   = document.getElementById('addAmount');
        var changed = addBalance(userName.value, newAmount.value);          // TODO: Error checka så att vi inte kan lägga in en sträng som new amount.
        $("#innerDisplay").text(changed + " SEK").fadeIn();                 // TODO: use dictionary for SEK
        setTimeout(function() { $("#innerDisplay").fadeOut(); }, 3000);
    };

    if (func == 'vipOrder') {

        drinkId     = document.getElementById('drinkId').value;   
        drinkAmount = document.getElementById('drinkAmount').value;
        if (vipOrder(drinkId, drinkAmount)) {
            var combination = getComLock();
            $("#innerDisplay").text("Your code for the fridge: " + combination).fadeIn();
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
    update_view();
}

function logInStaff() {

    $("#logInForm").hide(); 
    $("#manager").show();
    $("#display").html(createStaffLogIn()).show();

    var showOrder = getOrders();
    $("#innerDisplay").text(showOrder); 

    update_view();
}

function logInUnsuccess() {

    $("#display").html(createSpan("log_in_unsuccess_msg","",""));
    $("#display").fadeIn();
    update_view();
    setTimeout(function() { $("#display").fadeOut(); }, 3000);
}

function reset() {

    $("#vip").hide();
    $("#manager").hide();
    $("#staff").hide();
    $("#display").html("");
    $("#logInForm").fadeIn(); 
    $("#login").fadeIn();
    update_view();
}

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
})  
// ===========================================================================
// END OF FILE
// ===========================================================================
