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
    "ids" : ["beer","spirits","wine","non-alcoholic",
             "product-spec","product-spec-alcohol","product-spec-type",
             "product-spec-producent","product-spec-origin","product-spec-allergens"],       // keys for strings
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
        "beer":"Öl",
        "spirits":"Sprit",
        "wine":"Vin",
        "non-alcoholic":"Alkoholfritt",
        "product-buy": "Lägg i kundvagnen",
        "product-spec": "Specifikationer",
        "product-spec-alcohol": "Alkoholhalt",
        "product-spec-type": "Typ",
        "product-spec-producent": "Producent",
        "product-spec-origin": "Ursprung",
        "product-spec-allergens": "Allergener",
        "hello" : "Välkommen till denna lilla demonstration",
        "bye" : "Tack för besöket! Välkommen åter",
        "flag-pic" : "./img/sweden.svg",
        "flag-alt" : "Sverige flagga"
    },
    "en": {
        "beer": "Beer",
        "spirits": "Spirits",
        "wine": "Wine",
        "non-alcoholic": "Non-alcoholic",
        "product-buy": "Add to cart",
        "product-spec": "Specifications",
        "product-spec-alcohol": "Alcohol content",
        "product-spec-type": "Type",
        "product-spec-producent": "Producent",
        "product-spec-origin": "Origin",
        "product-spec-allergens": "Allergens",
        "hello": "Welcome to this small demonstration",
        "bye": "Nice meeting you! Welcome back!",
        "flag-pic" : "./img/australia.svg",
        "flag-alt" : "Australien flag"
    },
    "pl": {
        "flag-pic" : "sv.jpg",
        "flag-alt" : "Sverige flagga"
    }
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
