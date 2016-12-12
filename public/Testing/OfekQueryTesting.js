describe("Selector", function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryHTML.html'];
    });
    it("Get non existing id", function () {
        var result = $("#fake").get(0);
        expect(result).toBe(null);
    });
    it("Get element by id", function () {
        var result = $("#myDiv");
        var myDiv = document.getElementById("myDiv");
        expect(result.count()).toBe(1);
        expect(result.get(0)).toBe(myDiv);
    });
    it("Get single element by class", function () {
        var result = $(".singleClass");
        var myClass = document.getElementsByClassName("singleClass")[0];
        expect(result.count()).toBe(1);
        expect(result.get(0)).toBe(myClass);
    });
    it("Get multiple elements by class", function () {
        var result = $(".multiClass");
        var myClass = document.getElementsByClassName("multiClass");
        expect(result.count()).toBe(myClass.length);
    });
    it("Get elements by tag", function () {
        var result = $("myTag");
        var myTags = document.getElementsByTagName("myTag");
        expect(result.count()).toBe(myTags.length);
        expect(result.get(0)).toBe(myTags[0]);
    });
    it("Get elements by class in tag", function () {
        var result = $("containerTag .insideClass");
        var myElements = [];
        myElements[0] = document.getElementById("inside1");
        myElements[1] = document.getElementById("inside2");
        myElements[2] = document.getElementById("inside3");
        expect(result.count()).toBe(3);
        for (var i = 0; i < myElements.length; i++) {
            expect(result.get(i)).toBe(myElements[i]);
        }
    });
});
describe("addClass", function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryHTML.html'];
    });
    it("Add class to a single object", function () {
        $("#myDiv").addClass("newClass");
        var myDiv = document.getElementById("myDiv");
        expect(myDiv.getAttribute("class")).toBe("newClass");
    });
    it("Add class to a single object with classes", function () {
        $("#divWithClass").addClass("newClass");
        var myDiv = document.getElementById("divWithClass");
        expect(myDiv.getAttribute("class")).toBe("oldClass newClass");
    });
    it("Add class to number of objects", function () {
        $("myTag").addClass("newClass");
        var myTags = document.getElementsByTagName("myTag");
        for (var i = 0; i < myTags.length; i++) {
            expect(myTags[i].getAttribute("class")).toBe("newClass");
        }
    });
    it("Add existing class", function () {
        $("#divWithClass").addClass("oldClass");
        var myDiv = document.getElementById("divWithClass");
        expect(myDiv.getAttribute("class")).toBe("oldClass");
    });
});
describe("removeClass", function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryHTML.html'];
    });
    it("Remove class to a single object", function () {
        $("#divWithClass").removeClass("oldClass");
        var myDiv = document.getElementById("divWithClass");
        expect(myDiv.getAttribute("class")).toBe("");
    });
    it("Remove class to object with few classes", function () {
        $("#divWithManyClass").removeClass("firstClass");
        var myDiv = document.getElementById("divWithManyClass");
        expect(myDiv.getAttribute("class")).toBe("secondClass");
    });
    it("Remove class to number of objects", function () {
        $(".classToRemove").removeClass("classToRemove");
        var elements = document.getElementsByClassName("classToRemove");
        for (var i = 0; i < elements.length; i++) {
            expect(elements[i].getAttribute("class")).toBe("");
        }
    });
    it("Remove non existing class", function () {
        $("#divWithClass").removeClass("newClass");
        var myDiv = document.getElementById("divWithClass");
        expect(myDiv.getAttribute("class")).toBe("oldClass");
    });
});

describe("map", function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryHTML.html'];
    });
    it("get results from all elements", function () {
        var mapResult = $(".mapIt").map(function (obj) {
            return obj.innerHTML;
        });
        expect(mapResult.length).toBe(3);
        expect(mapResult[0]).toBe("test1");
        expect(mapResult[1]).toBe("test2");
        expect(mapResult[2]).toBe("test3");
    });
});

describe("any", function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryHTML.html'];
    });
    it("get if any of the elements do the function", function () {
        var anyResult = $(".mapIt").any(function (obj) {
            return obj.innerHTML.includes("te3st");
        });
        expect(anyResult).toBe(false);
    });
});

describe("all", function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryHTML.html'];
    });
    it("get if all of the elements do the function", function () {
        var allResult = $(".mapIt").all(function (obj) {
            return obj.innerHTML.includes("test");
        });
        expect(allResult).toBe(true);
    });
});