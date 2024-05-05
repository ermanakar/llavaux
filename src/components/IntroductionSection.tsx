// Import React and icon library
import React from 'react';
import './IntroductionSection.css'; // Ensure CSS is linked

// Define TypeScript interfaces for props
interface EventItem {
    title: string;
    description: string;
    date: string;
    icon: JSX.Element; // Specify that icon is a JSX.Element
}

interface IntroductionSectionProps {
    events: EventItem[]; // Use 'events' to match naming convention in HomePage if you prefer
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ events }) => {
  return (
    <section className="introduction-section">
      <h2>AI and Art: A Journey of Iteration</h2>
      <div className="timeline">
        {events.map((event, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-avatar">{event.icon}</div>
            <div className="timeline-content">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <time dateTime={`2024-01-${10 + index}`}>{event.date}</time>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntroductionSection;



// Sample usage in AboutPage or any other component
// <IntroductionSection events={[
//   { title: 'Concept Initiation', description: 'Description here', date: 'January 2024', icon: <FaHatWizard /> },
//   { title: 'Design and Development', description: 'Description here', date: 'February 2024', icon: <FaPaintBrush /> },
//   { title: 'Curation and Iteration', description: 'Description here', date: 'March 2024', icon: <FaSearchDollar /> },
//   { title: 'Exhibition Launch', description: 'Description here', date: 'April 2024', icon: <FaRocket /> }
// ]}/>
