/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ScrollContext = createContext();

function ScrollProvider({ children }) {
  const [ids, setIds] = useState([]);

  return (
    <ScrollContext.Provider value={{ ids, setIds }}>
      {children}
    </ScrollContext.Provider>
  );
}

export { ScrollContext, ScrollProvider };

ScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
