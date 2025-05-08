const userModel = require('./userModel');

module.exports.getDataFromDBService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await userModel.find({});
            resolve(result);
        } catch (error) {
            console.log("Error fetching data:", error.message);
            reject(false);
        }
    });
}

module.exports.createUserDBService = (userDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userModelData = new userModel();
            userModelData.username = userDetails.username;
            userModelData.password = userDetails.password;

            await userModelData.save(); // Save without callback
            resolve(true);
        } catch (error) {
            console.log("Error saving user:", error.message);
            reject(false);
        }
    });
}

module.exports.updateUserDBService = async (id, userDetails) => {
    console.log(userDetails);
    try {
        // Using async/await for findByIdAndUpdate
        const updatedUser = await userModel.findByIdAndUpdate(id, userDetails, { new: true });

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;  // Return the updated user details
    } catch (error) {
        console.log("Error updating user:", error.message);
        throw error;  // Throw the error for the caller to handle
    }
};

module.exports.findUserByCredentials = async (username, password) => {
    try {
        const user = await userModel.findOne({ username, password });
        return user;  // Return user if found, otherwise return null
    } catch (error) {
        console.log("Error finding user:", error.message);
        throw error;  // Throw error to be handled by controller
    }
};


// var deleteUserControllerfn = async (req, res) => {
//     const { id } = req.params;  // Assuming you are passing the user ID in the URL params

//     try {
//         // Call the service function to delete the user
//         const result = await userService.deleteUserDBService(id);

//         if (result) {
//             res.status(200).send({
//                 status: true,
//                 message: "User deleted successfully",
//             });
//         } else {
//             res.status(404).send({
//                 status: false,
//                 message: "User not found",
//             });
//         }
//     } catch (error) {
//         console.log("Error deleting user:", error);
//         res.status(500).send({
//             status: false,
//             message: "Error deleting user",
//         });
//     }
// };

// module.exports = { deleteUserControllerfn };
