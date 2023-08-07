import { prisma } from "@/config";
import { BookingCounts } from "@/protocols";
import { Booking } from "@prisma/client";

type CreateParams = Omit<Booking, "id" | "createdAt" | "updatedAt">;
type UpdateParams = Omit<Booking, "createdAt" | "updatedAt">;

async function create({ roomId, userId }: CreateParams): Promise<Booking> {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    }
  });
}

async function countBooking(): Promise<BookingCounts[]> {
  return prisma.$queryRaw`
  SELECT COUNT(*) AS "bookedRooms", "Room"."hotelId" FROM "Booking"
  JOIN "Room" ON "Booking"."roomId" = "Room".id
  GROUP BY "Room"."hotelId";`
  ;
}

async function findByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true,
    }
  });
}

async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    }
  });
}

async function upsertBooking({ id, roomId, userId }: UpdateParams) {
  return prisma.booking.upsert({
    where: {
      id,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    }
  });
}

const bookingRepository = {
  create,
  findByRoomId,
  findByUserId,
  upsertBooking,
  countBooking,
};

export default bookingRepository;
