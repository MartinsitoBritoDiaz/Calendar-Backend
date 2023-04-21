const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  try {
    const events = await Event.find().populate("user", "name");

    res.status(201).json({
      ok: true,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error while getting data",
    });
  }
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const savedEvent = await event.save();

    res.status(201).json({
      ok: true,
      msg: "create event",
      event: savedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error while getting data",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event)
      return res.status(404).json({
        ok: false,
        msg: "There is not event with this id",
      });

    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "Not allow it to edit this event",
      });

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

    res.status(201).json({
      ok: true,
      event: updatedEvent
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error while updating data",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event)
      return res.status(404).json({
        ok: false,
        msg: "There is not event with this id",
      });

    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "Not allow it to delete this event",
      });

    await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error while deleting data",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
