"use client"

import { useState } from "react"
import { Upload, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Analysis } from "../types/analysis"
import { AnalysisItem } from "../components/analysis-item"
import Link from 'next/link';

const mockAnalyses: Analysis[] = [
  {
    id: "1",
    fileName: "Contrato_Prestacao_Servicos.pdf",
    createdAt: "23 Jan, 2024 às 14:30",
    fileSize: "2.4 MB",
    status: 'completed'
  },
  {
    id: "2",
    fileName: "Acordo_Confidencialidade.pdf",
    createdAt: "23 Jan, 2024 às 12:15",
    fileSize: "1.8 MB",
    status: 'processing'
  },
  {
    id: "3",
    fileName: "Contrato_Aluguel_Comercial.pdf",
    createdAt: "22 Jan, 2024 às 16:45",
    fileSize: "3.1 MB",
    status: 'completed'
  },
  {
    id: "4",
    fileName: "Termo_Compromisso.pdf",
    createdAt: "22 Jan, 2024 às 09:20",
    fileSize: "1.5 MB",
    status: 'error'
  }
]

export default function AnalysisList() {
  const [analyses, setAnalyses] = useState<Analysis[]>(mockAnalyses)

  const handleView = (id: string) => {
    console.log("Viewing analysis:", id)
  }

  const handleDelete = (id: string) => {
    setAnalyses(analyses.filter(analysis => analysis.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold text-gray-900">
              Análises de Contratos
            </h1>
            <p className="text-gray-500">
              Gerencie suas análises de contratos com IA
            </p>
          </div>
          
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Upload className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
            {/* go to /  */}
            <Link href="/">
                Nova Análise
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {analyses.map((analysis) => (
            <AnalysisItem
              key={analysis.id}
              analysis={analysis}
              onView={handleView}
              onDelete={handleDelete}
            />
          ))}
          
          {analyses.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
              <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Nenhuma análise encontrada
              </h3>
              <p className="text-gray-500">
                Comece fazendo upload do seu primeiro contrato
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

