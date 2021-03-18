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
            logInVip();
        } else if (credentials == 0 ) {
            logInStaff();
        } else {
            logInUnsuccess();
        }
    };

    if (func == 'logOut') {

        logOut();   // restore data in modeldata
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

        productId     = document.getElementById('productId').value;   
        productAmount = document.getElementById('productAmount').value;
        if (vipOrder(productId, productAmount)) {
            var combination = getComLock();
            $("#innerDisplay").text("Your code for the fridge: " + combination).fadeIn();
        }
    };

    if (func == 'addToCart') {
    
        productId     = document.getElementById('stdDrinkId').value;   
        productAmount = document.getElementById('stdDrinkAmount').value;
        if (addToCart(productId, productAmount)) {
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
    document.getElementById("product-info-hide").checked = false;
    $("#loginDisplay").html("");
    $("#loginDisplay").html(createVipLogIn());
    updateViewUser();
}

function logInStaff() {

    document.getElementById("product-info-hide").checked = false;
    $("#loginDisplay").html("");
    $("#loginDisplay").html(createSpanEvent("logOut","cursor","","logOut()") +
                            createSpanEvent("manager","cursor","","createManagerView()")+
                            createSpanEvent("bartender","cursor","","createBartenderView()")+
                            createSpanEvent("notify-security", "cursor", "", "window.location.href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'"));


    var showOrder = getOrders();
    $("#innerDisplay").text(showOrder); 

    if (theLowestInStock(5).length != 0) {
        alertBox(getString("less-than-five-warning"));
    }

    updateViewUser();
}

function logInUnsuccess() {

    alertBox(getString("log_in_unsuccess_msg"));
    updateViewUser();
}

// ===========================================================================
// END OF FILE
// ===========================================================================
