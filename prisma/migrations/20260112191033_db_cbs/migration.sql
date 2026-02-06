-- CreateTable
CREATE TABLE "Loss" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "fatorHecto" TEXT NOT NULL,
    "hectoUnid" TEXT NOT NULL,
    "precoUnid" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "ajudante" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "motivoQuebra" TEXT,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Loss_pkey" PRIMARY KEY ("id")
);
