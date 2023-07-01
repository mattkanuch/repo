
/*########### 2 POH�ADY s NETRIVI�LNYM SELECTOM #################*/

/*view_1 - spo��ta v�etky lietadl� a v�etky pozemn� vozidl� letiska, ktor� maj� hang�r (letisko m� mal� hang�ry = 1 lietadlo + 1 pozemn� vozidlo)  */
CREATE OR REPLACE VIEW VIEW_1 AS 
SELECT COUNT(AIRPLANE_ID) + COUNT(VEHICLE_ID) AS LIETADLA_A_VOZIDLA_V_HANGAROCH FROM HANGAR;
SELECT * FROM VIEW_1;

/*view_2 - zist� priemern� plat pilotov letiska*/
CREATE OR REPLACE VIEW VIEW_2 AS
SELECT AVG(SALARY)AS PRIEMERNY_PLAT_PILOTOV FROM PILOT;
SELECT * FROM VIEW_2;

/*########### 3 POH�ADY SO SP�JAN�M TABULIEK  #################*/

/*view_3 - zobraz� meno pasa�iera a men� ochrank�ra a CHECK-IN pracovn�ka ktor� s� zodpovedn� za kontrolu jeho �dajov. �alej zobraz� pasa�ierovu destin�ciu a typ lietadla ktor�m polet� (spojenie 4 tabuliek)*/
CREATE OR REPLACE VIEW VIEW_3 AS
SELECT NAME_OF_PASSENGER as Meno_Pasa�iera, SECURITY_WORKER.NAME_OF_WORKER as Meno_Ochrank�ra, CHECK_IN_WORKER.NAME_OF_WORKER as Meno_CHECK_IN_Pracovn�ka, AIRPLANE.AIRPLANE_TYPE as Typ_lietadla, AIRPLANE.DESTINATION as Destin�cia
FROM PASSENGER INNER JOIN SECURITY_WORKER ON (PASSENGER.PASSENGER_ID=SECURITY_WORKER.PASSENGER_ID) 
INNER JOIN CHECK_IN_WORKER ON (PASSENGER.PASSENGER_ID=CHECK_IN_WORKER.PASSENGER_ID)
INNER JOIN AIRPLANE ON (PASSENGER.PASSENGER_ID=AIRPLANE.PASSENGER_ID) ORDER BY NAME_OF_PASSENGER;
SELECT * FROM VIEW_3;

/*view_4 - Zobraz� pomocou Outer Join typy lietadiel a ich poz�cie hang�rov v letiskovom komplexe. (spojenie 2 tabuliek) */
CREATE OR REPLACE VIEW VIEW_4 AS
SELECT AIRPLANE_TYPE, HANGAR.POSITION_IN_AIRPORT_COMPLEX FROM AIRPLANE FULL OUTER JOIN HANGAR ON (AIRPLANE.AIRPLANE_ID=HANGAR.AIRPLANE_ID) ORDER BY POSITION_IN_AIRPORT_COMPLEX;
SELECT * FROM VIEW_4;

/*view_5 - Tento view zobrazuje v�etko �o sa udeje v konkr�tnych hang�roch a kto ka�d� m� pr�stup do konkr. hang�ra (spojenie 6 tabuliek)
- Zobraz� Typ vozidla a vodi�a, ktor� obsluhuj� konkr�tne lietadlo. Zobraz� mechanika, ktor� obsluhuje dan� vozidlo a konkr�tne lietadlo.
Zobraz� ID hang�ru v ktorom sa vozidlo, mechanik, lietadlo, pilot a vodi� hl�sia a maj� k nim pr�stup. Zobraz� typ konkr�tneho lietadla a meno jeho pilota.*/
CREATE OR REPLACE VIEW VIEW_5 AS
SELECT LAND_VEHICLE.VEHICLE_TYPE, DRIVER.NAME_OF_DRIVER, MECHANIC.NAME_OF_MECHANIC, HANGAR.HANGAR_ID, AIRPLANE.AIRPLANE_TYPE, PILOT.NAME_OF_PILOT FROM LAND_VEHICLE 
INNER JOIN DRIVER ON (DRIVER.DRIVER_ID=LAND_VEHICLE.DRIVER_ID)
INNER JOIN MECHANIC ON (MECHANIC.VEHICLE_ID=LAND_VEHICLE.VEHICLE_ID)
INNER JOIN HANGAR ON(MECHANIC.MECHANIC_ID=HANGAR.MECHANIC_ID)
INNER JOIN AIRPLANE ON(AIRPLANE.AIRPLANE_ID=HANGAR.AIRPLANE_ID)
INNER JOIN PILOT ON(PILOT.PILOT_ID=AIRPLANE.PILOT_ID);
SELECT * FROM VIEW_5;

/*########### 2 POH�ADY S POU�IT�M AGREGA�N�CH FUNKCI� ALEBO ZOSKUPENIA  #################*/

/*View_6 - Zobraz� minim�lny, maxim�lny a priemern� plat pilotov, ktor� pilotuj� lietadlo typu 747.*/
CREATE OR REPLACE VIEW VIEW_6 AS 
SELECT MIN(SALARY) as minimum, MAX(SALARY) as maximum, ROUND(AVG(SALARY),2) as priemer FROM PILOT
WHERE (PILOT_ID IN (SELECT PILOT_ID FROM AIRPLANE WHERE(AIRPLANE_TYPE='747')));
SELECT * FROM VIEW_6;

/*Kontrola pre view 6*/
/*select salary, airplane.airplane_type from pilot inner join airplane on(pilot.pilot_ID=airplane.pilot_ID);*/

/*View_7 - Vyp�e zoznam mien pilotov, ktor� pilotuj� lietadl� s v�hou bato�iny presne 1000 kg*/
CREATE OR REPLACE VIEW VIEW_7 AS 
SELECT NAME_OF_PILOT FROM PILOT
WHERE (PILOT_ID IN (SELECT PILOT_ID FROM AIRPLANE WHERE(WEIGHT_OF_LUGGAGE=1000)));
SELECT * FROM VIEW_7;

/*Kontrola pre view_7*/
/*select pilot.name_of_pilot, airplane.weight_of_luggage from pilot inner join airplane on(pilot.pilot_id=airplane.pilot_ID);*/

/*########### 1 POH�AD S POU�IT�M MNO�INOV�CH OPER�CI�  #################*/

/*View_8 - zobraz� lietadl� a ich typ pre ktor� plat� �e ich ID NIE JE v rozmedz� ��sel 113 a� 126*/
CREATE OR REPLACE VIEW VIEW_8 AS
SELECT AIRPLANE_TYPE, AIRPLANE_ID FROM AIRPLANE
WHERE NOT(AIRPLANE_ID BETWEEN '113' AND '126');
SELECT * FROM VIEW_8;

/*Kontrola pre View_8*/
/*Select airplane_type, airplane_ID from airplane;*/

/*########### 2 POH�ADY S POU�IT�M VNOREN�CH SELEKTOV  #################*/
/*View_9 - najprv si zobraz�me aktu�lnu v��ku platu z tabu�ky driver pomocou view 
updatujeme tabulku driver kde sa zv��i plat o 5% kde maju vodici mens� plat ako je priemerny plat vodicov,
potom si v�sledok zobraz�me pomocou view.*/
CREATE OR REPLACE VIEW VIEW_9 AS SELECT SALARY FROM DRIVER;
SELECT * FROM VIEW_9; 

UPDATE DRIVER SET SALARY = (SALARY * 1.05)
WHERE(SALARY<=(SELECT AVG(SALARY)FROM DRIVER));

CREATE OR REPLACE VIEW VIEW_10 AS SELECT SALARY FROM DRIVER;
SELECT * FROM VIEW_10; 

/*View_11 Zobraz� Mechanikov s najvy���m platom*/
CREATE OR REPLACE VIEW VIEW_11 AS
SELECT NAME_OF_MECHANIC, SALARY  FROM MECHANIC WHERE SALARY=(SELECT MAX(SALARY) FROM MECHANIC);
SELECT * FROM VIEW_11;

/*Bonusov� �lohy:

Vytvorte 1 sekvenciu na generovanie prim�rnych k���ov a trigre, ktor� bude vklada� hodnoty do pr�slu�n�ch tabuliek.*/

CREATE SEQUENCE SEQUENCE_1
START WITH 1
INCREMENT BY 1
MINVALUE 1
MAXVALUE 100
NOCYCLE ;

/*trigger ke� sa vyma�e luggage_ID z tabu�ky passenger (ID na �daje o pasa�ierovej bato�ine),
trigger vyma�e prisluchaj�ce d�ta o bato�ine z tabu�ky luggage */
CREATE OR REPLACE TRIGGER remove_luggage_ID AFTER DELETE ON passenger
FOR EACH ROW
BEGIN
  DELETE FROM luggage WHERE luggage_id = :old.luggage_ID ;
END;
/





