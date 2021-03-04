CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;

CREATE TABLE "CacheItems" (
    "ID" text NOT NULL,
    "Querry" text NULL,
    "Awnser" text NULL,
    CONSTRAINT "PK_CacheItems" PRIMARY KEY ("ID")
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20210304182235_InitalMigration', '5.0.2');

COMMIT;