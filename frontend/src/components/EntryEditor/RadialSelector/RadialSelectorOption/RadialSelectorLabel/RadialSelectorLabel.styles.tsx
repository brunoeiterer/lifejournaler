import tw from 'tailwind-styled-components';

export const RadialSelectorLabel = tw.label`
    text-3xl
    cursor-pointer
    p-3
    rounded-full
    border
    transition
`;

export const RadialSelectorSelectedLabel = tw(RadialSelectorLabel)`
    bg-blue-100
    border-blue-500
`;

export const RadialSelectDeselectedLabel = tw(RadialSelectorLabel)`
    bg-gray-100
    border-transparent
    hover:bg-gray-200
`;