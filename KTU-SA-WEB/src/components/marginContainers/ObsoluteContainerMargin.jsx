/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function AbsoluteContainerMargin({ elementRef, children }) {
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

    const observer = new ResizeObserver(updateStyle);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef]);

  return (
    <div style={style}>{children}</div>
  );
}

AbsoluteContainerMargin.propTypes = {
  elementRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
