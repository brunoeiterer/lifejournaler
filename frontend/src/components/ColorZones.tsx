export const ColorZones = [
    { labelKey: 'LightIntensity', color: 'green', range: [0, 3] },
    { labelKey: 'ModerateIntensity', color: 'yellow', range: [4, 7] },
    { labelKey: 'HighIntensity', color: 'red', range: [8, 10] }
];

export const ColorClasses: Record<string, string> = {
    green: 'text-green-600 bg-green-600',
    yellow: 'text-yellow-600 bg-yellow-600',
    red: 'text-red-600 bg-red-600',
};