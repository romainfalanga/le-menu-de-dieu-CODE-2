import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Atom, 
  Dna, 
  Building, 
  Globe, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Code2,
  Layers,
  Microscope,
  Eye,
  Binary,
  Cpu
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
        size: ['text-lg', 'text-xl', 'text-2xl'][Math.floor(Math.random() * 3)],
        visible: true,
        nextChangeTime: Date.now() + Math.random() * 300 + 200
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
                nextChangeTime: now + 100
              };
            } else {
              return {
                ...digit,
                value: Math.random() > 0.5 ? '1' : '0',
                top: Math.random() * 90 + 5,
                left: Math.random() * 90 + 5,
                opacity: Math.random() * 0.3 + 0.1,
                size: ['text-lg', 'text-xl', 'text-2xl'][Math.floor(Math.random() * 3)],
                visible: true,
                nextChangeTime: now + Math.random() * 300 + 200
              };
            }
          }
          return digit;
        })
      );
    }, 50);

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

export const UniverseAppPage: React.FC = () => {
  // Force le re-rendu propre de la page
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Définition des échelles avec leurs propriétés
  const scales = [
    {
      id: 0,
      title: "Interface Utilisateur",
      subtitle: "Ce que nous percevons",
      icon: <Smartphone className="w-8 h-8 sm:w-12 sm:h-12" />,
      gradient: "from-blue-500 to-purple-600",
      borderColor: "border-blue-400",
      textColor: "text-blue-300",
      bgColor: "bg-blue-900/20",
      description: "L'interface que nous percevons : objets, personnes, planètes, galaxies...",
      examples: ["Smartphone", "Voiture", "Arbre", "Montagne", "Planète", "Étoile"],
      analogy: "Comme l'interface d'une application mobile que vous utilisez quotidiennement",
      size: "De quelques centimètres à des milliards d'années-lumière"
    },
    {
      id: 1,
      title: "Composants Complexes",
      subtitle: "Systèmes organisés",
      icon: <Building className="w-8 h-8 sm:w-12 sm:h-12" />,
      gradient: "from-green-500 to-teal-600",
      borderColor: "border-green-400",
      textColor: "text-green-300",
      bgColor: "bg-green-900/20",
      description: "Systèmes complexes : organes, écosystèmes, structures cristallines...",
      examples: ["Cœur humain", "Forêt", "Cristal", "Système solaire", "Galaxie", "Amas galactique"],
      analogy: "Comme les composants React complexes qui gèrent des fonctionnalités entières",
      size: "De quelques millimètres à des millions d'années-lumière"
    },
    {
      id: 2,
      title: "Composants Simples",
      subtitle: "Éléments de base",
      icon: <Dna className="w-8 h-8 sm:w-12 sm:h-12" />,
      gradient: "from-yellow-500 to-orange-600",
      borderColor: "border-yellow-400",
      textColor: "text-yellow-300",
      bgColor: "bg-yellow-900/20",
      description: "Éléments constitutifs : cellules, molécules, minéraux...",
      examples: ["Cellule", "Molécule d'eau", "Protéine", "ADN", "Cristal de sel", "Grain de sable"],
      analogy: "Comme les composants React simples (boutons, inputs, textes)",
      size: "De quelques nanomètres à quelques millimètres"
    },
    {
      id: 3,
      title: "Atomes",
      subtitle: "Briques fondamentales",
      icon: <Atom className="w-8 h-8 sm:w-12 sm:h-12" />,
      gradient: "from-red-500 to-pink-600",
      borderColor: "border-red-400",
      textColor: "text-red-300",
      bgColor: "bg-red-900/20",
      description: "Les atomes : hydrogène, carbone, oxygène, fer...",
      examples: ["Hydrogène", "Carbone", "Oxygène", "Fer", "Or", "Uranium"],
      analogy: "Comme les éléments HTML de base (div, span, p, h1...)",
      size: "Environ 0,1 à 0,5 nanomètres"
    },
    {
      id: 4,
      title: "Particules",
      subtitle: "Composants atomiques",
      icon: <Zap className="w-8 h-8 sm:w-12 sm:h-12" />,
      gradient: "from-purple-500 to-indigo-600",
      borderColor: "border-purple-400",
      textColor: "text-purple-300",
      bgColor: "bg-purple-900/20",
      description: "Particules subatomiques : protons, neutrons, électrons, quarks...",
      examples: ["Proton", "Neutron", "Électron", "Quark up", "Quark down", "Photon"],
      analogy: "Comme le CSS qui définit les propriétés et le style des éléments",
      size: "De 10⁻¹⁵ à 10⁻¹⁸ mètres"
    },
    {
      id: 5,
      title: "Échelle de Planck",
      subtitle: "Code binaire de la réalité",
      icon: <Binary className="w-8 h-8 sm:w-12 sm:h-12" />,
      gradient: "from-cyan-500 to-blue-600",
      borderColor: "border-cyan-400",
      textColor: "text-cyan-300",
      bgColor: "bg-cyan-900/20",
      description: "L'échelle de Planck : où l'espace-temps devient quantifié en bits d'information",
      examples: ["Longueur de Planck", "Temps de Planck", "Énergie de Planck", "Bits quantiques", "Information pure", "Code binaire cosmique"],
      analogy: "Comme le code binaire (0 et 1) qui constitue la base de tout programme informatique",
      size: "10⁻³⁵ mètres (longueur de Planck)",
      specialContent: (
        <div className="mt-4 p-4 bg-gradient-to-r from-cyan-900/40 to-blue-900/30 rounded-lg border border-cyan-400/30">
          <div className="flex items-center mb-3">
            <Code2 className="w-6 h-6 mr-2 text-cyan-400" />
            <h4 className="text-lg font-bold text-cyan-300">Dieu code en Binaire</h4>
          </div>
          <p className="text-cyan-100 text-sm mb-4 leading-relaxed">
            À cette échelle fondamentale, la réalité devient programmable. Chaque quantum d'espace-temps 
            agit comme un bit d'information (0 ou 1). Une entité capable de manipuler ces "bits de réalité" 
            pourrait réécrire l'univers depuis ses fondations les plus profondes.
          </p>
          <Link
            to="/god-binary"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-sm"
          >
            <Binary className="w-4 h-4 mr-2" />
            Explorer le code divin
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Chiffres binaires flottants en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <TeleportingBinaryDigits />
      </div>
      
      {/* Effet de grille futuriste en arrière-plan */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
      
      {/* Effet de particules en arrière-plan */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-indigo-900/20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.05)_50%,transparent_75%)] bg-[length:60px_60px] animate-pulse"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
        {/* En-tête */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Layers className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 mr-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent bg-[length:400%_400%] animate-gradient-x drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]">
              L'Univers est une Application
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-purple-200 max-w-4xl mx-auto px-4 leading-relaxed">
            Découvrez comment chaque échelle de l'univers correspond aux couches d'une application informatique
          </p>
        </header>

        {/* Analogie principale */}
        <div className="max-w-4xl mx-auto mb-8 lg:mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-2xl">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              L'Analogie Fondamentale
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/30 rounded-lg p-4 sm:p-6 border border-blue-400/30">
                <h3 className="text-lg sm:text-xl font-bold text-blue-300 mb-3 flex items-center">
                  <Globe className="w-6 h-6 mr-2" />
                  L'Univers Physique
                </h3>
                <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                  Chaque composant de notre réalité est constitué d'une cascade descendante vers toutes les couches inférieures, 
                  jusqu'aux bits binaires à l'échelle de Planck. Descendre d'échelle, c'est littéralement "regarder sous le capot" 
                  de l'échelle supérieure.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-900/40 to-teal-900/30 rounded-lg p-4 sm:p-6 border border-green-400/30">
                <h3 className="text-lg sm:text-xl font-bold text-green-300 mb-3 flex items-center">
                  <Code2 className="w-6 h-6 mr-2" />
                  Une Application Web
                </h3>
                <p className="text-green-100 text-sm sm:text-base leading-relaxed">
                  Chaque élément de l'interface utilisateur est la manifestation compilée des couches inférieures : 
                  composants React, HTML/CSS, JavaScript, et finalement le code binaire. Cette interface tourne en continu.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 échelles */}
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
          {scales.map((scale, index) => (
            <div
              key={scale.id}
              className={`bg-gradient-to-br ${scale.bgColor} backdrop-blur-sm rounded-xl lg:rounded-2xl border-2 ${scale.borderColor} shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]`}
            >
              {/* En-tête de section */}
              <div
                className="p-4 sm:p-6 cursor-pointer"
                onClick={() => toggleSection(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${scale.gradient} shadow-lg`}>
                      {scale.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${scale.textColor}`}>
                        {scale.title}
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base">
                        {scale.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-400">
                      {6 - index}
                    </span>
                    {expandedSections.includes(index) ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Contenu étendu */}
              {expandedSections.includes(index) && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-3">Description</h4>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                        {scale.description}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        <strong>Taille :</strong> {scale.size}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-white mb-3">Exemples</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {scale.examples.map((example, idx) => (
                          <div
                            key={idx}
                            className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center text-xs sm:text-sm text-gray-200 border border-white/20"
                          >
                            {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-lg p-4 sm:p-6 border border-gray-600/30">
                    <h4 className="text-lg font-bold text-yellow-300 mb-2 flex items-center">
                      <Code2 className="w-5 h-5 mr-2" />
                      Analogie Informatique
                    </h4>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {scale.analogy}
                    </p>
                  </div>

                  {/* Contenu spécial pour l'échelle de Planck */}
                  {scale.specialContent}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Section de cascade comparative */}
        <div className="max-w-7xl mx-auto mt-8 lg:mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-2xl">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              La Cascade Divine : Création d'un Téléphone
            </h2>
            
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
        </div>

        {/* Navigation vers les autres pages */}
        <div className="max-w-4xl mx-auto mt-8 lg:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Link
              to="/relativity"
              className="group bg-gradient-to-br from-cyan-900/50 to-blue-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-cyan-400/30 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <div className="flex items-center mb-3">
                <Zap className="w-8 h-8 text-cyan-400 mr-3" />
                <h3 className="text-lg font-bold text-cyan-300">Relativité</h3>
              </div>
              <p className="text-cyan-100 text-sm leading-relaxed">
                Explorez la dilatation du temps et les effets relativistes
              </p>
            </Link>

            <Link
              to="/black-hole-concept"
              className="group bg-gradient-to-br from-purple-900/50 to-pink-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-400/30 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <div className="flex items-center mb-3">
                <Eye className="w-8 h-8 text-purple-400 mr-3" />
                <h3 className="text-lg font-bold text-purple-300">Trous Noirs</h3>
              </div>
              <p className="text-purple-100 text-sm leading-relaxed">
                Découvrez l'inversion espace-temps à l'horizon des événements
              </p>
            </Link>

            <Link
              to="/quantum-lab"
              className="group bg-gradient-to-br from-teal-900/50 to-cyan-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-teal-400/30 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <div className="flex items-center mb-3">
                <Microscope className="w-8 h-8 text-teal-400 mr-3" />
                <h3 className="text-lg font-bold text-teal-300">Labo Quantique</h3>
              </div>
              <p className="text-teal-100 text-sm leading-relaxed">
                Explorez les 6 échelles comme un jeu de construction cosmique
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};