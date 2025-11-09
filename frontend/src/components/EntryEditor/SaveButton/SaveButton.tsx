'use client';

import React from 'react';
import { InProgressContainer, SaveButtonContainer } from './SaveButton.styles';

type SaveButtonProps = {
    onClick: () => void;
    label: string;
    isInProgress: boolean;
};

export default function SaveButton({ onClick, label, isInProgress }: SaveButtonProps) {
    return (
        <SaveButtonContainer
            onClick={onClick}
            disabled={isInProgress}
        >
            {
                isInProgress ?
                <InProgressContainer /> :
                label
            }

        </SaveButtonContainer>
    );
}
