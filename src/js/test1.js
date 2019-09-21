"use strict";

//Visar och dÃ¶ljer hamburgermeny. Byter bild beroende pÃ¥ om menyn Ã¤r Ã¶ppen eller stÃ¤ngd
function toggleMenu() {
    $("#globalNav").toggle();
    $(".hamburgerMenu").toggleClass("hMenuClose");
 }

//Kommentar som kommer att tas bort med minifiering
console.log("Detta är första filen.");