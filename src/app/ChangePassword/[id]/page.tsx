"use client";

import React, { useState } from 'react';
import InputBox from '../../components/UI/InputBox';
import { useParams } from 'next/navigation';
import Button from '../../components/UI/Button';
import { savePassword } from '../../../../scripts/script';
import Header from '../../components/Header/Header';

const Page = () => {
  const { id }: { id: string } = useParams(); // Access dynamic route parameter 'id'

  // State to store password, confirm password, and id
  const [inputValues, setInputValues] = useState<{ password: string; confirmPassword: string; id: number }>({
    id: parseInt(id), // Convert the dynamic route `id` to a number
    password: '',
    confirmPassword: '',
  });

  // State to manage error messages
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Password strength validation function
  const validatePasswordStrength = (password: string) => {
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegEx.test(password);
  };

  // Handler for input changes
  const handler = (e: React.ChangeEvent<HTMLInputElement>, field: 'password' | 'confirmPassword') => {
    const { value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [field]: value, // Update the appropriate field
    }));

    // Clear errors if user is typing again
    if (passwordError || error) {
      setPasswordError(null);
      setError(null);
    }
  };

  // Handler for saving password
  const handlerSave = () => {
    // Check for empty fields
    if (!inputValues.password || !inputValues.confirmPassword) {
      setError('Both password fields are required.');
      return;
    }

    // Validate password strength
    if (!validatePasswordStrength(inputValues.password)) {
      setPasswordError('Password must be at least 8 characters long, contain a number, and a special character.');
      return;
    }

    // Check if passwords match
    if (inputValues.password !== inputValues.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Clear errors and save password if everything is valid
    setError(null);
    setPasswordError(null);
    savePassword(inputValues); // Save password
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <div className="grid w-[60vw] items-center justify-center p-10 m-5 custom-shade">
        {/* Password Input */}
        <div className="w-[60vw] flex items-center justify-center">
          <InputBox
            type="password"
            name="password"
            value={inputValues.password}
            event={(e) => handler(e, 'password')} // Pass the handler for the password input
            placeholder="Enter New Password"
          />
        </div>

        {/* Password Error */}
        {passwordError && (
          <div className="text-red-500 text-center mt-2">
            {passwordError}
          </div>
        )}

        {/* Confirm Password Input */}
        <div className="w-[60vw] flex items-center justify-center">
          <InputBox
            type="password"
            name="confirmPassword"
            value={inputValues.confirmPassword}
            event={(e) => handler(e, 'confirmPassword')} // Pass the handler for confirm password input
            placeholder="Confirm New Password"
          />
        </div>

        {/* Error Message for mismatch */}
        {error && (
          <div className="text-red-500 text-center mt-2">
            {error}
          </div>
        )}

        {/* Save Button */}
        <div className="w-[60vw] flex items-center justify-center">
          <Button
            name="submit"
            value="Save"
            event={handlerSave} // Pass the handler for saving the password
            placeholder="Save Password"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
