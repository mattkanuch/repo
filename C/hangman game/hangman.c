#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include "hangman.h"

int is_word_guessed(const char secret[], const char letters_guessed[]); // Zistí, či na základe hádaných písmen hráč uhádol tajné slovo (malé písmená).
void get_guessed_word(const char secret[], const char letters_guessed[], char guessed_word[]); // Aktualizuje hádané slovo.
void get_available_letters(const char letters_guessed[], char available_letters[]); // Aktualizuje zoznam dostupných písmen, ktoré ešte neboli hádané (malé písmená).
void hangman(const char secret[]);  //Obsahuje funkcionalitu samotnej hry.

int get_word(char secret[]){
    // check if file exists first and is readable
    FILE *fp = fopen(WORDLIST_FILENAME, "rb");
    if( fp == NULL ){
        fprintf(stderr, "No such file or directory: %s\n", WORDLIST_FILENAME);
        return 1;
    }

    // get the filesize first
    struct stat st;
    stat(WORDLIST_FILENAME, &st);
    long int size = st.st_size;

    do{
        // generate random number between 0 and filesize
        long int random = (rand() % size) + 1;
        // seek to the random position of file
        fseek(fp, random, SEEK_SET);
        // get next word in row ;)
        int result = fscanf(fp, "%*s %20s", secret);
        if( result != EOF )
            break;
    }while(1);

    fclose(fp);

    return 0;
}

int main(){
	get_word();

	is_word_guessed();

}

int is_word_guessed(const char secret[], const char letters_guessed[]){
	
	//secret[]={'h','e','l','l','o'}
	//guessed[]={aeihoul}
	
	while (secret[]!=EOF){
		int pocet_slov=0;
		pocet_slov=pocet_slov+1;
		printf(pocet_slov);
	}

	return 1;
}

void get_guessed_word(const char secret[], const char letters_guessed[], char guessed_word[]){

}

void get_available_letters(const char letters_guessed[], char available_letters[]){

}

void hangman(const char secret[]){

}
