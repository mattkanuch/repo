# VARIABLES
CC=gcc
CFLAGS=-std=c11 -Wall -Werror -Wconversion
LDLIBS=-lm
OUTPUT=game

# GAME TARGETS
all: $(OUTPUT)

$(OUTPUT): hof.o k.o ui.o main.o
	$(CC) $(CFLAGS) main.o ui.o k.o hof.o $(LDLIBS) -o $(OUTPUT)
	cppcheck --enable=warning,performance,unusedFunction --error-exitcode=1 *.c

hof.o: hof.h hof.c
	$(CC) $(CFLAGS) -c hof.c $(LDLIBS) -o hof.o
#	cppcheck --enable=warning,performance,unusedFunction --error-exitcode=1 hof.c

k.o: k.h k.c
	$(CC) $(CFLAGS) -c k.c $(LDLIBS) -o k.o
#	cppcheck --enable=warning,performance,unusedFunction --error-exitcode=1 k.c

ui.o: ui.h ui.c
	$(CC) $(CFLAGS) -c ui.c $(LDLIBS) -o ui.o
#	cppcheck --enable=warning,performance,unusedFunction --error-exitcode=1 ui.c

main.o: main.c
	$(CC) $(CFLAGS) -c main.c $(LDLIBS) -lcurses -o main.o
#	cppcheck --enable=warning,performance,unusedFunction --error-exitcode=1 main.c

clean: 
	rm -rf $(OUTPUT) *.o
