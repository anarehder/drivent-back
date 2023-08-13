/* eslint-disable boundaries/element-types */
import hotelRepository from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import roomRepository from "@/repositories/room-repository";
import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import bookingRepository from "@/repositories/booking-repository";
import { redis } from "@/config";

async function listHotels(userId: number) {
  //Tem enrollment?
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListHotelsError();
  }
}

async function getHotels(userId: number) {
  const hotelsKey = "hotels";
  const hotelsFromRedis = await redis.get(hotelsKey);
  if (hotelsFromRedis) {
    const hotels = JSON.parse(hotelsFromRedis);
    return hotels;
  }

  await listHotels(userId);

  const hotels = await hotelRepository.findHotels();
  if (!hotels || hotels.length === 0) return [];

  const capacity = await roomRepository.countCapacity();
  const booking = await bookingRepository.countBooking();
  const response = [];

  for (let i = 0; i < hotels.length; i++) {
    const objeto = {
      ...hotels[i],
      capacity: capacity.find(x => x.hotelId === hotels[i].id),
      booking: booking.find(x => x.hotelId === hotels[i].id)
    };
    response.push(objeto);
  }

  await redis.setEx(hotelsKey, 100, JSON.stringify(response));
  return response;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  const hotelKey = `hotel${hotelId}`;
  const hotelFromRedis = await redis.get(hotelKey);
  if (hotelFromRedis) {
    const hotel = JSON.parse(hotelFromRedis);
    return hotel;
  }
  await listHotels(userId);
  const hotel = await hotelRepository.findRoomsByHotelId(hotelId);

  if (!hotel) {
    throw notFoundError();
  }

  await redis.setEx(hotelKey, 100, JSON.stringify(hotel));

  return hotel;
}

const hotelService = {
  getHotels,
  getHotelsWithRooms,
};

export default hotelService;
