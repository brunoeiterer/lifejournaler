import tw from 'tailwind-styled-components';

export const SUDSScaleContainer = tw.div`
    w-full
    max-w-xl
    p-6
    bg-white
    rounded-xl
    shadow-md
    border
    space-y-4
`;

export const SUDSScaleTitle = tw.h2`
    text-xl
    font-semibold
    text-center
`;

export const SUDSScaleContentContainer = tw.div`
    relative
    w-full
    space-y-4
`;

export const SUDSScaleInput = tw.input`
    suds-slider
    w-full
    appearance-none
    h-2
    rounded-lg
    outline-none
`;

export const SUDSScaleLabel = tw.label`
    absolute
    top-1/2
    left-1/2
    transform 
    -translate-x-1/2
    -translate-y-1/2
    text-white
    font-bold
    text-s
    pointer-events-none
`;

export const SUDSScaleLabelsContainer = tw.div`
    flex
    justify-between
    text-xs
    font-medium
    text-gray-600
`;