////////////////////////////////////////////////////////
//
//  Stores data about all the current orders, and the shopping cart. also keeps track of the income and expenses
//
////////////////////////////////////////////////////////

var OrderDB = {
    "cart": {
            "productId": [],
            "productAmount": [],
            "price": [],
            "totalPrice": 0,
            "table": "",
            "maxAmount": 10,
            "order_id": null
    },
    "all_orders": [
    ],
     "accounting": {
        "income": 0,
        "expenses": 3840
    }
};


   
