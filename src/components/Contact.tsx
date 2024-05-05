import React from 'react';
import './Contact.css'; // Ensure this CSS file is linked properly
import Header from './Header';

const Contact: React.FC = () => {
  return (
    <>
    <Header />
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>If you have any questions, please feel free to reach out to us.</p>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Your name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Your email" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" placeholder="Your message" required></textarea>

        <button type="submit">Send</button>
      </form>
    </div>
    </>
  );
};

export default Contact;
