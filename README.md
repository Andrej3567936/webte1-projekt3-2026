# webte1-projekt3-2026

**Autor:** Andrej Hudačko
**Cviko:** pondelok 11:00
**Link:** https://webte1.fei.stuba.sk/~xhudacko/

**O projekte:**
Môj TODO List je webová aplikácia na správu osobných úloh. Úlohy sa dajú vytvárať, upravovať, označovať ako dokončené a mazať. Okrem zoznamu je tu aj kalendár s mesačným, týždenným a denným zobrazením, oba čerpajú z tých istých dát. Zoznam sa dá filtrovať podľa stavu, hľadať v ňom podľa názvu a zoraďovať podľa dátumu.

Všetko sa ukladá na server cez REST API. Do localStorage ide iba identifikátor, pod ktorým server vedie zoznam, úlohy nikdy.

**Zdroj dát:** https://wt1zadanie.iolab.sk (dokumentácia na `/docs`)

**Technológie:**

- Vue 3 + Vite (komponenty `.vue`, build)
- Vue Router 4 (stránky), Pinia (spoločný stav)
- Bootstrap 5.3.3 (CSS)
- FullCalendar 6.1.15 (kalendár)
- Fetch API (komunikácia so serverom)

**Štruktúra:** `src/views` stránky, `src/components` opakovane použité časti, `src/stores` stav, `src/services` volania API, `src/utils` pomocné funkcie.

**Font:** Outfit (lokálne, formát woff2, súbor `src/assets/fonts/Outfit-VariableFont_wght.woff2`)

- Zdroj: https://fonts.google.com/specimen/Outfit
- Licencia: SIL Open Font License, Version 1.1 (https://openfontlicense.org)

**Inštalácia a spustenie:**

```
npm install
npm run dev
```

Otvoriť adresu z terminálu (http://localhost:5173). Verzia na server sa vyrobí cez `npm run build`, nahráva sa obsah priečinka `dist/`.

**Použitie AI**
Ai som použil najmä pri učení sa Vue, kedže to bola pre mňa úplne nová vec. Slúžil mi ako mentor a vysvetľoval mi reaktivitu, ref, computed, props a emit a hlavne rozdiel oproti práci s DOM, ktorú som robil v minulých zadaniach. Vysvetlil mi aj rozdelenie projektu na komponenty, router a store podľa cvičení. Pomohol mi aj pri hľadaní chýb a pri dolaďovaní CSS. Veľkú časť kódu som preberal od neho a potom si ju prechádzal a nechal vysvetliť. Používal som najmä Claude.
