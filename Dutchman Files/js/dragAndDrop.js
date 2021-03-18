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
    var temp = {
                execute : addToCart.bind(null, data, 1),
                unexecute: removeFromCart.bind(null, data, 1)
            }
    doit(temp);
    //ev.target.appendChild(document.getElementById(data));
    //updateShoppingCartView();
}
