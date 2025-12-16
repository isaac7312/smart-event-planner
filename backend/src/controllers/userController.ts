import { Request, Response } from "express";
import db from "../config/db";

// Create user
export const createUser = (req: Request, res: Response) => {
  const { name, email, role } = req.body;

  const query =
    "INSERT INTO users (name, email, role) VALUES (?, ?, ?)";

  db.query(query, [name, email, role], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating user" });
    }
    res.json({ message: "User created successfully" });
  });
};

// Get all users
export const getUsers = (_req: Request, res: Response) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching users" });
    }
    res.json(result);
  });
};
