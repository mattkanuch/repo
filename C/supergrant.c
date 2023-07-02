#include <stdio.h> 
#include <math.h>
int is_prime(const int number);         //Zistí, či je dané číslo number prvočíslo (prime number).
int next_prime(const int prime);        //Na základe daného prvočísla prime nájde nasledujúce prvočíslo.
long int find_A_n(const int n);         //Na základe daného čísla n nájde číslo A_n.
int sum_digits(const long int number);  //Vypočíta ciferný súčet pre vstupné číslo number.
int sum_digits_n(const int n); 	        //Na základe daného čísla n nájde n-té číslo v postupnosti ciferných súčtov.
int constant(const int a, const int b); //Vypočíta konštantu K supergrantu.i

int main(){
	double grant;
	double pozemok=0;
	double hnojivo=0;
	double suma=0;
	scanf("%lf",&pozemok);
	if(pozemok<1 || pozemok>5000){
		printf("Wrong input!\n");
		return 1;
	}
	else{
		scanf("%lf",&hnojivo);
		if(-20>hnojivo || hnojivo>20){
			printf("Wrong input!\n");
			return 1;
		}
		else{
			scanf("%lf",&suma);
			if(suma<1000 || suma>1000000){
				printf("Wrong input!\n");
				return 1;
			}
			else{
				grant=((100-constant(pozemok, hnojivo))*suma/100);
				printf("Supergrant: %.2f\n", grant);
				return 0;
			}
		}
	}
}

int is_prime(const int number){
	if(number==7 || number ==3 || number==5  || number==2 || (number>1 && number%2!=0 && number%3!=0 && number%5!=0 && number%7!=0)){
		return 1;
	}
	else{
		return 0;
	}
}

int next_prime(const int prime){
	int prime_plus_jedna=prime+1;
	if(is_prime(prime)!=1){
		return -1;
	}
	else{
		//int prime+1prime+1;
		while(is_prime(prime_plus_jedna)!=1){
			prime_plus_jedna++;
		}
		return prime_plus_jedna;
	}
}

long int find_A_n(const int n){
	int A_n=2;
	int m=0;
	int h=0;
	int array[n];
	array[0]=2;
	if(n>=1){
		int i;
		for(i=1;i<n;i++){
			array[i]=next_prime(array[i-1]);
		}
		while(m!=n){
			int t;
			for(t=0; t<n; t++){
				if(A_n%array[t]==t+1){
					h++;
				}
			}
			if(h!=n){
				A_n++;
			}
		}
		return A_n;
	}
	else{
		return 0;
	}
}

int sum_digits(const long int number){
	if(number<0){
		return 0;
	}
	else{
		int i;
		int j;
		long int n=number; 
		long int cisla[8];
		int o=0;
		for(i=0; i<8; i++){
			cisla[i]=n%10;
			n=n/10;
		}
		for(j=0; j<8; j++){
			o=o+cisla[j];
		}
		return o;
	}
}

int sum_digits_n(const int n){
	if(n<=0){
		return 0;
	}
	else{
		int i;
		int number=1;
		for(i=0; i<n-2; i++){
			number=number+sum_digits(number);
		}
		return number;
	}
}

int constant(const int a, const int b){
	int aa=sum_digits_n(a);
	int bb, cc;
	if(1<=b && b<=9){
		bb=sum_digits(find_A_n(b));
	}
	else{
		bb=sum_digits(sum_digits_n(a));
	}
		if(aa>bb){
			//musim delit
			cc=aa/bb; 
		}
		else{
			//musim delit
			cc=bb/aa;
		}
		while(cc>=50){
			if(cc%2!=0){
				cc=sum_digits(cc);
			}
			else{
				cc/=2;
			}
		}
		return cc;
}

