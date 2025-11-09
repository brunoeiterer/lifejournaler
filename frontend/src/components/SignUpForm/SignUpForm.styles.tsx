import tw from 'tailwind-styled-components';

export const SignUpFormContainer = tw.form`
    space-y-4
`;

export const SignUpFormInput = tw.input`
    w-full
    border
    px-3
    py-2
    rounded
`;

export const SignUpFormSubmitButton = tw.button`
    w-full
    bg-blue-600
    flex
    justify-center
    items-center
    text-white
    py-2
    rounded
`;

export const SignUpFormSubmitButtonInProgressContent = tw.div`
    w-5
    h-5
    border-2
    border-white
    border-t-transparent
    rounded-full
    animate-spin
`;