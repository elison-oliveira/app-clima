// import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
// import React from 'react';

// interface WorkSafetyIndicatorProps {
//   level: 'safe' | 'caution' | 'danger';
//   message: string;
// }

// export function WorkSafetyIndicator({ level, message }: WorkSafetyIndicatorProps) {
//   const configs = {
//     safe: {
//       bg: 'bg-[#00C9A7]',
//       icon: CheckCircle,
//       label: 'SEGURO PARA TRABALHAR',
//       textColor: 'text-gray-900'
//     },
//     caution: {
//       bg: 'bg-[#F5C542]', // Soft amber/gold
//       icon: AlertTriangle,
//       label: 'TRABALHE COM CAUTELA',
//       textColor: 'text-gray-900'
//     },
//     danger: {
//       bg: 'bg-[#E27D60]',
//       icon: XCircle,
//       label: 'CONDIÇÕES INSEGURAS',
//       textColor: 'text-gray-900'
//     }
//   };

//   const config = configs[level];
//   const Icon = config.icon;

//   return (
//     <div className={`${config.bg} rounded-3xl p-8 shadow-xl border border-white/10`}>
//       <div className="flex items-center gap-4 mb-4">
//         <Icon className={`w-9 h-9 ${config.textColor}`} strokeWidth={2.5} />
//         <h2 className={`text-2xl font-black ${config.textColor} tracking-tight`}>
//           {config.label}
//         </h2>
//       </div>
//       <p className={`text-base font-bold ${config.textColor} leading-relaxed opacity-90`}>
//         {message}
//       </p>
//     </div>
//   );
// }

import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import React from 'react';

// Aceitando as props passadas pelo App.tsx
interface WorkSafetyIndicatorProps {
  level: 'safe' | 'caution' | 'danger';
  message: string;
}

export function WorkSafetyIndicator({ level, message }: WorkSafetyIndicatorProps) {
  const configs = {
    safe: {
      bg: 'bg-[#00C9A7]',
      icon: CheckCircle,
      label: 'SEGURO PARA TRABALHAR',
      textColor: 'text-gray-900'
    },
    caution: {
      bg: 'bg-[#F5C542]', 
      icon: AlertTriangle,
      label: 'TRABALHE COM CAUTELA',
      textColor: 'text-gray-900'
    },
    danger: {
      bg: 'bg-[#E27D60]',
      icon: XCircle,
      label: 'CONDIÇÕES INSEGURAS',
      textColor: 'text-gray-900'
    }
  };

  const config = configs[level];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} rounded-3xl p-8 shadow-xl border border-white/10 transition-colors duration-500 min-h-[140px] flex flex-col justify-center`}>
      <div className="flex items-center gap-4 mb-4">
        <Icon className={`w-9 h-9 ${config.textColor}`} strokeWidth={2.5} />
        <h2 className={`text-2xl font-black ${config.textColor} tracking-tight`}>
          {config.label}
        </h2>
      </div>
      <p className={`text-base font-bold ${config.textColor} leading-relaxed opacity-90`}>
        {message}
      </p>
    </div>
  );
}