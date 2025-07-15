import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

const images = [
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1587614203976-365c74645e83?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1350&q=80",

  
];


const Home = () => {
  return (
    <div className="hero-banner">
      <div className="scroller-container">
        <div className="scroller-track">
          {[...images, ...images].map((img, idx) => (
            <img src={img} alt={`scroll-img-${idx}`} key={idx} className="scroller-image" />
          ))}
        </div>
      </div>

      <div className="hero-content">
  <h1 className="hero-title">Recrutely</h1>
  <p className="hero-tagline">Smarter Hiring Starts Here</p>
  <p className="hero-subtext">
    Recrutely uses AI-driven insights to help companies find the right candidates faster, streamline interviews, and improve hiring outcomes — all in one place.
  </p>
  <div className="hero-buttons">
    <Link to='/register'> <button className="cta-primary">Get Started</button></Link>

    <Link to="https://www.youtube.com/"> <button className="cta-secondary">Watch Demo</button></Link>
  </div>
</div>

    </div>
  );
};

export default Home;
