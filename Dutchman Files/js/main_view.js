// ==========================================================================
// The updating of the view is done by going through the lists of
// keywords for strings and pictures, and replacing the contents
// through the use of a simple javascript statement.
//
// Note especially that strings and pictures are treated in
// different ways, due to the way they are handled in the container.

function updateViewPics() {
    pics = dict["pics"];
    for (idx in pics) {
        pic = pics[idx][0];
        alt = pics[idx][1];
        id = document.getElementById(pic);
        id.src = getString(pic);
        id.alt = getString(alt);
    }; }

function updateViewIds(id) {
    ids = dict[id];
    for (idx in ids) {
        id = ids[idx];
        document.getElementById(id).innerText = getString(id);
    };
}

function updateViewClasses() {
    var name = dict["classes"];
    for (i in name) {
        var temp = document.getElementsByClassName(name[i]);
        for (j in temp) {
            temp[j].innerText = getString(name[i]);
        }
    }
}

function updateViewAttribute(attribute, ids) {
    var ids = dict[ids];
    for (i in ids) {
        var id = ids[i];
        document.getElementById(id).setAttribute(attribute, getString(id));
    }
}

function updateView() {
    updateViewIds("ids");
    updateViewPics()
    updateViewClasses();
}

function updateViewLogin() {
    updateViewIds("login-ids");
    updateViewAttribute("placeholder", "login-placeholder");
}
