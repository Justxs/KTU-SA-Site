import React from 'react';
import HeroImage from './Components/heroImage/HeroImage';
import Articles from './Components/articles/Articles.jsx';
import Sponsors from './Components/sponsors/Sponsors';
import Duk from './Components/duk/Duk.jsx';
import Fsa from '../../components/fsa/Fsa.jsx';
import SocialMedia from './Components/socialMedia/SocialMedia';
import Events from '../../components/events/Events.jsx';
import Values from './Components/values/Values.jsx';

export default function Home() {
  return (
    <>
      <HeroImage />
      <Values />
      <Articles />
      <Events />
      <Sponsors />
      <Duk />
      <Fsa />
      <SocialMedia />
    </>
  );
}
