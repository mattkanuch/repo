## 7.A Vypíšte zoznam všetkých zamestnancov a pozícií na ktorých pracujú. Výpis má obsahovať tieto informácie: celé meno, email v tvare (@tuke.sk), názov pozície, deň nástupu (vznikne spojením tabuliek hr.jobs a hr.employees)

SELECT hr.employees.first_name, hr.employees.last_name, 
CONCAT(hr.employees.email,'@tuke.sk'), hr.jobs.job_title, hr.employees.hire_date 
FROM hr.employees INNER JOIN hr.jobs 
ON hr.employees.job_id=hr.jobs.job_id;


## 7.B Vypíšte zoznam všetkých zamestnancov, ktorí pracujú na IT oddelení viac ako 14 rokov; zoznam v tvare: celé meno, tel.cislo, den_nastupu (pri spájaní je dobré rozdeliť si úlohu na viacero častí).

SELECT hr.employees.first_name, hr.employees.last_name, hr.employees.phone_number, hr.employees.hire_date 
FROM hr.employees INNER JOIN HR.departments 
ON HR.employees.Department_ID = HR.departments.Department_ID
WHERE hire_date< to_date('2006', 'YYYY') 
AND HR.departments.department_name='IT';


## 7.C Nasledujúce úlohy riešte pomocou prirodzeného spájania, ak je to možné:

## 7.C - a Vypíšte zoznam všetkých zamestnancov a pozícií, na ktorých pracujú a minimálny plat ich pozície je z intervalu (2000,7000). Výpis ma obsahovať tieto informácie: celé meno, kontakt, názov pozície, den_nastupu

SELECT hr.employees.first_name, hr.employees.last_name, hr.employees.phone_number, hr.jobs.job_title, hr.employees.hire_date
FROM hr.employees INNER JOIN HR.jobs
ON HR.employees.job_id = HR.jobs.job_id
WHERE salary BETWEEN 2000 AND 7000;


## 7.C - b vypíšte zoznam všetkých zamestnancov, ktorí pracujú na IT oddelení viac ako 14 rokov, zoznam usporiadaj podľa mena a následne podľa dátumu nástupu

SELECT hr.employees.first_name, hr.employees.last_name, hr.employees.phone_number, hr.employees.hire_date 
FROM hr.employees INNER JOIN HR.departments 
ON HR.employees.Department_ID = HR.departments.Department_ID
WHERE hire_date< to_date('2006', 'YYYY') 
AND HR.departments.department_name='IT'
ORDER BY last_name ASC, hire_date DESC;


## Vypíšte zoznam oddelení, ktoré nemajú žiadneho zamestnanca

SELECT hr.departments.department_id, hr.departments.department_name
FROM hr.departments
WHERE hr.departments.department_id NOT IN(SELECT department_id FROM hr.employees
WHERE hr.departments.department_id=hr.employees.department_id);


## 7.E Vypíšte zoznam všetkých zamestnancov(aj tých, čo nemajú priamych nadriadených) a ich priamych nadriadených; zoznam v tvare first name, last name a manager - rekurzívne spojenie

SELECT HR.employees.first_name, HR.employees.last_name, HR.employees.manager_id 
FROM HR.employees
UNION SELECT HR.employees.first_name, HR.employees.last_name, HR.employees.manager_id 
FROM HR.employees


## 7.F Vypíšte zoznam všetkých zamestnancov, ich pracovných pozícií a oddelení, na ktorých pracujú (meno, prac. pozícia, oddelenie)

SELECT hr.employees.first_name, hr.employees.last_name, hr.jobs.job_title, hr.departments.department_name
FROM hr.employees 
JOIN hr.jobs
ON hr.employees.job_id=hr.jobs.job_id
JOIN HR.departments
ON hr.employees.department_id=hr.departments.department_id;


## 7.G Pomocou rekurzívneho spojenia nájdite zamestnanca/zamestnancov, ktorí zarábaju najviac (nezabudnite, že v podmienke spájania nemusí byť len rovnosť dvoch stĺpcov, le môžeme porovnávať ľubovoľné 2 stĺpce zo spájaných tabuliek, napr. plat jedného zamestnanca môže byť väčší ako plat druhého)

## 7.H Zobrazte zoznam zamestnancov, oddelení, kde pracujú a mesto, v ktorom dané oddelenie sídli. Zoznam má obsahovať meno, priezvisko, mail v tvare email@tuke.domena podľa krajiny v ktorej sídli, dané oddelenie, meno oddelenia, mesto, krajina (pomocou funkcie DECODE)

SELECT EMPLOYEE.FIRST_NAME, EMPLOYEE.LAST_NAME, 
(CONCAT(EMAIL, (CONCAT('@tuke.', (LOCAL.COUNTRY_ID))))), DEPART.DEPARTMENT_ID, DEPART.DEPARTMENT_NAME, LOCAL.CITY, 
    DECODE (LOCAl.COUNTRY_ID,'IT','Italy','JP','Japan','US','United_States_Of_America','CA','Canada','CN','China','IN','India',
    'AU','Australia','SG','Singapore','UK','United_Kingdom','DE','Germany','BR','Brazil','CH','Schwizerland','NL','Netherlands','MX','Mexico')
    FROM HR.LOCATIONS LOCAL
   
    INNER JOIN HR.DEPARTMENTS DEPART ON DEPART.LOCATION_ID = LOCAL.LOCATION_ID
    INNER JOIN HR.EMPLOYEES EMPLOYEE ON EMPLOYEE.DEPARTMENT_ID = DEPART.DEPARTMENT_ID;

#8.1
	#a Zistite počet zamestnancov IT oddelenia.
select count(*) as pocet 
from hr.employees
where (department_id = (SELECT department_id from hr.departments
where (department_name = 'IT')));

	#b Zistite počet zamestnancov pracujúcich v Seattle.
SELECT count(*)
FROM HR.departments
INNER JOIN hr.employees
ON HR.departments.department_id=HR.employees.department_id
INNER JOIN HR.locations
ON hr.departments.LOCATION_ID =hr.locations.LOCATION_ID 
WHERE hr.locations.city='Seattle';

	#c Zistite maximálny, minimálny a priemerný plat zamestnancov IT oddelenia.
SELECT MAX(salary), MIN(salary), AVG(salary)
FROM hr.employees 
INNER JOIN hr.departments 
ON hr.employees.department_id = hr.departments.department_id
WHERE hr.departments.department_name='IT';



#8.2
	#a Vypíšte názvy oddelení a počty zamestnancov pre každé z nich.
select hr.departments.department_name, COUNT(*)
from hr.employees
join hr.departments
on (hr.employees.department_id = hr.departments.department_id)
group by hr.departments.department_name
order by hr.departments.department_name;

	#b Vypíšte počet zamestnancov a priemerný plat podľa miesta, kde zamestnanci pracujú. Miesto pracoviska zistite podľa predvoľby telefónneho čísla (prvé trojčíslie), kde 650 je USA, 011 je UK, 515 je Germany, 590 je Canada, 603 je France. (Využitie funkcie DECODE a reťazovej funkcie).

select count(employee_id) as pocet, round(avg(salary)) as priemerny_plat
from hr.employees
group by
decode(SUBSTR(phone_number,1,3),'650', 'USA','011','UK','515','Germany','590','Canada','630','France')
order by 1;

	#c Vypíšte počet zamestnancov a priemerný plat podľa miesta, kde zamestnanci pracujú, (predchádzajúca úloha, B) a podľa roku, v ktorom nastúpili.

select count(employee_id) as pocet, round(avg(salary)) as priemerny_plat
from hr.employees
group by
decode(SUBSTR(phone_number,1,3),'650', 'USA','011','UK','515','Germany','590','Canada','630','France'), hire_date 
order by 1;

	#d Ako by sme zmenili predchádzajúcu úlohu, ak by sme chceli iba tie miesta, kde je priemerný plat väčší 		ako 6000.
select count(employee_id) as pocet, round(avg(salary)) as priemerny_plat
from hr.employees
where salary >6000
group by
decode(SUBSTR(phone_number,1,3),'650', 'USA','011','UK','515','Germany','590','Canada','630','France'), hire_date
order by 1;

	#e Vypíšte priemerný plat podľa miesta (úloha B) a podľa roku, v ktorom nastúpili, tak aby vo výsledku boli aj priemerné platy iba podľa miesta, kde pracujú a aj podľa roku, v ktorom nastúpili a celkový priemerný plat. (funkcie ROLLUP a CUBE na medzivýsledky).

SELECT count(*), avg(salary), street_address, extract(year from hire_date) FROM hr.employees
    JOIN hr.departments on hr.employees.department_id = hr.departments.department_id
    JOIN hr.locations on HR.locations.location_id = hr.departments.location_id
    GROUP BY CUBE(street_address, extract(year from hire_date));

	#f Vypíšte zoznam zamestnancov, ktorí pracovali vo firme na viac ako jednej pozícii.

SELECT (select HR.employees.first_name || ' ' || HR.employees.last_name as name from HR.employees where HR.employees.employee_id = emp.employee_id) as meno  FROM hr.employees emp
    JOIN hr.job_history on emp.employee_id = hr.job_history.employee_id
    GROUP BY emp.employee_id
    HAVING count(DISTINCT hr.job_history.job_id)>1

## 8.3 ######################

	#a  Zistite, ktorí zamestnanci (meno, priezvisko, deň nástupu) pracujú na tej istej pozícii od nástupu (nemenili pozíciu)

SELECT employee_id, first_name, last_name FROM hr.employees
INTERSECT
SELECT employee_id, (select first_name from hr.employees where hr.employees.employee_id = history.employee_id) as first_name, (select last_name from hr.employees where hr.employees.employee_id = history.employee_id) as last_name from HR.job_history history
    GROUP BY history.employee_id
    HAVING count(DISTINCT history.job_id)=1
	
	#b Zistite, ktoré pozície boli obsadené v rokoch v rokoch 2001-2006 (vrátane)
SELECT count(*), hr.jobs.job_title
FROM hr.employees 
JOIN hr.jobs
ON hr.employees.job_id=hr.jobs.job_id
WHERE hire_date BETWEEN to_date('2001', 'YYYY') AND to_date('2006', 'YYYY')
group by hr.jobs.job_title
order by hr.jobs.job_title;

	#c Vypíšte zoznam všetkých zamestnancov, ktorí nepracujú v Seattle
SELECT count(*)
FROM HR.departments
INNER JOIN hr.employees
ON HR.departments.department_id=HR.employees.department_id
INNER JOIN HR.locations
ON hr.departments.LOCATION_ID =hr.locations.LOCATION_ID 
WHERE NOT hr.locations.city='Seattle';



/*## 9.A ##*/ Zistite, ktorý zamestnanec má najvyšší plat vo firme.
SELECT FIRST_NAME as meno, LAST_NAME as priezvisko, SALARY as celkovy_maximalny_plat  FROM HR.EMPLOYEES WHERE SALARY=(SELECT MAX(SALARY) FROM HR.EMPLOYEES);

/*## 9.B ##*/ Nájdite najlepšie zarábajúceho zamestnanca v oddelení IT.

SELECT FIRST_NAME AS MENO, LAST_NAME AS PRIEZVISKO, SALARY AS MAXIMALNY_PLAT_V_IT, HR.EMPLOYEES.DEPARTMENT_ID AS DEP_ID, DEPARTMENT_NAME AS DEP_NAZOV FROM HR.EMPLOYEES INNER JOIN HR.DEPARTMENTS
ON (HR.EMPLOYEES.DEPARTMENT_ID = HR.DEPARTMENTS.DEPARTMENT_ID)
WHERE(HR.DEPARTMENTS.DEPARTMENT_NAME='IT') AND HR.EMPLOYEES.SALARY IN (SELECT MAX(SALARY) FROM HR.EMPLOYEES INNER JOIN HR.DEPARTMENTS
ON (HR.DEPARTMENTS.DEPARTMENT_ID=HR.EMPLOYEES.DEPARTMENT_ID)
WHERE DEPARTMENT_NAME = 'IT');

/*## 9.C ##*/ Zistite, ktoré pracovné pozície vo firme nie sú obsadené.

SELECT JOB_TITLE AS PRAC_POZÍCIA, HR.JOBS.JOB_ID, HR.JOB_HISTORY.END_DATE AS VOĽNÉ_OD_DÁTUMU FROM HR.JOBS INNER JOIN HR.EMPLOYEES
ON(HR.JOBS.JOB_ID=HR.EMPLOYEES.JOB_ID)
INNER JOIN HR.JOB_HISTORY
ON(HR.JOB_HISTORY.EMPLOYEE_ID=HR.EMPLOYEES.EMPLOYEE_ID)
WHERE HR.JOB_HISTORY.END_DATE=(SELECT MAX(END_DATE) FROM HR.JOB_HISTORY);

/* TOTO by to malo byť skôr ale vyhadzuje prázdnu tabuľku. (neexistjú voľné miesta?)  */
SELECT JOB_TITLE as názov_prac_pozície, JOB_ID FROM HR.JOBS
WHERE NOT EXISTS(SELECT 1 FROM HR.EMPLOYEES WHERE(HR.EMPLOYEES.JOB_ID = HR.JOBS.JOB_ID));

/*## 9.D ##*/ Vypíšte zoznam všetkých zamestnancov, ktorí nepracujú v Seattle.
SELECT First_name as meno, Last_name as priezvisko, hr.locations.City FROM HR.DEPARTMENTS INNER JOIN HR.EMPLOYEES
ON HR.DEPARTMENTS.DEPARTMENT_ID = HR.EMPLOYEES.DEPARTMENT_ID INNER JOIN HR.LOCATIONS
ON HR.DEPARTMENTS.LOCATION_ID   = HR.LOCATIONS.LOCATION_ID  WHERE(NOT(CITY='Seattle'));

/*## 9.E ##*/ Vypíšte zoznam zamestnancov, ktorých nadriadený je súčasne šéfom oddelenia, v ktorom pracujú.

SELECT FIRST_NAME, LAST_NAME, MANAGER_ID AS PRIAMY_NADRIADENY_ID FROM HR.EMPLOYEES 
WHERE EXISTS(SELECT  * FROM HR.DEPARTMENTS WHERE(MANAGER_ID=EMPLOYEE_ID))
ORDER BY LAST_NAME;

/*## 9.F ##*/ Vypíšte zoznam 10-tich zamestnancov, ktorí pracujú v USA.

SELECT FIRST_NAME AS MENO, LAST_NAME AS PRIEZVISKO, COUNTRY_NAME FROM HR.EMPLOYEES
INNER JOIN HR.DEPARTMENTS
ON HR.EMPLOYEES.DEPARTMENT_ID=HR.DEPARTMENTS.DEPARTMENT_ID
INNER JOIN HR.LOCATIONS
ON HR.LOCATIONS.LOCATION_ID=HR.DEPARTMENTS.LOCATION_ID
INNER JOIN HR.COUNTRIES
ON HR.COUNTRIES.COUNTRY_ID=HR.LOCATIONS.COUNTRY_ID
WHERE(HR.COUNTRIES.COUNTRY_NAME=('United States of America') AND ROWNUM<=10)
ORDER BY LAST_NAME;

/*## 9.G ##*/ ZVyhľadajte v každom oddelení zamestnanca, ktorý ma minimálny plat.

SELECT  FIRST_NAME, LAST_NAME, SALARY, DEPARTMENT_ID  
FROM HR.EMPLOYEES
WHERE (DEPARTMENT_ID,SALARY) IN  
      ( SELECT DEPARTMENT_ID, MIN(SALARY)  
        FROM HR.EMPLOYEES
        GROUP BY DEPARTMENT_ID)
        ORDER BY DEPARTMENT_ID;


/*## 9.H ##*/ Vytvorte si kópiu tabuľky employees (ak ešte nemáte) a zmeňte plat o 10% tým zamestnancov, ktorí zarábajú menej ako je priemerný plat vo firme.

CREATE TABLE COPY_HR_EMPLOYEES (
    EMPLOYEE_ID  NUMBER(6) NOT NULL,
    FIRST_NAME VARCHAR2(20),
    LAST_NAME VARCHAR2(25) NOT NULL,
    EMAIL VARCHAR2(20) NOT NULL,
    PHONE_NUMBER VARCHAR2(20),
    HIRE_DATE DATE NOT NULL,
    JOB_ID VARCHAR2(10) NOT NULL,
    SALARY NUMBER(8,2),
    COMMISSION_PCT NUMBER(2,2),
    MANAGER_ID NUMBER(6),
    DEPARTMENT_ID NUMBER(4)
    );
    
INSERT INTO COPY_HR_EMPLOYEES SELECT HR.EMPLOYEES FROM HR.EMPLOYEES;

UPDATE COPY_HR_EMPLOYEES
SET SALARY = (SALARY * 1.10)
WHERE(SALARY<=(SELECT AVG(SALARY)FROM COPY_HR_EMPLOYEES));

####10##### a
Vytvorte si pod svojím užívateľom kópiu tabuliek oe.orders a oe.order_items, oe.customers, hr.employees, hr.departments pomocou príkazu

CREATE TABLE orders/order_items/… AS SELECT * FROM oe.orders/oe.order_items/…
V tabuľke customers sú niektoré stĺpce tabuľky, preto musíme

create table customers as select CUSTOMER_ID, CUST_FIRST_NAME, CUST_LAST_NAME, 
CREDIT_LIMIT, CUST_EMAIL, ACCOUNT_MGR_ID from oe.customers

# a - odpoved
CREATE TABLE orders AS SELECT * FROM oe.orders;
CREATE TABLE order_items AS SELECT * FROM oe.order_items;
CREATE TABLE employees AS SELECT * FROM hr.employees;
CREATE TABLE departments AS SELECT * FROM hr.departments;
create table customers as select CUSTOMER_ID, CUST_FIRST_NAME, CUST_LAST_NAME, CREDIT_LIMIT, CUST_EMAIL, ACCOUNT_MGR_ID from oe.customers;

## 10 - b Vytvorte trigger, ktorý po vymazaní z tabuľky orders zmaže aj všetky prislúchajúce záznamy z tabuľky order_items (čiže všetky, čo sú pridelené danej objednávke).

CREATE OR REPLACE TRIGGER remove_orders
BEFORE DELETE ON orders
FOR EACH ROW
BEGIN
  DELETE FROM order_items WHERE order_id = :old.order_id ;
END;
/

## 10 - c Vytvorte pohľad department_list, ktorý obsahuje názvy oddelení a počty zamestnancov v nich.

CREATE OR REPLACE VIEW department_list AS SELECT department_name, count(*) AS employees_count FROM departments JOIN employees USING(department_id) GROUP BY department_name;

## 10 -d + e Keďže pohľad je vytvorený pomocou dopytu, ktorý obsahuje GROUP BY, tak nie je upravovateľný klasickým spôsobom (insert, update, delete). Vytvorte trigger, ktorý umožní update nad pohľadom department_list

Keďže pohľad department_list obsahuje 2 stĺpce, upravte predchádzajúci príkaz pomocou podmienky tak, aby pri pokuse upraviť počet zamestnancov, vypísalo informáciu, že počet zamestnancov nie je možné upraviť.

CREATE OR REPLACE TRIGGER update_department_list
INSTEAD OF UPDATE ON department_list
FOR EACH ROW
BEGIN
    IF updating('employees_count') THEN
        raise_application_error(-20000, 'Count of employees cannot be modified');
    ELSIF updating('department_name') THEN
        UPDATE departments SET department_name = :new.department_name WHERE department_name = :old.department_name;
    END IF;
END;
/





