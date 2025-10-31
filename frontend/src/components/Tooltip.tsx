import { useState } from 'react';

interface TooltipProps {
  label: string,
  children: React.ReactNode,
  setToolTipActive: (active: boolean) => void
};

export default function Tooltip({ label, children, setToolTipActive}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [fromClick, setFromClick] = useState(false);
  let timeoutId: number;

  const onTouchStart = () => {
    setToolTipActive(true);
    timeoutId = window.setTimeout(() => {
      setVisible(true);
      setFromClick(false);
    }, 500)
  }

  const onTouchEnd = () => {
    window.clearTimeout(timeoutId);
    setToolTipActive(false);
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(visible && !fromClick) {
      e.stopPropagation();
    }

    setVisible((v) => !v);
    if(visible) {
      setFromClick(true);
    }
  };

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={(e) => {onClick(e)}}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
      {visible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-1 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow">
          {label}
        </div>
      )}
    </div>
  );
}