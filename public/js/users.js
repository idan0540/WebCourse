let users;
let users_panel;
let following_panel;
let currId = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";
let userFollowing = [];

window.addEventListener('load', onPageLoad, false);

function onPageLoad() {
    following_panel = $("#following-panel").get(0);
    users_panel = $("#users-panel").get(0);
    tweets_panel = $("#tweets-panel").get(0);
    printUsers(users);
}

function printUsers() {

    axios.get("http://10.103.50.197:8000/users/" + currId)
        .then(function (response) {
            userFollowing = response.data[0].following;
        }).then(function () {
        axios.get('http://10.103.50.197:8000/users')
            .then(function (response) {
                users = response.data;
                users_panel.innerHTML = "";
                following_panel.innerHTML = "<h2>Following</h2>";
                for (let index = 0; index < users.length; index++) {
                    if (users[index]._id !== currId) {
                        if (userFollowing.includes(users[index]._id)) {
                            users[index].follow = true;
                            buildUserFollowing(users[index]);
                        } else {
                            users[index].follow = false;
                        }
                        buildUser(users[index]);
                    }
                }
            });
    });
}

function buildUser(user) {
    let btn_class = user.follow ? 'btn-danger' : 'btn-success';
    let btn_text = user.follow ? 'unfollow' : 'follow';
    users_panel = $("#users-panel").get(0);
    users_panel.innerHTML +=
        "<div class='" + user._id + " userInfo col-md-2'>" +
        "<div class='thumbnail'>" +
        "<img src='../images/useravatar.png'>" +
        "<div class='user-option'>" +
        '<button id="btn-follow-state" class="btn ' + btn_class + ' + ' +
        '" onclick= "' + "changeFollowState('" + user._id + "')" + '"> ' + btn_text + '</button>' +
        "<div class='user-name'>" +
        "<p>" + user.username + "</p>" +
        "</div></div></div></div>";
}

function buildUserFollowing(user) {
    let btn_class = user.follow ? 'btn-danger' : 'btn-success';
    let btn_text = user.follow ? 'unfollow' : 'follow';
    following_panel = $("#following-panel").get(0);
    following_panel.innerHTML +=
        "<div class='" + user._id + "userInfo col-md-12'>" +
        "<div class='thumbnail'>" +
        "<img src='../images/useravatar.png'>" +
        "<div class='user-option'>" +
        '<button id="btn-follow-state" class="btn ' + btn_class + ' + ' +
        '" onclick= "' + "changeFollowState('" + user._id + "')" + '"> ' + btn_text + '</button>' +
        "<div class='user-name'>" +
        "<p>" + user.username + "</p>" +
        "</div></div></div></div>";
}

function changeFollowState(userid) {
    myUser = users.filter(function (obj) {
        return obj._id === userid;
    })[0];
    axios.put('http://10.103.50.197:8000/users/' + currId, myUser).then(function (response) {
        myUser.follow = !myUser.follow;
        if (myUser.follow) {
            userFollowing.push(myUser);
        } else {
            userFollowing = userFollowing.filter(function (obj) {
                return obj._id != userid;
            })
        }
        printUsers();
    });
}

function filterUser() {
    let filter_text = $("#filter-text").get(0);
    hiddenUsers = [];
    filteredUserList = [];
    users.forEach(function (obj) {
        $("." + obj._id).removeClass("hidden");
    });
    users.forEach(function (obj) {
        if (!(obj.username.includes(filter_text.value))) {
            hiddenUsers.push(obj);
        } else {
            filteredUserList.push(obj)
        }
    });
    hiddenUsers.forEach(function (obj) {
        $("." + obj._id).addClass("hidden");
    });
    filter_text.value = "";
}