"use client"

import { Upload, Shield, FileText } from 'lucide-react'
import { Card } from "@/components/ui/card"
import ContractUpload from '../ContractUpload/ContractUpload'

export default function LandingSection2() {
  const analyzeContract = async (file: File): Promise<void> => {
    console.log("Analisando contrato:", file.name);
    // Simular análise
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-800 via-blue-900 to-black flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Análise de Contrato Inteligente
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Faça o upload do seu contrato e receba uma análise detalhada com insights importantes e pontos de atenção.
        </p>
        <ContractUpload isDarkMode={true} />

        <div className="space-y-4 mt-12">
          <p className="text-sm text-gray-400">Utilizado por escritórios de advocacia em:</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            <div className="text-white font-semibold">Empresa 1</div>
            <div className="text-white font-semibold">Empresa 2</div>
            <div className="text-white font-semibold">Empresa 3</div>
            <div className="text-white font-semibold">Empresa 4</div>
          </div>
        </div>
      </div>
    </div>
  )
}
