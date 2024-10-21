/*
  Warnings:

  - Added the required column `cardNumber` to the `CreditCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `CreditCard` table without a default value. This is not possible if the table is not empty.

*/
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
    CONSTRAINT "CreditCard_userDni_fkey" FOREIGN KEY ("userDni") REFERENCES "User" ("dni") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CreditCard" ("id", "lastName", "name", "type", "userDni") SELECT "id", "lastName", "name", "type", "userDni" FROM "CreditCard";
DROP TABLE "CreditCard";
ALTER TABLE "new_CreditCard" RENAME TO "CreditCard";
CREATE UNIQUE INDEX "CreditCard_cardNumber_key" ON "CreditCard"("cardNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
