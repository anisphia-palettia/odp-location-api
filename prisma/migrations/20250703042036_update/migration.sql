-- CreateTable
CREATE TABLE "Error" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Error_pkey" PRIMARY KEY ("id")
);
