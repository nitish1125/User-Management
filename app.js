$(document).ready(function () {


    $("#createUser").click(function () {
        createNewUser();
    })

    $("#getUserDetailsById").click(function () {
        getUserById();
    })

    $("#getUserDetailsByName").click(function () {
        getUserByName();
    })

    $("#getAllUserDetails").click(function () {
        getAllUsers();
    })

    $("#updateUser").click(function () {
        updateUser();
    })

    $("#deleteUserDetailsById").click(function () {
        deleteUser();
    })

    function createNewUser() {

        let newUserID = $('#userID').val();
        let newUserName = $('#userName').val();
        let newUserEmail = $('#userEmail').val();
        let newUserRole = $('#userRole').val()

        let newUser = {
            userID: newUserID,
            userName: newUserName,
            userEmail: newUserEmail,
            userRole: newUserRole
        }


        $.getJSON("http://127.0.0.1/userM/userInfo.json", function (data) {
            const jsonData = data;

            // Push the new object into the array
            jsonData.push(newUser);

            // Stringify the JavaScript object back into JSON format
            const updatedJson = JSON.stringify(jsonData);

            // Write the updated JSON back to the file
            $.ajax({
                url: 'http://127.0.0.1/userM/userInfo.json',
                type: 'POST',
                data: updatedJson,
                contentType: 'application/json',
                success: function () {
                    console.log('Data added successfully');
                    console.log(updatedJson);
                },
                error: function (err) {
                    console.error(err);
                }
            });
        });


    };

    function getUserById() {

        let userID = Number($('#getUserByID').val())

        $.getJSON("http://127.0.0.1/userM/userInfo.json", function (data) {
            const user = data.find(u => u.id === userID);
            if (user) {
                console.log('User found:', user);
            } else {
                console.log('User not found');
            }
        });

    };

    function getUserByName() {

        let userID = $('#getUserByName').val();

        $.getJSON("http://127.0.0.1/userM/userInfo.json", function (data) {
            const user = data.find(u => u.name === userID);
            if (user) {
                console.log('User found:', user);
            } else {
                console.log('User not found');
            }
        });

    };

    function getAllUsers() {


        $.getJSON("http://127.0.0.1/userM/userInfo.json", function (data) {
            console.log(data);
        });

    };

    function updateUser() {

        let userIdToUpdate = Number($('#updateUserID').val());
        let updatedUewUserName = $('#updateUserName').val();
        let updatedNewUserEmail = $('#updateUserEmail').val();
        let updatedNewUserRole = $('#updateUserRole').val()

        let updatedUserData = {
            name: updatedUewUserName,
            email: updatedNewUserEmail,
            role: updatedNewUserRole
        }
        console.log(updatedUserData);

        $.getJSON('http://127.0.0.1/userM/userInfo.json', function (data) {
            // Find the index of the user with the specified ID
            const userIndex = data.findIndex(user => user.id === userIdToUpdate);

            if (userIndex !== -1) {
                // Update the user object
                data[userIndex] = { ...data[userIndex], ...updatedUserData };

                // Write the updated data back to the JSON file
                $.ajax({
                    url: 'http://127.0.0.1/userM/userInfo.json',
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function () {
                        console.log('User updated successfully');
                        console.log(data);
                    },
                    error: function (err) {
                        console.error('Error updating user:', err);
                    }
                });
            } else {
                console.log('User not found');
            }
        });


    };

    function deleteUser() {

        let userIdToDelete = Number($('#deleteUserByID').val());

        $.getJSON('http://127.0.0.1/userM/userInfo.json', function (data) {
            const newData = data.filter(user => user.id !== userIdToDelete);

            // Write the filtered data back to the JSON file
            $.ajax({
                url: 'http://127.0.0.1/userM/userInfo.json',
                type: 'PUT',
                data: JSON.stringify(newData),
                contentType: 'application/json',
                success: function () {
                    console.log('User deleted successfully');
                    console.log(data);
                },
                error: function (err) {
                    console.error('Error deleting user:', err);
                }
            });
        });



    };


});