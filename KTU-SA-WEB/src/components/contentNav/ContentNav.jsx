import React, { useContext } from 'react';
import { Link } from 'react-scroll';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Tooltip } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import styles from './ContentNav.module.css';
import { ScrollContext } from '../../context/ScrollContext';

export default function ContentNav() {
  const { ids } = useContext(ScrollContext);

  if (ids.length === 0) {
    return null;
  }

  return (
    <div className={styles.Container}>
      <Link
        to="top"
        spy
        smooth
      >
        <IconButton>
          <Tooltip title="Home" placement="left-start" arrow>
            <HomeIcon />
          </Tooltip>
        </IconButton>
      </Link>
      {ids?.map((id) => (
        <Link key={id} to={id} smooth duration={500}>
          <IconButton>
            <Tooltip title={id} placement="left-start" arrow>
              <RadioButtonUncheckedIcon />
            </Tooltip>
          </IconButton>
        </Link>
      ))}
    </div>
  );
}
