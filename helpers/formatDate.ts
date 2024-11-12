export const formatDate = (date: Date | string) => {
    const newDate = new Date(date);

    const formatter = new Intl.DateTimeFormat("ru-RU", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return formatter.format(newDate);
}