#include "hangman.h"
#include <stdio.h>

int main(){
	char secret[15];
	get_word(secret);
	hangman(secret);
	return 0;
}
