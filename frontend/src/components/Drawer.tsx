import { useLanguage } from "@/app/contexts/LanguageContext";
import { useAuth } from '@/app/contexts/AuthContext';
import clsx from 'clsx';

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

  return (
    <div
      className={`fixed inset-0 bg-black/50 transform transition-transform duration-300 ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
      onClick={onClose}
    >
      <div className={clsx(
          "fixed pt-14 top-0 left-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300",
          isVisible ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(event) => event.stopPropagation()}>
          <nav className="flex flex-col gap-2 p-4">
              {isSignedIn ? (
              <>
                <div className="text-sm text-gray-600">{translations['SignedInAs']} <b>{username}</b></div>
                <div className="flex items-center gap-2">
                  <span>📈</span>
                  <button onClick={onMonthlyStatisticsClick}>{translations['MonthlyStatistics']}</button>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚪</span>
                  <button onClick={signOut}>{translations['SignOut']}</button>
                </div>
                <div className="flex items-center gap-2">
                  <span>🗑️</span>
                  <button onClick={onDeleteAccountClick} className="text-red-600">{translations['DeleteAccount']}</button>
                </div>
              </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span>🚪</span>
                    <button onClick={onSignInClick}>{translations['SignIn']}</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📝</span>
                    <button onClick={onSignUpClick}>{translations['SignUp']}</button>
                  </div>
                </>
              )}

              <div className="flex items-center gap-2">
                <span>
                  🛡️
                </span>
                <button onClick={onPrivacyPolicyClick}>{translations['PrivacyPolicyTitle']}</button>
              </div>

              <div className="flex items-center gap-2">
                  <label htmlFor="language-select">
                    🌐
                  </label>
                  <select
                    id="language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en-US">en-US</option>
                    <option value="pt-BR">pt-BR</option>
                  </select>
              </div>
          </nav>
      </div>
    </div>
  );
};

export default Drawer;
