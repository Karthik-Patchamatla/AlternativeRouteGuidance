const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is working");
});

/* -----------------------------
      User Schema and Routes
----------------------------- */

const registerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  mobilenumber: { type: Number, required: true },
  password: { type: String, required: true },
  Birthday: String,
  Address: String,
});

const Register = mongoose.model("Register", registerSchema);

// Registration
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, username, email, mobileNumber, password } =
      req.body;

    const newUser = new Register({
      firstname: firstName,
      lastname: lastName,
      username,
      email,
      mobilenumber: mobileNumber,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "An error occurred while registering" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Register.findOne({ email: email });

    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        firstName: user.firstname,
        lastName: user.lastname,
        username: user.username,
        email: user.email,
        mobileNumber: user.mobilenumber,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during login" });
  }
});

/* -----------------------------
     Train Schema and Routes
----------------------------- */

const trainSchema = new mongoose.Schema({
  train_number: String,
  train_name: String,
  from: String,
  to: String,
  start_time: String,
  arrival_time: String,
  duration: String,
  sleeper_price: String,
  "1A_price": String,
  "2A_price": String,
  "3A_price": String,
  "1A_availability": String,
  "2A_availability": String,
  "3A_availability": String,
  "sleeper_availability": String,
});

const Train = mongoose.model("Train", trainSchema);

// Search Trains
app.post("/api/searchtrains", async (req, res) => {
  const { from, to } = req.body;

  if (!from || !to) {
    return res
      .status(400)
      .json({ error: "Both 'from' and 'to' fields are required." });
  }

  try {
    const trains = await Train.find({ from, to });

    if (trains.length > 0) {
      res.status(200).json(trains);
    } else {
      res
        .status(404)
        .json({ message: "No trains found for the specified route." });
    }
  } catch (error) {
    console.error("Error in /api/searchtrains:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching train data." });
  }
});

/* -----------------------------
         Booking Schema
----------------------------- */

const bookingSchema = new mongoose.Schema({
  train_id: { type: mongoose.Schema.Types.ObjectId, ref: "Train" },
  train_number: String,
  train_name: String,
  from: String,
  to: String,
  start_time: String,
  arrival_time: String,
  duration: String,
  date_of_journey: String,
  selected_class: String,
  number_of_tickets: Number,
  price_per_ticket: Number,
  total_price: Number,
});

const Booking = mongoose.model("Booking", bookingSchema);

// Create Booking
app.post("/api/bookings", async (req, res) => {
  try {
    const {
      train_id,
      train_number,
      train_name,
      from,
      to,
      start_time,
      arrival_time,
      duration,
      date_of_journey,
      selected_class,
      number_of_tickets,
      price_per_ticket,
      total_price,
    } = req.body;

    const newBooking = new Booking({
      train_id,
      train_number,
      train_name,
      from,
      to,
      start_time,
      arrival_time,
      duration,
      date_of_journey,
      selected_class,
      number_of_tickets,
      price_per_ticket,
      total_price,
    });

    await newBooking.save();

    res.status(201).json({ message: "Booking saved successfully" });
  } catch (error) {
    console.error("Error saving booking:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving booking data." });
  }
});
