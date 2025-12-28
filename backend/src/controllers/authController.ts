import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../config/db";

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 🛑 Validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required"
    });
  }

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, results: any[]) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Server error"
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const user = results[0];

    // 🔐 Compare password hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // 🔑 Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "1d" }
    );

    // ✅ SUCCESS RESPONSE
    res.json({
      message: "Login successful",
      token
    });
  });
};
