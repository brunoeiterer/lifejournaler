import tw from 'tailwind-styled-components';

export const ModalBackground = tw.div`
    fixed
    inset-0
    z-50
    bg-black/40
    backdrop-blur-sm
    flex
    items-center
    justify-center
`;

export const ModalContainer = tw.div`
    relative
    max-w-2xl
    w-full
    grid
    grid-rows-[min-content_auto]
    grid-cols-[auto_min-content]
`;

export const ModalCloseButtonContainer = tw.div`
    row-start-1
    col-start-2
    flex
    justify-end
`;

export const ModalCloseButton = tw.button`
    bg-white
    rounded-full
    shadow-md
    w-8
    h-8
    text-gray-500
    hover:text-black
`;

export const ModalContentContainer = tw.div`
    bg-white
    rounded-lg
    p-6
    w-full
    max-h-[90vh]
    overflow-y-auto
    col-start-1
    col-span-2
    row-start-2
`;

export const ModalTitle = tw.h2`
    text-xl
    font-semibold
    mb-4
    text-center
`;