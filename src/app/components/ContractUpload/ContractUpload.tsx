"use client";
import React from "react";
import { Upload, FileText } from "lucide-react";
import { useContractUpload } from "./hooks/useContractUpload";

interface ContractUploadProps {
  onAnalyze: (file: File) => Promise<void>;
  isDarkMode?: boolean; // Adiciona uma prop para alternar entre os modos claro e escuro
}

const ContractUpload: React.FC<ContractUploadProps> = ({ onAnalyze, isDarkMode = false }) => {
  const { isDragging, loading, handleDrop, setIsDragging } = useContractUpload(onAnalyze);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onAnalyze(file);
    }
  };

  const darkModeStyles = isDarkMode
    ? "bg-gray-900/80 border-gray-700 text-white"
    : "bg-white/80 border-gray-300 text-gray-800";

  return (
    <div
      className={`h-full flex items-center justify-center backdrop-blur-lg rounded-3xl border-2 border-dashed transition-all duration-300 ${
        isDragging ? "border-blue-400 bg-blue-50/50" : darkModeStyles
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
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
      )}
    </div>
  );
};

export default ContractUpload;
