let tweets_panel;
let currId = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";
let tweets = [];
const SERVER_URL = 'http://10.103.50.197:8000';

window.addEventListener('load', onPageLoad, false);

function onPageLoad() {
    loadTweets();
}

function loadTweets() {
    let usernamePromises = [];
    let userFollowing = [];
    axios.get('http://10.103.50.197:8000/users/' + currId).then(function (response) {
        userFollowing = response.data[0].following;
    }).then(function () {
        axios.get('http://10.103.50.197:8000/tweets')
            .then(function (response) {
                tweets = response.data;
            }).then(function () {
            tweets.forEach(function (tweet) {
                usernamePromises.push(axios.get('http://10.103.50.197:8000/users/' + tweet.user).then(function (response) {
                    tweet.username = response.data[0].username;
                }))
            });
        }).then(function () {
            axios.all(usernamePromises).then(function () {
                tweets.forEach(function (tweet) {
                    if (userFollowing.includes(tweet.user) || tweet.user == currId) {
                        createTweetHTML(tweet.username, tweet.text, "green");
                    }
                })
            });
        });
    });
}

function publishNewTweet() {
    let new_tweet_text = $("#new-tweet-text").get(0);
    let filtered_text = new_tweet_text.value.replace(/[<]/g, '&lt').replace(/[>]/g, '&gt');
    axios.get("http://localhost:8000/users/" + currId)
        .then(function (response) {
            let username = response.data[0].username;
            let newTweet = {
                user: currId,
                text: filtered_text
            };
            axios.put("http://localhost:8000/tweets", newTweet)
                .then(function (response) {
                    tweets.push(newTweet);
                    createTweetHTML(username, filtered_text, "black");
                    $("#new-tweet-text").get(0).value = "";
                    // loadTweets();
                });
        });
}


function createTweetHTML(userName, tweetContent, color) {
    let headDiv = $("#tweets-panel");
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    let tweetDiv = document.createElement("div");
    tweetDiv.classList.add("tweet");
    let userImg = document.createElement("img");
    userImg.classList.add("user-img");
    userImg.setAttribute("src", "../images/useravatar.png");
    userImg.setAttribute("alt", "User Avatar");
    let tweetContentDiv = document.createElement("div");
    tweetContentDiv.classList.add('tweet-content');
    let userNameDiv = document.createElement("div");
    userNameDiv.classList.add("user-name");
    userNameDiv.setAttribute("style", "color: " + color);
    let userMsgDiv = document.createElement("div");
    userMsgDiv.classList.add("user-msg");

    userNameDiv.innerHTML = userName;
    userMsgDiv.innerHTML = tweetContent;

    headDiv.get(0).appendChild(rowDiv);
    rowDiv.appendChild(tweetDiv);
    tweetDiv.appendChild(userImg);
    tweetDiv.appendChild(tweetContentDiv);
    tweetContentDiv.appendChild(userNameDiv);
    tweetContentDiv.appendChild(userMsgDiv);
}

function runTests() {
    test_group("Selectors", function () {
        assert($("#logo-img").count() === 1, "counting one image logo class element");
        assert($("#tweets-panel .tweet").count() >= 2, "counting 2 tweet-username classes under ot-body class");
        assert($("#welcome-header").count() === 0, "not finding any non-existant ids of elements")
    });
}

