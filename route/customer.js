import express from "express";
import Customer from "../model/Customer.js";
const router = express.Router();

router.get("/search", async (req, res) => {
  //   res.send("");
  console.log("route: /search");
  try {
    let filters = {};
    if (req.query.Sex) {
      console.log("sex exist");
      filters.Sex = req.query.Sex;
    }

    if (req.query.Age) {
      console.log("age exist");
      filters.Age = req.query.Age;
    }

    if (req.query.Pclass) {
      console.log("class exist");
      filters.Pclass = req.query.Pclass;
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
