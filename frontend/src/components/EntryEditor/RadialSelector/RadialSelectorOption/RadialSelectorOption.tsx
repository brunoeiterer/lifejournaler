import { useLanguage } from "@/app/contexts/LanguageContext";
import RadialSelectorLabel from "./RadialSelectorLabel/RadialSelectorLabel";
import { RadialSelectorOptionContainer } from "./RadialSelectorOptions.styles";

interface RadialSelectorOptionProps {
    value: string;
    isSelected: boolean;
    onChange: (value: string) => void; 
    emoji: string;
}

export default function RadialSelectorOption({ value, isSelected, onChange, emoji }: RadialSelectorOptionProps) {
    const { translations } = useLanguage();

    return (
        <RadialSelectorOptionContainer>
            <RadialSelectorLabel 
                isSelected = {isSelected}
            >
                <input
                    type="radio"
                    value={value}
                    checked={isSelected}
                    onChange={() => onChange(value)}
                    className="hidden"
                />
                <span>{emoji}</span>
            </RadialSelectorLabel>
            <span>{translations[value]}</span>
        </RadialSelectorOptionContainer>
    );
}
