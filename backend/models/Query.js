const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
    topic: { type: String, required: true },
    explanations: {
        child: String,
        student: String,
        expert: String
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Query', QuerySchema);