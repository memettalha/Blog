require('dotenv').config()
const PORT = 3000
const express = require('express')
const app = express();
const categoryRoutes = require('./routes/category')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
app.use(express.json())

app.use('/categories',categoryRoutes)
app.use('./posts',postRoutes)
app.use('./comments',commentRoutes)

app.listen(PORT,() => {
    console.log('Sunucu Ayakta')
})