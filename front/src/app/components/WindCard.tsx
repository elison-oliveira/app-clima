// import { Wind } from "lucide-react";
// import { motion } from "motion/react";
// import React from 'react';

// interface WindProps {
//   speed: number; // mph
//   direction: string; // N, NE, E, SE, etc.
// }

// export function WindCard({ speed, direction }: WindProps) {
//   // Simple rotation logic based on direction string
//   const rotationMap: Record<string, number> = {
//     N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315
//   };
//   const rotation = rotationMap[direction] || 0;

//   return (
//     <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-5 border border-zinc-800 shadow-lg relative overflow-hidden group">
//       <div className="absolute top-0 right-0 p-3 opacity-20">
//         <Wind className="w-12 h-12 text-zinc-500" />
//       </div>
      
//       <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Wind Speed</h3>
      
//       <div className="flex items-end gap-1">
//         <span className="text-5xl font-black tracking-tighter text-white">
//           {speed}
//         </span>
//         <span className="text-lg font-bold text-zinc-400 mb-1">MPH</span>
//       </div>

//       <div className="mt-4 flex items-center gap-3">
//         <div className="relative w-10 h-10 border-2 border-zinc-700 rounded-full flex items-center justify-center bg-zinc-800/50">
//           <motion.div
//             initial={{ rotate: rotation - 45 }}
//             animate={{ rotate: rotation }}
//             transition={{ duration: 1, type: "spring" }}
//           >
//             <svg 
//               width="24" 
//               height="24" 
//               viewBox="0 0 24 24" 
//               fill="none" 
//               stroke="currentColor" 
//               strokeWidth="2" 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               className="text-orange-500"
//             >
//               <line x1="12" y1="19" x2="12" y2="5" />
//               <polyline points="5 12 12 5 19 12" />
//             </svg>
//           </motion.div>
//         </div>
//         <span className="text-xl font-bold text-zinc-300 tracking-wide">{direction}</span>
//       </div>
      
//       {/* Dynamic Background Effect based on speed */}
//       {speed > 15 && (
//         <div className="absolute inset-0 bg-orange-500/5 animate-pulse mix-blend-overlay pointer-events-none" />
//       )}
//     </div>
//   );
// }

import { Wind, Loader2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import React, { useState, useEffect } from 'react';

// 1. Interface para os dados vindos da API
interface WindData {
  speed: number;
  direction: string;
}

interface WindCardProps {
  locationId?: string;
}

export function WindCard({ locationId = 'default' }: WindCardProps) {
  const [windData, setWindData] = useState<WindData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWindData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Exemplo: buscando da mesma rota que o SafetyIndicator, mas pegando só o que importa
        const response = await fetch(`/api/weather/current?location=${locationId}`);

        if (!response.ok) {
          throw new Error('Falha ao buscar dados do vento');
        }

        const data = await response.json();
        
        // Mapeando a resposta da API para o nosso estado
        setWindData({
          speed: data.windSpeed,
          direction: data.windDirection || 'N' // Fallback caso a API não retorne direção
        });
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar dados');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWindData();
  }, [locationId]);

  // Mapa de rotação
  const rotationMap: Record<string, number> = {
    N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315
  };

  // Estado de Carregamento
  if (isLoading) {
    return (
      <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-5 border border-zinc-800 shadow-lg relative overflow-hidden min-h-[160px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin opacity-50" />
      </div>
    );
  }

  // Estado de Erro
  if (error || !windData) {
    return (
      <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-5 border border-red-900/30 shadow-lg relative overflow-hidden min-h-[160px] flex flex-col items-center justify-center gap-2">
        <AlertCircle className="w-6 h-6 text-red-500 opacity-80" />
        <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{error || 'Sem dados'}</span>
      </div>
    );
  }

  const { speed, direction } = windData;
  const rotation = rotationMap[direction] || 0;

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-5 border border-zinc-800 shadow-lg relative overflow-hidden group min-h-[160px]">
      <div className="absolute top-0 right-0 p-3 opacity-20">
        <Wind className="w-12 h-12 text-zinc-500" />
      </div>
      
      <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Wind Speed</h3>
      
      <div className="flex items-end gap-1">
        <span className="text-5xl font-black tracking-tighter text-white">
          {speed}
        </span>
        <span className="text-lg font-bold text-zinc-400 mb-1">MPH</span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="relative w-10 h-10 border-2 border-zinc-700 rounded-full flex items-center justify-center bg-zinc-800/50">
          <motion.div
            initial={{ rotate: rotation - 45 }}
            animate={{ rotate: rotation }}
            transition={{ duration: 1, type: "spring" }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-orange-500"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </motion.div>
        </div>
        <span className="text-xl font-bold text-zinc-300 tracking-wide">{direction}</span>
      </div>
      
      {/* Efeito dinâmico baseado na velocidade puxada da API */}
      {speed > 15 && (
        <div className="absolute inset-0 bg-orange-500/5 animate-pulse mix-blend-overlay pointer-events-none" />
      )}
    </div>
  );
}