import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, MapPin, Wind, Droplets, Eye, Gauge, 
  Loader2, AlertTriangle, Search, ShieldCheck, 
  CloudRain, Thermometer 
} from 'lucide-react';

// ==========================================
// DEFINIÇÃO DE TIPAGENS (TypeScript Interfaces)
// ==========================================

interface Alerta {
  id?: number;
  descricao: string;
}

interface ApiAtual {
  cidade?: { nome: string };
  coletadoAt?: string;
  temperatura?: number;
  condicaoTempo?: string;
  velocidadeVento?: number;
  direcaoVento?: string;
  umidade?: number;
  visibilidade?: number;
  pressao?: number;
  recomendacaoIa?: string;
}

interface ApiPrevisaoItem {
  dataHoraPrevisao?: string;
  temperatura?: number;
  probabilidadeChuva?: number;
  velocidadeVento?: number;
}

interface HourlyData {
  time: string;
  temp: number;
  rainChance: number;
  windSpeed: number;
}

interface DashboardData {
  location: string;
  lastUpdate: string;
  currentConditions: {
    temp: number;
    condition: string;
    windSpeed: number;
    windDirection: string;
    humidity: number;
    visibility: number;
    pressure: number;
  };
  safety: {
    level: 'danger' | 'safe';
    message: string;
    alerts: Alerta[];
  };
  hourlyData: HourlyData[];
}

interface StatCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  isDark: boolean;
}

// Lista de cidades para a sugestão de pesquisa
const CIDADES_SUGERIDAS = [
  'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 
  'Salvador', 'Fortaleza', 'Curitiba', 'Manaus', 'Recife', 
  'Porto Alegre', 'Belém', 'Goiânia', 'Guarulhos', 'Campinas',
  'Vitória', 'Natal', 'São Luís', 'Maceió', 'João Pessoa'
];

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [city, setCity] = useState<string>('Recife');
  const [searchInput, setSearchInput] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMockData, setIsMockData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Efeito principal para buscar os dados
  useEffect(() => {
    fetchDashboardData(city);
  }, [city]);

  const fetchDashboardData = async (cityName: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setIsMockData(false);

    try {
      const [resAtual, resPrevisao, resAlertas] = await Promise.all([
        fetch(`http://localhost:8080/api/clima/atual?cidade=${encodeURIComponent(cityName)}`),
        fetch(`http://localhost:8080/api/clima/previsao-futura?cidade=${encodeURIComponent(cityName)}`),
        fetch(`http://localhost:8080/api/clima/alertas?cidade=${encodeURIComponent(cityName)}`)
      ]);
      
      if (!resAtual.ok || !resPrevisao.ok || !resAlertas.ok) {
        throw new Error('Erro na API');
      }

      const dataAtual: ApiAtual = await resAtual.json();
      const dataPrevisao: ApiPrevisaoItem[] = await resPrevisao.json();
      const dataAlertas: Alerta[] = await resAlertas.json();
      
      setData(formatarDadosParaApp(dataAtual, dataPrevisao, dataAlertas, cityName));
    } catch (err) {
      console.warn("Não foi possível conectar ao localhost:8080. Carregando dados simulados para demonstração da UI.");
      setIsMockData(true);
      setData(gerarDadosSimulados(cityName));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput('');
    }
  };

  // --- Função para Mapear os dados do Java (Entidades) para o React ---
  const formatarDadosParaApp = (
    atual: ApiAtual, 
    previsao: ApiPrevisaoItem[], 
    alertas: Alerta[], 
    cityName: string
  ): DashboardData => {
    return {
      location: atual?.cidade?.nome || cityName,
      lastUpdate: atual?.coletadoAt 
        ? new Date(atual.coletadoAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) 
        : new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      currentConditions: {
        temp: atual?.temperatura || 0,
        condition: atual?.condicaoTempo || 'Não informada',
        windSpeed: atual?.velocidadeVento || 0,
        windDirection: atual?.direcaoVento || '',
        humidity: atual?.umidade || 0,
        visibility: atual?.visibilidade || 0,
        pressure: atual?.pressao || 0
      },
      safety: {
        level: (alertas && alertas.length > 0) ? 'danger' : 'safe',
        message: (alertas && alertas.length > 0) 
          ? alertas[0].descricao 
          : (atual?.recomendacaoIa || 'Condições climáticas seguras para trabalho em área externa.'),
        alerts: alertas || []
      },
      hourlyData: (previsao || []).slice(0, 6).map(p => {
        const timeString = p.dataHoraPrevisao 
          ? new Date(p.dataHoraPrevisao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) 
          : '00:00';

        return {
          time: timeString,
          temp: p.temperatura || 0,
          rainChance: p.probabilidadeChuva || 0,
          windSpeed: p.velocidadeVento || 0
        };
      })
    };
  };

  // --- Componentes Visuais ---
  if (isLoading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-blue-500" />
        <h2 className="text-xl font-black tracking-tight mb-2">OBJ SMART</h2>
        <p className="text-sm font-bold animate-pulse opacity-70">Sincronizando sensores...</p>
      </div>
    );
  }

  if (!data) return null;

  const { currentConditions, safety, hourlyData, location, lastUpdate } = data;

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${isDark ? 'bg-[#121212]' : 'bg-gray-100'}`}>
      
      {/* Header Fixo */}
      <header className={`sticky top-0 z-20 backdrop-blur-md border-b ${isDark ? 'bg-[#121212]/90 border-white/10' : 'bg-white/90 border-gray-200'} shadow-sm`}>
        <div className="max-w-2xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              OBJ <span className="text-blue-500">SMART</span>
            </h1>
            <div className="flex items-center gap-2 sm:gap-3">
              {isMockData && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30">
                  <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" /> 
                  <span className="hidden sm:inline">MODO OFFLINE</span>
                  <span className="sm:hidden">OFFLINE</span>
                </span>
              )}
              <button
                onClick={() => setIsDark(!isDark)}
                aria-label="Alternar tema"
                className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Barra de Busca */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Buscar cidade..."
              className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium outline-none transition-all ${
                isDark 
                  ? 'bg-gray-800/50 focus:bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500' 
                  : 'bg-gray-100 focus:bg-white text-gray-900 placeholder-gray-500 border border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
              }`}
            />
            <Search className={`absolute left-3 top-3 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            
            {/* Lista de Sugestões (Dropdown) */}
            {showSuggestions && searchInput.trim().length > 0 && (
              <ul className={`absolute z-50 w-full mt-2 rounded-xl border shadow-xl max-h-60 overflow-y-auto ${
                isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}>
                {CIDADES_SUGERIDAS.filter(c => c.toLowerCase().includes(searchInput.toLowerCase())).length > 0 ? (
                  CIDADES_SUGERIDAS.filter(c => c.toLowerCase().includes(searchInput.toLowerCase())).map((cidade) => (
                    <li
                      key={cidade}
                      className={`px-4 py-3 text-sm font-medium cursor-pointer transition-colors flex items-center gap-2 ${
                        isDark ? 'hover:bg-gray-700 border-b border-gray-700/50 last:border-0' : 'hover:bg-gray-50 border-b border-gray-100 last:border-0'
                      }`}
                      onClick={() => {
                        setSearchInput('');
                        setCity(cidade);
                        setShowSuggestions(false);
                      }}
                    >
                      <MapPin className="w-3.5 h-3.5 opacity-50" />
                      {cidade}
                    </li>
                  ))
                ) : (
                  <li className={`px-4 py-3 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Nenhuma cidade encontrada
                  </li>
                )}
              </ul>
            )}
          </form>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-2xl mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        
        {/* Localização e Atualização */}
        <div className="flex items-center justify-between px-1 sm:px-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <h2 className={`text-base sm:text-lg font-bold truncate max-w-[180px] sm:max-w-xs ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {location}
            </h2>
          </div>
          <span className={`text-[10px] sm:text-xs font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Atualizado {lastUpdate}
          </span>
        </div>

        {/* Card Principal: Condições Atuais */}
        <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-lg ${
          isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
        }`}>
          <div className="relative z-10 flex flex-col items-center text-center">
            <p className={`text-lg sm:text-xl font-bold mb-1 sm:mb-2 ${isDark ? 'text-gray-400' : 'text-blue-100'}`}>
              {currentConditions.condition}
            </p>
            <div className="flex items-start justify-center">
              <span className={`text-7xl sm:text-8xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-white'}`}>
                {currentConditions.temp}
              </span>
              <span className="text-3xl sm:text-4xl font-bold mt-2 sm:mt-3">°C</span>
            </div>
          </div>
          
          {/* Círculos decorativos de fundo */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 sm:w-40 h-32 sm:h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-24 sm:w-32 h-24 sm:h-32 bg-white opacity-5 rounded-full blur-xl"></div>
        </div>

        {/* Indicador de Segurança */}
        <div className={`rounded-2xl p-4 sm:p-5 border shadow-sm flex flex-col sm:flex-row items-start gap-3 sm:gap-4 transition-colors ${
          safety.level === 'danger' 
            ? (isDark ? 'bg-red-900/20 border-red-900/50' : 'bg-red-50 border-red-200')
            : (isDark ? 'bg-emerald-900/20 border-emerald-900/50' : 'bg-emerald-50 border-emerald-200')
        }`}>
          <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 self-start ${
            safety.level === 'danger' 
              ? (isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600')
              : (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600')
          }`}>
            {safety.level === 'danger' ? <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" /> : <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
          </div>
          <div>
            <h3 className={`text-sm sm:text-base font-bold mb-1 ${
              safety.level === 'danger' 
                ? (isDark ? 'text-red-400' : 'text-red-800')
                : (isDark ? 'text-emerald-400' : 'text-emerald-800')
            }`}>
              {safety.level === 'danger' ? 'Alerta de Segurança' : 'Ambiente Seguro'}
            </h3>
            <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {safety.message}
            </p>
          </div>
        </div>

        {/* Grid de Sensores (2x2) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <StatCard 
            title="VENTO" 
            value={currentConditions.windSpeed} 
            unit={`km/h ${currentConditions.windDirection}`} 
            icon={<Wind className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />} 
            isDark={isDark} 
          />
          <StatCard 
            title="UMIDADE" 
            value={currentConditions.humidity} 
            unit="%" 
            icon={<Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />} 
            isDark={isDark} 
          />
          <StatCard 
            title="VISIBILIDADE" 
            value={currentConditions.visibility} 
            unit="km" 
            icon={<Eye className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />} 
            isDark={isDark} 
          />
          <StatCard 
            title="PRESSÃO" 
            value={currentConditions.pressure} 
            unit="hPa" 
            icon={<Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />} 
            isDark={isDark} 
          />
        </div>

        {/* Previsão Futura (Gráfico Horizontal) */}
        <div className={`rounded-3xl p-4 sm:p-6 shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Thermometer className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <h3 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Previsão das Próximas Horas
            </h3>
          </div>
          
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {hourlyData.map((hour, idx) => (
              <div key={idx} className={`min-w-[70px] sm:min-w-[80px] flex flex-col items-center p-2.5 sm:p-3 rounded-2xl shrink-0 transition-colors ${
                isDark ? 'bg-gray-900/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
              }`}>
                <span className={`text-xs sm:text-sm font-bold mb-2 sm:mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {hour.time}
                </span>
                
                {hour.rainChance > 40 ? (
                  <CloudRain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mb-2 sm:mb-3" />
                ) : (
                  <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mb-2 sm:mb-3" />
                )}
                
                <span className={`text-base sm:text-lg font-black mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {hour.temp}°
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-blue-500 flex items-center gap-0.5">
                  <Droplets className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {hour.rainChance}%
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

// ==========================================
// SUB-COMPONENTES
// ==========================================

const StatCard: React.FC<StatCardProps> = ({ title, value, unit, icon, isDark }) => {
  return (
    <div className={`rounded-2xl p-4 sm:p-5 shadow-sm border flex flex-col justify-center ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        {icon}
        <p className={`text-[10px] sm:text-xs font-black tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {title}
        </p>
      </div>
      <div className="flex items-baseline gap-1 flex-wrap">
        <p className={`text-2xl sm:text-3xl font-black leading-none ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {value}
        </p>
        <p className={`text-xs sm:text-sm font-bold ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          {unit}
        </p>
      </div>
    </div>
  );
}

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

const gerarDadosSimulados = (cidadeName: string): DashboardData => {
  const isChuvoso = cidadeName.toLowerCase().includes('chuva') || cidadeName.toLowerCase().includes('rio');
  
  return {
    location: cidadeName,
    lastUpdate: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    currentConditions: {
      temp: isChuvoso ? 22 : 31,
      condition: isChuvoso ? 'Chuva Moderada' : 'Céu Limpo',
      windSpeed: isChuvoso ? 28 : 12,
      windDirection: 'NE',
      humidity: isChuvoso ? 85 : 45,
      visibility: isChuvoso ? 4 : 15,
      pressure: 1012
    },
    safety: {
      level: isChuvoso ? 'danger' : 'safe',
      message: isChuvoso 
        ? 'Alerta de Chuva Forte: Superfícies escorregadias. O uso de EPI com aderência é obrigatório. Evite trabalhos em altura.'
        : 'Condições climáticas ideais. Mantenha a hidratação regular devido à temperatura elevada.',
      alerts: isChuvoso ? [{ id: 1, descricao: 'Chuva Forte' }] : []
    },
    hourlyData: Array.from({ length: 6 }).map((_, i) => {
      const now = new Date();
      now.setHours(now.getHours() + i + 1);
      return {
        time: `${now.getHours().toString().padStart(2, '0')}:00`,
        temp: isChuvoso ? 22 - (i % 2) : 31 + (i % 3),
        rainChance: isChuvoso ? Math.max(0, 85 - (i * 10)) : Math.min(20, i * 5),
        windSpeed: isChuvoso ? 28 - i : 12 + i
      };
    })
  };
};