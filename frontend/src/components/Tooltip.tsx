import { useState } from 'react';

export default function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={() => setVisible((v) => !v)}
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