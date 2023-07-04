#include <stdio.h>
#include <string.h>

#include "k.h"

void render(const struct game game){
    printf("score: %d\n", game.score);

    for(int row = 0; row < SIZE; row++){
        printf("+---+---+---+---+\n|");
        for(int col = 0; col < SIZE; col++){
            printf(" %c |", game.board[row][col]);
        }
        printf("\n");
    }
    printf("+---+---+---+---+\n");
}