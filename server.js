// server.js
import express from 'express';
import { Shopify } from '@shopify/shopify-api';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SHOPIFY_SCOPES.split(","),
  HOST_NAME: process.env.SHOPIFY_APP_URL.replace(/^https:\/\//, ""),
  IS_EMBEDDED_APP: true,
  API_VERSION: '2023-10', // use latest API
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

app.get("/", (_req, res) => {
  res.send("AuroraBloomSEO is Running ✅");
});

// Simple webhook handler (optional)
app.post("/webhooks", async (req, res) => {
  try {
    await Shopify.Webhooks.Registry.process(req, res);
    console.log("Webhook processed, returning 200");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// Listen
app.listen(PORT, () => {
  console.log(`AuroraBloomSEO app is running at http://localhost:${PORT}`);
});
