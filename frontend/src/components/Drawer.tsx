import { useLanguage } from "@/app/contexts/LanguageContext";
import clsx from 'clsx';

interface DrawerProps {
  isVisible : boolean;
  onSelect: (view: string) => void;
}

const Drawer: React.FC<DrawerProps> = ({ isVisible, onSelect }) => {
  const { translations } = useLanguage();

  return (
    <div className={clsx(
        "fixed pt-14 top-0 left-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300",
        isVisible ? "translate-x-0" : "-translate-x-full"
        )}>
        <div className="p-4 text-sm text-gray-600">{translations['SignedInAs']} <b>{}</b></div>
        <nav className="flex flex-col gap-2 p-4">
            <button >📈 {translations['MoodStatistics']}</button>
            <button >🚪 {translations['SignOut']}</button>
            <button  className="text-red-600">🗑️ {translations['DeleteAccount']}</button>
        </nav>
    </div>
  );
};

export default Drawer;
