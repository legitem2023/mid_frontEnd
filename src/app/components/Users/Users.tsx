'use client';

import React, { FC, useEffect, useState } from 'react';
import useSearchStore from '../../../../state/useSearchStore';
import ControlsContainer from '../UI/ControlsContainer';
import Images from '../UI/Image';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import { createUser, deleteUser } from '../../../../scripts/script';
import InputBox from '../UI/InputBox';
import Button from '../UI/Button';
import UserAddForm from './UserAddForm';
import UserTable from './UserTable';
import Loading from '../UI/Loading';

const Users: FC = () => {
  const { searchTerm } = useSearchStore();
  const [users, setUsers] = useState<any[]>([]); // State to store users data
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // State to store filtered users data
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch data from the server
  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const endpoint = process.env.NEXT_PUBLIC_SERVER_LINK;
      const response = await fetch(`${endpoint}users`);
      const data = await response.json();
      setUsers(data); // Store the fetched users in state
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    // Fetch data when component mounts
    fetchData();
  }, []); // Empty dependency array means this will run once when the component mounts

  useEffect(() => {
    // Filter users based on the search term
    const searchData = users.filter((item: any) =>
      item?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(searchData); // Update the filtered users state
  }, [searchTerm, users]); // Re-run this effect when searchTerm or users change

  const handlerDelete = (e: any) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      deleteUser(e,handleDataRefetch);
      console.log(e);
    }
  };

  // Function to trigger data refetch
  const handleDataRefetch = () => {
    fetchData();
  };

  return (
<div className="flex flex-col m-5 md:grid md:grid-cols-3 gap-1 custom-shade">
    <ControlsContainer />
      <UserAddForm onUserAdded={handleDataRefetch} /> {/* Pass refetch function as a prop */}
      {loading ? (<Loading/>
      ) : (
        <UserTable filteredUsers={filteredUsers} handlerDelete={handlerDelete} onUserAdded={handleDataRefetch}/>
      )}
    </div>
  );
};

export default Users;
