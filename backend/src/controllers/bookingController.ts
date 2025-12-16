import { Request, Response } from "express";
import db from "../config/db";

export const createBooking = (req: Request, res: Response) => {
  const { attendee_id, event_id, tickets_booked, total_price } = req.body;

  const query = `
    INSERT INTO bookings (attendee_id, event_id, tickets_booked, total_price)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [attendee_id, event_id, tickets_booked, total_price], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Booking created successfully" });
  });
};

export const getAllBookings = (req: Request, res: Response) => {
  db.query("SELECT * FROM bookings", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};
