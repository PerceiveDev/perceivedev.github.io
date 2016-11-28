var markdown = {
    convert: function(input) {
        return this.converter.makeHtml(input);
    },
    getData: function(key) {
        var url = window.location.search.substring(1);
        var pairs = url.split("&");

        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split("=");
            if (pair[0] == key) {
                return pair[1];
            }
        }

        return null;
    },
    getErrorText: function(errorCode, errorText) {
        var error = [
            "#Uh-oh!",
            "It appears that something has gone wrong while trying to load the document you requested. Would you like to [go back to the index?](../index.html)",
            "`" + errorCode + ": " + errorText + "`",
        ];
        var total = "";
        for (var i in error) {
            total = total + error[i] + "\n\n";
        }
        return this.convert(total);
    }
}

// DocumentLoader is a custom class for loading markdown files onto an element
function DocumentLoader(element, path) {

    this.element = element;

    if (!path) {
        // They didn't specify a file, so show them a custom error (so meme, much wow!)
        element.innerHTML = markdown.getErrorText(9001, "No file specified");
        return;
    }

    this.path = path;

    // Create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // The thing loaded!
    xhr.onloadend = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Everything loaded perfectly!
            element.innerHTML = markdown.convert(this.responseText);
        } else {
            // Well, that didn't work right! Better show them a useful error.
            element.innerHTML = markdown.getErrorText(this.status, this.statusText);
        }
    };

    // Open a request to the raw markdown file
    xhr.open("GET", "./raw/" + this.path + ".md?no_cache=" + Math.random(), false);
    xhr.send();

}


window.onload = function() {

    if (!window.showdown) {
        console.error("markdown.js could not find showdown.js!");
        return;
    }

    markdown.converter = new showdown.Converter();

    var attach = document.querySelector(".markdown-attach-point");
    if (!attach) {
        console.error("Failed to find an attach point for markdown.js!");
        return;
    }

    // Load the document onto the attach point
    new DocumentLoader(attach, markdown.getData("f"));

}
