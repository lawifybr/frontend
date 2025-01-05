'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Calendar, HardDrive } from 'lucide-react'

interface AnalysisDisplayProps {
  title: string
  analysis: string
  sizeInBytes: number
  analysisDate: string
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function AnalysisDisplay({ title, analysis, sizeInBytes, analysisDate }: AnalysisDisplayProps) {
  const [formattedDate, setFormattedDate] = useState<string>('')

  useEffect(() => {
    const date = new Date(analysisDate)
    setFormattedDate(format(date, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR }))
  }, [analysisDate])

  const formattedSize = formatBytes(sizeInBytes)
  const isLargeContract = sizeInBytes > 10 * 1024 * 1024 // 10MB in bytes

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8">{title}</h1>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Resumo do Contrato
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{analysis}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-6 w-6 text-green-600 dark:text-green-400" />
              Tamanho do Contrato
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold mb-2">{formattedSize}</p>
            <Badge variant={isLargeContract ? "destructive" : "secondary"}>
              {isLargeContract 
                ? "O contrato tem um tamanho muito grande" 
                : "O tamanho do contrato está bom"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              Data da Análise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formattedDate}</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />
    </div>
  )
}

