import React, { useState } from 'react';
import Popup from '../components/Popup';

const EmployeeList = ({
  listingId,
  creator,
  name,
  age,
  address,
  position,
  nic,
  salary,
  profileImagePath,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const correctedProfileImagePath = profileImagePath?.replace("public\\", "").replace(/\\/g, "/");

  const handleEditClick = () => {
    setCurrentEmployee({
      listingId,
      creator,
      name,
      age,
      address,
      position,
      nic,
      salary,
      profileImagePath: correctedProfileImagePath,
    });
    setIsPopupOpen(true);
  };

  const handleDeleteClick = async () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const response = await fetch(`http://localhost:8000/employee/${listingId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          window.location.reload(); 
        } else {
          alert('Failed to delete the employee.');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('An error occurred while trying to delete the employee.');
      }
    }
  };

  return (
    <tr>
      <td className="p-2 border-b items-center border-gray-200">
        {profileImagePath && (
          <img
            src={`http://localhost:8000/${correctedProfileImagePath}`}
            alt={`employee of ${name}`}
            className="w-20 h-24 filter brightness-85 mx-auto"
          />
        )}
      </td>
      <td className="p-2 text-center text-white border-b border-gray-200">{name}</td>
      <td className="p-2 text-center text-white border-b border-gray-200">{age}</td>
      <td className="p-2 text-center text-white border-b border-gray-200">{address}</td>
      <td className="p-2 text-center text-white border-b border-gray-200">{position}</td>
      <td className="p-2 text-center text-white border-b border-gray-200">{nic}</td>
      <td className="p-2 text-center text-white border-b border-gray-200">
        <span>Rs.</span>{salary}
      </td>
      <td className="p-2 border-b border-gray-200 text-center">
        <div className="flex justify-center space-x-2">
          <button
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </td>
      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} currentEmployee={currentEmployee} />}
    </tr>
  );
};

export default EmployeeList;
