'use server';

import { loginUser, logoutUser } from '@/services/auth.service';

export async function loginUserAction(data: FormData) {
    const body = {
        email: data.get('email') as string,
        senha: data.get('senha') as string,
    };

    return loginUser(body);
}

export async function logOut() {
    return logoutUser();
}
