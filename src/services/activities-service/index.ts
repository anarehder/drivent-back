import { conflictError, fullyBookedError, notFoundError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";

async function getActivities(userId: number) {
    const activities = await activitiesRepository.getBookingDB(userId)

    if (!activities) {
        throw notFoundError()
    }
    return activities
}

async function postActivityBooking(userId: number, activityId: number) {
    const bookedActivities = await activitiesRepository.getBookedActivities(userId);
    const activityToBook = await activitiesRepository.getActivity(activityId);
    if (activityToBook.capacity <= 0) {
        throw fullyBookedError();
    }
    if (bookedActivities.some(bookedActivity => isTimeConflict(bookedActivity.Activitie, activityToBook))) {
        throw conflictError('Conflicting booking found.')
    }
    await activitiesRepository.createActivityBooking(userId, activityId);
    await activitiesRepository.decreaseActivityCapacity(activityId);
    return "Atividade reservada com sucesso! Sua inscrição foi confirmada."
}

function isTimeConflict(activitieA: { startsAt: Date; endsAt: Date }, activitieB: { startsAt: Date; endsAt: Date }): boolean {
    const startsAtA = activitieA.startsAt;
    const endsAtA = activitieA.endsAt;
    const startsAtB = activitieB.startsAt;
    const endsAtB = activitieB.endsAt;

    return (
        (startsAtB >= startsAtA && startsAtB <= endsAtA) ||
        (endsAtB >= startsAtA && endsAtB <= endsAtA) ||
        (startsAtA >= startsAtB && startsAtA <= endsAtB) ||
        (endsAtA >= startsAtB && endsAtA <= endsAtB)
    );
}

const activitiesService = {
    getActivities,
    postActivityBooking
}

export default activitiesService