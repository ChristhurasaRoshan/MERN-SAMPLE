import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const Popup = ({ onClose, currentEmployee }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    position: "",
    nic: "",
    salary: "",
    profileImage: null,
  });

  useEffect(() => {
    if (currentEmployee) {
      setFormData({
        name: currentEmployee.name,
        age: currentEmployee.age,
        address: currentEmployee.address,
        position: currentEmployee.position,
        nic: currentEmployee.nic,
        salary: currentEmployee.salary,
        profileImage: currentEmployee.profileImagePath ? `http://localhost:8000/${currentEmployee.profileImagePath}` : null,
      });
    }
  }, [currentEmployee]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const creatorId = useSelector((state) => state.auth.user?._id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const employee_form = new FormData();
      employee_form.append("creator", creatorId);
      for (var key in formData) {
        employee_form.append(key, formData[key]);
      }

      for (var pair of employee_form.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await fetch(currentEmployee ? `http://localhost:8000/employee/${currentEmployee.listingId}` : "http://localhost:8000/employee/create", {
        method: currentEmployee ? "PUT" : "POST",
        body: employee_form,
      });

      if (response.ok) {
        onClose();
        window.location.reload();
      }
    } catch (err) {
      alert("Operation failed", err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-8 rounded-md shadow-md relative w-8/12">
        <button
          className="absolute top-2 right-6 font-semibold text-2xl text-amber-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4 font-semibold">{currentEmployee ? "Edit Employee" : "Add Employee"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4 items-center">
            <input
              id="image"
              type="file"
              name="profileImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
            />

            {!formData.profileImage && (
              <label htmlFor="image" className="mr-4">
                <img src="/assets/addImage.png" alt="add profile photo" className="w-28" />
                <p>Upload Employee Photo</p>
              </label>
            )}

            {formData.profileImage && (
              <img
                src={typeof formData.profileImage === 'string' ? formData.profileImage : URL.createObjectURL(formData.profileImage)}
                alt="profile photo"
                className="w-28 mr-4"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Age</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Position</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">NIC Number</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter NIC number"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Monthly Salary</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter monthly salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-amber-600 text-white px-4 py-2 rounded-md"
          >
            {currentEmployee ? "Update Employee" : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
