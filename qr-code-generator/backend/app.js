const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes'); // Import the routes from routes.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (frontend) from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Root route: Serve index.html for frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html')); // Serve the HTML file
});

// API Routes
app.use('/api', routes); // Using the /api path for the backend routes

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server errors
server.on('error', (err) => {
  switch (err.code) {
    case 'EADDRINUSE':
      console.error(`Port ${PORT} is already in use. Please use a different port.`);
      break;
    case 'ECONNREFUSED':
      console.error('Connection refused. Make sure the database or service is running.');
      break;
    case 'ECONNRESET':
      console.error('Connection was forcibly closed by a peer.');
      break;
    case 'ETIMEDOUT':
      console.error('Request timed out. Please check network connectivity or service status.');
      break;
    case 'ENOTFOUND':
      console.error('Domain or service not found. Please check your URL or service availability.');
      break;
    default:
      console.error('An unexpected server error occurred:', err.message);
      break;
  }
});

// Error-handling middleware for unhandled routes or general errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'An internal server error occurred!',
    error: err.message
  });
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error:', err);
  process.exit(1); // Mandatory exit to avoid unpredictable behavior
});
