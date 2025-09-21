import React, { useState } from 'react';
import { Microscope, Layers, ChevronDown, ChevronUp, Atom, Binary, Code, Zap, Cpu } from 'lucide-react';

interface ScaleData {
  id: number;
  name: string;
  analogyName: string;
  range: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  bricks: string[];
  composedOf: string;
  combinations: string[];
}

const scaleData: ScaleData[] = [
  {
    id: 1,
    name: "Échelle macroscopique",
    analogyName: "UI",
    range: "10⁻⁴ m à 1 m",
    icon: <Layers className="w-6 h-6 sm:w-8 sm:h-8" />,
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-900/30 via-cyan-900/20 to-blue-800/30",
    bricks: ["objets visibles", "masses", "fluides", "champs gravitationnels"],
    composedOf: "molécules",
    combinations: [
      "Assemblage de molécules → tissus, roches, liquides",
      "Combinaisons complexes → planètes, organismes vivants, machines"
    ]
  },
  {
    id: 2,
    name: "Échelle moléculaire",
    analogyName: "React",
    range: "10⁻⁹ à 10⁻⁶ m",
    icon: <Code className="w-6 h-6 sm:w-8 sm:h-8" />,
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-900/30 via-emerald-900/20 to-green-800/30",
    bricks: ["H₂O", "O₂", "CO₂", "CH₄", "ADN", "protéines", "plastiques", "sucres"],
    composedOf: "atomes",
    combinations: [
      "O + H → H₂O (eau)",
      "C + O₂ → CO₂ (dioxyde de carbone)",
      "Chaînes d'ADN → code génétique",
      "Polymères → plastiques"
    ]
  },
  {
    id: 3,
    name: "Échelle atomique",
    analogyName: "JavaScript",
    range: "10⁻¹⁰ m",
    icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
    color: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-900/30 via-orange-900/20 to-yellow-800/30",
    bricks: ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "...jusqu'à Uuo"],
    composedOf: "protons, neutrons, électrons",
    combinations: [
      "1 proton + 1 électron → Hydrogène",
      "2 protons + 2 neutrons + 2 électrons → Hélium",
      "Carbone + hydrogène + oxygène → sucres, lipides, protéines"
    ]
  },
  {
    id: 4,
    name: "Échelle nucléaire",
    analogyName: "C/C++",
    range: "10⁻¹⁵ m",
    icon: <Atom className="w-6 h-6 sm:w-8 sm:h-8" />,
    color: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-900/30 via-violet-900/20 to-purple-800/30",
    bricks: ["protons (uud)", "neutrons (udd)"],
    composedOf: "quarks et gluons",
    combinations: [
      "1 proton + 1 neutron → deutérium",
      "2 protons + 2 neutrons → hélium-4",
      "Fusions → hélium, carbone, oxygène (comme dans les étoiles)",
      "Fissions → uranium, plutonium"
    ]
  },
  {
    id: 5,
    name: "Échelle des particules fondamentales",
    analogyName: "Instructions processeur",
    range: "10⁻¹⁸ m",
    icon: <Cpu className="w-6 h-6 sm:w-8 sm:h-8" />,
    color: "from-red-500 to-pink-500",
    bgGradient: "from-red-900/30 via-pink-900/20 to-red-800/30",
    bricks: [
      "Quarks: up, down, strange, charm, top, bottom",
      "Leptons: électron, muon, tau + neutrinos",
      "Bosons: photon, gluon, W, Z, Higgs, graviton"
    ],
    composedOf: "champs quantiques",
    combinations: [
      "2 up + 1 down → proton",
      "2 down + 1 up → neutron",
      "Échanges de bosons → forces fondamentales"
    ]
  },
  {
    id: 6,
    name: "Échelle de Planck",
    analogyName: "0/1",
    range: "10⁻³⁵ m",
    icon: <Binary className="w-6 h-6 sm:w-8 sm:h-8" />,
    color: "from-gray-600 to-slate-600",
    bgGradient: "from-gray-900/30 via-slate-900/20 to-gray-800/30",
    bricks: ["quanta d'espace-temps", "fluctuations de vide", "bits fondamentaux"],
    composedOf: "substrat hypothétique de l'univers",
    combinations: [
      "Bits → informations élémentaires",
      "Cordes (théorie des cordes)",
      "Boucles (gravité quantique à boucles)",
      "Hypothèse: création d'univers"
    ]
  }
];

const ScaleBlock: React.FC<{ scale: ScaleData; isExpanded: boolean; onToggle: () => void }> = ({ 
  scale, 
  isExpanded, 
  onToggle 
}) => {
  return (
    <div className={`bg-gradient-to-br ${scale.bgGradient} backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-white/20 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:border-white/30`}>
      {/* En-tête de l'échelle */}
      <div 
        className="flex items-center justify-between cursor-pointer mb-4 sm:mb-6"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className={`p-3 sm:p-4 rounded-xl bg-gradient-to-r ${scale.color} shadow-lg mr-4`}>
            {scale.icon}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">
              {scale.id}. {scale.name}
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm sm:text-base text-gray-300 font-mono">
                {scale.range}
              </span>
              <span className="text-sm sm:text-base text-cyan-300 font-semibold">
                ({scale.analogyName})
              </span>
            </div>
          </div>
        </div>
        <div className="text-white">
          {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </div>
      </div>

      {/* Contenu détaillé (collapsible) */}
      {isExpanded && (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
          {/* Briques disponibles */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-white/20">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center">
              🧱 Briques disponibles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {scale.bricks.map((brick, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/30 hover:border-white/50 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span className="text-sm sm:text-base text-gray-200 font-medium">
                    {brick}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Composition */}
          <div className="bg-gradient-to-r from-orange-900/40 to-red-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-5 border-l-4 border-orange-400">
            <h3 className="text-lg sm:text-xl font-bold text-orange-200 mb-3 flex items-center">
              <ChevronDown className="w-5 h-5 mr-2" />
              Composé de
            </h3>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              {scale.composedOf}
            </p>
          </div>

          {/* Combinaisons possibles */}
          <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-5 border-l-4 border-green-400">
            <h3 className="text-lg sm:text-xl font-bold text-green-200 mb-3 flex items-center">
              <ChevronUp className="w-5 h-5 mr-2" />
              Combinaisons possibles
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {scale.combinations.map((combination, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-md px-3 py-2 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 cursor-pointer hover:bg-white/15"
                >
                  <span className="text-sm sm:text-base text-gray-200">
                    {combination}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Boutons d'action futurs */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg opacity-50 cursor-not-allowed">
              🔬 Observer
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg opacity-50 cursor-not-allowed">
              ⚗️ Combiner
            </button>
            <button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg opacity-50 cursor-not-allowed">
              🎲 Expérimenter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const QuantumLabPage: React.FC = () => {
  const [expandedScales, setExpandedScales] = useState<Set<number>>(new Set([1])); // Premier bloc ouvert par défaut

  // Force le re-rendu propre de la page
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleScale = (scaleId: number) => {
    setExpandedScales(prev => {
      const newSet = new Set(prev);
      if (newSet.has(scaleId)) {
        newSet.delete(scaleId);
      } else {
        newSet.add(scaleId);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedScales(new Set(scaleData.map(scale => scale.id)));
  };

  const collapseAll = () => {
    setExpandedScales(new Set());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Effet de grille futuriste en arrière-plan */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
      
      {/* Effet de particules en arrière-plan */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-indigo-900/20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.05)_50%,transparent_75%)] bg-[length:60px_60px] animate-pulse"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
        {/* En-tête */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Microscope className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 mr-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent bg-[length:400%_400%] animate-gradient-x drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]">
              Laboratoire Quantique
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-purple-200 max-w-4xl mx-auto px-4 leading-relaxed">
            Explorez les 6 échelles de l'univers comme un véritable jeu de construction cosmique
          </p>
          
          {/* Contrôles globaux */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={expandAll}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Tout développer
            </button>
            <button
              onClick={collapseAll}
              className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Tout réduire
            </button>
          </div>
        </header>

        {/* Roadmap verticale des échelles */}
        <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
          {scaleData.map((scale, index) => (
            <React.Fragment key={scale.id}>
              <ScaleBlock
                scale={scale}
                isExpanded={expandedScales.has(scale.id)}
                onToggle={() => toggleScale(scale.id)}
              />
              
              {/* Séparateur entre les échelles (sauf pour la dernière) */}
              {index < scaleData.length - 1 && (
                <div className="flex items-center justify-center py-4">
                  <div className="flex items-center">
                    <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
                    <div className="mx-4 p-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full shadow-lg">
                      <ChevronDown className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Encart final */}
        <div className="max-w-4xl mx-auto mt-12 lg:mt-16">
          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/40 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 sm:p-8 border-2 border-indigo-400/40 shadow-2xl text-center">
            <div className="flex items-center justify-center mb-4">
              <Microscope className="w-8 h-8 text-indigo-400 mr-3" />
              <h2 className="text-xl sm:text-2xl font-bold text-indigo-300">
                À propos du Laboratoire Quantique
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
              Le Laboratoire Quantique est un espace expérimental où vous pouvez explorer les règles de l'univers comme si elles étaient des briques de code.
            </p>
            <div className="mt-6 text-sm text-gray-400 italic">
              🚧 Fonctionnalités à venir : Observer, Combiner, Expérimenter
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};