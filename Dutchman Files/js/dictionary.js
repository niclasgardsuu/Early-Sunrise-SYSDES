// ==========================================================================
// We need to have a variable that controls which language to use.
// In this file we only show the simplest version of language change.
// How to do this with more than two languages, is left as an
// exercise.
//
var language = "sv"

// ==========================================================================
// The dictionary consists of a simple JSON structure. It also keeps
// track of the different keys that are available  for IDs.
//

dict = {
    "mainCategory": ["beer","spirits","wine","non-alcoholic"],
    "login-ids": 
    [
        "userN", 
        "passW",
        "logIn",
        "log_in_unsuccess_msg"
    ],
    "login-placeholder": 
    [
        "username", 
        "password",
    ],
    "bartender-ids": 
    [
        
    ],
    "bartender-classes": 
    [
        "bartender-table-h-0",
        "bartender-table-h-1",
        "bartender-table-h-2",
        "bartender-button-n-0",
        "bartender-button-n-1",
        "bartender-button-n-2",
        "bartender-total",
        "bartender-table-name",
        "bartender-order-name",
    ],
    "manager-ids": 
    [
        "product-manager-add",
        "product-manager-articleid",
        "product-manager-name",
        "product-manager-name2",
        "product-manager-pricewithvat",
        "product-manager-volume",
        "product-manager-productgroup",
        "product-manager-serves",
        "product-manager-origin",
        "product-manager-origincountry",
        "product-manager-producent",
        "product-manager-alcohol",
        "product-manager-img",
        "product-manager-stock",
        "product-manager-main-category",
        "product-manager-add-product",
        // Staff
        "adToAccUserN",
        "addA",
        "addToAcc",
        "staffLogO",
        "completeOrderId",
        "completeOrder"
    ],
    "userIds" : 
    [ 
        "manager",
        "bartender",
        "notify-security",
        "start_username",
        "log_in_success_msg",
        "log_in_unsuccess_msg",

        // Log In
        "logIn",
        "userN",
        "passW",
        "log",

        // VIP
        "balance",
        "sdrink",
        "logOut",
        "drinkAmount",
        "vipOrder",
        "drinkId",
            
        // All Customer
        "stdOrder",
        "stdDrinkId",
        "stdDrinkAmount",
        "addToCart"
    ], 
    "main-ids" : 
    [
        "login",
        "beer",
        "spirits",
        "wine",
        "non-alcoholic",
        "product-spec",
        "product-spec-alcohol",
        "product-spec-category",
        "product-spec-type",
        "product-spec-producent",
        "product-spec-origin",
        "product-spec-allergens",
        "product-spec-articleid",
        "product-stock-view", 
        "product-manager-refill",
        "product-manager",
        "product-manager-remove-product",
        "footnote-copyright-message",
        "checkout-order",
        "cancel-order",
        "table-number"
    ],       
    "pics" : [["flag-pic","flag-alt"]],              // keys for pictures
    "classes": ["product-buy"],
                                    // pictures have to be
                                    // handled in a special way.

    // We use one JSON substructure for each language. If we have
    // many different languages and a large set of strings we might
    // need to store a JSON file for each language to be loaded on
    // request.
    //
    "sv" : {
        "login": "Logga in",
        "beer":"Öl",
        "spirits":"Sprit",
        "wine":"Vin",
        "non-alcoholic":"Alkoholfritt",
        "product-buy": "Lägg i kundvagnen",
        "product-spec": "Specifikationer",
        "product-spec-alcohol": "Alkoholhalt",
        "product-spec-category": "Kategori",
        "product-spec-type": "Typ",
        "product-spec-producent": "Producent",
        "product-spec-origin": "Ursprung",
        "product-spec-allergens": "Allergener",
        "product-spec-articleid": "Artikel id",
        "product-manager": "Produkt chef",
        "product-stock-view": "Lager antal",
        "product-manager-refill": "Återfyll produkten",
        "product-manager-remove-product": "Ta bort produkten",
        "product-manager-add": "Lägg till produkt",
        "product-manager-articleid":"Artikel id",
        "product-manager-name":"Namn",
        "product-manager-name2":"Andra namnet",
        "product-manager-pricewithvat":"Pris inkl moms",
        "product-manager-volume":"Volym",
        "product-manager-productgroup":"Produkt grupp",
        "product-manager-serves":"Serveras som",
        "product-manager-origin":"Ursprung",
        "product-manager-origincountry":"Ursprungsland",
        "product-manager-producent":"Producent",
        "product-manager-alcohol":"Alkoholhalt",
        "product-manager-img":"Bild",
        "product-manager-stock": "Antal i lager",
        "product-manager-main-category": "Huvudkategori",
        "product-manager-add-product": "Lägg till produkt",
        "footnote-copyright-message": "Den flygande holländaren av © 2021 The Early Sunrise",
        "hello" : "Välkommen till denna lilla demonstration",
        "bye" : "Tack för besöket! Välkommen åter",
        "flag-pic" : "./img/sweden.svg",
        "flag-alt" : "Sverige flagga",
        "product-manager-success-msg": " blev tillagd",
        "product-manager-check-input": "Några inputs kan inte vara tomma, ",
        "product-manager-check-id": "Id finns redan, ",
        "product-manager-check-category": "Huvudkategori finns inte, ",
        "checkout-order": "KÖP",
        "cancel-order": "KÖP INTE",
        "table-number": "Bordsnummer: ",

        //bartender view 
        "bartender-table-h-0": "Dryck",
        "bartender-table-h-1": "Antal",
        "bartender-table-h-2": "Pris",
        "bartender-button-n-0": "Ändra order",
        "bartender-button-n-1": "Ta bort order",
        "bartender-button-n-2": "Avsluta order",
        "bartender-total": "Totalt",
        "bartender-table-name": "Bord: ",
        "bartender-order-name": "Order: ",


        "manager": "Chef",
        "bartender": "Bartender",
        "notify-security": "Meddela vakter",
        "logIn"                : "Logga in",
        "start_username"       : "Inget",
        "log_in_unsuccess_msg" : "Inloggingen misslyckades!",
    
        // Log In
        "userN"                : "Användarnamn",
        "passW"                : "Lösenord",
        "log"                  : "Log In",
        "username"             : "Ange användarnamn", 
        "password"             : "Ange lösenord",
    
        // VIP
        "balance"              : "Account Balance",
        "sdrink"               : "Special Drink",
        "logOut"               : "Log Out",
        "drinkAmount"          : "Drink Amount",
        "vipOrder"             : "Vip Order",
        "drinkId"              : "Drink ID",
        
        // Staff
        "adToAccUserN"         : "Username",
        "addA"                 : "Add Amount",
        "addToAcc"             : "Add to account",
        "staffLogO"            : "Log Out",
        "completeOrderId"      : "Order Id",
        "completeOrder"        : "Complete Order",
       
        // All Customer
        "stdOrder"             : "Order",
        "stdDrinkId"           : "Drink ID",
        "stdDrinkAmount"       : "Amount",
        "addToCart"            : "Add to cart",


    },
    "en": {
        "login": "Login",
        "userN": "Username",
        "passW": "Password",
        "username": "Enter username",
        "password": "Enter password",
        "logIn": "Login",
        "beer": "Beer",
        "spirits": "Spirits",
        "wine": "Wine",
        "non-alcoholic": "Non-alcoholic",
        "product-buy": "Add to cart",
        "product-spec": "Specifications",
        "product-spec-alcohol": "Alcohol content",
        "product-spec-category": "Category",
        "product-spec-type": "Type",
        "product-spec-producent": "Producent",
        "product-spec-origin": "Origin",
        "product-spec-allergens": "Allergens",
        "product-spec-articleid": "Article id",
        "product-manager": "Product manager",
        "product-stock-view": "Stock",
        "product-manager-refill": "Refill product",
        "product-manager-remove-product": "Remove product",
        "product-manager-add": "Add product",
        "product-manager-articleid":"Article id",
        "product-manager-name":"Name",
        "product-manager-name2":"Second name",
        "product-manager-pricewithvat":"Price with vat",
        "product-manager-volume":"Volume",
        "product-manager-productgroup":"Product group",
        "product-manager-serves":"Serves like",
        "product-manager-origin":"Origin",
        "product-manager-origincountry":"Origin country",
        "product-manager-producent":"Producent",
        "product-manager-alcohol":"Alcohol content",
        "product-manager-img":"Picture",
        "product-manager-stock": "Stock",
        "product-manager-main-category": "Main category",
        "product-manager-add-product": "Add product",
        "footnote-copyright-message": "The Flying Dutchman by © 2021 The Early Sunrise",
        "hello": "Welcome to this small demonstration",
        "bye": "Nice meeting you! Welcome back!",
        "flag-pic" : "./img/australia.svg",
        "flag-alt" : "Australien flag",
        "product-manager-success-msg": " got added",
        "product-manager-check-input": "Some inputs cant be empty, ",
        "product-manager-check-id": "Id already exist, ",
        "product-manager-check-category": "Main category does not exist, ",
        "checkout-order": "BUY",
        "cancel-order": "DONT BUY",
        "table-number": "Tablenumber: ",

        //bartender view 
        "bartender-table-h-0": "Drink",
        "bartender-table-h-1": "Amount",
        "bartender-table-h-2": "Price",
        "bartender-button-n-0": "Change order",
        "bartender-button-n-1": "Remove order",
        "bartender-button-n-2": "Complete order",
        "bartender-total": "Total",
        "bartender-table-name": "Table ",
        "bartender-order-name": "Order ",

        "manager": "Manager",
        "bartender": "Bartender",
        "notify-security": "Notify security",
        "logIn"                : "Log In",
        "start_username"       : "None",
        "log_in_unsuccess_msg" : "Unsuccessful login",
    
        // Log In
        "userN"                : "Username",
        "passW"                : "Password",
        "log"                  : "Log In",
        "username"             : "Enter username", 
        "password"             : "Enter password",
    
        // VIP
        "balance"              : "Account Balance",
        "sdrink"               : "Special Drink",
        "logOut"               : "Log Out",
        "drinkAmount"          : "Drink Amount",
        "vipOrder"             : "Vip Order",
        "drinkId"              : "Drink ID",
        
        // Staff
        "adToAccUserN"         : "Username",
        "addA"                 : "Add Amount",
        "addToAcc"             : "Add to account",
        "staffLogO"            : "Log Out",
        "completeOrderId"      : "Order Id",
        "completeOrder"        : "Complete Order",
       
        // All Customer
        "stdOrder"             : "Order",
        "stdDrinkId"           : "Drink ID",
        "stdDrinkAmount"       : "Amount",
        "addToCart"            : "Add to cart",
    },
}

// This function will return the appropriate string for each
// key. The language handling is made "automatic".
//
function getString(key) {
    return dict[language][key];
}

// This function is the simplest possible. However, in order
// to handle many different languages it will not be sufficient.
// The necessary change should not be difficult to implement.
//
// After each language change, we will need to update the view, to propagate
// the change to the whole view.
//
function changeLang(sel) {
    language = sel.options[sel.selectedIndex].value;
    updateView();
}

// ==========================================================================
// END OF FILE
// ==========================================================================
