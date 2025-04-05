import express from 'express';
import dotenv from 'dotenv';
import categoryRoutes from './routes/category.js';
import postRoutes from './routes/post.js';
import commentRoutes from './routes/comment.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Bir şeyler ters gitti!' });
});

// Start server
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});

export default app; 