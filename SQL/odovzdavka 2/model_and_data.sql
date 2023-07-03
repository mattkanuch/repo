--------------------------------------------------------
--  DDL for Table Z_CUSTOMER
--------------------------------------------------------

  CREATE TABLE "MIS_OKLAMCAK"."Z_CUSTOMER" 
   (	"ID" NUMBER(*,0), 
	"ZIP" NUMBER(*,0), 
	"CITY" VARCHAR2(50 CHAR), 
	"STATE" VARCHAR2(10 CHAR)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table Z_PRODUCT
--------------------------------------------------------

  CREATE TABLE "MIS_OKLAMCAK"."Z_PRODUCT" 
   (	"ID" NUMBER(*,0), 
	"NAME" VARCHAR2(50 CHAR), 
	"CATEGORY" VARCHAR2(50 CHAR)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table Z_FACT
--------------------------------------------------------

  CREATE TABLE "MIS_OKLAMCAK"."Z_FACT" 
   (	"ID" NUMBER(*,0), 
	"PRICE" NUMBER(10,4), 
	"Z_CUSTOMER_ID" NUMBER(*,0), 
	"Z_DATE_ID" NUMBER(*,0), 
	"Z_PRODUCT_ID" NUMBER(*,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table Z_DATE
--------------------------------------------------------

  CREATE TABLE "MIS_OKLAMCAK"."Z_DATE" 
   (	"ID" NUMBER(*,0), 
	"DATE" DATE, 
	"DAY" VARCHAR2(50 CHAR), 
	"MONTH" VARCHAR2(50 CHAR), 
	"QUARTER" VARCHAR2(50 CHAR), 
	"YEAR" NUMBER(*,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index Z_CUSTOMER_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MIS_OKLAMCAK"."Z_CUSTOMER_PK" ON "MIS_OKLAMCAK"."Z_CUSTOMER" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index Z_PRODUCT_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MIS_OKLAMCAK"."Z_PRODUCT_PK" ON "MIS_OKLAMCAK"."Z_PRODUCT" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index Z_FACT_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MIS_OKLAMCAK"."Z_FACT_PK" ON "MIS_OKLAMCAK"."Z_FACT" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index Z_DATE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MIS_OKLAMCAK"."Z_DATE_PK" ON "MIS_OKLAMCAK"."Z_DATE" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  Constraints for Table Z_CUSTOMER
--------------------------------------------------------

  ALTER TABLE "MIS_OKLAMCAK"."Z_CUSTOMER" MODIFY ("ID" NOT NULL ENABLE);
 
  ALTER TABLE "MIS_OKLAMCAK"."Z_CUSTOMER" ADD CONSTRAINT "Z_CUSTOMER_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table Z_PRODUCT
--------------------------------------------------------

  ALTER TABLE "MIS_OKLAMCAK"."Z_PRODUCT" MODIFY ("ID" NOT NULL ENABLE);
 
  ALTER TABLE "MIS_OKLAMCAK"."Z_PRODUCT" ADD CONSTRAINT "Z_PRODUCT_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table Z_FACT
--------------------------------------------------------

  ALTER TABLE "MIS_OKLAMCAK"."Z_FACT" MODIFY ("ID" NOT NULL ENABLE);
 
  ALTER TABLE "MIS_OKLAMCAK"."Z_FACT" MODIFY ("Z_CUSTOMER_ID" NOT NULL ENABLE);
 
  ALTER TABLE "MIS_OKLAMCAK"."Z_FACT" MODIFY ("Z_DATE_ID" NOT NULL ENABLE);
 
  ALTER TABLE "MIS_OKLAMCAK"."Z_FACT" MODIFY ("Z_PRODUCT_ID" NOT NULL ENABLE);
 
  ALTER TABLE "MIS_OKLAMCAK"."Z_FACT" ADD CONSTRAINT "Z_FACT_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table Z_DATE
--------------------------------------------------------

  ALTER TABLE "MIS_OKLAMCAK"."Z_DATE" MODIFY ("ID" NOT NULL ENABLE);
 
  ALTER TABLE "MIS_OKLAMCAK"."Z_DATE" ADD CONSTRAINT "Z_DATE_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table Z_FACT
--------------------------------------------------------

  ALTER TABLE "MIS_OKLAMCAK"."Z_FACT" ADD CONSTRAINT "Z_FACT_Z_CUSTOMER_FK" FOREIGN KEY ("Z_CUSTOMER_ID")
	  REFERENCES "MIS_OKLAMCAK"."Z_CUSTOMER" ("ID") ENABLE;
 
  ALTER TABLE "MIS_OKLAMCAK"."Z_FACT" ADD CONSTRAINT "Z_FACT_Z_DATE_FK" FOREIGN KEY ("Z_DATE_ID")
	  REFERENCES "MIS_OKLAMCAK"."Z_DATE" ("ID") ENABLE;
 
  ALTER TABLE "MIS_OKLAMCAK"."Z_FACT" ADD CONSTRAINT "Z_FACT_Z_PRODUCT_FK" FOREIGN KEY ("Z_PRODUCT_ID")
	  REFERENCES "MIS_OKLAMCAK"."Z_PRODUCT" ("ID") ENABLE;
