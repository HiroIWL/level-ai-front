'use client';

import { Container } from './Container';
type HeaderProps = {
    isAuthenticated?: boolean;
    isHome?: boolean;
};
import Image from 'next/image';
import { ProfilePicture } from './ProfilePicture';
import { Typography } from './Typography';
import { useRouter } from 'next/navigation';
import { logOut } from '@/app/login/actions';

export function Header({ isAuthenticated, isHome }: HeaderProps) {
    const router = useRouter();

    const handleLogout = async () => {
        if (isHome) {
            await logOut();
            router.push('/');
            return;
        }

        router.back();
    };

    return isAuthenticated ? (
        <Container
            fluid={true}
            shadow={true}
            padding="xs"
            justify="center"
            align="center"
            className="relative"
        >
            <Image
                src="/static/logo-level-ai.png"
                alt="Ilustração pessoas se exercitando"
                width={117 * 2}
                height={349 * 2}
                className="object-contain relative z-10 w-full max-w-[200px]"
                priority
            />

            <ProfilePicture />

            <Typography
                variant="subtitle"
                color="primary"
                className="absolute left-8 cursor-pointer hover:underline"
                onClick={handleLogout}
            >
                {isHome ? 'sair' : 'voltar'}
            </Typography>
        </Container>
    ) : (
        <Image
            src="/static/logo-level-ai.png"
            alt="Ilustração pessoas se exercitando"
            width={117 * 2}
            height={349 * 2}
            className="object-contain relative z-10 w-full"
            priority
        />
    );
}
