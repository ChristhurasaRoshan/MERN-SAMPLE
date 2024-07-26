import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        age : {
            type: Number,
            required: true,
        },
        address : {
            type: String,
            required: true,
        },
        position : {
            type: String,
            required: true,
        },
        position : {
            type: String,
            required: true,
        },
        nic : {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        profileImagePath: {
            type: String,
            default: "",
          },
    }, {timestamps: true}
);

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;