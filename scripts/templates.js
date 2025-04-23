// *************** Funktion: renderTemplate *******************

// wird aufgerufen mit renderTemplate(b, i)
// b = aktuelles buch aus db .js (array)
// i = index im array (0,1,2 ect)

function renderTemplate(b, i) {
    // leere variable für die heart img 
    let heartImg = "";
    // wenn b.liked(dieses buch gelkied ist)
    if (b.liked) {
        // wenn ja, heartfull 
        heartImg = "./assets/img/heartfull1.png";
    } else {
        // wenn nein, heartempy 
        heartImg = "./assets/img/heartempty1.png";
    }
    // Kommentare zusammensetzen aus strings
    let commentHTML = "";
    for (let i = 0; i < b.comments.length; i++) {
        // kommentar objekt 
        const kommentar = b.comments[i];

        // jedes kommentar in div anzeigen
        // name als auch kommentar 
        commentHTML += `
        <div class="commentItem">
        <strong>${kommentar.name}:</strong> ${kommentar.comment}
        </div>
    `;
    }

    // template mit dynamischem inhalt ${b.xy}
    // das komplette html template als string 
    // wird als rückgabewert gegben um in init() oder innerHTML zu rendern 

    return `
<!-- Cover-Bild -->
    <article class="bookCard" id="firstCard">
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
                <div class="commentsList" id="comments-${i}"></div>

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
