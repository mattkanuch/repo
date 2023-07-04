#include <stdio.h>
#include <stdlib.h>
#include "bmp.h"
#include "playfair.h"

int main() {
	char* p= reverse("");
	printf("reverse: %s\n",p);
	free(p);
		
	char* c=playfair_encrypt("wobble","fauns");
	printf("play_e: %s<\n",c);
	char* h=playfair_decrypt("parlances", "SF GE RU");
	printf("play_d: %s<\n",h);
	free (c);
	free (h);
	
	return 0;
}