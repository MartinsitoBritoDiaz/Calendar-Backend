/* 
    Events Endpoints / Calendar
    host + /api/event
*/

const { Router } = require("express");
const { validateJWT } = require("../middlewares/jwtValidator");
const { check } = require("express-validator");
const { fieldsValidator } = require("../middlewares/fieldsValidator");
const { isDate } = require("../helpers/isDate");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const router = Router();

//Validating JWT for all routes below this code, if you want to set one route without the JWT verification you just need to move that endpoint above
router.use(validateJWT);

router.get("/", getEvents);

//Create an Event
router.post(
  "/",
  [
    check("title", "Title could not be empty").not().isEmpty(),
    check("start", "Start date is require").custom(isDate),
    check("end", "End date is require").custom(isDate),
    fieldsValidator,
  ],
  createEvent
);

router.put(
  "/:id",
  [
    check("title", "Title could not be empty").not().isEmpty(),
    check("start", "Start date is require").custom(isDate),
    check("end", "End date is require").custom(isDate),
    fieldsValidator,
  ],
  updateEvent
);
router.delete("/:id", deleteEvent);

module.exports = router;
