const mongoose = require('mongoose');
const { Schema } = mongoose;

const Pet = mongoose.model(
    'Pet',
    new Schema({
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        weigth: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true
        },
        available: Boolean,
        likes: Array,
        user: Object,
        adopter: Object,
    }, {timestamps: true})
);

module.exports = Pet;