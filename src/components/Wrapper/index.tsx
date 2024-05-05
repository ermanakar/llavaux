import React, { ReactNode } from 'react';
import './Wrapper.css'; // Make sure this file exists and contains the appropriate CSS

interface WrapperProps {
  children: ReactNode; // This specifies that children can be any valid React node
}

function Wrapper({ children }: WrapperProps) {
  return <div className="wrapper">{children}</div>;
}

export default Wrapper;
