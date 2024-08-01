/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';

type Props = {
  elementRef: any;
  children: React.ReactNode | Array<React.ReactNode>
}

export default function AbsoluteContainerMargin({ elementRef, children } : Props) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const updateStyle = () => {
      if (elementRef.current) {
        const height = elementRef.current.offsetHeight;
        setStyle({
          marginBottom: `${height + 30}px`
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
    <div style={style}>
      {children}
    </div>
  );
}

