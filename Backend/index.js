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

// Update Profile
app.post("/api/updateprofile", async (req, res) => {
  try {
    const { email, firstName, lastName, username, mobileNumber, birthday, address } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required for profile update." });
    }

    const updatedUser = await Register.findOneAndUpdate(
      { email: email },
      {
        firstname: firstName,
        lastname: lastName,
        username: username,
        mobilenumber: mobileNumber,
        Birthday: birthday,
        Address: address,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        firstName: updatedUser.firstname,
        lastName: updatedUser.lastname,
        username: updatedUser.username,
        email: updatedUser.email,
        mobileNumber: updatedUser.mobilenumber,
        birthday: updatedUser.Birthday,
        address: updatedUser.Address,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "An error occurred while updating profile." });
  }
});

// Update Password
app.post("/api/updatepassword", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required for profile password." });
    }

    const updatedUser = await Register.findOneAndUpdate(
      { email: email },
      {
        password: password,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        firstName: updatedUser.firstname,
        lastName: updatedUser.lastname,
        username: updatedUser.username,
        email: updatedUser.email,
        mobileNumber: updatedUser.mobilenumber,
        birthday: updatedUser.Birthday,
        address: updatedUser.Address,
        password: updatedUser.password,
      },
    });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "An error occurred while updating password." });
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
  sleeper_price: Number,
  "1A_price": Number,
  "2A_price": Number,
  "3A_price": Number,
  sleeper_availability: Number,
  "1A_availability": Number,
  "2A_availability": Number,
  "3A_availability": Number,
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
  selected_class: String,
  number_of_tickets: Number,
  price_per_ticket: Number,
  total_price: Number,
  email: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

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
      selected_class,
      number_of_tickets,
      price_per_ticket,
      total_price,
      email,
    } = req.body;

    if (!train_id || !selected_class || !number_of_tickets) {
      return res
        .status(400)
        .json({ error: "Missing required fields for booking." });
    }

    const train = await Train.findById(train_id);
    if (!train) {
      return res.status(404).json({ error: "Train not found." });
    }

    // Class mapping
    const classMap = {
      sleeper: "sleeper_availability",
      "1a": "1A_availability",
      "2a": "2A_availability",
      "3a": "3A_availability",
    };

    const classKey = selected_class.toLowerCase();
    const availabilityField = classMap[classKey];

    if (!availabilityField) {
      return res.status(400).json({
        error: `Class '${selected_class}' not supported.`,
      });
    }

    const currentAvailability = Number(train[availabilityField] || 0);

    if (currentAvailability < number_of_tickets) {
      return res.status(400).json({
        error: `Only ${currentAvailability} tickets left in ${selected_class}.`,
      });
    }

    train[availabilityField] = currentAvailability - number_of_tickets;
    await train.save();

    const newBooking = new Booking({
      train_id,
      train_number,
      train_name,
      from,
      to,
      start_time,
      arrival_time,
      duration,
      selected_class,
      number_of_tickets,
      price_per_ticket,
      total_price,
      email,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking saved successfully.",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving booking data." });
  }
});


// Alternative Route Schema and Routes
const alternativeRouteSchema = new mongoose.Schema({
  from: String,
  to: String,
  intermediate_stop: String,
  train_1: Object,
  train_2: Object,
  availability: Object,
  wait_time: String,
  total_duration: String,
  combined_fare: Object,
});

const AlternativeRoute = mongoose.model(
  "AlternativeRoute",
  alternativeRouteSchema,
  "alternativeroutes"
);

app.post("/api/alternativeroute", async (req, res) => {
  const { from, to } = req.body;
  console.log("Received request for alternative route:", { from, to });

  try {
    const result = await AlternativeRoute.findOne({
      from,
      to,
    });

    if (!result) {
      return res.status(404).json({ message: "No alternative route found." });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

/* -----------------------------
   Alternative Booking Schema
----------------------------- */

const alternativeBookingSchema = new mongoose.Schema({
  train_id: { type: mongoose.Schema.Types.ObjectId, ref: "AlternativeRoute" },
  train_number_1: String,
  train_name_1: String,
  train_number_2: String,
  train_name_2: String,
  from: String,
  to: String,
  fromCode: String,
  toCode: String,
  intermediate_station: String,
  start_time_1: String,
  end_time_1: String,
  start_time_2: String,
  end_time_2: String,
  duration_1: String,
  duration_2: String,
  wait_time: String,
  total_duration: String,
  selected_class: String,
  number_of_tickets: Number,
  price_per_ticket: Number,
  total_price: Number,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AlternativeBooking = mongoose.model(
  "AlternativeBooking",
  alternativeBookingSchema
);

/* -----------------------------
   Alternative Booking Route
----------------------------- */

app.post("/api/alternativebookings", async (req, res) => {
  try {
    const {
      train_id,
      train_number_1,
      train_name_1,
      train_number_2,
      train_name_2,
      from,
      to,
      fromCode,
      toCode,
      intermediate_station,
      start_time_1,
      end_time_1,
      start_time_2,
      end_time_2,
      duration_1,
      duration_2,
      wait_time,
      total_duration,
      selected_class,
      number_of_tickets,
      price_per_ticket,
      total_price,
      email,
    } = req.body;

    if (!train_id || !selected_class || !number_of_tickets || !email) {
      return res
        .status(400)
        .json({ error: "Missing required booking fields." });
    }

    // Find the alternative route
    const route = await AlternativeRoute.findById(train_id);
    if (!route) {
      return res.status(404).json({ error: "Alternative route not found." });
    }

    // Check availability
    const availability = route.availability || {};
    const classKeyMap = {
      sleeper: "sleeper",
      "1a": "firstClass",
      "2a": "secondClass",
      "3a": "thirdClass",
    };
    const key = classKeyMap[selected_class.toLowerCase()];

    if (!key) {
      return res.status(400).json({
        error: `Class ${selected_class} is invalid.`,
      });
    }

    const currentAvailability = Number(availability[key] || 0);

    if (currentAvailability < number_of_tickets) {
      return res.status(400).json({
        error: `Only ${currentAvailability} seats left in ${selected_class}.`,
      });
    }

    // Deduct seats via direct update
    await AlternativeRoute.updateOne(
      { _id: train_id },
      {
        $set: {
          [`availability.${key}`]: currentAvailability - number_of_tickets,
        },
      }
    );

    // Save booking
    const newBooking = new AlternativeBooking({
      train_id,
      train_number_1,
      train_name_1,
      train_number_2,
      train_name_2,
      from,
      to,
      fromCode,
      toCode,
      intermediate_station,
      start_time_1,
      end_time_1,
      start_time_2,
      end_time_2,
      duration_1,
      duration_2,
      wait_time,
      total_duration,
      selected_class,
      number_of_tickets,
      price_per_ticket,
      total_price,
      email,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Alternative booking successful.",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error saving alternative booking:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving alternative booking." });
  }
});

// Booked Train
app.post('/api/bookedtrain', async (req, res) => {
  try {
    const { email } = req.body;

    const [bookings, alternativeBookings] = await Promise.all([
      Booking.find({ email }),
      AlternativeBooking.find({ email })
    ]);

    res.json({
      bookings,
      alternativeBookings
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel Regular Train
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Find booking first
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    const train = await Train.findById(booking.train_id);
    if (!train) {
      return res.status(404).json({ error: "Associated train not found." });
    }

    const classMap = {
      sleeper: "sleeper_availability",
      "1a": "1A_availability",
      "2a": "2A_availability",
      "3a": "3A_availability",
    };

    const classKey = booking.selected_class.toLowerCase();
    const availabilityField = classMap[classKey];

    if (!availabilityField) {
      return res.status(400).json({ error: "Invalid class in booking." });
    }

    train[availabilityField] += booking.number_of_tickets;
    await train.save();

    await Booking.findByIdAndDelete(bookingId);

    res.json({ message: "Booking cancelled successfully." });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ error: "Server error while cancelling booking." });
  }
});

// Cancel Alternative Train

app.delete("/api/alternativebookings/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await AlternativeBooking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Alternative booking not found." });
    }

    const route = await AlternativeRoute.findById(booking.train_id);
    if (!route) {
      return res.status(404).json({ error: "Associated alternative route not found." });
    }

    const classKeyMap = {
      sleeper: "sleeper",
      "1a": "firstClass",
      "2a": "secondClass",
      "3a": "thirdClass",
    };

    const key = classKeyMap[booking.selected_class.toLowerCase()];

    if (!key) {
      return res.status(400).json({ error: "Invalid class in alternative booking." });
    }

    const availability = route.availability || {};
    availability[key] = (availability[key] || 0) + booking.number_of_tickets;

    await AlternativeRoute.findByIdAndUpdate(booking.train_id, {
      $set: { availability }
    });

    await AlternativeBooking.findByIdAndDelete(bookingId);

    res.json({ message: "Alternative booking cancelled successfully." });
  } catch (error) {
    console.error("Error cancelling alternative booking:", error);
    res.status(500).json({ error: "Server error while cancelling alternative booking." });
  }
});
