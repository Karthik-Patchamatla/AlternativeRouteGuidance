const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Connect to MongoDB
main().then(() => {
    console.log('Connection to MongoDB successful');
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/RegisterDetails');
}

app.listen(8080, () => {
    console.log("The server is running on port 8080");
});

// Define Mongoose schema
const registerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobilenumber: {
        type: Number,
        required: true,
    },
    password: { // Fixed the typo in "password"
        type: String,
        required: true,
    },
    Birthday: {
        type: String,
    },
    Address: {
        type: String,
    },
});

// Define model
const Register = mongoose.model('Register', registerSchema);

// API route to handle registration
app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName, username, email, mobileNumber, password } = req.body;
        
        // Create a new user document
        const newUser = new Register({
            firstname: firstName,
            lastname: lastName,
            username,
            email,
            mobilenumber: mobileNumber,
            password // Use the corrected field name
        });

        // Save to database
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while registering" });
    }
});

// API route to handle login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const user = await Register.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Check if password matches
        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Return username along with success message
        res.status(200).json({ message: "Login successful", username: user.username });
    } catch (error) {
        res.status(500).json({ error: "An error occurred during login" });
    }
});

// API route to get user details by email
app.post('/api/getUserDetails', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Fetch user details by email
        const user = await Register.findOne({ email: email }, 'username');
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return the username to the client
        res.status(200).json({ username: user.username });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching user details" });
    }
});
