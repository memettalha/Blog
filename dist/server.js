import dotenv from 'dotenv';
import express from 'express';
import categoryRoutes from './routes/category.js';
import postRoutes from './routes/post.js';
import commentRoutes from './routes/comment.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
// Routes
app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Sunucu hatası!' });
});
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor`);
});
