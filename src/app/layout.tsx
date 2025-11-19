import './globals.css';
import { Josefin_Sans } from 'next/font/google';

import { AuthenticatedProvider } from '@/context/AuthenticatedContext';
import { UserProvider } from '@/context/UserContext';

const josefin = Josefin_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-josefin',
});

export const metadata = {
    title: 'level-ai',
    description: '',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${josefin.variable} ${josefin.variable} antialiased !bg-white`}
            >
                <AuthenticatedProvider>
                    <UserProvider>{children}</UserProvider>
                </AuthenticatedProvider>
            </body>
        </html>
    );
}
