const mongoose = require('mongoose');
const { Schema } = mongoose;

const Like = mongoose.model(
    'Like',
    new Schema({
        userId: {
            type: String,
            required: true
        },
        petId: {
            type: String,
            required: true
        }
    }, {timestamp: true})
);

module.exports = Like;