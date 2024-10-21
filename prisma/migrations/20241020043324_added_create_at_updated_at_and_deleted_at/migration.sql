-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CreditCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "cardNumber" BIGINT NOT NULL,
    "code" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "userDni" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "CreditCard_userDni_fkey" FOREIGN KEY ("userDni") REFERENCES "User" ("dni") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CreditCard" ("cardNumber", "code", "id", "lastName", "name", "type", "userDni") SELECT "cardNumber", "code", "id", "lastName", "name", "type", "userDni" FROM "CreditCard";
DROP TABLE "CreditCard";
ALTER TABLE "new_CreditCard" RENAME TO "CreditCard";
CREATE UNIQUE INDEX "CreditCard_cardNumber_key" ON "CreditCard"("cardNumber");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
INSERT INTO "new_User" ("dni", "id", "lastName", "name", "password") SELECT "dni", "id", "lastName", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_dni_key" ON "User"("dni");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
