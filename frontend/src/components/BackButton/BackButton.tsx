'use client';

import { useRouter } from 'next/navigation';
import { BackButtonContainer } from "./BackButton.styles";

interface BackButtonProps {
    href?: string;
}

export default function BackButton({ href = '/' }: BackButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(href);
    };

    return(
        <BackButtonContainer onClick={handleClick}>
            <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        </BackButtonContainer>
    )
}
