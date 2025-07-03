'use client';

import React from 'react';

type SaveButtonProps = {
    onClick: () => void;
    label?: string;
};

export default function SaveButton({ onClick, label }: SaveButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-full max-w-xl bg-blue-600 text-white px-4 py-3 rounded-xl shadow-md hover:bg-blue-700"
        >
            {label}
        </button>
    );
}
