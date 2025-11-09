import { PasswordStrengthCriterionMetContent, PasswordStrengthCriterionNotMetContent } from "./PasswordStrengthCriterionContent.styles";

interface PasswordStrengthCriterionContentProps {
    isMet: boolean;
}

export default function PasswordStrengthCriterionContent({ isMet }: PasswordStrengthCriterionContentProps) {
    return(
        (
            isMet ?
            <PasswordStrengthCriterionMetContent />
            :
            <PasswordStrengthCriterionNotMetContent />
        )
    )
}