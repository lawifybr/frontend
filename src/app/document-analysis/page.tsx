'use client';

import { remark } from 'remark';
import html from 'remark-html';
import { useEffect, useState } from 'react';
import { Upload, File, Check } from 'lucide-react';
import { useUser } from "@clerk/nextjs";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}


export default function DocumentAnalysis() {
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [htmlResult, setHtmlResult] = useState<string | null>(null);

  useEffect(() => {
    if (result) {
      markdownToHtml(result).then((html) => setHtmlResult(html));
    }
  }, [result]);

  useEffect(() => {
    if (user) {
      console.log('Conectando ao WebSocket...');
      const socket = new WebSocket(`ws://localhost:8000/ws/${user.id}`);
      if (!socket) {
        console.error('Erro ao conectar ao WebSocket');
        return;
      }
      socket.onmessage = (event) => {
        setAnalyzing(false);
        setResult(event.data);
      };
      socket.onclose = () => console.log("WebSocket desconectado");
      return () => socket.close();
    }
  }, [user]);

  const handleFile = async (newFile: File) => {
    setFile(newFile);
    setAnalyzing(true);
    setResult(null);

    console.log("Analisando documento...");
  
    if (!user) {
      throw new Error("Usuário não autenticado");
    }
  
    const formData = new FormData();
    formData.append("file", newFile); // Adiciona o arquivo
    formData.append("user_id", user.id); // Adiciona o user_id como campo do formulário
  
    try {
      const response = await fetch("http://localhost:8000/documents/analysis", {
        method: "POST",
        body: formData,
        headers: {
          ngrok: "ngrok-skip-browser-warning",
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setResult(data.status || "Análise em andamento");
    } catch (error) {
      console.error("Erro ao analisar documento:", error);
      setResult("Erro ao analisar documento");
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
        <input
          type="file"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          accept=".pdf,.doc,.docx"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer block text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-blue-800" />
          <div className="text-lg mb-2">Arraste seu documento ou clique para selecionar</div>
          <p className="text-sm text-gray-500">Suporta PDF, DOC, DOCX</p>
        </label>

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

        {analyzing && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800 mx-auto"></div>
            <p>Analisando...</p>
          </div>
        )}

        {htmlResult && (
          <div
            className="mt-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-md"
            dangerouslySetInnerHTML={{ __html: htmlResult }}
          />
        )}
      </div>
    </div>
  );
}
