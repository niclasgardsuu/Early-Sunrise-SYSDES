// =====================================================================================================
// Creation
// =====================================================================================================
// To create Attribute/div/span/Input/Button etc.

function createStaffLogIn() {

    return createDiv("staff","",       
                createSpanEvent  ("staffLogO","cursor","","staffLogO()")+
                createSpanEvent  ("manager","cursor","","createManagerView()")+
                createSpan  ("adToAccUserN","","") +
                createInput ("adToAccUsername") +
                createSpan  ("addA","","") +
                createInput ("addAmount") +
                createButton("addToAcc", "addToAcc") + 
                createInput ("completeOrderId") +
                createButton("completeOrder", "completeOrder") +
                createSpan  ("innerDisplay","","")
            );
}

function createVipLogIn() {

    return createDiv("vip","", 
                createSpanEvent  ("logOut","cursor","", "logOut()")+
                createButton("balance", "balance") + 
                createButton("sdrink", "sdrink") +
                createButton("logOut", "logOut") +
                createInput ("drinkId") +
                createInput ("drinkAmount") +
                createButton("vipOrder", "vipOrder") + 
                createSpan  ("innerDisplay","","") +
                createDiv   ("cart","","")
            );
}

function createLabel(id) {
    return "<label id=" + id + " for=" + id + "><b></b></label>";
}

function createInput(id) {
    return "<input id=" + id + " type = text placeholder = " +  id + " name = " + id + " required></input>";
}

function createButton(id, onclick) {
    return "<button id=" + id + " onclick=doInit("+ "'" + id + "'" + ")></button>";

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
