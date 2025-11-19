'use client';

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { useAuthenticated } from './AuthenticatedContext';
import { logoutUser } from '@/services/auth.service';

interface Turma {
    id: string;
    nome: string;
}

interface User {
    sub: string;
    nome: string;
    registro_academico: string;
    role: 'ALUNO' | 'PROFESSOR';
    turma: Turma;
}

interface UserContextProps {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const { isAuthenticated, setIsAuthenticated } = useAuthenticated();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    async function fetchUser() {
        try {
            const res = await fetch('/api/me', { credentials: 'include' });
            if (!res.ok) throw new Error('unauthorized');
            const data = await res.json();
            setUser(data.user);
            setIsAuthenticated(true);
        } catch {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [isAuthenticated]);

    function logout() {
        logoutUser().then(() => {
            router.push('/');
            setUser(null);
            setIsAuthenticated(false);
        });
    }

    return (
        <UserContext.Provider
            value={{ user, loading, refreshUser: fetchUser, logout }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUser deve estar dentro de UserProvider');
    return ctx;
}
