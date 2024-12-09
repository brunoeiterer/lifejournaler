import { useLanguage } from '@/app/contexts/LanguageContext';
import './PrivacyPolicy.css'

const PrivacyPolicy: React.FC = () => {

    const { translations } = useLanguage();

    return (
    <div className="privacy-policy-container">
        <div
            className="privacy-policy-content"
            dangerouslySetInnerHTML={{ __html: translations['PrivacyPolicy'] }}
        />
    </div>
    );
};

export default PrivacyPolicy;
