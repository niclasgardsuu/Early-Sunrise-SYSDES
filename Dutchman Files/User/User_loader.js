// =====================================================================================================
// Loader
// =====================================================================================================

function logIn(userName, passWord) {


    for (i = 0; i < DB.users.length; i++) {

        if(DB.users[i].username == userName) {
            if(DB.users[i].password == passWord) {
                // store the username in modelData
                modelData['username'] = userName;
                return DB.users[i].credentials;
            } else {
                return (-1);
            }
        }
    }
    return (-1);
}

function logOut() {
    modelData['username'] = dict['start_username'];
}

function getAccountBalance() {

    var userID;
    userName = modelData['username'];
    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            userID = DB.users[i].user_id;
        };
    };

    for (i = 0; i < DB.account.length; i++) {
        if (DB.account[i].user_id == userID) {
            return DB.account[i].creditSEK;
        };
    };
}

function getComLock() { 
    return Math.floor(Math.random() * 1000);
}

// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================
