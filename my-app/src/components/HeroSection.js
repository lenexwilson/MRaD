import React from 'react';
import '../App.css';
import './HeroSection.css';
import { Button } from './Button';

function HeroSection() {
  const scrollToSection = () => {
    const section = document.getElementById("about");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='hero-container'>
      <video
        src="/videos/video-1.mp4"
        autoPlay
        loop
        muted
        className="hero-video"
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Innovations Begin Here</h1>
        <p>What are you waiting for?</p>
        <div className="hero-btns">
          <Button
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            onClick={scrollToSection}
          >
            Learn More <i className="fas fa-lightbulb" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
