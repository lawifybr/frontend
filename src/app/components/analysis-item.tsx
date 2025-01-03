import { FileText, ArrowRight, Trash2, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Analysis } from "../types/analysis"

interface AnalysisItemProps {
  analysis: Analysis
  onView: (id: string) => void
  onDelete: (id: string) => void
}

export function AnalysisItem({ analysis, onView, onDelete }: AnalysisItemProps) {
  const statusIcons = {
    completed: <CheckCircle className="w-5 h-5 text-green-500" />,
    processing: <Clock className="w-5 h-5 text-blue-500 animate-spin" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />
  }

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur"></div>
      <div className="relative p-6 bg-white rounded-lg border border-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-md space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {analysis.fileName}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500">{analysis.createdAt}</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-500">{analysis.fileSize} MB</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {statusIcons[analysis.status]}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            {analysis.status === 'completed' && 'Análise concluída'}
            {analysis.status === 'processing' && 'Processando análise...'}
            {analysis.status === 'error' && 'Erro na análise'}
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(analysis.id)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 group/button"
            >
              Ver Análise
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover/button:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(analysis.id)}
              className="text-gray-400 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

