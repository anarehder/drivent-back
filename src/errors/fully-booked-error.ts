import { ApplicationError } from "@/protocols";

export function fullyBookedError(): ApplicationError {
  return {
    name: "CannotBookingError",
    message: "Activity is already fully booked.",
  };
}