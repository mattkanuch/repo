#include <stdio.h>

int main(int argc, char *argv[]){
	if(argc!=2){
		printf("Too many arguments were given!\n");
		return 1;
	}
	FILE *fsrc =fopen(argv[1],"r");
	char x[]={'a','n','a','n','a','s'};
	char X[]={'A','N','A','N','A','S'};
	if(fsrc==NULL){
		printf("The file you entered is probably non existent!\n");
		return 1;
	}

	char b[6];
	b[5]=fgetc(fsrc);
	int g=0;
	int pocet_slow=0;
	while(b[5]!=EOF){
		for(int i=0;i!=6;i++){
			if(x[i]==b[i] || X[i]==b[i]){
				g=g+1;
			}
		}
		if(g==6){
			pocet_slow=pocet_slow+1;
		}
		for(int j=0;j!=5;j++){
			b[j]=b[j+1];
		}
		b[5]=fgetc(fsrc);
		g=0;
	}
	fclose(fsrc);

	FILE *fvysledok=fopen(argv[1],"w");
	
	int ciszielko[7];
	for(int i=6; i>=0; i=i-1){
		ciszielko[i]=pocet_slow%10;
		pocet_slow=pocet_slow/10;
	}
//	for(int i=0;i<7;i++){
//		printf("%d", ciszielko[i]);
//	}
	for(int i=0; i<7; i++){
		if(ciszielko[i]!=0){
			ciszielko[i]=ciszielko[i]+'0';
		}
		else{
			ciszielko[i]=' ';
		}
	}
	
	int y=0;
	while(ciszielko[0]==' '){
		for(int k=0; k!=7; k++){
			ciszielko[k]=ciszielko[k+1];
		}
		y=y+1;
	}

	ciszielko[8-y]='\0';

	for(int i=0; ciszielko[i]!='\0'; i=i+1){
		fputc(ciszielko[i],fvysledok);
	}

	fclose(fvysledok);
//	printf("\n%ls\n",ciszielko);
	return 0;
}

