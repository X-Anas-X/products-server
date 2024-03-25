import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    productType: {type: String, enum: ['integrated', 'peripheral']},
    description: {type: String, required: true},
    isFavorite: {type: Boolean, default: false},
    comment: {type: String},
});

export const Product = mongoose.model('Product', productSchema);
