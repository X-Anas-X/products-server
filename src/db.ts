import mongoose, {ConnectOptions} from 'mongoose';
import {Express} from 'express';
import {URI} from './configs';

export const connectDB = async (app: Express) => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(URI, {
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
