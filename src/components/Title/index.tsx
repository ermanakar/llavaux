import React, { ReactNode } from 'react';
import './Title.css'; // Make sure this file exists and contains the appropriate CSS

interface TitleProps {
  children: ReactNode; // Defines the type for children
}

function Title({ children }: TitleProps) {
  return <h1 className="title">{children}</h1>;
}

export default Title;
