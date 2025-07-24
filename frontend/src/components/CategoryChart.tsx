import { useLanguage } from '@/app/contexts/LanguageContext';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from 'recharts';

type Props = {
    data: Record<string, number>;
    title: string;
};

const colors: Record<string, string> = {
    LightIntensity: '#0891b2',
    ModerateIntensity: '#16a34a',
    HighIntensity: '#dc2626',
    Happy: '#facc15',
    Sad: '#60a5fa',
    Excited: '#c084fc',
    Calm: '#34d399',
    Angry: '#ef4444',
    Apathetic: '#a9a9a9',
    Anxious: '#ff6f61',
    Tired: '#8a7f8d',
    Yes: '#16a34a',
    PMS: '#800080',
    No: '#dc2626',
    ExtremelyCold: '#1d4ed8',
    Cold: '#60a5fa',
    Pleasant: '#4ade80',
    Hot: '#fb923c',
    ExtremelyHot: '#dc2626',
    Cloudy: '#b0bec5',
    Rainy: '#4a708b',
    VeryBad: '#ef4444',
    Bad: '#fb923c',
    Average: '#add8e6',
    Good: '#38bdf8',
    VeryGood: '#10b981',
    Low: '#c0c0c0',
    Normal: '#90ee90',
    Large: '#ffd700'
}

export default function CategoryChart({ data, title }: Props) {
    const { translations } = useLanguage();

    const chartData = Object.entries(data).map(([label, count]) => ({
        "label": translations[label],
        "count": count,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Tick = (props: any) => {
        const { x, y, payload } = props;
        return (
            <text x={x} y={y + 10} textAnchor="middle" fontSize={12}>
                {payload.value}
            </text>
        );
    };

    return (
        <div className="flex flex-col w-full h-64 mb-8 justify-center align-center">
            <h3 className="text-center font-medium mb-2">{title}</h3>
            <ResponsiveContainer>
                <BarChart data={chartData} width={400} height={200} margin={{ top: 20, right: 30, left: -40, bottom: 5 }}>
                    <XAxis dataKey="label" tick={<Tick />} interval={0} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count">
                        {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[entry.label.replace(/\s/g, "")]}
                                />
                            ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
