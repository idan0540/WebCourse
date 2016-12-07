var users = [
    {name: 'Yaron Berlad', follow: false},
    {name: 'John Cena', follow: false},
    {name: 'Alona Tal', follow: false},
    {name: 'Lebron James', follow: false},
    {name: 'Hani Nahmias', follow: false},
    {name: 'Saba Tovia', follow: false},
    {name: 'Random Gorilla', follow: false},
    {name: 'Tal Mosseri', follow: false}];

var users_panel;
var following_panel;

window.addEventListener('load', onPageLoad, false);

function printUsers(users) {
    users_panel.innerHTML = "";
    following_panel.innerHTML = "<h2>Following</h2>";
    for(user in users) {
        var btn_class = users[user].follow ? 'btn-danger' : 'btn-success';
        var btn_text = users[user].follow ? 'unfollow' : 'follow';
        users_panel.innerHTML +=
            "<div class='userInfo col-md-2'>" +
            "<div class='thumbnail'>" +
            "<img src='../images/useravatar.png'>" +
            "<div class='user-option'>" +
            '<button id="btn-follow-state" class="btn ' + btn_class + ' + ' +
            '" onclick= "' + "changeFollowState('" + users[user].name + "')" + '"> '+ btn_text + '</button>' +
            "<div class='user-name'>" +
            "<p>" + users[user].name +"</p>" +
            "</div></div></div></div>";
        if (users[user].follow) {
            following_panel.innerHTML +=
                "<div class='userInfo col-md-12'>" +
                "<div class='thumbnail'>" +
                "<img src='../images/useravatar.png'>" +
                "<div class='user-option'>" +
                '<button id="btn-follow-state" class="btn ' + btn_class + ' + ' +
                '" onclick= "' + "changeFollowState('" + users[user].name + "')" + '"> '+ btn_text + '</button>' +
                "<div class='user-name'>" +
                "<p>" + users[user].name +"</p>" +
                "</div></div></div></div>";
        }
    }
}

function changeFollowState(username) {
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