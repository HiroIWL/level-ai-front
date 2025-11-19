'use client';

import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Typography } from './Typography';

export function ProfilePicture() {
    const initials = 'US';

    return (
        <Container
            align="center"
            justify="center"
            bg="white"
            className={cn(
                'rounded-full w-[48px] h-[48px] border-2 border-gray-500 absolute right-8'
            )}
        >
            <Typography
                variant="label"
                color="primary"
                weight="regular"
                className="uppercase w-[36px] flex items-center justify-center"
            >
                {initials}
            </Typography>
        </Container>
    );
}
