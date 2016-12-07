let tweets_insert;

let tweets_panel;

window.addEventListener('load', onPageLoad, false);

function loadTweets() {
    var tweets = [];
    var usernamePromises = [];
    axios.get('http://10.103.50.193:8080/tweets')
        .then(function (response) {
            tweets = response.data;
        }).then(function () {
        tweets.forEach(function (tweet) {
            usernamePromises.push(axios.get('http://10.103.50.193:8080/users/' + tweet.user).then(function (response) {
                tweet.username = response.data[0].username;
            }))
        });
    }).then(function () {
        axios.all(usernamePromises).then(function () {
            tweets.forEach(function (tweet) {
                createTweetHTML(tweet.username, tweet.text, "green");
            })
        });
    });
}

function publishNewTweet() {
    let new_tweet_text = $("#new-tweet-text").get(0);
    let filtered_text = new_tweet_text.value.replace(/[<]/g, '&lt').replace(/[>]/g, '&gt');
    createTweetHTML("usertest", filtered_text, "black");
}

function onPageLoad() {

    loadTweets();
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

