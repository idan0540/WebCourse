var tweets_insert;
    // = [{username: 'Bobo', text: 'hello followers!'},
    // {username: 'Elvis', text: 'this exercise is really easy!'},
    // {username: 'Mimi', text: 'I want to go to sleep'}];
var tweets_panel;

window.addEventListener('load', onPageLoad, false);

function loadTweets() {
    // tweets_panel.innerHTML = "";
    //tweets_panel = $("#tweets-panel").get(0);
    tweets_panel = document.getElementById("tweets-panel");
    axios.get('http://10.103.50.193:8080/tweets')
        .then(function (response) {
            tweets_insert = response.data;
        }).then(function () {
        for (tweet of tweets_insert) {
            tweets_panel.innerHTML +=
                "<div class='row'>" +
                "<div class='tweet'>" +
                "<img class='user-img' src='../images/useravatar.png'>" +
                "<div class='tweet-content'>" +
                "<div class='user-name' style='color: green'> " +
                tweet.user +
                " says:</div>" +
                "<div class='user-msg'>" +
                tweet.text +
                "</div></div></div></div>";
        }
    })
        .catch(function (error) {
            console.log(error);
        });
}

function publishNewTweet() {
    var new_tweet_text = $("#new-tweet-text").get(0);
    tweets_panel = $("#tweets-panel").get(0);
    // tweets_insert.push({username: "test user",
    //                     text: new_tweet_text.value});
    // -------
    tweets_panel.innerHTML +=
        "<div class='row'>" +
        "<div class='tweet'>" +
        "<img class='user-img' src='../images/useravatar.png'>" +
        "<div class='tweet-content'>" +
        "<div class='user-name' > " +
        "test user" + " says:</div>" +
        "<div class='user-msg'>" +
        new_tweet_text.value.replace(/[<]/g, '&lt').replace(/[>]/g, '&gt') +
        "</div></div></div></div>";
    // -------
    new_tweet_text.value = "";
    // loadTweets();
}

function onPageLoad() {

    loadTweets();
    runTests();
}






function runTests() {
    test_group("Selectors", function () {
        assert($("#logo-img").count() === 1, "counting one image logo class element");
        assert($("#tweets-panel .tweet").count() >= 2, "counting 2 tweet-username classes under ot-body class");
        assert($("#welcome-header").count() === 0, "not finding any non-existant ids of elements")
    });
}

