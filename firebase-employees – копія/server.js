require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const employeeRoutes = require("./routes/employeeRoutes");
const serviceAccount = require("./firebase-key.json");

const app = express();
app.use(express.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use("/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
