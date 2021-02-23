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
        } else if (credentials == 0) {
            logInStaff();
        } else {
            logInUnsuccess();
        }
    };

    if (func == 'logOut' || func == 'staffLogO') {                  // TODO: reset all or not ?
        logOut();
        reset();
    };

    if (func == 'balance') {
        balance = getAccountBalance();
        $("#display").text(balance + " SEK").fadeIn();              // TODO: use dictionary for SEK
        setTimeout(function() { $("#display").fadeOut(); }, 3000);
    };

    if (func == 'addToAcc') {
        userName    = document.getElementById('adToAccUsername');   
        newAmount   = document.getElementById('addAmount');
        var changed = addBalance(userName.value, newAmount.value);  // TODO: Error checka så att vi inte kan lägga in en sträng som new amount.
        $("#display").text(changed + " SEK").fadeIn();              // TODO: use dictionary for SEK
        setTimeout(function() { $("#display").fadeOut(); }, 3000);
    };
}

function logInVip() {

    $("#display").text(dict['log_in_success_msg']).fadeIn();
    setTimeout(function() { $("#display").fadeOut(); }, 3000);

    $("#account").hide(); 
    $("#vip").show(); 
}

function logInStaff() {

    $("#display").text(dict['log_in_success_msg']).fadeIn();
    setTimeout(function() { $("#display").fadeOut(); }, 3000);

    $("#account").hide(); 
    $("#staff").show(); 
}

function logInUnsuccess() {
    $("#display").text(dict['log_in_unsuccess_msg']).fadeIn();
    setTimeout(function() { $("#display").fadeOut(); }, 3000);
}

function reset() {
    location.reload(true);
}

// ===========================================================================
// INITIALIZATION OF HTML AND MODEL DATA.
// ===========================================================================
// This construct ensures that the document is finished loading before
// the code below is executed. 
// ===========================================================================

$(document).ready(function() {
    
    // Log In
    $("#userN").text(dict['userN']);
    $("#passW").text(dict['passW']);
    $("#logIn").text(dict['log']);

    // VIP
    $("#vip").hide(); 
    $("#balance").text(dict['balance']);
    $("#sdrink").text(dict['sdrink']);
    $("#logO").text(dict['logO']);

    // Staff
    $("#staff").hide(); 
    $("#adToAccUserN").text(dict['adToAccUserN']);
    $("#newA").text(dict['newA']);
    $("#addToAcc").text(dict['addToAcc']);
    $("#staffLogO").text(dict['staffLogO']);

    // All Customer
    $("#pay").text(dict['pay']);
    $("#order").text(dict['order']);
    
})

// ===========================================================================
// END OF FILE
// ===========================================================================
