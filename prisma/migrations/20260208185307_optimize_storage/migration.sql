/*
  Warnings:

  - You are about to drop the `Loss` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Motivo" AS ENUM ('VENCIMENTO', 'QUEBRA', 'FURO', 'FALTA', 'MICRO_FURO', 'MAL_CHEIO', 'VAZADA', 'DEF_ROTULO', 'AMASSADA', 'BLOW_OUT', 'VAZIA', 'QUEBRADA', 'ESTUFADA', 'INVENTARIO', 'OUTRO');

-- DropTable
DROP TABLE "Loss";

-- CreateTable
CREATE TABLE "locations" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areas" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "helpers" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "helpers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "break_reasons" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "break_reasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "losses" (
    "id" TEXT NOT NULL,
    "codigo" VARCHAR(40) NOT NULL,
    "descricao" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "fatorHecto" DECIMAL(8,3) NOT NULL,
    "hectoUnid" DECIMAL(10,4) NOT NULL,
    "precoUnid" DECIMAL(12,2) NOT NULL,
    "motivo" "Motivo" NOT NULL,
    "motivoQuebraId" SMALLINT,
    "localId" SMALLINT NOT NULL,
    "areaId" SMALLINT NOT NULL,
    "ajudanteId" SMALLINT NOT NULL,
    "data" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "losses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "locations_name_key" ON "locations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "areas_name_key" ON "areas"("name");

-- CreateIndex
CREATE UNIQUE INDEX "helpers_name_key" ON "helpers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "break_reasons_name_key" ON "break_reasons"("name");

-- CreateIndex
CREATE INDEX "idx_loss_data" ON "losses"("data");

-- AddForeignKey
ALTER TABLE "losses" ADD CONSTRAINT "losses_motivoQuebraId_fkey" FOREIGN KEY ("motivoQuebraId") REFERENCES "break_reasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "losses" ADD CONSTRAINT "losses_localId_fkey" FOREIGN KEY ("localId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "losses" ADD CONSTRAINT "losses_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "losses" ADD CONSTRAINT "losses_ajudanteId_fkey" FOREIGN KEY ("ajudanteId") REFERENCES "helpers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
