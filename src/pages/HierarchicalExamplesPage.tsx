import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, Code, Atom, Binary, Cpu, Zap, Plus, Minus, RotateCcw, AlertTriangle } from 'lucide-react';

// Définitions des entités macroscopiques disponibles
const ENTITY_DEFINITIONS = [
  {
    name: "Être Humain",
    macroDescription: "Un être humain adulte de 70kg, organisme complexe avec conscience et capacités cognitives avancées.",
    baseValues: {
      quantumBits: 7000000000000000000000000000, // 7 × 10^27
      upQuarks: 2800000000000000000000000000,
      downQuarks: 2800000000000000000000000000,
      electrons: 1400000000000000000000000000,
      protonCount: 1866666666666666666666666666,
      neutronCount: 1866666666666666666666666666,
      carbonAtoms: 336000000000000000000000000,
      hydrogenAtoms: 1176000000000000000000000000,
      oxygenAtoms: 298666666666666666666666666,
      nitrogenAtoms: 56000000000000000000000000,
      proteinCount: 1866666666666666666666,
      dnaIntegrity: 95,
      lipidBalance: 85
    }
  },
  {
    name: "Chêne Centenaire",
    macroDescription: "Un chêne de 100 ans, 25 mètres de haut, organisme végétal complexe avec système racinaire étendu.",
    baseValues: {
      quantumBits: 15000000000000000000000000000, // Plus de matière qu'un humain
      upQuarks: 6000000000000000000000000000,
      downQuarks: 6000000000000000000000000000,
      electrons: 3000000000000000000000000000,
      protonCount: 4000000000000000000000000000,
      neutronCount: 4000000000000000000000000000,
      carbonAtoms: 1200000000000000000000000000, // Beaucoup de carbone (cellulose)
      hydrogenAtoms: 2000000000000000000000000000,
      oxygenAtoms: 640000000000000000000000000,
      nitrogenAtoms: 160000000000000000000000000,
      proteinCount: 4000000000000000000000, // Moins de protéines qu'un humain
      dnaIntegrity: 88,
      lipidBalance: 45 // Moins de lipides
    }
  },
  {
    name: "Rocher de Granit",
    macroDescription: "Un rocher de granit de 500kg, formation minérale cristalline composée de quartz, feldspath et mica.",
    baseValues: {
      quantumBits: 25000000000000000000000000000, // Très dense
      upQuarks: 10000000000000000000000000000,
      downQuarks: 10000000000000000000000000000,
      electrons: 5000000000000000000000000000,
      protonCount: 6666666666666666666666666666,
      neutronCount: 6666666666666666666666666666,
      carbonAtoms: 66666666666666666666666666, // Très peu de carbone
      hydrogenAtoms: 133333333333333333333333333, // Très peu d'hydrogène
      oxygenAtoms: 3200000000000000000000000000, // Beaucoup d'oxygène (silicates)
      nitrogenAtoms: 13333333333333333333333333, // Presque pas d'azote
      proteinCount: 0, // Pas de protéines
      dnaIntegrity: 0, // Pas d'ADN
      lipidBalance: 0 // Pas de lipides
    }
  },
  {
    name: "Goutte d'Eau",
    macroDescription: "Une goutte d'eau pure de 0.05ml, molécules H₂O en mouvement brownien constant.",
    baseValues: {
      quantumBits: 1670000000000000000000, // Très petit
      upQuarks: 668000000000000000000,
      downQuarks: 668000000000000000000,
      electrons: 334000000000000000000,
      protonCount: 445333333333333333333,
      neutronCount: 445333333333333333333,
      carbonAtoms: 0, // Pas de carbone
      hydrogenAtoms: 334000000000000000000, // Beaucoup d'hydrogène
      oxygenAtoms: 167000000000000000000, // Beaucoup d'oxygène
      nitrogenAtoms: 0, // Pas d'azote
      proteinCount: 0,
      dnaIntegrity: 0,
      lipidBalance: 0
    }
  },
  {
    name: "Grain de Sable",
    macroDescription: "Un grain de sable de quartz de 0.5mm, particule minérale érodée par les éléments.",
    baseValues: {
      quantumBits: 50000000000000000000000, // Très petit mais dense
      upQuarks: 20000000000000000000000,
      downQuarks: 20000000000000000000000,
      electrons: 10000000000000000000000,
      protonCount: 13333333333333333333333,
      neutronCount: 13333333333333333333333,
      carbonAtoms: 133333333333333333333, // Très peu
      hydrogenAtoms: 266666666666666666666, // Très peu
      oxygenAtoms: 6400000000000000000000, // Beaucoup (SiO₂)
      nitrogenAtoms: 26666666666666666666, // Presque rien
      proteinCount: 0,
      dnaIntegrity: 0,
      lipidBalance: 0
    }
  },
  {
    name: "Étoile Naine",
    macroDescription: "Une étoile naine rouge de 0.3 masse solaire, fusion nucléaire d'hydrogène en hélium dans son cœur.",
    baseValues: {
      quantumBits: 400000000000000000000000000000000000000000000000000000000, // Astronomique
      upQuarks: 160000000000000000000000000000000000000000000000000000000,
      downQuarks: 160000000000000000000000000000000000000000000000000000000,
      electrons: 80000000000000000000000000000000000000000000000000000000,
      protonCount: 106666666666666666666666666666666666666666666666666666666,
      neutronCount: 106666666666666666666666666666666666666666666666666666666,
      carbonAtoms: 1066666666666666666666666666666666666666666666666666666, // Très peu (jeune étoile)
      hydrogenAtoms: 85333333333333333333333333333333333333333333333333333333, // Énormément
      oxygenAtoms: 1706666666666666666666666666666666666666666666666666666,
      nitrogenAtoms: 213333333333333333333333333333333333333333333333333333,
      proteinCount: 0, // Pas de vie
      dnaIntegrity: 0,
      lipidBalance: 0
    }
  }
];

// Types pour notre système hiérarchique
interface EntityState {
  macroDescription: string;
  
  // Échelle moléculaire (calculé depuis atomique)
  proteinCount: number;
  dnaIntegrity: number;
  lipidBalance: number;
  
  // Échelle atomique (calculé depuis nucléaire)
  carbonAtoms: number;
  hydrogenAtoms: number;
  oxygenAtoms: number;
  nitrogenAtoms: number;
  
  // Échelle nucléaire (calculé depuis particules)
  protonCount: number;
  neutronCount: number;
  
  // Échelle des particules (calculé depuis Planck)
  upQuarks: number;
  downQuarks: number;
  electrons: number;
  
  // Échelle de Planck (base)
  quantumBits: number;
}

export const HierarchicalExamplesPage: React.FC = () => {
  const [selectedEntityName, setSelectedEntityName] = useState<string>(ENTITY_DEFINITIONS[0].name);
  const [currentScaleValues, setCurrentScaleValues] = useState<EntityState>(() => ({
    macroDescription: ENTITY_DEFINITIONS[0].macroDescription,
    ...ENTITY_DEFINITIONS[0].baseValues
  }));
  const [lastModifiedScale, setLastModifiedScale] = useState<'entity' | 'planck'>('entity');

  // Force le re-rendu propre de la page
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Effet pour la sélection d'entité
  useEffect(() => {
    if (lastModifiedScale === 'entity') {
      const selectedEntity = ENTITY_DEFINITIONS.find(e => e.name === selectedEntityName);
      if (selectedEntity) {
        setCurrentScaleValues({
          macroDescription: selectedEntity.macroDescription,
          ...selectedEntity.baseValues
        });
      }
    }
  }, [selectedEntityName, lastModifiedScale]);

  // Fonctions de propagation simplifiées (analogiques, non physiquement exactes)
  const recalculateScales = (modifiedScale: 'entity' | 'planck', newValue: any) => {
    if (modifiedScale === 'entity') {
      setSelectedEntityName(newValue);
      setLastModifiedScale('entity');
    } else if (modifiedScale === 'planck') {
      setLastModifiedScale('planck');
      
      // Propagation simplifiée de Planck vers le haut
      const quantumBits = newValue;
      
      // Particules (approximation analogique)
      const upQuarks = Math.floor(quantumBits * 0.4);
      const downQuarks = Math.floor(quantumBits * 0.4);
      const electrons = Math.floor(quantumBits * 0.2);
      
      // Nucléons (approximation analogique)
      const totalParticles = upQuarks + downQuarks + electrons;
      const protonCount = Math.floor(totalParticles * 0.267); // ~26.7%
      const neutronCount = Math.floor(totalParticles * 0.267);
      
      // Atomes (approximation analogique basée sur la composition moyenne)
      const totalNucleons = protonCount + neutronCount;
      const carbonAtoms = Math.floor(totalNucleons * 0.05); // ~5%
      const hydrogenAtoms = Math.floor(totalNucleons * 0.6); // ~60%
      const oxygenAtoms = Math.floor(totalNucleons * 0.3); // ~30%
      const nitrogenAtoms = Math.floor(totalNucleons * 0.05); // ~5%
      
      // Molécules (approximation analogique)
      const totalAtoms = carbonAtoms + hydrogenAtoms + oxygenAtoms + nitrogenAtoms;
      const proteinCount = Math.floor(totalAtoms / 1000000000); // Très approximatif
      const dnaIntegrity = Math.min(100, Math.floor((carbonAtoms + nitrogenAtoms) / (totalAtoms / 100)));
      const lipidBalance = Math.min(100, Math.floor((carbonAtoms + hydrogenAtoms) / (totalAtoms / 100 * 1.5)));
      
      // Description macroscopique générée
      const complexity = Math.floor(Math.log10(quantumBits));
      let macroDescription = "";
      
      if (complexity < 22) {
        macroDescription = "Entité subatomique : particule élémentaire ou petit agrégat quantique.";
      } else if (complexity < 25) {
        macroDescription = "Entité microscopique : molécule simple ou petit cristal.";
      } else if (complexity < 28) {
        macroDescription = "Entité macroscopique : objet de taille humaine, complexité modérée.";
      } else if (complexity < 35) {
        macroDescription = "Entité massive : structure géologique ou biologique de grande taille.";
      } else {
        macroDescription = "Entité astronomique : corps céleste ou structure cosmique.";
      }
      
      setCurrentScaleValues({
        macroDescription,
        quantumBits,
        upQuarks,
        downQuarks,
        electrons,
        protonCount,
        neutronCount,
        carbonAtoms,
        hydrogenAtoms,
        oxygenAtoms,
        nitrogenAtoms,
        proteinCount,
        dnaIntegrity,
        lipidBalance
      });
    }
  };

  const resetToDefault = () => {
    setSelectedEntityName(ENTITY_DEFINITIONS[0].name);
    setLastModifiedScale('entity');
  };

  const formatLargeNumber = (num: number): string => {
    if (num >= 1e57) return `${(num / 1e57).toFixed(1)}×10⁵⁷`;
    if (num >= 1e54) return `${(num / 1e54).toFixed(1)}×10⁵⁴`;
    if (num >= 1e51) return `${(num / 1e51).toFixed(1)}×10⁵¹`;
    if (num >= 1e48) return `${(num / 1e48).toFixed(1)}×10⁴⁸`;
    if (num >= 1e45) return `${(num / 1e45).toFixed(1)}×10⁴⁵`;
    if (num >= 1e42) return `${(num / 1e42).toFixed(1)}×10⁴²`;
    if (num >= 1e39) return `${(num / 1e39).toFixed(1)}×10³⁹`;
    if (num >= 1e36) return `${(num / 1e36).toFixed(1)}×10³⁶`;
    if (num >= 1e33) return `${(num / 1e33).toFixed(1)}×10³³`;
    if (num >= 1e30) return `${(num / 1e30).toFixed(1)}×10³⁰`;
    if (num >= 1e27) return `${(num / 1e27).toFixed(1)}×10²⁷`;
    if (num >= 1e24) return `${(num / 1e24).toFixed(1)}×10²⁴`;
    if (num >= 1e21) return `${(num / 1e21).toFixed(1)}×10²¹`;
    if (num >= 1e18) return `${(num / 1e18).toFixed(1)}×10¹⁸`;
    if (num >= 1e15) return `${(num / 1e15).toFixed(1)}×10¹⁵`;
    if (num >= 1e12) return `${(num / 1e12).toFixed(1)}×10¹²`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}×10⁹`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}×10⁶`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}×10³`;
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
        
        {/* Bouton retour */}
        <div className="mb-4 sm:mb-6 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'analogie principale
          </Link>
          
          <button
            onClick={resetToDefault}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>

        {/* En-tête */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent bg-[length:400%_400%] animate-gradient-x drop-shadow-[0_0_30px_rgba(6,182,212,0.8)] mb-3 sm:mb-4 px-2">
            Laboratoire Interactif
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-purple-200 max-w-4xl mx-auto px-4 leading-relaxed">
            Sélectionnez une entité ou modifiez l'échelle de Planck et observez les répercussions en temps réel !
          </p>
        </header>

        {/* Avertissement de simplification */}
        <div className="max-w-6xl mx-auto mb-6 lg:mb-8">
          <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-yellow-400/40 shadow-2xl">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-yellow-300 mb-2">
                  ⚠️ Simulation Analogique Simplifiée
                </h3>
                <p className="text-sm sm:text-base text-yellow-100 leading-relaxed">
                  Cette simulation illustre le <strong>concept</strong> d'interconnexion entre les échelles, mais utilise des formules très simplifiées. 
                  Dans la réalité, il faudrait prendre en compte un nombre astronomique de variables supplémentaires : 
                  interactions quantiques complexes, forces électromagnétiques, liaisons chimiques spécifiques, 
                  structures cristallines, propriétés thermodynamiques, et bien plus encore. 
                  Cette version est une <strong>analogie pédagogique</strong> pour comprendre le principe général.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Indicateur de dernière modification */}
        {lastModifiedScale && (
          <div className="text-center mb-6">
            <div className="inline-block bg-blue-900/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-400/30">
              <p className="text-blue-200 text-sm">
                Dernière modification : <strong>{lastModifiedScale === 'entity' ? 'Sélection d\'Entité' : 'Échelle de Planck'}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Système interactif */}
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
          
          {/* Sélection d'entité macroscopique - CONTRÔLABLE */}
          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-blue-400/40 shadow-2xl">
            <div className="flex items-center mb-4 sm:mb-6">
              <Layers className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-blue-400" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                Échelle Macroscopique (10⁻⁴ m à 1 m+) - CONTRÔLABLE
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <label className="block text-blue-200 text-sm font-medium mb-2">Sélectionnez une entité</label>
                <select
                  value={selectedEntityName}
                  onChange={(e) => recalculateScales('entity', e.target.value)}
                  className="w-full bg-white/20 text-white rounded px-3 py-2 border border-blue-400/30 focus:border-blue-400 focus:outline-none"
                >
                  {ENTITY_DEFINITIONS.map(entity => (
                    <option key={entity.name} value={entity.name} className="bg-gray-800 text-white">
                      {entity.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="text-blue-200 text-sm font-medium mb-2">Description</h4>
                <p className="text-white text-sm leading-relaxed">
                  {currentScaleValues.macroDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Échelles calculées automatiquement */}
          {[
            {
              title: "Échelle Moléculaire (10⁻⁹ à 10⁻⁶ m)",
              icon: <Code className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-green-400" />,
              color: "from-green-900/50 to-emerald-900/40",
              borderColor: "border-green-400/40",
              textColor: "text-green-300",
              data: [
                { label: "Protéines", value: formatLargeNumber(currentScaleValues.proteinCount), unit: "" },
                { label: "Intégrité ADN", value: currentScaleValues.dnaIntegrity.toString(), unit: "%" },
                { label: "Équilibre Lipidique", value: currentScaleValues.lipidBalance.toString(), unit: "%" }
              ]
            },
            {
              title: "Échelle Atomique (10⁻¹⁰ m)",
              icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-yellow-400" />,
              color: "from-yellow-900/50 to-orange-900/40",
              borderColor: "border-yellow-400/40",
              textColor: "text-yellow-300",
              data: [
                { label: "Atomes de Carbone", value: formatLargeNumber(currentScaleValues.carbonAtoms), unit: "" },
                { label: "Atomes d'Hydrogène", value: formatLargeNumber(currentScaleValues.hydrogenAtoms), unit: "" },
                { label: "Atomes d'Oxygène", value: formatLargeNumber(currentScaleValues.oxygenAtoms), unit: "" },
                { label: "Atomes d'Azote", value: formatLargeNumber(currentScaleValues.nitrogenAtoms), unit: "" }
              ]
            },
            {
              title: "Échelle Nucléaire (10⁻¹⁵ m)",
              icon: <Atom className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-purple-400" />,
              color: "from-purple-900/50 to-violet-900/40",
              borderColor: "border-purple-400/40",
              textColor: "text-purple-300",
              data: [
                { label: "Protons", value: formatLargeNumber(currentScaleValues.protonCount), unit: "" },
                { label: "Neutrons", value: formatLargeNumber(currentScaleValues.neutronCount), unit: "" }
              ]
            },
            {
              title: "Échelle des Particules Fondamentales (10⁻¹⁸ m)",
              icon: <Cpu className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-red-400" />,
              color: "from-red-900/50 to-pink-900/40",
              borderColor: "border-red-400/40",
              textColor: "text-red-300",
              data: [
                { label: "Quarks Up", value: formatLargeNumber(currentScaleValues.upQuarks), unit: "" },
                { label: "Quarks Down", value: formatLargeNumber(currentScaleValues.downQuarks), unit: "" },
                { label: "Électrons", value: formatLargeNumber(currentScaleValues.electrons), unit: "" }
              ]
            }
          ].map((scale, index) => (
            <div key={index} className={`bg-gradient-to-br ${scale.color} backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border-2 ${scale.borderColor} shadow-2xl`}>
              <div className="flex items-center mb-4 sm:mb-6">
                {scale.icon}
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${scale.textColor}`}>
                  {scale.title} - CALCULÉ
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {scale.data.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-white text-sm font-medium mb-1">{item.label}</div>
                    <div className="text-white text-lg font-bold">
                      {item.value} {item.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Échelle de Planck - CONTRÔLABLE */}
          <div className="bg-gradient-to-br from-gray-900/50 to-slate-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-gray-400/40 shadow-2xl">
            <div className="flex items-center mb-4 sm:mb-6">
              <Binary className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-gray-400" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-300">
                Échelle de Planck (10⁻³⁵ m) - CONTRÔLABLE
              </h2>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <label className="block text-gray-200 text-sm font-medium mb-2">
                Bits Quantiques (modifiez pour voir l'effet sur toutes les échelles supérieures)
              </label>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => recalculateScales('planck', Math.max(1e20, currentScaleValues.quantumBits * 0.9))}
                  className="bg-gray-600 hover:bg-gray-700 text-white rounded px-4 py-2"
                >
                  ÷ 1.1
                </button>
                <div className="flex-1 text-center">
                  <div className="text-white text-lg font-bold">
                    {formatLargeNumber(currentScaleValues.quantumBits)} bits
                  </div>
                  <input
                    type="range"
                    min={1e20}
                    max={1e58}
                    step={1e24}
                    value={currentScaleValues.quantumBits}
                    onChange={(e) => recalculateScales('planck', parseInt(e.target.value))}
                    className="w-full mt-2"
                  />
                </div>
                <button 
                  onClick={() => recalculateScales('planck', Math.min(1e58, currentScaleValues.quantumBits * 1.1))}
                  className="bg-gray-600 hover:bg-gray-700 text-white rounded px-4 py-2"
                >
                  × 1.1
                </button>
              </div>
            </div>
          </div>

          {/* Explication */}
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/40 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-indigo-400/40 shadow-2xl text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-300 mb-4 sm:mb-6">
              Comment ça marche ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-4 border-l-4 border-blue-400">
                <h3 className="text-blue-300 font-bold mb-2">⬇️ Propagation vers le bas</h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Sélectionnez une <strong>entité macroscopique</strong> dans la liste déroulante et observez comment ses propriétés 
                  se décomposent automatiquement à travers toutes les échelles inférieures : moléculaire → atomique → nucléaire → particules → Planck.
                </p>
              </div>
              
              <div className="bg-purple-900/30 backdrop-blur-sm rounded-lg p-4 border-l-4 border-purple-400">
                <h3 className="text-purple-300 font-bold mb-2">⬆️ Propagation vers le haut</h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Modifiez l'<strong>échelle de Planck</strong> (bits quantiques) avec le slider et observez comment ces changements 
                  remontent automatiquement à travers toutes les échelles : particules → nucléaire → atomique → moléculaire → macroscopique.
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-yellow-900/30 backdrop-blur-sm rounded-lg p-4 border-l-4 border-yellow-400">
              <p className="text-gray-200 text-sm leading-relaxed">
                <strong className="text-yellow-300">Expérimentez !</strong> Comparez un être humain avec une étoile naine, 
                ou modifiez drastiquement les bits quantiques pour voir une entité complètement différente émerger des calculs !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};