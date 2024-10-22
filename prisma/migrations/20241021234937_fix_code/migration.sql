-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CreditCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userDni" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "CreditCard_userDni_fkey" FOREIGN KEY ("userDni") REFERENCES "User" ("dni") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CreditCard" ("cardNumber", "code", "createAt", "deletedAt", "id", "lastName", "name", "type", "updatedAt", "userDni") SELECT "cardNumber", "code", "createAt", "deletedAt", "id", "lastName", "name", "type", "updatedAt", "userDni" FROM "CreditCard";
DROP TABLE "CreditCard";
ALTER TABLE "new_CreditCard" RENAME TO "CreditCard";
CREATE UNIQUE INDEX "CreditCard_cardNumber_key" ON "CreditCard"("cardNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
