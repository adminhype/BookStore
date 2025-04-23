
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
    const index = Number(event.target.dataset.index);
    const textarea = event.target.elements.comment;
    const text = textarea.value.trim();
    if (text.length === 0) return;

    books[index].comments.push({
        name: 'du',
        comment: text
    });

    textarea.value = '';

    showComments(index)
}
function showComments(index) {
    const commentBox = document.getElementById('comments-' + index);

    let htmlComment = '';

    const comments = books[index].comments;

    for (let i = 0; i < comments.length; i++) {
        const c = comments[i];
        htmlComment +=
            '<div><strong>' +
            c.name +
            ':</strong>' +
            c.comment +
            '</div>';
    }
    commentBox.innerHTML = htmlComment;
}
function renderTemplate(b, i) {
    const heartImg = getHeartImg(b);
    const commentHtml = buildCommentHTML(b.comments);
    return bookTemplate(b, i, heartImg, commentHtml);
}

function getHeartImg(book) {
    return book.liked
        ? './assets/img/heartfull1.png'
        : './assets/img/heartempty1.png';
}

function buildCommentHTML(comments) {
    let html = '';
    for (let c of comments) {
        html += `<div class="commentItem"><strong>${c.name}:</strong> ${c.comment}</div>`;
    }
    return html;
}