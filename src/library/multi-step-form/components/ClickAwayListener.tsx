import React, { useEffect, useRef, ReactNode, MouseEvent } from 'react';

interface ClickAwayListenerProps {
  onClickAway: (event: MouseEvent) => void;
  children: ReactNode;
}

const ClickAwayListener: React.FC<ClickAwayListenerProps> = ({ onClickAway, children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      onClickAway(event);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', (e) => handleClickOutside(e));
    return () => {
      document.removeEventListener('mousedown', (e) => handleClickOutside(e));
    };
  }, [onClickAway]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickAwayListener;
