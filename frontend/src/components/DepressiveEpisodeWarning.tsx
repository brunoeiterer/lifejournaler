import { useLanguage } from "@/app/contexts/LanguageContext";

export default function DepressiveEpisodeWarning() {
    const { translations } = useLanguage();

    return (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-md text-sm flex items-center gap-2">
            { translations['DepressiveEpisodeWarning'] }
        </div>
    );
}