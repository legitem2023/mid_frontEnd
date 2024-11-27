'use client';

import React, { FC, MouseEvent } from 'react';
import useSearchStore from '../../../../state/useSearchStore';

type PropsInput = {
  name: string;
  value: string;
  event: (e: MouseEvent<HTMLButtonElement>) => void; // Corrected to MouseEvent
  placeholder: string;
};

const Button: FC<PropsInput> = ({ name, value, event, placeholder }) => {
  return (
    <div className="relative w-full gap-2 p-4">
      <button
        type="button"
        name={name} // Add name to input field for better accessibility
        value={value} // Bind value to the input's value
        onClick={event} // Pass the event handler
        className="min-w-[200px] w-auto pl-4 pr-4 py-2 rounded-lg bg-blue-100 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2  focus:ring-blue-200 "
      >
        {placeholder}
      </button>
    </div>
  );
};

export default Button;
