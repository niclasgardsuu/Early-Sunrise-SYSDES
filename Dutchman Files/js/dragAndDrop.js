function dragstartHandler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/productId", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
}

function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

function dropHandler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/productId");
    addToCart(data,1);
    //ev.target.appendChild(document.getElementById(data));
    //updateShoppingCartView();
}
