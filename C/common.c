#include <stdio.h>

short int gcd(const short int a, const short int b);
short int gcd2(const short int a, const short int b);
long int lcm(const int a, const int b);

int main(){}

long int lcm(const int a, const int b){
	short int A,B;
	int c;
	if(a<0){
		A=a*(-1);
	}
	else{
		A=a;
	}
	if(b<0){
		B=b*(-1);
	}
	else{
		B=b;
		//A=a;
	}
	if((a<1 || a>10000) || (b<1 || b>10000)){
		//musi byt -jedna
		return -1;
	}
	else{
		c=(A*B)/gcd2(a,b);
		return c;
	}
}

short int gcd(const short int a, const short int b){
	short int A, B;
//prva pdmienka
if(b<0){	
	B=b*(-1);
}
else{
	B=b;
}
//druha pdmienka
if(a<0){
	A=a*(-1);
}
else{
	A=a;
}
if(a==0 || b==0 || a<-1000 || a>1000 || b<-1000 || b>1000){ //hlavna podmienka
	//taktiez musi byt -jedna
	return -1;
}
else{
	while (A !=B){
		if(A>B){
			A=A-B;
		}
		else{
			B=B-A;
		}
	}
}
//navrat dodruhej podmienky
return A;
}


//int c=(A*B)/gcd(a,b);
//

short int gcd2(const short int a, const short int b){
	short int A,B;

	if(b<0){
		B=b*(-1);
	}
	else{
		B=b;
	}
	if(a<0){
		A=a*(-1);
	}
	else{
		A=a;
	}
	if(a<1 || a>10000 || b<1 || b>10000){
		return -1;
		//musi byt -jedna
	}
	else{ 
		while(A!=B){
			if(A>B){
				A=A-B;
			}
			else{
				B=B-A;
			}
		}
	}
	return A;
}

//long int lcm(const int a, const int b){
//	short int A,B;
//	if(a<=0){
//		A=a*(-1);
//	}
//	else{
//		A=a;
//	}
//	if(b<=0){
//		B=b*(-1);
//	}
//	else{
//		B=b;
//	}
//	if((a<=1 || a>=10000) || (b<=1 || b>=10000)){
//		return -1;
//	}
//	else{
//		return (A*B)/gcd2(a,b);
//	}
//}

