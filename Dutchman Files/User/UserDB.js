var OrderDB = {
    "vip": [ //alla username med tomma order id
        {
            "username": "vipadmin",
            "order_id": "" // when paid->reset to ""
        },
        {
            "order_id": "000", 
            "user_id": "000",    
            "username": "000"
        },
        {
            "order_id": "000",
            "user_id": "000",
            "username": "000"
        },
        {
            "order_id": "000",
            "user_id": "000",
            "username": "000"
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
        {
            "order_id": "vipadmin001", // move to another list when paid
            "beer_id": [],
            "amount": [],
            "price": [],
            "table": "T1"
            //"status": "paid"
            //"timestamp": "2014-10-02 16:05:21"
        },
        {
            "order_id": "888",
            "beer_id": "1152803",
            "amount": "4",
            "table": "T2",
            "status": "paid"
        },
        {
            "order_id": "",
            "beer_id": [],
            "amount": [],
            "table": "",
            "status": ""
        }
    ],
    "bought":
        [{
            "transaction_id": "328",
            "admin_id": "25",
            "beer_id": "1152803",
            "amount": "4",
            "price": "24.90",
            "timestamp": "2014-10-02 16:05:21"
        }],

    "sold": [{
        "transaction_id": "1186",
        "user_id": "2",
        "beer_id": "8967303",
        "timestamp": "2014-10-10 19:04:13"
    }
    ]
};