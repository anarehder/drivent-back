import { prisma } from "@/config";
import { ActivitiesByDayOfWeek } from "@/protocols";

async function getBookingDB(userId: number) {
  const activitiesWithBookings = await prisma.activitie.findMany({
    select: {
      id: true,
      title: true,
      capacity: true,
      startsAt: true,
      endsAt: true,
      ActivitieBooking: {
        select: {
          id: true
        },
        where: {
          userId: userId
        }
      }
    }
  });
    // Organizar as atividades por dia da semana
  const activitiesByDayOfWeek: ActivitiesByDayOfWeek = {};
  activitiesWithBookings.forEach(activity => {
    const dayOfWeek = activity.startsAt.getDay(); // Retorna 0 para Domingo, 1 para Segunda, etc.
    const data = ""+activity.startsAt;
    const dataFinal = data.slice(0, 15);
    if (!activitiesByDayOfWeek[dataFinal]) {
      activitiesByDayOfWeek[dataFinal] = [];
    }

    console.log(dataFinal);
    activitiesByDayOfWeek[dataFinal].push(activity);
  });
  return activitiesByDayOfWeek;
}

async function getBookedActivities(userId: number) {
  const bookedActivities = await prisma.activitieBooking.findMany({
    where: {
      userId: userId,
    },
    include: {
      Activitie: true,
    },
  });
  return bookedActivities;
}

async function getActivity(activityId: number) {
  const activity = await prisma.activitie.findUnique({
    where: {
      id: activityId
    }
  });
  return activity;
}

async function createActivityBooking(userId: number, activityId: number) {
  const createdBooking = await prisma.activitieBooking.create({
    data: {
      userId,
      activitieId: activityId,
    },
  });
  return createdBooking;
}

async function decreaseActivityCapacity(activityId: number) {
  const updatedActivity = await prisma.activitie.update({
    where: {
      id: activityId,
    },
    data: {
      capacity: {
        decrement: 1,
      },
    },
  });
  return updatedActivity;
}

const activitiesRepository = {
  getBookingDB,
  getBookedActivities,
  getActivity,
  createActivityBooking,
  decreaseActivityCapacity
};

export default activitiesRepository;
