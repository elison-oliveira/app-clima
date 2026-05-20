// import { Droplets, Wind } from 'lucide-react';
// import React from 'react';

// interface HourData {
//   time: string;
//   temp: number;
//   rainChance: number;
//   windSpeed: number;
// }

// interface HourlyForecastProps {
//   hours: HourData[];
//   isDark: boolean;
// }

// export function HourlyForecast({ hours, isDark }: HourlyForecastProps) {
//   return (
//     <div className={`rounded-3xl p-7 ${isDark ? 'bg-[#1E1E1E]' : 'bg-white'} shadow-xl border border-white/10`}>
//       <h3 className={`text-xl font-black mb-6 ${isDark ? 'text-[#E0E0E0]' : 'text-black'}`}>
//         PREVISÃO POR HORA
//       </h3>
//       <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
//         {hours.map((hour, index) => (
//           <div
//             key={index}
//             className={`flex-shrink-0 rounded-2xl p-5 min-w-[110px] ${
//               isDark ? 'bg-[#2A2A2A]' : 'bg-gray-100'
//             } border border-white/10`}
//           >
//             <p className={`text-sm font-black mb-4 ${isDark ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
//               {hour.time}
//             </p>
//             <p className={`text-3xl font-black mb-4 ${isDark ? 'text-[#E0E0E0]' : 'text-black'}`}>
//               {hour.temp}°
//             </p>
//             <div className="space-y-2.5">
//               <div className="flex items-center gap-1.5">
//                 <Droplets className="w-4 h-4 text-[#6B9BD1]" strokeWidth={2.5} />
//                 <span className={`text-sm font-bold ${isDark ? 'text-[#E0E0E0]' : 'text-black'}`}>
//                   {hour.rainChance}%
//                 </span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <Wind className="w-4 h-4 text-[#D4A373]" strokeWidth={2.5} />
//                 <span className={`text-sm font-bold ${isDark ? 'text-[#E0E0E0]' : 'text-black'}`}>
//                   {hour.windSpeed}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { Droplets, Wind } from 'lucide-react';
import React from 'react';

interface HourData {
  time: string;
  temp: number;
  rainChance: number;
  windSpeed: number;
}

// Aceitando as props passadas pelo App.tsx
interface HourlyForecastProps {
  hours: HourData[];
  isDark?: boolean;
}

export function HourlyForecast({ hours, isDark = true }: HourlyForecastProps) {
  return (
    <div className={`rounded-3xl p-7 ${isDark ? 'bg-[#1E1E1E]' : 'bg-white'} shadow-xl border border-white/10`}>
      <h3 className={`text-xl font-black mb-6 ${isDark ? 'text-[#E0E0E0]' : 'text-black'}`}>
        PREVISÃO POR HORA
      </h3>
      
      {/* Caso o array venha vazio da API principal */}
      {hours.length === 0 ? (
        <p className={`text-sm font-bold text-center py-6 ${isDark ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
          Nenhum dado disponível.
        </p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {hours.map((hour, index) => (
            <div
              key={index}
              className={`flex-shrink-0 rounded-2xl p-5 min-w-[110px] ${
                isDark ? 'bg-[#2A2A2A]' : 'bg-gray-100'
              } border border-white/10 transition-transform hover:-translate-y-1`}
            >
              <p className={`text-sm font-black mb-4 ${isDark ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
                {hour.time}
              </p>
              <p className={`text-3xl font-black mb-4 ${isDark ? 'text-[#E0E0E0]' : 'text-black'}`}>
                {hour.temp}°
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-[#6B9BD1]" strokeWidth={2.5} />
                  <span className={`text-sm font-bold ${isDark ? 'text-[#E0E0E0]' : 'text-black'}`}>
                    {hour.rainChance}%
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-[#D4A373]" strokeWidth={2.5} />
                  <span className={`text-sm font-bold ${isDark ? 'text-[#E0E0E0]' : 'text-black'}`}>
                    {hour.windSpeed} km/h
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}