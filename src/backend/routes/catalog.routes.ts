import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../db';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

// GET /api/v1/catalog/trending
router.get('/trending', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // In a real app we would query Redis/WatchHistory for trend computations
    const result = await db.query('SELECT * FROM movies ORDER BY release_year DESC LIMIT 10');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/catalog/search
router.get('/search', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query.q as string;
    if (!query) return res.json([]);

    const result = await db.query(
      'SELECT id, title, thumbnail_url, \'movie\' as type FROM movies WHERE title ILIKE $1',
      [`%${query}%`]
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/catalog/movies/:id
router.get('/movies/:id', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM movies WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
