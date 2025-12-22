import { Request, Response } from 'express';
import db from '../config/db';

export const getDashboardCounts = (req: Request, res: Response) => {

  db.query('SELECT COUNT(*) AS count FROM events', (err, eventResult: any) => {
    if (err) return res.status(500).json(err);

    db.query('SELECT COUNT(*) AS count FROM users', (err, userResult: any) => {
      if (err) return res.status(500).json(err);

      db.query('SELECT COUNT(*) AS count FROM bookings', (err, bookingResult: any) => {
        if (err) return res.status(500).json(err);

        res.json({
          totalEvents: eventResult[0].count,
          totalUsers: userResult[0].count,
          totalBookings: bookingResult[0].count
        });
      });
    });
  });

};
