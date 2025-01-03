"use client"

import { useState, useEffect } from "react"
import { Upload, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Analysis } from "../types/analysis"
import { AnalysisItem } from "../components/analysis-item"
import Link from 'next/link'
import { useUser } from "@clerk/nextjs"

export default function AnalysisList() {
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    const fetchAnalyses = async () => {
      if (!user) return

      try {
        const response = await fetch(`http://localhost:8000/documents/user/${user.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch analyses')
        }
        const data = await response.json()
        setAnalyses(data)
      } catch (error) {
        console.error('Error fetching analyses:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalyses()
  }, [user])

  const handleView = (id: string) => {
    console.log("Viewing analysis:", id)
  }

  const handleDelete = async (id: string) => {
    try {
      setAnalyses(analyses.filter((analysis) => analysis.id !== id));
  
      const response = await fetch(`http://localhost:8000/documents/analysis/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Falha ao deletar a análise');
      }
  
      console.log(`Análise ${id} deletada com sucesso`);
    } catch (error) {
      console.error('Erro ao deletar análise:', error);
  
      const userId = user?.id;
      if (userId) {
        try {
          const response = await fetch(`http://localhost:8000/documents/user/${userId}`);
          const data = await response.json();
          setAnalyses(data); // Atualizar com os dados mais recentes
        } catch (error) {
          console.error('Erro ao recuperar análises após falha na exclusão:', error);
        }
      }
    }
  };
  

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Carregando análises...</p>
        </div>
      </div>
    )
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
          
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Upload className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
              Nova Análise
          </Button>
        </Link>
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