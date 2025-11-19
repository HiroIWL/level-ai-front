'use client';

import { useEffect, useState, useTransition } from 'react';
import {
    Container,
    FormContainer,
    FormInput,
    Typography,
    Button,
    Header,
} from '@/components';

export default function CadastroAluno() {
    const [error, setError] = useState('');
    const [pending, startTransition] = useTransition();

    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/\D/g, '');
        const formatted = value
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
        e.target.value = formatted;
    }

    function handleSubmit(formData: FormData) {
        startTransition(async () => {
            try {
                const telefone = formData.get('telefone') as string;
                if (telefone) {
                    formData.set('telefone', telefone.replace(/\D/g, ''));
                }

                const userData = {
                    nome: formData.get('nome') as string,
                    email: formData.get('email') as string,
                    senha: formData.get('senha') as string,
                    telefone: formData.get('telefone') as string,
                };
                localStorage.setItem('registerData', JSON.stringify(userData));

                window.location.href = '/termos-registro';
            } catch {
                setError('Erro ao processar cadastro.');
            }
        });
    }

    return (
        <Container
            direction="column"
            bg="white"
            padding="md"
            className="min-h-screen"
            fluid
        >
            <Container direction="column" className="pt-12 pb-12">
                <Header />
            </Container>

            <Container
                className="w-full max-w-md"
                direction="column"
                align="center"
            >
                <FormContainer action={handleSubmit} className="gap-4">
                    <FormInput
                        name="nome"
                        label="Nome"
                        placeholder="Digite seu nome completo"
                    />

                    <FormInput
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Digite seu email"
                    />

                    <FormInput
                        name="telefone"
                        label="Telefone"
                        placeholder="(XX) XXXXX-XXXX"
                        onInput={handlePhoneChange}
                    />

                    <FormInput
                        name="senha"
                        label="Senha"
                        type="password"
                        placeholder="Digite uma senha (6-12 caracteres)"
                    />

                    {error && (
                        <Typography
                            variant="caption"
                            color="primary"
                            className="text-red-500"
                        >
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        textColor="white"
                        className="mt-4"
                        disabled={pending}
                    >
                        {pending ? 'Salvando...' : 'Cadastrar'}
                    </Button>
                </FormContainer>
            </Container>
        </Container>
    );
}
