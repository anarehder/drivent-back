import { redis } from "@/config";
import { notFoundError } from "@/errors";
import eventRepository from "@/repositories/event-repository";
import { exclude } from "@/utils/prisma-utils";
import { Event } from "@prisma/client";
import dayjs from "dayjs";

async function getFirstEvent(): Promise<GetFirstEventResult> {
  const R_events = await redis.get("eventWithNoDate");
  if (R_events) return JSON.parse(R_events);
  const event = await eventRepository.findFirst();
  if (!event) throw notFoundError();
  const editEvent = exclude(event, "createdAt", "updatedAt");
  await redis.setEx("eventWithNoDate", 100, JSON.stringify(editEvent));
  return editEvent
  // const event = await eventRepository.findFirst();
  // if (!event) throw notFoundError();

  // return exclude(event, "createdAt", "updatedAt");
}

export type GetFirstEventResult = Omit<Event, "createdAt" | "updatedAt">;

async function isCurrentEventActive(): Promise<boolean> {
  const eventKey = 'evento';
  const eventFromRedis = await redis.get(eventKey);
  if (eventFromRedis) {
    const event = JSON.parse(eventFromRedis);
    const now = dayjs();
    const eventStartsAt = dayjs(event.startsAt);
    const eventEndsAt = dayjs(event.endsAt);

    return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
  }
  const event = await eventRepository.findFirst();
  if (!event) return false;
  await redis.setEx(eventKey, 100, JSON.stringify(event))

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}

const eventsService = {
  getFirstEvent,
  isCurrentEventActive,
};

export default eventsService;
