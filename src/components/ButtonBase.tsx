'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'info'
    | 'neutral'
    | 'white';
export type TextColor = 'black' | 'white';

export interface BaseButtonProps {
    variant?: ButtonVariant;
    textColor?: TextColor;
    iconSrc?: string | StaticImageData;
    iconAlt?: string;
    className?: string;
    children: React.ReactNode;
}

export const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-[#8700FF] hover:bg-[#7700DD] active:bg-[#6600BB]',
    secondary: 'bg-[#8700FF] hover:bg-[#7700DD] active:bg-[#6600BB]',
    info: 'bg-[#0094FF] hover:bg-[#0086e6] active:bg-[#0077cc]',
    neutral: 'bg-[#D9D9D9] hover:bg-[#cfcfcf] active:bg-[#bfbfbf]',
    white: 'bg-[#FFFFFF] hover:bg-gray-50 active:bg-gray-100',
};

export const textColorClasses: Record<TextColor, string> = {
    black: 'text-black',
    white: 'text-white',
};

export function ButtonBase({
    children,
    iconSrc,
    iconAlt = 'Ícone',
}: Pick<BaseButtonProps, 'children' | 'iconSrc' | 'iconAlt'>) {
    return (
        <>
            <span>{children}</span>
            {iconSrc && (
                <Image
                    src={iconSrc}
                    alt={iconAlt}
                    width={20}
                    height={20}
                    className="ml-2"
                />
            )}
        </>
    );
}

export function getButtonClasses(
    variant: ButtonVariant,
    textColor: TextColor,
    className?: string
) {
    return [
        'font-semibold py-3 rounded-md transition flex items-center justify-center gap-2 w-full',
        variantClasses[variant],
        textColorClasses[textColor],
        className,
    ]
        .filter(Boolean)
        .join(' ');
}
