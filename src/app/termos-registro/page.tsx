'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    Typography,
    Header,
    Button,
    ButtonLink,
} from '@/components';
import { registerUserAction } from '../register/actions';
import Image from 'next/image';
export default function TermosRegistro() {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const [userData, setUserData] = useState<{
        nome: string;
        email: string;
        senha: string;
        telefone: string;
    } | null>(null);

    useEffect(() => {
        const data = localStorage.getItem('registerData');
        if (!data) {
            router.push('/register');
            return;
        }
        setUserData(JSON.parse(data));
    }, [router]);

    function handleAceitar() {
        if (!userData) return;

        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append('nome', userData.nome);
                formData.append('email', userData.email);
                formData.append('senha', userData.senha);
                formData.append('telefone', userData.telefone);

                await registerUserAction(formData);

                alert('usuário criado com suceso.');
                localStorage.removeItem('registerData');

                router.push('/login');
            } catch (error) {
                console.error('Erro ao cadastrar:', error);
            }
        });
    }

    function handleRecusar() {
        localStorage.removeItem('registerData');
        router.push('/register');
    }

    if (!userData) {
        return null;
    }

    return (
        <Container direction="column" bg="white" className="min-h-screen" fluid>
            <Container direction="column" className="pt-12 pb-12">
                <Header isAuthenticated={false} />
            </Container>

            <Container
                className="w-full max-w-2xl mx-auto px-6 pb-12"
                direction="column"
                align="center"
            >
                <Container direction="row" align="center" justify="center">
                    <Typography
                        variant="subtitle"
                        weight="bold"
                        color="black"
                        className="mb-8 text-center"
                    >
                        Bem-vindo(a) ao
                    </Typography>

                    <Typography
                        variant="headline"
                        weight="bold"
                        color="primary"
                        className="mb-4 text-center ml-4"
                    >
                        Level AI!
                    </Typography>
                </Container>

                <Container
                    direction="column"
                    gap={4}
                    shadow={false}
                    justify="center"
                    align="center"
                    className="max-w-[600px] bg-gray-50 rounded-lg p-8"
                >
                    <Typography
                        variant="subtitle"
                        weight="bold"
                        color="black"
                        className="mb-4"
                    >
                        Concorde com nossas dicas
                    </Typography>

                    <Container
                        direction="column"
                        shadow={false}
                        gap={6}
                        className="space-y-4"
                    >
                        <Container direction="row" gap={4} align="start">
                            <CheckIcon />
                            <Typography
                                variant="text"
                                color="black"
                                className="leading-relaxed"
                            >
                                Explore artigos e conteúdos atualizados sobre
                                Inteligência Artificial, carreira e mercado de
                                trabalho.
                            </Typography>
                        </Container>

                        <Container direction="row" gap={4} align="start">
                            <CheckIcon />
                            <Typography
                                variant="text"
                                color="black"
                                className="leading-relaxed"
                            >
                                Salve os materiais mais relevantes para criar
                                sua própria trilha de aprendizado.
                            </Typography>
                        </Container>

                        <Container direction="row" gap={4} align="start">
                            <CheckIcon />
                            <Typography
                                variant="text"
                                color="black"
                                className="leading-relaxed"
                            >
                                Informe seus interesses profissionais (ex.:
                                análise de dados, design, automação,
                                atendimento, programação) para receber sugestões
                                personalizadas.
                            </Typography>
                        </Container>
                    </Container>
                </Container>

                <Container direction="column" gap={3} className="w-full mt-8" justify='center' align='center'>
                    <Button
                        variant="primary"
                        textColor="white"
                        onClick={handleAceitar}
                        disabled={pending}
                        className="w-full max-w-[600px]"
                    >
                        {pending ? 'Processando...' : 'Eu concordo'}
                    </Button>

                    <Button
                        variant="white"
                        textColor="black"
                        onClick={handleRecusar}
                        disabled={pending}
                        className="w-full mt-2 max-w-[600px]"
                    >
                        Não concordo
                    </Button>
                </Container>
            </Container>
        </Container>
    );
}

const CheckIcon = () => (
    <Image src="/static/check.png" alt="Check Icon" width={24} height={24} />
);
