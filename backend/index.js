require('dotenv').config();

// const config = require("./config.json");
const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString)
    // mongoose.connect(connectionString, {   // useNewUrlParser and useUnifiedTopology are no longer needed as of MongoDB Node.js Driver v4.0+ — and will be removed in the future.
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

const User = require("./models/user.model");
const Contact = require("./models/contact.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { autenticateToken } = require("./utilities")


app.use(express.json());

app.use(
    cors({
        origin: "*"
    })
);

app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

// Backend ready !!

// Create Account
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
        return res.status(400).json({ error: true, message: "User already exists" });
    }

    const user = new User({ fullName, email, password });
    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });

    res.status(201).json({ error: false, user, accessToken, message: "Registration Successful" });
});

// Login

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const userInfo = await User.findOne({ email });

    if (!userInfo) {
        return res.status(400).json({ error: true, message: "Invalid email or password" });
    }

    if (userInfo.password !== password) {
        return res.status(400).json({ error: true, message: "Invalid email or password" });
    }

    const accessToken = jwt.sign({ userId: userInfo._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    })

    res.status(200).json({ error: false, accessToken, message: "Login Successful" });
});

// Get User Details
app.get("/get-user", autenticateToken, async (req, res) => {
    const userId = req.user.userId; // Extract userId from the token

    try {
        // Find the user by ID
        const user = await User.findById(userId).select("-password"); // Exclude the password field

        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }

        return res.status(200).json({
            error: false,
            user,
            message: "User details retrieved successfully",
        });
    } catch (error) {
        console.error("Error retrieving user:", error.message);
        return res.status(500).json({
            error: true,
            message: "Internal server error while retrieving user details",
        });
    }
});


// Add Contact 
app.post("/contacts", autenticateToken, async (req, res) => {
    const m = req.user;
    console.log(m);
    const userId = req.user.userId; // Extract userId

    console.log("Extracted userId:", userId); // Debug here

    const { firstName, lastName, email, phone, company, jobTitle } = req.body;

    if (!firstName || !email || !phone) {
        return res.status(400).json({
            error: true,
            message: "First Name, Email, and Phone are required fields",
        });
    }

    try {
        const newContact = new Contact({
            firstName,
            lastName,
            email,
            phone,
            company,
            jobTitle,
            userId, // Ensure this is passed
        });

        console.log("New Contact Object:", newContact); // Log the contact object

        await newContact.save();

        res.status(201).json({
            error: false,
            message: "Contact added successfully",
            contact: newContact,
        });
    } catch (error) {
        console.error("Error saving contact:", error.message); // Log detailed error
        res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});


// Edit contacts
app.put("/edit-contacts/:id", autenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { id: contactId } = req.params;
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;

    try {
        const contact = await Contact.findOne({ _id: contactId, userId });

        if (!contact) {
            return res.status(404).json({
                error: true,
                message: "Contact not found or unauthorized",
            });
        }

        // Update the contact
        contact.firstName = firstName || contact.firstName;
        contact.lastName = lastName || contact.lastName;
        contact.email = email || contact.email;
        contact.phone = phone || contact.phone;
        contact.company = company || contact.company;
        contact.jobTitle = jobTitle || contact.jobTitle;

        await contact.save();

        return res.json({
            error: false,
            contact,
            message: "Contact updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal error",
        });
    }
});


// Get all contacts for the authenticated user
app.get("/get-all-contacts", autenticateToken, async (req, res) => {
    const userId = req.user.userId; // Correctly extract the user ID from the token

    try {
        // Find all contacts that belong to the authenticated user
        const contacts = await Contact.find({ userId });

        // Respond with the retrieved contacts
        return res.status(200).json({
            error: false,
            contacts,
            message: "All contacts retrieved successfully",
        });
    } catch (error) {
        // Handle errors during the database operation
        console.error("Error retrieving contacts:", error.message);
        return res.status(500).json({
            error: true,
            message: "Internal server error while retrieving contacts",
        });
    }
});


// Delete Contact
app.delete("/delete-contact/:id", autenticateToken, async (req, res) => {
    const userId = req.user.userId; // Extract userId from the token
    const { id: contactId } = req.params; // Contact ID from the URL params

    try {
        // Find and delete the contact belonging to the user
        const contact = await Contact.findOneAndDelete({ _id: contactId, userId });

        if (!contact) {
            return res.status(404).json({
                error: true,
                message: "Contact not found or unauthorized",
            });
        }

        return res.status(200).json({
            error: false,
            message: "Contact deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting contact:", error.message);
        return res.status(500).json({
            error: true,
            message: "Internal server error while deleting contact",
        });
    }
});

// Search Contact
app.get("/search-contacts", autenticateToken, async (req, res) => {
    const userId = req.user.userId; // Extract userId from the token
    const { query } = req.query;

    if (!query) {
        toast.error("Search query is required");
        return res.status(400).json({ error: true, message: "Search query is required" });
    }

    try {
        const searchRegex = new RegExp(query, "i");

        const contacts = await Contact.find({
            userId,
            $or: [
                { firstName: { $regex: searchRegex } },
                { lastName: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },
                { phone: { $regex: searchRegex } },
                { company: { $regex: searchRegex } },
                { jobTitle: { $regex: searchRegex } },
            ],
        });
        return res.status(200).json({ error: false, contacts });
    } catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
});




app.listen(8000);

module.exports = app;