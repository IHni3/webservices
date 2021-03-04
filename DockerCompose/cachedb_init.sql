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