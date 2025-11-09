import { useLanguage } from "@/app/contexts/LanguageContext";
import { PasswordStrengthCriteriaList } from "./PasswordStrengthCriteria.styles";
import PasswordStrengthCriterion from "./PasswordStrengthCriterion/PasswordStrengthCriterion";
import { useEffect } from "react";

interface PasswordStrengthCriteriaProps {
    password: string;
    setIsAllCriteriaMet: (isAllCriteriaMet: boolean) => void;
}

const getPasswordCriteria = (password: string) => ({
  length: password.length >= 8,
  lowercase: /[a-z]/.test(password),
  uppercase: /[A-Z]/.test(password),
  digit: /[0-9]/.test(password),
  symbol: /[^A-Za-z0-9]/.test(password),
})

export default function PasswordStrengthCriteria({ password, setIsAllCriteriaMet }: PasswordStrengthCriteriaProps) {
    const { translations } = useLanguage();

    const criteriaLabels = {
        length: translations['PasswordLengthCriteria'],
        lowercase: translations['PasswordLowerCaseCriteria'],
        uppercase: translations['PasswordUpperCaseCriteria'],
        digit: translations['PasswordNumberCriteria'],
        symbol: translations['PasswordSymbolCriteria'],
    };

    const criteria = getPasswordCriteria(password);

    useEffect(() => {
        setIsAllCriteriaMet(Object.entries(criteria).every(met => met));
    }, [password]);

    return(
        <PasswordStrengthCriteriaList>
            {Object.entries(criteriaLabels).map(([key, label]) => (
                <PasswordStrengthCriterion
                    key={key}
                    isMet={criteria[key as keyof typeof criteria]}
                    label={label}
                />
            ))}
        </PasswordStrengthCriteriaList>
    )
}