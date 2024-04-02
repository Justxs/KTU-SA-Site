import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function HeroImageMargin({ elementRef, children }) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const updateStyle = () => {
      if (elementRef.current) {
        const height = elementRef.current.offsetHeight;
        setStyle({
          marginBottom: `${height}px`,
        });
      }
    };
    updateStyle();

    window.addEventListener('resize', updateStyle);

    return () => {
      window.removeEventListener('resize', updateStyle);
    };
  }, [elementRef]);

  return (
    <div style={style}>{children}</div>
  );
}

HeroImageMargin.propTypes = {
  elementRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
