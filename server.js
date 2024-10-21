import express from 'express';
import 'dotenv/config'
import userRoutes from './src/user/user.routes.js'
import cardRoutes from './src/card/card.routes.js'

const app = express();
const port = parseInt(process.env.APIBOOK_PORT) || 3000;

app.use(express.json());

app.get('/', (req,res) =>{
    res.status(200).json('OK');
});

app.use('/api', userRoutes);
app.use('/api', cardRoutes);

app.listen(port, () =>{
    console.log('Servidor funcionando');
});