import express from "express";
import cors from "cors";

import {
  runAccessibilityScan,
} from "./scanners/accessibilityScanner.js";

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
  }));
app.use(express.json());

app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "Accessibility Auditor API running",
  });

});

app.post("/scan", async (req, res) => {

  try {

    const { url } = req.body;

    const results = await runAccessibilityScan(url);

    res.json(results);

  } catch (error) {

    console.log("SCAN ERROR:");
  console.log(error);

    return res.status(500).json({
        success: false,
        message: "Sorry, could not fetch data for this URL. Check your URL and try again.", 
        // message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});