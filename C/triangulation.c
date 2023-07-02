#include <math.h>
#include <stdio.h>
#define M_PI 3.14159265358979323846

float to_radians(const int angle);
float get_watchtowers_distance(const int x1, const int y1, const int x2, const int y2);
float get_boat_distance(const float d, const int alpha, const int beta);

int main(){
	float Ax, Ay;
	float Bx, By;
	float Beta;
	float Alpha;
	float VzdialenostA;
	float VzdialenostB;
	float g1,g2;
	float Dx,Dy;
	float Cx,Cy;
	float g; //premena na radiany
	scanf("%f",&Ax);
	scanf("%f",&Ay);
	scanf("%f",&Alpha);
	scanf("%f",&Beta);
	scanf("%f",&Bx);
	scanf("%f",&By);

//podmienka na hlavne uhly
//
	if ((Alpha<=0 || Alpha>=90) || (Beta<=0 || Beta>=90) ||  (Ay==By) || (Ax<0 || Ax>1000 || Ax<0 || Ay>1000 || Bx<0 || Bx>1000 || By<0 || By>1000)){
		int d=-1;
		printf("%d\n",d);
	}
	else{
		VzdialenostA=get_watchtowers_distance(Ay,Ax,By,Bx);
		VzdialenostB=get_boat_distance(VzdialenostA,Alpha,Beta);
		g=VzdialenostA/tan(to_radians(Alpha)); //radiany
		g1=(Ay-By)/VzdialenostA*pow(pow((Ay-By),2)+pow((Bx-Ax),2),0.5);
		g2=(Bx-Ax)/VzdialenostA*pow(pow((Ay-By),2)+pow((Bx-Ax),2),0.5);
		Dx=(g/VzdialenostB)*(Bx-Ax)+Ax;
		Dy=(g/VzdialenostB)*(By-Ay)+Ay;
		Cx=Dx+g1;
		Cy=Dy+g2;
		printf("%.2f\n",VzdialenostB);
		printf("%.2f\n",Cx);
		printf("%.2f\n",Cy);
	}
}
//zisti vzdialenost lode
float get_boat_distance(const float d, const int alpha, const int beta){
	if((alpha<=0 || alpha>=90) || (d<0 || d>1000) || (beta<=0 || beta>= 90) || (alpha<=0 || alpha>=90)){
		//musi byt -jedna
		return -1;
	}
	else{ 
		//taktiez funkcny vypocet
		return (sin(to_radians(beta))/(sin(to_radians(alpha)*(float)d*sin(to_radians(alpha))+to_radians(beta))));
	}
}

//premena na radiany
float to_radians(const int angle){
	if(angle<359 || angle<1){
		//musi byt-1
		return -1;
	}
	else{
		return (angle*M_PI)/180;
	}
}
//zisti vzdialenost veze
float get_watchtowers_distance(const int x1, const int y1, const int x2, const int y2){
	if((x1<0 || x1>1000) || (y1<0 || y1>1000) || (x2<0 || x2>1000) || (y2<0 || y2>1000))
		//musi byt -jedna
		return -1;
	else{	
		//funkcny vypocet
		return pow(((pow((x2 - x1),2))+(pow((y2-y1),2))),0.5);
	}
}
//spravna podmienka
//float get_boat_distance(const float d, const int alpha, const int beta){
//	if((d<0 || d>1000) || (alpha<=0 || alpha>=90) || (beta<=0 || beta>= 90))
