import React, { ReactNode } from 'react';
import './Button.css'; // Ensure the CSS file is correctly linked

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;  // Function that performs an action, no need to pass URL here
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="custom-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
