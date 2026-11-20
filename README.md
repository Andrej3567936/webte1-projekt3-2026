# webte1-projekt3-2026

**Autor:** Andrej Hudačko
**Cviko:** pondelok 11:00
**Link:** https://webte1.fei.stuba.sk/~xhudacko/

**O projekte:**
Môj TODO List je webová aplikácia na správu osobných úloh. Úlohy sa dajú vytvárať, upravovať, označovať ako dokončené a mazať. Okrem zoznamu je tu aj kalendár s mesačným, týždenným a denným zobrazením. Zoznam aj kalendár čerpajú z tých istých dát, takže zmena v jednom sa hneď prejaví v druhom. Zoznam sa dá filtrovať podľa stavu, hľadať v ňom podľa názvu a zoraďovať podľa začiatku alebo konca.

Všetko sa ukladá na server cez REST API, nič do localStorage (okrem zapamätania identifikátora). Pri otvorení treba zadať identifikátor, pod ktorým server vedie zoznam.

**Zdroj dát:** https://wt1zadanie.iolab.sk (dokumentácia na `/docs`)

**Knižnice:**

- Vue 3.4.21 (CDN)
- Bootstrap 5.3.3 (CSS aj JS)
- FullCalendar 6.1.15 (CDN)

**Font:** Outfit (lokálne, formát woff2, súbor `fonts/Outfit-VariableFont_wght.woff2`)

- Zdroj: https://fonts.google.com/specimen/Outfit
- Licencia: SIL Open Font License, Version 1.1 (https://openfontlicense.org)

**Inštalácia a spustenie:**
Žiadna inštalácia netreba, projekt nepoužíva npm ani build. Knižnice idú z CDN, font je v projekte. Stačí spustiť cez HTTP server, napríklad rozšírením Live Server vo VS Code (pravý klik na `index.html` → Open with Live Server) alebo príkazom:


**Použitie AI**
AI som použil najmä pri učení sa Vue, keďže to bola pre mňa úplne nová vec. Slúžilo mi ako mentor, vysvetľovalo mi reaktivitu, `ref`, `computed`, props a emit a hlavne rozdiel oproti práci s DOM, ktorú som robil v minulých zadaniach. Kód som písal postupne a pri každej časti som sa pýtal, čo robí a prečo, nie štýlom copy-paste. Pomohlo mi aj pri hľadaní chýb (napríklad server vracia úlohy zabalené v objekte, nie ako pole), pri nastavení FullCalendar a pri dolaďovaní CSS. Používal som Claude.
