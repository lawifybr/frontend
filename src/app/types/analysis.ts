export interface Analysis {
    id: string
    fileName: string
    createdAt: string
    fileSize: string
    status: 'completed' | 'processing' | 'error'
}
  