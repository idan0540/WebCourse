var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");

app.use(express.static('public'));
app.use(bodyParser.json());

const PORT = 8000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.route('/users').get(function (req, res) {
    fs.readFile('./public/json/users.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(content, 'utf-8');
    });
});

app.route('/users/:id').get(function (req, res) {
    fs.readFile('./public/json/users.json', function (err, content) {
        let users = JSON.parse(content.toString());
        let user = getUserById(users, req.params.id);
        res.end(JSON.stringify(user), 'utf-8');
    });
});

app.route('/users/following/:id').get(function (req, res) {
    fs.readFile('./public/json/users.json', function (err, content) {
        let users = JSON.parse(content.toString());
        let usersFollowId = getUsersFollowId(users, req.params.id);
        res.end(JSON.stringify(usersFollowId), 'utf-8');
    });
});

app.route('/tweets').get(function (req, res) {
    fs.readFile('./public/json/tweets.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(content, 'utf-8');
    });
});

app.route('/tweets/:userId').get(function (req, res) {
    fs.readFile('./public/json/tweets.json', function (err, content) {
        let allTweets = JSON.parse(content.toString());
        let userTweets = getTweetsById(allTweets, req.params.userId);
        res.end(JSON.stringify(userTweets), 'utf-8');
    });
});

app.route('/tweets').put(function (req, res) {
    fs.readFile('./public/json/tweets.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let tweets = JSON.parse(content.toString());
        tweets.push({text: req.body.text, user: req.body.username});
        fs.writeFile('public/json/tweets.json', JSON.stringify(tweets));
        res.end(JSON.stringify(tweets), 'utf-8');
    });
});

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:%s", PORT);
});

function getUserById (users, id) {
    var userArr = [];
    for (user of users) {
        if (user._id  === id) {
            userArr.push(user);
            return userArr;
        }
    }
}

function getTweetsById(allTweets, id) {
    let userTweets = [];
    for (tweet of allTweets) {
        if (tweet.user === id) {
            userTweets.push(tweet);
        }
    }
    return userTweets;
}

function getUsersFollowId(users, id) {
    let usersFollowId = [];
    for (user of users) {
        if (user.following.includes(id)) {
            usersFollowId.push(user);
        }
    }
    return usersFollowId;
}
