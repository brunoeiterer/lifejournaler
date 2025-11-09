'use client';
import { ReactNode, useEffect } from 'react';
import Toast from '../Common/Toast/Toast';
import React from 'react';
import { useModalError } from '@/app/contexts/ModalErrorContext';
import { ModalBackground, ModalCloseButton, ModalCloseButtonContainer, ModalContainer, ModalContentContainer, ModalTitle } from './Modal.styles';

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
    title?: string
}

export default function Modal({ onClose, children, title }: ModalProps) {
    const { errorMessage, setErrorMessage } = useModalError();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
    <ModalBackground
        onClick={onClose}
    >
        {
            errorMessage !== '' &&
            <Toast
                message={errorMessage}
                onClose={() => setErrorMessage('')}
            />
        }

        <ModalContainer
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}>
            <ModalCloseButtonContainer>
                <ModalCloseButton
                    onClick={onClose}
                >
                    ✕
                </ModalCloseButton>
            </ModalCloseButtonContainer>
            <ModalContentContainer>
                <ModalTitle>{ title }</ModalTitle>
                { children }
            </ModalContentContainer>
        </ModalContainer>
    </ModalBackground>
    );
}