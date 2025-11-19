'use client';

import Link from 'next/link';
import { Container } from './Container';
import { Typography } from './Typography';
import { ProfilePicture } from './ProfilePicture';

const menuItems = [
    { label: 'Desafios', href: '/home' },
    { label: 'Ranking', href: '/ranking' },
    { label: 'Sair', href: '/' },
];

export function Sidebar() {

    return (
        <Container
            direction="column"
            align="center"
            justify="start"
            bg="primary"
            gap={6}
            className="w-64 h-[calc(100vh_-_48px)] py-12 text-center mr-0 ml-0"
        >
            <ProfilePicture />
            <Container direction="column" align="center" gap={2}>
                <Typography variant="text" color="white" weight="light">
                    Usuário
                </Typography>
            </Container>

            <Container
                direction="column"
                align="start"
                gap={2}
                className="w-full px-8"
            >
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="w-full text-left transition hover:opacity-80"
                    >
                        <Typography
                            variant="text"
                            color="white"
                            weight="semibold"
                        >
                            {item.label}
                        </Typography>
                    </Link>
                ))}
            </Container>
        </Container>
    );
}
