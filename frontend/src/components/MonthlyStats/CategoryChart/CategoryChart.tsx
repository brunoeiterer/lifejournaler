import { useLanguage } from '@/app/contexts/LanguageContext';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { Emojis } from '@/components/Emojis';
import { CategoryChartContainer, CategoryChartTitle } from './CategoryChart.styles';

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

    const chartData = Object.entries(data).map(([label, count]) =>
        {
            const obj: {
                [k: string]: string | number
            } = {};

            obj["label"] = label;
            obj[translations["Quantity"]] = count;
            obj["color"] = colors[label.replace(/\s/g, "")];

            return obj;
        }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Tick = (props: any) => {
        const { x, y, payload } = props;
        const textValue = Emojis[payload.value] ?? translations[payload.value];
        const words = textValue.split(' '); // Split the text into words

        return (
            <text x={x} y={y + 10} textAnchor="middle" fontSize={12}>
                {words.map((word, index) => (
                    <tspan key={index} x={x} dy={index === 0 ? 0 : 15}>
                        {word}
                    </tspan>
                ))}
            </text>
        );
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomTooltip = (props: any) => {
        const { active, payload, label } = props;
        const isVisible = active && payload && payload.length;

        return (
            <div
                style={{
                    visibility: isVisible ? 'visible' : 'hidden',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '5px',
                    padding: '10px',
                    color: 'white',
                    fontSize: '14px',
                    minWidth: '100px',
                    textAlign: 'center'
                }}
            >
                {isVisible && (
                    <div>
                        <p className="label">{`${translations[label]} : ${payload[0].value}`}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <CategoryChartContainer>
            <CategoryChartTitle>{title}</CategoryChartTitle>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: -30, bottom: 5 }}>
                    <XAxis dataKey="label" tick={<Tick />} interval={0} />
                    <YAxis allowDecimals={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey={translations["Quantity"]}>
                        {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry["color"] as string}
                                />
                            ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </CategoryChartContainer>
    );
}
