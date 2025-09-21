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
  
  // Génération de séquences binaires aléatoires de 15 rangées de 40 chiffres
  // Liste étendue de 200+ objets de création (du briquet à l'humain)
  const creationPhrases = React.useMemo(() => [
    // Objets du quotidien
    "Création d'un briquet",
    "Création d'une clé USB",
    "Création d'un smartphone",
    "Création d'une souris d'ordinateur",
    "Création d'un livre",
    "Création d'une tasse",
    "Création d'un stylo",
    "Création d'une montre",
    "Création d'un portefeuille",
    "Création d'une paire de lunettes",
    "Création d'un casque audio",
    "Création d'une calculatrice",
    "Création d'un appareil photo",
    "Création d'une lampe de poche",
    "Création d'un carnet",
    "Création d'une bouteille d'eau",
    "Création d'un parapluie",
    "Création d'une chaussure",
    "Création d'un sac à main",
    "Création d'un chapeau",
    "Création d'une ceinture",
    "Création d'un t-shirt",
    "Création d'un jean",
    "Création d'une veste",
    "Création d'un pull",
    "Création d'une écharpe",
    "Création d'une paire de gants",
    "Création d'une chaussette",
    "Création d'un sous-vêtement",
    
    // Outils et instruments
    "Création d'un marteau",
    "Création d'un tournevis",
    "Création d'une clé anglaise",
    "Création d'une pince",
    "Création d'un couteau",
    "Création d'une fourchette",
    "Création d'une cuillère",
    "Création d'une assiette",
    "Création d'un verre",
    "Création d'une casserole",
    "Création d'une poêle",
    "Création d'un ouvre-boîte",
    "Création d'un tire-bouchon",
    "Création d'une spatule",
    "Création d'un fouet",
    "Création d'un rouleau à pâtisserie",
    "Création d'une balance de cuisine",
    "Création d'un thermomètre",
    "Création d'une règle",
    "Création d'un compas",
    "Création d'une équerre",
    "Création d'un rapporteur",
    "Création d'une loupe",
    "Création d'un microscope",
    "Création d'un télescope",
    "Création d'une boussole",
    "Création d'un niveau à bulle",
    "Création d'un mètre ruban",
    
    // Électronique et technologie
    "Création d'un ordinateur portable",
    "Création d'une tablette",
    "Création d'un clavier",
    "Création d'un écran",
    "Création d'une imprimante",
    "Création d'un scanner",
    "Création d'un routeur wifi",
    "Création d'un disque dur",
    "Création d'une carte mémoire",
    "Création d'un câble USB",
    "Création d'un chargeur",
    "Création d'une batterie",
    "Création d'un haut-parleur",
    "Création d'un microphone",
    "Création d'une webcam",
    "Création d'une télécommande",
    "Création d'un réveil",
    "Création d'une radio",
    "Création d'un lecteur MP3",
    "Création d'un GPS",
    
    // Objets de sport et loisirs
    "Création d'un ballon de football",
    "Création d'un ballon de basket",
    "Création d'une raquette de tennis",
    "Création d'une raquette de badminton",
    "Création d'un club de golf",
    "Création d'une batte de baseball",
    "Création d'un casque de vélo",
    "Création d'une planche à roulettes",
    "Création d'une trottinette",
    "Création d'un frisbee",
    "Création d'un yo-yo",
    "Création d'un rubik's cube",
    "Création d'un jeu de cartes",
    "Création d'un dé",
    "Création d'un puzzle",
    "Création d'une figurine",
    "Création d'une poupée",
    "Création d'un ours en peluche",
    "Création d'un ballon gonflable",
    "Création d'une balle anti-stress",
    
    // Objets de beauté et hygiène
    "Création d'une brosse à dents",
    "Création d'un tube de dentifrice",
    "Création d'un savon",
    "Création d'un shampoing",
    "Création d'un peigne",
    "Création d'une brosse à cheveux",
    "Création d'un miroir",
    "Création d'un rasoir",
    "Création d'une crème hydratante",
    "Création d'un parfum",
    "Création d'un rouge à lèvres",
    "Création d'un mascara",
    "Création d'un vernis à ongles",
    "Création d'une lime à ongles",
    "Création d'un coupe-ongles",
    "Création d'une pince à épiler",
    "Création d'un sèche-cheveux",
    "Création d'un fer à lisser",
    "Création d'une serviette",
    "Création d'un gant de toilette",
    
    // Objets de bureau et écriture
    "Création d'un crayon",
    "Création d'un feutre",
    "Création d'un surligneur",
    "Création d'une gomme",
    "Création d'un taille-crayon",
    "Création d'une agrafeuse",
    "Création d'un perforateur",
    "Création d'un classeur",
    "Création d'un cahier",
    "Création d'un bloc-notes",
    "Création d'une enveloppe",
    "Création d'un timbre",
    "Création d'une étiquette",
    "Création d'un post-it",
    "Création d'un trombone",
    "Création d'une punaise",
    "Création d'un élastique",
    "Création d'un scotch",
    "Création d'une colle",
    "Création d'une paire de ciseaux",
    
    // Objets de maison
    "Création d'une ampoule",
    "Création d'un interrupteur",
    "Création d'une prise électrique",
    "Création d'un cadre photo",
    "Création d'un vase",
    "Création d'une bougie",
    "Création d'un coussin",
    "Création d'une couverture",
    "Création d'un oreiller",
    "Création d'un drap",
    "Création d'une housse de couette",
    "Création d'un rideau",
    "Création d'un store",
    "Création d'un tapis",
    "Création d'une carpette",
    "Création d'un paillasson",
    "Création d'un balai",
    "Création d'une serpillière",
    "Création d'un aspirateur",
    "Création d'un fer à repasser",
    
    // Objets de jardinage
    "Création d'un arrosoir",
    "Création d'une pelle",
    "Création d'un râteau",
    "Création d'une bêche",
    "Création d'un sécateur",
    "Création d'un tuyau d'arrosage",
    "Création d'un pot de fleur",
    "Création d'une jardinière",
    "Création d'un engrais",
    "Création d'une graine",
    "Création d'un bulbe",
    "Création d'une plante",
    "Création d'une fleur",
    "Création d'un arbre",
    "Création d'un arbuste",
    "Création d'une herbe",
    "Création d'une feuille",
    "Création d'une branche",
    "Création d'un fruit",
    "Création d'un légume",
    
    // Véhicules et transport
    "Création d'une voiture",
    "Création d'une moto",
    "Création d'un vélo",
    "Création d'un scooter",
    "Création d'un skateboard",
    "Création d'une trottinette électrique",
    "Création d'un hoverboard",
    "Création d'un casque de moto",
    "Création d'un rétroviseur",
    "Création d'un pneu",
    "Création d'une roue",
    "Création d'un volant",
    "Création d'un siège auto",
    "Création d'une ceinture de sécurité",
    "Création d'un klaxon",
    "Création d'un phare",
    "Création d'un clignotant",
    "Création d'un essuie-glace",
    "Création d'un pare-brise",
    "Création d'un rétroviseur",
    
    // Êtres vivants (taille appropriée)
    "Création d'un être humain",
    "Création d'un chat",
    "Création d'un chien",
    "Création d'un lapin",
    "Création d'un hamster",
    "Création d'une souris",
    "Création d'un rat",
    "Création d'un oiseau",
    "Création d'un poisson",
    "Création d'une tortue",
    "Création d'un serpent",
    "Création d'un lézard",
    "Création d'une grenouille",
    "Création d'un papillon",
    "Création d'une abeille",
    "Création d'une fourmi",
    "Création d'une araignée",
    "Création d'un escargot",
    "Création d'un ver de terre",
    "Création d'une coccinelle"
  ], []);
  
  // Génération de séquences binaires aléatoires de 15 rangées de 40 chiffres
  const binarySequences = React.useMemo(() => {
    return Array.from({ length: creationPhrases.length }, () => {
      // Génère 15 rangées de 40 chiffres binaires chacune
      const rows = Array.from({ length: 15 }, () => {
        return Array.from({ length: 40 }, () => Math.random() > 0.5 ? '1' : '0').join('');
      });
      return rows.join('\n');
    });
  }, [creationPhrases.length]);
  
  // Initialiser avec un index aléatoire et la phrase correspondante
  const [sequenceIndex, setSequenceIndex] = useState(() => Math.floor(Math.random() * creationPhrases.length));
  const [currentCreationPhrase, setCurrentCreationPhrase] = useState(() => creationPhrases[Math.floor(Math.random() * creationPhrases.length)]);
  
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
      }, 0.26); // Ultra rapide pour écrire 600 caractères en ~0.16 secondes (5x plus rapide)
      return () => clearTimeout(typeTimer);
    }
    
    if (isTyping && currentCode.length === currentSequence.length) {
      // Séquence terminée, attendre puis commencer à supprimer
      const pauseTimer = setTimeout(() => {
        setIsTyping(false);
        setIsDeleting(true);
      }, 2000); // Attendre 2 secondes avant de commencer la suppression
      return () => clearTimeout(pauseTimer);
    }
    
    if (isDeleting && currentCode.length > 0) {
      // Supprimer caractère par caractère
      const deleteTimer = setTimeout(() => {
        setCurrentCode(prev => prev.slice(0, -1));
      }, 0.8); // Suppression très rapide
      return () => clearTimeout(deleteTimer);
    }
    
    if (isDeleting && currentCode.length === 0) {
      // Suppression terminée, passer à la séquence suivante
      setIsDeleting(false);
      // Sélection aléatoire d'un nouvel objet à créer
      const nextIndex = Math.floor(Math.random() * creationPhrases.length);
      setSequenceIndex(nextIndex);
      setCurrentCreationPhrase(creationPhrases[nextIndex]);
    }
  }, [isTyping, isDeleting, currentCode, sequenceIndex, binarySequences, creationPhrases]);

  return (
    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-yellow-400/50 shadow-2xl w-fit min-w-[346px] sm:min-w-[405px] mx-auto h-[438px] sm:h-[504px]">
      <div className="flex items-center mb-4">
        <Code2 className="w-6 h-6 text-yellow-400 mr-2" />
        <h3 className="text-lg sm:text-xl font-bold text-yellow-300">
          Dieu code en temps réel...
        </h3>
      </div>
      
      {/* Phrase de création actuelle */}
      <div className="mb-4 text-center">
        <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-yellow-400/30 h-[60px] sm:h-[48px] flex items-center justify-center">
          <p className="text-sm sm:text-base font-semibold text-yellow-200">
            ✨ {currentCreationPhrase}
          </p>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-green-400 w-full h-[280px] sm:h-[340px] overflow-hidden">
        <pre className="text-xs sm:text-sm whitespace-pre leading-tight overflow-x-auto break-all flex items-center justify-center h-full">
          {currentCode}
          {isTyping && <span className="animate-pulse text-green-300">|</span>}
        </pre>
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