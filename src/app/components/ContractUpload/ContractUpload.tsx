'use client'

import React, { useEffect, useState } from "react"
import { Upload, FileText, LogIn } from "lucide-react"
import { useAuth, SignInButton, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

interface ContractUploadProps {
  isDarkMode?: boolean
}

const ContractUpload: React.FC<ContractUploadProps> = ({ isDarkMode = false }) => {
    const router = useRouter()
  const { isLoaded, userId } = useAuth()
  const { user } = useUser()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [htmlResult, setHtmlResult] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
        console.log('Conectando ao WebSocket...');
      const socket = new WebSocket(`ws://localhost:8000/ws/${user.id}`)
        if (!socket) {
            console.error('Erro ao conectar ao WebSocket')
            return
        }
        console.log('Conectado ao WebSocket')
      socket.onmessage = (event) => {
        setLoading(false)
        console.log("Resultado recebido:", event.data)
        setResult(event.data)
      }

      return () => socket.close()
    }
  }, [user])

  useEffect(() => {
    if (result) {
        router.push(`/analysis/${result}`)
    }
  }, [result])

  const handleFile = async (newFile: File) => {
    if (!user) throw new Error("Usuário não autenticado")
    
    setFile(newFile)
    setLoading(true)
    setResult(null)

    const formData = new FormData()
    formData.append('file', newFile)
    formData.append('user_id', user.id)

    try {
      const response = await fetch('http://localhost:8000/documents/analysis', {
        method: 'POST',
        body: formData,
      })

      console.log(response)

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    } catch (error) {
      console.error('Erro ao analisar documento:', error)
      setResult('Erro ao analisar documento')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) handleFile(droppedFile)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) await handleFile(selectedFile)
  }

  const darkModeStyles = isDarkMode
    ? "bg-gray-900/80 border-gray-700 text-white"
    : "bg-white/80 border-gray-300 text-gray-800"

  if (!isLoaded) {
    return <div className="h-full flex items-center justify-center">Loading...</div>
  }

  if (!userId) {
    return (
      <div className={`h-full flex shadow-2xl flex-col items-center justify-center gap-6 ${darkModeStyles} rounded-3xl p-8`}>
        <Upload className="w-16 h-16 text-blue-600" />
        <h2 className="text-2xl font-semibold text-center">Faça login para analisar seus contratos</h2>
        <p className="text-gray-600 text-center max-w-md">
          Para garantir a segurança dos seus documentos, é necessário fazer login antes de continuar
        </p>
        <SignInButton mode="modal">
          <div className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer">
            <LogIn className="w-5 h-5" />
            Fazer Login
          </div>
        </SignInButton>
      </div>
    )
  }

  return (
    <div
      className={`h-full flex flex-col items-center justify-center backdrop-blur-lg rounded-3xl border-2 border-dashed transition-all duration-300 ${
        isDragging ? "border-blue-400 bg-blue-50/50" : darkModeStyles
      }`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setIsDragging(false)
      }}
      onDrop={handleDrop}
    >
      {loading ? (
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Analisando seu contrato...</p>
          <p className="text-sm text-gray-600">Isso levará apenas alguns segundos</p>
        </div>
      ) : (
        <>
          <div className="text-center p-8">
            <Upload className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Arraste seu contrato aqui</h3>
            <p className="mb-6">ou</p>
            <label className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors inline-flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Escolha um arquivo
              <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileSelect} />
            </label>
            <p className="mt-4 text-sm text-gray-500">PDF ou DOCX até 5MB</p>
          </div>
        </>
      )}
    </div>
  )
}

export default ContractUpload