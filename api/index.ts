import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import usersRouter from "./routers/users";
import config from "./config";
import productsRouter from "./routers/products";

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/products', productsRouter);


const run = async () => {
    await  mongoose.connect(config.mongoose.db);

    app.listen(port, () => {
        console.log(`Сервер стартовал на ${port} порту`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

void run();