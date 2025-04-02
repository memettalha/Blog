import express, { Request, Response, RequestHandler } from 'express';
const router = express.Router();

router.get('/', (async (req: Request, res: Response) => {
  try {
    res.json({ message: 'Gönderiler listelenecek' });
  } catch (error) {
    console.error('Gönderiler getirilirken hata:', error);
    res.status(500).json({ message: 'Gönderiler getirilirken bir hata oluştu' });
  }
}) as RequestHandler);

export default router; 