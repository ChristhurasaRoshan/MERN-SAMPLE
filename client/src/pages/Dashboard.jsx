import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Popup from '../components/Popup';
import { setEmployeesList } from "../reduxStore/authSlice";
import EmployeeList from '../components/employeeList';

export const Dashboard = () => {
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddEmployee = () => {
    if (token) {
      setIsPopupOpen(true);
    } else {
      navigate('/login');
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const user = useSelector((state) => state.auth.user);
  const employeesList = user?.employeesList;
  console.log(user);

  const dispatch = useDispatch();
  const getEmployeesList = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${user._id}/my-employees`, {
        method: "GET"
      });
      const data = await response.json();
      console.log(data);
      dispatch(setEmployeesList(data));
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    }
  };

  useEffect(() => {
    getEmployeesList();
  }, []);

  return (
    <div className='bg-slate-900 fixed top-0 left-0 w-full h-screen'>
      <div className='flex justify-between pt-32 pl-4 pr-4 items-center'>
        <div></div>
        <div className='flex items-center space-x-2 bg-amber-600 pt-4 pb-4 pl-10 pr-10 rounded-full'>
          <input 
            type='text' 
            className='px-4 py-2 w-96 outline-none'
            placeholder='Search...'
          />
          <div className=' bg-white pt-3 pb-3 pl-3 pr-3 rounded-full'>
            <FaSearch className='text-amber-600' />
          </div>
        </div>
        <div>
          <button
            onClick={handleAddEmployee}
            className='bg-white text-amber-600 px-6 py-2 rounded cursor-pointer'
          >
            Add Employee 
          </button>
        </div>
      </div>
      <div className="p-4 mt-14">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b border-gray-200">Profile Image</th>
              <th className="p-2 border-b border-gray-200">Name</th>
              <th className="p-2 border-b border-gray-200">Age</th>
              <th className="p-2 border-b border-gray-200">Address</th>
              <th className="p-2 border-b border-gray-200">Position</th>
              <th className="p-2 border-b border-gray-200">NIC</th>
              <th className="p-2 border-b border-gray-200">Salary</th>
              <th className="p-2 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeesList?.map(
              ({
                _id,
                creator,
                name,
                age,
                address,
                position,
                nic,
                salary,
                profileImagePath,
              }) => (
                <EmployeeList 
                  key={_id}
                  listingId={_id}
                  creator={creator}
                  name={name}
                  age={age}
                  address={address}
                  position={position}
                  nic={nic}
                  salary={salary}
                  profileImagePath={profileImagePath}
                />
              )
            )}
          </tbody>
        </table>
      </div>
      {isPopupOpen && <Popup onClose={closePopup} />}
    </div>
  );
};
