import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../config/db";

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const query = `
    SELECT * FROM organizers 
    WHERE email = ? AND password = ?
  `;

  db.query(query, [email, password], (err, results: any[]) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const organizer = results[0];

    const token = jwt.sign(
      { id: organizer.id, email: organizer.email },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      organizer: {
        id: organizer.id,
        name: organizer.name,
        email: organizer.email
      }
    });
  });
};
