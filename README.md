# Moment 2 - NodeJs & Gulp
## _Frågor_
1. Vad är syftet med automatisering?<br>
**Svar:** Syftet med automatisering är att på ett enkelt sätt kunna modifiera filer och exempelvis samla alla filer som ska publiceras på ett ställe. Filerna kan göras klara för export genom att exempelvis sammanslås, minifieras och kopieras över till en mapp för publicering eller testning.
2. Vilka paket har använts?<br>
    * **gulp-concat** - För att sammanslå filer
    * **gulp-uglify-es** - För att minifiera JS-filer
    * **gulp-clean-css** - För att minifera CSS-filer
    * **browser-sync** - För att uppdatera webbläsaren vid en ändring
3. Beskriv systemet du har skapat, hur man startar upp det och de tasks som ingår.<br>
**Svar:** Det system som har skapats kopierar över filer till en specifik mapp för publicering, sammanslår och minifierar filer. Systemet består av ett antal tasks som beskrivs nedan. En watcher lyssnar på alla tasks.<br>
    * **copyHtml()** - Kopierar HTML-filer och talar om för webbpläsaren att ändringen är gjord
    * **cssTask()** - Sammanslår, minifierar, kopierar CSS-filer och talar om för webbläsaren att ändringarna är gjorda
    * **jsTask()** -  Sammanslår, minifierar, kopierar JS-filer och talar om för webbläsaren att ändringarna är gjorda 
    * **copyImg()** - Kopierar bilder och talar om för webbpläsaren att ändringen är gjord
    * För att starta systemet klona först projektet genom: **git clone https://github.com/selmakohnic/moment2.git** och skriv därefter kommandot: **npm install** i en terminal