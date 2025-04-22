function renderTemplate(b, i) {

    let heartImg = "";

    if (b.liked) {
        heartImg = "./assets/img/heartfull1.png";
    } else {
        heartImg = "./assets/img/heartempty1.png";
    }
    // Kommentare zusammensetzen
    let commentHTML = "";
    for (let i = 0; i < b.comments.length; i++) {
        const kommentar = b.comments[i];
        commentHTML += `
        <div class="commentItem">
        <strong>${kommentar.name}:</strong> ${kommentar.comment}
        </div>
    `;
    }

    // template mit dynamischem inhalt ${b.xy}
    return `
    <article class="bookCard">
                <div class="bookCardHeader">
                <h2 class="bookCardTitle">${b.name}</h2>
                </div>
                <figure class="bookCardCover">
                <img
                    src="./assets/logo/book1-removebg.png"
                    alt="Cover: ${b.name}"
                    class="bookCoverImage"
                />
                </figure>
                <div class="bookCardMeta">

                    <div class="bookCardLikes">
                        <span class="likes-Count">${b.likes}</span>
                        <img
                            src="${heartImg}"
                            alt="Gefällt mir"
                            onclick="likeBook(event)"
                            class="heartIcon"
                            data-index="${i}"
                        />
                    </div>

                    <figcaption class="bookCardPrice">${b.price.toFixed(2)} €</figcaption>
                        <p class="bookMetaItem"><strong>Autor:</strong> ${b.author}</p>
                        <p class="bookMetaItem"><strong>Erscheinungsjahr:</strong> ${b.publishedYear}</p>
                        <p class="bookMetaItem"><strong>Genre:</strong> ${b.genre}</p>
                </div>
                    <aside class="bookCardComments">
                    <h3 class="commentsHeading">Kommentare</h3>
                <div class="commentsList" id="comments-${i}"></div>

                        <form onsubmit="addComment(event)" data-index=${i}>
                            <label for="newComment" class="commentLabel">Schreibe dein Kommentar:</label>
                            <textarea id="newComment" name="comment" class="commentTextarea" placeholder="hier..."></textarea>
                            <button type="submit" class="commentSubmitBtn">Senden</button>
                        </form>
                    </aside>
    </article>
    `;
}
