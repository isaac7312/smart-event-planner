import { Request, Response } from 'express';
import db from '../config/db';

export const createBooking = (req: Request, res: Response) => {
  const { eventId, tickets } = req.body;

  if (!eventId || !tickets || tickets < 1) {
    return res.status(400).json({ message: 'Invalid booking data' });
  }

  const attendeeId = 1;// TEMP user
  const pricePerTicket = 100;

  // 1️⃣ Get event capacity
  db.query(
    'SELECT capacity FROM events WHERE id = ?',
    [eventId],
    (err, eventResult: any) => {
      if (err || eventResult.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const capacity = eventResult[0].capacity;

      // 2️⃣ Get already booked tickets
      db.query(
        'SELECT IFNULL(SUM(tickets_booked), 0) AS booked FROM bookings WHERE event_id = ?',
        [eventId],
        (err, bookingResult: any) => {
          if (err) return res.status(500).json({ error: err });

          const booked = bookingResult[0].booked;
          const available = capacity - booked;

          // 3️⃣ Prevent overbooking
          if (tickets > available) {
            return res.status(400).json({
              message: `Only ${available} tickets available`
            });
          }

          const totalPrice = tickets * pricePerTicket;

          // 4️⃣ Insert booking
          db.query(
            `INSERT INTO bookings 
             (event_id, attendee_id, tickets_booked, total_price)
             VALUES (?, ?, ?, ?)`,
            [eventId, attendeeId, tickets, totalPrice],
            (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: err });
              }

              res.json({
                message: 'Booking successful',
                totalPrice
              });
            }
          );
        }
      );
    }
  );
};
