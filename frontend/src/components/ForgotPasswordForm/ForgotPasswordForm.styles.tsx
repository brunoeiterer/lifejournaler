import tw from 'tailwind-styled-components';

export const ForgotPasswordFormContainer = tw.form`
    space-y-4
`;

export const ForgotPasswordInput = tw.input`
    w-full
    border
    px-3
    py-2
    rounded
`;

export const ForgotPasswordButton = tw.button`
    w-full
    bg-blue-600
    flex
    justify-center
    items-center
    text-white
    py-2
    rounded
`;

export const ForgotPasswordButtonInProgressContent = tw.div`
    w-5
    h-5
    border-2
    border-white
    border-t-transparent
    rounded-full
    animate-spin
`;