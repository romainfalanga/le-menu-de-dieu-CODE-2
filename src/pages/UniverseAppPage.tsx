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
        connectionHorizontal: "Ce que nous voyons à l'échelle humaine — le monde macroscopique — est une interface utilisateur : le rendu final d'un immense processus de compilation qui descend jusqu'à une mer de 0 et 1 à l'échelle de Planck."
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
        application: "Interface utilisateur (UI), rendu final affiché à l'écran.",
        universe: "Monde macroscopique, réalité visible à l'échelle humaine.",
        universeExamples: "êtres humains, animaux, arbres, montagnes, océans, objets du quotidien",
        applicationConnections: {
          above: null,
          below: "l'UI est générée par du HTML/CSS."
        },
        universeConnections: {
          above: null,
          below: "le monde macroscopique est formé de molécules."
        },
        connectionHorizontal: "l'UI est la traduction lisible d'un code invisible, tout comme le monde macroscopique est l'expression visible de structures moléculaires cachées."
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
        application: "HTML/CSS (DOM), le langage qui décrit la réalité et son fonctionnement.",
        universe: "Molécules, assemblages d'atomes qui portent des propriétés fonctionnelles (ADN, protéines, matériaux).",
        universeExamples: "eau (H₂O), dioxygène (O₂), dioxyde de carbone (CO₂), ADN, protéines, lipides, plastiques, métaux",
        applicationConnections: {
          above: "l'HTML/CSS construit l'interface utilisateur.",
          below: "l'HTML/CSS est généré par les composants React."
        },
        universeConnections: {
          above: "les molécules forment le monde macroscopique.",
          below: "les molécules sont constituées d'atomes."
        },
        connectionHorizontal: "l'HTML/CSS structure et stylise le contenu pour créer une interface, comme les molécules organisent les atomes pour créer des propriétés fonctionnelles."
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
        application: "Composants React, briques réutilisables qui définissent logique et apparence.",
        universe: "Atomes, briques fondamentales de la matière (électrons + noyau).",
        universeExamples: "hydrogène (H), oxygène (O), carbone (C), fer (Fe), uranium (U)",
        applicationConnections: {
          above: "les composants React génèrent l'HTML/CSS.",
          below: "les composants React sont écrits en JavaScript."
        },
        universeConnections: {
          above: "les atomes se combinent pour former des molécules.",
          below: "les atomes sont constitués de nucléons."
        },
        connectionHorizontal: "les composants React sont des briques réutilisables qui s'assemblent pour créer des interfaces, comme les atomes sont des briques fondamentales qui s'assemblent pour créer la matière."
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
        application: "JavaScript, langage universel et flexible, base de React.",
        universe: "Nucléons (protons et neutrons), structures qui stabilisent les atomes.",
        universeExamples: "protons et neutrons dans les noyaux atomiques (hydrogène, hélium, carbone…)",
        applicationConnections: {
          above: "JavaScript est utilisé pour écrire des composants React.",
          below: "JavaScript est exécuté par des moteurs en C/C++."
        },
        universeConnections: {
          above: "les nucléons forment les noyaux atomiques.",
          below: "les nucléons sont constitués de quarks liés par des gluons."
        },
        connectionHorizontal: "JavaScript est une syntaxe universelle qui permet d'assembler du code, comme les nucléons offrent une structure stable pour assembler les atomes."
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
        application: "C et C++, langages systèmes robustes, fondations des moteurs d'exécution.",
        universe: "Particules fondamentales : fermions (quarks et leptons) = la matière, bosons (photon, gluon, W/Z, Higgs) = les forces.",
        universeExamples: "Quarks (up, down, charm, strange, top, bottom), Leptons (électron, neutrinos, muons, taus), Bosons (photon, gluon, W, Z, Higgs)",
        applicationConnections: {
          above: "C/C++ fait tourner les moteurs JavaScript.",
          below: "C/C++ est compilé en 0 et 1."
        },
        universeConnections: {
          above: "les particules fondamentales forment les nucléons.",
          below: "les particules reposent sur l'échelle de Planck."
        },
        connectionHorizontal: "C/C++ fournit une ossature stable pour exécuter les langages supérieurs, comme les particules fondamentales fournissent les composants élémentaires de la matière et des forces."
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
        application: "0 et 1 (Binaire), les informations élémentaires de la réalité.",
        universe: "Échelle de Planck, granularité ultime de l'espace-temps.",
        universeExamples: null,
        applicationConnections: {
          above: "les 0 et 1 sont le résultat de la compilation du code C/C++.",
          below: null
        },
        universeConnections: {
          above: "l'échelle de Planck donne naissance aux particules fondamentales.",
          below: null
        },
        connectionHorizontal: "les 0 et 1 sont les informations élémentaires de l'application, comme l'échelle de Planck contient les informations élémentaires de la réalité physique."
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

                {/* Cascade des échelles - Section ajoutée */}
                <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border-2 border-emerald-400/40 shadow-2xl mb-3 sm:mb-4">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Layers className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-emerald-400" />
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-300">
                      La Cascade des Échelles : Du Visible à l'Invisible
                    </h2>
                  </div>
                  
                  {/* Première partie : Échelles "classiques" observables */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <div className="space-y-3">
                      <h3 className="text-base sm:text-lg font-bold text-emerald-200 mb-3 sm:mb-4">
                        Cascade Universelle (Physique)
                      </h3>
                      
                      <div className="space-y-2 sm:space-y-3">
                        {[
                          { 
                            level: "Échelle macroscopique", 
                            scale: "10⁻⁴ m à 1 m", 
                            desc: "Ce que nous voyons : humains, objets, monde visible", 
                            connection: "→ Formé par l'assemblage de milliards de molécules organisées",
                            color: "bg-purple-900/40 border-purple-400" 
                          },
                          { 
                            level: "Échelle moléculaire", 
                            scale: "10⁻⁹ à 10⁻⁶ m", 
                            desc: "Assemblages d'atomes : ADN, protéines, matériaux", 
                            connection: "→ Propriétés émergentes par liaison d'atomes spécifiques",
                            color: "bg-blue-900/40 border-blue-400" 
                          }
                        ].map((item, index) => (
                          <div key={index} className={`p-2 sm:p-3 rounded-lg border-l-4 ${item.color} min-h-[60px] sm:min-h-[70px] flex flex-col justify-center`}>
                            <div className="font-bold text-white text-xs sm:text-sm">
                              {item.level}
                              <span className="text-cyan-300 font-mono ml-2">{item.scale}</span>
                            </div>
                            <div className="text-gray-300 text-xs mt-1">{item.desc}</div>
                            {item.connection && (
                              <div className="text-yellow-200 text-xs mt-1 italic font-medium">
                                {item.connection}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-base sm:text-lg font-bold text-emerald-200 mb-3 sm:mb-4">
                        Cascade Informatique (Logicielle)
                      </h3>
                      
                      <div className="space-y-2 sm:space-y-3">
                        {[
                          { 
                            level: "Interface utilisateur", 
                            desc: "Ce que nous voyons : humains, objets, monde visible", 
                            connection: "→ Rendu généré par la du HTML/CSS",
                            color: "bg-purple-900/40 border-purple-400" 
                          },
                          { 
                            level: "HTML/CSS", 
                            desc: "L'HTML et le CSS décrive la réalité et son fonctionnement", 
                            connection: "→ L'HTML et le CSS sont généré par les composants Reacts",
                            color: "bg-blue-900/40 border-blue-400" 
                          }
                        ].map((item, index) => (
                          <div key={index} className={`p-2 sm:p-3 rounded-lg border-l-4 ${item.color} min-h-[60px] sm:min-h-[70px] flex flex-col justify-center`}>
                            <div className="font-bold text-white text-xs sm:text-sm">{item.level}</div>
                            <div className="text-gray-300 text-xs mt-1">{item.desc}</div>
                            {item.connection && (
                              <div className="text-yellow-200 text-xs mt-1 italic font-medium">
                                {item.connection}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Paragraphe de transition : Superposition Quantique */}
                  <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-indigo-400/50 shadow-2xl mb-6">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <Atom className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-indigo-400" />
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-indigo-300">
                        Transition vers la Superposition Quantique
                      </h3>
                    </div>
                    <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm lg:text-base text-gray-200 leading-relaxed">
                      <p>
                        À partir de l'échelle atomique (~10⁻¹⁰ m), tout change : nous entrons dans le domaine de la <strong className="text-purple-300">superposition quantique</strong>.
                      </p>
                      <p>
                        <strong className="text-cyan-300">Dans l'univers :</strong> à cette échelle, les entités physiques (atomes, électrons, particules) existent dans plusieurs états à la fois. Dans l'<strong className="text-purple-300">expérience de la double fente</strong>, par exemple, un électron ou un atome passe simultanément par les deux fentes, créant des interférences avec lui-même. Leur existence est une <strong className="text-yellow-300">probabilité</strong> diffuse jusqu'à ce qu\'une observation ou une mesure "effondre" cette superposition en un état défini.
                      </p>
                      <p>
                        <strong className="text-green-300">Dans l'application :</strong> En suivant cette logique, l'organisation des composants React qui produit le HTML et le CSS n'existe pas sous une forme unique et figée. Elle se déploie comme un ensemble de <strong className="text-yellow-300">probabilités</strong> d'agencements possibles. Ce n'est qu'au moment où l'on observe cette organisation que les composants "choisissent" une configuration particulière.

De même, le JavaScript qui compose un composant React n'existe pas à l'avance sous une seule écriture. Il est une <strong className="text-yellow-300">probabilité</strong> parmi une infinité de manières de produire le même rendu. Ce n'est qu'au moment où l'on "ouvre" le composant et que l'on regarde sous son capot que le code se matérialise dans une version précise, comme si l'acte d'observation faisait émerger une implémentation unique parmi toutes les possibilités.
                      </p>
                    </div>
                  </div>

                  {/* Deuxième partie : Échelles en "superposition quantique" */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {(() => {
                      const physicalCascadeItems = [
                        {
                          level: "Échelle atomique", 
                          scale: "10⁻¹⁰ m", 
                          desc: "Briques de la matière en superposition quantique : hydrogène, carbone, fer → Formés par l'assemblage de protons, neutrons et électrons",
                          color: "bg-green-900/40 border-green-400" 
                        },
                        {
                          level: "Échelle nucléaire", 
                          scale: "10⁻¹⁵ m", 
                          desc: "Cœur des atomes révélé par observation : protons et neutrons → Constitués de protons et de neutrons eux-mêmes composés de quarks",
                          color: "bg-yellow-900/40 border-yellow-400" 
                        },
                        {
                          level: "Échelle des particules fondamentales", 
                          scale: "10⁻¹⁸ m", 
                          desc: "Constituants ultimes révélés par mesure : quarks, leptons, bosons → Révélées comme briques ultimes",
                          color: "bg-red-900/40 border-red-400"
                        }
                      ];

                      const planckItem = {
                        level: "Échelle de Planck", 
                        scale: "10⁻³⁵ m", 
                        desc: "Granularité ultime de l'espace-temps - pure information quantique",
                        color: "bg-red-900/40 border-red-400"
                      };

                      const softwareCascadeItems = [
                        {
                          level: "Composants React",
                          desc: "Composants réutilisables : boutons, formulaires → Logique et structure définies par le code JavaScript",
                          color: "bg-green-900/40 border-green-400"
                        },
                        {
                          level: "JavaScript",
                          desc: "Langage en superposition de code : fonctions, variables, logique → Exécution assurée par des moteurs qui sont eux-mêmes des programmes compilés en 0 et 1",
                          color: "bg-yellow-900/40 border-yellow-400"
                        },
                        {
                          level: "C et C++",
                          desc: "Langages systèmes robustes, fondations des moteurs d'exécution → Compilés en instructions processeur puis en 0 et 1",
                          color: "bg-red-900/40 border-red-400"
                        }
                      ];

                      const pairedCascadeItems = [
                        {
                          physical: physicalCascadeItems[0], // Échelle atomique
                          software: softwareCascadeItems[0]  // Composants React
                        },
                        {
                          physical: physicalCascadeItems[1], // Échelle nucléaire
                          software: softwareCascadeItems[1]  // JavaScript
                        },
                        {
                          physical: physicalCascadeItems[2], // Échelle des particules fondamentales
                          software: softwareCascadeItems[2]  // C et C++
                        }
                      ];

                      return (
                        <>
                          {/* Version mobile : cascades séparées */}
                          <div className="md:hidden">
                            <div className="space-y-4 sm:space-y-6">
                              {/* Cascade Universelle (Physique) - Suite */}
                              <div className="space-y-3">
                                <h3 className="text-base sm:text-lg font-bold text-emerald-200 mb-3 sm:mb-4">
                                  Cascade Universelle (Physique) - Suite
                                </h3>
                                
                                <div className="space-y-2 sm:space-y-3">
                                  {physicalCascadeItems.map((item, index) => (
                                    <div key={index} className={`p-2 sm:p-3 rounded-lg border-l-4 ${item.color} min-h-[60px] sm:min-h-[70px] flex flex-col justify-center`}>
                                      <div className="font-bold text-white text-xs sm:text-sm">
                                        {item.level}
                                        {item.scale && <span className="text-cyan-300 font-mono ml-2">{item.scale}</span>}
                                      </div>
                                      <div className="text-gray-300 text-xs mt-1">{item.desc}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Cascade Informatique (Logicielle) - Suite */}
                              <div className="space-y-3">
                                <h3 className="text-base sm:text-lg font-bold text-emerald-200 mb-3 sm:mb-4">
                                  Cascade Informatique (Logicielle) - Suite
                                </h3>
                                
                                <div className="space-y-2 sm:space-y-3">
                                  {softwareCascadeItems.map((item, index) => (
                                    <div key={index} className={`p-2 sm:p-3 rounded-lg border-l-4 ${item.color} min-h-[60px] sm:min-h-[70px] flex flex-col justify-center`}>
                                      <div className="font-bold text-white text-xs sm:text-sm">{item.level}</div>
                                      <div className="text-gray-300 text-xs mt-1">{item.desc}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Échelle de Planck sur mobile */}
                              <div className="mt-4 sm:mt-6">
                                <div className="p-2 sm:p-3 rounded-lg border-l-4 bg-red-900/40 border-red-400 min-h-[60px] sm:min-h-[70px] flex flex-col justify-center">
                                  <div className="font-bold text-white text-xs sm:text-sm">
                                    Échelle de Planck
                                    <span className="text-cyan-300 font-mono ml-2">10⁻³⁵ m</span>
                                  </div>
                                  <div className="text-gray-300 text-xs mt-1">Granularité ultime de l'espace-temps - pure information quantique</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Version desktop : cascades alignées */}
                          <div className="hidden md:grid md:grid-cols-2 gap-4 sm:gap-6">
                            {/* Titres des cascades */}
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-emerald-200 mb-3 sm:mb-4">
                                Cascade Universelle (Physique) - Suite
                              </h3>
                            </div>
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-emerald-200 mb-3 sm:mb-4">
                                Cascade Informatique (Logicielle) - Suite
                              </h3>
                            </div>
                            
                            {/* Éléments alignés par paires */}
                            {pairedCascadeItems.map((pair, pairIndex) => (
                              <React.Fragment key={pairIndex}>
                                {/* Élément physique */}
                                <div className={`p-2 sm:p-3 rounded-lg border-l-4 ${pair.physical.color} min-h-[60px] sm:min-h-[70px] flex flex-col justify-center mb-2 sm:mb-3`}>
                                  <div className="font-bold text-white text-xs sm:text-sm">
                                    {pair.physical.level}
                                    {pair.physical.scale && <span className="text-cyan-300 font-mono ml-2">{pair.physical.scale}</span>}
                                  </div>
                                  <div className="text-gray-300 text-xs mt-1">{pair.physical.desc}</div>
                                </div>
                                
                                {/* Élément informatique */}
                                <div className={`p-2 sm:p-3 rounded-lg border-l-4 ${pair.software.color} min-h-[60px] sm:min-h-[70px] flex flex-col justify-center mb-2 sm:mb-3`}>
                                  <div className="font-bold text-white text-xs sm:text-sm">{pair.software.level}</div>
                                  <div className="text-gray-300 text-xs mt-1">{pair.software.desc}</div>
                                </div>
                              </React.Fragment>
                            ))}
                            
                            {/* Échelle de Planck - élargie sur desktop */}
                            <div className="col-span-2 mt-4 sm:mt-6">
                              <div className="p-2 sm:p-3 rounded-lg border-l-4 bg-red-900/40 border-red-400 min-h-[60px] sm:min-h-[70px] flex flex-col justify-center">
                                <div className="font-bold text-white text-xs sm:text-sm">
                                  Échelle de Planck
                                  <span className="text-cyan-300 font-mono ml-2">10⁻³⁵ m</span>
                                </div>
                                <div className="text-gray-300 text-xs mt-1">Granularité ultime de l'espace-temps - pure information quantique</div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  
                  <div className="mt-4 sm:mt-6 bg-gradient-to-r from-cyan-900/40 to-blue-900/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 border-l-4 border-cyan-400">
                    <p className="text-xs sm:text-sm lg:text-base text-cyan-100 leading-relaxed font-medium">
                      <strong className="text-cyan-300">Chaque couche encapsule la précédente :</strong> L'interface utilisateur que vous voyez est générée par du HTML et du CSS, eux-mêmes issus des composants React, écrits en JavaScript, exécutés par du