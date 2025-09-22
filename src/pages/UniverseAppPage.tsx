import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Code2, 
  Atom, 
  Cpu, 
  Eye, 
  Zap, 
  Binary, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  Sparkles,
  Globe,
  Microscope
} from 'lucide-react';

// Composant pour les chiffres binaires qui se téléportent
const TeleportingBinaryDigits: React.FC = () => {
  const [digits, setDigits] = React.useState(() => 
    Array.from({ length: 25 }, (_, i) => {
      return {
        id: i,
        value: Math.random() > 0.5 ? '1' : '0',
        top: Math.random() * 90 + 5,
        left: Math.random() * 90 + 5,
        opacity: Math.random() * 0.3 + 0.1,
        size: ['text-xl', 'text-2xl', 'text-3xl'][Math.floor(Math.random() * 3)],
        visible: true,
        nextChangeTime: Date.now() + Math.random() * 200 + 100
      };
    })
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setDigits(prevDigits => 
        prevDigits.map(digit => {
          if (now >= digit.nextChangeTime) {
            if (digit.visible) {
              return {
                ...digit,
                visible: false,
                nextChangeTime: now + 50
              };
            } else {
              return {
                ...digit,
                value: Math.random() > 0.5 ? '1' : '0',
                top: Math.random() * 90 + 5,
                left: Math.random() * 90 + 5,
                opacity: Math.random() * 0.3 + 0.1,
                size: ['text-xl', 'text-2xl', 'text-3xl'][Math.floor(Math.random() * 3)],
                visible: true,
                nextChangeTime: now + Math.random() * 200 + 100
              };
            }
          }
          return digit;
        })
      );
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {digits.map(digit => (
        <div
          key={digit.id}
          className={`absolute ${digit.size} font-mono text-cyan-400 transition-opacity duration-300 select-none ${
            digit.visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            top: `${digit.top}%`,
            left: `${digit.left}%`,
            opacity: digit.visible ? digit.opacity : 0,
            color: '#00FF41',
            textShadow: '0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {digit.value}
        </div>
      ))}
    </>
  );
};

// Composant pour une section d'échelle
interface ScaleSectionProps {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  textColor: string;
  isExpanded: boolean;
  onToggle: () => void;
  details: string[];
  examples: string[];
  linkTo?: string;
  linkText?: string;
}

const ScaleSection: React.FC<ScaleSectionProps> = ({
  id,
  title,
  subtitle,
  description,
  icon,
  gradient,
  borderColor,
  textColor,
  isExpanded,
  onToggle,
  details,
  examples,
  linkTo,
  linkText
}) => {
  return (
    <div className={`relative bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 ${borderColor} shadow-2xl transition-all duration-500 hover:scale-[1.02] group`}>
      {/* Effet de grille futuriste */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px] rounded-xl lg:rounded-2xl opacity-30"></div>
      
      {/* Particules animées */}
      <div className="absolute inset-0 overflow-hidden rounded-xl lg:rounded-2xl">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-40 group-hover:opacity-70 transition-opacity duration-1000"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Contenu principal */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 mr-3 sm:mr-4 ${textColor} flex-shrink-0`}>
              {icon}
            </div>
            <div>
              <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${textColor} mb-1 sm:mb-2`}>
                {title}
              </h2>
              <p className="text-sm sm:text-base text-gray-300 font-medium">
                {subtitle}
              </p>
            </div>
          </div>
          
          <button
            onClick={onToggle}
            className={`p-2 sm:p-3 rounded-full ${textColor} hover:bg-white/10 transition-all duration-300 transform hover:scale-110 active:scale-95`}
          >
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 sm:w-8 sm:h-8" />
            ) : (
              <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
            )}
          </button>
        </div>
        
        <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed mb-4 sm:mb-6">
          {description}
        </p>
        
        {/* Contenu étendu */}
        <div className={`transition-all duration-500 overflow-hidden ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-4 sm:space-y-6">
            {/* Détails */}
            <div>
              <h3 className={`text-lg sm:text-xl font-bold ${textColor} mb-3 sm:mb-4`}>
                Détails techniques
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {details.map((detail, index) => (
                  <div key={index} className="flex items-start">
                    <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${textColor} mr-2 sm:mr-3 mt-0.5 flex-shrink-0`} />
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Exemples */}
            <div>
              <h3 className={`text-lg sm:text-xl font-bold ${textColor} mb-3 sm:mb-4`}>
                Exemples concrets
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {examples.map((example, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-white/10">
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {example}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Lien vers page dédiée */}
            {linkTo && linkText && (
              <div className="pt-4 sm:pt-6 border-t border-white/20">
                <Link
                  to={linkTo}
                  className={`inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 ${textColor} rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg border border-white/20 hover:border-white/30`}
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {linkText}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const UniverseAppPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [targetSection, setTargetSection] = useState<number | null>(null);

  // Force le re-rendu propre de la page
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Gestion de la navigation avec état depuis d'autres pages
  useEffect(() => {
    const state = history.state?.usr;
    if (state?.targetSection) {
      setTargetSection(state.targetSection);
      setExpandedSections(new Set([state.targetSection]));
      
      // Scroll vers la section après un délai pour permettre le rendu
      setTimeout(() => {
        const element = document.getElementById(`section-${state.targetSection}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, []);

  const toggleSection = (id: number) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Données des sections d'échelle
  const scaleSections = [
    {
      id: 1,
      title: "Interface Utilisateur",
      subtitle: "Ce que nous percevons",
      description: "L'interface utilisateur représente tout ce que nous pouvons voir, toucher et expérimenter dans notre réalité quotidienne. C'est la couche d'abstraction la plus élevée de l'univers-application.",
      icon: <Eye className="w-full h-full" />,
      gradient: "from-blue-900/50 to-cyan-900/40",
      borderColor: "border-blue-400/40",
      textColor: "text-blue-300",
      details: [
        "Tous les objets macroscopiques : planètes, étoiles, galaxies, êtres vivants",
        "Les phénomènes observables : lumière, gravité, électromagnétisme",
        "Les interactions que nous pouvons mesurer et quantifier",
        "L'espace-temps tel que nous l'expérimentons au quotidien"
      ],
      examples: [
        "Une pomme qui tombe",
        "La lumière d'une étoile",
        "Un être humain qui marche",
        "Une galaxie qui tourne",
        "L'eau qui bout",
        "Un aimant qui attire le fer"
      ]
    },
    {
      id: 2,
      title: "HTML/CSS Cosmique",
      subtitle: "Structure et apparence",
      description: "Cette couche définit la structure fondamentale et l'apparence visuelle de notre réalité. Elle détermine comment les éléments s'organisent dans l'espace-temps et leurs propriétés observables.",
      icon: <Code2 className="w-full h-full" />,
      gradient: "from-green-900/50 to-emerald-900/40",
      borderColor: "border-green-400/40",
      textColor: "text-green-300",
      details: [
        "Les lois physiques qui régissent la structure de l'espace-temps",
        "Les constantes universelles qui définissent les propriétés de la matière",
        "Les champs quantiques qui donnent forme à la réalité",
        "Les symétries fondamentales qui organisent l'univers"
      ],
      examples: [
        "La courbure de l'espace-temps",
        "Les propriétés des particules",
        "La vitesse de la lumière",
        "La constante de Planck",
        "Les forces fondamentales",
        "La géométrie de l'univers"
      ]
    },
    {
      id: 3,
      title: "Composants React Universels",
      subtitle: "Éléments réutilisables",
      description: "Les composants fondamentaux de la réalité : particules, atomes, molécules. Chaque composant encapsule une fonctionnalité spécifique et peut être réutilisé pour construire des structures plus complexes.",
      icon: <Layers className="w-full h-full" />,
      gradient: "from-yellow-900/50 to-orange-900/40",
      borderColor: "border-yellow-400/40",
      textColor: "text-yellow-300",
      details: [
        "Particules élémentaires : quarks, leptons, bosons de jauge",
        "Atomes : combinaisons stables de particules avec propriétés uniques",
        "Molécules : assemblages d'atomes créant de nouvelles fonctionnalités",
        "Structures complexes : cristaux, polymères, systèmes biologiques"
      ],
      examples: [
        "Un électron (composant de base)",
        "Un atome d'hydrogène",
        "Une molécule d'eau",
        "Une protéine",
        "Un cristal de quartz",
        "Une cellule vivante"
      ]
    },
    {
      id: 4,
      title: "JavaScript Quantique",
      subtitle: "Logique et comportement",
      description: "La couche qui définit le comportement dynamique de l'univers. Les équations de la physique quantique et relativiste qui gouvernent les interactions et l'évolution temporelle de tous les systèmes.",
      icon: <Cpu className="w-full h-full" />,
      gradient: "from-orange-900/50 to-red-900/40",
      borderColor: "border-orange-400/40",
      textColor: "text-orange-300",
      details: [
        "Équations de Schrödinger régissant l'évolution quantique",
        "Équations d'Einstein décrivant la relativité générale",
        "Équations de Maxwell pour l'électromagnétisme",
        "Modèle standard des particules et leurs interactions"
      ],
      examples: [
        "Superposition quantique",
        "Intrication quantique",
        "Courbure espace-temps",
        "Décohérence quantique",
        "Émission de photons",
        "Désintégration radioactive"
      ]
    },
    {
      id: 5,
      title: "Échelle de Planck",
      subtitle: "Code binaire de la réalité",
      description: "À l'échelle de Planck, l'espace-temps devient granulaire et quantifié. C'est ici que se trouve le 'code source' de l'univers, où chaque quantum d'espace-temps peut être vu comme un bit d'information fondamental.",
      icon: <Binary className="w-full h-full" />,
      gradient: "from-purple-900/50 to-indigo-900/40",
      borderColor: "border-purple-400/40",
      textColor: "text-purple-300",
      details: [
        "Longueur de Planck : 1.6 × 10⁻³⁵ mètres - plus petite distance physiquement significative",
        "Temps de Planck : 5.4 × 10⁻⁴⁴ secondes - plus petit intervalle temporel",
        "Énergie de Planck : 1.2 × 10¹⁹ GeV - énergie où la gravité quantique domine",
        "À cette échelle, l'espace-temps lui-même devient quantifié et discontinu"
      ],
      examples: [
        "Mousse quantique de l'espace-temps",
        "Fluctuations du vide quantique",
        "Création/annihilation virtuelle",
        "Géométrie non-commutative",
        "Bits d'information holographique",
        "États quantiques purs"
      ],
      linkTo: "/god-binary",
      linkText: "Explorer le code binaire divin"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Chiffres binaires en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <TeleportingBinaryDigits />
      </div>
      
      {/* Effet de grille futuriste */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
        {/* En-tête */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent bg-[length:400%_400%] animate-gradient-x drop-shadow-[0_0_30px_rgba(6,182,212,0.8)] mb-3 sm:mb-4 px-2">
            L'Univers est une Application
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-purple-200 max-w-4xl mx-auto px-4 leading-relaxed">
            Découvrez comment notre réalité s'organise en couches, de l'interface utilisateur macroscopique jusqu'au code binaire quantique
          </p>
        </header>

        {/* Introduction conceptuelle */}
        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/40 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-indigo-400/40 shadow-2xl mb-6 lg:mb-8">
          <div className="flex items-center mb-4 sm:mb-6">
            <Globe className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-indigo-400" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-300">
              L'Analogie Fondamentale
            </h2>
          </div>
          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
            <p>
              Imaginez que notre univers fonctionne comme une application informatique géante. Tout comme une app moderne, 
              il est organisé en <strong className="text-cyan-300">couches d'abstraction</strong> : de l'interface utilisateur 
              que nous percevons jusqu'au code binaire fondamental qui fait tourner le tout.
            </p>
            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border-l-4 border-cyan-400">
              <p className="font-semibold text-cyan-200">
                <strong>Chaque couche</strong> cache la complexité des couches inférieures, tout en s'appuyant sur elles. 
                Nous interagissons avec l'interface (la réalité macroscopique), sans jamais voir le JavaScript quantique 
                ou le HTML/CSS cosmique qui la génère.
              </p>
            </div>
          </div>
        </div>

        {/* Les 6 échelles de l'univers */}
        <div className="space-y-6 lg:space-y-8">
          {scaleSections.map((section) => (
            <div key={section.id} id={`section-${section.id}`}>
              <ScaleSection
                {...section}
                isExpanded={expandedSections.has(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
            </div>
          ))}
        </div>

        {/* Section de comparaison des cascades */}
        <div className="mt-8 lg:mt-12 bg-gradient-to-br from-emerald-900/50 to-teal-900/40 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-emerald-400/40 shadow-2xl">
          <div className="flex items-center mb-4 sm:mb-6">
            <Microscope className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-300">
              La Cascade Divine : Création d'un Téléphone
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-emerald-200 mb-4">
                🌌 Cascade Universelle (Physique)
              </h3>
              
              <div className="space-y-3">
                {[
                  { level: "Particules", desc: "Dieu modifie des milliards de milliards de fermions et bosons, qui s'organisent", color: "bg-red-900/40 border-red-400" },
                  { level: "Nucléons", desc: "Des milliards de milliards de protons et neutrons se combinent", color: "bg-orange-900/40 border-orange-400" },
                  { level: "Atomes", desc: "Des centaines de milliards d'atomes acquièrent de nouvelles propriétés", color: "bg-yellow-900/40 border-yellow-400" },
                  { level: "Molécules", desc: "Des dizaines de milliards de molécules interagissent différemment", color: "bg-green-900/40 border-green-400" },
                  { level: "Macroscopique", desc: "Un téléphone complet apparaît dans la réalité", color: "bg-blue-900/40 border-blue-400" }
                ].map((item, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${item.color} min-h-[80px] flex flex-col justify-center`}>
                    <div className="font-bold text-white text-sm">{item.level}</div>
                    <div className="text-gray-300 text-xs mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-emerald-200 mb-4">
                💻 Cascade Informatique (Logicielle)
              </h3>
              
              <div className="space-y-3">
                {[
                  { level: "Binaire", desc: "Dieu manipule les 0 et 1, le code source fondamental qui définit chaque instruction et chaque bit de matière.", color: "bg-red-900/40 border-red-400" },
                  { level: "JavaScript", desc: "Les modifications binaires se manifestent en opérations de bas niveau, orchestrant les fondations du système et définissant la logique et le comportement des éléments à un niveau plus abstrait.", color: "bg-orange-900/40 border-orange-400" },
                  { level: "Composants React", desc: "Les composants de la réalité s'assemblent, créant des structures et des fonctionnalités complexes.", color: "bg-yellow-900/40 border-yellow-400" },
                  { level: "HTML/CSS", desc: "Le code HTML/CSS est généré à partir des composants React, définissant la structure et l'apparence visuelle du téléphone.", color: "bg-green-900/40 border-green-400" },
                  { level: "Interface utilisateur", desc: "Le téléphone apparaît, fonctionnelle et tangible, c'est le rendu final et interactif du code HTML/CSS.", color: "bg-blue-900/40 border-blue-400" }
                ].map((item, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${item.color} min-h-[80px] flex flex-col justify-center`}>
                    <div className="font-bold text-white text-sm">{item.level}</div>
                    <div className="text-gray-300 text-xs mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="mt-8 lg:mt-12 bg-gradient-to-br from-indigo-900/50 to-purple-900/40 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-indigo-400/40 shadow-2xl text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-300 mb-4 sm:mb-6">
            L'Ultime Révélation
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
            Dans cette vision, <strong className="text-yellow-300">nous sommes les utilisateurs</strong> d'une application cosmique 
            dont nous ne voyons que l'interface. Les lois de la physique sont le code qui fait tourner cette réalité, 
            et à l'échelle de Planck se cache le <strong className="text-cyan-300">code binaire fondamental</strong> - 
            les 0 et 1 quantiques qui génèrent tout ce que nous expérimentons.
          </p>
        </div>
      </div>
    </div>
  );
};