'use client';

import { useState, useTransition } from 'react';
import { Container, Header } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
const artigos = [
    {
        id: '1',
        foto: 'artigo1.png',
        titulo: 'Comece com IA',
        descricao: '5min de leitura',
        resumo: 'Introdução aos conceitos básicos de Inteligência Artificial.',
    },
    {
        id: '2',
        foto: 'artigo2.png',
        titulo: 'Aprenda Python',
        descricao: '10min de leitura',
        resumo: 'Guia para iniciantes em programação Python para IA.',
    },
    {
        id: '3',
        foto: 'artigo3.png',
        titulo: 'Desenvolva projetos',
        descricao: '8min de leitura',
        resumo: 'Dicas para criar seus primeiros projetos de IA.',
    },
    {
        id: '4',
        foto: 'artigo4.png',
        titulo: 'Domine Machine Learning',
        descricao: '12min de leitura',
        resumo: 'Conceitos avançados de aprendizado de máquina.',
    },
    {
        id: '5',
        foto: 'artigo5.png',
        titulo: 'Redes Neurais Simplificadas',
        descricao: '15min de leitura',
        resumo: 'Entenda como funcionam as redes neurais artificiais.',
    },
    {
        id: '6',
        foto: 'artigo6.jpeg',
        titulo: 'Visão Computacional',
        descricao: '9min de leitura',
        resumo: 'Explore técnicas de visão computacional em IA.',
    },
    {
        id: '7',
        foto: 'artigo7.jpeg',
        titulo: 'Processamento de Linguagem Natural',
        descricao: '11min de leitura',
        resumo: 'Aprenda sobre NLP e suas aplicações em IA.',
    },
    {
        id: '8',
        foto: 'artigo8.jpeg',
        titulo: 'Implante Modelos de IA',
        descricao: '14min de leitura',
        resumo: 'Guia para implantar modelos de IA em produção.',
    },
];

const CardArtigo = ({
    id,
    foto,
    titulo,
    descricao,
    resumo,
}: {
    id: string;
    foto: string;
    titulo: string;
    descricao: string;
    resumo: string;
}) => {
    return (
        <Link href={`/artigo/${id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-purple-700 transition-shadow duration-300 cursor-pointer h-full flex flex-col">
                <div className="w-full aspect-square overflow-hidden rounded-lg">
                    <Image
                        src={`/static/${foto}`}
                        width={512}
                        height={512}
                        alt={titulo}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-4 flex-grow">
                    <h3 className="text-lg text-[#8700FF] font-semibold mb-2">{titulo}</h3>
                    <p className="text-gray-600 text-sm">{descricao}</p>
                    <p className="text-gray-800 mt-2">{resumo}</p>
                </div>
            </div>
        </Link>
    );
};

export default function CadastroAluno() {
    return (
        <Container
            direction="column"
            bg="white"
            padding="none"
            className="min-h-screen"
            fluid
        >
            <Header isAuthenticated={true} isHome={true} />

            <div className="grid grid-cols-4 grid-rows-2 gap-4 p-8 w-full flex-grow">
                {artigos.map((artigo, index) => (
                    <CardArtigo
                        key={index}
                        id={artigo.id}
                        foto={artigo.foto}
                        titulo={artigo.titulo}
                        descricao={artigo.descricao}
                        resumo={artigo.resumo}
                    />
                ))}
            </div>
        </Container>
    );
}
