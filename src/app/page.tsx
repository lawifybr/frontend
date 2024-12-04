"use client"
import { useAuth } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  Shield, 
  FileText, 
  Zap
} from 'lucide-react';
import Link from "next/link";


export default function Home() {
  const {isLoaded, userId} = useAuth()
  const router = useRouter()
  if (isLoaded && userId) {
    // Use router.push() instead of revalidatePath()
    router.push('/document-analysis');
  }

  return (
    <div className="bg-yellow-50">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center">
          <h1 className="text-5xl font-bold text-yellow-900 mb-6">
            Simplifique a Gestão de Contratos para sua Empresa
          </h1>
          <p className="text-xl text-yellow-800 mb-8 max-w-2xl mx-auto">
            Lawify: Inteligência Artificial para análise, otimização e gerenciamento 
            completo de contratos, desenvolvido especialmente para pequenas e médias empresas.
          </p>
          <div className="flex justify-center space-x-4">
           <Link href="/pricing-plans" className="text-yellow-700 hover:text-yellow-900">
            <Button 
                size="lg" 
                className="bg-yellow-600 text-white hover:bg-yellow-700 flex items-center"
              >
                Começar Agora <ChevronRight className="ml-2" />
            </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-yellow-600 text-yellow-800 hover:bg-yellow-100"
            >
              Saiba Mais
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Shield className="mx-auto mb-4 text-yellow-600" size={48} />
            <h3 className="text-xl font-semibold mb-2 text-yellow-900">Análise Jurídica</h3>
            <p className="text-yellow-800">
              Análise automatizada de cláusulas com identificação de riscos e sugestões de melhoria.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FileText className="mx-auto mb-4 text-yellow-600" size={48} />
            <h3 className="text-xl font-semibold mb-2 text-yellow-900">Checklist Completo</h3>
            <p className="text-yellow-800">
              Checklist interativo para garantir o cumprimento de todas as obrigações legais.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Zap className="mx-auto mb-4 text-yellow-600" size={48} />
            <h3 className="text-xl font-semibold mb-2 text-yellow-900">IA Avançada</h3>
            <p className="text-yellow-800">
              Inteligência Artificial de ponta para análise rápida e precisa de documentos.
            </p>
          </div>
        </section>
        
        {/* Detailed Features */}
        <section className="mt-20 bg-white rounded-lg shadow-lg p-12">
          <h2 className="text-3xl font-bold text-center text-yellow-900 mb-12">
            Funcionalidades Detalhadas
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-yellow-900">Análise de Risco Automatizada</h3>
              <p className="text-yellow-800">
                Identifique potenciais riscos legais instantaneamente. Nossa IA compara seu contrato com milhares de documentos para fornecer insights precisos.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-yellow-900">Gerenciamento de Prazos</h3>
              <p className="text-yellow-800">
                Acompanhamento automático de prazos, renovações e marcos importantes dos seus contratos com alertas personalizados.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-yellow-900">Integração Empresarial</h3>
              <p className="text-yellow-800">
                Conecte-se facilmente com seus sistemas existentes de CRM, ERP e outras ferramentas de gestão.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-yellow-900">Relatórios Inteligentes</h3>
              <p className="text-yellow-800">
                Gere relatórios detalhados de conformidade, riscos e performance dos seus contratos em poucos cliques.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
