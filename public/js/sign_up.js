function signUp() {
    let username = $("#username").get(0);
    let password = $("#password").get(0);
    let confirmpassword = $("#confirmpassword").get(0);
    if (validteInput(username.value, password.value, confirmpassword.value)) {
        let new_user = {
            username: username.value,
            password: password.value,
            confirmpassword: confirmpassword.value
        };
        axios.post('http://10.103.50.197:8000/users', new_user).then(function (response) {
            if (response.data.result == true) {
                alert("Your User has been created!");
                // TODO: Set the session to the user that created
                window.location = "index.html";
            } else {
                alert("Passwords don't equal try again!");
                password.value = "";
                confirmpassword.value = "";
            }
        });
    }
}

let validteInput = function (username, password, confirmpassword) {
    return username !== "" && password !== "" && confirmpassword !== "";
};