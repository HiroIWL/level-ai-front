'use server';

import { registerUser, logoutUser } from '@/services/auth.service';

export async function registerUserAction(data: FormData) {
    return registerUser({
        nome: data.get('nome') as string,
        email: data.get('email') as string,
        senha: data.get('senha') as string,
        telefone: data.get('telefone') as string,
    });
}
