'use client';

import React from 'react';

type SaveButtonProps = {
    onClick: () => void;
    label: string;
    isInProgress: boolean;
};

export default function SaveButton({ onClick, label, isInProgress }: SaveButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-full max-w-xl flex justify-center items-center bg-blue-600 text-white px-4 py-3 rounded-xl shadow-md hover:bg-blue-700"
            disabled={isInProgress}
        >
            {
                isInProgress ?
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin "/> :
                label
            }

        </button>
    );
}
