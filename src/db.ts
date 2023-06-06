import mongoose, {ConnectOptions} from 'mongoose';
import {Express} from 'express';

export const connectDB = async (app: Express) => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://localhost:27017/products-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        // eslint-disable-next-line no-console
        app.listen(3000, () => console.log('Server running on port 3000'));
    } catch (err) {
        return err;
    }
};

export default connectDB;
