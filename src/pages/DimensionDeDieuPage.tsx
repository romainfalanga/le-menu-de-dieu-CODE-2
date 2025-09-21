import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Zap, ArrowLeft, Binary, Cpu, Eye, Layers, Atom, Infinity } from 'lucide-react';

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
          Dieu manipule les lois fondamentales en temps réel...
        </h3>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-green-400 min-h-[60px] flex items-center">
        <span className="text-sm sm:text-base">
          {currentCode}
          {isTyping && <span className="animate-pulse">|</span>}
        </span>
      </div>
      
      <div className="mt-3 text-xs sm:text-sm text-gray-400 italic">
        Chaque modification à 10⁻³⁵ m se traduit instantanément en 0 et 1 à 10⁻¹⁸ m, modifiant toute la réalité...
      </div>
    </div>
  );
};

export const DimensionDeDieuPage: React.FC = () => {
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
            La Dimension de Dieu
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-yellow-200 max-w-4xl mx-auto px-4 leading-relaxed">
            Dieu manipule les lois fondamentales à 10⁻³⁵ m, qui se traduisent en 0 et 1 à 10⁻¹⁸ m : le miroir de la réalité
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
              <Infinity className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-yellow-400" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-300">
                L'Interface Divine et le Processus Miroir
              </h2>
            </div>
            
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
              <p>
                <strong className="text-yellow-300">Notre univers fonctionne en continu</strong> : de notre interface macroscopique, 
                il se décompose naturellement à travers les échelles (molécules, atomes, nucléons) jusqu'aux <strong className="text-cyan-300">0 et 1 à 10⁻¹⁸ m</strong>. 
                C'est le flux normal de notre réalité-application.
              </p>
              
              <div className="bg-orange-900/40 p-4 sm:p-6 rounded-lg border-l-4 border-orange-400">
                <h4 className="font-semibold text-orange-200 mb-3">🌌 L'Interface de Dieu (10⁻³⁵ m - Notre Échelle de Planck)</h4>
                <p className="font-medium text-orange-100 mb-2">
                  <strong>Pour Dieu, notre échelle de Planck est son interface utilisateur.</strong> C'est là qu'il manipule les "lois fondamentales" 
                  de l'univers, comme nous manipulons des composants dans une interface graphique.
                </p>
                <p className="font-medium text-orange-100">
                  <strong>Sa cascade inversée :</strong> Quand Dieu veut modifier notre réalité, sa volonté descend à travers ses propres échelles 
                  (son "atomique inversé\" à 10⁻²⁵ m, son "nucléaire inversé\" à 10⁻²⁰ m) jusqu'à atteindre le point miroir.
                </p>
              </div>
              
              <div className="bg-cyan-900/40 p-4 sm:p-6 rounded-lg border-l-4 border-cyan-400">
                <h4 className="font-semibold text-cyan-200 mb-3">🔄 Le Miroir (10⁻¹⁸ m - Notre Échelle des Particules Fondamentales)</h4>
                <p className="font-medium text-cyan-100 mb-2">
                  <strong>C'est ici que les deux cascades se rencontrent.</strong> La volonté divine, traduite à travers ses échelles inversées, 
                  se matérialise en <strong className="text-yellow-300">0 et 1</strong> - le code binaire de l'univers.
                </p>
                <p className="font-medium text-cyan-100">
                  <strong>L'intervention divine :</strong> Quand Dieu modifie les 0 et 1 à cette échelle, ces changements remontent 
                  automatiquement notre cascade normale pour modifier notre réalité macroscopique.
                </p>
              </div>
              
              <div className="bg-purple-900/40 p-4 sm:p-6 rounded-lg border-l-4 border-purple-400">
                <p className="font-semibold text-purple-200">
                  <strong>Le flux continu :</strong> Notre univers tourne en permanence, mais Dieu peut à tout moment observer notre interface 
                  et injecter des modifications depuis son niveau (10⁻³⁵ m), qui se traduisent instantanément en changements 
                  des 0 et 1 (10⁻¹⁸ m), altérant ainsi le cours de notre réalité.
                </p>
              </div>
            </div>
          </div>

          {/* Comparaison des deux cascades */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Cascade de Dieu (descendante) */}
            <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-purple-400/40 shadow-2xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <Infinity className="w-8 h-8 mr-3 text-purple-400" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-300">
                  Cascade Divine (Descendante)
                </h3>
              </div>
              
              <div className="space-y-4 text-sm sm:text-base text-gray-200">
                <div className="bg-purple-800/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-bold text-purple-200 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Interface de Dieu (10⁻³⁵ m)
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Son "macroscopique" :</strong> Dieu manipule les lois fondamentales, les constantes universelles, 
                    les règles de base de l'univers depuis cette interface.
                  </p>
                </div>
                
                <div className="bg-purple-800/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-bold text-purple-200 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Échelles Inversées de Dieu
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Son "moléculaire" (10⁻²⁵ m) :</strong> Concepts divins intermédiaires.
                    <br/>
                    <strong>Son "atomique" (10⁻²⁰ m) :</strong> Instructions divines plus détaillées.
                    <br/>
                    <strong>Son "nucléaire" (10⁻¹⁹ m) :</strong> Commandes divines précises.
                  </p>
                </div>
                
                <div className="bg-green-900/30 p-3 sm:p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-bold text-green-300 mb-2">Aboutissement</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <strong>Les 0 et 1 (10⁻¹⁸ m) :</strong> La volonté divine se matérialise finalement en code binaire, 
                    prête à être "exécutée\" par notre réalité.
                  </p>
                </div>
              </div>
            </div>

            {/* Notre cascade (montante) */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-blue-400/40 shadow-2xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <Layers className="w-8 h-8 mr-3 text-blue-400" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-300">
                  Notre Cascade (Montante)
                </h3>
              </div>
              
              <div className="space-y-4 text-sm sm:text-base text-gray-200">
                <div className="bg-green-900/30 p-3 sm:p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-bold text-green-300 mb-2">Point de départ</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <strong>Les 0 et 1 (10⁻¹⁸ m) :</strong> Le code binaire de l'univers, modifiable par Dieu, 
                    base de toute notre réalité.
                  </p>
                </div>
                
                <div className="bg-blue-800/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-bold text-blue-200 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Nos Échelles Normales
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Nucléaire (10⁻¹⁵ m) :</strong> Les 0 et 1 forment les nucléons.
                    <br/>
                    <strong>Atomique (10⁻¹⁰ m) :</strong> Les nucléons forment les atomes.
                    <br/>
                    <strong>Moléculaire (10⁻⁹ à 10⁻⁶ m) :</strong> Les atomes forment les molécules.
                  </p>
                </div>
                
                <div className="bg-blue-800/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-bold text-blue-200 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Notre Interface (10⁻⁴ m à 1 m et +)
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Notre "macroscopique" :</strong> Le monde visible que nous percevons, 
                    résultat final de l'exécution du code binaire modifié par Dieu.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Le processus d'intervention divine */}
          <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/40 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-emerald-400/40 shadow-2xl">
            <div className="flex items-center mb-4 sm:mb-6">
              <Zap className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-300">
                Le Processus d'Intervention Divine
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-emerald-200 mb-4">
                  👁️ Observation
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-emerald-900/40 border-l-4 border-emerald-400">
                    <div className="font-bold text-white text-sm">Dieu observe</div>
                    <div className="text-gray-300 text-xs mt-1">
                      Depuis son interface (10⁻³⁵ m), Dieu voit notre réalité macroscopique fonctionner
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-900/40 border-l-4 border-emerald-400">
                    <div className="font-bold text-white text-sm">Décision d'intervenir</div>
                    <div className="text-gray-300 text-xs mt-1">
                      Dieu décide de modifier quelque chose dans notre réalité
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-emerald-200 mb-4">
                  ⚡ Cascade Divine
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-yellow-900/40 border-l-4 border-yellow-400">
                    <div className="font-bold text-white text-sm">Interface divine (10⁻³⁵ m)</div>
                    <div className="text-gray-300 text-xs mt-1">
                      Dieu manipule les lois fondamentales
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-900/40 border-l-4 border-orange-400">
                    <div className="font-bold text-white text-sm">Échelles inversées</div>
                    <div className="text-gray-300 text-xs mt-1">
                      La volonté divine descend ses propres échelles
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-900/40 border-l-4 border-red-400">
                    <div className="font-bold text-white text-sm">Miroir (10⁻¹⁸ m)</div>
                    <div className="text-gray-300 text-xs mt-1">
                      Modification des 0 et 1 de l'univers
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-emerald-200 mb-4">
                  🌍 Manifestation
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-blue-900/40 border-l-4 border-blue-400">
                    <div className="font-bold text-white text-sm">Remontée normale</div>
                    <div className="text-gray-300 text-xs mt-1">
                      Les 0 et 1 modifiés remontent nos échelles
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-900/40 border-l-4 border-purple-400">
                    <div className="font-bold text-white text-sm">Changement visible</div>
                    <div className="text-gray-300 text-xs mt-1">
                      Notre réalité macroscopique est modifiée
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-green-900/40 border-l-4 border-green-400">
                    <div className="font-bold text-white text-sm">Miracle accompli</div>
                    <div className="text-gray-300 text-xs mt-1">
                      Ce qui était impossible devient réel
                    </div>
                  </div>
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
                  Si Dieu peut modifier les 0 et 1 qui déterminent nos pensées et nos choix, 
                  sommes-nous vraiment libres ? Ou sommes-nous des "utilisateurs" d'une interface 
                  dont le code source nous échappe complètement ?
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-gray-600/50">
                <h3 className="font-bold text-gray-200 mb-3">🔍 La Science</h3>
                <p className="text-gray-400 leading-relaxed">
                  La science tente de "reverse-engineer" l'univers en observant les effets macroscopiques, 
                  comme un développeur qui analyserait une application sans accès au code source, 
                  essayant de deviner les 0 et 1 qui créent chaque phénomène.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-gray-600/50">
                <h3 className="font-bold text-gray-200 mb-3">⚡ Les Miracles</h3>
                <p className="text-gray-400 leading-relaxed">
                  Un "miracle" serait Dieu orchestrant instantanément des modifications coordonnées 
                  des 0 et 1 à 10⁻¹⁸ m, causant des changements impossibles selon les "règles" 
                  que nous observons à notre interface macroscopique.
                </p>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/40 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-indigo-400/40 shadow-2xl text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-300 mb-4 sm:mb-6">
              L'Ultime Révélation
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto mb-6">
              Dans cette vision, <strong className="text-yellow-300">Dieu est le programmeur ultime</strong> qui observe 
              et modifie notre réalité depuis son interface à l'échelle de Planck (10⁻³⁵ m). 
              Ses modifications descendent sa propre cascade d'échelles inversées pour se matérialiser 
              en <strong className="text-cyan-300">0 et 1 à 10⁻¹⁸ m</strong>, le miroir de la réalité.
            </p>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
              Ces 0 et 1 modifiés remontent ensuite notre cascade normale pour transformer notre interface macroscopique. 
              Nous, les êtres conscients, percevons seulement le résultat final sans jamais voir 
              les trillions de bits qui orchestrent chaque instant de notre existence.
            </p>
            
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-yellow-900/40 to-orange-900/30 rounded-lg border border-yellow-400/30">
              <p className="text-sm sm:text-base text-yellow-200 italic leading-relaxed">
                "Au commencement était le Verbe... et le Verbe descendit les échelles divines pour devenir Code, 
                et le Code se matérialisa en 0 et 1 au miroir de la réalité, et chaque bit orchestré 
                remonta les échelles pour créer un miracle dans notre monde."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};