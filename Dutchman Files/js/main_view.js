// ==========================================================================
// The updating of the view is done by going through the lists of
// keywords for strings and pictures, and replacing the contents
// through the use of a simple jQuery statement.
//
// Note especially that strings and pictures are treated in
// different ways, due to the way they are handled in the container.
//
function update_view() {
    keys = dict["keys"];
    for (idx in keys) {
        key = keys[idx];
        document.getElementById(key).innerText(get_string(key));
    };
    pics = dict["pics"];
    for (idx in pics) {
        pic = pics[idx];
        document.getElementById(key).setAttribute("src", getString(pic));
    };
}
