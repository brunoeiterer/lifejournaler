import { useLanguage } from "@/app/contexts/LanguageContext";

interface DrawerProps {
  onSelect: (view: string) => void;
}

const Drawer: React.FC<DrawerProps> = ({ onSelect }) => {
  const { translations } = useLanguage();

  return (
    <div style={{ borderRight: '1px solid #ddd', padding: '20px', height: '100vh', width: '200px' }}>
      <button onClick={() => onSelect('journal')} style={{ display: 'block', marginBottom: '20px' }}>
        {translations['JournalEntries']}
      </button>
      <button onClick={() => onSelect('statistics')} style={{ display: 'block' }}>
        {translations['MoodStatistics']}
      </button>
    </div>
  );
};

export default Drawer;
