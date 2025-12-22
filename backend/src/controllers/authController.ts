import { Request, Response } from 'express';
import db from '../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret123'; // move to .env later

// ================= REGISTER =================
export const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    // ✅ role added here
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, 'user'],
    (err) => {
      if (err) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      res.json({ message: 'User registered successfully' });
    }
  );
};

// ================= LOGIN =================
export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, results: any[]) => {
      if (err || results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];
      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role }, // ✅ role in token
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role // ✅ role sent to frontend
        }
      });
    }
  );
};
