const mongoose = require("mongoose");
const schema = mongoose.Schema;
const tripSchema = new schema({
    driver: {
        type: mongoose.ObjectId,
        require: true,
    },    
    source: {
        type: Object,
        required: true,
    },
    destination: {
        type: Object,
        required: true,
    },
    route: {
        type: Array
    },
    waypoints: {
        type: Array,
        default: []
    },
    dateTime: {
        type: Date,
        required: true,
    },
    max_riders: {
        type: Number,
        required: true,
    },
    available_riders: {
        type: Boolean,
        default: true
    },
    riders: {
        type: Array,
        default: []
    },
    completed: {    // false: active
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("trip", tripSchema)