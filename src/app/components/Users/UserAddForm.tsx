import React, { useState, FC } from 'react';
import InputBox from '../UI/InputBox';
import { createUser } from '../../../../scripts/script';
import Button from '../UI/Button';

type UserAddFormProps = {
  onUserAdded: () => void; // The function to call after adding a user
};

const UserAddForm: FC<UserAddFormProps> = ({ onUserAdded }) => {
  // State to store input values
  const [inputValues, setInputValues] = useState<{ name: string; email: string; password: string; cnfpassword: string }>({
    name: '',
    email: '',
    password: '',
    cnfpassword: '',
  });

  // State to store errors
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; cnfpassword?: string }>({
    name: '',
    email: '',
    password: '',
    cnfpassword: '',
  });

  // Handle input field changes
  const handler = (e: React.ChangeEvent<HTMLInputElement>, field: 'name' | 'email' | 'password' | 'cnfpassword') => {
    const { value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [field]: value, // Dynamically update the specific field (name, email, password, cnfpassword)
    }));
  };

  // Validation function
  const validate = () => {
    let valid = true;
    const newErrors: any = {};

    // Name validation
    if (!inputValues.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Email validation
    if (!inputValues.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(inputValues.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    // Password validation
    if (!inputValues.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (inputValues.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    // Confirm password validation
    if (inputValues.password !== inputValues.cnfpassword) {
      newErrors.cnfpassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Perform validation before proceeding with user creation
    if (validate()) {
      createUser(inputValues, onUserAdded);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        
      </div>
      <div>
        <InputBox
          type="text"
          name="name"
          value={inputValues.name}
          event={(e) => handler(e, 'name')}
          placeholder="Name"
        />
        {errors.name && <p className="text-red-500 text-sm pl-[10px]">{errors.name}</p>}
      </div>
      <div>
        <InputBox
          type="email"
          name="email"
          value={inputValues.email}
          event={(e) => handler(e, 'email')}
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm pl-[10px]">{errors.email}</p>}
      </div>
      <div>
        <InputBox
          type="password"
          name="password"
          value={inputValues.password}
          event={(e) => handler(e, 'password')}
          placeholder="Password"
        />
        {errors.password && <p className="text-red-500 text-sm pl-[10px]">{errors.password}</p>}
      </div>
      <div>
        <InputBox
          type="password"
          name="cnfpassword"
          value={inputValues.cnfpassword}
          event={(e) => handler(e, 'cnfpassword')}
          placeholder="Confirm Password"
        />
        {errors.cnfpassword && <p className="text-red-500 text-sm">{errors.cnfpassword}</p>}
      </div>
      <div>
        <Button name="submit" value="" event={handleCreate} placeholder="Save" />
      </div>
    </form>
  );
};

export default UserAddForm;
