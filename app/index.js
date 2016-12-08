let express = require('express');
let bodyParser = require("body-parser");
let app = express();
let fs = require("fs");
let path = require("path");

let users = [];
let tweets = [];

const PORT = 8000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use('/', express.static(path.resolve('public/')));
app.use('/', express.static(path.resolve('public/html/')));

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:%s", PORT);
});

fs.readFile('./public/json/users.json', 'utf8', function (err, data) {
    if (err) throw err;
    users = JSON.parse(data);
});
fs.readFile("./public/json/tweets.json", 'utf8', function (err, data) {
    if (err) throw err;
    tweets = JSON.parse(data);
});
app.get('/users', function (req, res) {
    res.send(users);
});
app.get('/users/:id', function (req, res) {
    res.send(users.filter(function (user) {
        return user._id === req.params["id"];
    }));
});
app.get('/users/following/:id', function (req, res) {
    res.send(users.filter(function (user) {
        return user.following.indexOf(req.params["id"]) != -1;
    }));
});
app.get('/tweets', function (req, res) {
    res.send(tweets);
});
app.get('/tweets/:userId', function (req, res) {
    res.send(tweets.filter(function (tweet) {
        return tweet.user.id === req.params["userId"];
    }));
});

app.put('/tweets', function (req, res) {
    tweets.push({user: req.body.user, text: req.body.text});
    fs.writeFile("./public/json/tweets.json",JSON.stringify(tweets));
    res.send();
});

app.put('/users/:id', function (req, res) {
    users.forEach(function (currUser) {
        if (currUser._id === req.params["id"]) {
            let userToChange = req.body;
            if (!userToChange.follow) {
                console.log("adding " + userToChange.username);
                currUser.following.push(userToChange._id);
            } else {
                console.log("deleting " + userToChange.username);
                currUser.following.splice(currUser.following.indexOf(userToChange._id), 1);
            }
        }
    });
    fs.writeFile("./public/json/users.json",JSON.stringify(users));
    res.send();
});

app.post('/users', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let confirmpassword = req.body.confirmpassword;
    console.log("username" + username);
    console.log("password" + password);
    console.log("confirmpassword" + confirmpassword);
    if (password === confirmpassword) {
        users.push({_id: generateValidId(users), username: username, password: password, following: []});
        fs.writeFile("./public/json/users.json", JSON.stringify(users));
        res.end(JSON.stringify({result: true}), 'utf-8');
    } else {
        res.end(JSON.stringify({result: false}), 'utf-8');
    }
    res.send();
});

function generateID() {
    return generateRandomString(8) + '-' + generateRandomString(4) + '-' + generateRandomString(4) + '-' +
        generateRandomString(4) + '-' + generateRandomString(12);
}

function generateValidId(users) {
    let newId = "";

    do {
        newId = generateID();
    } while(!validId(users, newId));

    return newId;
}

function generateRandomString(length) {
    let mask = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let index = 0; index < length; index++) {
        result += mask[Math.floor(Math.random() * mask.length)];
    }

    return result;
}

function validId(users, id) {
    for (user of users) {
        if (user._id === id) {
            return false;
        }
    }
    return true;
}