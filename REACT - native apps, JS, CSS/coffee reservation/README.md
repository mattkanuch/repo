**Coffee shop APP**

**Link na Video:**https://youtu.be/YZTwjV2pn2Q
**Doplnené funkcie:**https://youtu.be/kXqhoULdlo0

**Stručné info:**
Hlavným cieľom aplikácie je používateľom/zákazníkom uľahčiť objednávanie kávy a rezervovanie stolov v kaviarni.
Celá aplikácia funguje aj keď nie je zariadenie pripojené na sieť (z dôvodu ľahšieho de-buggingu, kontroly a ukázania hl. funkcionality)

**Intro Obrazovka**
Tu si môžte vybrať jazyk aplikácie (ENG/SK) a mód zobrazenie (light/night), následne sa preklikneme na hlavnú obrazovku,
kde sú následujúce funkcie:

Na hlavnej obrazovke nám pod Logom píše či je obchod momentálne otvorený alebo zatvorený, podľa toho aký je čas a deň

**SHOP:**
Hlavná funkcia aplikácie:
Tu si môžte vyberať z 18 rôznych typov káv. Kliknutím na kávu sa spustí objednávka, ktorú môžte do 15 sekúnd zrušiť.
potom sa reálna objednávka spustí, ktorá sa už nedá zrušiť a trvá nejaký čas, kým sa káva pripraví. 
(šetríme čas, tak celá objednávka je nerealisticky rýchlo vybavená v priebehu 15 sekúnd aby sa ukázala funkčnosť).
nakoniec sa zobrazí kód objednávky a jej QR kód

**MIX:**
Hlavná funkcia aplikácie:
Tu si môžte podľa seba pripraviť kávu, vyberáte z niekoľkých ingrediencií a potom stlačením tlačidla objednať - proces pokračuje
ako objednávka SHOP-u.
táto celá funkcia mala byť skôr graficky spracovaná ale štýlom ako som začal písať aplikáciu som to už nevedel schopne spojazdniť :/
aspoň som sa naučil ako som to mohol spraviť krajšie a lepšie! :)

**Reserve Table**
Hlavná funkcia aplikácie:
Tu si zakliknutím čísla stolu môžte rezervovať stôl na určitý čas.

**Find Shop**
Zobrazí mapu kde sa shop/kaviareň nachádza.
Kliknutím tlačidla aké je počasie? - zistíme teplotu pred obchodom - použité OpenWeather API.
Kliknutím tlačidla Ako som ďaleko od Obchodu? - zistíme aká vzdialenosť je medzi mojim zariadením a obchodom/kaviarňou v metroch 
   (Emulátor hovorí že je 9000km od obchodu, Ale reálne zariadenie píše správne hodnoty) - použitý akčný člen GPS modul.
Otvor v mape - otvorí lokáciu obchodu vo vašich Mapách.

**Info**
tu sa nachádza info o aplikácií a obchode + otváracie hodiny (podľa nich píše na hl. obrazovke či je obchod otvorený/zatvorený)
-nič zaujímavé na tejto strane, iba kopa textu kvôli SK/ENG prekladu :D


