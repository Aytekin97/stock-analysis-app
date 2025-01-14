import React from 'react';
import '../styles/About.css';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import profile from '../assets/Profile.jpeg';

const About = () => {
  return (
    <div className="about-page">
      <header className="gradient-header fade-in" style={{ animationDelay: '0.1s' }}>
        <h1>About Pythia</h1>
        <p>Empowering your investments with AI-driven insights.</p>
      </header>
      
      <section className="introduction fade-in" style={{ animationDelay: '0.3s' }}>
        <h2>Our Mission</h2>
        <p>
          At Pythia, we aim to revolutionize stock analysis by leveraging big data, AI, 
          and comprehensive news aggregation to help investors make informed decisions.
        </p>
      </section>
      
      <section className="company-history fade-in" style={{ animationDelay: '0.5s' }}>
        <h2>Our Story</h2>
        <p>
          Founded in 2024, Pythia was born out of a desire to make complex financial data 
          accessible and actionable for everyone. Over the years, it has grown into a 
          trusted source for equity analysis and predictive insights, driven by a passion 
          for technology and innovation.
        </p>
      </section>
      
      <section className="team fade-in" style={{ animationDelay: '0.7s' }}>
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            {/* Replace the src with your actual image path */}
            <img src={profile} alt="Aytekin Akbulut" />
            <h3>Aytekin Akbulut</h3>
            <p>Founder & Software Developer</p>
            <p>Toronto, Canada</p>
            <p>
              Aytekin specializes in full-stack development, AI, and big data solutions. 
              With experience in various technologies like JavaScript, TypeScript, React, 
              Node.js, Python, and machine learning frameworks, he leads Pythia's vision 
              to create comprehensive financial analysis tools.
            </p>
          </div>
        </div>
      </section>
      
      <section className="technology fade-in" style={{ animationDelay: '0.9s' }}>
        <h2>Our Technology</h2>
        <p>
          Using advanced machine learning and big data analytics, our platform analyzes 
          financial reports, news articles, and stock prices to deliver comprehensive 
          equity research reports and predictive insights.
        </p>
      </section>
      
      <section className="contact fade-in" style={{ animationDelay: '1.1s' }}>
        <h2>Contact & Connect</h2>
        <p><FaEnvelope /> Email: <a href="mailto:aytecha.97@gmail.com">aytecha.97@gmail.com</a></p>
        <p><FaPhone /> Phone: +1(437) 829 4831</p>
        <p>
          <FaGithub /> GitHub: <a href="https://github.com/Aytekin97" target="_blank" rel="noopener noreferrer">Aytekin97</a>
        </p>
        <p>
          <FaLinkedin /> LinkedIn: <a href="https://www.linkedin.com/in/aytekin-akbulut" target="_blank" rel="noopener noreferrer">Aytekin Akbulut</a>
        </p>
      </section>
    </div>
  );
};

export default About;
