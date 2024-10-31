export const fetcher = async (path: string, options: RequestInit = {}) => {
    const url = process.env.NEXT_PUBLIC_API_URL + path
    const fetchOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    }

    try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};