import express from "express";
import multer from "multer";
import path from "path";
import Employee from "../models/Employee.js";

const router = express.Router();

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    const date = new Date().getTime();
    const filename = file.originalname.replace(/\s+/g, "-");
    const newFilename = `${date}-${filename}`;
    req.body.profileImagePath = newFilename;
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

router.post("/create", upload.single("profileImage"), async (req, res) => {
  try {
    const { creator, name, age, address, position, nic, salary } = req.body;
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    const profileImagePath = profileImage.path;

    const newUser = new Employee({
      creator,
      name,
      age,
      address,
      position,
      nic,
      salary,
      profileImagePath,
    });

    await newUser.save();

    res.status(200).json({ message: "Employee registered successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed!", error: err.message });
  }
});


// PUT route to update an existing employee
router.put("/:listingId", upload.single("profileImage"), async (req, res) => {
    try {
      const { name, age, address, position, nic, salary } = req.body;
      const profileImage = req.file;
  
      // Find the employee by ID
      const employee = await Employee.findById(req.params.listingId);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      // Update employee fields
      employee.name = name || employee.name;
      employee.age = age || employee.age;
      employee.address = address || employee.address;
      employee.position = position || employee.position;
      employee.nic = nic || employee.nic;
      employee.salary = salary || employee.salary;
  
      // Handle profile image update
      if (profileImage) {
        // Delete old image file if necessary
        const oldImagePath = path.join("public", employee.profileImagePath);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
  
        const newProfileImagePath = profileImage.path.replace("public\\", "").replace(/\\/g, "/");
        employee.profileImagePath = newProfileImagePath;
      }
  
      const updatedEmployee = await employee.save();
      res.status(200).json({ message: "Employee updated successfully!", employee: updatedEmployee });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update employee", error: err.message });
    }
  });
  
router.get("/:listingId", async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.listingId); // Use req.params.listingId
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.status(200).json(employee);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch employee", error: err.message });
      console.error(err);
    }
  });


  // DELETE route to remove an employee by ID
// DELETE a hotel listing
router.delete("/:listingId", async (req, res) => {
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(req.params.listingId);
      if (!deletedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.status(200).json({ message: "Employee deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete hotel", error: err.message });
      console.error(err);
    }
  });
  

export default router;
