# VARIABLES

CC=gcc
CFLAGS=-std=c11 -Werror -Wall
LDLIBS=-lm
OUTPUT=ps1

# TARGETS

all: $(OUTPUT)

$(OUTPUT): main.o playfair.o bmp.o
	cppcheck --enable=performance,unusedFunction --error-exitcode=1 *.c
	$(CC) $(CFLAGS) playfair.o bmp.o main.o $(LDLIBS) -o $(OUTPUT)

main.o: main.c
	$(CC) $(CFLAGS) -c main.c $(LDLIBS) -o main.o

bmp.o: bmp.c bmp.h 
	$(CC) $(CFLAGS) -c bmp.c $(LDLIBS) -o bmp.o

playfair.o: playfair.c playfair.h
	$(CC) $(CFLAGS) -c playfair.c $(LDLIBS) -o playfair.o

# REMOVE COMPILED FILES
clean: 
	rm -rf $(OUTPUT) *.o	
