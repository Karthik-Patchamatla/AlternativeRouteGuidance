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

// API route to get user profile details by email using a GET request
app.get('/api/user/profile', async (req, res) => {
    try {
        const email = req.query.email; // Get email from query parameter
        console.log("Email received:", email); // Log the received email

        // Fetch user details by email
        const user = await Register.findOne({ email: email });
        console.log("User found:", user); // Log the user object

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Prepare the user data to send back
        const userData = {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            mobilenumber: user.mobilenumber,
            address: user.Address,
            birthday: user.Birthday
        };

        // Log the data being sent to the client
        console.log("Sending user data:", userData);

        // Return the user details to the client
        res.status(200).json(userData);
    } catch (error) {
        console.error("Error fetching user details:", error); // Log any errors
        res.status(500).json({ error: "An error occurred while fetching profile details" });
    }
});

// API route to handle updating user profile
app.put('/api/user/update', async (req, res) => {
    try {
        const email = req.query.email; // Get email from query parameter
        const { firstname, lastname, username, mobilenumber, address, birthday } = req.body;

        // Find the user by email
        const user = await Register.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user details
        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.username = username || user.username;
        user.mobilenumber = mobilenumber || user.mobilenumber;
        user.Address = address || user.Address;
        user.Birthday = birthday || user.Birthday;

        // Save updated user
        await user.save();

        // Return success message
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error); // Log any errors
        res.status(500).json({ error: "An error occurred while updating profile" });
    }
});

// API route to handle password change
app.post('/api/user/change-password', async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        // Find the user by email
        const user = await Register.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if old password matches
        if (user.password !== oldPassword) {
            return res.status(400).json({ error: "Old password is incorrect" });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error changing password:", error); // Log any errors
        res.status(500).json({ error: "An error occurred while changing the password" });
    }
});

const trainSchema = new mongoose.Schema({
    trainnumber: { type: String, required: true },
    trainname: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    duration: { type: String, required: true },
    arrival: { type: String, required: true },
    departure: { type: String, required: true },
    sleeper: { type: Number, required: true },
    firstclass: { type: Number, required: true },
    secondclass: { type: Number, required: true },
    thirdclass: { type: Number, required: true }
  });
  
  // Define Train Model
  const Train = mongoose.model('Train', trainSchema);
  
  // API route to get trains
  app.get('/api/getTrains', async (req, res) => {
    try {
      const trains = await Train.find(); // Fetch all trains
      res.json(trains); // Return train data
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch train details' });
    }
  });

// API route to get trains by 'from' and 'to' locations
app.get('/api/getTrainsByRoute', async (req, res) => {
    try {
        const { from, to } = req.query;

        // Find trains that match the 'from' and 'to' locations
        const trains = await Train.find({ from: from, to: to });

        if (trains.length === 0) {
            return res.status(404).json({ message: "No trains found for this route" });
        }

        res.status(200).json(trains);
    } catch (error) {
        console.error("Error fetching trains by route:", error);
        res.status(500).json({ error: "An error occurred while fetching train details" });
    }
});


  