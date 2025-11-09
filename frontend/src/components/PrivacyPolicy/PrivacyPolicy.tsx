import { useLanguage } from '@/app/contexts/LanguageContext';
import { PrivacyPolicyContainer, PrivacyPolicyContent } from './PrivacyPolicy.styles';
import './PrivacyPolicy.css'

const PrivacyPolicy: React.FC = () => {
    const { translations } = useLanguage();

    return (
        <PrivacyPolicyContainer>
            <PrivacyPolicyContent
                dangerouslySetInnerHTML={{ __html: translations['PrivacyPolicy'] }}
            />
        </PrivacyPolicyContainer>
    );
};

export default PrivacyPolicy;
