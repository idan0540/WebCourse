var users = [
    {name: "Yaron Berlad", follow: false},
    {name: "John Cena", follow: false},
    {name: "Alona Tal", follow: false},
    {name: "Lebron James", follow: false},
    {name: "Hani Nahmias", follow: false},
    {name: "Saba Tovia", follow: false},
    {name: "Random Gorilla", follow: false},
    {name: "Tal Mosseri", follow: false}];

var users_panel = document.getElementById("users-panel");
var following_panel = document.getElementById("following-panel");

printUsers();

function printUsers() {
    users_panel.innerHTML = "";
    for(user in users) {
        var btn_class = users[user].follow ? 'btn-danger' : 'btn-success';
        var btn_text = users[user].follow ? 'unfollow' : 'follow';
        users_panel.innerHTML +=
            "<div class='userInfo col-md-2'>" +
            "<div class='thumbnail'>" +
            "<img src='../images/useravatar.png'>" +
            "<div class='user-option'>" +
            "<button id='btn-follow-state' class='btn " + btn_class + "'" +
            "onclick='changeFollowState(users[user.name])'>" + btn_text + "</button>" +
            "<div class='user-name'>" +
            "<p>" + users[user].name +"</p>" +
            "</div></div></div></div>";
    }
}

function changeFollowState(user) {
    if(users[user].follow){
        users[user].follow = false;
    }
    else if(!users[user].follow){
        users[user].follow = true;
    }
    // users[user].follow = !(users[user].follow);
    printUsers();
}






/// / var users = [
//     {name: "Yaron Berlad", follow: false},
//     {name: "John Cena", follow: false},
//     {name: "Alona Tal", follow: false},
//     {name: "Lebron James", follow: false},
//     {name: "Hani Nahmias", follow: false},
//     {name: "Saba Tovia", follow: false},
//     {name: "Random Gorilla", follow: false},
//     {name: "Tal Mosseri", follow: false}];
//
// var users_following = [];
//
// var users_panel = document.getElementById("users-panel");
//
// var following_panel = document.getElementById("following-panel");
// printUsers();
// printUsersFollowing();
// function printUsers() {
//     users_panel.innerHTML = "";
//     for(user in users) {
//         users_panel.innerHTML +=
//     "<div class='userInfo col-md-2'>" +
//             "<div class='thumbnail'>" +
//             "<img src='../images/useravatar.png'>" +
//             "<div class='user-option'>" +
//             "<button id='btn-follow-state' class='btn btn-primary' onclick='changeFollowState(users[user])'>follow</button>" +
//             "<div class='user-name'>" +
//             "<p>" + users[user].name +"</p>" +
//         "</div></div></div></div>"
//     }
// }
//
// function changeFollowState(user) {
//     var follow_state = document.getElementById("btn-follow-state");
//     if(follow_state.innerHTML=="follow") {
//         follow_state.innerHTML="unfollow";
//         users_following.push({name: user.name});
//         printUsersFollowing();
//     }
//     else if(follow_state.innerHTML=="unfollow") {
//         follow_state.innerHTML="follow";
//         printUsersFollowing();
//     }
// }
//
// function printUsersFollowing() {
//     following_panel.innerHTML = "";
//     for(user in users_following) {
//         following_panel.innerHTML +=
//             "<div class='userInfo col-md-12'>" +
//             "<div class='thumbnail'>" +
//             "<img src='../images/useravatar.png'>" +
//             "<div class='user-option'>" +
//             "<button id='btn-follow-state' class='btn btn-danger' onclick='changeFollowState(users[user])'>unfollow</button>" +
//             "<div class='user-name'>" +
//             "<p>" + users_following[user].name +"</p>" +
//             "</div></div></div></div>"
//     }
// }