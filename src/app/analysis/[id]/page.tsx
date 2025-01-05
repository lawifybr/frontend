import { notFound } from 'next/navigation'
import AnalysisDisplay from './AnalysisDisplay'

async function getAnalysis(id: string) {
  const res = await fetch(`http://127.0.0.1:8000/documents/analysis/${id}`)
  
  if (!res.ok) {
    throw new Error('Failed to fetch analysis')
  }
  
  return res.json()
}

export default async function AnalysisPage({ params }: { params: { id: string } }) {
  try {
    const analysisData = await getAnalysis(params.id)
    
    if (!analysisData || analysisData.length < 7) {
      notFound()
    }

    const [, , analysis, title, sizeInBytes, , analysisDate] = analysisData

    return <AnalysisDisplay 
      title={title} 
      analysis={analysis} 
      sizeInBytes={sizeInBytes} 
      analysisDate={analysisDate} 
    />
  } catch (error) {
    console.error('Error fetching analysis:', error)
    return <div>Erro ao carregar a análise. Por favor, tente novamente mais tarde.</div>
  }
}

