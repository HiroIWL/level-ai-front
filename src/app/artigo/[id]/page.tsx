'use client';

import { Container, Header } from '@/components';
import Image from 'next/image';
import { use } from 'react';

const conteudoPadrao = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis enim tortor, sagittis in ex vel, aliquam vulputate tortor. Integer sodales, tellus ut luctus aliquet, justo enim malesuada sapien, eu commodo velit elit sit amet ligula. Nulla facilisi. Curabitur diam elit, condimentum at neque at, elementum vestibulum tortor. Duis eu ante dui. Nullam eu orci purus. Aliquam ultricies ornare rhoncus. In hac habitasse platea dictumst. In eros quam, lobortis eget dictum nec, fringilla non dui.

In hac habitasse platea dictumst. Curabitur mi nibh, semper non justo sit amet, bibendum tempus turpis. Ut non sollicitudin urna. Maecenas ligula felis, fermentum et porta nec, gravida sit amet orci. Aliquam id ultrices turpis, nec finibus tellus. Curabitur ullamcorper neque faucibus commodo mattis. Duis eleifend consequat quam, eu laoreet mauris imperdiet iaculis.

Morbi tristique neque eu lectus scelerisque mattis. Curabitur interdum, neque a porttitor congue, eros est rutrum diam, in tristique turpis erat rhoncus tortor. Etiam dictum euismod lacus ac facilisis. Quisque at blandit nunc. Suspendisse ac nisl tincidunt, cursus lorem et, imperdiet arcu. Vivamus blandit arcu mauris, nec eleifend lorem tempor quis. Proin ut facilisis turpis, non molestie dui. Phasellus porttitor volutpat risus, ut semper risus tempus ac. Donec luctus ligula id tellus iaculis vestibulum. Cras id enim neque. Suspendisse risus lectus, egestas sed faucibus bibendum, semper a urna. Aliquam quis dolor sapien.

Sed vel est ornare, eleifend sapien a, varius tortor. Nulla in enim velit. Duis vel eleifend massa. Phasellus eu dictum risus. Nunc nec pellentesque augue. Nam quis vehicula ipsum. Sed quis felis eget sem pretium accumsan ac feugiat augue. Morbi finibus, augue ut egestas vulputate, mauris nibh venenatis urna, nec faucibus dolor ex fermentum lorem. Pellentesque sed leo vel leo lobortis vulputate et nec purus.`;

const artigosMap: Record<
    string,
    {
        titulo: string;
        foto: string;
        tempo_leitura: string;
        conteudo: string;
    }
> = {
    '1': {
        titulo: 'Comece com IA',
        foto: 'artigo1.png',
        tempo_leitura: '5 min de leitura',
        conteudo: conteudoPadrao,
    },
    '2': {
        titulo: 'Aprenda Python',
        foto: 'artigo2.png',
        tempo_leitura: '10 min de leitura',
        conteudo: conteudoPadrao,
    },
    '3': {
        titulo: 'Desenvolva projetos',
        foto: 'artigo3.png',
        tempo_leitura: '8 min de leitura',
        conteudo: conteudoPadrao,
    },
    '4': {
        titulo: 'Domine Machine Learning',
        foto: 'artigo4.png',
        tempo_leitura: '12 min de leitura',
        conteudo: conteudoPadrao,
    },
    '5': {
        titulo: 'Redes Neurais Simplificadas',
        foto: 'artigo5.png',
        tempo_leitura: '15 min de leitura',
        conteudo: conteudoPadrao,
    },
    '6': {
        titulo: 'Visão Computacional',
        foto: 'artigo6.jpeg',
        tempo_leitura: '9 min de leitura',
        conteudo: conteudoPadrao,
    },
    '7': {
        titulo: 'Processamento de Linguagem Natural',
        foto: 'artigo7.jpeg',
        tempo_leitura: '11 min de leitura',
        conteudo: conteudoPadrao
    },
    '8': {
        titulo: 'Implante Modelos de IA',
        foto: 'artigo8.jpeg',
        tempo_leitura: '14 min de leitura',
        conteudo: conteudoPadrao,
    },
};

export default function ArtigoPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const artigo = artigosMap[id];

    if (!artigo) {
        return (
            <Container
                direction="column"
                bg="white"
                padding="md"
                className="min-h-screen"
                fluid
            >
                <Header isAuthenticated={true} />
                <div className="text-center mt-12">
                    <p className="text-xl text-gray-600">
                        Artigo não encontrado
                    </p>
                </div>
            </Container>
        );
    }

    return (
        <Container
            direction="column"
            bg="white"
            padding="none"
            className="min-h-screen"
            fluid
        >
            <Header isAuthenticated={true} />

            <div className="w-full p-6">
                <Image
                    src={`/static/${artigo.foto}`}
                    width={0}
                    height={0}
                    sizes='100vw'
                    alt={artigo.titulo}
                    className="w-full max-h-[300px] object-cover rounded-lg"
                />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-black mb-4">
                    {artigo.titulo}
                </h1>

                <p className="text-gray-600 text-sm mb-8">
                    {artigo.tempo_leitura}
                </p>

                <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                    {artigo.conteudo.split('\n\n').map((paragrafo, index) => (
                        <p key={index} className="mb-6 text-justify">
                            {paragrafo}
                        </p>
                    ))}
                </div>
            </div>
        </Container>
    );
}
