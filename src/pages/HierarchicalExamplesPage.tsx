import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, Code, Atom, Binary, Cpu, Zap } from 'lucide-react';
import { HierarchicalExamplesDisplay } from '../components/HierarchicalExamplesDisplay';

export const HierarchicalExamplesPage: React.FC = () => {
  // Force le re-rendu propre de la page
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hierarchicalExamples = [
    {
      id: 0,
      title: "Échelle macroscopique",
      scale: "10⁻⁴ m à 1 m",
      universeExample: "Un être humain.",
      applicationExample: "La classe `Human` qui encapsule toutes les propriétés et comportements d'un individu (ex: `Human.age`, `Human.speak()`).",
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-900/30 via-cyan-900/20 to-blue-800/30",
      icon: <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
    },
    {
      id: 1,
      title: "Échelle moléculaire",
      scale: "10⁻⁹ à 10⁻⁶ m",
      universeExample: "Les protéines, l'ADN, les lipides qui composent les cellules de cet être humain.",
      applicationExample: "Les objets `Protein`, `DNA`, `Lipid` définis par leurs structures et fonctions au sein de la classe `Human` (ex: `Human.cells[0].DNA.sequence`).",
      color: "from-green-500 to-emerald-500",
      bgGradient: "from-green-900/30 via-emerald-900/20 to-green-800/30",
      icon: <Code className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
    },
    {
      id: 2,
      title: "Échelle atomique",
      scale: "10⁻¹⁰ m",
      universeExample: "Les atomes de carbone, d'hydrogène, d'oxygène, d'azote qui forment ces protéines, ADN et lipides.",
      applicationExample: "Les instances de `CarbonAtom`, `HydrogenAtom`, `OxygenAtom`, `NitrogenAtom` avec leurs propriétés quantiques, utilisées pour construire les objets `Protein`, `DNA`, `Lipid` (ex: `DNA.strand[0].CarbonAtom.electrons`).",
      color: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-900/30 via-orange-900/20 to-yellow-800/30",
      icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
    },
    {
      id: 3,
      title: "Échelle nucléaire",
      scale: "10⁻¹⁵ m",
      universeExample: "Les noyaux de ces atomes (par exemple, le noyau de carbone avec 6 protons et 6 neutrons).",
      applicationExample: "Les structures `CarbonNucleus` (contenant des objets `Proton` et `Neutron`), les fonctions `strongForce(nucleon1, nucleon2)` qui modélisent l'interaction nucléaire (ex: `CarbonAtom.nucleus.protons[0].charge`).",
      color: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-900/30 via-violet-900/20 to-purple-800/30",
      icon: <Atom className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
    },
    {
      id: 4,
      title: "Échelle des particules fondamentales",
      scale: "10⁻¹⁸ m",
      universeExample: "Les quarks (up, down) qui composent les protons et neutrons du noyau de carbone ; les électrons qui orbitent.",
      applicationExample: "Les objets `UpQuark`, `DownQuark`, `Electron` avec leurs propriétés (charge, spin), et les fonctions `gluonExchange(quark1, quark2)` pour l'interaction forte (ex: `Proton.quarks[0].spin`).",
      color: "from-red-500 to-pink-500",
      bgGradient: "from-red-900/30 via-pink-900/20 to-red-800/30",
      icon: <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
    },
    {
      id: 5,
      title: "Échelle de Planck",
      scale: "10⁻³⁵ m",
      universeExample: "Les quanta d'espace-temps, les 'bits' d'information fondamentale qui définissent l'existence et les propriétés des quarks et des électrons.",
      applicationExample: "Les bits `0` et `1` qui encodent l'état quantique d'un quark ou d'un électron, les opérations logiques binaires (`AND`, `OR`, `NOT`) qui manipulent ces bits pour définir les lois physiques (ex: `Electron.state.bit[0]`).",
      color: "from-gray-600 to-slate-600",
      bgGradient: "from-gray-900/30 via-slate-900/20 to-gray-800/30",
      icon: <Binary className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
        
        {/* Bouton retour */}
        <div className="mb-4 sm:mb-6 flex justify-center sm:justify-start">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'analogie principale
          </Link>
        </div>

        {/* En-tête */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent bg-[length:400%_400%] animate-gradient-x drop-shadow-[0_0_30px_rgba(6,182,212,0.8)] mb-3 sm:mb-4 px-2">
            Décomposition d'une Entité
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-purple-200 max-w-4xl mx-auto px-4 leading-relaxed">
            Découvrez comment un être humain se décompose à travers les différentes échelles de l'univers et de l'application
          </p>
        </header>

        {/* Introduction conceptuelle */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8 max-w-6xl mx-auto">
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg">
                <Layers className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Le Concept du "Zoom Infini"
            </h2>
          </div>
          
          <div className="text-sm sm:text-base lg:text-lg text-gray-200 space-y-3 sm:space-y-4 leading-relaxed">
            <p>
              Cette page illustre un concept fondamental : <strong className="text-cyan-300">chaque échelle est une décomposition de la précédente</strong>. 
              Nous prenons un seul objet - un être humain - et nous "zoomons" dedans à travers les différentes couches de réalité.
            </p>
            
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border-l-4 border-emerald-400">
              <p className="font-semibold text-emerald-200 text-sm sm:text-base">
                <strong className="text-emerald-300">L'analogie parfaite :</strong> Comme dans une application informatique où chaque composant 
                est construit à partir de couches plus fondamentales (interface → composants → fonctions → instructions → bits), 
                un être humain est construit à partir de couches physiques de plus en plus fondamentales.
              </p>
            </div>
            
            <p>
              En descendant d'échelle en échelle, nous découvrons les "briques" qui constituent la réalité, 
              exactement comme un développeur qui examinerait le code source d'une application complexe.
            </p>
          </div>
        </div>

        {/* Affichage des exemples hiérarchiques */}
        <div className="max-w-7xl mx-auto">
          <HierarchicalExamplesDisplay examples={hierarchicalExamples} />
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/40 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-indigo-400/40 shadow-2xl text-center mt-8 lg:mt-12 max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-300 mb-4 sm:mb-6">
            La Beauté de la Décomposition
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
            Cette décomposition révèle que <strong className="text-yellow-300">tout dans l'univers</strong> peut être vu comme 
            une <strong className="text-cyan-300">architecture logicielle complexe</strong>. Chaque niveau d'abstraction cache 
            la complexité du niveau inférieur, tout en fournissant les fondations du niveau supérieur. 
            Un être humain n'est finalement qu'une <strong className="text-purple-300">interface utilisateur très sophistiquée</strong> 
            d'un programme écrit en binaire quantique.
          </p>
        </div>
      </div>
    </div>
  );
};