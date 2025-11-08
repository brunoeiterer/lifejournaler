import { useLanguage } from "@/app/contexts/LanguageContext";
import { useAuth } from '@/app/contexts/AuthContext';
import { useEffect } from "react";
import { DrawerBackground, DrawerContainer, DrawerNavigation, LanguageSelector, SignedInContainer } from "./Drawer.styles";
import { NavigationLinkContainer } from "./NavigationLink/NavigationLink.styles";
import NavigationLink from "./NavigationLink/NavigationLink";

interface DrawerProps {
  isVisible : boolean;
  onSignInClick: () => void;
  onSignUpClick: () => void;
  onDeleteAccountClick: () => void;
  onMonthlyStatisticsClick: () => void;
  onPrivacyPolicyClick: () => void;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isVisible, onSignInClick, onSignUpClick, onDeleteAccountClick, onMonthlyStatisticsClick, 
  onPrivacyPolicyClick, onClose }) => {
  const { translations } = useLanguage();
  const { isSignedIn, username, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
          if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <DrawerBackground
      className={isVisible ? "translate-x-0" : "-translate-x-full"}
      onClick={onClose}
    >
      <DrawerContainer
        className={isVisible ? "translate-x-0" : "-translate-x-full"}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => event.stopPropagation()}>
          <DrawerNavigation>
              {isSignedIn ? (
              <>
                <SignedInContainer>{translations['SignedInAs']} <b>{username}</b></SignedInContainer>
                <NavigationLink icon='📈' text={translations['MonthlyStatistics']} click={onMonthlyStatisticsClick} />
                <NavigationLink icon='🚪' text={translations['SignOut']} click={signOut} />
                <NavigationLink icon='🗑️' text={translations['DeleteAccount']} click={onDeleteAccountClick} variation='red' />
              </>
              ) : (
                <>
                  <NavigationLink icon='🚪' text={translations['SignIn']} click={onSignInClick} />
                  <NavigationLink icon='📝' text={translations['SignUp']} click={onSignUpClick} />
                </>
              )}

              <NavigationLink icon='🛡️' text={translations['PrivacyPolicyTitle']} click={onPrivacyPolicyClick} />
              <NavigationLinkContainer>
                  <label htmlFor="language-select">
                    🌐
                  </label>
                  <LanguageSelector
                    id="language-select"
                    value={language}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
                  >
                    <option value="en-US">en-US</option>
                    <option value="pt-BR">pt-BR</option>
                  </LanguageSelector>
              </NavigationLinkContainer>
          </DrawerNavigation>
      </DrawerContainer>
    </DrawerBackground>
  );
};

export default Drawer;
