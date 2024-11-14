export const formatDate = (date: Date | string) => {
    const newDate = new Date(date);

    const formatter = new Intl.DateTimeFormat("en-EN", {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });

    return formatter.format(newDate);
}