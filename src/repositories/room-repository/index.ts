import { prisma } from "@/config";

async function findAllByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId,
    },
    include: {
      Booking: true,
    },
  });
}

async function countCapacity() {
  return prisma.room.groupBy({
    by: ["hotelId"],
    _sum: {
      capacity: true,
    },
  });
}

async function findById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    }
  });
}

const roomRepository = {
  findAllByHotelId,
  findById,
  countCapacity
};

export default roomRepository;
