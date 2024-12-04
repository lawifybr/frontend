'use client';

import { useState, useEffect } from 'react';
import { Upload, File, Check } from 'lucide-react';
import { useUser } from "@clerk/nextjs";

export default function DocumentAnalysis() {
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (newFile: File) => {
    setFile(newFile);
    setAnalyzing(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', newFile);

    try {
      const response = await fetch('https://fbae-2804-60-106-7b00-1b6-847-2ea7-cae6.ngrok-free.app/documents/analysis', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        setResult(data.result || 'Análise concluída com sucesso');
      } else {
        // Se a resposta não for JSON, lê como texto
        const text = await response.text();
        setResult(text);
      }
    } catch (error) {
      console.error('Erro ao analisar documento:', error);
      if (error instanceof Error) {
        setResult(`Erro ao analisar documento: ${error.message}`);
      } else {
        setResult('Erro ao analisar documento');
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      {user && (
        <div className="mb-4 text-xl font-semibold">
          Bem-vindo, {user.fullName || user.username || 'Usuário'}
        </div>
      )}
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {/* Input de arquivo */}
        <input
          type="file"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          accept=".pdf,.doc,.docx"
          id="file-upload"
        />
        
        {/* Área de upload */}
        <label htmlFor="file-upload" className="cursor-pointer block text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-blue-800" />
          <div className="text-lg mb-2">
            Arraste seu documento ou clique para selecionar
          </div>
          <p className="text-sm text-gray-500">
            Suporta PDF, DOC, DOCX
          </p>
        </label>

        {/* Arquivo selecionado */}
        {file && (
          <div className="mt-6">
            <h3 className="font-medium mb-3">Documento selecionado</h3>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <File className="w-5 h-5 text-blue-800 mr-3" />
              <span className="flex-1">{file.name}</span>
              <Check className="w-5 h-5 text-green-500" />
            </div>
          </div>
        )}

        {/* Estado de carregamento */}
        {analyzing && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800 mx-auto"></div>
            <p>Analisando...</p>
          </div>
        )}

        {/* Resultado */}
        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Resultado:</h3>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}