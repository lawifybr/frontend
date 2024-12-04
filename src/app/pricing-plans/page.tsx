"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  Clock 
} from 'lucide-react';

const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');

  const plans = [
    {
      name: 'Starter',
      credits: 50,
      price: 99,
      features: [
        'Análise básica de contratos',
        'Suporte por e-mail',
        '1 usuário',
        'Armazenamento de 10 contratos'
      ],
      recommended: false
    },
    {
      name: 'Professional',
      credits: 200,
      price: 299,
      features: [
        'Análise avançada de contratos',
        'Suporte prioritário',
        '5 usuários',
        'Armazenamento de 50 contratos',
        'Relatórios detalhados'
      ],
      recommended: true
    },
    {
      name: 'Enterprise',
      credits: 500,
      price: 599,
      features: [
        'Análise completa personalizada',
        'Suporte dedicado',
        'Usuários ilimitados',
        'Armazenamento ilimitado',
        'Integrações personalizadas'
      ],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-yellow-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-yellow-900 mb-4">
            Planos de Créditos Lawify
          </h1>
          <p className="text-xl text-yellow-800 max-w-2xl mx-auto">
            Escolha o plano que melhor se adapta às necessidades de gestão de contratos da sua empresa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`
                bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300
                ${plan.recommended ? 'border-4 border-yellow-500 scale-105' : 'border border-yellow-200'}
                hover:shadow-xl
              `}
              onClick={() => setSelectedPlan(plan.name)}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 
                  bg-yellow-500 text-white px-4 py-1 rounded-full text-sm">
                  Mais Popular
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-yellow-900 mb-4">
                {plan.name}
              </h2>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-yellow-800">
                  {plan.credits}
                </span>
                <span className="text-yellow-700 ml-2">créditos/mês</span>
              </div>
              
              <div className="mb-6 text-yellow-800 space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="mr-2 text-yellow-500 w-5 h-5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className={`
                  w-full 
                  ${plan.recommended 
                    ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                    : 'bg-white text-yellow-800 border border-yellow-600 hover:bg-yellow-50'
                  }
                `}
              >
                {plan.recommended ? 'Escolher Plano' : 'Começar'}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-yellow-900 text-center mb-8">
            Como Funcionam os Créditos Lawify
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <CreditCard className="mx-auto mb-4 text-yellow-600 w-16 h-16" />
              <h4 className="font-semibold text-yellow-900 mb-2">Créditos por Análise</h4>
              <p className="text-yellow-800">
                1 crédito = 1 análise completa de contrato
              </p>
            </div>
            
            <div className="text-center">
              <Clock className="mx-auto mb-4 text-yellow-600 w-16 h-16" />
              <h4 className="font-semibold text-yellow-900 mb-2">Validade dos Créditos</h4>
              <p className="text-yellow-800">
                Créditos não utilizados expiram após 12 meses
              </p>
            </div>
            
            <div className="text-center">
              <ArrowRight className="mx-auto mb-4 text-yellow-600 w-16 h-16" />
              <h4 className="font-semibold text-yellow-900 mb-2">Flexibilidade</h4>
              <p className="text-yellow-800">
                Compre créditos adicionais a qualquer momento
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button className="bg-yellow-600 text-white hover:bg-yellow-700">
              Solicitar Demonstração
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;