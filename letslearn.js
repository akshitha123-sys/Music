'use strict';
var asyncRequest;

function start() {
    document.getElementById("bookSelector").addEventListener("change", function () {
        var selectedBook = this.value;
        if (selectedBook !== "none") {
            getBookDetails(selectedBook);
        } else {
            clearBookDetails();
        }
    });
}

function getBookDetails(bookType) {
    try {
        asyncRequest = new XMLHttpRequest();
        
        asyncRequest.onreadystatechange = processResponse;
        asyncRequest.open("GET", "letslearn.xml", true);
        asyncRequest.send();
    } catch (exception) {
        console.error("Async request failed:", exception);
        alert("Async request failed");
    }
}

function processResponse() {
    if (asyncRequest.readyState == 4 && asyncRequest.status == 200 && asyncRequest.responseXML) {
        const xmlDoc = asyncRequest.responseXML;
        const selectedBook = document.getElementById("bookSelector").value;
        const items = xmlDoc.getElementsByTagName(selectedBook)[0].getElementsByTagName("item");

        clearBookDetails();

        const bookContainer = document.getElementById("bookContainer");

        for (let i = 0; i < items.length; ++i) {
            const item = items[i];          
            const imgFileName = item.getElementsByTagName("image")[0].firstChild.nodeValue;
            const title = item.getElementsByTagName("title")[0].firstChild.nodeValue;
            const author = item.getElementsByTagName("author")[0].firstChild.nodeValue;
            const description1 = item.getElementsByTagName("description1")[0].firstChild.nodeValue;
            const description2 = item.getElementsByTagName("description2")[0].firstChild.nodeValue;
            const description3 = item.getElementsByTagName("description3")[0].firstChild.nodeValue;
            const description4 = item.getElementsByTagName("description4")[0].firstChild.nodeValue;
            const description5 = item.getElementsByTagName("description5")[0].firstChild.nodeValue;
            const description6 = item.getElementsByTagName("description6")[0].firstChild.nodeValue;

            const bookImage = document.createElement("img");
            bookImage.src = "data/" + imgFileName;

            const bookDetails = document.createElement("div");
            bookDetails.innerHTML = `
                <h2>${title}</h2>
                <p>${author}</p>
                <p>${description1}</p>
                <p>${description2}</p>
                <p>${description3}</p>
                <p>${description4}</p>
                <p>${description5}</p>
                <p>${description6}</p>
            `;

            bookContainer.appendChild(bookImage);
            bookContainer.appendChild(bookDetails);
        }
    }
}

function clearBookDetails() {
    document.getElementById("bookContainer").innerHTML = "";
}

window.addEventListener("load", start,false);
