const express = require("express");
// const { connect } = require("./connect");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const mongoose = require("mongoose");
const URL = require("./models/url");
const { time } = require("console");
const app = express();
const PORT = 8001;

mongoose
  .connect("mongodb://localhost:27017/short-url")
  .then(() => console.log("Connected to MongoDB"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/url", urlRoute);

app.use("/", staticRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  console.log("Received shortId:", shortId);

  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  if (!entry) {
    return res.status(404).send({ error: "URL not found" });
  }
  console.log("Redirecting to:", entry.redirectUrl);
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
