'use client'

import React from 'react';
import { Search, Scale, ShieldCheck, BookOpen, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, color }) => {
  return (
    <motion.div
      className="relative w-full h-full"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`absolute inset-0 ${color} opacity-75 rounded-lg transform rotate-3`}></div>
      <div className="relative h-full p-6 bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden group">
        <div className="absolute right-0 bottom-0 w-24 h-24 -m-6 transform rotate-45 bg-gradient-to-br from-transparent to-gray-200 group-hover:scale-150 transition-transform duration-500 ease-in-out"></div>
        <div className="flex items-center mb-4">
          <div className={`p-3 rounded-full ${color} text-white mr-4`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 z-10 relative">{description}</p>
      </div>
    </motion.div>
  );
};

export default function LandingSection3() {
  const services = [
    {
      title: "Extração de Cláusulas",
      description: "Identifique cláusulas importantes automaticamente, otimizando a revisão de contratos.",
      icon: <Search className="w-6 h-6" />,
      color: "bg-indigo-500",
    },
    {
      title: "Análise de Riscos",
      description: "Avalie potenciais riscos legais com análises baseadas em IA e algoritmos de aprendizado.",
      icon: <Scale className="w-6 h-6" />,
      color: "bg-purple-500",
    },
    {
      title: "Validação de Conformidade",
      description: "Certifique-se de que contratos atendam a requisitos legais e regulatórios específicos.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Resumo Automático",
      description: "Gere resumos rápidos de contratos, destacando os pontos mais relevantes.",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      title: "Integração com Sistemas",
      description: "Automatize o fluxo de trabalho de análise de contratos com integração de IA.",
      icon: <Layers className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-white mb-4">Nossos Serviços em Análise de Contratos</h2>
          <p className="text-xl text-gray-300">Impulsione a eficiência e a precisão jurídica com inteligência artificial.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
