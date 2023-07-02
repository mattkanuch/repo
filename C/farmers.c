#include <stdio.h>


int main(){
	int x;
	double dotacia=0;
	double vysledok=0;
	scanf("%d",&x);
	if (x>20 || x<=0){
		printf("Wrong input!\n");
		return 1;
	}
	else{
		int i;
		for(i=0;i<x;i++){
			int rozloha;
			int pocet_zvierat;
			int eco;
			scanf("%d",&rozloha);
			scanf("%d",&pocet_zvierat);
			scanf("%d",&eco);
			if (rozloha<0 || pocet_zvierat<0 || eco<0 || rozloha>10000 || pocet_zvierat>10000 || eco>10000){
				printf("Wrong input!\n");
				return 1;
			}
			else{
				int priemerA=((double)rozloha/(double)pocet_zvierat)*1000;
				int a=priemerA%10;
				int priemerB=0;
				double priemer;
				if(a<5 && a>=0){
					priemerB=priemerA/10;
				}
				else{
					priemerB=(priemerA/10)+1;
				}
				priemer=(double)priemerB/100;
				dotacia=(priemer*(double)eco)*pocet_zvierat;
				vysledok+=dotacia;
			}


//			rozloha_celkowa+=rozloha;
//			pocet_celkowy_zvierat+=pocet_zvierat;
//			eco_celkowe+=eco;
		}
		printf("Total donation: %.2lf\n",vysledok);
//		long double priemer;
//		priemer=((long double)rozloha_celkowa/(long double)pocet_celkowy_zvierat);
//		long double celkowa_dotacia;
//		celkowa_dotacia=((priemer*(double)eco_celkowe)*(double)pocet_celkowy_zvierat);
//		printf("Total donation: %Lf\n",celkowa_dotacia);
	}
}
