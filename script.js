
// *************** funktion: init ************
// startpunkt: wird aufgerufen sobald die seite geladen ist (<body onload"init()">)

function init() {
    const bodyContainer = document.getElementById('content');
    let allHtml = "";

    for (let i = 0; i < books.length; i++) {
        allHtml += renderTemplate(books[i], i);
    }
    bodyContainer.innerHTML = allHtml;

    for (let i = 0; i < books.length; i++) {
        showComments(i);
    }
}
function likeBook(event) {
    const index = +event.target.dataset.index;
    const book = books[index];
    const likeBox = event.target.parentElement;
    const likeSpan = likeBox.children[0];
    if (book.liked) {
        book.likes--;
        book.liked = false;
        event.target.src = "./assets/img/heartempty1.png";
    } else {
        book.likes++;
        book.liked = true;
        event.target.src = "./assets/img/heartfull1.png";
    }
    likeSpan.textContent = book.likes;
}

function addComment(event) {
    event.preventDefault();

    const index = +event.target.dataset.index;
    const book = books[index];

    const textarea = event.target.querySelector(".commentTextarea");
    const text = textarea.value.trim();

    if (text) {
        const comment = {
            name: "Du",
            comment: text,
        };

        book.comments.push(comment);
        textarea.value = "";
        showComments(index);
    }
}
function showComments(index) {
    const commentBox = document.getElementById("comments-" + index);
    const book = books[index];
    let html = "";

    for (let i = 0; i < book.comments.length; i++) {
        const c = book.comments[i];
        html += "<div><strong>" + c.name + ":</strong> " + c.comment + "</div>";
    }

    commentBox.innerHTML = html;
}

