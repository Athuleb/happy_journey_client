import React from 'react';
import Home from '../scrolldown/Home';
import TopDestinations from './TopDestinations';
import Weather from './Weather';
import ContactUs from './Contact';
import { Element } from 'react-scroll';


function ScrollDown() {
  return (
    <div className="scroll-down">
      <Element name="home">
        <section id="home" style={{ height: 'auto' }}>
          <Home />
        </section>
      </Element>
      <Element name="top-destinations">
        <section id="top-destinations" style={{ height: 'auto' }}>
          <TopDestinations />
        </section>
      </Element>
      <Element name="weather">
        <section id="weather" style={{ height: 'auto' }}>
          <Weather />
        </section>
      </Element>
      <Element name="contact">
        <section id="contact" style={{ height: 'auto' }}>
          <ContactUs />
        </section>
      </Element>
    </div>
  );
}

export default ScrollDown;
