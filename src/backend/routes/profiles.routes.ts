import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { db } from '../db';
import { randomUUID } from 'crypto';
import { authenticateToken } from '../middlewares/auth';
import type { Request } from 'express';

// Extend properly for auth token passing
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const router = Router();

const profileSchema = z.object({
  name: z.string().min(1),
  avatar_url: z.string().url().optional(),
  is_kids: z.boolean().default(false),
  language: z.string().default('en'),
});

// GET /api/v1/profiles - List profiles for active user
router.get('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const result = await db.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/profiles - Create new profile
router.post('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { name, avatar_url, is_kids, language } = profileSchema.parse(req.body);

    const checkCount = await db.query('SELECT count(*) FROM profiles WHERE user_id = $1', [userId]);
    if (parseInt(checkCount.rows[0].count) >= 5) {
      return res.status(403).json({ error: 'Maximum profile limit (5) reached.' });
    }

    const profileId = randomUUID();
    const result = await db.query(
      'INSERT INTO profiles (id, user_id, name, avatar_url, is_kids, language) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [profileId, userId, name, avatar_url || '', is_kids, language]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
