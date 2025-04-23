
// template .js reines html ohne logik
// function mit 4 parameter buch objekt, index, herz img und html kommentar 
function bookTemplate(b, i, heartImg, commentHtml) {

    return `
<!-- Cover-Bild -->
    <article class="bookCard" id="book-${i}">
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


<!-- Metadaten: Likes, Preis, Autor, Jahr, Genre -->
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
<!-- Preis formatiert auf 2 Nachkommastellen -->
                    <figcaption class="bookCardPrice">${b.price.toFixed(2)} €</figcaption>

<!-- Autor, Jahr, Genre jeweils in einem <p> -->                    
                        <p class="bookMetaItem"><strong>Autor:</strong> ${b.author}</p>
                        <p class="bookMetaItem"><strong>Erscheinungsjahr:</strong> ${b.publishedYear}</p>
                        <p class="bookMetaItem"><strong>Genre:</strong> ${b.genre}</p>
                </div>

<!-- Kommentar‑Bereich -->
                    <aside class="bookCardComments">
                    <h3 class="commentsHeading">Kommentare</h3>
                <div class="commentsList" id="comments-${i}">
                ${commentHtml}
                </div>

<!-- Formular zum Hinzufügen eines neuen Kommentars -->
                        <form onsubmit="addComment(event)" data-index=${i}>
                            <label for="newComment" class="commentLabel">Schreibe dein Kommentar:</label>
                            <textarea id="newComment" name="comment" class="commentTextarea" placeholder="hier..."></textarea>
                            <button type="submit" class="commentSubmitBtn">Senden</button>
                        </form>
                    </aside>
    </article>
    `;
}