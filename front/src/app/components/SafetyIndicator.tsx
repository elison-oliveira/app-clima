// import { AlertTriangle, CheckCircle, XOctagon } from "lucide-react";
// import { motion } from "motion/react";
// import React from 'react';

// interface SafetyProps {
//   windSpeed: number; // mph
//   precipChance: number; // percentage
//   temp: number; // fahrenheit
// }

// export function SafetyIndicator({ windSpeed, precipChance, temp }: SafetyProps) {
//   let status: "safe" | "caution" | "stop" = "safe";
//   let message = "CONDITIONS OPTIMAL";
//   let color = "bg-green-500";
//   let Icon = CheckCircle;

//   if (windSpeed > 25 || precipChance > 70 || temp > 100 || temp < 20) {
//     status = "stop";
//     message = "STOP WORK RECOMMENDED";
//     color = "bg-red-600 animate-pulse";
//     Icon = XOctagon;
//   } else if (windSpeed > 15 || precipChance > 40 || temp > 85 || temp < 32) {
//     status = "caution";
//     message = "PROCEED WITH CAUTION";
//     color = "bg-yellow-500";
//     Icon = AlertTriangle;
//   }

//   return (
//     <motion.div
//       initial={{ scale: 0.95, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       className={`w-full rounded-3xl overflow-hidden shadow-lg border border-white/10 ${
//         status === "stop" ? "shadow-red-900/50" : status === "caution" ? "shadow-yellow-900/50" : "shadow-green-900/50"
//       }`}
//     >
//       <div className={`${color} p-6 flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden`}>
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
//         <Icon className="w-16 h-16 text-black drop-shadow-sm" strokeWidth={2.5} />
        
//         <div>
//           <h2 className="text-3xl font-black text-black tracking-tighter uppercase leading-none">
//             {status === "safe" ? "SAFE" : status === "caution" ? "CAUTION" : "DANGER"}
//           </h2>
//           <p className="font-bold text-black/80 text-sm tracking-wide mt-1 uppercase">
//             {message}
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }


import { AlertTriangle, CheckCircle, XOctagon, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import React, { useState, useEffect } from 'react';

// 1. Definimos a interface para os dados que virão da API
interface CurrentConditions {
  windSpeed: number; // mph
  precipChance: number; // percentage
  temp: number; // fahrenheit
}

interface SafetyIndicatorProps {
  // Opcional: para saber de onde buscar os dados
  locationId?: string; 
}

export function SafetyIndicator({ locationId = 'default' }: SafetyIndicatorProps) {
  const [conditions, setConditions] = useState<CurrentConditions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentConditions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Substitua pela sua rota de API real
        const response = await fetch(`/api/weather/current?location=${locationId}`);

        if (!response.ok) {
          throw new Error('Falha ao buscar condições de segurança');
        }

        const data: CurrentConditions = await response.json();
        setConditions(data);
      } catch (err) {
        console.error(err);
        setError('Erro ao verificar segurança.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentConditions();
  }, [locationId]);

  // Se estiver carregando, mostramos um "esqueleto" ou estado neutro animado
  if (isLoading) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full rounded-3xl overflow-hidden shadow-lg border border-white/10 bg-gray-800/50"
      >
        <div className="p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[160px]">
          <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
          <p className="font-bold text-gray-400 text-sm tracking-wide uppercase">
            Avaliando Condições...
          </p>
        </div>
      </motion.div>
    );
  }

  // Se der erro, mostramos um alerta discreto
  if (error || !conditions) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full rounded-3xl overflow-hidden shadow-lg border border-red-500/30 bg-red-900/20"
      >
        <div className="p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[160px]">
          <XOctagon className="w-10 h-10 text-red-400 opacity-80" />
          <p className="font-bold text-red-400 text-sm tracking-wide uppercase">
            {error || 'Dados indisponíveis'}
          </p>
        </div>
      </motion.div>
    );
  }

  // Lógica de cálculo baseada nos dados retornados pela API
  let status: "safe" | "caution" | "stop" = "safe";
  let message = "CONDITIONS OPTIMAL";
  let color = "bg-green-500";
  let Icon = CheckCircle;

  if (conditions.windSpeed > 25 || conditions.precipChance > 70 || conditions.temp > 100 || conditions.temp < 20) {
    status = "stop";
    message = "STOP WORK RECOMMENDED";
    color = "bg-red-600 animate-pulse";
    Icon = XOctagon;
  } else if (conditions.windSpeed > 15 || conditions.precipChance > 40 || conditions.temp > 85 || conditions.temp < 32) {
    status = "caution";
    message = "PROCEED WITH CAUTION";
    color = "bg-yellow-500";
    Icon = AlertTriangle;
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`w-full rounded-3xl overflow-hidden shadow-lg border border-white/10 ${
        status === "stop" ? "shadow-red-900/50" : status === "caution" ? "shadow-yellow-900/50" : "shadow-green-900/50"
      }`}
    >
      <div className={`${color} p-6 flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden min-h-[160px] transition-colors duration-500`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <Icon className="w-16 h-16 text-black drop-shadow-sm" strokeWidth={2.5} />
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-black tracking-tighter uppercase leading-none">
            {status === "safe" ? "SAFE" : status === "caution" ? "CAUTION" : "DANGER"}
          </h2>
          <p className="font-bold text-black/80 text-sm tracking-wide mt-1 uppercase">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}