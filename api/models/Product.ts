import {Schema, model, Types} from "mongoose";
import {ProductsTypes} from "../types";
import User from "./User";

const ProductsSchema = new Schema<ProductsTypes>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);

                return Boolean(user);
            },
            message: 'Пользователь не найден!',
        },
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['other', 'computers', 'cars', 'household'],
        default: 'other',
        required: true,
    }
});

const Products = model('Products', ProductsSchema);
export default Products;