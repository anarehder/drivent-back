import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  await prisma.address.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.ticketType.deleteMany({});
  await prisma.room.deleteMany({});
  await prisma.hotel.deleteMany({});

  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }
  
  await prisma.ticketType.create({
    data: {
      name: "Presencial",
      price: 250,
      isRemote: false,
      includesHotel: false,
    },
  });
  
  await prisma.ticketType.create({
    data: {
      name: "Online",
      price: 100,
      isRemote: true,
      includesHotel: false,
    },
  });

  await prisma.ticketType.create({
    data: {
      name: "Presencial",
      price: 600,
      isRemote: false,
      includesHotel: true,
    },
  });

  const hotel1 = await prisma.hotel.create({
    data: {
      name: "Ibis",
      image: 'https://www.ahstatic.com/photos/a747_ho_00_p_1024x768.jpg',
    },
  });
  let roomsHotel1 = 101;
  for (let i=0; i<6; i++){
    await prisma.room.create({
      data: {
        name: roomsHotel1.toString(),
        capacity: 2,
        hotelId: hotel1.id,
      },
    });
    roomsHotel1++;
  }
  for (let i=0; i<3; i++){
    await prisma.room.create({
      data: {
        name: roomsHotel1.toString(),
        capacity: 1,
        hotelId: hotel1.id,
      },
    });
    roomsHotel1++;
  }

  const hotel2 = await prisma.hotel.create({
    data: {
      name: "Holiday Inn",
      image: 'https://holiday-inn-2.goianiahotels.com/data/Images/740x400/12827/1282709/1282709185/image-goiania-holiday-inn-2-8.JPEG',
    },
  });
  let roomsHotel2 = 101;

  for (let i=0; i<6; i++){
    await prisma.room.create({
      data: {
        name: roomsHotel2.toString(),
        capacity: 2,
        hotelId: hotel2.id,
      },
    });
    roomsHotel2++;
  }
  for (let i=0; i<3; i++){
    await prisma.room.create({
      data: {
        name: roomsHotel2.toString(),
        capacity: 1,
        hotelId: hotel2.id,
      },
    });
    roomsHotel2++;
  }

  const hotel3 = await prisma.hotel.create({
    data: {
      name: "Ibis Budget",
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/116212496.jpg?k=34e32f8cd9c5c861dbb1b3903839650b4f7aba04457859911b62b95668700858&o=&hp=1',
    },
  });
  let roomsHotel3 = 101;

  for (let i=0; i<6; i++){
    await prisma.room.create({
      data: {
        name: roomsHotel3.toString(),
        capacity: 2,
        hotelId: hotel3.id,
      },
    });
    roomsHotel2++;
  }
  for (let i=0; i<3; i++){
    await prisma.room.create({
      data: {
        name: roomsHotel3.toString(),
        capacity: 1,
        hotelId: hotel3.id,
      },
    });
    roomsHotel2++;
  }
  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });