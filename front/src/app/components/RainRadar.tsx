// import { useEffect, useRef, useState } from 'react';

// interface RainRadarProps {
//   isDark: boolean;
// }

// export function RainRadar({ isDark }: RainRadarProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [animationFrame, setAnimationFrame] = useState(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     // Set canvas size
//     const size = 280;
//     canvas.width = size;
//     canvas.height = size;

//     // Clear canvas
//     ctx.clearRect(0, 0, size, size);

//     // Draw background
//     ctx.fillStyle = isDark ? '#2a2a2a' : '#f3f4f6';
//     ctx.fillRect(0, 0, size, size);

//     // Draw concentric circles (radar grid)
//     const centerX = size / 2;
//     const centerY = size / 2;
    
//     ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : '#d1d5db';
//     ctx.lineWidth = 2;
    
//     for (let i = 1; i <= 3; i++) {
//       ctx.beginPath();
//       ctx.arc(centerX, centerY, (size / 2) * (i / 3), 0, Math.PI * 2);
//       ctx.stroke();
//     }

//     // Draw crosshairs
//     ctx.beginPath();
//     ctx.moveTo(0, centerY);
//     ctx.lineTo(size, centerY);
//     ctx.moveTo(centerX, 0);
//     ctx.lineTo(centerX, size);
//     ctx.stroke();

//     // Draw animated rain cells
//     const time = animationFrame * 0.05;
    
//     // Multiple rain cells with different intensities - SOFTER COLORS
//     const rainCells = [
//       { x: 0.3, y: 0.4, intensity: 0.7, size: 0.3 },
//       { x: 0.6, y: 0.3, intensity: 0.5, size: 0.2 },
//       { x: 0.5, y: 0.6, intensity: 0.9, size: 0.25 },
//       { x: 0.7, y: 0.5, intensity: 0.4, size: 0.15 },
//     ];

//     rainCells.forEach((cell, idx) => {
//       const offsetX = Math.sin(time + idx) * 20;
//       const offsetY = Math.cos(time + idx * 1.5) * 15;
      
//       const x = centerX + (cell.x - 0.5) * size + offsetX;
//       const y = centerY + (cell.y - 0.5) * size + offsetY;
//       const radius = cell.size * size;

//       // Create gradient for rain intensity - SOFTER, MORE MUTED COLORS
//       const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      
//       if (cell.intensity > 0.7) {
//         gradient.addColorStop(0, 'rgba(226, 125, 96, 0.5)'); // Softer red - heavy rain
//         gradient.addColorStop(1, 'rgba(226, 125, 96, 0)');
//       } else if (cell.intensity > 0.4) {
//         gradient.addColorStop(0, 'rgba(212, 163, 115, 0.5)'); // Softer amber - moderate rain
//         gradient.addColorStop(1, 'rgba(212, 163, 115, 0)');
//       } else {
//         gradient.addColorStop(0, 'rgba(107, 155, 209, 0.4)'); // Softer blue - light rain
//         gradient.addColorStop(1, 'rgba(107, 155, 209, 0)');
//       }

//       ctx.fillStyle = gradient;
//       ctx.beginPath();
//       ctx.arc(x, y, radius, 0, Math.PI * 2);
//       ctx.fill();
//     });

//     // Draw center marker (current location)
//     ctx.fillStyle = '#00C9A7';
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
//     ctx.fill();
    
//     ctx.strokeStyle = isDark ? '#121212' : '#ffffff';
//     ctx.lineWidth = 3;
//     ctx.stroke();

//   }, [isDark, animationFrame]);

//   // Animation loop
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setAnimationFrame(prev => prev + 1);
//     }, 100);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className={`rounded-3xl p-7 ${isDark ? 'bg-[#1E1E1E]' : 'bg-white'} shadow-xl border border-white/10`}>
//       <div className="flex items-center justify-between mb-5">
//         <h3 className={`text-xl font-black ${isDark ? 'text-[#E0E0E0]' : 'text-black'}`}>
//           RADAR DE CHUVA
//         </h3>
//         <div className="flex gap-3 items-center text-xs font-bold">
//           <div className="flex items-center gap-1.5">
//             <div className="w-3 h-3 rounded-full bg-[#6B9BD1]"></div>
//             <span className={isDark ? 'text-[#A0A0A0]' : 'text-gray-600'}>Leve</span>
//           </div>
//           <div className="flex items-center gap-1.5">
//             <div className="w-3 h-3 rounded-full bg-[#D4A373]"></div>
//             <span className={isDark ? 'text-[#A0A0A0]' : 'text-gray-600'}>Moderada</span>
//           </div>
//           <div className="flex items-center gap-1.5">
//             <div className="w-3 h-3 rounded-full bg-[#E27D60]"></div>
//             <span className={isDark ? 'text-[#A0A0A0]' : 'text-gray-600'}>Forte</span>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center">
//         <canvas
//           ref={canvasRef}
//           className="rounded-2xl"
//           style={{ maxWidth: '100%', height: 'auto' }}
//         />
//       </div>
//       <p className={`text-center mt-4 text-sm font-bold ${isDark ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
//         Ao vivo · Atualizado a cada 5 min
//       </p>
//     </div>
//   );
// }