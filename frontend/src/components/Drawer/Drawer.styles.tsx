import tw from 'tailwind-styled-components';

export const DrawerBackground = tw.div`
    fixed
    z-50
    inset-0
    bg-black/50
    transform
    transition-transform
    duration-300
`;

export const DrawerContainer = tw.div`
    fixed
    z-49
    pt-14
    top-0
    left-0
    h-full
    w-64
    bg-white
    shadow-md
    transform
    transition-transform
    duration-300
`;

export const DrawerNavigation = tw.nav`
    flex
    flex-col
    gap-2
    p-4
`;

export const SignedInContainer = tw.div`
    text-sm
    text-gray-600
`;

export const LanguageSelector = tw.select`
    border
    border-gray-300
    rounded
    px-3
    py-1
    text-sm
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
`;