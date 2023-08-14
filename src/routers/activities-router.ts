import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listActivities, postActivityBooking } from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("", listActivities)
  .post("", postActivityBooking);

export { activitiesRouter };
