#include "hof.h"

int load(struct player list[]){
	return 0;
}

bool save(const struct player list[], const int size){
    
	FILE *fscore=fopen(HOF_FILE,"w");
	if(fscore==NULL){
	    return false;
	}
	
	for(size_text i=0;i<size;i++){
		fprintf(fscore,"%s %d\n",list[i].name,list[i].score);
	}

	fclose(fscore);
	
	return true;
	
}

bool add_player(struct player list[], int* size, const struct player player){
	return 0;
}