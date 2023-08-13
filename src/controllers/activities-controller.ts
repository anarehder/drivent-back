import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function listActivities(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const result = activitiesService.getActivities(userId);
        return res.status(httpStatus.OK).send(result);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export async function postActivityBooking(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const activityId = Number(req.body);
        if(!activityId) res.sendStatus(httpStatus.BAD_REQUEST);
        const result = activitiesService.postActivityBooking(userId,activityId)
        return res.status(httpStatus.OK).send(result)
    } catch (error) {
        if (error.name === "CannotBookingError") {
          return res.sendStatus(httpStatus.FORBIDDEN);
        }
        if (error.name === "ConflictError") {
          return res.sendStatus(httpStatus.CONFLICT);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
}