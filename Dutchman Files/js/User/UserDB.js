var OrderDB = {
    "cart": {
            "drinkId": [],
            "drinkAmount": [],
            "price": [],
            "totalPrice": 0,
            "table": "",
            "maxAmount": 10,
            "order_id": null
    },
    "vip": [ //alla username med tomma order id ?
        {
            "username": "vipadmin",
            "order_id": "" // when paid->reset to ""
        }
    ],
    "none_vip": [   // listor av order id eller tomma order id
        {
            "order_id": "555"
        },
        {
            "order_id": "000"
        },
        {
            "order_id": "000"
        },
        {
            "order_id": "000"
        }
    ],
    "all_orders": [
    ]
};

/*
    "bought": [
        {
            "transaction_id": "328",
            "admin_id": "25",
            "beer_id": "1152803",
            "amount": "4",
            "price": "24.90",
            "timestamp": "2014-10-02 16:05:21"
        }
    ],
    "sold": [
        {
        "transaction_id": "1186",
        "user_id": "2",
        "beer_id": "8967303",
        "timestamp": "2014-10-10 19:04:13"
        }
    ]
 */