-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dni" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Tarjeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "usuarioDni" INTEGER NOT NULL,
    CONSTRAINT "Tarjeta_usuarioDni_fkey" FOREIGN KEY ("usuarioDni") REFERENCES "Usuario" ("dni") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_dni_key" ON "Usuario"("dni");
