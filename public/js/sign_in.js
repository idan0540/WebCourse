function signIn() {
    let username = replaceXXS($("#username").get(0).value);
    let password = replaceXXS($("#password").get(0).value);

    let userToCheck = {
        username: username,
        password: password
    };

    axios.put('/login', userToCheck).then(function (response) {
        window.location = "/";
        alert("good");
    }).catch(function () {
        alert("err");
    });
}

let replaceXXS = function (data) {
    return data.replace(/[<]/g, '&lt').replace(/[>]/g, '&gt');
};

