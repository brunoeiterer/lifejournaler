import tw from 'tailwind-styled-components';

export const NotesContainter = tw.div`
    w-full
    max-w-xl
    p-6 bg-white
    rounded-xl
    shadow-md
    border
    space-y-4
`;

export const NotesTtile = tw.h2`
    text-xl
    font-semibold
    text-center
`;

export const NotesInput = tw.textarea`
    w-full
    p-3
    border
    rounded-md
    resize-none
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
`;