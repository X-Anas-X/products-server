import mongoose, {ConnectOptions} from 'mongoose';
import {Express} from 'express';
import {URI} from './configs';

export const connectDB = async (app: Express) => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb+srv://anaszain1996:12341234@test.wetatdc.mongodb.net', {
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
