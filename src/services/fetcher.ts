export const fetcher = async <T = unknown>(path: string, options: RequestInit = {}): Promise<T> => {
    const url = process.env.NEXT_PUBLIC_API_URL + path
    const fetchOptions = {
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
        },
        ...options,
    }

    try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json() as T;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};