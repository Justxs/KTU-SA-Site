import React from 'react';
import { useParams } from 'react-router-dom';
import HeroImage from './components/heroImage/HeroImage';
import Contacts from './components/contacts/Contacts';
import styles from './KtuFSA.module.css';
import Smiley from '../../components/iconElements/Smiley';
import Events from '../../components/events/Events';

export default function KtuFSA() {
  const { fsaName } = useParams();

  return (
    <>
      <HeroImage fsaName={fsaName} />
      <div className={styles.Container}>
        <Events saUnit={fsaName} />
        <Contacts fsaName={fsaName} />
        <Smiley />
      </div>
    </>
  );
}
