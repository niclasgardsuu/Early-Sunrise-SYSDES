// =====================================================================================================
// Table Control
// =====================================================================================================
// Call the appropriate functions.
// And updates the model with the result, and then updates the view from the model.
// =====================================================================================================

function doInit(func) {

    if (func == 'logIn') {

        username    = document.getElementById('username');
        password    = document.getElementById('password');
        console.log(username);
        credentials = logIn(username.value, password.value);
            
        if (credentials == 3) {
            logInVip();
        } else if (credentials == 0) {
            logInStaff();
        } else {
            logInUnsuccess();
        }
    };

    if (func == 'logOut') {
        logOut();
        reset();
    };

    if (func == 'balance') {
        balance = getAccountBalance();
        $("#display").text(balance + " SEK").fadeIn();
        setTimeout(function() { $("#display").fadeOut(); }, 3000);
    };

    if (func == 'addToAcc') {
        userName    = document.getElementById('adToUsername');
        newAmount   = document.getElementById('newAmount').value;
        var changedAmount = changeBalance(userName, newAmount);
        console.log("Input username: " + userName + "Input amount: " + newAmount + "return value : " + changedAmount);        
    };
}

function logInVip() {

    $("#display").text(dict['log_in_success_msg']).fadeIn();
    setTimeout(function() { $("#display").fadeOut(); }, 3000);

    $("#account").hide(); 
    $("#vip").show(); 
}

function logInStaff() {

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

    $("#vip").hide(); 
    
    $("#userN").text(dict['userN']);
    $("#passW").text(dict['passW']);
    $("#logIn").text(dict['log']);

    $("#balance").text(dict['balance']);
    $("#order").text(dict['order']);
    $("#sdrink").text(dict['sdrink']);
    $("#pay").text(dict['pay']);
    $("#logO").text(dict['logO']);
    $("#logO2").text(dict['logO2']);

    $("#addToAcc").text(dict['addToAcc']);
    $("#addToAcc").text(dict['addToAcc']);
    $("#staff").hide(); 
    

})

// ===========================================================================
// END OF FILE
// ===========================================================================
