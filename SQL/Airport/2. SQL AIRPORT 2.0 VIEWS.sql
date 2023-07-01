
/*########### 2 POH¼ADY s NETRIVIÁLNYM SELECTOM #################*/

/*view_1 - spoèíta všetky lietadlá a všetky pozemné vozidlá letiska, ktoré majú hangár (letisko má malé hangáry = 1 lietadlo + 1 pozemné vozidlo)  */
CREATE OR REPLACE VIEW VIEW_1 AS 
SELECT COUNT(AIRPLANE_ID) + COUNT(VEHICLE_ID) AS LIETADLA_A_VOZIDLA_V_HANGAROCH FROM HANGAR;
SELECT * FROM VIEW_1;

/*view_2 - zistí priemerný plat pilotov letiska*/
CREATE OR REPLACE VIEW VIEW_2 AS
SELECT AVG(SALARY)AS PRIEMERNY_PLAT_PILOTOV FROM PILOT;
SELECT * FROM VIEW_2;

/*########### 3 POH¼ADY SO SPÁJANÍM TABULIEK  #################*/

/*view_3 - zobrazí meno pasažiera a mená ochrankára a CHECK-IN pracovníka ktorí sú zodpovední za kontrolu jeho údajov. Ïalej zobrazí pasažierovu destináciu a typ lietadla ktorým poletí (spojenie 4 tabuliek)*/
CREATE OR REPLACE VIEW VIEW_3 AS
SELECT NAME_OF_PASSENGER as Meno_Pasažiera, SECURITY_WORKER.NAME_OF_WORKER as Meno_Ochrankára, CHECK_IN_WORKER.NAME_OF_WORKER as Meno_CHECK_IN_Pracovníka, AIRPLANE.AIRPLANE_TYPE as Typ_lietadla, AIRPLANE.DESTINATION as Destinácia
FROM PASSENGER INNER JOIN SECURITY_WORKER ON (PASSENGER.PASSENGER_ID=SECURITY_WORKER.PASSENGER_ID) 
INNER JOIN CHECK_IN_WORKER ON (PASSENGER.PASSENGER_ID=CHECK_IN_WORKER.PASSENGER_ID)
INNER JOIN AIRPLANE ON (PASSENGER.PASSENGER_ID=AIRPLANE.PASSENGER_ID) ORDER BY NAME_OF_PASSENGER;
SELECT * FROM VIEW_3;

/*view_4 - Zobrazí pomocou Outer Join typy lietadiel a ich pozície hangárov v letiskovom komplexe. (spojenie 2 tabuliek) */
CREATE OR REPLACE VIEW VIEW_4 AS
SELECT AIRPLANE_TYPE, HANGAR.POSITION_IN_AIRPORT_COMPLEX FROM AIRPLANE FULL OUTER JOIN HANGAR ON (AIRPLANE.AIRPLANE_ID=HANGAR.AIRPLANE_ID) ORDER BY POSITION_IN_AIRPORT_COMPLEX;
SELECT * FROM VIEW_4;

/*view_5 - Tento view zobrazuje všetko èo sa udeje v konkrétnych hangároch a kto každý má prístup do konkr. hangára (spojenie 6 tabuliek)
- Zobrazí Typ vozidla a vodièa, ktorí obsluhujú konkrétne lietadlo. Zobrazí mechanika, ktorý obsluhuje dané vozidlo a konkrétne lietadlo.
Zobrazí ID hangáru v ktorom sa vozidlo, mechanik, lietadlo, pilot a vodiè hlásia a majú k nim prístup. Zobrazí typ konkrétneho lietadla a meno jeho pilota.*/
CREATE OR REPLACE VIEW VIEW_5 AS
SELECT LAND_VEHICLE.VEHICLE_TYPE, DRIVER.NAME_OF_DRIVER, MECHANIC.NAME_OF_MECHANIC, HANGAR.HANGAR_ID, AIRPLANE.AIRPLANE_TYPE, PILOT.NAME_OF_PILOT FROM LAND_VEHICLE 
INNER JOIN DRIVER ON (DRIVER.DRIVER_ID=LAND_VEHICLE.DRIVER_ID)
INNER JOIN MECHANIC ON (MECHANIC.VEHICLE_ID=LAND_VEHICLE.VEHICLE_ID)
INNER JOIN HANGAR ON(MECHANIC.MECHANIC_ID=HANGAR.MECHANIC_ID)
INNER JOIN AIRPLANE ON(AIRPLANE.AIRPLANE_ID=HANGAR.AIRPLANE_ID)
INNER JOIN PILOT ON(PILOT.PILOT_ID=AIRPLANE.PILOT_ID);
SELECT * FROM VIEW_5;

/*########### 2 POH¼ADY S POUŽITÍM AGREGAÈNÝCH FUNKCIÍ ALEBO ZOSKUPENIA  #################*/

/*View_6 - Zobrazí minimálny, maximálny a priemerný plat pilotov, ktorí pilotujú lietadlo typu 747.*/
CREATE OR REPLACE VIEW VIEW_6 AS 
SELECT MIN(SALARY) as minimum, MAX(SALARY) as maximum, ROUND(AVG(SALARY),2) as priemer FROM PILOT
WHERE (PILOT_ID IN (SELECT PILOT_ID FROM AIRPLANE WHERE(AIRPLANE_TYPE='747')));
SELECT * FROM VIEW_6;

/*Kontrola pre view 6*/
/*select salary, airplane.airplane_type from pilot inner join airplane on(pilot.pilot_ID=airplane.pilot_ID);*/

/*View_7 - Vypíše zoznam mien pilotov, ktorí pilotujú lietadlá s váhou batožiny presne 1000 kg*/
CREATE OR REPLACE VIEW VIEW_7 AS 
SELECT NAME_OF_PILOT FROM PILOT
WHERE (PILOT_ID IN (SELECT PILOT_ID FROM AIRPLANE WHERE(WEIGHT_OF_LUGGAGE=1000)));
SELECT * FROM VIEW_7;

/*Kontrola pre view_7*/
/*select pilot.name_of_pilot, airplane.weight_of_luggage from pilot inner join airplane on(pilot.pilot_id=airplane.pilot_ID);*/

/*########### 1 POH¼AD S POUŽITÍM MNOŽINOVÝCH OPERÁCIÍ  #################*/

/*View_8 - zobrazí lietadlá a ich typ pre ktoré platí že ich ID NIE JE v rozmedzí èísel 113 až 126*/
CREATE OR REPLACE VIEW VIEW_8 AS
SELECT AIRPLANE_TYPE, AIRPLANE_ID FROM AIRPLANE
WHERE NOT(AIRPLANE_ID BETWEEN '113' AND '126');
SELECT * FROM VIEW_8;

/*Kontrola pre View_8*/
/*Select airplane_type, airplane_ID from airplane;*/

/*########### 2 POH¼ADY S POUŽITÍM VNORENÝCH SELEKTOV  #################*/
/*View_9 - najprv si zobrazíme aktuálnu výšku platu z tabu¾ky driver pomocou view 
updatujeme tabulku driver kde sa zvýši plat o 5% kde maju vodici mensí plat ako je priemerny plat vodicov,
potom si výsledok zobrazíme pomocou view.*/
CREATE OR REPLACE VIEW VIEW_9 AS SELECT SALARY FROM DRIVER;
SELECT * FROM VIEW_9; 

UPDATE DRIVER SET SALARY = (SALARY * 1.05)
WHERE(SALARY<=(SELECT AVG(SALARY)FROM DRIVER));

CREATE OR REPLACE VIEW VIEW_10 AS SELECT SALARY FROM DRIVER;
SELECT * FROM VIEW_10; 

/*View_11 Zobrazí Mechanikov s najvyšším platom*/
CREATE OR REPLACE VIEW VIEW_11 AS
SELECT NAME_OF_MECHANIC, SALARY  FROM MECHANIC WHERE SALARY=(SELECT MAX(SALARY) FROM MECHANIC);
SELECT * FROM VIEW_11;

/*Bonusové úlohy:

Vytvorte 1 sekvenciu na generovanie primárnych k¾úèov a trigre, ktorá bude vklada hodnoty do príslušných tabuliek.*/

CREATE SEQUENCE SEQUENCE_1
START WITH 1
INCREMENT BY 1
MINVALUE 1
MAXVALUE 100
NOCYCLE ;

/*trigger keï sa vymaže luggage_ID z tabu¾ky passenger (ID na údaje o pasažierovej batožine),
trigger vymaže prisluchajúce dáta o batožine z tabu¾ky luggage */
CREATE OR REPLACE TRIGGER remove_luggage_ID AFTER DELETE ON passenger
FOR EACH ROW
BEGIN
  DELETE FROM luggage WHERE luggage_id = :old.luggage_ID ;
END;
/





