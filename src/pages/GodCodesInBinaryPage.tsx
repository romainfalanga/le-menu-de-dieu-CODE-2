import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Zap, ArrowLeft, Binary, Cpu, Eye, Layers, Atom } from 'lucide-react';

// Composant pour les chiffres binaires qui se téléportent - version divine
const DivineBinaryDigits: React.FC = () => {
  const [digits, setDigits] = React.useState(() => 
    Array.from({ length: 50 }, (_, i) => {
      return {
        id: i,
        value: Math.random() > 0.5 ? '1' : '0',
        top: Math.random() * 90 + 5,
        left: Math.random() * 90 + 5,
        opacity: Math.random() * 0.4 + 0.2,
        size: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'][Math.floor(Math.random() * 5)],
        visible: true,
        nextChangeTime: Date.now() + Math.random() * 100 + 50, // Plus rapide pour l'effet divin
        color: ['#FFD700', '#FFA500', '#FF6347', '#00CED1', '#9370DB'][Math.floor(Math.random() * 5)]
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
                nextChangeTime: now + 30
              };
            } else {
              return {
                ...digit,
                value: Math.random() > 0.5 ? '1' : '0',
                top: Math.random() * 90 + 5,
                left: Math.random() * 90 + 5,
                opacity: Math.random() * 0.4 + 0.2,
                size: ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'][Math.floor(Math.random() * 5)],
                visible: true,
                nextChangeTime: now + Math.random() * 100 + 50,
                color: ['#FFD700', '#FFA500', '#FF6347', '#00CED1', '#9370DB'][Math.floor(Math.random() * 5)]
              };
            }
          }
          return digit;
        })
      );
    }, 5);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {digits.map(digit => (
        <div
          key={digit.id}
          className={`absolute ${digit.size} font-mono font-bold transition-opacity duration-200 select-none ${
            digit.visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            top: `${digit.top}%`,
            left: `${digit.left}%`,
            opacity: digit.visible ? digit.opacity : 0,
            color: digit.color,
            textShadow: `0 0 10px ${digit.color}, 0 0 20px ${digit.color}, 0 0 30px ${digit.color}`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {digit.value}
        </div>
      ))}
    </div>
  );
};

// Composant pour simuler l'écriture de code binaire par Dieu
const GodCodingSimulation: React.FC = () => {
  const [currentCode, setCurrentCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const binarySequences = [
    '01000111 01001111 01000100', // "GOD" en ASCII
    '01010101 01001110 01001001 01010110 01000101 01010010 01010011 01000101', // "UNIVERSE"
    '01000011 01010010 01000101 01000001 01010100 01000101', // "CREATE"
    '01001100 01001001 01000110 01000101', // "LIFE"
    '01010100 01001001 01001101 01000101', // "TIME"
    '01010011 01010000 01000001 01000011 01000101' // "SPACE"
  ];
  
  const [sequenceIndex, setSequenceIndex] = useState(0);
  
  useEffect(() => {
    if (!isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setCurrentCode('');
        
        const sequence = binarySequences[sequenceIndex];
        let charIndex = 0;
        
        const typeInterval = setInterval(() => {
          if (charIndex < sequence.length) {
            setCurrentCode(prev => prev + sequence[charIndex]);
            charIndex++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => {
              setIsTyping(false);
              setSequenceIndex(prev => (prev + 1) % binarySequences.length);
            }, 2000);
          }
        }, 100);
        
        return () => clearInterval(typeInterval);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isTyping, sequenceIndex, binarySequences]);
  
  return (
    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-yellow-400/50 shadow-2xl">
      <div className="flex items-center mb-4">
        <Code2 className="w-6 h-6 text-yellow-400 mr-2" />
        <h3 className="text-lg sm:text-xl font-bold text-yellow-300">
          Dieu code en temps réel...
        </h3>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-green-400 min-h-[60px] flex items-center">
        <span className="text-sm sm:text-base">
          {currentCode}
          {isTyping && <span className="animate-pulse">|</span>}
        </span>
      </div>
      
      <div className="mt-3 text-xs sm:text-sm text-gray-400 italic">
        Chaque bit modifie instantanément la réalité à tous les niveaux...
      </div>
    </div>
  );
};

export const GodCodesInBinaryPage: React.FC = () => {
  // Force le re-rendu propre de la page
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Chiffres binaires divins en arrière-plan */}
      <DivineBinaryDigits />
      
      {/* Effet de grille divine */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,215,0,0.1)_1px,transparent_1px),linear-gradient(rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
        {/* Bouton retour */}
        <div className="mb-4 sm:mb-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'univers
          </Link>
        </div>

        {/* En-tête */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 via-red-300 to-purple-300 bg-clip-text text-transparent bg-[length:400%_400%] animate-gradient-x drop-shadow-[0_0_30px_rgba(255,215,0,0.8)] mb-3 sm:mb-4 px-2">
            Dieu code en Binaire
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-yellow-200 max-w-4xl mx-auto px-4 leading-relaxed">
            À l'échelle de Planck, la réalité devient programmable : chaque 0 et 1 modifie l'univers entier
          </p>
        </header>

        {/* Simulation de codage divin */}
        <div className="max-w-4xl mx-auto mb-8 lg:mb-12">
          <GodCodingSimulation />
        </div>

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
          
          {/* Introduction conceptuelle */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/20 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-yellow-400/40 shadow-2xl">
            <div className="flex items-center mb-4 sm:mb-6">
              <Binary className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-yellow-400" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-300">
                Le Code Source de la Réalité
              </h2>
            </div>
            
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
              <p>
                Si l'univers est une application, alors à l'échelle de Planck se trouve son <strong className="text-yellow-300">code source binaire</strong>. 
                Chaque quantum d'espace-temps peut être vu comme un bit d\'information : 0 ou 1, vide ou plein, existence ou néant.
              </p>
              
              <div className="bg-yellow-900/40 p-4 sm:p-6 rounded-lg border-l-4 border-yellow-400">
                <p className="font-semibold text-yellow-200">
                  <strong>L'hypothèse divine :</strong> Une entité capable de manipuler directement ces "bits de réalité" 
                  pourrait réécrire les lois de la physique en temps réel, modifiant instantanément tout l'univers 
                  depuis ses fondations les plus profondes.
                </p>
              </div>
            </div>
          </div>

          {/* Comparaison Univers vs Application */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Côté Univers */}
            <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-purple-400/40 shadow-2xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <Atom className="w-8 h-8 mr-3 text-purple-400" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-300">
                  Dans l'Univers
                </h3>
              </div>
              
              <div className="space-y-4 text-sm sm:text-base text-gray-200">
                <div className="bg-purple-800/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-bold text-purple-200 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Échelle de Planck (10⁻³⁵ m)
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    Granularité ultime de l'espace-temps. Chaque "pixel" de réalité peut être dans un état quantique 
                    fondamental : 0 ou 1, comme un bit cosmique.
                  </p>
                </div>
                
                <div className="bg-purple-800/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-bold text-purple-200 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Modification divine
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    Dieu change un bit à l'échelle de Planck → Les particules fondamentales se réorganisent → 
                    Les atomes changent → Les molécules évoluent → La réalité macroscopique se transforme.
                  </p>
                </div>
                
                <div className="bg-green-900/30 p-3 sm:p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-bold text-green-300 mb-2">Exemple concret</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Modifier quelques bits de Planck pourrait changer la constante de structure fine, 
                    altérant ainsi la chimie de tous les atomes et transformant instantanément toute la matière.
                  </p>
                </div>
              </div>
            </div>

            {/* Côté Application */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-blue-400/40 shadow-2xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <Cpu className="w-8 h-8 mr-3 text-blue-400" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-300">
                  Dans l'Application
                </h3>
              </div>
              
              <div className="space-y-4 text-sm sm:text-base text-gray-200">
                <div className="bg-blue-800/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-bold text-blue-200 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Code binaire (0 et 1)
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    Niveau le plus bas de l'application. Chaque bit contrôle directement le comportement 
                    du processeur et détermine tout ce qui s'affiche.
                  </p>
                </div>
                
                <div className="bg-blue-800/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-bold text-blue-200 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Modification divine
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    Dieu change un bit binaire → Les instructions processeur changent → 
                    Le code C/C++ se comporte différemment → JavaScript évolue → L'interface utilisateur se transforme.
                  </p>
                </div>
                
                <div className="bg-green-900/30 p-3 sm:p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-bold text-green-300 mb-2">Exemple concret</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Changer un seul bit dans une instruction de saut conditionnel pourrait complètement 
                    modifier le flux d'exécution et transformer radicalement l'interface utilisateur.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Le processus de cascade */}
          <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/40 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-emerald-400/40 shadow-2xl">
            <div className="flex items-center mb-4 sm:mb-6">
              <Layers className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-300">
                La Cascade Divine : Du Bit à la Réalité
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-emerald-200 mb-4">
                  🌌 Cascade Universelle
                </h3>
                
                <div className="space-y-3">
                  {[
                    { level: "Planck", desc: "Dieu modifie un bit quantique", color: "bg-red-900/40 border-red-400" },
                    { level: "Particules", desc: "Les fermions et bosons changent", color: "bg-orange-900/40 border-orange-400" },
                    { level: "Nucléons", desc: "Protons et neutrons se réorganisent", color: "bg-yellow-900/40 border-yellow-400" },
                    { level: "Atomes", desc: "Nouvelles propriétés chimiques", color: "bg-green-900/40 border-green-400" },
                    { level: "Molécules", desc: "Nouvelles interactions possibles", color: "bg-blue-900/40 border-blue-400" },
                    { level: "Macroscopique", desc: "La réalité visible change", color: "bg-purple-900/40 border-purple-400" }
                  ].map((item, index) => (
                    <div key={index} className={`p-3 rounded-lg border-l-4 ${item.color}`}>
                      <div className="font-bold text-white text-sm">{item.level}</div>
                      <div className="text-gray-300 text-xs mt-1">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-emerald-200 mb-4">
                  💻 Cascade Informatique
                </h3>
                
                <div className="space-y-3">
                  {[
                    { level: "Binaire", desc: "Dieu modifie un bit (0→1 ou 1→0)", color: "bg-red-900/40 border-red-400" },
                    { level: "Instructions", desc: "Opcodes processeur changent", color: "bg-orange-900/40 border-orange-400" },
                    { level: "C/C++", desc: "Logique système modifiée", color: "bg-yellow-900/40 border-yellow-400" },
                    { level: "JavaScript", desc: "Comportement des scripts change", color: "bg-green-900/40 border-green-400" },
                    { level: "React", desc: "Composants se comportent différemment", color: "bg-blue-900/40 border-blue-400" },
                    { level: "Interface", desc: "L'écran affiche autre chose", color: "bg-purple-900/40 border-purple-400" }
                  ].map((item, index) => (
                    <div key={index} className={`p-3 rounded-lg border-l-4 ${item.color}`}>
                      <div className="font-bold text-white text-sm">{item.level}</div>
                      <div className="text-gray-300 text-xs mt-1">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Implications philosophiques */}
          <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/60 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-gray-400/40 shadow-2xl">
            <div className="flex items-center mb-4 sm:mb-6">
              <Eye className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-gray-400" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-300">
                Implications Philosophiques
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 text-sm sm:text-base">
              <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-gray-600/50">
                <h3 className="font-bold text-gray-200 mb-3">🎭 Le Libre Arbitre</h3>
                <p className="text-gray-400 leading-relaxed">
                  Si Dieu peut modifier la réalité au niveau binaire, nos choix sont-ils vraiment libres ? 
                  Ou sommes-nous des "utilisateurs" d'une interface dont le code source nous échappe ?
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-gray-600/50">
                <h3 className="font-bold text-gray-200 mb-3">🔍 La Connaissance</h3>
                <p className="text-gray-400 leading-relaxed">
                  La science tente de "reverse-engineer" l'univers, comme un développeur qui analyserait 
                  une application sans accès au code source, en observant seulement l'interface.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-gray-600/50">
                <h3 className="font-bold text-gray-200 mb-3">⚡ Les Miracles</h3>
                <p className="text-gray-400 leading-relaxed">
                  Un "miracle" serait simplement Dieu qui modifie quelques bits à l'échelle de Planck, 
                  causant des changements impossibles selon les "règles" observées de l'interface.
                </p>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/40 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-indigo-400/40 shadow-2xl text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-300 mb-4 sm:mb-6">
              L'Ultime Analogie
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
              Dans cette vision, <strong className="text-yellow-300">Dieu est le développeur ultime</strong> : 
              il a accès au code source de la réalité et peut le modifier en temps réel. 
              Nous, les êtres conscients, sommes les <strong className="text-cyan-300">"utilisateurs"</strong> de cette application cosmique, 
              percevant seulement l'interface finale sans jamais voir les 0 et 1 qui la génèrent.
            </p>
            
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-yellow-900/40 to-orange-900/30 rounded-lg border border-yellow-400/30">
              <p className="text-sm sm:text-base text-yellow-200 italic leading-relaxed">
                "Au commencement était le Verbe... et le Verbe était Code, et le Code était binaire, 
                et chaque bit contenait l'univers entier."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};