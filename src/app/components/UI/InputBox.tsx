'use client';
import React, { FC, ChangeEvent } from 'react';
type PropsInput = {
  name: string;
  value: string;
  event: (e: ChangeEvent<HTMLInputElement>) => void; // Typing the event handler
  placeholder: string;
  type:string;
};

const InputBox: FC<PropsInput> = ({ name, value, event, placeholder,type }) => {
  return (
    <div className="relative w-full gap-2 p-4">
      <input
        type={type}
        name={name} // Add name to input field for better accessibility
        placeholder={placeholder}
        value={value} // Bind value to the input's value
        onChange={event} // Pass the event handler
        autoComplete='new-password'
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
};

export default InputBox;
