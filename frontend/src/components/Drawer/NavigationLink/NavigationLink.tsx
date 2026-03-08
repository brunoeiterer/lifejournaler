import { NavigationLinkContainer } from "./NavigationLink.styles";
import Link from 'next/link';

interface NavigationLinkProps {
    icon: string;
    text: string;
    click?: () => void;
    href?: string;
    variation?: string;
}

export default function NavigationLink({ icon, text, click, href, variation}: NavigationLinkProps) {
    const className = variation === 'red' ? 'text-red-600' : '';
    
    return(
        <NavigationLinkContainer>
            <span>{ icon }</span>
            {href ? (
                <Link href={href} className={className} onClick={click}>
                    {text}
                </Link>
            ) : (
                <button
                    onClick={click}
                    className={className}
                >
                    { text }
                </button>
            )}
        </NavigationLinkContainer>
    )
}