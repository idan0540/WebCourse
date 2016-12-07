let OfekQuery = function (objects) {
    this.objects = objects;
};

function $(selector) {
    if (selector === undefined || selector === null || selector === "") {
        return;
    }
    let result = [document];
    let selectors = selector.split(' ');
    for (currSelector of selectors) {
        let token = currSelector.charAt(0);
        let name = currSelector.substring(1);
        if (token == "#") {
            result = [document.getElementById(name)];
        } else {
            let newResult = [];
            for (currElement of result) {
                let newElements;
                if (token == ".") {
                    newElements = currElement.getElementsByClassName(name);
                }
                else {
                    newElements = currElement.getElementsByTagName(currSelector);
                }
                addToCollection(newResult, newElements);
            }
            result = newResult;
        }
    }
    return new OfekQuery(result);
}

function addToCollection(collection, collectionToAdd) {
    for (currElement of collectionToAdd) {
        collection.push(currElement);
    }
}

OfekQuery.prototype.addClass = function (className) {
    for(object of this.objects) {
        object.classList.add(className);
    }
};

OfekQuery.prototype.removeClass = function (className) {
    for(object of this.objects) {
        object.classList.remove(className);
    }
};

OfekQuery.prototype.each = function (func) {
    for (object of this.objects) {
        func(object);
    }
};

OfekQuery.prototype.map = function (func) {
    var results = [];
    for (object of this.objects) {
        results.push(func(object));
    }
    return results;
};

OfekQuery.prototype.any = function () {
    for (object of this.objects) {
        if (checkObject(object, arguments)) {
            return true;
        }
    }
    return false;
};

OfekQuery.prototype.all = function () {
    for (object of this.objects) {
        if (!checkObject(object, arguments)) {
            return false;
        }
    }
    return true;
};

OfekQuery.prototype.filter = function () {
    var newObject = [];
    for (object of this.objects) {
        if (checkObject(object, arguments)) {
            newObject.push(object);
        }
    }
    return new OfekQuery(newObject);
};

OfekQuery.prototype.css = function (property, value) {
    this.each(function (obj) {
        obj.style[property] = value;
    });
};

OfekQuery.prototype.count = function () {
    if(this.objects[0] != null) {
        return this.objects.length;
    }
    return 0;
};

OfekQuery.prototype.appendChild = function (childElement) {
    this.each(function (obj) {
        obj.appendChild(childElement.cloneNode(true));
    });
};

OfekQuery.prototype.getAttribute  = function (attributeName) {
    this.map(function (obj) {
        return obj.getAttribute(attributeName);
    });
};

OfekQuery.prototype.setAttribute = function (attributeName, attributeValue) {
    this.each(function (obj) {
        obj.setAttribute(attributeName, attributeValue);
    });
};

OfekQuery.prototype.get = function (index) {
    return this.objects[index];
};