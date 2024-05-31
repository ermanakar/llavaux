import React from 'react';
import './NewsUpdates.css';

const NewsUpdates: React.FC = () => {
  const updates = [
    { title: 'New Feature Launch', date: 'April 10, 2024', description: 'We are excited to announce the launch of our new feature that will change the way you experience art online.' },
    { title: 'Upcoming Artist Collaboration', date: 'April 15, 2024', description: 'Stay tuned for an exclusive collaboration with a renowned artist, bringing unique perspectives to our platform.' },
    { title: 'Community Event Update', date: 'May 1, 2024', description: 'Join us for a community event where we explore the impacts of digital art on society.' },
  ];

  return (
    <section className="news-updates">
      <h2>News & Updates</h2>
      <ul>
        {updates.map((update, index) => (
          <li key={index}>
            <article>
              <h3>{update.title}</h3>
              <p>{update.description}</p>
              <time dateTime={`2024-04-${10 + index}`}>{update.date}</time>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NewsUpdates;
