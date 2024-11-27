"use client"
import React, { useEffect, useState } from 'react';
import InputBox from '../components/UI/InputBox';
import { useSearchParams } from 'next/navigation';
import Button from '../components/UI/Button';
import { saveUser } from '../../../scripts/script'
import Header from '../components/Header/Header';
const Page = () => {
  // State to store both the name and email values
  const [inputValues, setInputValues] = useState<{ name: string; email: string,id:number }>({
    id:0,
    name: '',
    email: '',
  });

  const searchParams = useSearchParams();


    // Fetch the data when the component mounts
    const fetchData = async () => {
        const data:any = searchParams.get('data');
        const userData = data ? JSON.parse(decodeURIComponent(data)) : null;
      try {
        setInputValues((prevState) => ({
            ...prevState,
            ["id"]: userData.id,
          }));

        setInputValues((prevState) => ({
            ...prevState,
            ["name"]: userData.name,
          }));

          setInputValues((prevState) => ({
            ...prevState,
            ["email"]: userData.email,
          }));

        // setUsers(data);  // Store the fetched users in state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    
    useEffect(()=>{
        fetchData();
    },[])


  const handler = (e: React.ChangeEvent<HTMLInputElement>, field: 'name' | 'email') => {
    const { value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [field]: value, // Dynamically update the specific field (name or email)
    }));
  };

  const handlerSave = () =>{
    saveUser(inputValues);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
     <Header/>
      <div className='grid w-[60vw] items-center justify-center p-10 m-5 custom-shade'>
      <div className='w-[60vw] flex items-center justify-center'>
        <InputBox
          type='text'
          name="name"
          value={inputValues.name}
          event={(e) => handler(e, 'name')} // Pass the handler with field name
          placeholder="Name"
        />
      </div>
      <div className='w-[60vw]'>
        <InputBox
          type='text'
          name="email"
          value={inputValues.email} // Optionally, use a different state for each input if needed
          event={(e) => handler(e, 'email')} // Pass the handler with field name
          placeholder="Email"
        />
      </div>
      <div className='w-[60vw]'>
        <Button name='submit' value='' event={handlerSave} placeholder='Save'/>
      </div>
      </div>
    </div>
  );
};

export default Page;
