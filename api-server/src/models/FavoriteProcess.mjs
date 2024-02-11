import mongoose from "mongoose";

const favoriteProcess = new mongoose.Schema({
    processList: {
        type: [String],
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});

const FavoriteProcess = mongoose.model("favoriteProcess", favoriteProcess);

export { FavoriteProcess };