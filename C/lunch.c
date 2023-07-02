#include <stdio.h>


int main(){
	int x; //pocet ludi
	double paid=0;
	double donated=0;
	int check=0;
	scanf("%d",&x);
	if (x>20 || x<0){
		printf("Wrong input!\n");
		check=1;
		return 1;
	}
	else{
		int i;
		for(i=0;i<x;i++){
			int spolocenske_postavenie;
			scanf("%d",&spolocenske_postavenie);
			if(spolocenske_postavenie<1 || spolocenske_postavenie>2){
				printf("Wrong input!\n");
				check=1;
				return 1;
			}
			if(spolocenske_postavenie==1){ //student
				double vklad=0;
				scanf("%lf",&vklad);
				if(vklad<0){
					printf("Wrong input!\n");
					check=1;
					return 1;
				}
				if(0<=vklad && vklad<2){
					paid=paid+vklad;
				}
				if(2<=vklad && vklad<4){
					vklad=vklad-1;
					paid=paid+vklad;
					donated=donated+1;
				}
				if(4<=vklad){
					vklad=vklad-2;
					paid=paid+vklad;
					donated=donated+2;
				}
			}
			if(spolocenske_postavenie==2){ //zamestnanec
				double vklad=0;
				scanf("%lf",&vklad);
				if(vklad<0){
					printf("Wrong input!\n");
					check=1;
					return 1;
				}
				if(vklad>=0 && vklad<1.80){
					paid=paid+vklad;
				}
				if(vklad>=1.80 && vklad<3.60){
					double dotacia=0;
					double zaplatene=0;
					dotacia=(vklad/100)*55+0.42;
					int a=dotacia*1000;
					int b=a%10;
					int c=0;
					double d=0;
					if(b>=0 && b<5){
						 c=a/10;
					}
					else{
						c=a/10+1;
					}
					d=(double)c/100;
					donated=donated+d;
					zaplatene=vklad-d;
					paid=paid+zaplatene;
				}
				if(vklad>=3.60 && vklad<5.40){
					double dotacia=0;
					double zaplatene=0;
					dotacia=((3.60/100)*55)+0.42;
					int a=dotacia*1000;
					int b=a%10;
					int c=0;
					double d=0;
					if(b>=0 && b<5){
						 c=a/10;
					}
					else{
						c=a/10+1;
					}
					d=(double)c/100;
					donated=donated+d;
					zaplatene=vklad-d;
					paid=paid+zaplatene;
				}
				if(vklad>=5.40 && vklad<7.20){
					double dotacia=0;
					double zaplatene=0;
					dotacia=((vklad/100)*55)+(0.84);
					int a=dotacia*1000;
					int b=a%10;
					int c=0;
					double d=0;
					if(b>=0 && b<5){
						 c=a/10;
					}
					else{
						c=a/10+1;
					}
					d=(double)c/100;
					donated=donated+d;
					zaplatene=vklad-d;
					paid=paid+zaplatene;
				}
				if(vklad>=7.20 && vklad<9.00){
					double dotacia=0;
					double zaplatene=0;
					dotacia=((7.20/100)*55)+0.42+0.42;
					int a=dotacia*1000;
					int b=a%10;
					int c=0;
					double d=0;
					if(b>=0 && b<5){
						 c=a/10;
					}
					else{
						c=a/10+1;
					}
					d=(double)c/100;
					donated=donated+d;
					zaplatene=vklad-d;
					paid=paid+zaplatene;
				}
				if(vklad>=9.00 && vklad<10.80){
					double dotacia=0;
					double zaplatene=0;
					dotacia=((vklad/100)*55)+(3.00*0.42);
					int a=dotacia*1000;
					int b=a%10;
					int c=0;
					double d=0;
					if(b>=0 && b<5){
						 c=a/10;
					}
					else{
						c=a/10+1;
					}
					d=(double)c/100;
					donated=donated+d;
					zaplatene=vklad-d;
					paid=paid+zaplatene;
				}
				if(vklad>=10.80 && vklad<12.60){
					double dotacia=0;
					double zaplatene=0;
					dotacia=((10.80/100)*55)+0.42+0.42+0.42;
					int a=dotacia*1000;
					int b=a%10;
					int c=0;
					double d=0;
					if(b>=0 && b<5){
						 c=a/10;
					}
					else{
						c=a/10+1;
					}
					d=(double)c/100;
					donated=donated+d;
					zaplatene=vklad-d;
					paid=paid+zaplatene;
				}
				if(vklad>=12.60 && vklad<14.40){
					double dotacia=0;
					double zaplatene=0;
					dotacia=((vklad/100)*55)+(4.00*0.42);
					int a=dotacia*1000;
					int b=a%10;
					int c=0;
					double d=0;
					if(b>=0 && b<5){
						 c=a/10;
					}
					else{
						c=a/10+1;
					}
					d=(double)c/100;
					donated=donated+d;
					zaplatene=vklad-d;
					paid=paid+zaplatene;
				}
				if(vklad>=14.40 && vklad<16.20){
					double dotacia=0;
					double zaplatene=0; //yeet
					dotacia=((14.40/100)*55)+(4.00*0.42);
					int a=dotacia*1000;
					int b=a%10;
					int c=0;
					double d=0;
					if(b>=0 && b<5){
						 c=a/10;
					}
					else{
						c=a/10+1;
					}
					d=(double)c/100;
					donated=donated+d;
					zaplatene=vklad-d;
					paid=paid+zaplatene;
				}
				if(vklad>=16.20){
					double dotacia=0;
					double zaplatene=0;
					dotacia=((vklad/100)*55)+(5.00*0.42);
					int a=dotacia*1000;
					int b=a%10;
					int c=0;
					double d=0;
					if(b>=0 && b<5){
						 c=a/10;
					}
					else{
						c=a/10+1;
					}
					d=(double)c/100;
					donated=donated+d;
					zaplatene=vklad-d;
					paid=paid+zaplatene;
				}
			}
		}
		if (check==0){
		printf("Total: ");
		printf("%.2lf",donated);
		printf(" donated, ");
		printf("%.2lf",paid);
		printf(" paid.\n");
		}
	}
}

