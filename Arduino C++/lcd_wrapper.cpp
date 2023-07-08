/* Includujem si havickove subory */
#include <Arduino.h>            // includne mi vsetky potrebne kniznice pre arduino
#include "lcd_wrapper.h"        // modul lcd_wrapper
#include <LiquidCrystal_I2C.h>  // kniznica pre ovladanie displeja s I2C modulom

// Objekt LiquidCrystal_I2C s nazvom LCD_display.
// Adresa pre I2C modul je 0x27 (v hex formate).
// Rozlisenie znaku je 5x8 pixelov
// Pocet stlpcov je 16 a pocet riadkov je 2, preto display 16x2
LiquidCrystal_I2C lcd_display(0x27, 16, 2, LCD_5x8DOTS);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
 * Funkcia lcd_init() nastavi displej, vola sa vo funkcii setup() 
 */
void lcd_init(){
    lcd_display.begin();    // otvori kanal pre data
    lcd_display.clear();    // vycisti cely dispaly
    lcd_display.setCursor(0,0); // nastavi kurzor na zaciatok displeja
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* 
 * Funkcia lcd_clear() vycisti cely displej 
 */
void lcd_clear(){
    lcd_display.clear();    // vycisti cely dispaly
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* 
 * Funkcia lcd_set_cursor() nastavi kurzor na dane miesto 
 */
void lcd_set_cursor(int y, int x){
    /* 
     *  Parameter x predstavuje stlpec
     *  Parameter y predstavuje riadok
     *  Stlpce aj riadky sa indexuju od NULY !!!
     */
    lcd_display.setCursor(x,y);
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* 
 * Funkcia lcd_print() vypise znakovy retazec na displej 
 */
void lcd_print(char* text){
    lcd_display.print(text); // vypise retazec
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* 
 * Funkcia lcd_print_at() je kombinacia predoslich dvoch funkcii 
 */
void lcd_print_at(int y, int x, char* text){
    lcd_set_cursor(y, x); // nstavi kurzor
    lcd_print(text);      // vypise retazec
}
