import React from 'react';
import './Contact.css'; // Ensure this CSS file is linked properly
import Header from './Header';
import SEO from './SEO';

const Contact: React.FC = () => {
  return (
    <>
      <SEO 
        title="Contact Us - Obelix's AI World"
        description="Get in touch with Obelix's AI World. We are here to answer your questions and provide more information about our projects and exhibitions."
        keywords="contact, Obelix, AI, inquiries, support"
        author="Obelix"
      />
      <Header />
      <div className="contact-page">
        <h1>Contact Us</h1>
        <p>Have any questions or inquiries? We would love to hear from you. Reach out to us, and we will get back to you as soon as possible.</p>
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
