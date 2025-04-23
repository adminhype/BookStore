
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

// funktion wird ausgerufen wenn ein kommentar abgeschickt wird 
// aufruf in template.js > <form onsubmit="addComment(event)" data-index="0"></form>
function addComment(event) {

    // verhindert das standart vehalten vom formular (nicht die ganze seite neu laden)
    event.preventDefault();

    // index ermitteln vom buch
    // event.target = ist das form Element
    // dataset.index liest das data.index attribut als strng
    // Number(..) wandelt den string in zahlen um 
    const index = Number(event.target.dataset.index);

    // holt das <textarea>-feld aus dem fomular
    /* <textarea name="comment">....</textarea> → event.target.elements.comment   */
    const textarea = event.target.elements.comment;

    // eingegebener text wird gelesen und leerzeichen werden entfernt
    // trim () schneidet leerenraum anfang / ende 
    const text = textarea.value.trim();

    // wenn kein text dann abbruch
    // text.length === 0 : feld leer → keine weitere aktion
    if (text.length === 0) return;

    // ein neues kommentar objekt wird erstellt und ins array hinzugefügt
    // books → globales array aus db .js
    // comments ist ein array in jedem buch objekt
    books[index].comments.push({
        name: 'du', // anzeige name
        comment: text // der getrimmte text aus textarea
    });

    //<textarea leeren für neuen input></textarea>
    textarea.value = '';

    // funktion aufrufen 
    // damit eintrag sofort ins DOM geladen wird 
    showComments(index)
}

// ************ funktion: showComments ********************

// diese funktion baut aus den (books[index].comments) html 
// zeigt es im kommentar container 
function showComments(index) {
    // ziel container im html 
    // id im template: id="comments-0 ect"
    // hier = 'comments-' + index z.b 'comments-9'
    const commentBox = document.getElementById('comments-' + index);

    // zum zusammen bauen des htmls leeren string 
    let htmlComment = '';

    // auf das array kommentar für das buch zugreifen 
    // wie bei addComment: books{index}.comments
    const comments = books[index].comments;

    // array durchlaufen mit for schleife
    // i = 0 (erste element), i < comments.length (bis zum letzten),
    // i++ eröht i in jedem durchlauf
    for (let i = 0; i < comments.length; i++) {
        // c = aktuelles kommentar objekt
        // { name: 'xyz', comment: 'xyz'}
        const c = comments[i];


        // für das objekt eine div 
        // strong um namen fett zu makrieren
        // + leerzeichen und kommentar text 
        htmlComment +=
            '<div><strong>' +
            c.name +
            ':</strong>' +
            c.comment +
            '</div>';
    }

    // gesamnten html string zusammensetzen
    // innerHTML ersetzt den inhalt
    commentBox.innerHTML = htmlComment;
}
