import tw from 'tailwind-styled-components';

const PasswordStrengthCriterionContent = tw.span`
    inline-block
    w-3
    h-3
    rounded-full
`;

export const PasswordStrengthCriterionMetContent = tw(PasswordStrengthCriterionContent)`
    bg-green-500
`;

export const PasswordStrengthCriterionNotMetContent = tw(PasswordStrengthCriterionContent)`
    bg-red-400
`;