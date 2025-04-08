const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Middleware to parse incoming form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static HTML/JS/CSS files from the "public" folder
app.use(express.static(path.join(__dirname, "../public")));

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.path}`);
  next();
});

// Route to handle booking form submission
app.post("/bookings", (req, res) => {
  const { name, checkin, checkout, roomType } = req.body;

  if (!name || !checkin || !checkout || !roomType) {
    console.log("Error: Missing booking details.");
    return res.status(400).send("Please provide all booking details.");
  }

  const roomTypeText = {
    single: "Single Room",
    double: "Double Room",
    suite: "Luxury Suite",
  }[roomType];

  // Log the booking details in the command prompt
  console.log(`
    New Booking Received:
    Name: ${name}
    Room Type: ${roomTypeText}
    Check-In: ${checkin}
    Check-Out: ${checkout}
  `);

  res.status(200).send("Booking successfully logged to the server!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`HAVN STAY server running on http://localhost:${PORT}`);
});
