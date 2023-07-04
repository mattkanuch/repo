#include "bmp.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

char* reverse(const char* text){
	if(text == NULL)
		return 0;
		
	int dlzka=strlen(text);
	char pole[dlzka+1];
	for(int i=0;i!=dlzka;i++){
		pole[dlzka-i-1]=toupper(text[i]);
	}
	pole[dlzka]='\0';
	
	char *back;
	back=malloc((dlzka+1)*sizeof(char));
	back=strcpy(back,pole);
	return back;
}
/*
char* vigenere_encrypt(const char* key, const char* text){
	if(key == NULL)
		return 0;
	
	if(text == NULL)
		return 0;
		
	return 0;
}

char* vigenere_decrypt(const char* key, const char* text){
	if(key == NULL)
		return 0;
	
	if(text == NULL)
		return 0;
		
	return 0;
}

unsigned char* bit_encrypt(const char* text){
	if(text == NULL)
		return 0;
	
	return 0;	
}

char* bit_decrypt(const unsigned char* text){
	if(text == NULL)
		return 0;
	
	return 0;	
}

unsigned char* bmp_encrypt(const char* key, const char* text){
	if(key == NULL)
		return 0;
	
	if(text == NULL)
		return 0;
		
	return 0;
}

char* bmp_decrypt(const char* key, const unsigned char* text){
	if(key == NULL)
		return 0;
	
	if(text == NULL)
		return 0;
		
	return 0;
}
*/