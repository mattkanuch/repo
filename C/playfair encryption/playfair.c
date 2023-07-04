#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include "playfair.h"


char* playfair_encrypt(const char* key, const char* text) {
//	printf("text: %s\n",text);
//	printf("key: %s\n",key);
	//podmienka pre prázdny vstup
	if (key == NULL) {
		return NULL;
	}
	if (text == NULL) {
		return NULL;
	}
		
	//podmienka valid znakov pre key
	for (int i = 0; key[i] != '\0'; i++) {
		if (key[i]!=32 && (key[i] < 65 || key[i]>90) && (key[i] < 97 || key[i]>122)) {
			return NULL;
		}

	}

	//podmienka valid znakov pre text
	for (int i = 0; text[i] != '\0'; i++) {
		if (text[i]!=32 && (text[i] < 65 || text[i]>90) && (text[i] < 97 || text[i]>122)) {
			return NULL;
		}

	}
	// vytvorenie matice a abecedy
	char matica[5][5];
	char abc[] = {ALPHA};

	//kópia vstupu
	int size_key=strlen(key);
//	printf("%d\n", size_key);
	char copy[size_key+1];
	for(int i=0; key[i]!='\0';i++){
		copy[i]=toupper (key[i]);
		if(copy[i]=='W'){
			copy[i]='V';
		}
	}
	copy[size_key]='\0';
	
	for(int i=0;copy[i]!='\0';i++){
		if(copy[i]==' '){
			for(int j=i;copy[j]!='\0';j++){
				copy[j]=copy[j+1];
			}
			i=0;
		}
	}
	if(copy[0]=='\0'){
		return 0;
	}
//	printf("key bez medier: %s\n",copy);


//uprava pola, rovnake pismena het

	for(int i=0;copy[i]!='\0';i++){
		for(int j=i+1;copy[j]!='\0';j++){
			if(copy[i]==copy[j]){
				for(int k=j;copy[k]!='\0';k++){
					copy[k]=copy[k+1];
				}
				i=0;
				j=0;
			}
		}
	}
	//printf("key bez pis: %s\n",copy);


//vymaznie pismen duplicitnych

	for(int i=0;copy[i]!='\0';i++){
		for(int j=0;abc[j]!='\0';j++){
			if(abc[j]==copy[i]){
				for(int k=j;abc[k]!='\0';k++){
					abc[k]=abc[k+1];
				}
				i=0;
				j=0;
			}
		}
	}

	//printf("abc bez pis: %s\n",abc);
	
	int help=0;
	int position=0;
	
	for(int i=0;i<=4;i++){
		for(int j=0;j<=4;j++){
			if(help==0){
				matica[i][j]=copy[position];
				position++;
				if(copy[position]=='\0'){
					help++;
					position=0;
				}
			}	
			else{
				matica[i][j]=abc[position];	
				position++;
			}
		}
	}
	
//	for(int i=0;i<=4;i++){
//		for(int j=0;j<=4;j++){
//			printf("%c ",matica[i][j]);
//		}
//		printf("\n");
//	}
	
	
	int number=0;
	for(int i=0; text[i]!='\0';i++){
		if(text[i]==text[i+1]){
			number++;
		}
	}
	
	int size_text=strlen(text)+number;
	char copy_text[size_text+5];
	
	for(int i=0; text[i]!='\0';i++){
		copy_text[i]=toupper (text[i]);
		if(copy_text[i]=='W'){
			copy_text[i]='V';
		}
		copy_text[i+1]='\0';
	}
	
	for(int i=0;copy_text[i]!='\0';i++){
		if(copy_text[i]==' '){
			for(int j=i;copy_text[j]!='\0';j++){
				copy_text[j]=copy_text[j+1];
			}
			i=0;
		}
	}
	
	for(int i=0; copy_text[i]!='\0';i=i+2){
		if(copy_text[i+1]=='\0'){
			copy_text[i+2]='\0';
			copy_text[i+1]='X';
		}
		if((copy_text[i]==copy_text[i+1])&&(copy_text[i]!='X')){
			position=0;
			while(copy_text[position]!='\0'){
				position++;
			}
			position++;
			for(int f=position;f>i;f--){
				copy_text[f+1]=copy_text[f];
			}
			copy_text[i+1]='X';
		}
	}
	
//	printf("copy_text %s\n",copy_text);

	int size_copy_text=strlen(copy_text);
	int size_space = size_copy_text/2-1;
	char encrypted_text[size_copy_text+1+size_space];
	
	int i, pos;
	for(i=0, pos=0; copy_text[i]!='\0';i=i+2, pos=pos+3){
		int x1=0;
		int y1=0;
		int x2=0;
		int y2=0;
		for(int a=0; a<=4;a++){
			for (int b=0; b<=4;b++){
				if(copy_text[i]==matica[a][b]){
					x1=a;
					y1=b;
				}
				if(copy_text[i+1]==matica[a][b]){
					x2=a;
					y2=b;
				}
			}
		}
		if(y1==y2){
//			printf("rovnake stlpce %d %d\n", y1, y2);
			int t=x1+1;
			if(t==5){
				t=0;
			}
			int t2=x2+1;
			if(t2==5){
				t2=0;
			}
//			printf("t1=%d\t t2=%d\n", t, t2);
			encrypted_text[pos]=matica[t][y1];
			encrypted_text[pos+1]=matica[t2][y2];
		}	
		else if(x1==x2){
//			printf("rovnake riadky %d %d\n", x1, x2);
			int t=y1+1;
			if(t==5){
				t=0;
			}
			int t2=y2+1;
			if(t2==5){
				t2=0;
			}
			encrypted_text[pos]=matica[x1][t];
			encrypted_text[pos+1]=matica[x2][t2];
		}
		else{
//			printf("priesecnik\n");
			encrypted_text[pos]=matica[x1][y2];
			encrypted_text[pos+1]=matica[x2][y1];
		}		
		encrypted_text[pos+2]=' ';
	}
	encrypted_text[pos-1]='\0';
//	printf("%s\n", encrypted_text);
	
	char* back=malloc(strlen(encrypted_text)+1);
	
	for(int i=0;encrypted_text[i]!='\0';i++){
		back[i]=encrypted_text[i];
		back[i+1]='\0';
	}
	
	return back;
}

	
char* playfair_decrypt(const char* key, const char* text) {
	
	//podmienka pre prázdny vstup
	if (key == NULL) {
		return NULL;
	}
	if (text == NULL) {
		return NULL;
	}

	//podmienka valid znakov pre text
	for (int i = 0; text[i] != '\0'; i++) {
		if (text[i] != 32 && (text[i] < 65 || text[i]>90) && (text[i] < 97 || text[i]>122)) {
			return NULL;
		}
	}

	//podmienka valid znakov pre key
	for (int i = 0; key[i] != '\0'; i++) {
		if (key[i]!=32 && (key[i] < 65 || key[i]>90) && (key[i] < 97 || key[i]>122)) {
			return NULL;
		}
	}

	//abeceda
	char abc[] = { ALPHA };
	char matica[5][5];

	int size_key=strlen(key);
	char copy[size_key+1];
	for(int i=0; key[i]!='\0';i++){
		copy[i]=toupper (key[i]);
		if(copy[i]=='W'){
			copy[i]='V';
		}
	}
	
	copy[size_key]='\0';
	for(int i=0;copy[i]!='\0';i++){
		if(copy[i]==' '){
			for(int j=i;copy[j]!='\0';j++){
				copy[j]=copy[j+1];
			}
			i=0;
		}
	}
	if(copy[0]=='\0'){
		return 0;
	}
	//uprava pola, rovnake pismena het

	for(int i=0;copy[i]!='\0';i++){
		for(int j=i+1;copy[j]!='\0';j++){
			if(copy[i]==copy[j]){
				for(int k=j;copy[k]!='\0';k++){
					copy[k]=copy[k+1];
				}
				i=0;
				j=0;
			}
		}
	}
	//printf("key bez pis: %s\n",copy);


//vymaznie pismen duplicitnych

	for(int i=0;copy[i]!='\0';i++){
		for(int j=0;abc[j]!='\0';j++){
			if(abc[j]==copy[i]){
				for(int k=j;abc[k]!='\0';k++){
					abc[k]=abc[k+1];
				}
				i=0;
				j=0;
			}
		}
	}

	
	int help=0;
	int position=0;
	
	for(int i=0;i<=4;i++){
		for(int j=0;j<=4;j++){
			if(help==0){
				matica[i][j]=copy[position];
				position++;
				if(copy[position]=='\0'){
					help++;
					position=0;
				}
			}	
			else{
				matica[i][j]=abc[position];	
				position++;
			}
		}
	}
		
	int number=0;
	for(int i=0; text[i]!='\0';i++){
		if(text[i]==text[i+1]){
			number++;
		}
	}
	
	int size_text=strlen(text)+number;
	char copy_text[size_text+5];
	
	for(int i=0; text[i]!='\0';i++){
		copy_text[i]=toupper (text[i]);
		if(copy_text[i]=='W'){
			return 0;
		}
		copy_text[i+1]='\0';
	}
	for(int i=0;copy_text[i]!='\0';i++){
		if(copy_text[i]==' '){
			for(int j=i;copy_text[j]!='\0';j++){
				copy_text[j]=copy_text[j+1];
			}
			i=0;
		}
	}
	
//	printf("key: %s\n", copy);
//	printf("text: %s\n", copy_text);
//	for(int i=0;i<=4;i++){
//		for(int j=0;j<=4;j++){
//			printf("%c ",matica[i][j]);
//		}
//		printf("\n");
//	}

	int size_copy_text=strlen(copy_text);
//	printf("size_text: %d\n",size_copy_text);
	char decrypted_text[size_copy_text+1];
	
	for(int i=0; copy_text[i]!='\0';i=i+2){
		int x1=0;
		int y1=0;
		int x2=0;
		int y2=0;
		for(int a=0; a<=4;a++){
			for (int b=0; b<=4;b++){
				if(copy_text[i]==matica[a][b]){
					x1=a;
					y1=b;
				}
				if(copy_text[i+1]==matica[a][b]){
					x2=a;
					y2=b;
				}
			}
		}
		if(y1==y2){
//			printf("rovnake stlpce %d %d\n", y1, y2);
			int t=x1-1;
			if(t==-1){
				t=4;
			}
			int t2=x2-1;
			if(t2==-1){
				t2=4;
			}
//			printf("t1=%d\t t2=%d\n", t, t2);
			decrypted_text[i]=matica[t][y1];
			decrypted_text[i+1]=matica[t2][y2];
		}	
		else if(x1==x2){
//			printf("rovnake riadky %d %d\n", x1, x2);
			int t=y1-1;
			if(t==-1){
				t=4;
			}
			int t2=y2-1;
			if(t2==-1){
				t2=4;
			}
			decrypted_text[i]=matica[x1][t];
			decrypted_text[i+1]=matica[x2][t2];
		}
		else{
//			printf("priesecnik\n");
			decrypted_text[i]=matica[x1][y2];
			decrypted_text[i+1]=matica[x2][y1];
		}		
		decrypted_text[i+2]='\0';
	}
//	printf("%s\n", decrypted_text);
	
	char* back=malloc(strlen(decrypted_text)+1);
	
	for(int i=0;decrypted_text[i]!='\0';i++){
		back[i]=decrypted_text[i];
		back[i+1]='\0';
	}
	
	return back;
}
