
// *************** funktion: init ************
// startpunkt: wird aufgerufen sobald die seite geladen ist (<body onload"init()">)

function init() {
    // DOM-abfrage: sucht das element mit der id 'content*'
    // hier wird später der gesamte HTML-code der bookcards eingfügt
    const bodyContainer = document.getElementById('content');

    // hmtl-strings für alle bücher sammeln 
    let allHtml = "";
    // schleife für jedes buch im globalen array 'books' in db.js
    // i = zähler = startindex(0), bedingung i kleiner als anzahl der elemente im array books,
    //                      i++ zähler um 1 erhöht um auf das nächste element anzusprechen
    for (let i = 0; i < books.length; i++) {
        // 1. books[i] übergibt das aktuelle buch
        // 2. i dient als eindeutiger index 
        // 3. rendertemplate liefert den html code 
        // 4. += fügt den code an allhtml an 
        allHtml += renderTemplate(books[i], i);
    }
    // gesammelten html code in den container einsetzen
    bodyContainer.innerHTML = allHtml;
    // kommentare für jedes buch nachladen / anzeigen
    for (let i = 0; i < books.length; i++) {
        showComments(i);
    }
}

// **************************** funktion likeBook ******************* 

// startpunkt: wird ausgeführt beim klicken auf herz img(bookCardLikes)
// event enthält details des klick ergebniss
function likeBook(event) {

    // event.target = das geklickte html element (img)
    // .dataset.index = werte aus dataset.index (als string gespeichert)
    // + = wandelt string in zahlen um
    // index = buch-index um objekt im array zu finden  
    const index = +event.target.dataset.index;

    // konstante variable book + books array greift auf die position 0 im index zu
    const book = books[index];

    // parentElement: elternelement des img(bookCardLikes)
    const likeBox = event.target.parentElement;

    // erstes kind element[0] von likeBox ↑↑↑
    // enthält die aktuelle like anzahl im span (template.js)
    const likeSpan = likeBox.children[0];

    // prüft ob books array > liked true oder false
    if (book.liked) {
        // likes werden um 1 veringert
        book.likes--;
        // status auf nicht geliked 
        book.liked = false;
        // leeres herz wird angezeigt
        event.target.src = "./assets/img/heartempty1.png";

        // wenn nicht
    } else {
        // likes zahl wird um 1 erhöht
        book.likes++;
        // status auf liked 
        book.liked = true;
        // volles herz wird angezeigt
        event.target.src = "./assets/img/heartfull1.png";
    }
    // likeSpan & aktualisiert (textContent) like zahl im html 
    likeSpan.textContent = book.likes;
}

// *********************** Funktion: addComment *****************


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

