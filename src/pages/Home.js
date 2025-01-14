import React from 'react';
import Marquee from 'react-fast-marquee';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero fade-in" style={{ animationDelay: '0.2s' }}>
        <h1>Welcome to PYTHIA</h1>
        <p>Analyze news and financial data to make informed stock decisions.</p>
        <button className="cta-button">Get Started</button>
      </header>

      <section className="features-container fade-in" style={{ animationDelay: '0.4s' }}>
        <Marquee gradient={false} speed={50}>
          <div className="feature">
            <h2>Comprehensive Equity Analysis</h2>
            <p>We leverage big data from annual and quarterly reports to generate in-depth equity analysis reports.</p>
          </div>
          <div className="feature">
            <h2>Real-Time Stock Data</h2>
            <p>Access real-time and historical stock prices at any time to monitor your favorite companies.</p>
          </div>
          <div className="feature">
            <h2>Predictive Insights</h2>
            <p>Our AI model is trained on detailed reports to predict future company performance based on key features.</p>
          </div>
          <div className="feature">
            <h2>AI-Powered News Aggregation</h2>
            <p>Experience a fully automated, AI-powered news aggregator that searches the web and analyzes articles related to various companies.</p>
          </div>
          <div className="feature">
            <h2>Big Data & Machine Learning</h2>
            <p>Harnessing big data and machine learning, we automate insights and empower your investment decisions.</p>
          </div>
          <div className="feature">
            <h2>Custom Alerts & Notifications</h2>
            <p>Set up personalized alerts to stay informed about market changes and company updates.</p>
          </div>
          <div className="feature">
            <h2>Interactive Data Visualization</h2>
            <p>Visualize complex financial data through interactive charts and dashboards for deeper insights.</p>
          </div>
          <div className="feature">
            <h2>Portfolio Optimization Tools</h2>
            <p>Use advanced tools and simulations to optimize your investment portfolio for better risk management and returns.</p>
          </div>
        </Marquee>
      </section>
    </div>
  );
};

export default Home;
