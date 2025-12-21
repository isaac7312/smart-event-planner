import { Request, Response } from "express";
import db from "../config/db";

export const createEvent = (req: Request, res: Response) => {
  const { organizer_id, name, description, venue, date_time, category, capacity } = req.body;

  const query = `
    INSERT INTO events 
    (organizer_id, name, description, venue, date_time, category, capacity)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [organizer_id, name, description, venue, date_time, category, capacity],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Error creating event", error: err });
      }
      res.status(201).json({ message: "Event created successfully" });
    }
  );
};

export const getAllEvents = (req: Request, res: Response) => {
  const query = `
    SELECT 
      e.*,
      IFNULL(SUM(b.tickets_booked), 0) AS booked
    FROM events e
    LEFT JOIN bookings b ON e.id = b.event_id
    GROUP BY e.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching events" });
    }
    res.json(results);
  });
};
