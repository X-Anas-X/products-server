import {connectDB} from './db';
import express from 'express';
import {Product} from './Products/schema';
import {User, UserDocument} from './User/Schema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface MongoError extends Error {
    code: number;
    keyValue?: {
        [key: string]: string;
    };
}

const app = express();
app.use(express.json());

// Create a new product
app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (err) {
        const mongoError = err as MongoError;
        if (mongoError.code === 11000 && mongoError.keyValue.name) {
            res.status(444).send('Product name is already taken');
        } else {
            res.status(400).send(err);
        }
    }
});

// Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a product by ID
app.patch('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (err) {
        const mongoError = err as MongoError;
        if (mongoError.code === 11000 && mongoError.keyValue.name) {
            res.status(444).send('Product name is already taken');
        } else {
            res.status(400).send(err);
        }
    }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user: UserDocument = new User({username, email, password});
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Signin endpoint
app.post('/signin', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user: UserDocument | null = await User.findOne({email});
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }
        const isMatch: boolean = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

connectDB(app);
