// import { Sparkles, Clock, Shield, Shirt, Coffee, AlertTriangle } from 'lucide-react';
// import { useState } from 'react';
// import React from 'react';

// interface AIAssistantProps {
//   isDark?: boolean;
//   safetyLevel: 'safe' | 'caution' | 'danger';
//   currentConditions: {
//     temp: number;
//     rainChance: number;
//     windSpeed: number;
//   };
// }

// export function AIAssistant({ isDark = true, safetyLevel, currentConditions }: AIAssistantProps) {
//   const [isGenerating, setIsGenerating] = useState(false);

//   // AI-generated recommendations based on weather conditions
//   const getAIRecommendations = () => {
//     const recommendations = [];

//     // Time-based recommendation
//     if (currentConditions.rainChance > 60) {
//       recommendations.push({
//         icon: Clock,
//         title: 'Melhor Horário',
//         text: 'Baseado na previsão, o melhor período para trabalhar será entre 18h-19h quando a chuva diminuir.',
//         color: '#6B9BD1'
//       });
//     } else {
//       recommendations.push({
//         icon: Clock,
//         title: 'Janela Ideal',
//         text: 'Condições favoráveis continuam nas próximas 4 horas. Aproveite para tarefas externas prioritárias.',
//         color: '#6B9BD1'
//       });
//     }

//     // Safety equipment recommendation
//     if (safetyLevel === 'danger') {
//       recommendations.push({
//         icon: Shield,
//         title: 'Equipamentos Críticos',
//         text: 'Recomendo capa de chuva impermeável, calçado antiderrapante e colete refletivo de alta visibilidade.',
//         color: '#F5C542'
//       });
//     } else if (safetyLevel === 'caution') {
//       recommendations.push({
//         icon: Shield,
//         title: 'Proteção Recomendada',
//         text: 'Use boné ou chapéu, óculos de sol e mantenha capa de chuva acessível. Hidrate-se regularmente.',
//         color: '#F5C542'
//       });
//     } else {
//       recommendations.push({
//         icon: Shield,
//         title: 'Segurança Básica',
//         text: 'Protetor solar fator 50+, boné e óculos de sol. Leve garrafa d\'água para hidratação constante.',
//         color: '#F5C542'
//       });
//     }

//     // Clothing recommendation
//     if (currentConditions.temp > 27) {
//       recommendations.push({
//         icon: Shirt,
//         title: 'Vestimenta',
//         text: 'Opte por tecidos leves e respiráveis em cores claras. Evite roupas escuras que absorvem mais calor.',
//         color: '#D4A373'
//       });
//     } else {
//       recommendations.push({
//         icon: Shirt,
//         title: 'Vestimenta',
//         text: 'Clima ameno. Camisa de manga longa leve é ideal para proteção solar sem desconforto térmico.',
//         color: '#D4A373'
//       });
//     }

//     // Break recommendation
//     if (currentConditions.temp > 28 || currentConditions.rainChance > 70) {
//       recommendations.push({
//         icon: Coffee,
//         title: 'Pausas Inteligentes',
//         text: 'Faça pausas a cada 45 min em local coberto. Hidrate-se com água ou isotônicos, evite bebidas açucaradas.',
//         color: '#6B9BD1'
//       });
//     }

//     return recommendations;
//   };

//   const recommendations = getAIRecommendations();

//   const handleGenerateMore = () => {
//     setIsGenerating(true);
//     setTimeout(() => {
//       setIsGenerating(false);
//     }, 1500);
//   };

//   return (
//     <div className={`rounded-3xl p-6 ${
//       isDark ? 'bg-[#1E1E1E]' : 'bg-gradient-to-br from-white to-gray-100'
//     } shadow-xl border border-white/10`}>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           <div className={`p-2.5 rounded-2xl ${
//             isDark ? 'bg-[#2A2A2A]' : 'bg-white/70'
//           } border border-white/10`}>
//             <Sparkles className="w-5 h-5 text-[#F5C542]" strokeWidth={2.5} />
//           </div>
//           <div>
//             <h3 className={`text-lg font-black ${
//               isDark ? 'text-[#E0E0E0]' : 'text-black'
//             }`}>
//               Assistente IA
//             </h3>
//             <p className={`text-xs font-bold ${
//               isDark ? 'text-[#A0A0A0]' : 'text-gray-500'
//             }`}>
//               Recomendações personalizadas
//             </p>
//           </div>
//         </div>
        
//         <button
//           onClick={handleGenerateMore}
//           disabled={isGenerating}
//           className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
//             isGenerating 
//               ? isDark ? 'bg-[#2A2A2A] text-[#A0A0A0]' : 'bg-gray-200 text-gray-400'
//               : isDark ? 'bg-[#F5C542]/20 text-[#F5C542] hover:bg-[#F5C542]/30' : 'bg-[#F5C542]/20 text-[#B8941F] hover:bg-[#F5C542]/30'
//           } border border-white/10`}
//         >
//           {isGenerating ? 'Analisando...' : 'Atualizar'}
//         </button>
//       </div>

//       {/* AI Recommendations */}
//       <div className="space-y-4">
//         {recommendations.map((rec, index) => {
//           const IconComponent = rec.icon;
//           return (
//             <div
//               key={index}
//               className={`rounded-2xl p-4 ${
//                 isDark ? 'bg-[#2A2A2A]' : 'bg-white/70'
//               } border border-white/10 transition-all ${
//                 isGenerating ? 'opacity-50 animate-pulse' : 'opacity-100'
//               }`}
//             >
//               <div className="flex gap-3">
//                 <div className="flex-shrink-0">
//                   <IconComponent 
//                     className="w-5 h-5 mt-0.5" 
//                     style={{ color: rec.color }}
//                     strokeWidth={2.5}
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <h4 className={`text-sm font-black mb-1.5 ${
//                     isDark ? 'text-[#E0E0E0]' : 'text-black'
//                   }`}>
//                     {rec.title}
//                   </h4>
//                   <p className={`text-sm font-medium leading-relaxed ${
//                     isDark ? 'text-[#A0A0A0]' : 'text-gray-600'
//                   }`}>
//                     {rec.text}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* AI Status Footer */}
//       <div className={`mt-5 pt-5 border-t ${
//         isDark ? 'border-white/10' : 'border-gray-200'
//       }`}>
//         <div className="flex items-center justify-center gap-2">
//           <div className="flex items-center gap-1.5">
//             <div className="w-2 h-2 rounded-full bg-[#6B9BD1] animate-pulse"></div>
//             <p className={`text-xs font-bold ${
//               isDark ? 'text-[#A0A0A0]' : 'text-gray-500'
//             }`}>
//               IA ativa · Análise em tempo real
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Sparkles, Clock, Shield, Shirt, Coffee, AlertTriangle, LucideIcon } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';

interface AIAssistantProps {
  isDark?: boolean;
  safetyLevel: 'safe' | 'caution' | 'danger';
  currentConditions: {
    temp: number;
    rainChance: number;
    windSpeed: number;
  };
}

// 1. Definimos o tipo de ícones que a API pode retornar
type IconNames = 'clock' | 'shield' | 'shirt' | 'coffee' | 'alert';

// 2. Definimos a interface da resposta esperada da API
interface APIRecommendation {
  iconName: IconNames;
  title: string;
  text: string;
  color: string;
}

// 3. Criamos um mapa para converter a string da API no componente do Lucide
const ICON_MAP: Record<IconNames, LucideIcon> = {
  clock: Clock,
  shield: Shield,
  shirt: Shirt,
  coffee: Coffee,
  alert: AlertTriangle,
};

export function AIAssistant({ isDark = true, safetyLevel, currentConditions }: AIAssistantProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<APIRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Função assíncrona para buscar os dados da API
  const fetchRecommendations = useCallback(async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Substitua pela URL real da sua API
      const response = await fetch('/api/get-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ safetyLevel, currentConditions }),
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar recomendações');
      }

      const data: APIRecommendation[] = await response.json();
      setRecommendations(data);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar as recomendações da IA no momento.');
    } finally {
      setIsGenerating(false);
    }
  }, [safetyLevel, currentConditions]);

  // Carrega as recomendações inicialmente e sempre que as condições mudarem drasticamente
  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const handleGenerateMore = () => {
    fetchRecommendations();
  };

  return (
    <div className={`rounded-3xl p-6 ${
      isDark ? 'bg-[#1E1E1E]' : 'bg-gradient-to-br from-white to-gray-100'
    } shadow-xl border border-white/10`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl ${
            isDark ? 'bg-[#2A2A2A]' : 'bg-white/70'
          } border border-white/10`}>
            <Sparkles className="w-5 h-5 text-[#F5C542]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className={`text-lg font-black ${
              isDark ? 'text-[#E0E0E0]' : 'text-black'
            }`}>
              Assistente IA
            </h3>
            <p className={`text-xs font-bold ${
              isDark ? 'text-[#A0A0A0]' : 'text-gray-500'
            }`}>
              Recomendações personalizadas
            </p>
          </div>
        </div>
        
        <button
          onClick={handleGenerateMore}
          disabled={isGenerating}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
            isGenerating 
              ? isDark ? 'bg-[#2A2A2A] text-[#A0A0A0]' : 'bg-gray-200 text-gray-400'
              : isDark ? 'bg-[#F5C542]/20 text-[#F5C542] hover:bg-[#F5C542]/30' : 'bg-[#F5C542]/20 text-[#B8941F] hover:bg-[#F5C542]/30'
          } border border-white/10`}
        >
          {isGenerating ? 'Analisando...' : 'Atualizar'}
        </button>
      </div>

      {/* Tratamento de Erro */}
      {error && (
        <div className="p-4 mb-4 text-sm text-red-400 bg-red-400/10 rounded-2xl border border-red-400/20">
          {error}
        </div>
      )}

      {/* AI Recommendations */}
      <div className="space-y-4">
        {/* Mostra mensagens de "Carregando" caso não tenha recomendações iniciais */}
        {isGenerating && recommendations.length === 0 && (
          <div className="text-center py-4 text-sm text-gray-500 animate-pulse">
            A IA está analisando as condições climáticas...
          </div>
        )}

        {recommendations.map((rec, index) => {
          // Mapeia a string que veio da API para o componente real
          const IconComponent = ICON_MAP[rec.iconName] || AlertTriangle; 
          
          return (
            <div
              key={index}
              className={`rounded-2xl p-4 ${
                isDark ? 'bg-[#2A2A2A]' : 'bg-white/70'
              } border border-white/10 transition-all ${
                isGenerating ? 'opacity-50 animate-pulse' : 'opacity-100'
              }`}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <IconComponent 
                    className="w-5 h-5 mt-0.5" 
                    style={{ color: rec.color }}
                    strokeWidth={2.5}
                  />
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-black mb-1.5 ${
                    isDark ? 'text-[#E0E0E0]' : 'text-black'
                  }`}>
                    {rec.title}
                  </h4>
                  <p className={`text-sm font-medium leading-relaxed ${
                    isDark ? 'text-[#A0A0A0]' : 'text-gray-600'
                  }`}>
                    {rec.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Status Footer */}
      <div className={`mt-5 pt-5 border-t ${
        isDark ? 'border-white/10' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-[#F5C542]' : 'bg-[#6B9BD1]'} animate-pulse`}></div>
            <p className={`text-xs font-bold ${
              isDark ? 'text-[#A0A0A0]' : 'text-gray-500'
            }`}>
              {isGenerating ? 'Processando dados...' : 'IA ativa · Análise em tempo real'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}