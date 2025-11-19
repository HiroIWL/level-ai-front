export const API_URL =
    process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        let message = 'Erro desconhecido';
        try {
            const body = await res.json();
            message = body.message || JSON.stringify(body);
        } catch {
            message = await res.text();
        }
        throw new Error(`Erro ${res.status}: ${message}`);
    }

    return res.json() as Promise<T>;
}
