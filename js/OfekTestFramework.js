var currGroupHTML = "";
var currGroupResult = "";

function assert(value, name) {
    var result = (value) ? "passed" : "failed";
    currGroupResult = currGroupResult && value;
    currGroupHTML += "<li class='assert " + result + "'> " + name + "</li>";
}

function test_group(name, test_group_function) {
    currGroupResult = true;
    currGroupHTML = "<div class='testGroup #groupClass'>" + name + "<ul>";
    test_group_function();
    currGroupHTML += "</ul></div>";
    currGroupHTML = currGroupHTML.replace("#groupClass", currGroupResult ? "passed" : "failed");
    document.body.innerHTML += currGroupHTML;
}