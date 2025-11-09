import tw from 'tailwind-styled-components';

export const DeleteAccountContainer = tw.div`
    text-center
`;

export const DeleteAccountConfirmationContainer = tw.div`
    text-gray-700
    mb-4
`;

export const DeleteAccountConfirmation = tw.strong`
    text-red-600
`;

export const DeleteAccountButton = tw.button`
    bg-red-600
    text-white
    px-4
    py-2
    rounded
    hover:bg-red-700
    transition
`;