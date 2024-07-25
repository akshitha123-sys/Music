$(function () {
    setInterval(function () {

        $("#booksdetails").fadeToggle("slow");
    }, 1000);
});
var asyncRequest;

function start() {
    document.getElementById("all").addEventListener("click", function () {
        getImages("all.xml");
    });

    document.getElementById("tabla").addEventListener("click", function () {
        getImages("tabla.xml");
    });

    document.getElementById("violin").addEventListener("click", function () {
        getImages("violin.xml");
    });

    document.getElementById("drum").addEventListener("click", function () {
        getImages("drum.xml");
    });

    document.getElementById("none").addEventListener("click", clearImages);
}

function getImages(url) {
    try {
        asyncRequest = new XMLHttpRequest();
        var relpath = "data/"; 
        asyncRequest.addEventListener("readystatechange", processResponse, false);
        asyncRequest.open("GET", relpath + url, true);
        asyncRequest.send(null);
    } catch (exception) {
        console.error("Async request failed:", exception);
        alert("Async request failed");
    }
}

function processResponse() {
    if (asyncRequest && asyncRequest.readyState == 4 && asyncRequest.status == 200 && asyncRequest.responseXML) {
        clearImages();
        var covers = asyncRequest.responseXML.getElementsByTagName("cover");
        var output = document.getElementById("covers");
        var imagesUL = document.createElement("ul");

        for (var i = 0; i < covers.length; ++i) {
            var cover = covers[i];
            var imgFileName = cover.getElementsByTagName("image")[0].firstChild.nodeValue;
            var title = cover.getElementsByTagName("title")[0].firstChild.nodeValue;
            var imageLI = document.createElement("li");
            var imageTag = document.createElement("img");

            imageTag.src = "data/" + imgFileName;
            imageTag.id = title;
            imageTag.addEventListener("mouseover", function () {
                document.getElementById("title").innerHTML = this.id;
            }, false);

            imageTag.addEventListener("mouseout", function () {
                document.getElementById("title").innerHTML = "";
            }, false);

            imageLI.appendChild(imageTag);
            imagesUL.appendChild(imageLI);
        }

        output.appendChild(imagesUL);
    }
}

function clearImages() {
    document.getElementById("covers").innerHTML = "";
}

window.addEventListener("load", start, false);