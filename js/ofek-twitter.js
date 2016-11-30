var tweets_insert = [{username: 'Bobo', text: 'hello followers!'},
              {username: 'Elvis', text: 'this exercise is really easy!'},
              {username: 'Mimi', text: 'I want to go to sleep'}];

var tweets_panel = document.getElementById("tweets-panel");

loadTweets();

function loadTweets() {
    tweets_panel.innerHTML = "";
    for (tweet in tweets_insert) {
        tweets_panel.innerHTML +=
            "<div class='row'>" +
            "<div class='tweet'>" +
            "<img class='user-img' src='../images/useravatar.png'>" +
            "<div class='tweet-content'>" +
            "<div class='user-name'> " +
            tweets_insert[tweet].username +
            " says:</div>" +
            "<div class='user-msg'>" +
            tweets_insert[tweet].text +
            "</div></div></div></div>";
    }
}

var btn_publish = document.getElementById("btn-publish");

function publishNewTweet() {
    var new_tweet = document.getElementById("new-tweet-text")
    tweets_insert.push({username: "test user",
                        text: new_tweet.value});
    new_tweet.value = "";
    loadTweets();
}

