import { useLanguage } from '@/app/contexts/LanguageContext';
import { BarChart } from '@mui/x-charts';

interface MoodStatisticsProps {
    moods: number[];
}

export const moods = ['Happy', 'Sad', 'Excited', 'Calm']

const MoodStatistics: React.FC<MoodStatisticsProps> = (moodStatisticsProps: MoodStatisticsProps) => {
    const moodColors: string[] = ['#36a2eb', '#ff6384', '#ffce56', '#4bc0c0'];

    const { translations } = useLanguage();

    return (
        <div>
            <BarChart
                height={500}
                dataset={Array.from(moodStatisticsProps.moods, (mood, index) => ({ index: index, mood: mood }))}
                xAxis={[{
                    colorMap: {
                        type: 'ordinal',
                        colors: moodColors
                    },
                    scaleType: 'band',
                    dataKey: 'index',
                    data: Array.from(moods.map(m => translations[m]))
                }]}
                yAxis={[{ dataKey: 'mood' }]}
                series={[{ dataKey: 'mood' }]}
            >
            </BarChart>
        </div>
    );
};

export default MoodStatistics;
