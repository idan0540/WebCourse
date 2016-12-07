var users;
var users_panel;
var following_panel;

var currId = "5e07631e-3974-47f8-a89c-bb41ce1e0e3d";

window.addEventListener('load', onPageLoad, false);

function printUsers(users) {
    var userFollowing = [];
    axios.get("http://10.103.50.249:8000/users/" + myId)
        .then(function (response) {
            userFollowing = response.data[0].following;
        }).then(function () {
        axios.get('http://10.103.50.193:8080/users')
            .then(function (response) {
                users_panel.innerHTML = "";
                following_panel.innerHTML = "<h2>Following</h2>";
                for (var index = 0; index < response.data.length; index++) {
                    users_panel.innerHTML +=
                        "<div class='userInfo col-md-2'>" +
                        "<div class='thumbnail'>" +
                        "<img src='../images/useravatar.png'>" +
                        "<div class='user-option'>" +
                        '<button id="btn-follow-state" class="btn ' + 'btn-success' + ' + ' +
                        '" onclick= "' + "changeFollowState('" + response.data[index]._id + "')" + '"> ' + 'follow' + '</button>' +
                        "<div class='user-name'>" +
                        "<p>" + response.data[index].username + "</p>" +
                        "</div></div></div></div>";
                    if (response.data[index]._id === currId) {
                        for (following of response.data[index].following) {
                            following_panel.innerHTML +=
                                "<div class='userInfo col-md-12'>" +
                                "<div class='thumbnail'>" +
                                "<img src='../images/useravatar.png'>" +
                                "<div class='user-option'>" +
                                '<button id="btn-follow-state" class="btn ' + 'btn-danger' + ' + ' +
                                '" onclick= "' + "changeFollowState('" + following + "')" + '"> ' + 'unfollow' + '</button>' +
                                "<div class='user-name'>" +
                                "<p>" + following + "</p>" +
                                "</div></div></div></div>";
                        }
                    }
                }
            });

    });
}


function changeFollowState(userid) {
    myUser = users.filter(function (obj) {
        return obj.name === username;
    });
    myUser[0].follow = !(myUser[0].follow);
    printUsers(users);
}

function filterUser() {
    var searchUser = $("#filter-user").get(0);
    filterResult = users.filter(function (obj) {
        return obj.name.includes(searchUser.value);
    });
    printUsers(filterResult);
}

function onPageLoad() {
    following_panel = $("#following-panel").get(0);
    users_panel = $("#users-panel").get(0);
    tweets_panel = $("#tweets-panel").get(0);
    printUsers(users);
}