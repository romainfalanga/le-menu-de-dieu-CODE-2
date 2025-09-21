import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code, Layers, Zap, Atom, Cpu, Binary, ChevronDown, ChevronUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';

// Composant pour les chiffres binaires qui se téléportent
const TeleportingBinaryDigits: React.FC = () => {
  // Fonction pour vérifier si deux positions se chevauchent
  const checkCollision = (newTop: number, newLeft: number, existingDigits: any[], minDistance: number = 0.8) => {
    return existingDigits.some(digit => {
      if (!digit.visible) return false; // Ignore les chiffres invisibles
      const distance = Math.sqrt(
        Math.pow(newTop - digit.top, 2) + Math.pow(newLeft - digit.left, 2)
      );
      return distance < minDistance;
    });
  };

  // Fonction pour générer une position sans collision
  const generateSafePosition = (existingDigits: any[], maxAttempts: number = 5) => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const newTop = Math.random() * 90 + 5;
      const newLeft = Math.random() * 90 + 5;
      
      if (!checkCollision(newTop, newLeft, existingDigits)) {
        return { top: newTop, left: newLeft };
      }
    }
    
    // Si aucune position sûre n'est trouvée, retourner une position aléatoire
    return {
      top: Math.random() * 90 + 5,
      left: Math.random() * 90 + 5
    };
  };

  const [digits, setDigits] = React.useState(() => 
    Array.from({ length: 28 }, (_, i) => {
      // Génération initiale avec détection de collision
      const existingDigits: any[] = [];
      const position = generateSafePosition(existingDigits);
      
      const newDigit = {
        id: i,
        value: Math.random() > 0.5 ? '1' : '0',
        top: position.top,
        left: position.left,
        opacity: Math.random() * 0.3 + 0.1,
        size: ['text-xl', 'text-2xl', 'text-3xl'][Math.floor(Math.random() * 3)],
        visible: true,
        nextChangeTime: Date.now() + Math.random() * 200 + 100 // 0.1s à 0.3s
      };
      
      existingDigits.push(newDigit);
      return newDigit;
    })
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      
      setDigits(prevDigits => 
        prevDigits.map(digit => {
          if (now >= digit.nextChangeTime) {
            if (digit.visible) {
              // Disparaître complètement
              return {
                ...digit,
                visible: false,
                nextChangeTime: now + 100 // Réapparaître dans exactement 0.1 seconde
              };
            } else {
              // Réapparaître à un nouvel endroit avec de nouvelles propriétés (sans collision)
              const position = generateSafePosition(prevDigits.filter(d => d.id !== digit.id && d.visible));
              
              return {
                ...digit,
                value: Math.random() > 0.5 ? '1' : '0',
                top: position.top,
                left: position.left,
                opacity: Math.random() * 0.3 + 0.1,
                size: ['text-xl', 'text-2xl', 'text-3xl'][Math.floor(Math.random() * 3)],
                visible: true,
                nextChangeTime: now + Math.random() * 200 + 100 // Rester visible 0.1s à 0.3s avant prochaine téléportation
              };
            }
          }
          return digit;
        })
      );
    }, 10); // Vérification toutes les 10ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
    </div>
  );
};

export const UniverseAppPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(() => {
    // Initialise directement avec la section cible si elle existe
    const state = window.location.state || (window.history.state && window.history.state.usr);
    if (state && state.targetSection === 5) {
      return 5;
    }
    return -1; // -1 pour la page d'intro par défaut
  });
  const location = useLocation();


  const sections = [
    {
      id: -1,
      icon: <Code className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "L'univers est une application",
      scale: "Introduction",
      color: "from-cyan-500 to-purple-500",
      bgGradient: "from-slate-900 via-purple-900 to-indigo-900",
      content: {
        info: "Imaginons que l'univers fonctionne comme une application informatique.",
        universe: "Chaque couche correspond à un langage ou à un niveau d'abstraction, qui encapsule le précédent et prépare le suivant.",
        connectionHorizontal: "Ce que nous voyons à l'échelle humaine — le monde macroscopique — est une interface utilisateur : le rendu final d'un immense processus de compilation qui descend jusqu'à une mer de 0 et 1 à l'échelle de Planck. Ces 0 et 1 sont des instructions éphémères qui sculptent la réalité à chaque instant, mais l'objet créé à l'échelle de l'interface utilisateur, lui, persiste."
      }
    },
    {
      id: 0,
      icon: <Layers className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Échelle macroscopique",
      scale: "10⁻⁴ m à 1 m",
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-900/30 via-cyan-900/20 to-blue-800/30",
      content: {
        application: "L'UI d'une application : boutons, images, textes visibles à l'écran.",
        universe: "Ce que nous percevons directement avec nos sens : êtres humains, animaux, montagnes, arbres, objets du quotidien.",
        connectionHorizontal: "Le macroscopique est le rendu final. Nous voyons l'interface, mais pas son code."
      }
    },
    {
      id: 1,
      icon: <Code className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Échelle moléculaire",
      scale: "10⁻⁹ à 10⁻⁶ m",
      color: "from-green-500 to-emerald-500",
      bgGradient: "from-green-900/30 via-emerald-900/20 to-green-800/30",
      content: {
        application: "Les composants React organisés : la structure logique qui assemble plusieurs briques de code pour créer une unité fonctionnelle (ex. une carte avec bouton + texte + image).",
        universe: "Les molécules, agencements d'atomes (H₂O, O₂, ADN, protéines, plastiques).",
        connectionHorizontal: "Les molécules (comme React) sont des assemblages. On en voit les effets (la matière, l'UI), mais pas la logique profonde qui les compose."
      }
    },
    {
      id: 2,
      icon: <Zap className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Échelle atomique",
      scale: "10⁻¹⁰ m",
      color: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-900/30 via-orange-900/20 to-yellow-800/30",
      content: {
        application: "Le JavaScript, code flexible qui peut être écrit de mille manières différentes pour produire le même composant React.",
        universe: "Les atomes (hydrogène, oxygène, carbone…), briques de base de la matière.",
        connectionHorizontal: "Comme les atomes, le JavaScript existe en superposition de possibilités. Tant qu'on ne lit pas le fichier (tant qu'on n'observe pas), toutes les versions coexistent. Observer, c'est effondrer la superposition : une seule version est choisie. 👉 C'est ici que la mécanique quantique agit réellement."
      }
    },
    {
      id: 3,
      icon: <Atom className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Échelle nucléaire",
      scale: "10⁻¹⁵ m",
      color: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-900/30 via-violet-900/20 to-purple-800/30",
      content: {
        application: "Les langages systèmes C et C++, socle stable sur lequel tournent les moteurs JavaScript.",
        universe: "Les nucléons (protons et neutrons), qui donnent la stabilité aux atomes.",
        connectionHorizontal: "Les protons/neutrons sont des briques fixes et invariantes, comme le C/C++ est une base rigide pour exécuter le code."
      }
    },
    {
      id: 4,
      icon: <Cpu className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Échelle des particules fondamentales",
      scale: "10⁻¹⁸ m",
      color: "from-red-500 to-pink-500",
      bgGradient: "from-red-900/30 via-pink-900/20 to-red-800/30",
      content: {
        application: "Les instructions processeur (assembleur, opcodes), les ordres élémentaires exécutés par la machine.",
        universe: "Les particules fondamentales (quarks, leptons, bosons) décrites par le Modèle Standard.",
        connectionHorizontal: "Quarks et bosons sont les ordres élémentaires de l'univers, comme les opcodes sont ceux de l'informatique."
      }
    },
    {
      id: 5,
      icon: <Binary className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Échelle de Planck",
      scale: "10⁻³⁵ m",
      color: "from-gray-600 to-slate-600",
      bgGradient: "from-gray-900/30 via-slate-900/20 to-gray-800/30",
      content: {
        application: "Les bits binaires, 0 et 1, substrat ultime de toute information.",
        universe: "L'échelle hypothétique où l'espace-temps devient discret, où la gravité quantique s'impose.",
        connectionHorizontal: "Les 0 et 1 sont les briques minimales de l'information, le substrat ultime de toute possibilité. Une séquence spécifique de ces bits agit comme une instruction éphémère qui, une fois compilée pour manifester un élément à l'échelle macroscopique, disparaît pour redevenir un potentiel pur. L'échelle de Planck est ce niveau fondamental où la réalité est constamment sculptée par ces instructions transitoires."
      }
    }
  ];

  // Fonctions de navigation
  const goToUpperScale = () => {
    if (currentSection > -1) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const goToLowerScale = () => {
    if (currentSection < sections.length - 2) { // -2 car on a ajouté l'intro
      setCurrentSection(prev => prev + 1);
    }
  };

  const currentSectionData = sections[currentSection + 1]; // +1 car l'intro est à l'index -1

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div 
        className="min-h-screen overflow-hidden relative"
      >
        {/* Effet de particules en arrière-plan */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-indigo-900/20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.05)_50%,transparent_75%)] bg-[length:60px_60px] animate-pulse"></div>
        
        {/* Chiffres binaires téléportants pour la dernière section */}
        {currentSection === 5 && <TeleportingBinaryDigits />}
        
        {/* Bouton échelle supérieure (4 flèches vers l'extérieur) */}
        {/* Section actuelle */}
        <div className="flex items-start justify-center pt-2">
          {currentSection === -1 ? (
            // Page d'introduction
            <div className="w-full flex items-start justify-center p-2 sm:p-4 pt-2">
              <div className="max-w-4xl mx-auto w-full text-center">
                
                {/* Titre principal */}
                <div className="mb-3 sm:mb-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent bg-[length:400%_400%] animate-gradient-x drop-shadow-[0_0_30px_rgba(6,182,212,0.8)] mb-3 sm:mb-4 leading-tight">
                    L'univers est une application
                  </h1>
                </div>

                {/* Contenu d'introduction */}
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                    <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
                      Imaginons que l'univers fonctionne comme une application informatique.
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                    <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
                      Chaque couche correspond à un langage ou à un niveau d'abstraction, qui encapsule le précédent et prépare le suivant.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-yellow-400/30">
                    <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed font-medium">
                      Ce que nous voyons à l'échelle humaine : "le monde macroscopique" est une interface utilisateur : le rendu final d'un immense processus de compilation qui descend jusqu'à une mer de 0 et 1 à l'échelle de Planck.
                    </p>
                  </div>
                  
                  <div className="bg-red-900/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-red-400/30">
                    <p className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed italic">
                      Contrairement à une vraie application, ce code n'est pas modifiable par un développeur extérieur : nous n'avons pas accès aux sources. Nous percevons uniquement l'interface finale.
                    </p>
                  </div>
                </div>

                {/* Call to action */}
                <div className="flex flex-col items-center mb-2 sm:mb-3">
                  <p className="text-base sm:text-lg text-cyan-300 font-bold mb-3 sm:mb-4">
                    Explorez les 6 couches de cette analogie
                  </p>
                  <div className="animate-bounce">
                    <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 mt-2">
                    Cliquez sur le bouton en bas pour commencer le voyage
                  </p>
                </div>

                {/* Bouton Explorer pour l'introduction */}
                {currentSection < sections.length - 2 && (
                  <div className="flex justify-center mt-2 sm:mt-3">
                    <button
                      onClick={goToLowerScale}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-full px-6 py-3 sm:px-8 sm:py-4 shadow-2xl border-2 border-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <div className="flex items-center justify-center">
                        <span className="text-sm sm:text-base font-bold whitespace-nowrap">Explorer l'application de l'univers</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
                      )}
                      
                      {currentSectionData.content.universeConnections?.below && (
                        <div className="bg-orange-900/30 backdrop-blur-sm rounded-md p-1.5 sm:p-2 border border-orange-400/30">
                          <h4 className="font-bold text-orange-300 mb-1 flex items-center text-xs">
                            <ChevronDown className="w-3 h-3 mr-1" />
                            En dessous
                          </h4>
                          <p className="text-gray-200 text-xs leading-relaxed">
                            {currentSectionData.content.universeConnections.below}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section Informatique */}
                  <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border-2 border-blue-400/40 shadow-2xl">
                    <div className="bg-blue-800/30 backdrop-blur-sm rounded-lg px-3 py-2 mb-3 border border-blue-300/30">
                      <h3 className="text-base sm:text-lg font-bold text-blue-200 text-center">
                        Application : {currentSectionData.content.application.split(',')[0]}
                      </h3>
                    </div>
                    <p className="text-gray-200 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3">
                      {currentSectionData.content.application}
                    </p>
                    
                    {/* Connexions application */}
                    <div className="space-y-1 sm:space-y-2">
                      {currentSectionData.content.applicationConnections?.above && (
                        <div className="bg-green-900/30 backdrop-blur-sm rounded-md p-1.5 sm:p-2 border border-green-400/30">
                          <h4 className="font-bold text-green-300 mb-1 flex items-center text-xs">
                            <ChevronUp className="w-3 h-3 mr-1" />
                            Au-dessus
                          </h4>
                          <p className="text-gray-200 text-xs leading-relaxed">
                            {currentSectionData.content.applicationConnections.above}
                          </p>
                        </div>
                      )}
                      
                      {currentSectionData.content.applicationConnections?.below && (
                        <div className="bg-orange-900/30 backdrop-blur-sm rounded-md p-1.5 sm:p-2 border border-orange-400/30">
                          <h4 className="font-bold text-orange-300 mb-1 flex items-center text-xs">
                            <ChevronDown className="w-3 h-3 mr-1" />
                            En dessous
                          </h4>
                          <p className="text-gray-200 text-xs leading-relaxed">
                            {currentSectionData.content.applicationConnections.below}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Connexion horizontale */}
                <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border-2 border-emerald-400/40 shadow-2xl">
                  <div className="bg-emerald-800/30 backdrop-blur-sm rounded-lg px-3 py-2 mb-3 border border-emerald-300/30">
                    <h4 className="font-bold text-emerald-200 mb-0 text-sm sm:text-base text-center">
                      Connexion horizontale application ↔ univers
                    </h4>
                  </div>
                  <p className="text-gray-200 text-xs sm:text-sm leading-relaxed font-medium">
                    {currentSectionData.content.connectionHorizontal}
                  </p>
                </div>

                {/* Bouton Rétrécir pour les pages d'échelles */}
                {currentSection < sections.length - 2 && currentSection !== 5 && (
                  <div className="flex justify-center mt-4 sm:mt-6 mb-2 sm:mb-3">
                    <button
                      onClick={goToLowerScale}
                      className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full w-20 h-20 sm:w-24 sm:h-24 shadow-2xl transition-all duration-500 transform hover:scale-90 active:scale-95 border-2 border-white/20"
                    >
                      <div className="flex items-center justify-center h-full transition-all duration-500 group-hover:scale-90">
                        <span className="text-xs sm:text-sm font-bold transition-all duration-500 group-hover:text-xs sm:group-hover:text-sm group-hover:font-extrabold text-center leading-tight">Rétrécir</span>
                      </div>
                    </button>
                  </div>
                )}

                {/* Bouton spécial "Dieu code en Binaire" pour l'échelle de Planck */}
                {currentSection === 5 && (
                  <div className="flex justify-center mt-4 sm:mt-6 mb-2 sm:mb-3">
                    <Link
                      to="/god-binary"
                      className="group relative bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 hover:from-yellow-700 hover:via-orange-700 hover:to-red-700 text-white rounded-full px-8 py-4 sm:px-12 sm:py-6 shadow-2xl transition-all duration-700 transform hover:scale-115 active:scale-95 border-4 border-yellow-400/60 hover:border-yellow-300/80 overflow-hidden"
                    >
                      {/* Effet de lueur divine */}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-red-400/30 rounded-full blur-2xl animate-pulse group-hover:blur-3xl transition-all duration-700"></div>
                      
                      {/* Particules divines */}
                      <div className="absolute inset-0 overflow-hidden rounded-full">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-80 group-hover:opacity-100"
                            style={{
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              animationDelay: `${Math.random() * 3}s`,
                              animationDuration: `${1 + Math.random() * 2}s`
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Anneaux énergétiques orbitaux */}
                      <div className="absolute -inset-4 border-2 border-yellow-400/30 rounded-full animate-spin opacity-40 group-hover:opacity-70 transition-all duration-700" style={{ animationDuration: '8s' }}></div>
                      <div className="absolute -inset-6 border border-orange-400/20 rounded-full animate-spin opacity-30 group-hover:opacity-60 transition-all duration-700" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
                      <div className="absolute -inset-8 border border-red-400/15 rounded-full animate-spin opacity-20 group-hover:opacity-50 transition-all duration-700" style={{ animationDuration: '16s' }}></div>
                      
                      {/* Effet de scan divin */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-scan rounded-full"></div>
                      
                      {/* Effet de pulsation divine */}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-full animate-pulse opacity-50 group-hover:opacity-80 transition-all duration-700"></div>
                      
                      {/* Contenu du bouton */}
                      <div className="relative z-10 flex items-center justify-center">
                        <Binary className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 group-hover:animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                        <span className="text-base sm:text-lg lg:text-xl font-black whitespace-nowrap group-hover:text-yellow-100 transition-colors duration-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                          Bonus
                        </span>
                      </div>
                      
                      {/* Bordure lumineuse animée */}
                      <div className="absolute -inset-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full opacity-40 blur-xl animate-pulse group-hover:opacity-80 group-hover:blur-2xl transition-all duration-700"></div>
                      
                      {/* Particules orbitales externes */}
                      <div className="absolute -top-3 -right-3 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-60 group-hover:opacity-90 transition-opacity duration-700"></div>
                      <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-orange-400 rounded-full animate-ping opacity-60 group-hover:opacity-90 transition-opacity duration-700 animation-delay-300"></div>
                      <div className="absolute -top-3 -left-3 w-3 h-3 bg-red-400 rounded-full animate-ping opacity-50 group-hover:opacity-80 transition-opacity duration-700 animation-delay-500"></div>
                      <div className="absolute -bottom-3 -right-3 w-3 h-3 bg-yellow-300 rounded-full animate-ping opacity-50 group-hover:opacity-80 transition-opacity duration-700 animation-delay-700"></div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Indicateurs de navigation */}
        {currentSection !== -1 && (
          <div className="fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-50">
          <div className="flex flex-col space-y-2">
            {sections.slice(1).map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(index)} // index direct car on a supprimé l'intro avec slice(1)
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSection
                    ? `bg-gradient-to-r ${section.color} shadow-lg scale-125`
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          </div>
        )}

      </div>
    </div>
  );
};