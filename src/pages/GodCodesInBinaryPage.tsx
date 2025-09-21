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
        size: 'text-xl',
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
                size: 'text-xl',
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
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Génération de séquences binaires aléatoires de 10 chiffres
  const binarySequences = React.useMemo(() => {
    return Array.from({ length: 8 }, () => {
      return Array.from({ length: 10 }, () => Math.random() > 0.5 ? '1' : '0').join('');
    });
  }, []);
  
  const [sequenceIndex, setSequenceIndex] = useState(0);
  
  useEffect(() => {
    const currentSequence = binarySequences[sequenceIndex];
    
    if (!isTyping && !isDeleting) {
      // Attendre avant de commencer à taper
      const startTimer = setTimeout(() => {
        setIsTyping(true);
      }, 200);
      return () => clearTimeout(startTimer);
    }
    
    if (isTyping && currentCode.length < currentSequence.length) {
      // Taper caractère par caractère
      const typeTimer = setTimeout(() => {
        setCurrentCode(prev => prev + currentSequence[prev.length]);
      }, 50);
      return () => clearTimeout(typeTimer);
    }
    
    if (isTyping && currentCode.length === currentSequence.length) {
      // Séquence terminée, attendre puis commencer à supprimer
      const pauseTimer = setTimeout(() => {
        setIsTyping(false);
        setIsDeleting(true);
      }, 50); // Suppression presque instantanée (0.05 secondes)
      return () => clearTimeout(pauseTimer);
    }
    
    if (isDeleting && currentCode.length > 0) {
      // Supprimer caractère par caractère
      const deleteTimer = setTimeout(() => {
        setCurrentCode(prev => prev.slice(0, -1));
      }, 30);
      return () => clearTimeout(deleteTimer);
    }
    
    if (isDeleting && currentCode.length === 0) {
      // Suppression terminée, passer à la séquence suivante
      setIsDeleting(false);
      setSequenceIndex(prev => (prev + 1) % binarySequences.length);
    }
  }, [isTyping, isDeleting, currentCode, sequenceIndex, binarySequences]);

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
          {isTyping && <span className="animate-pulse text-green-300">|</span>}
        </span>
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
        <div className="mb-4 sm:mb-6 flex justify-center sm:justify-start">
          <Link
            to="/universe"
            state={{ targetSection: 5 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'échelle de Planck
          </Link>
        </div>

        {/* En-tête */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 via-red-300 to-purple-300 bg-clip-text text-transparent bg-[length:400%_400%] animate-gradient-x drop-shadow-[0_0_30px_rgba(255,215,0,0.8)] mb-3 sm:mb-4 px-2">
            Dieu code en Binaire
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-yellow-200 max-w-4xl mx-auto px-4 leading-relaxed">
            À l'échelle de Planck, la réalité devient programmable en Binaire
          </p>
        </header>

        {/* Simulation de codage divin */}
        <div className="max-w-xl mx-auto mb-8 lg:mb-12">
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
            
            {/* Nouveau paragraphe d'introduction */}
            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border-l-4 border-cyan-400 mb-4 sm:mb-6">
              <p className="text-sm sm:text-base lg:text-lg text-cyan-100 leading-relaxed font-medium">
                <strong className="text-cyan-300">Rappel de l'analogie :</strong> Dans "L'univers est une application", nous avons vu que chaque composant de notre interface utilisateur (le monde macroscopique) est fait d'une cascade descendante vers toutes les couches inférieures, jusqu'aux bits binaires à l'échelle de Planck. Chaque couche supérieure est la manifestation compilée des couches inférieures, et descendre d'échelle, c'est littéralement 'regarder sous le capot de l'échelle supérieur'. Cette interface tourne en continu. Modifier l'ensemble des 0 et 1 d'un composant depuis l'échelle de Planck, engendrerait les compilations couche par couche instantanément, ce pourrait modifier intégralement un composant de l'univers.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
              <p>
                Si l'univers est une application, alors à l'échelle de Planck se trouve son <strong className="text-yellow-300">code source binaire</strong>. 
                Chaque quantum d'espace-temps peut être vu comme un bit d\'information : 0 ou 1, vide ou plein, existence ou néant.
              </p>
              
              <div className="bg-orange-900/40 p-4 sm:p-6 rounded-lg border-l-4 border-orange-400">
                <h4 className="font-semibold text-orange-200 mb-3">⚖️ L'Échelle des Modifications</h4>
                <p className="font-medium text-orange-100 mb-2">
                  <strong>Modification locale :</strong> Changer un seul bit (0→1 ou 1→0) ne modifie qu'une seule particule fondamentale, 
                  qui n'affecte qu\'un seul atome, puis qu\'une seule molécule, créant un changement microscopique dans la réalité.
                </p>
                <p className="font-medium text-orange-100">
                  <strong>Modification macroscopique :</strong> Pour des changements visibles (faire apparaître un objet, changer la couleur d'une montagne), 
                  il faudrait modifier une <strong className="text-yellow-300">quantité astronomique</strong> de bits de manière parfaitement coordonnée.
                </p>
              </div>
              
              <div className="bg-yellow-900/40 p-4 sm:p-6 rounded-lg border-l-4 border-yellow-400">
                <p className="font-semibold text-yellow-200">
                  <strong>L'hypothèse divine :</strong> Une entité capable de manipuler directement ces "bits de réalité" 
                  pourrait orchestrer des "miracles" (modifications massives et coordonnées) en réécrivant la réalité depuis ses fondations les plus profondes.
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
                    Modification divine (exemple simplifié)
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Un seul bit :</strong> Dieu change un bit → Une particule change → Un atome est affecté → Une molécule évolue → Un détail microscopique change.
                    <br/><br/>
                    <strong>Miracle macroscopique :</strong> Dieu orchestre des milliards de milliards de changements de bits simultanés pour transformer la réalité visible.
                  </p>
                </div>
                
                <div className="bg-green-900/30 p-3 sm:p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-bold text-green-300 mb-2">Exemples concrets</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <strong>Changement local :</strong> Modifier un bit pourrait changer le spin d'un électron dans un atome de carbone d'une feuille.
                    <br/><br/>
                    <strong>Changement global :</strong> Changer la couleur de toutes les feuilles d'un arbre nécessiterait de modifier des trillions de bits 
                    dans des milliards de molécules de chlorophylle.
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
                    Modification divine (exemple simplifié)
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Un seul bit :</strong> Dieu change un bit → Une instruction change → Un pixel change de couleur → Un détail de l'interface est modifié.
                    <br/><br/>
                    <strong>Nouvelle fonctionnalité :</strong> Dieu réécrit des millions de bits de manière coordonnée pour ajouter un bouton complet à l'interface.
                  </p>
                </div>
                
                <div className="bg-green-900/30 p-3 sm:p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-bold text-green-300 mb-2">Exemples concrets</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <strong>Changement local :</strong> Modifier un bit pourrait changer la couleur d'un pixel ou corriger une faute de frappe.
                    <br/><br/>
                    <strong>Changement global :</strong> Créer un nouveau composant React nécessite de modifier des milliers de bits 
                    dans le code JavaScript compilé.
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
                    { level: "Planck", desc: "Dieu modifie des milliards de bits quantiques", color: "bg-red-900/40 border-red-400" },
                    { level: "Particules", desc: "Des milliards de fermions et bosons changent", color: "bg-orange-900/40 border-orange-400" },
                    { level: "Nucléons", desc: "Des millions de protons et neutrons se réorganisent", color: "bg-yellow-900/40 border-yellow-400" },
                    { level: "Atomes", desc: "Des milliers d'atomes acquièrent de nouvelles propriétés", color: "bg-green-900/40 border-green-400" },
                    { level: "Molécules", desc: "Des centaines de molécules interagissent différemment", color: "bg-blue-900/40 border-blue-400" },
                    { level: "Macroscopique", desc: "Un changement visible apparaît dans la réalité", color: "bg-purple-900/40 border-purple-400" }
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
                    { level: "Binaire", desc: "Dieu modifie des millions de bits coordonnés", color: "bg-red-900/40 border-red-400" },
                    { level: "Instructions", desc: "Des milliers d'opcodes processeur changent", color: "bg-orange-900/40 border-orange-400" },
                    { level: "C/C++", desc: "Des centaines de fonctions système modifiées", color: "bg-yellow-900/40 border-yellow-400" },
                    { level: "JavaScript", desc: "Des dizaines de scripts changent de comportement", color: "bg-green-900/40 border-green-400" },
                    { level: "React", desc: "Plusieurs composants se comportent différemment", color: "bg-blue-900/40 border-blue-400" },
                    { level: "Interface", desc: "Un nouvel élément apparaît à l'écran", color: "bg-purple-900/40 border-purple-400" }
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
                  Si Dieu peut orchestrer des modifications massives de bits pour influencer nos pensées, 
                  nos choix sont-ils vraiment libres ? Ou sommes-nous des "utilisateurs" d'une interface 
                  dont le code source nous échappe complètement ?
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-gray-600/50">
                <h3 className="font-bold text-gray-200 mb-3">🔍 La Connaissance</h3>
                <p className="text-gray-400 leading-relaxed">
                  La science tente de "reverse-engineer" l'univers en observant les effets macroscopiques, 
                  comme un développeur qui analyserait une application sans accès au code source, 
                  essayant de deviner les milliards de bits qui créent chaque fonctionnalité.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-gray-600/50">
                <h3 className="font-bold text-gray-200 mb-3">⚡ Les Miracles</h3>
                <p className="text-gray-400 leading-relaxed">
                  Un "miracle" serait Dieu orchestrant instantanément des modifications de trillions de bits 
                  à l'échelle de Planck, causant des changements impossibles selon les "règles" que nous observons 
                  à l'interface macroscopique.
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
              il a accès au code source de la réalité et peut orchestrer des modifications massives et coordonnées en temps réel. 
              Nous, les êtres conscients, sommes les <strong className="text-cyan-300">"utilisateurs"</strong> de cette application cosmique, 
              percevant seulement l'interface finale sans jamais voir les trillions de 0 et 1 qui la génèrent à chaque instant.
            </p>
            
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-yellow-900/40 to-orange-900/30 rounded-lg border border-yellow-400/30">
              <p className="text-sm sm:text-base text-yellow-200 italic leading-relaxed">
                "Au commencement était le Verbe... et le Verbe était Code, et le Code était une symphonie 
                de trillions de bits orchestrés à la perfection, et chaque modification coordonnée créait un miracle."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};