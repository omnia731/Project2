var userService = require('./userService');

var getDataControllerfn = async (req, res) => {
    var user = await userService.getDataFromDBService();
    res.send({"status": true, "data": user});
}

var createUserControllerfn = async (req, res) => {
    var status = await userService.createUserDBService(req.body);
    if (status) {
        res.send({"status": true, "message": "user created successfully"});
    } else {
        res.send({"status": false, "message": "error creating user"});
    }
}
var updateUserControllerfn = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    var result = await userService.updateUserDBService(req.params.id,req.body);
    if (result) {
        res.send({"status": true, "message": "user updated successfully"});
    } else {
        res.send({"status": false, "message": "error updating user"});
    }
}


var loginUserControllerfn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.findUserByCredentials(username, password);

        if (user) {
            res.send({
                status: true,
                message: "Login successful",
                user: user
            });
        } else {
            res.status(401).send({
                status: false,
                message: "Invalid username or password"
            });
        }
    } catch (error) {
        console.error("Error logging in user:", error.message);
        res.status(500).send({
            status: false,
            message: "Error logging in user"
        });
    }
}

module.exports = { 
    getDataControllerfn, 
    createUserControllerfn, 
    updateUserControllerfn, 
    loginUserControllerfn 
};


