#include "lcd_wrapper.h"    // modul lcd_wrapper
#include "mastermind.h"     // modul mastermind

/*___________________________Funkcia setup()______________________________*/
void setup() {
    lcd_init();                     // nastavi LCD displej
    Serial.begin(9600);             // nastavi prenosovu rychlost seriovej komunikacie s PC
    pinMode(BTN_1_PIN, INPUT);      // nastavi BTN_1_PIN ako vstupny
    pinMode(BTN_2_PIN, INPUT);      // nastavi BTN_2_PIN ako vstupny
    pinMode(BTN_3_PIN, INPUT);      // nastavi BTN_3_PIN ako vstupny
    pinMode(BTN_4_PIN, INPUT);      // nastavi BTN_4_PIN ako vstupny
    pinMode(BTN_ENTER_PIN, INPUT);  // nastavi BTN_ENTER_PIN ako vstupny
    pinMode(LED_RED_1, OUTPUT);     // nastavi pin LED_RED_1 ako vystupny
    pinMode(LED_RED_2, OUTPUT);     // nastavi pin LED_RED_2 ako vystupny
    pinMode(LED_RED_3, OUTPUT);     // nastavi pin LED_RED_3 ako vystupny
    pinMode(LED_RED_4, OUTPUT);     // nastavi pin LED_RED_4 ako vystupny
    pinMode(LED_BLUE_1, OUTPUT);    // nastavi pin LED_BLUE_1 ako vystupny
    pinMode(LED_BLUE_2, OUTPUT);    // nastavi pin LED_BLUE_2 ako vystupny
    pinMode(LED_BLUE_3, OUTPUT);    // nastavi pin LED_BLUE_3 ako vystupny
    pinMode(LED_BLUE_4, OUTPUT);    // nastavi pin LED_BLUE_4 ako vystupny
}

/*_________________________Funkcia loop()__________________________________*/
void loop() {
    char* secret = generate_code(/*true*/ false, 4);    // vygeneruje kod
    Serial.println(secret);                             // vypise hadany kod do monitoru serioveho portu
    play_game(secret);                                  // spusti hernu slucku
    free(secret);                                       // uvolni vygenerovany kod
}
