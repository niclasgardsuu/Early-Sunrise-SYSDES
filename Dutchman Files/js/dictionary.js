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
    "ids" : ["beer",
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
            "product-manager-main-category",
            "product-manager-add-product",
            "footnote-copyright-message"
            ],       // keys for strings
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
        "product-manager-main-category": "Huvudkategori",
        "product-manager-add-product": "Lägg till produkt",
        "footnote-copyright-message": "Den flygande holländaren av © 2021 The Early Sunrise",
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
        "product-spec-category": "Category",
        "product-spec-type": "Type",
        "product-spec-producent": "Producent",
        "product-spec-origin": "Origin",
        "product-spec-allergens": "Allergens",
        "product-spec-articleid": "Article id",
        "product-manager": "Product manager",
        "product-stock-view": "Stock",
        "product-manager-refill": "Refill product",
        "product-manager-remove-product": "Ta bort produkt",
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
        "product-manager-main-category": "Main category",
        "product-manager-add-product": "Add product",
        "footnote-copyright-message": "The Flying Dutchman by © 2021 The Early Sunrise",
        "hello": "Welcome to this small demonstration",
        "bye": "Nice meeting you! Welcome back!",
        "flag-pic" : "./img/australia.svg",
        "flag-alt" : "Australien flag"
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
