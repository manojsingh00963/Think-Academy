import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema({
  user:{ type: Schema.Types.ObjectId,
    ref:"User"
   },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
