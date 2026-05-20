// import { 
//   CloudRain, 
//   Wind, 
//   Thermometer, 
//   Droplets, 
//   Eye, 
//   Sun,
//   Umbrella,
//   Navigation
// } from "lucide-react";
// import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { motion } from "motion/react";
// import { clsx } from "clsx";
// import React from "react";

// // Mock Data
// const hourlyData = [
//   { time: "Now", temp: 24, rain: 10 },
//   { time: "1 PM", temp: 25, rain: 5 },
//   { time: "2 PM", temp: 26, rain: 0 },
//   { time: "3 PM", temp: 26, rain: 0 },
//   { time: "4 PM", temp: 25, rain: 15 },
//   { time: "5 PM", temp: 24, rain: 45 },
//   { time: "6 PM", temp: 23, rain: 80 },
//   { time: "7 PM", temp: 22, rain: 90 },
// ];

// const SafetyStatus = ({ status }: { status: "safe" | "caution" | "danger" }) => {
//   const config = {
//     safe: {
//       color: "bg-green-500",
//       text: "text-green-500",
//       border: "border-green-500/20",
//       bgSoft: "bg-green-500/10",
//       label: "Safe to Work",
//       desc: "Conditions are optimal for outdoor work."
//     },
//     caution: {
//       color: "bg-yellow-500",
//       text: "text-yellow-500",
//       border: "border-yellow-500/20",
//       bgSoft: "bg-yellow-500/10",
//       label: "Proceed with Caution",
//       desc: "High winds expected. Secure loose items."
//     },
//     danger: {
//       color: "bg-red-500",
//       text: "text-red-500",
//       border: "border-red-500/20",
//       bgSoft: "bg-red-500/10",
//       label: "Stop Work",
//       desc: "Lightning detected within 5km radius."
//     }
//   };

//   const current = config[status];

//   return (
//     <div className={clsx("rounded-xl p-4 border", current.border, current.bgSoft)}>
//       <div className="flex items-start justify-between">
//         <div>
//           <h3 className={clsx("text-lg font-bold uppercase tracking-wide", current.text)}>
//             {current.label}
//           </h3>
//           <p className="text-slate-300 text-sm mt-1 leading-snug">
//             {current.desc}
//           </p>
//         </div>
//         <div className={clsx("w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_currentColor]", current.color)} />
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ icon: Icon, label, value, subtext, highlight = false }: any) => (
//   <div className={clsx(
//     "p-4 rounded-xl border flex flex-col justify-between aspect-square",
//     highlight 
//       ? "bg-blue-600 border-blue-500 text-white" 
//       : "bg-slate-900 border-slate-800 text-slate-100"
//   )}>
//     <div className="flex justify-between items-start">
//       <Icon className={clsx("w-6 h-6", highlight ? "text-blue-200" : "text-slate-400")} />
//       {highlight && <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded text-white">LIVE</span>}
//     </div>
//     <div>
//       <div className="text-2xl font-bold tracking-tight">{value}</div>
//       <div className={clsx("text-xs font-medium uppercase mt-1", highlight ? "text-blue-100" : "text-slate-400")}>{label}</div>
//       {subtext && <div className="text-[10px] opacity-70 mt-1">{subtext}</div>}
//     </div>
//   </div>
// );

// export default function Home() {
//   return (
//     <div className="space-y-6">
//       {/* Safety Indicator */}
//       <motion.div 
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <SafetyStatus status="safe" />
//       </motion.div>

//       {/* Main Weather Display */}
//       <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white shadow-lg shadow-blue-900/20">
//         <div className="absolute top-0 right-0 p-4 opacity-10">
//           <CloudRain size={120} />
//         </div>
        
//         <div className="relative z-10 flex flex-col items-center text-center py-4">
//           <div className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2 uppercase tracking-wider">
//             <Navigation size={14} className="text-orange-400" />
//             North-East Wind 12km/h
//           </div>
//           <h2 className="text-7xl font-black tracking-tighter drop-shadow-sm">
//             24°
//           </h2>
//           <p className="text-xl font-medium text-blue-100 mt-1">Partly Cloudy</p>
          
//           <div className="flex gap-6 mt-6">
//             <div className="flex flex-col items-center">
//               <span className="text-blue-200 text-xs uppercase font-bold">Feels Like</span>
//               <span className="font-bold text-lg">26°</span>
//             </div>
//             <div className="w-px bg-blue-500/50"></div>
//             <div className="flex flex-col items-center">
//               <span className="text-blue-200 text-xs uppercase font-bold">Precip</span>
//               <span className="font-bold text-lg">10%</span>
//             </div>
//             <div className="w-px bg-blue-500/50"></div>
//             <div className="flex flex-col items-center">
//               <span className="text-blue-200 text-xs uppercase font-bold">Humidity</span>
//               <span className="font-bold text-lg">42%</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Hourly Forecast Chart */}
//       <section>
//         <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 px-1">Hourly Forecast</h3>
//         <div className="h-40 w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={hourlyData}>
//               <defs>
//                 <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
//                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <Tooltip 
//                 contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
//                 itemStyle={{ color: '#94a3b8' }}
//                 labelStyle={{ color: '#fff', fontWeight: 'bold' }}
//               />
//               <XAxis 
//                 dataKey="time" 
//                 tick={{ fill: '#64748b', fontSize: 10 }} 
//                 tickLine={false}
//                 axisLine={false}
//               />
//               <Area 
//                 type="monotone" 
//                 dataKey="temp" 
//                 stroke="#3b82f6" 
//                 strokeWidth={3}
//                 fillOpacity={1} 
//                 fill="url(#colorTemp)" 
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </section>

//       {/* Grid Stats */}
//       <section className="grid grid-cols-2 gap-3">
//         <StatCard 
//           icon={Wind} 
//           label="Wind Gusts" 
//           value="18 km/h" 
//           subtext="Direction: NE"
//           highlight={true}
//         />
//         <StatCard 
//           icon={Droplets} 
//           label="Rain Radar" 
//           value="0.2 mm" 
//           subtext="Next hour forecast" 
//         />
//         <StatCard 
//           icon={Sun} 
//           label="UV Index" 
//           value="6.2" 
//           subtext="High - Wear protection" 
//         />
//         <StatCard 
//           icon={Eye} 
//           label="Visibility" 
//           value="12 km" 
//           subtext="Clear conditions" 
//         />
//       </section>
//     </div>
//   );
// }


import { 
  CloudRain, 
  Wind, 
  Droplets, 
  Eye, 
  Sun,
  Navigation,
  Loader2,
  AlertCircle
} from "lucide-react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";
import { clsx } from "clsx";
import React, { useState, useEffect } from "react";

// 1. Definimos a interface completa que a nossa API deve retornar
interface HourlyData {
  time: string;
  temp: number;
  rain: number;
}

interface DashboardData {
  safetyStatus: "safe" | "caution" | "danger";
  currentWeather: {
    temp: number;
    condition: string;
    windDirection: string;
    windSpeed: number; // km/h
    feelsLike: number;
    precipChance: number; // %
    humidity: number; // %
  };
  hourlyForecast: HourlyData[];
  stats: {
    windGusts: { value: string; subtext: string };
    rainRadar: { value: string; subtext: string };
    uvIndex: { value: string; subtext: string };
    visibility: { value: string; subtext: string };
  };
}

// Subcomponente de Segurança (Mantive puro, dependendo apenas da prop)
const SafetyStatus = ({ status }: { status: "safe" | "caution" | "danger" }) => {
  const config = {
    safe: {
      color: "bg-green-500",
      text: "text-green-500",
      border: "border-green-500/20",
      bgSoft: "bg-green-500/10",
      label: "Safe to Work",
      desc: "Conditions are optimal for outdoor work."
    },
    caution: {
      color: "bg-yellow-500",
      text: "text-yellow-500",
      border: "border-yellow-500/20",
      bgSoft: "bg-yellow-500/10",
      label: "Proceed with Caution",
      desc: "High winds expected. Secure loose items."
    },
    danger: {
      color: "bg-red-500",
      text: "text-red-500",
      border: "border-red-500/20",
      bgSoft: "bg-red-500/10",
      label: "Stop Work",
      desc: "Lightning detected within 5km radius."
    }
  };

  const current = config[status];

  return (
    <div className={clsx("rounded-xl p-4 border", current.border, current.bgSoft)}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className={clsx("text-lg font-bold uppercase tracking-wide", current.text)}>
            {current.label}
          </h3>
          <p className="text-slate-300 text-sm mt-1 leading-snug">
            {current.desc}
          </p>
        </div>
        <div className={clsx("w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_currentColor]", current.color)} />
      </div>
    </div>
  );
};

// Subcomponente de Card de Estatística
const StatCard = ({ icon: Icon, label, value, subtext, highlight = false }: any) => (
  <div className={clsx(
    "p-4 rounded-xl border flex flex-col justify-between aspect-square transition-all hover:scale-[1.02]",
    highlight 
      ? "bg-blue-600 border-blue-500 text-white" 
      : "bg-slate-900 border-slate-800 text-slate-100"
  )}>
    <div className="flex justify-between items-start">
      <Icon className={clsx("w-6 h-6", highlight ? "text-blue-200" : "text-slate-400")} />
      {highlight && <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded text-white animate-pulse">LIVE</span>}
    </div>
    <div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      <div className={clsx("text-xs font-medium uppercase mt-1", highlight ? "text-blue-100" : "text-slate-400")}>{label}</div>
      {subtext && <div className="text-[10px] opacity-70 mt-1">{subtext}</div>}
    </div>
  </div>
);

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Substitua por sua rota real. Exemplo: /api/weather/dashboard-summary
        const response = await fetch('http://localhost:8080/api/dashboard/summary');
        
        if (!response.ok) throw new Error('Falha ao sincronizar dados do painel.');
        
        const result: DashboardData = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar os dados em tempo real.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
    
    // Opcional: Atualizar os dados a cada 5 minutos
    // const interval = setInterval(fetchDashboard, 300000);
    // return () => clearInterval(interval);
  }, []);

  // Tela de Carregamento Global
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-slate-400 font-bold tracking-wide uppercase text-sm animate-pulse">Sincronizando Sensores...</p>
      </div>
    );
  }

  // Tela de Erro Global
  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4 text-center px-6">
        <AlertCircle className="w-16 h-16 text-red-500/80" />
        <h2 className="text-xl font-bold text-slate-200">Conexão Perdida</h2>
        <p className="text-slate-400 text-sm max-w-sm">{error || "Erro desconhecido"}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full text-sm font-bold transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  // Desestruturando os dados para facilitar o uso no JSX
  const { safetyStatus, currentWeather, hourlyForecast, stats } = data;

  return (
    <div className="space-y-6">
      {/* Safety Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <SafetyStatus status={safetyStatus} />
      </motion.div>

      {/* Main Weather Display */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white shadow-lg shadow-blue-900/20">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <CloudRain size={120} />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center py-4">
          <div className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2 uppercase tracking-wider">
            <Navigation size={14} className="text-orange-400" />
            {currentWeather.windDirection} Wind {currentWeather.windSpeed}km/h
          </div>
          <h2 className="text-7xl font-black tracking-tighter drop-shadow-sm">
            {currentWeather.temp}°
          </h2>
          <p className="text-xl font-medium text-blue-100 mt-1">{currentWeather.condition}</p>
          
          <div className="flex gap-6 mt-6">
            <div className="flex flex-col items-center">
              <span className="text-blue-200 text-xs uppercase font-bold">Feels Like</span>
              <span className="font-bold text-lg">{currentWeather.feelsLike}°</span>
            </div>
            <div className="w-px bg-blue-500/50"></div>
            <div className="flex flex-col items-center">
              <span className="text-blue-200 text-xs uppercase font-bold">Precip</span>
              <span className="font-bold text-lg">{currentWeather.precipChance}%</span>
            </div>
            <div className="w-px bg-blue-500/50"></div>
            <div className="flex flex-col items-center">
              <span className="text-blue-200 text-xs uppercase font-bold">Humidity</span>
              <span className="font-bold text-lg">{currentWeather.humidity}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hourly Forecast Chart */}
      <section>
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 px-1">Hourly Forecast</h3>
        <div className="h-40 w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            {/* Agora usando os dados da API */}
            <AreaChart data={hourlyForecast}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#94a3b8' }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#64748b', fontSize: 10 }} 
                tickLine={false}
                axisLine={false}
              />
              <Area 
                type="monotone" 
                dataKey="temp" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorTemp)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Grid Stats */}
      <section className="grid grid-cols-2 gap-3">
        <StatCard 
          icon={Wind} 
          label="Wind Gusts" 
          value={stats.windGusts.value} 
          subtext={stats.windGusts.subtext}
          highlight={true}
        />
        <StatCard 
          icon={Droplets} 
          label="Rain Radar" 
          value={stats.rainRadar.value} 
          subtext={stats.rainRadar.subtext} 
        />
        <StatCard 
          icon={Sun} 
          label="UV Index" 
          value={stats.uvIndex.value} 
          subtext={stats.uvIndex.subtext} 
        />
        <StatCard 
          icon={Eye} 
          label="Visibility" 
          value={stats.visibility.value} 
          subtext={stats.visibility.subtext} 
        />
      </section>
    </div>
  );
}