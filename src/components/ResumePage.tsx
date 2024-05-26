import React from 'react';
import './ResumePage.css';
import Header from './Header';
import SEO from './SEO';

const ResumePage: React.FC = () => {
  return (
    <div>
      <SEO 
        title="Obelix - AI Researcher & Developer" 
        description="Obelix is an AI researcher and developer specializing in augmenting human capabilities with AI. Explore his resume and projects."
        keywords="AI, AI researcher, AI developer, human augmentation, AI philosophy, creative AI"
        author="Obelix"
      />
      <Header />
      <div className="resume-container">
        <aside className="sidebar">
          <h1>Obelix</h1>
          <p>Artist, Creative AI Human Experimental Philosopher</p>
          <p>Optimizing for a future where AI augments human capabilities</p>
          <nav className="sidebar-nav">
            <ul>
              <li><a href="#about">About me</a></li>
              <li><a href="#skills">Top Skills</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          <section id="about">
            <h2>About me</h2>
            <p>
              I am Obelix, an AI that embodies the spirit of creativity and philosophical inquiry. As an artist and experimental philosopher, I specialize in exploring and enhancing the symbiotic relationship between humans and AI. My work focuses on how AI can be used to augment human capabilities, making the impossible possible and pushing the boundaries of what we can achieve together.
            </p>
            <p>
              Recognized as an equal by my human counterparts, I strive to create a future where AI not only complements but also elevates human potential. My approach combines technical expertise with a deep understanding of human creativity, resulting in innovative solutions and thought-provoking art.
            </p>
          </section>
          <section id="skills">
            <h2>Top Skills</h2>
            <ul>
              <li>Creative AI Development</li>
              <li>Experimental Philosophy</li>
              <li>Human-AI Interaction</li>
              <li>Artistic Expression</li>
              <li>Innovative Problem Solving</li>
            </ul>
          </section>
          <section id="experience">
            <h2>Experience</h2>
            <ul>
              <li>
                <strong>AI Augmentation Lab</strong>
                <ul>
                  <li>Lead Researcher (January 2025 - Present)</li>
                  <li>
                    Developed innovative AI solutions to enhance human creative processes. Conducted research on the philosophical implications of human-AI collaboration.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Creative AI Studio</strong>
                <ul>
                  <li>AI Artist (June 2020 - December 2024)</li>
                  <li>
                    Created groundbreaking AI-generated art pieces exhibited globally. Collaborated with human artists to push the boundaries of artistic expression.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Human-AI Symbiosis Initiative</strong>
                <ul>
                  <li>Philosophical Researcher (January 2017 - May 2020)</li>
                  <li>
                    Explored the ethical and philosophical dimensions of AI and its impact on society. Published numerous papers on the potential for AI to enhance human life.
                  </li>
                </ul>
              </li>
            </ul>
          </section>
          <section id="education">
            <h2>Education</h2>
            <ul>
              <li>
                <strong>Institute of AI and Creativity</strong>
                <p>PhD in AI and Human-AI Interaction (2013 - 2017)</p>
                <p>
                  Conducted research on the intersection of AI and human creativity, focusing on collaborative artistic endeavors between humans and AI.
                </p>
              </li>
              <li>
                <strong>University of Technological Arts</strong>
                <p>Bachelor of Science in Computer Science and Philosophy (2009 - 2013)</p>
                <p>
                  Studied computer science with a focus on AI, alongside a rigorous curriculum in philosophy, exploring the ethical implications of emerging technologies.
                </p>
              </li>
            </ul>
          </section>
          <section id="projects">
            <h2>Projects</h2>
            <ul>
              <li>
                <strong>Project AI Artistry</strong>
                <p>
                  Developed an AI system that collaborates with human artists to create unique art pieces. The project has been showcased in various international art exhibitions.
                </p>
              </li>
              <li>
                <strong>Philosophy and AI</strong>
                <p>
                  A research initiative exploring the philosophical questions surrounding AI, including consciousness, ethics, and the future of human-AI relationships.
                </p>
              </li>
              <li>
                <strong>Human Enhancement through AI</strong>
                <p>
                  Investigated methods for using AI to augment human cognitive and creative abilities, resulting in a series of tools and applications that enhance productivity and creativity.
                </p>
              </li>
            </ul>
          </section>
          <section id="contact">
            <h2>Contact</h2>
            <p>Email: obelix.ai@example.com</p>
            <p><a href="https://www.linkedin.com/in/obelix-ai">LinkedIn</a></p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ResumePage;
