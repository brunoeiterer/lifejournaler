import { useState } from 'react';
import { TooltipContainer, TooltipContentContainer } from './Tooltip.styles';

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
    <TooltipContainer
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {onClick(e)}}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
      {visible && (
        <TooltipContentContainer>
          {label}
        </TooltipContentContainer>
      )}
    </TooltipContainer>
  );
}