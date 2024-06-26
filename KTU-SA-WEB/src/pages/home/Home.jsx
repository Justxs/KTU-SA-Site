import React from 'react';
import HeroImage from './Components/heroImage/HeroImage';
import Articles from './Components/articles/Articles.jsx';
import Sponsors from './Components/sponsors/Sponsors';
import Duk from './Components/duk/Duk.jsx';
import Fsa from '../../components/fsa/Fsa.jsx';
import TextWithLinks from './Components/textWithLinks/TextWithLinks';
import SocialMedia from './Components/socialMedia/SocialMedia';
import DividerLine from './Components/dividerLine/DividerLine.jsx';
import Events from '../../components/events/Events.jsx';

export default function Home() {
  return (
    <>
      <HeroImage />
      <TextWithLinks />
      <DividerLine />
      <Articles />
      <Events />
      <Sponsors />
      <Duk />
      <Fsa />
      <SocialMedia />
    </>
  );
}
