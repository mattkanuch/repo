#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <ctype.h>
#include <string.h>

double get_money(){
	printf("Enter value of your bill: ");
	double money;
	scanf("%lf",&money);

	return money;
}

double get_payment(){
	double sucet=0;
	printf("Insert money for payment: ");
	double z=0;
	while(scanf("%lf", &z)!=EOF){
		if(z==0){
			break;
		}
		sucet+=z;
	}
	printf("You have inserted: %.21f\n",sucet);
	return sucet;
}


int main(){
	double x=get_money();
	if (x>10000){
		printf("Wrong input!\n");
		return 1;
	}
	if(x<0.01){
		printf("Wrong input!\n");
		return 1;
	}
	
	double y=0;
	y=get_payment();
	if (y!=0.01 || y!=0.02 || y!=0.05 || y!=0.10 || y!=0.20 || y!=0.50 || y!=1 || y!=2 || y!=5 || y!=10 || y!=20 || y!=50 || y!=100){
		if (y==0){
			printf("Not enough money!\n");
			return 1;
		}
		else{
		printf("%.2lf is invalid!\n",y);
		return 1;

		}
	}
}
