import { PasswordStrengthCriterionContainer } from "./PasswordStrengthCriterion.styles";
import PasswordStrengthCriterionContent from "./PasswordStrengthCriterionContent/PasswordStrengthCriterionContent";

interface PasswordStrengthCriterionProps {
    isMet: boolean;
    label: string;
}

export default function PasswordStrengthCriterion({ isMet, label }: PasswordStrengthCriterionProps) {
    return(
        <PasswordStrengthCriterionContainer>
            <PasswordStrengthCriterionContent
                isMet={isMet}
            />
            <span>{label}</span>
        </PasswordStrengthCriterionContainer>
    )
}