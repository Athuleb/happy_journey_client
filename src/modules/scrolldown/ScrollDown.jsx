import React from 'react';
import Home from '../scrolldown/Home';
import TopDestinations from './TopDestinations';
import Weather from './Weather';
import ContactUs from './Contact';


function ScrollDown() {
  return (
    <div className="scroll-down">
      <section id="home" style={{ height: 'auto'}}>
        <Home />
      </section>
      <section id="top-destinations" style={{ height: 'auto' }}>
        <TopDestinations />
      </section>
      <section id="weather" style={{ height: 'auto' }}>
        <Weather />
      </section>
      <section id="contact" style={{ height: 'auto' }}>
        <ContactUs />
      </section>
    </div>
  );
}

export default ScrollDown;
