import React from 'react';
import { useAuthContext } from '../../context/authContext';

function FsaInfo() {
  const { userSaUnit, userSaUnitId } = useAuthContext();
  return (
    <div>{userSaUnit} {userSaUnitId}</div>
  );
}

export default FsaInfo;