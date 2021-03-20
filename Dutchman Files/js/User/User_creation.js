// =====================================================================================================
// Creation
// =====================================================================================================
// To create Attribute/div/span/Input/Button etc.

function createStaffLogIn() {
    
    return createDiv("","manager-right-container",       
                createSpan  ("adToAccUserN","","") +
                createInput ("adToAccUsername") +
                createSpan  ("addA","","") +
                createInput ("addAmount") +
                createButton("addToAcc", "addToAcc") +
                createSpan  ("innerDisplay","","") 

            //TODO fix style ?
            //   createDl("adToAccUserN", "adToAccUsername") + 
            //   createDl("addA", "addAmount")
            );
}

function createVipLogIn() {

    return createDiv("vip","", 
                createSpanEvent  ("logOut","cursor","", "logOut()")+
                createButton("balance", "balance") + 
                createButton("logOut", "logOut") +
                createSpan  ("innerDisplay","","") +
                createDiv   ("cart","","")
            );
}

//TODO
function createDl(id, funcId) {

    return `<dl class="product-info-spec">` +
            "<dd><input id=" + id + " placeholder=" + id + " type=" + "text" + "></dd>" +
            "<dt id=" + funcId + "></dt>" +
            "</dl>";
}

function createLabel(id) {
    return "<label id=" + id + " for=" + id + "><b></b></label>";
}

function createInput(id) {
    return "<input id=" + id + " type = text placeholder = " +  id + " name = " + id + " required></input>";
}

function createButton(id, onclick) {
    return "<button id=" + id + " onclick= " + id + "()></button>";
}

function createAttribute(attr,content) {
    if (content == "") {
        return "";
    } else {
        return attr + "=" + content + " ";
    }
}

function createDiv(id, classname, content) {
    idString = createAttribute("id", id);
    classString = createAttribute("class", classname);
    return "<div " + idString + classString + ">" + content + "</div>";
}

function createSpan(id, classname, content) {
    idString = createAttribute("id", id);
    classString = createAttribute("class", classname);
    return "<span " + idString + classString + ">" + content + "</span>";
}


function createSpanEvent(id, classname, content, _function) {
    idString = createAttribute("id", id);
    classString = createAttribute("class", classname);
    return "<span " + idString + classString + "onclick="+_function+">" + content + "</span>";
}

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
