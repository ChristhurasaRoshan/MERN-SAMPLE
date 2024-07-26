import express from "express"
import User from "../models/User.js"
import Employee from "../models/Employee.js";

const router = express.Router();

router.get("/:userId/my-employees", async (req, res) => {
    try {
      const { userId } = req.params
      const properties = await Employee.find({ creator: userId }).populate("creator")
      res.status(202).json(properties)
    } catch (err) {
      console.log(err)
      res.status(404).json({ message: "Can not find properties!", error: err.message })
    }
  })

export default router;