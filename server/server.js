import './config/instrument.js'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerWebhooks } from './controllers/webhooks.js';


dotenv.config(); // Load .env BEFORE anything else

const app = express();

// Connect to Database
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API Working"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerWebhooks)



// Port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
