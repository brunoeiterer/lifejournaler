import { NavigationLinkContainer } from "./NavigationLink.styles";

interface NavigationLinkProps {
    icon: string;
    text: string;
    click: () => void;
    variation?: string;
}

export default function NavigationLink({ icon, text, click, variation}: NavigationLinkProps) {
    return(
        <NavigationLinkContainer>
            <span>{ icon }</span>
            <button
                onClick={click}
                className={variation === 'red' ? 'text-red-600' : ''}
            >
                { text }
            </button>
        </NavigationLinkContainer>
    )
}