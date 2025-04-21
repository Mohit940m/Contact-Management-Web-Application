const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    jobTitle: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", contactSchema);

