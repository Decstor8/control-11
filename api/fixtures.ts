import mongoose from "mongoose";
import config from "./config";
import {randomUUID} from "crypto";
import User from "./models/User";
import Products from "./models/Product";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    } catch (err) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    const collections = ['products', 'users'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const [user1, user2] = await User.create(
        {
            username: 'Anna',
            password: '1234',
            token: randomUUID(),
        },
        {
            username: 'John',
            password: '12345',
            token: randomUUID(),
        },
    );

    await Products.create(
        {
            user: user1,
            title: 'car',
            description: 'Fast car',
            price: 170000,
            image: 'images/ec577100-2572-4688-b700-8a44613c6a16.jpeg',
            category: 'cars',
        },
        {
            user: user1,
            title: 'fridge',
            description: 'Cool fridge',
            price: 15000,
            image: 'images/ec577100-2572-4688-b700-8a44613c6a16.jpeg',
            category: 'household',
        },
        {
            user: user2,
            title: 'ball',
            description: 'Round ball',
            price: 3000,
            image: 'images/ec577100-2572-4688-b700-8a44613c6a16.jpeg',
            category: 'other',
        },
        {
            user: user2,
            title: 'computer',
            description: 'New computer',
            price: 70000,
            image: 'images/ec577100-2572-4688-b700-8a44613c6a16.jpeg',
            category: 'other',
        },
    );

    await db.close();
};