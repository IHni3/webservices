CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;

CREATE TABLE "Users" (
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "Firstname" text NULL,
    "Lastname" text NULL,
    "Email" text NULL,
    "PasswordHash" text NULL,
    CONSTRAINT "PK_Users" PRIMARY KEY ("Id")
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20210303210116_InitialMigration', '5.0.3');

COMMIT;