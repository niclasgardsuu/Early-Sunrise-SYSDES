// ==========================================================================
// We need to have a variable that controls which language to use.
// In this file we only show the simplest version of language change.
// How to do this with more than two languages, is left as an
// exercise.
//
var language = "en"

// ==========================================================================
// The dictionary consists of a simple JSON structure. It also keeps
// track of the different keys that are available  for IDs.
//
dict = {
    "keys" : ["hello","bye"],       // keys for strings
    "pics" : ["flagPic"],              // keys for pictures
                                    // pictures have to be
                                    // handled in a special way.

    // We use one JSON substructure for each language. If we have
    // many different languages and a large set of strings we might
    // need to store a JSON file for each language to be loaded on
    // request.
    //
    "en": {
        "hello": "Welcome to this small demonstration",
        "bye": "Nice meeting you! Welcome back!",
        "flagPic" : "eng.jpg"
    },
    "sv" : {
        "hello" : "Välkommen till denna lilla demonstration",
        "bye" : "Tack för besöket! Välkommen åter",
        "flagPic" : "sv.jpg"
    },
    "pl": {
        "flagPic" : "sv.jpg"
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
function changeLang() {
    if (language =="en") {
        language = "sv";
    } else {language = "en"};
    update_view();
}

// ==========================================================================
// END OF FILE
// ==========================================================================
