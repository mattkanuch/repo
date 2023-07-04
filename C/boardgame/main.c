#include <stdio.h>

#include "k.h"
#include "hof.h"
#include "ui.h"

int main()
{
	struct game game0 = {
	    .board = {
	        {' ', ' ', ' ', ' '},
	        {' ', ' ', ' ', ' '},
	        {' ', ' ', ' ', ' '},
	        {' ', ' ', ' ', ' '}
	    },
	    .score = 0
	};
	add_random_tile(&game0);
	render(game0);

	// game is won
	struct game game = {
	    .board = {
	        {'A', 'B', 'C', 'D'},
	        {'E', 'F', 'G', 'H'},
	        {'I', 'J', 'K', 'A'},
	        {'B', 'C', 'D', 'E'}
	    },
	    .score = 0
	};
	
	printf("is won: %d\n", is_game_won(game));
	// stdout: 1
	
	// game is not won
	struct game game2 = {
	    .board = {
	        {'A', ' ', ' ', ' '},
	        {' ', ' ', ' ', ' '},
	        {' ', ' ', ' ', 'A'},
	        {'B', ' ', ' ', ' '}
	    },
	    .score = 0
	};
	
	printf("is won: %d\n", is_game_won(game2));
	// stdout: 0
	
	// another move is possible
	struct game game3 = {
	    .board = {
	        {'A', 'A', 'C', 'D'},
	        {'A', 'F', 'G', 'H'},
	        {'I', 'J', 'J', 'A'},
	        {'B', 'C', 'D', 'E'}
	    },
	    .score = 0
	};
	
	printf("is move possible: %d\n", is_move_possible(game3));
	// stdout: 1
	
	// another move is not possible
	struct game game4 = {
	    .board = {
	        {'A', 'B', 'C', 'D'},
	        {'E', 'F', 'G', 'H'},
	        {'I', 'J', 'K', 'A'},
	        {'B', 'C', 'D', 'E'}
	    },
	    .score = 0
	};
	
	printf("is move possible: %d\n", is_move_possible(game4));
	// stdout: 0
	
	// wrong call
	bool result = update(&game, 1, 1);
	printf("result(wrong call): %d\n", result);
	// result = false
	
	// move right
	struct game game5 = {
	    .board = {
	        {'A', ' ', ' ', ' '},
	        {'B', ' ', ' ', 'B'},
	        {'C', 'C', 'C', ' '},
	        {'D', 'D', 'D', 'D'}
	    },
	    .score = 0
	};

	result = update(&game5, -1, 0);
	
	
	
	
	Totokyk
	game = {
	    .board = {
	        {' ', ' ', ' ', 'A'},
	        {' ', ' ', ' ', 'C'},
	        {' ', ' ', 'C', 'D'},
	        {' ', ' ', 'E', 'E'}
	    },
	    .score = 88
	};
	result = true;
	
	
	
	
	printf("result(game5): %d\nscore: %d\n", result, game5.score);
	for(int a=0; a<SIZE; a++)
	{
		for(int b=0; b<SIZE; b++)
		{
			printf("%c ", game5.board[a][b]);
		}
		printf("\n");
	}
	printf("\n");
	
	// can't move left
	struct game game6 = {
	    .board = {
	        {'A', 'B', 'C', 'D'},
	        {'A', 'B', 'C', 'D'},
	        {'A', 'B', 'C', 'D'},
	        {'A', 'B', 'C', 'D'}
	    },
	    .score = 1234
	};
	
	result = update(&game6, 0, -1);
	
	
	
	toto tiez
	game = {
	    .board = {
	        {'A', 'B', 'C', 'D'},
	        {'A', 'B', 'C', 'D'},
	        {'A', 'B', 'C', 'D'},
	        {'A', 'B', 'C', 'D'}
	    },
	    .score = 1234
	};
	result = false;
	
	
	
	
	printf("result(game6): %d\nscore: %d\n", result, game6.score);
	for(int a=0; a<SIZE; a++)
	{
		for(int b=0; b<SIZE; b++)
		{
			printf("%c ", game6.board[a][b]);
		}
		printf("\n");
	}
	printf("\n");

	struct player list[10];
	struct player player = {.name = "Matt", .score=1234};
	int size = load(list);
	save(list, size);
	add_player(list, &size, player);
	
	
	return 0;
}