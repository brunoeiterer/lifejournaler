import { useLanguage } from "@/app/contexts/LanguageContext";
import { useAuth } from '@/app/contexts/AuthContext';
import clsx from 'clsx';

interface DrawerProps {
  isVisible : boolean;
  onSignInClick: () => void;
  onSignUpClick: () => void;
  onDeleteAccountClick: () => void;
  onMonthlyStatisticsClick: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isVisible, onSignInClick, onSignUpClick, onDeleteAccountClick, onMonthlyStatisticsClick }) => {
  const { translations } = useLanguage();
  const { isSignedIn, username, signOut } = useAuth();

  return (
    <div className={clsx(
        "fixed pt-14 top-0 left-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300",
        isVisible ? "translate-x-0" : "-translate-x-full"
        )}>
        <nav className="flex flex-col gap-2 p-4">
            {isSignedIn ? (
            <>
              <div className="p-4 text-sm text-gray-600">{translations['SignedInAs']} <b>{username}</b></div>
              <button onClick={onMonthlyStatisticsClick}>📈 {translations['MonthlyStatistics']}</button>
              <button onClick={signOut}>🚪 {translations['SignOut']}</button>
              <button onClick={onDeleteAccountClick} className="text-red-600">🗑️ {translations['DeleteAccount']}</button>
            </>
            ) : (
              <>
                <button onClick={onSignInClick}>🚪 {translations['SignIn']}</button>
                <button onClick={onSignUpClick}>📝 {translations['SignUp']}</button>
              </>
            )}
        </nav>
    </div>
  );
};

export default Drawer;
