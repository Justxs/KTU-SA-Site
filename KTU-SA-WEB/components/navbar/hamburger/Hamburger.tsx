import HamburgerIcon from '@public/icons/action/Hamburger.svg';
import HamburgerClose from '@public/icons/action/CloseHamburger.svg';
import Image from 'next/image';
import { Box } from '@mui/material';
import { focusOutline } from '@theme/styles';

type Props = {
  toggleMenu: () => void;
  isOpen: boolean;
};

export default function Hamburger({ toggleMenu, isOpen }: Readonly<Props>) {
  return (
    <Box
      sx={{
        display: 'none',
        justifyContent: 'flex-end',
        alignItems: 'center',
        '@media (max-width: 1300px)': {
          display: 'flex',
        },
      }}
    >
      <Box
        component="button"
        onClick={toggleMenu}
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        sx={{
          p: '5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          ...focusOutline,
        }}
      >
        {isOpen ? (
          <Image alt="" src={HamburgerClose} aria-hidden="true" />
        ) : (
          <Image alt="" src={HamburgerIcon} aria-hidden="true" />
        )}
      </Box>
    </Box>
  );
}
