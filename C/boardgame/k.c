#include <stdlib.h>
#include <math.h>
#include <stdio.h>

#include "k.h"

void add_random_tile(struct game *game){
    int row, col;
    // find random, but empty tile
    do{
        row = rand() % SIZE;
        col = rand() % SIZE;
    }while(game->board[row][col] != ' ');

    // place to the random position 'A' or 'B' tile
    if(rand() % 2 == 0){
        game->board[row][col] = 'A';
    }else{
        game->board[row][col] = 'B';
    }
}

bool is_game_won(const struct game game){
	for(int a=0; a<SIZE; a++)
	{
		for(int b=0; b<SIZE; b++)
		{
			if(game.board[a][b]=='k')
			{
				return true;
			}
		}
	}
	
	for(int a=0; a<SIZE; a++)
	{
		for(int b=0; b<SIZE; b++)
		{
			if(game.board[a][b]=='K')
			{
				return true;
			}
		}
	}
	
	return false;
}

bool is_move_possible(const struct game game){
	for(int a=0; a<SIZE; a++)
	{
		for(int b=0; b<SIZE; b++)
		{
			if(game.board[a][b]==' ')
			{
				return true;
			}
		}
	}
	
	for(int a=0; a<=SIZE-1; a++)
	{
		for(int b=0; b<=SIZE-2; b++)
		{
//			printf("%c %c\n", game.board[a][b], game.board[a][b+1]);
			if(game.board[a][b]==game.board[a][b+1])
			{
				return true;
			}
		}
	}
	for(int a=0; a<=SIZE-1; a++)
	{
		for(int b=0; b<=SIZE-2; b++)
		{
//			printf("%c %c\n", game.board[b][a], game.board[b+1][a]);
			if(game.board[b][a]==game.board[b+1][a]){
				return true;
			}
		}
	}
	return false;
}

void usporiadaj(char pole[])
{
	for(int p=0; p<SIZE; p++)
	{
		for(int a=0; a<SIZE-1; a++)
		{
			if(pole[a]==' ')
			{
				for(int b=a; b<SIZE-1; b++)
				{
					pole[b]=pole[b+1];
					pole[b+1]=' ';
				}
			}
		}	
	}
}

void spoj(char pole[], struct game *game)
{
	for(int a=0; a<SIZE-1; a++)
	{
		if(pole[a]==pole[a+1] && pole[a]!=' ')
		{
			if(pole[a]=='A')
			{
				pole[a]='B';
			}
			else if(pole[a]=='B')
			{
				pole[a]='C';
			}
			else if(pole[a]=='C')
			{
				pole[a]='D';
			}
			else if(pole[a]=='D')
			{
				pole[a]='E';
			}
			else if(pole[a]=='E')
			{
				pole[a]='F';
			}
			else if(pole[a]=='F')
			{
				pole[a]='G';
			}
			else if(pole[a]=='G')
			{
				pole[a]='H';
			}
			else if(pole[a]=='H')
			{
				pole[a]='I';
			}
			else if(pole[a]=='I')
			{
				pole[a]='J';
			}
			else
			{
				pole[a]='K';
			}
			pole[a+1]=' ';
			game->score = game->score + (int)pow(2.0, pole[a] - 64);
		}
	}
}

void dole(struct game *game)
{
	char pole[SIZE];
	for(int a=0; a<SIZE; a++)
	{
		for(int b=0; b<SIZE; b++)
		{
			pole[b]=game->board[SIZE-1-b][a];
		}
		usporiadaj(pole);
		spoj(pole, game);
		usporiadaj(pole);
		for(int b=0; b<SIZE; b++)
		{
			game->board[SIZE-1-b][a]=pole[b];
		}
	}
}

void hore(struct game *game)
{
	char pole[SIZE];
	for(int a=0; a<SIZE; a++)
	{
		for(int b=0; b<SIZE; b++)
		{
			pole[b]=game->board[b][a];
		}
		usporiadaj(pole);
		spoj(pole, game);
		usporiadaj(pole);
		for(int b=0; b<SIZE; b++)
		{
			game->board[b][a]=pole[b];
		}
	}
}

void vpravo(struct game *game)
{
	char pole[SIZE];
	for(int a=0; a<SIZE; a++)
	{
		for(int b=0; b<SIZE; b++)
		{
			pole[b]=game->board[a][SIZE-1-b];	
		}
		usporiadaj(pole);
		spoj(pole, game);
		usporiadaj(pole);
		for(int b=0; b<SIZE; b++)
		{
			game->board[a][SIZE-1-b]=pole[b];
		}
	}
}

void vlavo(struct game *game)
{
	char pole[SIZE];
	for(int a=0; a<SIZE; a++)
	{
		for(int b=0; b<SIZE; b++)
		{
			pole[b]=game->board[a][b];
		}
		usporiadaj(pole);
		spoj(pole, game);
		usporiadaj(pole);
		for(int b=0; b<SIZE; b++)
		{
			game->board[a][b]=pole[b];
		}
	}
}

bool update(struct game *game, int dy, int dx){
	if((dy<-1 && dy>1) || (dx<-1 && dx>1))
	{
		return false;
	}
	
	char copy[SIZE][SIZE];
	for(int a=0; a<=SIZE-2; a++)
	{
		for(int b=0; b<=SIZE-2; b++)
		{
			copy[a][b]=game->board[a][b];
		}
	}
	
	switch(dy) {
		case 1:
			if(dx==0)
			{
				// SMER DOLU
				dole(game);
			}
			else
			{
				return false;
			}
			break;
		case 0:
			if(dx==1)
			{
				// SMER VPRAVO
				vpravo(game);
			}
			else if(dx==-1)
			{
				// SMER VLAVO
				vlavo(game);
			}
			else
			{
				return false;
			}
			break;
		case -1:
			if(dx==0)
			{
				// SMER HORE			
				hore(game);
			}
			else
			{
				return false;
			}
			break;
	default:
		break;
	}
	
	for(int a=0; a<=SIZE-2; a++)
	{
		for(int b=0; b<=SIZE-2; b++)
		{
			if(game->board[a][b]!=copy[a][b]){
				return true;
			}
		}
	}
	return false;
}