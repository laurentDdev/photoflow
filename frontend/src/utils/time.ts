export const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const intervals = [
        { label: "an", seconds: 31536000 },
        { label: "mois", seconds: 2592000 },
        { label: "jour", seconds: 86400 },
        { label: "heure", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "seconde", seconds: 1 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count > 1) {
            return `il y a ${count} ${interval.label}s`;
        } else if (count === 1) {
            return `il y a 1 ${interval.label}`;
        }
    }

    return "à l'instant";
}