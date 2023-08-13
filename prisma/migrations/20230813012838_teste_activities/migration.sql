-- CreateTable
CREATE TABLE "Activitie" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activitie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivitieBooking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activitieId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivitieBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivitieBooking" ADD CONSTRAINT "ActivitieBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivitieBooking" ADD CONSTRAINT "ActivitieBooking_activitieId_fkey" FOREIGN KEY ("activitieId") REFERENCES "Activitie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
