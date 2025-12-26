import { Request, Response } from "express";
import db from "../config/db";

/**
 * CREATE EVENT
 */
export const createEvent = (req: Request, res: Response) => {
  const {
    organizer_id,
    name,
    description,
    venue,
    date_time,
    category,
    capacity,
    price
  } = req.body;

  // Validation
  if (!capacity || capacity <= 0) {
    return res.status(400).json({
      message: "Capacity must be greater than zero"
    });
  }

  if (price === undefined || price < 0) {
    return res.status(400).json({
      message: "Price must be zero or greater"
    });
  }

  const query = `
    INSERT INTO events
    (organizer_id, name, description, venue, date_time, category, capacity, price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      organizer_id,
      name,
      description,
      venue,
      date_time,
      category,
      capacity,
      price
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Error creating event"
        });
      }

      res.status(201).json({
        success: true,
         message: "Event created successfully",
         data: {
          organizer_id,
          name,
          description,
          venue,
          date_time,
          category,
          capacity,
          price
         }
      });
    }
  );
};

/**
 * GET ALL EVENTS (For users / homepage)
 */
export const getAllEvents = (req: Request, res: Response) => {
  const query = `
    SELECT 
      e.id,
      e.organizer_id,
      e.name,
      e.description,
      e.venue,
      e.date_time,
      e.category,
      e.capacity,
      e.price,
      IFNULL(SUM(b.tickets_booked), 0) AS booked
    FROM events e
    LEFT JOIN bookings b ON e.id = b.event_id
    GROUP BY e.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error fetching events"
      });
    }

    res.json(results);
  });
};

/**
 * GET EVENT BY ID
 */
export const getEventById = (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `
    SELECT *
    FROM events
    WHERE id = ?
  `;

  db.query(query, [id], (err, results: any[]) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Server error"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json(results[0]);
  });
};

/**
 * GET MY EVENTS (Organizer events)
 */
export const getMyEvents = (req: Request, res: Response) => {
  // Temporary fixed organizer (replace with JWT later)
  const organizerId = 1;

  const query = `
    SELECT 
      e.id,
      e.organizer_id,
      e.name,
      e.description,
      e.venue,
      e.date_time,
      e.category,
      e.capacity,
      e.price,
      IFNULL(SUM(b.tickets_booked), 0) AS booked
    FROM events e
    LEFT JOIN bookings b ON e.id = b.event_id
    WHERE e.organizer_id = ?
    GROUP BY e.id
  `;

  db.query(query, [organizerId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to fetch organizer events"
      });
    }

    res.json(results);
  });
};

export const deleteEvent = (req: Request, res: Response) => {
  const eventId = req.params.id;

  // Step 1: Delete related bookings
  const deleteBookings = 'DELETE FROM bookings WHERE event_id = ?';

  db.query(deleteBookings, [eventId], (err) => {
    if (err) {
      console.error('BOOKING DELETE ERROR:', err);
      return res.status(500).json({ message: 'Failed to delete bookings' });
    }

    // Step 2: Delete event
    const deleteEventQuery = 'DELETE FROM events WHERE id = ?';

    db.query(deleteEventQuery, [eventId], (err2, result: any) => {
      if (err2) {
        console.error('EVENT DELETE ERROR:', err2);
        return res.status(500).json({ message: 'Failed to delete event' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }

      res.json({ message: 'Event deleted successfully' });
    });
  });
};


export const updateEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    description,
    venue,
    date_time,
    category,
    capacity,
    price
  } = req.body;

  if (!name || !venue || !category) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  if (capacity <= 0) {
    return res.status(400).json({ message: 'Capacity must be greater than zero' });
  }

  if (price < 0) {
    return res.status(400).json({ message: 'Price cannot be negative' });
  }

  const query = `
    UPDATE events SET
      name = ?,
      description = ?,
      venue = ?,
      date_time = ?,
      category = ?,
      capacity = ?,
      price = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [name, description, venue, date_time, category, capacity, price, id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to update event' });
      }

      res.json({ message: 'Event updated successfully' });
    }
  );
};
