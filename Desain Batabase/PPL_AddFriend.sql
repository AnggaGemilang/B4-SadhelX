/*==============================================================*/
/* DBMS name:      ORACLE Version 11g                           */
/* Created on:     11/10/2021 16:31:02                          */
/*==============================================================*/


alter table FRIEND
   drop constraint FK_FRIEND_MENAMBAH_MEMBER;

drop index MENAMBAH_FK;

drop table FRIEND cascade constraints;

drop table MEMBER cascade constraints;

/*==============================================================*/
/* Table: FRIEND                                                */
/*==============================================================*/
create table FRIEND 
(
   ATTRIBUTE_4          CHAR(50)             not null,
   ID_USERNAME          VARCHAR2(50)         not null,
   PROFIL_NAME_FRIEND   VARCHAR2(50),
   FRIEND               INTEGER,
   AVATAR_FRIEND        BLOB,
   constraint PK_FRIEND primary key (ATTRIBUTE_4)
);

/*==============================================================*/
/* Index: MENAMBAH_FK                                           */
/*==============================================================*/
create index MENAMBAH_FK on FRIEND (
   ID_USERNAME ASC
);

/*==============================================================*/
/* Table: MEMBER                                                */
/*==============================================================*/
create table MEMBER 
(
   ID_USERNAME          VARCHAR2(50)         not null,
   PROFIL_NAME_MEMBER   VARCHAR2(100),
   FRIEND               INTEGER,
   AVATAR_MEMBER        BLOB,
   constraint PK_MEMBER primary key (ID_USERNAME)
);

alter table FRIEND
   add constraint FK_FRIEND_MENAMBAH_MEMBER foreign key (ID_USERNAME)
      references MEMBER (ID_USERNAME);

