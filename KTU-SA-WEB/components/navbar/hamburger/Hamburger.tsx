import HamburgerIcon from '@public/icons/action/Hamburger.svg';
import HamburgerClose from '@public/icons/action/CloseHamburger.svg';
import styles from './Hamburger.module.css';
import Image from 'next/image';

type Props = {
  toggleMenu: () => void, 
  isOpen: boolean
}

export default function Hamburger({ toggleMenu, isOpen } : Readonly<Props>) {
  return (
    <div className={styles.Container}>
      <button
        className={styles.Button}
        onClick={toggleMenu}
        type="button"
      >
        {isOpen ? (
          <Image alt="close hamburger" src={HamburgerClose} />
        ) : (
          <Image alt="hamburger icon" src={HamburgerIcon} />
        )}
      </button>
    </div>
  );
}
