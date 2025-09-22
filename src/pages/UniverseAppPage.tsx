import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronUp, 
  Atom, 
  Cpu, 
  Code2, 
  Smartphone, 
  Eye, 
  Layers,
  Zap,
  Binary,
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
          className={`absolute ${digit.size} font-mono transition-opacity duration-300 select-none ${
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
  const [currentSection, setCurrentSection] = useState(-1);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Force le re-rendu propre de la page
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Configuration des sections
  const sections = [
    {
      id: 0,
      title: "Interface Utilisateur",
      subtitle: "Ce que nous voyons",
      bgGradient: "from-blue-900/80 to-cyan-900/60",
      icon: Eye,
      content: "L'interface utilisateur de l'univers, c'est tout ce que nous percevons : les objets, les personnes, les paysages, les étoiles. C'est la couche visible et interactive de l'application cosmique."
    },
    {
      id: 1,
      title: "Composants React",
      subtitle: "Éléments modulaires",
      bgGradient: "from-emerald-900/80 to-green-900/60",
      icon: Layers,
      content: "Chaque objet de notre réalité est comme un composant React : une voiture, une maison, un arbre. Chaque composant a ses propriétés, son état, et peut interagir avec d'autres composants."
    },
    {
      id: 2,
      title: "JavaScript",
      subtitle: "Logique et comportement",
      bgGradient: "from-yellow-900/80 to-amber-900/60",
      icon: Code2,
      content: "Le JavaScript de l'univers, ce sont les lois physiques : gravité, électromagnétisme, forces nucléaires. Ces 'fonctions' définissent comment les composants se comportent et interagissent."
    },
    {
      id: 3,
      title: "Assembleur/C++",
      subtitle: "Instructions de bas niveau",
      bgGradient: "from-orange-900/80 to-red-900/60",
      icon: Cpu,
      content: "L'assembleur de l'univers correspond aux interactions atomiques et moléculaires. C'est le niveau où les 'instructions' de base de la matière sont exécutées."
    },
    {
      id: 4,
      title: "Code Machine",
      subtitle: "Langage binaire",
      bgGradient: "from-red-900/80 to-pink-900/60",
      icon: Binary,
      content: "Le code machine de l'univers, c'est le niveau quantique : les particules élémentaires, les quarks, les bosons. Tout se résume à des états binaires : particule/onde, spin up/down."
    },
    {
      id: 5,
      title: "Échelle de Planck",
      subtitle: "Le code source ultime",
      bgGradient: "from-purple-900/80 to-indigo-900/60",
      icon: Microscope,
      content: "À l'échelle de Planck, nous atteignons la résolution ultime de l'univers. C'est ici que l'espace-temps lui-même devient quantifié, comme les pixels d'un écran cosmique."
    }
  ];

  // Gestion du défilement et de la navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Détermine la section actuelle basée sur la position de défilement
      let newSection = -1;
      
      if (scrollPosition < windowHeight * 0.8) {
        newSection = -1; // Introduction
      } else {
        const sectionIndex = Math.floor((scrollPosition - windowHeight * 0.8) / (windowHeight * 0.9));
        newSection = Math.min(sectionIndex, sections.length - 1);
      }
      
      setCurrentSection(newSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Appel initial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  const scrollToSection = (sectionIndex: number) => {
    if (sectionIndex === -1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetY = window.innerHeight * 0.8 + (sectionIndex * window.innerHeight * 0.9);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const currentSectionData = sections[currentSection] || sections[0];

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Arrière-plans cosmiques améliorés */}
      <div className="fixed inset-0 z-0">
        {/* Champ d'étoiles animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(ellipse_at_80%_20%,rgba(255,119,198,0.3),transparent_50%),radial-gradient(ellipse_at_40%_80%,rgba(120,219,255,0.3),transparent_50%)] animate-star-field"></div>
        
        {/* Grille quantique subtile */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40"></div>
        
        {/* Effet de lueur cosmique */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 via-purple-500/5 via-pink-500/5 to-transparent bg-[length:200%_100%] animate-cosmic-glow"></div>
        
        {/* Chiffres binaires flottants */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <TeleportingBinaryDigits />
        </div>
      </div>

      {/* Navigation latérale */}
      <div className="fixed right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-3 sm:space-y-4">
        {/* Point pour l'introduction */}
        <button
          onClick={() => scrollToSection(-1)}
          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-500 transform hover:scale-125 ${
            currentSection === -1
              ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50 glow-dot'
              : 'bg-white/30 hover:bg-white/50'
          }`}
          title="Introduction"
        />
        
        {/* Points pour chaque section */}
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-500 transform hover:scale-125 ${
              currentSection === index
                ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50 glow-dot'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            title={section.title}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="relative z-10">
        {/* Section d'introduction */}
        <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto text-center">
            {/* Titre principal avec effet néon */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 lg:mb-12 neon-text-cyan">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent bg-[length:400%_400%] animate-gradient-x drop-shadow-[0_0_50px_rgba(6,182,212,1)]">
                L'Univers est une Application
              </span>
            </h1>

            {/* Introduction consolidée */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/20 shadow-2xl mb-6 sm:mb-8 floating-card">
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed">
                <p>
                  Imaginez que notre univers entier soit une gigantesque application informatique en cours d'exécution. 
                  Chaque niveau de réalité correspondrait à une couche technologique différente, depuis l'interface 
                  utilisateur que nous percevons jusqu'au code binaire fondamental.
                </p>
                
                <p>
                  Dans cette analogie fascinante, nous, les êtres conscients, sommes les "utilisateurs" de cette 
                  application cosmique. Nous interagissons avec l'interface sans jamais voir le code qui s'exécute 
                  en arrière-plan.
                </p>
                
                <div className="bg-gradient-to-r from-yellow-900/40 to-amber-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-yellow-400/30 glow-border-yellow">
                  <p className="font-semibold text-yellow-200">
                    Ce que nous voyons comme "réalité" ne serait que l'interface utilisateur de cette application universelle, 
                    cachant des couches de complexité infinies qui descendent jusqu'aux fondements quantiques de l'existence.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-red-400/30 mb-8 sm:mb-12 glow-border-red">
              <p className="text-sm sm:text-base lg:text-lg text-red-200 leading-relaxed">
                <strong>Contrairement à une vraie application</strong>, nous ne pouvons pas "voir le code source" 
                de l'univers directement. Mais la physique moderne nous donne des indices sur son architecture 
                sous-jacente, couche par couche.
              </p>
            </div>

            {/* Bouton d'exploration transformé */}
            <div className="flex justify-center">
              <button
                onClick={() => scrollToSection(0)}
                className="cosmic-button group relative bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white font-bold py-6 px-12 sm:py-8 sm:px-16 rounded-2xl text-lg sm:text-xl lg:text-2xl transition-all duration-700 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-cyan-500/50"
              >
                {/* Effet de lueur interne */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Effet de scan au survol */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-scan rounded-2xl"></div>
                
                {/* Texte principal */}
                <span className="relative z-10 drop-shadow-lg">
                  Explorer l'application de l'univers
                </span>
                
                {/* Particules orbitales */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-75 animation-delay-300"></div>
                <div className="absolute -top-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-60 animation-delay-500"></div>
                <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-60 animation-delay-700"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Sections des échelles */}
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={el => sectionsRef.current[index] = el}
            className="min-h-screen flex items-center justify-center relative"
          >
            <div className={`w-full bg-gradient-to-br ${section.bgGradient} flex items-start justify-center p-4 sm:p-6 relative z-20`}>
              <div className="max-w-6xl mx-auto">
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-12 border-2 border-white/20 shadow-2xl floating-card">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                    {/* Icône */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                        <section.icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white" />
                      </div>
                    </div>
                    
                    {/* Contenu */}
                    <div className="flex-1 text-center lg:text-left">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-4 neon-glow">
                        {section.title}
                      </h2>
                      <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-4 sm:mb-6 font-medium">
                        {section.subtitle}
                      </p>
                      <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Section Cascade des Échelles */}
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900/50 to-teal-900/40 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-12 border-2 border-emerald-400/40 shadow-2xl glow-border-emerald floating-card">
              
              {/* Titre principal */}
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-300 mb-4 sm:mb-6 neon-text-emerald">
                  La Cascade des Échelles
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                  Chaque couche de l'univers correspond à une couche technologique. Descendons ensemble 
                  dans les profondeurs de cette architecture cosmique.
                </p>
              </div>

              {/* Grille des cascades */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                
                {/* Cascade Physique */}
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center md:text-left text-green-300 mb-4 sm:mb-6 neon-glow">
                    🌌 Cascade Universelle
                  </h3>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {/* Interface Utilisateur */}
                    <div className="bg-gradient-to-r from-blue-900/60 to-cyan-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-l-4 border-blue-400 shadow-lg floating-card min-h-[100px] flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <Eye className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-3 text-blue-400 flex-shrink-0" />
                        <div className="font-bold text-white text-sm sm:text-base lg:text-lg">Interface Utilisateur</div>
                      </div>
                      <div className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                        Objets, personnes, paysages - tout ce que nous percevons
                      </div>
                    </div>

                    {/* Composants */}
                    <div className="bg-gradient-to-r from-green-900/60 to-emerald-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-l-4 border-green-400 shadow-lg floating-card min-h-[100px] flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <Layers className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-3 text-green-400 flex-shrink-0" />
                        <div className="font-bold text-white text-sm sm:text-base lg:text-lg">Objets Macroscopiques</div>
                      </div>
                      <div className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                        Voitures, maisons, arbres - les "composants" de notre réalité
                      </div>
                    </div>

                    {/* Logique */}
                    <div className="bg-gradient-to-r from-yellow-900/60 to-amber-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-l-4 border-yellow-400 shadow-lg floating-card min-h-[100px] flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-3 text-yellow-400 flex-shrink-0" />
                        <div className="font-bold text-white text-sm sm:text-base lg:text-lg">Lois Physiques</div>
                      </div>
                      <div className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                        Gravité, électromagnétisme - les "fonctions" de l'univers
                      </div>
                    </div>

                    {/* Assembleur */}
                    <div className="bg-gradient-to-r from-orange-900/60 to-red-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-l-4 border-orange-400 shadow-lg floating-card min-h-[100px] flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <Atom className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-3 text-orange-400 flex-shrink-0" />
                        <div className="font-bold text-white text-sm sm:text-base lg:text-lg">Niveau Atomique</div>
                      </div>
                      <div className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                        Atomes et molécules - les "instructions" de base de la matière
                      </div>
                    </div>

                    {/* Binaire */}
                    <div className="bg-gradient-to-r from-red-900/60 to-pink-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-l-4 border-red-400 shadow-lg floating-card min-h-[100px] flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <Binary className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-3 text-red-400 flex-shrink-0" />
                        <div className="font-bold text-white text-sm sm:text-base lg:text-lg">Niveau Quantique</div>
                      </div>
                      <div className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                        Particules élémentaires - les "bits" de la réalité
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cascade Informatique */}
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center md:text-left text-blue-300 mb-4 sm:mb-6 neon-glow">
                    💻 Cascade Informatique
                  </h3>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {/* Interface */}
                    <div className="bg-gradient-to-r from-blue-900/60 to-cyan-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-l-4 border-blue-400 shadow-lg floating-card min-h-[100px] flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-3 text-blue-400 flex-shrink-0" />
                        <div className="font-bold text-white text-sm sm:text-base lg:text-lg">Interface Utilisateur</div>
                      </div>
                      <div className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                        Boutons, menus, écrans - ce que l'utilisateur voit et manipule
                      </div>
                    </div>

                    {/* React */}
                    <div className="bg-gradient-to-r from-green-900/60 to-emerald-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-l-4 border-green-400 shadow-lg floating-card min-h-[100px] flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <Layers className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-3 text-green-400 flex-shrink-0" />
                        <div className="font-bold text-white text-sm sm:text-base lg:text-lg">Composants React</div>
                      </div>
                      <div className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                        Éléments modulaires et réutilisables de l'interface
                      </div>
                    </div>

                    {/* JavaScript */}
                    <div className="bg-gradient-to-r from-yellow-900/60 to-amber-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-l-4 border-yellow-400 shadow-lg floating-card min-h-[100px] flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <Code2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-3 text-yellow-400 flex-shrink-0" />
                        <div className="font-bold text-white text-sm sm:text-base lg:text-lg">JavaScript</div>
                      </div>
                      <div className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                        Logique métier, interactions, comportements dynamiques
                      </div>
                    </div>

                    {/* C++ */}
                    <div className="bg-gradient-to-r from-orange-900/60 to-red-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-l-4 border-orange-400 shadow-lg floating-card min-h-[100px] flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <Cpu className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-3 text-orange-400 flex-shrink-0" />
                        <div className="font-bold text-white text-sm sm:text-base lg:text-lg">Assembleur/C++</div>
                      </div>
                      <div className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                        Instructions de bas niveau, gestion mémoire directe
                      </div>
                    </div>

                    {/* Binaire */}
                    <div className="bg-gradient-to-r from-red-900/60 to-pink-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-l-4 border-red-400 shadow-lg floating-card min-h-[100px] flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <Binary className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-3 text-red-400 flex-shrink-0" />
                        <div className="font-bold text-white text-sm sm:text-base lg:text-lg">Code Binaire</div>
                      </div>
                      <div className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                        0 et 1 - le langage fondamental de toute computation
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Échelle de Planck - Section centrée */}
              <div className="mt-8 sm:mt-12">
                <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border-2 border-purple-400/50 shadow-2xl text-center floating-card">
                  <div className="flex flex-col items-center space-y-4">
                    <Microscope className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-purple-400" />
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-300 neon-text-emerald">
                      Échelle de Planck
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-3xl">
                      Le niveau ultime où l'espace-temps devient quantifié. C'est ici que se trouve 
                      le véritable "code source" de l'univers, là où la réalité elle-même est programmée 
                      en unités discrètes plus petites que tout ce que nous pouvons imaginer.
                    </p>
                    
                    {/* Bouton vers la page "Dieu code en Binaire" */}
                    <div className="mt-6">
                      <Link
                        to="/god-binary"
                        className="cosmic-button group relative bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 hover:from-purple-500 hover:via-pink-500 hover:to-yellow-500 text-white font-bold py-4 px-8 sm:py-6 sm:px-12 rounded-xl text-base sm:text-lg lg:text-xl transition-all duration-700 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-purple-500/50"
                      >
                        <span className="relative z-10 drop-shadow-lg">
                          Découvrir le Code Source Divin
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section de transition quantique */}
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-indigo-900/40 relative z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-12 border-2 border-purple-400/40 shadow-2xl floating-card">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-300 mb-6 sm:mb-8 neon-glow">
                  La Transition Quantique
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed mb-8 sm:mb-12">
                  À l'échelle de Planck, nous atteignons la limite ultime de la résolution de l'univers. 
                  C'est ici que l'espace et le temps eux-mêmes deviennent quantifiés, comme les pixels 
                  d'un écran cosmique d'une résolution inimaginable.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
                  <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-cyan-400/30 floating-card">
                    <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-4 neon-glow">
                      Dans une Application
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      Le code binaire est la couche la plus fondamentale. Chaque bit peut être 0 ou 1, 
                      et toute la complexité de l'application émerge de ces simples états binaires.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-400/30 floating-card">
                    <h3 className="text-xl sm:text-2xl font-bold text-purple-300 mb-4 neon-glow">
                      Dans l'Univers
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      L'échelle de Planck est la résolution ultime de la réalité. Chaque "pixel" 
                      d'espace-temps peut exister dans différents états quantiques, et toute la 
                      complexité de l'univers émerge de ces états fondamentaux.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section de conclusion */}
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900/50 to-slate-900/40 relative z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-12 border-2 border-indigo-400/40 shadow-2xl floating-card">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-300 mb-6 sm:mb-8 neon-glow">
                  L'Ultime Réflexion
                </h2>
                
                <div className="space-y-6 sm:space-y-8 text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed">
                  <p>
                    Cette analogie nous invite à repenser notre place dans l'univers. Nous ne sommes 
                    peut-être que des "utilisateurs" d'une application cosmique infiniment sophistiquée, 
                    interagissant avec une interface sans jamais voir le code qui s'exécute en arrière-plan.
                  </p>
                  
                  <div className="bg-gradient-to-r from-yellow-900/40 to-amber-900/30 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-yellow-400/30 glow-border-yellow">
                    <p className="font-semibold text-yellow-200 text-lg sm:text-xl">
                      Mais contrairement aux applications que nous connaissons, nous n'avons pas accès 
                      au code source de l'univers. Nous ne pouvons que l'observer, l'étudier, et tenter 
                      de comprendre son fonctionnement à travers la science et la physique.
                    </p>
                  </div>
                  
                  <p>
                    Chaque découverte scientifique nous rapproche un peu plus de la compréhension de 
                    cette "architecture cosmique". De la relativité d'Einstein à la mécanique quantique, 
                    nous dévoilons progressivement les couches profondes de cette application universelle.
                  </p>
                  
                  <div className="mt-8 sm:mt-12">
                    <p className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text neon-glow">
                      L'univers est peut-être la plus belle application jamais conçue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};