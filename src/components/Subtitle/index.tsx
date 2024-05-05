import React, { ReactNode } from 'react';
import './Subtitle.css'; // Make sure this file exists and contains the appropriate CSS

interface SubtitleProps {
  children: ReactNode; // Defines the type for children
}

function Subtitle({ children }: SubtitleProps) {
  return <h2 className="subtitle">{children}</h2>;
}

export default Subtitle;
