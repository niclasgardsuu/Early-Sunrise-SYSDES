// ==========================================================================
// The updating of the view is done by going through the lists of
// keywords for strings and pictures, and replacing the contents
// through the use of a simple javascript statement.
//
// 01000111 01100101 00100000 01101111 01110011 01110011 00100000 01100101 01101110 00100000 01100110 01100101 01101101 01101101 01100001 00100000 01101100 01100001 01110010 01110011 
//
// Note especially that strings and pictures are treated in
// different ways, due to the way they are handled in the container.
// ==========================================================================

/**
 * This function will update any images on the website to a version of the image that responds to the currently chosen language.
 */
function updateViewPics() {
    pics = dict["pics"];
    for (idx in pics) {
        pic = pics[idx][0];
        alt = pics[idx][1];
        id = document.getElementById(pic);
        if(id != null) {
            id.src = getString(pic);
            id.alt = getString(alt);
        }
    }; 
}

/**
 *  This function will update all boxes that have an ID attribute that is equivalent to an ID in the dictionary in order to update the language
 * @param {string} id the id of the dictionary
 */
function updateViewIds(id) {
    ids = dict[id];
    for (idx in ids) {
        key = ids[idx];
        id = document.getElementById(key);
        if(id != null) id.innerText = getString(key);
    };
}

/**
 *  This function will update all boxes that have a class attribute that is equivalent to a class in the dictionary in order to update the language
 * @param {string} id the id of the dictionary
 */
function updateViewClasses(id) {
    var name = dict[id];
    for (i in name) {
        var temp = document.getElementsByClassName(name[i]);
        if (temp != null) {
            for (j in temp) {
                temp[j].innerText = getString(name[i]);
            }
        }
    }
}

/**
 *  This function will update the current text in an html element to display the currently chosen language
 * @param {string} attribute the attribute that the html element will have
 * @param {string} id the id of the dictionary
 */
function updateViewAttribute(attribute, id) {
    var ids = dict[id];
    for (i in ids) {
        var key = ids[i];
        var id = document.getElementById(key);
        if (id != null) id.setAttribute(attribute, getString(key));
    }
}

/**
 * This will only update main dictionary
 */
function updateViewMain() {
    updateViewIds("main-ids");
    updateViewPics();
    updateViewClasses("classes");
}

/**
 * This will only update login dictionary
 */
function updateViewLogin() {
    updateViewIds("login-ids");
    updateViewAttribute("placeholder", "login-placeholder");
}

/**
 * This will only update manager dictionary
 */
function updateViewManager() {
    updateViewIds("manager-ids");
}

/**
 * This will only update bartender dictionary
 */
function updateViewBartender() {
    updateViewIds("bartender-ids");
    updateViewClasses("bartender-classes");
}

/**
 * This will only update user dictionary
 */
function updateViewUser() {
    updateViewIds("userIds");
}

/**
 * This will only update main category dictionary
 */
function updateViewMainCategory() {
    updateViewIds("mainCategory");
}

/**
 * This will update the dictionary according to what language is set
 */
function updateView() {
    updateViewMainCategory();
    updateViewMain();
    updateViewLogin();
    updateViewManager();
    updateViewUser();
    updateViewBartender();
}
