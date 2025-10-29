import HamburgerIcon from '@public/icons/action/Hamburger.svg';
import HamburgerClose from '@public/icons/action/CloseHamburger.svg';
import styles from './Hamburger.module.css';
import Image from 'next/image';
import OptimizedImage from '@components/common/OptimizedImage';

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
          <OptimizedImage alt="close hamburger" src={HamburgerClose} />
        ) : (
          <OptimizedImage alt="hamburger icon" src={HamburgerIcon} />
        )}
      </button>
    </div>
  );
}
