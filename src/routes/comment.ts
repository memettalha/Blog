import express, { Request, Response, RequestHandler } from 'express';

const router = express.Router();

router.get('/', (async (req: Request, res: Response) => {
  try {
    res.json({ message: 'Yorumlar listelenecek' });
  } catch (error) {
    console.error('Yorumlar getirilirken hata:', error);
    res.status(500).json({ message: 'Yorumlar getirilirken bir hata oluştu' });
  }
}) as RequestHandler);

export default router; 