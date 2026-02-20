-- AlterTable
ALTER TABLE "losses" ADD COLUMN     "prejuizoCodigo" SMALLINT;

-- CreateTable
CREATE TABLE "prejuizos" (
    "codigo" SMALLINT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "prejuizos_pkey" PRIMARY KEY ("codigo")
);

-- AddForeignKey
ALTER TABLE "losses" ADD CONSTRAINT "losses_prejuizoCodigo_fkey" FOREIGN KEY ("prejuizoCodigo") REFERENCES "prejuizos"("codigo") ON DELETE SET NULL ON UPDATE CASCADE;
