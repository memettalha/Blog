import dotenv from 'dotenv';
import express from 'express';
import categoryRoutes from './routes/category.js';
import postRoutes from './routes/post.js';
import commentRoutes from './routes/comment.js';

dotenv.config();

const PORT = 3001;
const app = express();
app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.listen(PORT, () => {
    console.log('Sunucu Ayakta');
}); 