// import { MapPin, Navigation, Layers } from "lucide-react";
// import { motion } from "motion/react";
// import { clsx } from "clsx";
// import { useState } from "react";

// export default function Radar() {
//   const [activeLayer, setActiveLayer] = useState<"rain" | "wind" | "temp">("rain");

//   return (
//     <div className="h-full flex flex-col min-h-[80vh] relative">
//       <div className="absolute inset-0 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
//         {/* Mock Map Background */}
//         <div className="w-full h-full bg-[#1e232e] relative opacity-50">
//           {/* Grid lines to simulate map */}
//           <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none">
//             {Array.from({ length: 36 }).map((_, i) => (
//               <div key={i} className="border-[0.5px] border-slate-700/30"></div>
//             ))}
//           </div>
          
//           {/* Mock Terrain Blobs */}
//           <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-slate-700 rounded-full blur-3xl opacity-40"></div>
//           <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-slate-600 rounded-full blur-3xl opacity-30"></div>
//         </div>

//         {/* Weather Overlays */}
//         <div className="absolute inset-0">
//           {activeLayer === "rain" && (
//             <motion.div 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 1 }}
//               className="w-full h-full relative"
//             >
//               {/* Rain Blob 1 */}
//               <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-blue-500/30 rounded-full blur-2xl animate-pulse"></div>
//               {/* Rain Blob 2 */}
//               <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-green-500/20 rounded-full blur-xl"></div>
//             </motion.div>
//           )}
          
//           {activeLayer === "wind" && (
//             <motion.div 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 1 }}
//               className="w-full h-full relative"
//             >
//               {/* Wind Lines Mock */}
//                <svg className="w-full h-full absolute inset-0 opacity-40">
//                   <path d="M50,50 Q100,100 150,50" stroke="white" strokeWidth="2" fill="none" className="animate-pulse" />
//                   <path d="M100,200 Q150,250 200,200" stroke="white" strokeWidth="2" fill="none" />
//                   <path d="M200,100 Q250,50 300,100" stroke="white" strokeWidth="2" fill="none" />
//                </svg>
//             </motion.div>
//           )}

//           {/* User Location Marker */}
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//             <div className="relative">
//               <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-10 relative"></div>
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500/20 rounded-full animate-ping"></div>
//             </div>
//           </div>
//         </div>

//         {/* Controls Overlay */}
//         <div className="absolute top-4 right-4 flex flex-col gap-2">
//           <button className="w-10 h-10 bg-slate-900/80 backdrop-blur text-white rounded-lg flex items-center justify-center border border-slate-700 shadow-lg active:scale-95 transition-transform">
//             <Layers size={20} />
//           </button>
//           <button className="w-10 h-10 bg-slate-900/80 backdrop-blur text-white rounded-lg flex items-center justify-center border border-slate-700 shadow-lg active:scale-95 transition-transform">
//             <Navigation size={20} />
//           </button>
//         </div>

//         {/* Legend */}
//         <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl p-3">
//           <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
//             <span>Radar Intensity</span>
//             <span>Live</span>
//           </div>
//           <div className="h-2 w-full rounded-full bg-gradient-to-r from-blue-900 via-blue-500 to-green-400"></div>
//           <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-medium">
//             <span>Light</span>
//             <span>Moderate</span>
//             <span>Heavy</span>
//           </div>
//         </div>
//       </div>

//       {/* Layer Selector */}
//       <div className="mt-4 grid grid-cols-3 gap-2">
//         {(["rain", "wind", "temp"] as const).map((layer) => (
//           <button
//             key={layer}
//             onClick={() => setActiveLayer(layer)}
//             className={clsx(
//               "py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-wide transition-all",
//               activeLayer === layer
//                 ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
//                 : "bg-slate-800 text-slate-400 hover:bg-slate-700"
//             )}
//           >
//             {layer}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
