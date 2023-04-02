const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const dotenv = require("dotenv").config();
const mongoClient = mongodb.MongoClient;
const equipment = [];

// db connection
const URL = process.env.DB;

const DB = "contact";

// middleware

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

// get method

app.get("/users", async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db(DB);
    const user = await db.collection("user contact").find().toArray();
    await connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ message: "get error" });
  }
});
// post method

app.post("/createuser", async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db(DB);
    const user = await db.collection("user contact").insertOne(req.body);
    await connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ message: "create getting error" });
  }
});

// put method

app.put("/user/:id", async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db(DB);
    const user = await db
      .collection("user contact")
      .findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params.id) },
        { $set: req.body }
      );
    await connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ message: "can't update" });
  }
});

// delete

app.delete("/user/:id", async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db(DB);
    const user = await db
      .collection("user contact")
      .findOneAndDelete({ _id: new mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ message: "can't delete the user" });
  }
});

// get by id

app.get("/user/:id", async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db(DB);
    const user = await db
      .collection("user contact")
      .findOne({ _id: new mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ message: "can't get by id" });
  }
});

// post method

app.post("/equipment", async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const user = await db.collection("equipment image").insertOne(req.body);
        await connection.close();
        res.json(user);
      } catch (error) {
        console.log(error);
        res.json({ message: "create getting error" });
      }
});

app.get("/getequipment", async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const user = await db.collection("equipment image").find().toArray();
        await connection.close();
        res.json(user);
      } catch (error) {
        console.log(error);
        res.json({ message: "get error" });
      }
});

// console.log(process);

app.get("/home", (req, res) => {
  res.json({ message: "working" });
});

app.listen(process.env.PORT || 3000);
