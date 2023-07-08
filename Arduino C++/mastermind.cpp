/* Includujem si havickove subory */
#include <Arduino.h>        // includne mi vsetky potrebne kniznice pre arduino
#include "mastermind.h"     // modul mastermind
#include "lcd_wrapper.h"    // modul lcd_wrapper

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* 
 * Funkcia generate_code() vygeneruje kod ktory sa bude hadat 
 */
char* generate_code(bool repeat, int length){
    /* Vsupne podmienky */
    if(repeat == false && length > 10) return NULL;         // ak sa cisla nemozu opakovat a retazec ma byt dlhsi ako 10 ciselny, tak je to blbost/nemozne lebo cislic mame iba 10 ...
    if(length < 1) return NULL;                             // menej ako jedno cislo sa tiez neda generovat ...

    /* Podmienky presli, idem generovat kod ... */
    char* code = (char*)calloc(length + 1, sizeof(char));   // vyhradim si miesto v pamati pre kod ...
    if(code == NULL) return NULL;                           // ak som nahodou nemal dostatok pamate, funkcia calloc vrati NULL preto to kontorlujem ... 
    for(int i=0; i<length; i++)                             // ak mam alokovanu pamat idem ju zaplnit ...
        code[i] = rand() % 10 + '0';                        // rand() -> generuje cisla, % 10 -> zvysok po deleni 10 (cisla od 0-9), + '0' -> pripocita hodnotu 0 z ASCII aby z cisla vznikol znak danej cislice
    code[length] = '\0';                                    // na koniec retazca dam ukoncovak, 'terminator'

    /* Ak sa cisla nemozu opakovat, tak to musim osetrit */
    if(repeat != true){                                     // ak sa nesmu opakovat, musim odstranit rovnake cisla a nahradit ich inymi
        for(int one = 0; one < length; one++)               // pozeram sa na prvi prvok a postupne postupujem dalej
            for(int two = (one + 1); two < length; two++)   // pozeram sa o jeden prvok dalej a postupne az do konca
                if(code[one] == code[two]){                 // ak sa jeden prvok rovna druhemu ...
                    code[two] =  rand() % 10 + '0';         // do druheho zapisem nove cislo
                    one = 0;                                // a zacnem prezeranie prvkov ...
                    two = one + 1;                          //                  ... odznova, od zaciatku ...
                }
    }
    
    /* Navratova hodnota funkcie */ 
    return code;                                            // vratim ukazatel na vygenerovany retazec
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
 * Funkcia get_score() zhodnoti pokus a vzgeneruje score (kolko cislic si uhadol)
 */
void get_score(const char* secret, const char* guess, int* peg_a, int* peg_b){
    int size_secret = strlen(secret);                           // dlzka kodu secret
    int size_guess = strlen(guess);                             // dlzka kodu guess

    *peg_a = 0;                                                 // vynulujem peg_a
    *peg_b = 0;                                                 // vynulujem peg_b
   
    if(size_secret == size_guess){                              // ak sa dlzky rovnaju mozem porovnavat
        for(int a = 0; a < size_secret; a++){                   // budem prechadzat retazcami
            if(secret[a] == guess[a])                           // ak sa na rovnakom mieste v retazcoch rovnaju znaky
                (*peg_a)++;                                     // do premennej peg_a pripocitam jednotku
            else{                    
                for(int b = 0; b < size_secret; b++)            // budem prechadzat retazcom guess
                    if((secret[a] == guess[b]) && (a != b))     // ak sa znaky v retazcoch rovnaju a nepozeram sa na rovnake miesta v retazcoch
                        (*peg_b)++;                             // do premennej peg_b pripocitam jednotku
            }
        }
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
 * Funkcia render_leds() rozsvieti RGB diody podla score
 */
void render_leds(const int peg_a, const int peg_b){
    /* Skopirujem si vstupne premenne do novych aby som ich mohol prepisovat, pretoze vstupne premenne su konstantne */
    int red = peg_a, blue = peg_b;
    
    /* Prva RGB dioda */
    if(red > 0){ digitalWrite(LED_RED_1, HIGH); red--; }            // ak su este cervene rozsietim ju a od cervenej odpoviam jendnu jednotku
    else if (blue > 0){ digitalWrite(LED_BLUE_1, HIGH); blue--; }   // ak nie su cervene a modre este hej rozsvietim modru a odpocitam jednu jednotku

    /* Druha RGB dioda */
    if(red > 0){ digitalWrite(LED_RED_2, HIGH); red--; }            // ak su este cervene rozsietim ju a od cervenej odpoviam jendnu jednotku
    else if (blue > 0){ digitalWrite(LED_BLUE_2, HIGH); blue--; }   // ak nie su cervene a modre este hej rozsvietim modru a odpocitam jednu jednotku

    /* Tretia RGB dioda */
    if(red > 0){ digitalWrite(LED_RED_3, HIGH); red--; }            // ak su este cervene rozsietim ju a od cervenej odpoviam jendnu jednotku
    else if (blue > 0){ digitalWrite(LED_BLUE_3, HIGH); blue--; }   // ak nie su cervene a modre este hej rozsvietim modru a odpocitam jednu jednotku

    /* Stvrta RGB dioda */
    if(red > 0){ digitalWrite(LED_RED_4, HIGH); red--; }            // ak su este cervene rozsietim ju a od cervenej odpoviam jendnu jednotku
    else if (blue > 0){ digitalWrite(LED_BLUE_4, HIGH); blue--; }   // ak nie su cervene a modre este hej rozsvietim modru a odpocitam jednu jednotku
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
 * Funkcia turn_off_leds() vypne vsetky LEDky
 */
void turn_off_leds(){
    /* Vypnem vsetky modre diody */
    digitalWrite(LED_BLUE_1, LOW);  // Zapise na PIN LED_BLUE_1 LOW a to je 0V na vystupe, preto led nebude svietit.
    digitalWrite(LED_BLUE_2, LOW);  // Zapise na PIN LED_BLUE_2 LOW a to je 0V na vystupe, preto led nebude svietit.
    digitalWrite(LED_BLUE_3, LOW);  // Zapise na PIN LED_BLUE_3 LOW a to je 0V na vystupe, preto led nebude svietit.
    digitalWrite(LED_BLUE_4, LOW);  // Zapise na PIN LED_BLUE_4 LOW a to je 0V na vystupe, preto led nebude svietit.

    /* Vypnem vsetky cervene diody */
    digitalWrite(LED_RED_1, LOW);   // Zapise na PIN LED_RED_1 LOW a to je 0V na vystupe, preto led nebude svietit.
    digitalWrite(LED_RED_2, LOW);   // Zapise na PIN LED_RED_2 LOW a to je 0V na vystupe, preto led nebude svietit.
    digitalWrite(LED_RED_3, LOW);   // Zapise na PIN LED_RED_3 LOW a to je 0V na vystupe, preto led nebude svietit.
    digitalWrite(LED_RED_4, LOW);   // Zapise na PIN LED_RED_4 LOW a to je 0V na vystupe, preto led nebude svietit.
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
void render_history(char* secret, char** history, const int entry_nr){
    int peg_a = 0, peg_b = 0;                           // premenne pre LED
    turn_off_leds();                                    // vypnem LED
    get_score(secret, history[0], &peg_a, &peg_b);      // vyhodnotim pokus z historie
    render_leds(peg_a, peg_b);                          // rozsvietim led

    lcd_print_at(0,0,"                ");               // vymazem prvy riadok displeja
    if(entry_nr == 0)       lcd_print_at(0,0, "01:");   // ak je entry_nr 0 na LCD vypisem "01:"
    else if(entry_nr == 1)  lcd_print_at(0,0, "02:");   // ak je entry_nr 0 na LCD vypisem "02:"
    else if(entry_nr == 2)  lcd_print_at(0,0, "03:");   // ak je entry_nr 0 na LCD vypisem "03:"
    else if(entry_nr == 3)  lcd_print_at(0,0, "04:");   // ak je entry_nr 0 na LCD vypisem "04:"
    else if(entry_nr == 4)  lcd_print_at(0,0, "05:");   // ak je entry_nr 0 na LCD vypisem "05:"
    else if(entry_nr == 5)  lcd_print_at(0,0, "06:");   // ak je entry_nr 0 na LCD vypisem "06:"
    else if(entry_nr == 6)  lcd_print_at(0,0, "07:");   // ak je entry_nr 0 na LCD vypisem "07:"
    else if(entry_nr == 7)  lcd_print_at(0,0, "08:");   // ak je entry_nr 0 na LCD vypisem "08:"
    else                    lcd_print_at(0,0, "09:");   // ak je entry_nr 0 na LCD vypisem "09:"

    lcd_print_at(0,4, history[0]);                      // nakoniec vypisem ciselnu kombinaciu z historie
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*  
 * Moja vlastna funkcia ktora sa spusti ak hru vyhram
 */
void make_win(){
    lcd_clear();                        // Vycistim LCD
    lcd_print_at(0,6,"WINNER");         // vypisem ze som vyhral
    for(int a=0; a<6; a++){             // rozblikaju sa mi ledky
        turn_off_leds();
        digitalWrite(LED_RED_1, HIGH);
        digitalWrite(LED_BLUE_2, HIGH);
        digitalWrite(LED_RED_3, HIGH);
        digitalWrite(LED_BLUE_4, HIGH);
        delay(250);
        turn_off_leds();
        digitalWrite(LED_BLUE_1, HIGH);
        digitalWrite(LED_RED_2, HIGH);
        digitalWrite(LED_BLUE_3, HIGH);
        digitalWrite(LED_RED_4, HIGH);
        delay(250);
    }
    turn_off_leds();
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*  
 * Moja vlastna funkcia ktora sa spusti ak hru prehram
 */
void make_lose(){
    lcd_clear();                        // Vycistim LCD
    lcd_print_at(0,4,"LOSE Game");      // vypisem ze som prehral
    for(int a=0; a<6; a++){     
        turn_off_leds();                // rozblikaju sa mi ledky
        digitalWrite(LED_RED_1, HIGH);
        digitalWrite(LED_RED_2, HIGH);
        digitalWrite(LED_RED_3, HIGH);
        digitalWrite(LED_RED_4, HIGH);
        delay(250);                     // 250 milisekund svietia na cerveno
        turn_off_leds();
        delay(250);                     // 250 milisekund nesvietia
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ TERAZ ZACINA NAJVACSIA SRANDA +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
 * Funkcia play_game() reprezentuje hernu slucku hry
 */
void play_game(char* secret){
/*___________________________ Uvitacia obrazovka 1 ________________________________*/
    lcd_clear();                     // vycisti obrazovku
    lcd_print_at(0,0,"Welcome to");  // vypise 'Welcome to' na poziciu 0,0
    lcd_print_at(1,6,"Mastermind");  // vypise 'Mastermind' na poziciu 0,6
    delay(1500);                     // Pocka 1,5 sekundy
    /* 
     * NA DISPLEJI SA ZOBRAZI:
     * +----------------+
     * |Welcome to      |
     * |      Mastermind|
     * +----------------+
     */

/*____________________________ Uvitacia obrazovka 2 ________________________________*/
    lcd_clear();                          // vycisti obrazovku
    lcd_print_at(0,0,"Guess my number");  // vypise 'Guess my number' na poziciu 0,0
    lcd_print_at(1,0,"You have 10 try");  // vypise 'You have 10 try' na poziciu 0,0
    delay(1500);                          // Pocka 1,5 sekundy
    /* 
     * NA DISPLEJI SA ZOBRAZI:
     * +----------------+
     * |Guess my number |
     * |You have 10 try |
     * +----------------+
     */

/*__________________________ Hlavna slucka hry ___________________________________*/
    bool play = true;           // ma sa hra hrat???
    
    int trial = 0;              // tu sa uklada kolko pokusov si uz absolvovat
    int trial_history = trial;  // vypisany pokus z historie
    int peg_a = 0;              // pocet spravne uhadnutych
    int peg_b = 0;              // pocet uhadnutych na zlom mieste

    char guess[5] = {"0000"};   // tu sa uklada moj aktualny pokus
    char* history[10][5];       // alokujem miesto pre historiu
    for(int a=0; a<10; a++){
        history[a][0] = calloc(5, sizeof(char));
    }

    lcd_clear();                            // zmazem display
    lcd_print_at(0,0,"History");            // vypisem hraciu...
    lcd_print_at(1,0,"Your guess: 0000");   //         ... obrazovku ...

    while(play){                            // premenna play sa rovna true cize while sa bude vykonavat kym sa nezmeni hodnota na false
        while(digitalRead(BTN_ENTER_PIN) == LOW){   // kym nestlacim ENTER robi sa tato slucka
            /* +++++++++++++++++++++ TLACIDLO 1 ++++++++++++++++++++++ */
            if(digitalRead(BTN_1_PIN) == HIGH){                                             // ak je stalacim 1 tlacidlo spusti sa tato slucka
                delay(50);                                                                  // delay(50) kym talcidlo prestane prekmitavat
                bool History = false;                                                       // pomocna premenna
                while(digitalRead(BTN_1_PIN) == HIGH){                                      // ak je stacene tlacidlo 1 ...
                    // listujem historiou dolu
                    if(digitalRead(BTN_2_PIN) == HIGH){                                     // ... a zaroven stacim druhe tlacidlo                     
                        delay(50);                                                          // delay(50) kym talcidlo prestane prekmitavat
                        if((trial_history - 1) >= 0){                                       // a ak este nie som na zaciatku zoznamu s historiou
                            trial_history--;                                                // premennu do ktorej ukladam poslednu vypisanu zlozku histoie zmencim o jedno
                            render_history(secret, history[trial_history], trial_history);  // vypisem  historiu
                        }
                        History = true;                                                     // History nastavim na true
                        while(digitalRead(BTN_2_PIN) == HIGH)                               // kym je tlacidlo stlacene ...
                            ;                                                               // nerob nic
                        delay(50);                                                          // delay(50) kym talcidlo prestane prekmitavat
                    }
                    // listujem historiou hore
                    if(digitalRead(BTN_3_PIN) == HIGH){                                     // ... a zaroven stacim rtetie tlacidlo
                        delay(50);                                                          // delay(50) kym talcidlo prestane prekmitavat
                        if((trial_history + 1) < trial){                                    // a ak este nie som na konci zoznamu s historiou
                            trial_history++;                                                // premennu do ktorej ukladam poslednu vypisanu zlozku histoie zvacsim o jedno
                            render_history(secret, history[trial_history], trial_history);  // vypisem  historiu
                        }
                        History = true;                                                     // History nastavim na true
                        while(digitalRead(BTN_3_PIN) == HIGH)                               // kym je tlacidlo stlacene ...
                            ;                                                               // nerob nic
                        delay(50);                                                          // delay(50) kym talcidlo prestane prekmitavat
                    }
                }
                delay(50);                              // delay(50) kym talcidlo prestane prekmitavat
                if(History == false){                   // ak je History nastavene na false znamena to ze som nevypisoval historiu a preto zmenim hodnotu cislice
                    guess[0] = guess[0] + 1;            // pripocitam jednotku
                    if(guess[0] > '9')                  // ak je cislica vacsia ako 9 ...
                        guess[0] = '0';                 //              ... zacnem od znova ...
                    lcd_print_at(1,12,guess);           // vypisem nove cislo
                }
            }
            /* +++++++++++++++++++++ TLACIDLO 2 ++++++++++++++++++++++ */
            if(digitalRead(BTN_2_PIN) == HIGH){         // ak je stlacene tlacidlo vykona sa tato slucka
                delay(50);                              // delay(50) kym talcidlo prestane prekmitavat
                guess[1] = guess[1] + 1;                // pripocitam jednotku
                if(guess[1] > '9')                      // ak je cislica vacsia ako 9 ...
                    guess[1] = '0';                     //              ... zacnem od znova ...
                lcd_print_at(1,12,guess);               // vypisem nove cislo
                while(digitalRead(BTN_2_PIN) == HIGH)   // kym je tlacidlo stlacene ...
                    ;                                   // nerob nic
                delay(50);                              // delay(50) kym talcidlo prestane prekmitavat
            }
            /* +++++++++++++++++++++ TLACIDLO 3 ++++++++++++++++++++++ */
            if(digitalRead(BTN_3_PIN) == HIGH){         // ak je stlacene tlacidlo vykona sa tato slucka
                delay(50);                              // delay(50) kym talcidlo prestane prekmitavat
                guess[2] = guess[2] + 1;                // pripocitam jednotku
                if(guess[2] > '9')                      // ak je cislica vacsia ako 9 ...
                    guess[2] = '0';                     //              ... zacnem od znova ...
                lcd_print_at(1,12,guess);               // vypisem nove cislo
                while(digitalRead(BTN_3_PIN) == HIGH)   // kym je tlacidlo stlacene ...
                    ;                                   // nerob nic
                delay(50);                              // delay(50) kym talcidlo prestane prekmitavat
            }
            /* +++++++++++++++++++++ TLACIDLO 4 ++++++++++++++++++++++ */
            if(digitalRead(BTN_4_PIN) == HIGH){         // ak je stlacene tlacidlo vykona sa tato slucka
                delay(50);                              // delay(50) kym talcidlo prestane prekmitavat
                guess[3] = guess[3] + 1;                // pripocitam jednotku
                if(guess[3] > '9')                      // ak je cislica vacsia ako 9 ...
                    guess[3] = '0';                     //              ... zacnem od znova ...
                lcd_print_at(1,12,guess);               // vypisem nove cislo
                while(digitalRead(BTN_4_PIN) == HIGH)   // kym je tlacidlo stlacene ...
                    ;                                   // nerob nic
                delay(50);                              // delay(50) kym talcidlo prestane prekmitavat
            }
        }
        delay(50);                                      // delay(50) kym talcidlo prestane prekmitavat
        while(digitalRead(BTN_ENTER_PIN) == HIGH)       // kym je tlacidlo enter stlacene ...
            ;                                           // nerob nic
        delay(50);                                      // delay(50) kym talcidlo prestane prekmitavat

        strcpy(history[trial][0], guess);                   // skopirujem terajsi pokus do historie 
        turn_off_leds();                                    // vypnem vsetky ledky
        render_history(secret, history[trial], trial);      // vypisem historiu
        get_score(secret, *history[trial], &peg_a, &peg_b); // vygenerujem score
        render_leds(peg_a, peg_b);                          // rozsvietim ledky

        trial_history = trial;      // nastavim posledny vypis historie
        trial++;                    // pricitam dalsi pokus
        
        if(peg_a == 4){             // ak som rtafil vsetky cislice
            play = false;           // prestanem hrat hru v dalsej slucke
            make_win();             // zablikam ledkami
        }
        else if(trial == 10){       // ak som netrafil vsetky cislice a dosli mi pokusy
            play = false;           // prestanem hrat hru v dalsej slucke
            make_lose();            // zablikam ledkami
        }
    }
}
