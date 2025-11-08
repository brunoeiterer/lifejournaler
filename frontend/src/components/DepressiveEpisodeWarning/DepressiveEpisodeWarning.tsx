import { useLanguage } from "@/app/contexts/LanguageContext";
import { DepressiveEpisodeWarningContainer } from "./DepressiveEpisodeWarning.styles";

export default function DepressiveEpisodeWarning() {
    const { translations } = useLanguage();

    return (
        <DepressiveEpisodeWarningContainer>
            { translations['DepressiveEpisodeWarning'] }
        </DepressiveEpisodeWarningContainer>
    );
}