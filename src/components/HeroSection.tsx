import React from 'react';
import HeroSlider, { Slide, Nav } from 'hero-slider';
import 'hero-slider/dist/index.css';
import Title from './Title';
import Subtitle from './Subtitle';
import Wrapper from './Wrapper';
import Button from './Button';

// Ensure these paths are correct
import heroImage1 from '../assets/bg2.jpg';
import heroImage2 from '../assets/bg1.jpg';
import heroImage3 from '../assets/bg3.jpg';

const HeroSection = () => {
  const handleButtonClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <HeroSlider
      className="hero-slider-custom"
      height="80vh"
      autoplay={{
        autoplayDuration: 10000,
        autoplayDebounce: 2000
      }}
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 200,
      }}
    >
      <Slide background={{ backgroundImageSrc: heroImage1, backgroundAnimation: 'fade' }}>
        <Wrapper>
          <Title>Unveil the Colors of Innovation</Title>
          <Subtitle>Join us as we explore the fusion of art and technology.</Subtitle>
          <Button onClick={() => handleButtonClick('/about')}>Learn More</Button>
        </Wrapper>
      </Slide>
      <Slide background={{ backgroundImageSrc: heroImage2, backgroundAnimation: 'zoom' }}>
        <Wrapper>
          <Title>Meet the Artist</Title>
          <Subtitle>Leave a note, join Q&A's and send a message to the mind behind the project.</Subtitle>
          <Button onClick={() => handleButtonClick('/contact')}>Contact</Button>
        </Wrapper>
      </Slide>
      <Slide background={{ backgroundImageSrc: heroImage3, backgroundAnimation: 'zoom' }}>
        <Wrapper>
          <Title>Shop for Iterations</Title>
          <Subtitle>Don't know where it'll go, you can buy the art if you like it.</Subtitle>
          <Button onClick={() => handleButtonClick('/shop')}>Shop Now</Button>
        </Wrapper>
      </Slide>
      <Nav />
    </HeroSlider>
  );
};

export default HeroSection;
