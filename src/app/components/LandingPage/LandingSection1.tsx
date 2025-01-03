"use client"
import ContractUpload from "../ContractUpload/ContractUpload";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Scale, 
  Brain, 
  Shield, 
  Clock,
  Zap
} from 'lucide-react';

export default function LandingSection1() {
  const analyzeContract = async (file: File): Promise<void> => {
    console.log("Analisando contrato:", file.name);
    // Simular análise
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div className="bg-white relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl" />
      <div className="absolute top-1/8 right-1/3 w-64 h-64 bg-purple-400/20 rounded-full filter blur-3xl" />
      <div className="relative p-32 flex">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-8">
            <div className="p-8">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-8 h-8 text-blue-600" />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                    Análise Inteligente de Contratos
                  </h2>
                </div>
                <p className="text-gray-600 text-lg mb-8">
                  Nossa IA analisa seus contratos em segundos, identificando riscos e oportunidades que podem passar despercebidos.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <Card className="backdrop-blur-lg bg-white/50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <Shield className="w-6 h-6 text-blue-600 mb-2" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Segurança Garantida</h3>
                    <p className="text-sm text-gray-600">Análise 100% confidencial e segura</p>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-lg bg-white/50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <Clock className="w-6 h-6 text-blue-600 mb-2" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Análise Rápida</h3>
                    <p className="text-sm text-gray-600">Resultados em segundos</p>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-lg bg-white/50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <Zap className="w-6 h-6 text-blue-600 mb-2" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">IA Avançada</h3>
                    <p className="text-sm text-gray-600">Tecnologia de ponta</p>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-lg bg-white/50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <Scale className="w-6 h-6 text-blue-600 mb-2" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Conformidade Legal</h3>
                    <p className="text-sm text-gray-600">Verificação completa</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative">
              <ContractUpload onAnalyze={analyzeContract} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
