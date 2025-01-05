import React from 'react';
import Image from 'next/image';

export default function LandingSection4() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Revolucionando a análise de contratos com IA
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Descubra como nossa plataforma de inteligência artificial pode transformar a maneira como você gerencia e analisa contratos. Automatize a revisão, identifique cláusulas críticas e reduza os riscos jurídicos com soluções precisas e confiáveis.
            </p>
            <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
              Saiba mais
            </button>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-10">
            <div className="relative h-64 sm:h-72 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Análise de contratos com IA"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
