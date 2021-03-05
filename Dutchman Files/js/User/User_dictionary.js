// ===========================================================================
// Dictionary
// ===========================================================================

var language = 'en'

Userdict = {

    "mainCategory": ["beer","spirits","wine","non-alcoholic"],

    'keys' : [ 
        'start_username',
        'log_in_success_msg',
        'log_in_unsuccess_msg',

        // Log In
        'logIn',
        'userN',
        'passW',
        'log',

        // VIP
        'balance',
        'sdrink',
        'logOut',
        'drinkAmount',
        'vipOrder',
        'drinkId',
        
        // Staff
        'adToAccUserN',
        'addA',
        'addToAcc',
        'staffLogO',
        'completeOrderId',
        'completeOrder',
    
        // All Customer
        'stdOrder',
        'stdDrinkId',
        'stdDrinkAmount',
        'addToCart'
    ],        
                                   
                                   
    'en': {
        'logIn'                : "Log In",
        'start_username'       : "None",
        'log_in_success_msg'   : "Successful login",
        'log_in_unsuccess_msg' : "Unsuccessful login",
    
        // Log In
        'userN'                : "Username:",
        'passW'                : "Password:",
        'log'                  : "Log In",
    
        // VIP
        'balance'              : "Account Balance",
        'sdrink'               : "Special Drink",
        'logOut'               : "Log Out",
        'drinkAmount'          : "Drink Amount",
        'vipOrder'             : "Vip Order",
        'drinkId'              : "Drink ID",
        
        // Staff
        'adToAccUserN'         : "Username",
        'addA'                 : "Add Amount",
        'addToAcc'             : "Add to account",
        'staffLogO'            : "Log Out",
        'completeOrderId'      : "Order Id",
        'completeOrder'        : "Complete Order",
       
        // All Customer
        'stdOrder'             : "Order",
        'stdDrinkId'           : "Drink ID",
        'stdDrinkAmount'       : "Amount",
        'addToCart'            : "Add to cart",

        // Find products
        "beer"                 : "beer",
        "spirits"              : "spirits",
        "wine"                 : "wine",
        "non-alcoholic"        :"non-alcoholic"
    },

    'sv': { //TODO: Add Swedish

        // Find products
        "beer"                 :"öl",
        "spirits"              :"sprit",
        "wine"                 :"vin",
        "non-alcoholic"        :"alkoholfritt"
    }
    
}

function get_string(key) {
    return Userdict[language][key];
}

function change_lang() {
    if (language=='en') {
        language = 'sv';
    } else {language = 'en'};
    update_view();
}

// ==========================================================================
// END OF FILE
// ==========================================================================

