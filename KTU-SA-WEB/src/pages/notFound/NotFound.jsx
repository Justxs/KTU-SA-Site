import React from 'react';
import GoBackButton from '../../components/goBackButton/GoBackButton';

function NotFound() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <h1>
        404 Not found
      </h1>
      <GoBackButton />
    </div>
  );
}

export default NotFound;
