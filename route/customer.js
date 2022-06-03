import express from "express";
import Customer from "../model/Customer.js";
const router = express.Router();

router.get("/search", async (req, res) => {
  console.log("route: /search");
  try {
    let filters = {};
    if (req.query.Sex) {
      filters.Sex = req.query.Sex;
    }

    if (req.query.Age) {
      filters.Age = req.query.Age;
    }

    if (req.query.Pclass) {
      filters.Pclass = req.query.Pclass;
    }
    if (req.query.Survived) {
      filters.Survived = 1;
    }
    if (req.query.Embarked) {
      filters.Embarked = req.query.Embarked;
    }

    const customers = await Customer.find(filters);
    const count = await Customer.countDocuments(filters);

    res.status(200).json({
      count: count,
      customers: customers,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
