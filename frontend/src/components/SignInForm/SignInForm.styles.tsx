import tw from 'tailwind-styled-components';

export const SignInFormContainer = tw.form`
    space-y-4
`;

export const SignInFormInput = tw.input`
    w-full
    border
    px-3
    py-2
    rounded
`;

export const SignInFormButton = tw.button`
    w-full
    bg-blue-600
    flex
    justify-center
    items-center
    text-white
    py-2
    rounded
`;

export const SignInFormButtonInProgressContent = tw.div`
    w-5
    h-5
    border-2
    border-white
    border-t-transparent
    rounded-full
    animate-spin
`;

export const ForgotPasswordLink = tw.span`
    block
    text-sm
    text-blue-600
    hover:underline
    hover:cursor-pointer
    mt-4
`;