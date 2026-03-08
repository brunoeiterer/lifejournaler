import { useLanguage } from "@/app/contexts/LanguageContext";
import { useAuth } from '@/app/contexts/AuthContext';
import { useEffect } from "react";
import { DrawerBackground, DrawerContainer, DrawerNavigation, LanguageSelector, SignedInContainer } from "./Drawer.styles";
import { NavigationLinkContainer } from "./NavigationLink/NavigationLink.styles";
import NavigationLink from "./NavigationLink/NavigationLink";

interface DrawerProps {
  isVisible : boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isVisible, onClose }) => {
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
                <NavigationLink icon='📈' text={translations['MonthlyStatistics']} href='/statistics' click={onClose} />
                <NavigationLink icon='🚪' text={translations['SignOut']} click={() => { signOut(); onClose(); }} />
                <NavigationLink icon='🗑️' text={translations['DeleteAccount']} href='/delete-account' click={onClose} variation='red' />
              </>
              ) : (
                <>
                  <NavigationLink icon='🚪' text={translations['SignIn']} href='/sign-in' click={onClose} />
                  <NavigationLink icon='📝' text={translations['SignUp']} href='/sign-up' click={onClose} />
                </>
              )}

              <NavigationLink icon='🛡️' text={translations['PrivacyPolicyTitle']} href='/privacy' click={onClose} />
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
