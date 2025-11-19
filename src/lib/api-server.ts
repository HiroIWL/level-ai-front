'use server';

import { cookies } from 'next/headers';
import { apiFetch, API_URL } from './api';

export async function authorizedFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    return apiFetch<T>(path, {
        ...options,
        headers: {
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
}
