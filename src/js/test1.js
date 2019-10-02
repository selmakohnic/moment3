"use strict";

//Visar och dÃ¶ljer hamburgermeny. Byter bild beroende pÃ¥ om menyn Ã¤r Ã¶ppen eller stÃ¤ngd
function toggleMenu() {
    $("#globalNav").toggle();
    $(".hamburgerMenu").toggleClass("hMenuClose");
 }

//Kommentar som kommer att tas bort med minifiering
console.log("Detta är första filen.");

//Arrow-funktion som kommer konverteras till vanlig funktion med Babel
const doubled = (x) => x * 2;
console.log(doubled(6));