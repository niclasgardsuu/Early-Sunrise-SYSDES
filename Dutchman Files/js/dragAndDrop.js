function dragstartHandler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/productId", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
    console.log("start");
}

function dragoverHandler(ev) {
    console.log("end");
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

function dropHandler(ev) {
    console.log("bana");
    ev.preventDefault();
    var id = 
    addToShoppingCart(id);
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/productId");
    addToShoppingCart(data);
    //ev.target.appendChild(document.getElementById(data));
    //updateShoppingCartView();
}
