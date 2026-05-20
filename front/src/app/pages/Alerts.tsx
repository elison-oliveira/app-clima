// import { TriangleAlert, CloudLightning, Wind, ThermometerSun } from "lucide-react";
// import { clsx } from "clsx";
// import React from 'react';

// const alerts = [
//   {
//     id: 1,
//     type: "warning",
//     icon: Wind,
//     title: "High Wind Advisory",
//     time: "Valid until 6:00 PM",
//     desc: "Wind gusts up to 45 km/h expected. Secure loose materials on upper levels. Crane operations suspended.",
//     color: "yellow"
//   },
//   {
//     id: 2,
//     type: "info",
//     icon: CloudLightning,
//     title: "Storm Watch",
//     time: "Starting 7:00 PM",
//     desc: "Potential electrical storm approaching from the West. Monitor updates hourly.",
//     color: "blue"
//   },
//   {
//     id: 3,
//     type: "critical",
//     icon: ThermometerSun,
//     title: "Heat Index Warning",
//     time: "12:00 PM - 3:00 PM",
//     desc: "Feels like 38°C. Mandatory hydration breaks every 45 minutes required for outdoor personnel.",
//     color: "red"
//   }
// ];

// export default function Alerts() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Safety Alerts</h2>
//         <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded-full border border-red-500/20">
//           3 Active
//         </span>
//       </div>

//       <div className="space-y-4">
//         {alerts.map((alert) => (
//           <div 
//             key={alert.id}
//             className={clsx(
//               "relative overflow-hidden rounded-xl border p-5",
//               alert.color === "yellow" && "bg-yellow-950/30 border-yellow-500/30",
//               alert.color === "blue" && "bg-blue-950/30 border-blue-500/30",
//               alert.color === "red" && "bg-red-950/30 border-red-500/30"
//             )}
//           >
//             {/* Colored Accent Line */}
//             <div className={clsx(
//               "absolute left-0 top-0 bottom-0 w-1",
//               alert.color === "yellow" && "bg-yellow-500",
//               alert.color === "blue" && "bg-blue-500",
//               alert.color === "red" && "bg-red-500"
//             )}></div>

//             <div className="flex items-start gap-4">
//               <div className={clsx(
//                 "p-3 rounded-lg",
//                 alert.color === "yellow" && "bg-yellow-500/10 text-yellow-500",
//                 alert.color === "blue" && "bg-blue-500/10 text-blue-500",
//                 alert.color === "red" && "bg-red-500/10 text-red-500"
//               )}>
//                 <alert.icon size={24} />
//               </div>
              
//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <h3 className={clsx(
//                     "font-bold text-lg",
//                     alert.color === "yellow" && "text-yellow-100",
//                     alert.color === "blue" && "text-blue-100",
//                     alert.color === "red" && "text-red-100"
//                   )}>
//                     {alert.title}
//                   </h3>
//                 </div>
//                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1 mb-2">
//                   {alert.time}
//                 </p>
//                 <p className="text-slate-300 text-sm leading-relaxed">
//                   {alert.desc}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mt-8">
//         <h3 className="font-bold text-white mb-2 flex items-center gap-2">
//           <TriangleAlert className="text-orange-500" size={18} />
//           Protocol Reminder
//         </h3>
//         <p className="text-sm text-slate-400">
//           If conditions worsen rapidly, proceed immediately to the designated safe zone in Sector B. Do not use elevators.
//         </p>
//       </div>
//     </div>
//   );
// }


import { TriangleAlert, CloudLightning, Wind, ThermometerSun, Loader2, AlertCircle, LucideIcon } from "lucide-react";
import { clsx } from "clsx";
import React, { useState, useEffect } from 'react';

// 1. Tipamos os nomes dos ícones que a API pode devolver
type IconName = 'wind' | 'lightning' | 'thermometer';
type AlertColor = 'yellow' | 'blue' | 'red';

// 2. Interface da resposta da API
interface APIAlert {
  id: number | string;
  type: string;
  iconName: IconName;
  title: string;
  time: string;
  desc: string;
  color: AlertColor;
}

// 3. Mapa de ícones para converter a string da API no componente visual
const ICON_MAP: Record<IconName, LucideIcon> = {
  wind: Wind,
  lightning: CloudLightning,
  thermometer: ThermometerSun,
};

interface AlertsProps {
  locationId?: string;
}

export default function Alerts({ locationId = 'default' }: AlertsProps) {
  const [alerts, setAlerts] = useState<APIAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Substitua pela sua rota real de API
        const response = await fetch(`http://localhost:8080/api/clima/alerts?cidade=${locationId}`);

        if (!response.ok) {
          throw new Error('Falha ao buscar alertas ativos.');
        }

        const data: APIAlert[] = await response.json();
        setAlerts(data);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar os alertas no momento.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, [locationId]);

  return (
    <div className="space-y-6">
      {/* Header com contador dinâmico */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Safety Alerts</h2>
        {!isLoading && !error && alerts.length > 0 && (
          <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded-full border border-red-500/20 animate-pulse">
            {alerts.length} Active
          </span>
        )}
      </div>

      <div className="space-y-4 min-h-[200px]">
        {/* Estado de Carregamento */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 border border-slate-800 border-dashed rounded-xl bg-slate-900/50">
            <Loader2 className="w-8 h-8 text-slate-500 animate-spin mb-3" />
            <p className="text-sm font-bold text-slate-500">Buscando alertas de segurança...</p>
          </div>
        )}

        {/* Estado de Erro */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-10 border border-red-900/50 rounded-xl bg-red-950/20">
            <AlertCircle className="w-10 h-10 text-red-500 mb-3 opacity-80" />
            <p className="text-sm font-bold text-red-400">{error}</p>
          </div>
        )}

        {/* Estado Vazio (Sem alertas) */}
        {!isLoading && !error && alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 border border-green-900/30 rounded-xl bg-green-950/10">
            <p className="text-sm font-bold text-green-500">Nenhum alerta crítico no momento.</p>
          </div>
        )}

        {/* Lista de Alertas da API */}
        {!isLoading && !error && alerts.map((alert) => {
          // Pega o ícone do mapa, ou usa o TriangleAlert como fallback caso a API mande um nome inválido
          const AlertIcon = ICON_MAP[alert.iconName] || TriangleAlert;

          return (
            <div 
              key={alert.id}
              className={clsx(
                "relative overflow-hidden rounded-xl border p-5 transition-all hover:bg-opacity-80",
                alert.color === "yellow" && "bg-yellow-950/30 border-yellow-500/30",
                alert.color === "blue" && "bg-blue-950/30 border-blue-500/30",
                alert.color === "red" && "bg-red-950/30 border-red-500/30"
              )}
            >
              {/* Colored Accent Line */}
              <div className={clsx(
                "absolute left-0 top-0 bottom-0 w-1",
                alert.color === "yellow" && "bg-yellow-500",
                alert.color === "blue" && "bg-blue-500",
                alert.color === "red" && "bg-red-500"
              )}></div>

              <div className="flex items-start gap-4">
                <div className={clsx(
                  "p-3 rounded-lg flex-shrink-0",
                  alert.color === "yellow" && "bg-yellow-500/10 text-yellow-500",
                  alert.color === "blue" && "bg-blue-500/10 text-blue-500",
                  alert.color === "red" && "bg-red-500/10 text-red-500"
                )}>
                  <AlertIcon size={24} />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={clsx(
                      "font-bold text-lg",
                      alert.color === "yellow" && "text-yellow-100",
                      alert.color === "blue" && "text-blue-100",
                      alert.color === "red" && "text-red-100"
                    )}>
                      {alert.title}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1 mb-2">
                    {alert.time}
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {alert.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Protocol Reminder Estático */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mt-8">
        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
          <TriangleAlert className="text-orange-500" size={18} />
          Protocol Reminder
        </h3>
        <p className="text-sm text-slate-400">
          If conditions worsen rapidly, proceed immediately to the designated safe zone in Sector B. Do not use elevators.
        </p>
      </div>
    </div>
  );
}