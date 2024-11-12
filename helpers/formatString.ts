export const formatString = (input: string) => {
    return input
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export const cropText = (text: string, max: number) => {
    return text.substring(0, max) + (text.length > max ? '...' : '');
};