import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import Intro from './components/intro';
import Peoples, { People } from './components/peoples';

export default class About extends PureComponent {
  render() {
    return (
      <div>
        <Helmet title="About" />

        <Intro>
          <h1>Such Ueno.</h1>
          <h2>Very digital. Much agency.</h2>
          <p>Last September, I started my first full-time job as a product designer at Ueno. I had applied online and did a brief trial period where I worked with Ueno for three days.</p>
        </Intro>

        <Peoples title="Our people." subheading="Some text.">
          <People
            image="https://i.pinimg.com/736x/cd/90/d9/cd90d9de63fa2c8e5c5e7117e27b5c18--gritty-portrait-photography-studio-photography.jpg"
            name="Finnur"
            position="Drone racer"
            description="Foos Last September, I started my first full-time job as a product designer at Ueno. I had applied online and did a brief trial period where I worked with Ueno for three days. There, I met my future mentor Carolyn. I guess she thought I was okay, but she probably hired me for my amazing but mostly dumb tweet:"
          />

          <People
            image="https://i.pinimg.com/736x/cd/90/d9/cd90d9de63fa2c8e5c5e7117e27b5c18--gritty-portrait-photography-studio-photography.jpg"
            name="Finnur"
            position="Drone racer"
            description="Foos Last September, I started my first full-time job as a product designer at Ueno. I had applied online and did a brief trial period where I worked with Ueno for three days. There, I met my future mentor Carolyn. I guess she thought I was okay, but she probably hired me for my amazing but mostly dumb tweet:"
          />

          <People
            image="https://i.pinimg.com/736x/cd/90/d9/cd90d9de63fa2c8e5c5e7117e27b5c18--gritty-portrait-photography-studio-photography.jpg"
            name="Finnur"
            position="Drone racer"
            description="Foos Last September, I started my first full-time job as a product designer at Ueno. I had applied online and did a brief trial period where I worked with Ueno for three days. There, I met my future mentor Carolyn. I guess she thought I was okay, but she probably hired me for my amazing but mostly dumb tweet:"
          />

          <People
            image="https://i.pinimg.com/736x/cd/90/d9/cd90d9de63fa2c8e5c5e7117e27b5c18--gritty-portrait-photography-studio-photography.jpg"
            name="Finnur"
            position="Drone racer"
            description="Foos Last September, I started my first full-time job as a product designer at Ueno. I had applied online and did a brief trial period where I worked with Ueno for three days. There, I met my future mentor Carolyn. I guess she thought I was okay, but she probably hired me for my amazing but mostly dumb tweet:"
          />

          <People
            image="https://i.pinimg.com/736x/cd/90/d9/cd90d9de63fa2c8e5c5e7117e27b5c18--gritty-portrait-photography-studio-photography.jpg"
            name="Finnur"
            position="Drone racer"
            description="Foos Last September, I started my first full-time job as a product designer at Ueno. I had applied online and did a brief trial period where I worked with Ueno for three days. There, I met my future mentor Carolyn. I guess she thought I was okay, but she probably hired me for my amazing but mostly dumb tweet:"
          />
        </Peoples>
      </div>
    );
  }
}
