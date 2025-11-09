'use client';

import CloseButton from "./CloseButton/CloseButton";
import { ToastContainer } from "./Toast.styles";

interface ToastProps {
    message: string;
    onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
    return (
        <ToastContainer>
            <span>{message}</span>
            <CloseButton
                onClose={onClose}
            />
        </ToastContainer>
    );
}
