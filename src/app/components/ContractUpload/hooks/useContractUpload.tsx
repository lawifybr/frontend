import { useState } from "react";

export function useContractUpload(onAnalyze: (file: File) => Promise<void>) {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setLoading(true);
      await onAnalyze(file);
      setLoading(false);
    }
  };

  return { isDragging, loading, handleDrop, setIsDragging };
}
