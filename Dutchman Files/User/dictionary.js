var language = "sv";
// ==========================================================================
// The dictionary consists of a simple JSON structure. It also keeps
// track of the different keys that are available  for IDs.
//
dict = {
    "keys" : ["hello","bye"],       // keys for strings
    "pics" : ["pic1"],              // keys for pictures
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
        "pic1" : "eng.jpg"
    },
    "sv" : {
        "hello" : "Välkommen till denna lilla demonstration",
        "bye" : "Tack för besöket! Välkommen åter",
        "pic1" : "sv.jpg"
    }
}
